import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';
import { WebRTCService } from '../../services/WebRTCService';
import STT from '../../hooks/STT';
import TTS from '../../hooks/TTS';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import Select from 'react-select';
import type { SingleValue } from 'react-select';
import ISO6391 from 'iso-639-1';
import { socketUrl } from '../../utils/exports';

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

    // Translation and call setup state
    const [myLanguage, setMyLanguage] = useState<LanguageOption | null>({ value: 'en', label: 'English' });
    const [targetLanguage, setTargetLanguage] = useState<LanguageOption | null>(null);
    const [translations, setTranslations] = useState<TranslationMessage[]>([]);
    const [showCallSetup, setShowCallSetup] = useState(false);
    const [step, setStep] = useState<'idle' | 'language' | 'callerId'>('idle');

    // Refs
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const sttRef = useRef<any>(null);

    // Language options
    const languageOptions: LanguageOption[] = ISO6391.getAllCodes().map(code => ({
        value: code,
        label: ISO6391.getName(code)
    }));

    // Initialize socket connection
    useEffect(() => {
        const newSocket = io(socketUrl, {
            transports: ['websocket'],
        });
        setSocket(newSocket);

        newSocket.on('me', (id: string) => {
            setMyId(id);
            setIsConnected(true);
        });

        newSocket.on('callUser', (data: any) => {
            setIncomingCall(data);
        });

        newSocket.on('callRejected', () => {
            toast.error('Call was rejected');
            endCall();
        });

        newSocket.on('callEnded', () => {
            endCall();
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    // Socket event listeners that depend on other states
    useEffect(() => {
        if (!socket || !webRTC) return;

        const handleCallAccepted = (signal: any) => {
            setCallAccepted(true);
            if (webRTC) {
                webRTC.handleAnswer(signal);
            }
        };

        const handleTranslation = (data: any) => {
            if (speakerEnabled) {
                TTS(data.translated, { language: data.toLang });
            }
            setTranslations(prev => [...prev, { ...data, isSent: false, id: `trans-${Date.now()}` }]);
        };

        const handleIceCandidate = (candidate: any) => {
            if (webRTC) {
                webRTC.handleIceCandidate(candidate);
            }
        };

        socket.on('callAccepted', handleCallAccepted);
        socket.on('translation', handleTranslation);
        socket.on('ice-candidate', handleIceCandidate);

        return () => {
            socket.off('callAccepted', handleCallAccepted);
            socket.off('translation', handleTranslation);
            socket.off('ice-candidate', handleIceCandidate);
        };
    }, [socket, webRTC, speakerEnabled]);

    // Initialize WebRTC when socket is ready
    useEffect(() => {
        if (socket && !webRTC) {
            const rtcService = new WebRTCService(socket);
            setWebRTC(rtcService);

            rtcService.onRemoteStream((stream) => {
                setRemoteStream(stream);
            });
        }
    }, [socket]);

    // Start local video stream
    useEffect(() => {
        const startLocalStream = async () => {
            if (webRTC) {
                try {
                    const stream = await webRTC.getUserMedia();
                    // Mute the audio track so original voice is not sent
                    const audioTrack = stream.getAudioTracks()[0];
                    if (audioTrack) audioTrack.enabled = false;
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

    // Initialize STT for translation (only when call is accepted and audioEnabled)
    useEffect(() => {
        if (callAccepted && myLanguage && audioEnabled) {
            let interimTranscript = '';
            const stt = STT({ language: myLanguage.value, continuous: true, interimResults: true }, {
                onResult: ({ transcript, isFinal }) => {
                    // Always show interim/final transcript in UI (real-time)
                    if (isFinal && transcript.trim()) {
                        handleTranslation(transcript);
                        interimTranscript = '';
                    } else if (transcript.trim()) {
                        // Show interim transcript as a temporary translation
                        interimTranscript = transcript;
                        setTranslations(prev => {
                            // Remove previous interim
                            const filtered = prev.filter(msg => !msg.id.startsWith('interim-'));
                            return [
                                ...filtered,
                                {
                                    id: `interim-${Date.now()}`,
                                    original: transcript,
                                    translated: '...',
                                    fromLang: myLanguage.value,
                                    toLang: targetLanguage?.value || '',
                                    timestamp: new Date(),
                                    isSent: true
                                }
                            ];
                        });
                    }
                },
                onError: (err) => toast.error(err)
            });
            if (stt) {
                sttRef.current = stt;
                stt.start();
            }
        } else {
            if (sttRef.current) {
                sttRef.current.stop();
                sttRef.current = null;
            }
        }
        return () => {
            if (sttRef.current) {
                sttRef.current.stop();
            }
        };
    }, [callAccepted, myLanguage, audioEnabled, targetLanguage]);

    const handleTranslation = (text: string) => {
        if (socket && webRTC && myLanguage && targetLanguage) {
            const payload = {
                text,
                fromLang: myLanguage.value,
                toLang: targetLanguage.value,
            };
            socket.emit('translation', payload);
            setTranslations(prev => [...prev, {
                id: `trans-${Date.now()}`,
                original: text,
                translated: '...',
                fromLang: myLanguage.value,
                toLang: targetLanguage.value,
                timestamp: new Date(),
                isSent: true
            }]);
        }
    };

    const callUser = async () => {
        if (!webRTC || !callerId.trim()) {
            toast.error('Please enter a valid caller ID');
            return;
        }
        if (!targetLanguage) {
            toast.error('Please select a language to listen in');
            return;
        }
        try {
            const offer = await webRTC.createOffer();
            webRTC.callUser({
                phone: callerId,
                signalData: offer,
                from: myId,
                fromLang: myLanguage?.value || 'en',
                toLang: targetLanguage.value
            });
        } catch (error) {
            toast.error('Failed to start call');
        }
    };

    const answerCall = async () => {
        if (!webRTC || !incomingCall || !myLanguage) {
            toast.error("Please select a language first.");
            return
        };

        try {
            const answer = await webRTC.createAnswer(incomingCall.signal);

            webRTC.answerCall({
                to: incomingCall.from,
                signal: answer,
                fromLang: myLanguage.value,
                toLang: incomingCall.fromLang
            });

            setTargetLanguage({ value: incomingCall.fromLang, label: ISO6391.getName(incomingCall.fromLang) });
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
        if (sttRef.current) {
            sttRef.current.stop();
        }
        setCallAccepted(false);
        setIncomingCall(null);
        setRemoteStream(null);
        setTranslations([]);
    };

    // Toggle video on/off
    const toggleVideo = () => {
        if (webRTC) {
            const newState = !videoEnabled;
            webRTC.toggleVideo(newState);
            setVideoEnabled(newState);
        }
    };

    // Toggle translation (STT) on/off, not original audio
    const toggleAudio = () => {
        setAudioEnabled((prev) => {
            const newState = !prev;
            if (newState && callAccepted && sttRef.current) {
                sttRef.current.start();
            } else if (!newState && sttRef.current) {
                sttRef.current.stop();
            }
            return newState;
        });
    };

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
        <div className="min-h-screen bg-gradient-to-br from-[#1e40af] via-[#22c55e]/30 to-white dark:from-[#0f172a] dark:to-[#1e293b] p-0 sm:p-4 flex flex-col">
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col gap-4 lg:gap-6 flex-1 w-full">
                    {/* Video Section */}
                    <div className="flex flex-col gap-4 lg:gap-6 flex-1">
                        {/* Connection Status & Call Input */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/80 dark:bg-[#1e293b]/80 rounded-2xl shadow-lg border border-[#22c55e]/20 px-4 py-3">
                            <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {isConnected ? `Your ID: ${myId}` : 'Connecting...'}
                                </span>
                            </div>
                            {!callAccepted && !incomingCall && (
                                <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                    {!showCallSetup ? (
                                        <Button onClick={() => setShowCallSetup(true)} className="w-full sm:w-auto bg-[#1e40af] hover:bg-[#1e3a8a] text-white">
                                            <Phone className="mr-2" />
                                            New Call
                                        </Button>
                                    ) : (
                                        <div className="flex flex-col sm:flex-row gap-2 w-full">
                                            {step === 'idle' && (
                                                <>
                                                    <Button onClick={() => setStep('language')} className="w-full">Select Language</Button>
                                                    <Button onClick={() => setShowCallSetup(false)} variant="outline">Cancel</Button>
                                                </>
                                            )}
                                            {step === 'language' && (
                                                <div className='flex flex-col gap-2 w-full sm:w-72'>
                                                    <Select
                                                        options={languageOptions}
                                                        value={targetLanguage}
                                                        onChange={handleTargetLanguageChange}
                                                        placeholder="Translate to..."
                                                        className="w-full"
                                                    />
                                                    <Button onClick={() => setStep('callerId')} disabled={!targetLanguage}>Next</Button>
                                                </div>
                                            )}
                                            {step === 'callerId' && (
                                                <div className='flex flex-col gap-2 w-full sm:w-72'>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter Caller ID"
                                                        value={callerId}
                                                        onChange={(e) => setCallerId(e.target.value)}
                                                        className="w-full"
                                                    />
                                                    <Button onClick={callUser} disabled={!callerId.trim()}>
                                                        <Phone className="mr-2" /> Call
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Video Grid */}
                        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                            {/* Local Video */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#1e40af]/20 bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-xl">
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    muted
                                    playsInline
                                    className="w-full aspect-video object-cover rounded-3xl"
                                />
                                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">You</div>
                            </div>

                            {/* Remote Video */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#22c55e]/20 bg-black/20 dark:bg-black/40 backdrop-blur-xl">
                                {remoteStream ? (
                                    <video
                                        ref={remoteVideoRef}
                                        autoPlay
                                        playsInline
                                        className="w-full aspect-video object-cover rounded-3xl"
                                    />
                                ) : (
                                    <div className="w-full aspect-video flex items-center justify-center">
                                        <p className="text-gray-600 dark:text-gray-400">Waiting for other user...</p>
                                    </div>
                                )}
                                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">Remote</div>
                            </div>

                            {/* Call Controls */}
                            {callAccepted && (
                                <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-white/80 dark:bg-[#1e293b]/80 rounded-full shadow-lg p-3">
                                    <Button onClick={toggleVideo} variant="ghost" size="icon" className="rounded-full">
                                        {videoEnabled ? <Video /> : <VideoOff className="text-red-500" />}
                                    </Button>
                                    <Button onClick={toggleAudio} variant="ghost" size="icon" className="rounded-full">
                                        {audioEnabled ? <Mic /> : <MicOff className="text-red-500" />}
                                    </Button>
                                    <Button onClick={() => setSpeakerEnabled(!speakerEnabled)} variant="ghost" size="icon" className="rounded-full">
                                        {speakerEnabled ? <Volume2 /> : <VolumeX className="text-red-500" />}
                                    </Button>
                                    <Button onClick={endCall} variant="destructive" size="icon" className="rounded-full">
                                        <PhoneOff />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Translation Panel */}
                    {callAccepted && (
                        <Card className="w-full lg:w-96 bg-white/80 dark:bg-[#1e293b]/80 border-[#22c55e]/20 shadow-lg rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">Live Translation</CardTitle>
                            </CardHeader>
                            <CardContent className="h-96 overflow-y-auto p-4 space-y-4">
                                {translations.map((msg) => (
                                    <div key={msg.id} className={`flex flex-col ${msg.isSent ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-xs p-3 rounded-xl ${msg.isSent ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                                            <div className="text-xs opacity-60">{msg.fromLang} → {msg.toLang}</div>
                                            <div className="font-semibold">{msg.original}</div>
                                            <div className="italic">{msg.translated}</div>
                                            <p className="text-xs opacity-70 mt-1">{msg.timestamp instanceof Date ? msg.timestamp.toLocaleTimeString() : ''}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Incoming Call Modal */}
                {incomingCall && !callAccepted && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                        <div className="w-full max-w-sm sm:w-96 bg-white rounded-3xl shadow-2xl border-2 border-[#22c55e]/30 p-6 text-center space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">Incoming Call</h2>
                            <p className="text-gray-600">From: {incomingCall.from}</p>
                            <p className="text-gray-600">Wants to speak in: <span className='font-bold'>{ISO6391.getName(incomingCall.fromLang)}</span></p>
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-700">I will speak in:</p>
                                <Select
                                    options={languageOptions}
                                    value={myLanguage}
                                    onChange={handleMyLanguageChange}
                                    placeholder="Select your language"
                                    className="w-full text-left"
                                />
                            </div>
                            <div className="flex justify-around items-center pt-4">
                                <Button onClick={answerCall} disabled={!myLanguage} className="bg-green-500 hover:bg-green-600 text-white rounded-full w-20 h-20 flex items-center justify-center">
                                    <Phone size={30} />
                                </Button>
                                <Button onClick={rejectCall} className="bg-red-500 hover:bg-red-600 text-white rounded-full w-20 h-20 flex items-center justify-center">
                                    <PhoneOff size={30} />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoCall;