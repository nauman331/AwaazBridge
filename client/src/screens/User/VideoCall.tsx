import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Settings, Volume2, VolumeX, Copy, CheckCircle2, Users, MessageSquare } from 'lucide-react';
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
    isSending?: boolean; // Flag for messages awaiting confirmation
    isRealTime?: boolean; // New field for real-time translations
}

const VideoCall: React.FC = () => {
    // Refs
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const webRTCRef = useRef<WebRTCService | null>(null);
    const localSttRef = useRef<any>(null);
    const remoteSttRef = useRef<any>(null);

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
    const [isCopied, setIsCopied] = useState(false);
    const [hasRemoteVideo, setHasRemoteVideo] = useState(false);
    const [isRemoteListening, setIsRemoteListening] = useState(false);
    const [remoteTranscript, setRemoteTranscript] = useState('');
    const [sttRetryDelay, setSttRetryDelay] = useState(1000); // Initial retry delay of 1s
    // Initialize WebRTC service
    useEffect(() => {
        const webRTC = new WebRTCService();
        webRTCRef.current = webRTC;

        // Setup WebRTC event handlers
        webRTC.onLocalStream = (stream) => {
            console.log('📹 Local stream received:', stream?.getTracks().map(t => t.kind));
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }

            if (stream) {
                // Update media state based on available tracks
                const videoTrack = stream.getVideoTracks()[0];
                const audioTrack = stream.getAudioTracks()[0];
                setMediaState(prev => ({
                    ...prev,
                    isVideoEnabled: videoTrack ? videoTrack.enabled : false,
                    isAudioEnabled: audioTrack ? audioTrack.enabled : true,
                }));
            }
        };

        webRTC.onRemoteStream = (stream) => {
            console.log('📹 Remote stream received:', stream?.getTracks().map(t => `${t.kind}:${t.enabled}`));
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = stream;
                // Mute the video element to prevent direct audio playback, TTS will be used.
                remoteVideoRef.current.muted = true;
            }
            setHasRemoteVideo(!!stream && stream.getVideoTracks().length > 0);
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
            startLocalListening();

            // Start remote listening after a delay to ensure connection is stable
            setTimeout(startRemoteListening, 2000);
        };

        webRTC.onCallRejected = () => {
            setCallState(prev => ({
                ...prev,
                isOutgoingCall: false,
                isIncomingCall: false,
                incomingCallData: null,
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

            // Prevent call state from being reset when connection is stable
            if (state === 'connected' || state === 'connecting') {
                // Keep call active
                console.log('🔗 Connection stable, maintaining call state');
            }
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

    // Local STT Setup (for user's speech)
    const startLocalListening = useCallback(() => {
        if (!callState.isInCall) return;

        const sttInstance = STT({
            language: languages.myInputLang,
            continuous: true,
            interimResults: true,
            shouldContinue: () => callState.isInCall,
            instanceId: 'local'
        }, {
            onResult: (result) => {
                if (result.instanceId === 'local') {
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
                            isSending: true, // Mark as sending
                            isRealTime: false
                        }]);

                        setCurrentTranscript('');
                    }
                }
            },
            onStart: () => setIsListening(true),
            onEnd: () => setIsListening(false),
            onError: (error) => {
                console.error('Local STT Error:', error);
                setIsListening(false);
            }
        });

        if (sttInstance) {
            localSttRef.current = sttInstance;
            sttInstance.start();
        }
    }, [callState.isInCall, languages]);

    // Enhanced Remote STT Setup using SpeechRecognition API properly
    const startRemoteListening = useCallback(() => {
        if (!callState.isInCall) {
            console.log('⚠️ Cannot start remote STT - call not active');
            return;
        }

        // Web Speech API doesn't work with MediaStream directly
        // Instead, we'll use continuous recognition for remote audio detection
        console.log('🎤 Starting remote STT (using continuous recognition)');

        const sttInstance = STT({
            language: languages.theirInputLang,
            continuous: true,
            interimResults: true,
            shouldContinue: () => callState.isInCall,
            instanceId: 'remote'
        }, {
            onResult: (result) => {
                if (result.instanceId === 'remote') {
                    setRemoteTranscript(result.transcript);

                    if (result.isFinal && result.transcript.trim()) {
                        console.log('🌐 Remote speech detected:', result.transcript);

                        // Create real-time translation entry
                        const newTranslation: TranslationDisplay = {
                            original: result.transcript,
                            translated: '(Translating...)',
                            timestamp: new Date(),
                            isFromMe: false,
                            isRealTime: true
                        };

                        setTranslations(prev => [...prev, newTranslation]);

                        // Send translation request via Socket.IO (not HTTP API)
                        webRTCRef.current?.sendTranslation(
                            result.transcript,
                            languages.theirInputLang,
                            languages.myOutputLang
                        );

                        // Update the translation entry to show it's being processed
                        setTimeout(() => {
                            setTranslations(prev =>
                                prev.map(trans =>
                                    trans.isRealTime &&
                                        trans.translated === '(Translating...)' &&
                                        Math.abs(new Date(trans.timestamp).getTime() - newTranslation.timestamp.getTime()) < 2000
                                        ? { ...trans, translated: '(Processing via server...)' }
                                        : trans
                                )
                            );
                        }, 1000);

                        setRemoteTranscript('');
                    }
                }
            },
            onStart: () => {
                console.log('🎤 Remote STT started');
                setIsRemoteListening(true);
                setSttRetryDelay(1000); // Reset retry delay on successful start
            },
            onEnd: () => {
                console.log('🎤 Remote STT ended');
                setIsRemoteListening(false);
            },
            onError: (error) => {
                console.error('Remote STT Error:', error);
                setIsRemoteListening(false);

                // Handle specific, unrecoverable errors by notifying the user.
                if (error.includes('not-allowed')) {
                    toast.error("Microphone permission denied for translation service. Please enable it in your browser's site settings.", {
                        duration: Infinity, // Keep the toast visible until dismissed
                    });
                    return; // Stop retry attempts for permission errors
                }

                // Implement exponential backoff for network errors
                if (error.includes('network') && callState.isInCall) {
                    const nextDelay = Math.min(sttRetryDelay * 2, 30000); // Max 30s delay
                    console.log(`Retrying remote STT in ${nextDelay / 1000}s due to network error...`);
                    setTimeout(() => {
                        if (webRTCRef.current?.isCallActive()) {
                            startRemoteListening();
                        }
                    }, nextDelay);
                    setSttRetryDelay(nextDelay);
                }
            }
        });

        if (sttInstance) {
            remoteSttRef.current = sttInstance;
            sttInstance.start();
        }
    }, [callState.isInCall, languages]);

    // Add the missing stopListening function
    const stopListening = useCallback(() => {
        if (localSttRef.current) {
            localSttRef.current.stop();
            localSttRef.current = null;
        }
        if (remoteSttRef.current) {
            remoteSttRef.current.stop();
            remoteSttRef.current = null;
        }
        setIsListening(false);
        setIsRemoteListening(false);
        setCurrentTranscript('');
        setRemoteTranscript('');
    }, []);

    // Modified handleTranslationReceived to work with server translations
    const handleTranslationReceived = (data: TranslationData) => {
        console.log('📨 Translation received from server:', data);

        let wasMyMessageConfirmation = false;

        setTranslations(prev => {
            const updatedTranslations = prev.map(trans => {
                // Find the message we sent that is waiting for confirmation
                if (trans.isFromMe && trans.isSending && trans.original === data.original) {
                    wasMyMessageConfirmation = true;
                    return { ...trans, translated: data.translated, isSending: false };
                }
                return trans;
            });

            if (wasMyMessageConfirmation) {
                return updatedTranslations;
            } else {
                // It's a new message from the other user
                const newTranslation: TranslationDisplay = {
                    original: data.original,
                    translated: data.translated,
                    timestamp: new Date(data.timestamp),
                    isFromMe: false,
                };
                // Play translated audio for the other user's message
                if (mediaState.isSpeakerEnabled && data.translated) {
                    TTS(data.translated, {
                        language: languages.myOutputLang,
                        gender: 'female',
                    });
                }
                return [...prev, newTranslation];
            }
        });
    };

    // Enhanced call handling
    const handleCallUser = async () => {
        if (!targetUserId.trim()) {
            toast.error('Please enter a user ID to call');
            return;
        }

        if (!webRTCRef.current?.isSocketConnected()) {
            toast.error('Not connected to server. Please wait...');
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
            setCallState(prev => ({
                ...prev,
                isInCall: true,
                isIncomingCall: false,
                incomingCallData: null,
            }));

            await webRTCRef.current?.answerCall(callState.incomingCallData);
            startLocalListening();

            // Start remote listening for incoming calls with a longer delay
            setTimeout(startRemoteListening, 3000); // Increased delay to ensure connection is stable

        } catch (error) {
            console.error('Failed to answer call:', error);
            toast.error('Failed to answer call');
            setCallState(prev => ({
                ...prev,
                isInCall: false,
                isIncomingCall: true,
            }));
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
        setHasRemoteVideo(false);

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
                console.log(`🎤 Audio ${audioTrack.enabled ? 'enabled' : 'disabled'}`);
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
                console.log(`🎥 Video ${videoTrack.enabled ? 'enabled' : 'disabled'}`);
            } else {
                // No video track available
                toast.info('Camera not available for this call');
            }
        }
    };

    // Debug function to check stream status
    const checkStreamStatus = () => {
        const localStream = webRTCRef.current?.getLocalStream();
        const remoteStream = webRTCRef.current?.getRemoteStream();

        console.log('🔍 Stream Debug Info:');
        console.log('Call State:', callState);
        console.log('Local stream:', localStream);
        console.log('Local video tracks:', localStream?.getVideoTracks().map(t => ({
            kind: t.kind,
            enabled: t.enabled,
            readyState: t.readyState,
            muted: t.muted
        })));
        console.log('Local audio tracks:', localStream?.getAudioTracks().map(t => ({
            kind: t.kind,
            enabled: t.enabled,
            readyState: t.readyState,
            muted: t.muted
        })));

        console.log('Remote stream:', remoteStream);
        console.log('Remote video tracks:', remoteStream?.getVideoTracks().map(t => ({
            kind: t.kind,
            enabled: t.enabled,
            readyState: t.readyState,
            muted: t.muted
        })));
        console.log('Remote audio tracks:', remoteStream?.getAudioTracks().map(t => ({
            kind: t.kind,
            enabled: t.enabled,
            readyState: t.readyState,
            muted: t.muted
        })));

        if (localVideoRef.current) {
            console.log('Local video element:', {
                srcObject: !!localVideoRef.current.srcObject,
                readyState: localVideoRef.current.readyState,
                paused: localVideoRef.current.paused,
                videoWidth: localVideoRef.current.videoWidth,
                videoHeight: localVideoRef.current.videoHeight
            });
        }

        if (remoteVideoRef.current) {
            console.log('Remote video element:', {
                srcObject: !!remoteVideoRef.current.srcObject,
                readyState: remoteVideoRef.current.readyState,
                paused: remoteVideoRef.current.paused,
                videoWidth: remoteVideoRef.current.videoWidth,
                videoHeight: remoteVideoRef.current.videoHeight
            });

            // Try to manually assign the stream if it's missing
            if (!remoteVideoRef.current.srcObject && remoteStream) {
                console.log('🔄 Manually assigning remote stream to video element...');
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.load();

                // Wait for metadata and then play
                const tryPlay = async () => {
                    try {
                        await remoteVideoRef.current!.play();
                        console.log('✅ Manual remote video assignment successful');
                    } catch (e) {
                        console.error('❌ Manual remote video assignment failed:', e);
                    }
                };

                if (remoteVideoRef.current.readyState >= 1) {
                    tryPlay();
                } else {
                    remoteVideoRef.current.addEventListener('loadedmetadata', tryPlay, { once: true });
                }
            }

            // Try to force play if paused and has video
            if (remoteVideoRef.current.srcObject && remoteVideoRef.current.paused && hasRemoteVideo) {
                console.log('🔄 Attempting to force play remote video...');
                remoteVideoRef.current.play()
                    .then(() => {
                        console.log('✅ Remote video force played successfully');
                    })
                    .catch(e => console.error('❌ Failed to force play remote video:', e));
            }
        }

        console.log('UI State:', {
            hasRemoteVideo,
            mediaState
        });

        // Check if call state is incorrectly reset
        if (!callState.isInCall && webRTCRef.current?.isCallActive()) {
            console.log('🚨 Call state mismatch detected! Fixing...');
            setCallState(prev => ({
                ...prev,
                isInCall: true,
                isIncomingCall: false,
                isOutgoingCall: false,
            }));
        }
    };

    const toggleSpeaker = () => {
        setMediaState(prev => ({ ...prev, isSpeakerEnabled: !prev.isSpeakerEnabled }));
    }; const copySocketId = async () => {
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
                        {/* Enhanced Connection Status */}
                        <Alert>
                            <AlertDescription className="flex items-center gap-2 flex-wrap">
                                <Badge variant={callState.connectionState === 'connected' ? 'default' : 'secondary'}>
                                    {callState.connectionState}
                                </Badge>
                                <Badge variant={webRTCRef.current?.isSocketConnected() ? 'default' : 'destructive'} className="text-xs">
                                    {webRTCRef.current?.isSocketConnected() ? '🟢 Server Connected' : '🔴 Server Disconnected'}
                                </Badge>
                                {isListening && (
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                        🎤 Your Mic: Listening...
                                    </Badge>
                                )}
                                {isRemoteListening && (
                                    <Badge variant="outline" className="bg-green-50 text-green-700">
                                        🎧 Remote Audio: Processing...
                                    </Badge>
                                )}
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 text-xs">
                                    🔇 Remote Audio: Muted (TTS Only)
                                </Badge>
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 text-xs">
                                    ℹ️ Note: Both users need to speak for STT detection
                                </Badge>
                            </AlertDescription>
                        </Alert>

                        {/* Video Streams */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        You
                                        {!mediaState.isVideoEnabled && (
                                            <Badge variant="secondary" className="text-xs">Audio Only</Badge>
                                        )}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                                        <video
                                            ref={localVideoRef}
                                            autoPlay
                                            muted
                                            playsInline
                                            controls={false}
                                            className="w-full h-full object-cover"
                                            style={{
                                                display: mediaState.isVideoEnabled ? 'block' : 'none'
                                            }}
                                            onLoadedMetadata={() => console.log('📹 Local video metadata loaded')}
                                            onPlay={() => console.log('▶️ Local video started playing')}
                                            onPause={() => console.log('⏸️ Local video paused')}
                                            onError={(e) => console.error('❌ Local video error:', e)}
                                        />
                                        {!mediaState.isVideoEnabled && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                                                <div className="text-center text-white">
                                                    <Mic className="h-12 w-12 mx-auto mb-2" />
                                                    <p className="text-lg font-semibold">Audio Only</p>
                                                    <p className="text-sm opacity-75">Camera is off</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        Remote User
                                        <Badge variant="outline" className="text-xs">
                                            {callState.connectionState}
                                        </Badge>
                                        {callState.connectionState === 'connected' && !hasRemoteVideo && (
                                            <Badge variant="secondary" className="text-xs">Audio Only</Badge>
                                        )}
                                        {callState.connectionState === 'connected' && hasRemoteVideo && (
                                            <Badge variant="default" className="text-xs">Video</Badge>
                                        )}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative bg-gray-900 rounded-lg overflow-hidden group" style={{ aspectRatio: '16/9' }}>
                                        <video
                                            ref={remoteVideoRef}
                                            autoPlay
                                            playsInline
                                            controls={false}
                                            muted={true}
                                            className="w-full h-full object-cover"
                                            style={{
                                                display: hasRemoteVideo && callState.connectionState === 'connected' ? 'block' : 'none'
                                            }}
                                            onLoadedMetadata={() => {
                                                console.log('📹 Remote video metadata loaded');
                                                const videoElement = remoteVideoRef.current;
                                                if (videoElement) {
                                                    console.log('Video dimensions:', videoElement.videoWidth, 'x', videoElement.videoHeight);
                                                }
                                            }}
                                            onCanPlay={() => {
                                                console.log('📹 Remote video can play');
                                                if (remoteVideoRef.current && remoteVideoRef.current.paused) {
                                                    remoteVideoRef.current.play()
                                                        .then(() => console.log('✅ Auto-play after canplay event'))
                                                        .catch(e => console.log('⚠️ Auto-play after canplay failed:', e));
                                                }
                                            }}
                                            onPlay={() => console.log('▶️ Remote video started playing')}
                                            onPause={() => console.log('⏸️ Remote video paused')}
                                            onError={(e) => console.error('❌ Remote video error:', e)}
                                            onClick={async () => {
                                                // Manual play on click
                                                try {
                                                    if (remoteVideoRef.current && remoteVideoRef.current.paused) {
                                                        await remoteVideoRef.current.play();
                                                        console.log('✅ Manual play successful');
                                                    }
                                                } catch (e) {
                                                    console.error('❌ Manual play failed:', e);
                                                }
                                            }}
                                        />
                                        {callState.connectionState !== 'connected' && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                                <div className="text-center text-white">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                                                    <p className="text-sm opacity-75">Connecting...</p>
                                                </div>
                                            </div>
                                        )}
                                        {callState.connectionState === 'connected' && !hasRemoteVideo && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                                <div className="text-center text-white">
                                                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                                    <p className="text-lg font-semibold">Audio Only</p>
                                                    <p className="text-sm opacity-75">Remote user has no camera</p>
                                                </div>
                                            </div>
                                        )}
                                        {hasRemoteVideo && callState.connectionState === 'connected' && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover:opacity-100 group-[&:has(video:paused)]:opacity-100 transition-opacity"
                                                onClick={async () => {
                                                    try {
                                                        if (remoteVideoRef.current) {
                                                            console.log('🔄 Manual play attempt from overlay click');
                                                            await remoteVideoRef.current.play();
                                                        }
                                                    } catch (e) {
                                                        console.error('❌ Overlay click play failed:', e);
                                                    }
                                                }}>
                                                <div className="text-center text-white">
                                                    <Video className="h-12 w-12 mx-auto mb-2" />
                                                    <p className="text-lg font-semibold">Click to Play Video</p>
                                                    <p className="text-sm opacity-75">Video is paused. Click to resume.</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Current Speech - Enhanced */}
                        {(currentTranscript || remoteTranscript) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentTranscript && (
                                    <Card className="border-blue-500 bg-blue-50">
                                        <CardContent className="pt-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Mic className="h-4 w-4 text-blue-600" />
                                                <p className="text-sm font-medium text-blue-800">You're speaking:</p>
                                            </div>
                                            <p className="font-medium text-blue-900">{currentTranscript}</p>
                                        </CardContent>
                                    </Card>
                                )}
                                {remoteTranscript && (
                                    <Card className="border-green-500 bg-green-50">
                                        <CardContent className="pt-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <MessageSquare className="h-4 w-4 text-green-600" />
                                                <p className="text-sm font-medium text-green-800">They're speaking:</p>
                                            </div>
                                            <p className="font-medium text-green-900">{remoteTranscript}</p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        )}

                        {/* Call Controls */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex justify-center gap-4 flex-wrap">
                                    <Button
                                        onClick={toggleAudio}
                                        variant={mediaState.isAudioEnabled ? "default" : "destructive"}
                                        size="lg"
                                        title={mediaState.isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
                                    >
                                        {mediaState.isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                                    </Button>

                                    <Button
                                        onClick={toggleVideo}
                                        variant={mediaState.isVideoEnabled ? "default" : "destructive"}
                                        size="lg"
                                        title={mediaState.isVideoEnabled ? "Turn off camera" : "Turn on camera"}
                                    >
                                        {mediaState.isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                                    </Button>

                                    <Button
                                        onClick={toggleSpeaker}
                                        variant={mediaState.isSpeakerEnabled ? "default" : "destructive"}
                                        size="lg"
                                        title={mediaState.isSpeakerEnabled ? "Mute speaker" : "Unmute speaker"}
                                    >
                                        {mediaState.isSpeakerEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            if (!isRemoteListening) {
                                                startRemoteListening();
                                                toast.info('Started remote audio processing');
                                            } else {
                                                if (remoteSttRef.current) {
                                                    remoteSttRef.current.stop();
                                                    toast.info('Stopped remote audio processing');
                                                }
                                            }
                                        }}
                                        variant={isRemoteListening ? "default" : "outline"}
                                        size="lg"
                                        title="Toggle remote audio processing"
                                    >
                                        {isRemoteListening ? "🎧 ON" : "🎧 OFF"}
                                    </Button>

                                    <Button
                                        onClick={checkStreamStatus}
                                        variant="outline"
                                        size="lg"
                                        title="Debug stream info (Check console)"
                                    >
                                        🔍
                                    </Button>

                                    <Button
                                        onClick={() => webRTCRef.current?.endCall()}
                                        variant="destructive"
                                        size="lg"
                                        title="End call"
                                    >
                                        <PhoneOff className="h-5 w-5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Translation History - Enhanced */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5" />
                                    Real-time Translation History
                                    <Badge variant="outline" className="text-xs">
                                        {translations.filter(t => t.isRealTime).length} real-time • {translations.filter(t => !t.isRealTime).length} manual
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {translations.map((translation, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "p-4 rounded-lg border-l-4",
                                                translation.isFromMe
                                                    ? "bg-blue-50 ml-8 border-l-blue-500"
                                                    : translation.isRealTime
                                                        ? "bg-green-50 mr-8 border-l-green-500"
                                                        : "bg-gray-50 mr-8 border-l-gray-400"
                                            )}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant={translation.isFromMe ? "default" : "secondary"}>
                                                        {translation.isFromMe ? "You" : "Them"}
                                                    </Badge>
                                                    {translation.isRealTime && (
                                                        <Badge variant="outline" className="text-xs bg-green-100 text-green-700">
                                                            Real-time
                                                        </Badge>
                                                    )}
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    {translation.timestamp.toLocaleTimeString()}
                                                </span>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Original:</span> {translation.original}
                                                </p>
                                                <p className="font-medium">
                                                    <span className="text-sm text-gray-600">Translated:</span> {translation.translated}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {translations.length === 0 && (
                                        <div className="text-center py-8 text-gray-500">
                                            <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                            <p>No translations yet. Start speaking to see real-time translations!</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoCall;