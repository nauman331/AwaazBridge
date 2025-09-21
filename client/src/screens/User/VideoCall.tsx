import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Settings, Volume2, VolumeX, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { LanguageSelector } from '../../components/ui/language-selector';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';
import WebRTCService from '../../services/WebRTCService';
import type { CallData, TranslationData } from '../../services/WebRTCService';
import STT from '../../hooks/STT';
import TTS from '../../hooks/TTS';
import { toast } from 'sonner';
import { cn } from '../../lib/utils';

interface CallState {
    isInCall: boolean;
    isIncomingCall: boolean;
    isOutgoingCall: boolean;
    incomingCallData: CallData | null;
    connectionState: RTCPeerConnectionState;
}

interface MediaState {
    isAudioEnabled: boolean;
    isVideoEnabled: boolean;
    isSpeakerEnabled: boolean;
}

interface LanguageState {
    myInputLang: string;
    myOutputLang: string;
    theirInputLang: string;
    theirOutputLang: string;
}

interface TranslationDisplay {
    original: string;
    translated: string;
    timestamp: Date;
    isFromMe: boolean;
}

const VideoCall: React.FC = () => {
    // Refs
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const webRTCRef = useRef<WebRTCService | null>(null);
    const sttRef = useRef<any>(null);

    // State
    const [callState, setCallState] = useState<CallState>({
        isInCall: false,
        isIncomingCall: false,
        isOutgoingCall: false,
        incomingCallData: null,
        connectionState: 'new',
    });

    const [mediaState, setMediaState] = useState<MediaState>({
        isAudioEnabled: true,
        isVideoEnabled: true,
        isSpeakerEnabled: true,
    });

    const [languages, setLanguages] = useState<LanguageState>({
        myInputLang: 'en',
        myOutputLang: 'ur',
        theirInputLang: 'ur',
        theirOutputLang: 'en',
    });

    const [targetUserId, setTargetUserId] = useState('');
    const [translations, setTranslations] = useState<TranslationDisplay[]>([]);
    const [isListening, setIsListening] = useState(false);
    const [currentTranscript, setCurrentTranscript] = useState('');
    const [mySocketId, setMySocketId] = useState<string>('');
    const [isCopied, setIsCopied] = useState(false);    // Initialize WebRTC service
    useEffect(() => {
        const webRTC = new WebRTCService();
        webRTCRef.current = webRTC;

        // Setup WebRTC event handlers
        webRTC.onLocalStream = (stream) => {
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
        };

        webRTC.onRemoteStream = (stream) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
            }
        };

        webRTC.onCallReceived = (data) => {
            setCallState(prev => ({
                ...prev,
                isIncomingCall: true,
                incomingCallData: data,
            }));
        };

        webRTC.onCallAccepted = () => {
            setCallState(prev => ({
                ...prev,
                isInCall: true,
                isOutgoingCall: false,
            }));
            startListening();
        };

        webRTC.onCallRejected = () => {
            setCallState(prev => ({
                ...prev,
                isOutgoingCall: false,
            }));
            toast.error('Call was rejected');
        };

        webRTC.onCallEnded = () => {
            handleCallEnd();
        };

        webRTC.onTranslationReceived = (data) => {
            handleTranslationReceived(data);
        };

        webRTC.onConnectionStateChange = (state) => {
            setCallState(prev => ({ ...prev, connectionState: state }));
        };

        webRTC.onError = (error) => {
            toast.error(error);
        };

        // Get and set socket ID when connection is established
        const checkSocketId = () => {
            const socketId = webRTC.getSocketId();
            if (socketId) {
                setMySocketId(socketId);
            }
        };

        // Check socket ID periodically until we get it
        const socketIdInterval = setInterval(() => {
            checkSocketId();
            if (webRTC.getSocketId()) {
                clearInterval(socketIdInterval);
            }
        }, 100);

        return () => {
            clearInterval(socketIdInterval);
            webRTC.destroy();
        };
    }, []);

    // STT Setup
    const startListening = useCallback(() => {
        if (!callState.isInCall) return;

        const sttInstance = STT({
            language: languages.myInputLang,
            continuous: true,
            interimResults: true,
            shouldContinue: () => callState.isInCall,
        }, {
            onResult: (result) => {
                setCurrentTranscript(result.transcript);

                if (result.isFinal && result.transcript.trim()) {
                    // Send translation to other user
                    webRTCRef.current?.sendTranslation(
                        result.transcript,
                        languages.myInputLang,
                        languages.theirOutputLang
                    );

                    // Add to local display
                    setTranslations(prev => [...prev, {
                        original: result.transcript,
                        translated: '(Sending...)',
                        timestamp: new Date(),
                        isFromMe: true,
                    }]);

                    setCurrentTranscript('');
                }
            },
            onStart: () => setIsListening(true),
            onEnd: () => setIsListening(false),
            onError: (error) => {
                console.error('STT Error:', error);
                setIsListening(false);
            }
        });

        if (sttInstance) {
            sttRef.current = sttInstance;
            sttInstance.start();
        }
    }, [callState.isInCall, languages]);

    const stopListening = useCallback(() => {
        if (sttRef.current) {
            sttRef.current.stop();
            sttRef.current = null;
        }
        setIsListening(false);
        setCurrentTranscript('');
    }, []);

    const handleTranslationReceived = (data: TranslationData) => {
        setTranslations(prev => [...prev, {
            original: data.original,
            translated: data.translated,
            timestamp: data.timestamp,
            isFromMe: false,
        }]);

        // Play translated audio
        if (mediaState.isSpeakerEnabled && data.translated) {
            TTS(data.translated, {
                language: languages.myOutputLang,
                gender: 'female',
            });
        }
    };

    const handleCallUser = async () => {
        if (!targetUserId.trim()) {
            toast.error('Please enter a user ID to call');
            return;
        }

        try {
            setCallState(prev => ({ ...prev, isOutgoingCall: true }));
            await webRTCRef.current?.callUser({
                userId: targetUserId,
                name: 'User',
                fromLang: languages.myInputLang,
                toLang: languages.theirOutputLang,
            });
        } catch (error) {
            setCallState(prev => ({ ...prev, isOutgoingCall: false }));
            toast.error('Failed to initiate call');
        }
    };

    const handleAnswerCall = async () => {
        if (!callState.incomingCallData) return;

        try {
            await webRTCRef.current?.answerCall(callState.incomingCallData);
            setCallState(prev => ({
                ...prev,
                isInCall: true,
                isIncomingCall: false,
                incomingCallData: null,
            }));
            startListening();
        } catch (error) {
            toast.error('Failed to answer call');
        }
    };

    const handleRejectCall = () => {
        if (!callState.incomingCallData) return;

        webRTCRef.current?.rejectCall(callState.incomingCallData);
        setCallState(prev => ({
            ...prev,
            isIncomingCall: false,
            incomingCallData: null,
        }));
    };

    const handleCallEnd = () => {
        stopListening();
        setCallState({
            isInCall: false,
            isIncomingCall: false,
            isOutgoingCall: false,
            incomingCallData: null,
            connectionState: 'new',
        });
        setTranslations([]);
        setCurrentTranscript('');

        // Clear video elements
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = null;
        }
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
        }
    };

    const toggleAudio = () => {
        const stream = webRTCRef.current?.getLocalStream();
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setMediaState(prev => ({ ...prev, isAudioEnabled: audioTrack.enabled }));
            }
        }
    };

    const toggleVideo = () => {
        const stream = webRTCRef.current?.getLocalStream();
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setMediaState(prev => ({ ...prev, isVideoEnabled: videoTrack.enabled }));
            }
        }
    };

    const toggleSpeaker = () => {
        setMediaState(prev => ({ ...prev, isSpeakerEnabled: !prev.isSpeakerEnabled }));
    };

    const copySocketId = async () => {
        if (mySocketId) {
            try {
                await navigator.clipboard.writeText(mySocketId);
                setIsCopied(true);
                toast.success('Socket ID copied to clipboard!');
                setTimeout(() => setIsCopied(false), 2000);
            } catch (error) {
                toast.error('Failed to copy Socket ID');
            }
        }
    }; return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Video className="h-6 w-6" />
                            AwazBridge - Real-time Voice Translation
                        </CardTitle>
                    </CardHeader>
                </Card>

                {/* My Socket ID */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">My Socket ID</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 mb-1">Share this ID with others to receive calls:</p>
                                <code className="bg-white px-3 py-2 rounded border font-mono text-sm">
                                    {mySocketId || 'Connecting...'}
                                </code>
                            </div>
                            <Button
                                onClick={copySocketId}
                                variant="outline"
                                size="sm"
                                disabled={!mySocketId}
                                className="flex items-center gap-2"
                            >
                                {isCopied ? (
                                    <>
                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-4 w-4" />
                                        Copy
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Language Settings */}
                {!callState.isInCall && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Language Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <LanguageSelector
                                value={languages.myInputLang}
                                onValueChange={(value) => setLanguages(prev => ({ ...prev, myInputLang: value }))}
                                label="I speak"
                            />
                            <LanguageSelector
                                value={languages.myOutputLang}
                                onValueChange={(value) => setLanguages(prev => ({ ...prev, myOutputLang: value }))}
                                label="I want to hear"
                            />
                            <LanguageSelector
                                value={languages.theirInputLang}
                                onValueChange={(value) => setLanguages(prev => ({ ...prev, theirInputLang: value }))}
                                label="They speak"
                            />
                            <LanguageSelector
                                value={languages.theirOutputLang}
                                onValueChange={(value) => setLanguages(prev => ({ ...prev, theirOutputLang: value }))}
                                label="They want to hear"
                            />
                        </CardContent>
                    </Card>
                )}

                {/* Call Controls */}
                {!callState.isInCall && !callState.isIncomingCall && (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex gap-4 items-end">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium mb-2">
                                        User ID to Call
                                    </label>
                                    <input
                                        type="text"
                                        value={targetUserId}
                                        onChange={(e) => setTargetUserId(e.target.value)}
                                        placeholder="Enter socket ID or user identifier"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <Button
                                    onClick={handleCallUser}
                                    disabled={callState.isOutgoingCall}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    <Phone className="h-4 w-4 mr-2" />
                                    {callState.isOutgoingCall ? 'Calling...' : 'Call'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Incoming Call */}
                {callState.isIncomingCall && callState.incomingCallData && (
                    <Card className="border-green-500 bg-green-50">
                        <CardContent className="pt-6">
                            <div className="text-center space-y-4">
                                <h3 className="text-xl font-semibold">Incoming Call</h3>
                                <p>From: {callState.incomingCallData.from}</p>
                                <p>Languages: {callState.incomingCallData.fromLang} → {callState.incomingCallData.toLang}</p>
                                <div className="flex gap-4 justify-center">
                                    <Button onClick={handleAnswerCall} className="bg-green-600 hover:bg-green-700">
                                        <Phone className="h-4 w-4 mr-2" />
                                        Answer
                                    </Button>
                                    <Button onClick={handleRejectCall} variant="destructive">
                                        <PhoneOff className="h-4 w-4 mr-2" />
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Video Call Interface */}
                {callState.isInCall && (
                    <div className="space-y-6">
                        {/* Connection Status */}
                        <Alert>
                            <AlertDescription className="flex items-center gap-2">
                                <Badge variant={callState.connectionState === 'connected' ? 'default' : 'secondary'}>
                                    {callState.connectionState}
                                </Badge>
                                {isListening && (
                                    <Badge variant="outline" className="bg-red-50 text-red-700">
                                        🎤 Listening...
                                    </Badge>
                                )}
                            </AlertDescription>
                        </Alert>

                        {/* Video Streams */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>You</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <video
                                        ref={localVideoRef}
                                        autoPlay
                                        muted
                                        playsInline
                                        className="w-full h-64 bg-gray-900 rounded-lg object-cover"
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Remote User</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <video
                                        ref={remoteVideoRef}
                                        autoPlay
                                        playsInline
                                        className="w-full h-64 bg-gray-900 rounded-lg object-cover"
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Call Controls */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex justify-center gap-4">
                                    <Button
                                        onClick={toggleAudio}
                                        variant={mediaState.isAudioEnabled ? "default" : "destructive"}
                                        size="lg"
                                    >
                                        {mediaState.isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                                    </Button>

                                    <Button
                                        onClick={toggleVideo}
                                        variant={mediaState.isVideoEnabled ? "default" : "destructive"}
                                        size="lg"
                                    >
                                        {mediaState.isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                                    </Button>

                                    <Button
                                        onClick={toggleSpeaker}
                                        variant={mediaState.isSpeakerEnabled ? "default" : "destructive"}
                                        size="lg"
                                    >
                                        {mediaState.isSpeakerEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                                    </Button>

                                    <Button
                                        onClick={() => webRTCRef.current?.endCall()}
                                        variant="destructive"
                                        size="lg"
                                    >
                                        <PhoneOff className="h-5 w-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Current Speech */}
                        {currentTranscript && (
                            <Card className="border-blue-500 bg-blue-50">
                                <CardContent className="pt-6">
                                    <p className="text-sm text-gray-600">Speaking:</p>
                                    <p className="font-medium">{currentTranscript}</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Translation History */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Translation History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {translations.map((translation, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "p-4 rounded-lg",
                                                translation.isFromMe ? "bg-blue-50 ml-8" : "bg-green-50 mr-8"
                                            )}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge variant={translation.isFromMe ? "default" : "secondary"}>
                                                    {translation.isFromMe ? "You" : "Them"}
                                                </Badge>
                                                <span className="text-xs text-gray-500">
                                                    {translation.timestamp.toLocaleTimeString()}
                                                </span>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    Original: {translation.original}
                                                </p>
                                                <p className="font-medium">
                                                    Translated: {translation.translated}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoCall