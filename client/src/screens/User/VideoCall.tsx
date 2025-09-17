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

    // Only translated language and call setup state needed
    const [targetLanguage, setTargetLanguage] = useState<LanguageOption | null>(null);
    const [showCallSetup, setShowCallSetup] = useState(false);
    const [step, setStep] = useState<'idle' | 'language' | 'callerId'>('idle');

    // Refs
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

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
    // Translation and STT logic removed for this step-by-step call flow

    // handleTranslation removed for this step-by-step call flow

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
                fromLang: 'en', // default or detected
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

    // Removed unused translation/listening logic and myLanguage change handler
    const handleTargetLanguageChange = (option: SingleValue<LanguageOption>) => {
        if (option) {
            setTargetLanguage(option);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e40af] via-[#22c55e]/30 to-white dark:from-[#0f172a] dark:to-[#1e293b] p-0 sm:p-4 flex flex-col">
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-4">
                <div className="flex flex-col gap-4 lg:gap-6 flex-1 w-full">
                    {/* Video Section - now full width */}
                    <div className="flex flex-col gap-4 lg:gap-6 w-full">
                        {/* Connection Status & Call Input */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/80 dark:bg-[#1e293b]/80 rounded-2xl shadow-lg border border-[#22c55e]/20 px-4 py-3">
                            <div className="flex items-center space-x-2">
                                <Badge variant={isConnected ? "default" : "destructive"} className={isConnected ? "bg-[#22c55e] text-white" : ""}>
                                    {isConnected ? "Connected" : "Disconnected"}
                                </Badge>
                                {myId && (
                                    <div className="flex items-center gap-2 bg-white/80 dark:bg-[#1e293b]/80 rounded-xl px-3 py-2 border border-[#1e40af]/20 shadow">
                                        <span className="font-mono text-xs text-[#1e40af] select-all">My ID: {myId}</span>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="p-1 border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e]/10"
                                            onClick={() => { navigator.clipboard.writeText(myId); toast.success('Caller ID copied!'); }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6.75A2.25 2.25 0 0014.25 4.5h-6A2.25 2.25 0 006 6.75v10.5A2.25 2.25 0 008.25 19.5h6a2.25 2.25 0 002.25-2.25v-1.5M9.75 15.75h6A2.25 2.25 0 0018 13.5v-6A2.25 2.25 0 0015.75 5.25h-6A2.25 2.25 0 007.5 7.5v6a2.25 2.25 0 002.25 2.25z" />
                                            </svg>
                                        </Button>
                                    </div>
                                )}
                            </div>
                            {!callAccepted && !incomingCall && (
                                <>
                                    {step === 'idle' && (
                                        <Button
                                            onClick={() => { setShowCallSetup(true); setStep('language'); }}
                                            className="w-full sm:w-auto bg-gradient-to-r from-[#1e40af] to-[#22c55e] text-white font-bold shadow-md hover:from-[#1e40af]/90 hover:to-[#22c55e]/90"
                                        >
                                            Start a New Call
                                        </Button>
                                    )}
                                    {step === 'language' && (
                                        <div className="flex flex-col gap-2 w-full max-w-xs">
                                            <label className="text-xs font-semibold text-[#22c55e] mb-1">Listen in (translated)</label>
                                            <Select
                                                options={languageOptions}
                                                value={targetLanguage}
                                                onChange={option => { handleTargetLanguageChange(option); if (option) setStep('callerId'); }}
                                                placeholder="Select language..."
                                                isSearchable
                                                className="text-[#1f2937]"
                                                styles={{
                                                    control: (base, state) => ({
                                                        ...base,
                                                        backgroundColor: 'white',
                                                        borderColor: state.isFocused ? '#22c55e' : '#cbd5e1',
                                                        borderWidth: '1px',
                                                        borderRadius: '0.75rem',
                                                        boxShadow: 'none',
                                                        minHeight: '36px',
                                                        fontSize: '14px',
                                                        '&:hover': {
                                                            borderColor: '#22c55e',
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
                                                        backgroundColor: state.isSelected ? '#22c55e' : state.isFocused ? '#f0f9ff' : 'white',
                                                        color: state.isSelected ? 'white' : '#1f2937',
                                                        cursor: 'pointer',
                                                        fontSize: '14px',
                                                    })
                                                }}
                                            />
                                        </div>
                                    )}
                                    {step === 'callerId' && (
                                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                                            <Input
                                                placeholder="Enter caller ID"
                                                value={callerId}
                                                onChange={(e) => setCallerId(e.target.value)}
                                                className="w-full sm:w-64 rounded-xl border-[#1e40af]/30"
                                            />
                                            <Button
                                                onClick={callUser}
                                                disabled={
                                                    !isConnected ||
                                                    !callerId.trim() ||
                                                    !targetLanguage?.value
                                                }
                                                className="w-full sm:w-auto bg-gradient-to-r from-[#1e40af] to-[#22c55e] text-white font-bold shadow-md hover:from-[#1e40af]/90 hover:to-[#22c55e]/90"
                                            >
                                                <PhoneCall className="w-4 h-4 mr-2" />
                                                Call
                                            </Button>
                                        </div>
                                    )}
                                </>
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
                                <div className="absolute top-3 left-3">
                                    <Badge className="text-xs bg-[#1e40af] text-white shadow">You</Badge>
                                </div>
                            </div>

                            {/* Remote Video */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#22c55e]/20 bg-white/60 dark:bg-[#1e293b]/60 backdrop-blur-xl">
                                <video
                                    ref={remoteVideoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full aspect-video object-cover rounded-3xl"
                                />
                                <div className="absolute top-3 left-3">
                                    <Badge className="text-xs bg-[#22c55e] text-white shadow">Remote</Badge>
                                </div>
                                {!callAccepted && !incomingCall && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1e40af]/80 to-[#22c55e]/80">
                                        <p className="text-white text-lg font-semibold">No call active</p>
                                    </div>
                                )}
                            </div>

                            {/* Floating Call Controls */}
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 flex items-center justify-center space-x-2 sm:space-x-4 bg-white/80 dark:bg-[#1e293b]/80 rounded-full shadow-xl px-4 py-2 border border-[#1e40af]/10 backdrop-blur-xl">
                                <Button
                                    variant={videoEnabled ? "default" : "destructive"}
                                    size="icon"
                                    className={`rounded-full ${videoEnabled ? 'bg-[#1e40af] text-white' : 'bg-red-500 text-white'} shadow`}
                                    onClick={toggleVideo}
                                >
                                    {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                                </Button>
                                <Button
                                    variant={audioEnabled ? "default" : "destructive"}
                                    size="icon"
                                    className={`rounded-full ${audioEnabled ? 'bg-[#22c55e] text-white' : 'bg-red-500 text-white'} shadow`}
                                    onClick={toggleAudio}
                                >
                                    {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                                </Button>
                                <Button
                                    variant={speakerEnabled ? "default" : "destructive"}
                                    size="icon"
                                    className={`rounded-full ${speakerEnabled ? 'bg-[#1e40af] text-white' : 'bg-red-500 text-white'} shadow`}
                                    onClick={() => setSpeakerEnabled(!speakerEnabled)}
                                >
                                    {speakerEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                                </Button>
                                {(callAccepted || incomingCall) && (
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="rounded-full bg-red-600 text-white shadow hover:bg-red-700"
                                        onClick={endCall}
                                    >
                                        <PhoneOff className="w-5 h-5" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Translation panel removed for full-width video/call UI */}
                </div>

                {/* Incoming Call Modal */}
                {incomingCall && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                        <div className="w-full max-w-sm sm:w-96 bg-white rounded-3xl shadow-2xl border-2 border-[#22c55e]/30 p-6 text-center space-y-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#22c55e]/80 to-[#1e40af]/80 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                <Phone className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#1e40af]">Incoming Call</h3>
                                <p className="text-base text-[#334155] font-medium">
                                    {incomingCall.name || incomingCall.from}
                                </p>
                                <p className="text-sm text-[#22c55e] font-semibold">
                                    {ISO6391.getName(incomingCall.fromLang)} → {ISO6391.getName(incomingCall.toLang)}
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                <Button
                                    variant="destructive"
                                    className="flex-1 text-sm rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold shadow"
                                    size="sm"
                                    onClick={rejectCall}
                                >
                                    <PhoneOff className="w-4 h-4 mr-2" />
                                    Decline
                                </Button>
                                <Button
                                    variant="default"
                                    className="flex-1 text-sm rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold shadow"
                                    size="sm"
                                    onClick={answerCall}
                                >
                                    <Phone className="w-4 h-4 mr-2" />
                                    Accept
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default VideoCall