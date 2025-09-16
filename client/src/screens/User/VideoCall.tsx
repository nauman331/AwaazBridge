import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Select from "react-select"
import type { SingleValue } from "react-select"
import {
    Video,
    VideoOff,
    Mic,
    MicOff,
    Phone,
    PhoneCall,
    PhoneOff,
    Languages,
    Volume2,
    VolumeX,
    MessageCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import { io, Socket } from 'socket.io-client'
import { WebRTCService } from '../../services/WebRTCService'
import STT from '../../hooks/STT'
import TTS from '../../hooks/TTS'
import ISO6391 from 'iso-639-1'
import { socketUrl } from '../../utils/exports'

interface TranslationMessage {
    id: string;
    original: string;
    translated: string;
    fromLang: string;
    toLang: string;
    timestamp: Date;
    isSent: boolean;
}

interface LanguageOption {
    value: string;
    label: string;
}

const VideoCall: React.FC = () => {
    // Connection states
    const [socket, setSocket] = useState<Socket | null>(null);
    const [webRTC, setWebRTC] = useState<WebRTCService | null>(null);
    const [myId, setMyId] = useState<string>('');
    const [callerId, setCallerId] = useState<string>('');
    const [isConnected, setIsConnected] = useState(false);
    const [incomingCall, setIncomingCall] = useState<any>(null);
    const [callAccepted, setCallAccepted] = useState(false);

    // Media states
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [speakerEnabled, setSpeakerEnabled] = useState(true);

    // Translation states
    const [myLanguage, setMyLanguage] = useState<LanguageOption>({ value: 'en', label: 'English' });
    const [targetLanguage, setTargetLanguage] = useState<LanguageOption>({ value: 'fr', label: 'French' });
    const [isTranslationActive, setIsTranslationActive] = useState(false);
    const [messages, setMessages] = useState<TranslationMessage[]>([]);
    const [currentTranscript, setCurrentTranscript] = useState<string>('');
    const [isListening, setIsListening] = useState(false);

    // Refs
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const sttInstanceRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Language options
    const languageOptions: LanguageOption[] = ISO6391.getAllCodes().map(code => ({
        value: code,
        label: ISO6391.getName(code)
    }));

    // Initialize socket connection
    useEffect(() => {
        const newSocket = io(socketUrl);
        setSocket(newSocket);

        newSocket.on('me', (id: string) => {
            setMyId(id);
            setIsConnected(true);
        });

        newSocket.on('callUser', (data: any) => {
            setIncomingCall(data);
        });

        newSocket.on('callAccepted', (signal: any) => {
            setCallAccepted(true);
            if (webRTC) {
                webRTC.handleAnswer(signal);
            }
        });

        newSocket.on('callRejected', () => {
            toast.error('Call was rejected');
            endCall();
        });

        newSocket.on('callEnded', () => {
            endCall();
        });

        // Handle translation results
        newSocket.on('translationResult', (data: any) => {
            const message: TranslationMessage = {
                id: data.id,
                original: data.original,
                translated: data.translated,
                fromLang: data.fromLang,
                toLang: data.toLang,
                timestamp: new Date(data.timestamp),
                isSent: true
            };

            setMessages(prev => [...prev, message]);
        });

        newSocket.on('translation', (data: any) => {
            const message: TranslationMessage = {
                id: Date.now().toString(),
                original: data.original,
                translated: data.translated,
                fromLang: data.fromLang,
                toLang: data.toLang,
                timestamp: new Date(data.timestamp),
                isSent: false
            };

            setMessages(prev => [...prev, message]);

            if (speakerEnabled) {
                TTS(data.translated, { language: data.toLang as any });
            }
        });

        newSocket.on('translationError', (error: string) => {
            console.error('Translation error:', error);
            toast.error('Translation failed');
        });

        return () => {
            newSocket.disconnect();
        };
    }, [speakerEnabled]);

    // Initialize WebRTC when socket is ready
    useEffect(() => {
        if (socket && !webRTC) {
            const rtcService = new WebRTCService(socket);
            setWebRTC(rtcService);
        }
    }, [socket]);

    // Start local video stream
    useEffect(() => {
        const startLocalStream = async () => {
            if (webRTC) {
                try {
                    const stream = await webRTC.getUserMedia();

                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = stream;
                    }
                } catch (error) {
                    toast.error('Failed to access camera/microphone');
                }
            }
        };

        startLocalStream();
    }, [webRTC]);

    // Handle remote stream
    useEffect(() => {
        if (remoteStream && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    // Initialize STT
    useEffect(() => {
        if (isTranslationActive && isListening) {
            const sttOptions = {
                language: myLanguage.value,
                continuous: true,
                interimResults: true
            };

            const sttCallbacks = {
                onResult: (result: any) => {
                    setCurrentTranscript(result.transcript);

                    if (result.isFinal && result.transcript.trim()) {
                        handleTranslation(result.transcript, myLanguage.value, targetLanguage.value, true);
                        setCurrentTranscript('');
                    }
                },
                onStart: () => {
                    console.log('Speech recognition started');
                },
                onEnd: () => {
                    console.log('Speech recognition ended');
                },
                onError: (error: string) => {
                    console.error('STT Error:', error);
                    setIsListening(false);
                }
            };

            sttInstanceRef.current = STT(sttOptions, sttCallbacks);

            if (sttInstanceRef.current) {
                sttInstanceRef.current.start();
            }
        }

        return () => {
            if (sttInstanceRef.current) {
                sttInstanceRef.current.stop();
            }
        };
    }, [isTranslationActive, isListening, myLanguage.value, targetLanguage.value]);

    const handleTranslation = async (text: string, fromLang: string, toLang: string, isSent: boolean) => {
        if (!socket || !text.trim()) return;

        try {
            const translationId = Date.now().toString();

            socket.emit('translateText', {
                id: translationId,
                text: text.trim(),
                fromLang,
                toLang,
                to: callAccepted ? (incomingCall?.from || callerId) : null
            });
        } catch (error) {
            console.error('Translation error:', error);
            toast.error('Translation failed');
        }
    };

    const callUser = async () => {
        if (!webRTC || !callerId.trim()) {
            toast.error('Please enter a valid caller ID');
            return;
        }

        try {
            const offer = await webRTC.createOffer();

            webRTC.callUser({
                phone: callerId,
                signalData: offer,
                from: myId,
                fromLang: myLanguage.value,
                toLang: targetLanguage.value
            });
        } catch (error) {
            toast.error('Failed to start call');
        }
    };

    const answerCall = async () => {
        if (!webRTC || !incomingCall) return;

        try {
            const answer = await webRTC.createAnswer(incomingCall.signal);

            webRTC.answerCall({
                to: incomingCall.from,
                signal: answer
            });

            setCallAccepted(true);
            setIncomingCall(null);
        } catch (error) {
            toast.error('Failed to answer call');
        }
    };

    const rejectCall = () => {
        if (webRTC && incomingCall) {
            webRTC.rejectCall(incomingCall.from);
            setIncomingCall(null);
        }
    };

    const endCall = () => {
        if (webRTC) {
            webRTC.endCall();
        }

        setCallAccepted(false);
        setIncomingCall(null);
        setRemoteStream(null);
        setIsTranslationActive(false);
        setIsListening(false);
        setMessages([]);
    };

    const toggleVideo = () => {
        if (webRTC) {
            const newState = !videoEnabled;
            webRTC.toggleVideo(newState);
            setVideoEnabled(newState);
        }
    };

    const toggleAudio = () => {
        if (webRTC) {
            const newState = !audioEnabled;
            webRTC.toggleAudio(newState);
            setAudioEnabled(newState);
        }
    };

    const toggleTranslation = () => {
        setIsTranslationActive(!isTranslationActive);
        if (isTranslationActive) {
            setIsListening(false);
        }
    };

    const toggleListening = () => {
        if (isTranslationActive) {
            setIsListening(!isListening);
        }
    };

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleMyLanguageChange = (option: SingleValue<LanguageOption>) => {
        if (option) {
            setMyLanguage(option);
        }
    };

    const handleTargetLanguageChange = (option: SingleValue<LanguageOption>) => {
        if (option) {
            setTargetLanguage(option);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-2 sm:p-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
                    {/* Video Section */}
                    <div className="xl:col-span-3 space-y-4 lg:space-y-6">
                        {/* Connection Status */}
                        <Card>
                            <CardContent className="p-3 sm:p-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                    <div className="flex items-center space-x-2">
                                        <Badge variant={isConnected ? "default" : "destructive"}>
                                            {isConnected ? "Connected" : "Disconnected"}
                                        </Badge>
                                        {myId && (
                                            <Badge variant="outline" className="text-xs">
                                                ID: {myId.slice(0, 8)}...
                                            </Badge>
                                        )}
                                    </div>

                                    {!callAccepted && !incomingCall && (
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                                            <Input
                                                placeholder="Enter caller ID"
                                                value={callerId}
                                                onChange={(e) => setCallerId(e.target.value)}
                                                className="w-full sm:w-48"
                                            />
                                            <Button onClick={callUser} disabled={!isConnected} className="w-full sm:w-auto">
                                                <PhoneCall className="w-4 h-4 mr-2" />
                                                Call
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Video Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                            {/* Local Video */}
                            <Card className="relative overflow-hidden">
                                <CardContent className="p-0">
                                    <video
                                        ref={localVideoRef}
                                        autoPlay
                                        muted
                                        playsInline
                                        className="w-full aspect-video bg-slate-800 object-cover"
                                    />
                                    <div className="absolute bottom-2 left-2 lg:bottom-4 lg:left-4">
                                        <Badge className="text-xs">You</Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Remote Video */}
                            <Card className="relative overflow-hidden">
                                <CardContent className="p-0">
                                    <video
                                        ref={remoteVideoRef}
                                        autoPlay
                                        playsInline
                                        className="w-full aspect-video bg-slate-800 object-cover"
                                    />
                                    <div className="absolute bottom-2 left-2 lg:bottom-4 lg:left-4">
                                        <Badge className="text-xs">Remote</Badge>
                                    </div>
                                    {!callAccepted && !incomingCall && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50">
                                            <p className="text-white text-sm">No call active</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Call Controls */}
                        <Card>
                            <CardContent className="p-3 sm:p-4">
                                <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                                    <Button
                                        variant={videoEnabled ? "default" : "destructive"}
                                        size="sm"
                                        className="sm:size-lg flex-1 sm:flex-none"
                                        onClick={toggleVideo}
                                    >
                                        {videoEnabled ? <Video className="w-4 h-4 sm:w-5 sm:h-5" /> : <VideoOff className="w-4 h-4 sm:w-5 sm:h-5" />}
                                        <span className="ml-2 sm:hidden">Video</span>
                                    </Button>

                                    <Button
                                        variant={audioEnabled ? "default" : "destructive"}
                                        size="sm"
                                        className="sm:size-lg flex-1 sm:flex-none"
                                        onClick={toggleAudio}
                                    >
                                        {audioEnabled ? <Mic className="w-4 h-4 sm:w-5 sm:h-5" /> : <MicOff className="w-4 h-4 sm:w-5 sm:h-5" />}
                                        <span className="ml-2 sm:hidden">Audio</span>
                                    </Button>

                                    <Button
                                        variant={speakerEnabled ? "default" : "destructive"}
                                        size="sm"
                                        className="sm:size-lg flex-1 sm:flex-none"
                                        onClick={() => setSpeakerEnabled(!speakerEnabled)}
                                    >
                                        {speakerEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
                                        <span className="ml-2 sm:hidden">Speaker</span>
                                    </Button>

                                    {(callAccepted || incomingCall) && (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="sm:size-lg flex-1 sm:flex-none"
                                            onClick={endCall}
                                        >
                                            <PhoneOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="ml-2 sm:hidden">End</span>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Translation Panel */}
                    <div className="space-y-4 lg:space-y-6">
                        {/* Language Settings */}
                        <Card>
                            <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Languages className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <h3 className="font-semibold text-sm sm:text-base">Translation</h3>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs sm:text-sm font-medium mb-2 block">I speak</label>
                                        <Select
                                            options={languageOptions}
                                            value={myLanguage}
                                            onChange={handleMyLanguageChange}
                                            placeholder="Select your language..."
                                            isSearchable
                                            className="text-[#1f2937]"
                                            styles={{
                                                control: (base, state) => ({
                                                    ...base,
                                                    backgroundColor: 'white',
                                                    borderColor: state.isFocused ? '#1e40af' : '#cbd5e1',
                                                    borderWidth: '1px',
                                                    borderRadius: '0.5rem',
                                                    boxShadow: 'none',
                                                    minHeight: '36px',
                                                    fontSize: '14px',
                                                    '&:hover': {
                                                        borderColor: '#1e40af',
                                                    },
                                                }),
                                                placeholder: (base) => ({
                                                    ...base,
                                                    color: '#64748b',
                                                    fontSize: '14px',
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    color: '#1f2937',
                                                    fontSize: '14px',
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    backgroundColor: 'white',
                                                    zIndex: 50,
                                                    fontSize: '14px',
                                                }),
                                                option: (base, state) => ({
                                                    ...base,
                                                    backgroundColor: state.isSelected ? '#1e40af' : state.isFocused ? '#f0f9ff' : 'white',
                                                    color: state.isSelected ? 'white' : '#1f2937',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                })
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs sm:text-sm font-medium mb-2 block">Translate to</label>
                                        <Select
                                            options={languageOptions}
                                            value={targetLanguage}
                                            onChange={handleTargetLanguageChange}
                                            placeholder="Select target language..."
                                            isSearchable
                                            className="text-[#1f2937]"
                                            styles={{
                                                control: (base, state) => ({
                                                    ...base,
                                                    backgroundColor: 'white',
                                                    borderColor: state.isFocused ? '#1e40af' : '#cbd5e1',
                                                    borderWidth: '1px',
                                                    borderRadius: '0.5rem',
                                                    boxShadow: 'none',
                                                    minHeight: '36px',
                                                    fontSize: '14px',
                                                    '&:hover': {
                                                        borderColor: '#1e40af',
                                                    },
                                                }),
                                                placeholder: (base) => ({
                                                    ...base,
                                                    color: '#64748b',
                                                    fontSize: '14px',
                                                }),
                                                singleValue: (base) => ({
                                                    ...base,
                                                    color: '#1f2937',
                                                    fontSize: '14px',
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    backgroundColor: 'white',
                                                    zIndex: 50,
                                                    fontSize: '14px',
                                                }),
                                                option: (base, state) => ({
                                                    ...base,
                                                    backgroundColor: state.isSelected ? '#1e40af' : state.isFocused ? '#f0f9ff' : 'white',
                                                    color: state.isSelected ? 'white' : '#1f2937',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                })
                                            }}
                                        />
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <Button
                                        variant={isTranslationActive ? "default" : "outline"}
                                        className="w-full text-xs sm:text-sm"
                                        size="sm"
                                        onClick={toggleTranslation}
                                    >
                                        {isTranslationActive ? "Stop Translation" : "Start Translation"}
                                    </Button>

                                    {isTranslationActive && (
                                        <Button
                                            variant={isListening ? "destructive" : "default"}
                                            className="w-full text-xs sm:text-sm"
                                            size="sm"
                                            onClick={toggleListening}
                                        >
                                            {isListening ? "Stop Listening" : "Start Listening"}
                                        </Button>
                                    )}
                                </div>

                                {currentTranscript && (
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <p className="text-xs sm:text-sm text-blue-800">
                                            Listening: {currentTranscript}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Translation Messages */}
                        <Card className="flex-1">
                            <CardContent className="p-3 sm:p-4">
                                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <h3 className="font-semibold text-sm sm:text-base">Translations</h3>
                                </div>

                                <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-96 overflow-y-auto">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`p-2 sm:p-3 rounded-lg ${message.isSent
                                                ? 'bg-blue-100 ml-2 sm:ml-4'
                                                : 'bg-gray-100 mr-2 sm:mr-4'
                                                }`}
                                        >
                                            <div className="text-xs sm:text-sm font-medium">
                                                {message.original}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-600 mt-1">
                                                → {message.translated}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {message.timestamp.toLocaleTimeString()}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Incoming Call Modal */}
                {incomingCall && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-sm sm:w-96">
                            <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                    <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold">Incoming Call</h3>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        {incomingCall.name || incomingCall.from}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        {ISO6391.getName(incomingCall.fromLang)} → {ISO6391.getName(incomingCall.toLang)}
                                    </p>
                                </div>
                                <div className="flex space-x-3">
                                    <Button
                                        variant="destructive"
                                        className="flex-1 text-xs sm:text-sm"
                                        size="sm"
                                        onClick={rejectCall}
                                    >
                                        <PhoneOff className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                        Decline
                                    </Button>
                                    <Button
                                        variant="default"
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                                        size="sm"
                                        onClick={answerCall}
                                    >
                                        <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                                        Accept
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VideoCall