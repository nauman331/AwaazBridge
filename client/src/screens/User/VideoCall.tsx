import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';
import { WebRTCService } from '../../services/WebRTCService';
import STT from '../../hooks/STT';
import TTS from '../../hooks/TTS';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Volume2, VolumeX, Copy } from 'lucide-react';
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
    const [remoteVideoHasContent, setRemoteVideoHasContent] = useState(false);
    const [showAudioOnlyOverlay, setShowAudioOnlyOverlay] = useState(false);

    // Translation and call setup state
    const [myLanguage, setMyLanguage] = useState<LanguageOption | null>({ value: 'en', label: 'English' });
    const [targetLanguage, setTargetLanguage] = useState<LanguageOption | null>(null);
    const [translations, setTranslations] = useState<TranslationMessage[]>([]);
    const [showCallSetup, setShowCallSetup] = useState(false);
    const [step, setStep] = useState<'idle' | 'language' | 'callerId'>('idle');

    // Refs - THE KEY FIX: Adding remote audio element
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const remoteAudioRef = useRef<HTMLAudioElement>(null);
    const sttRef = useRef<any>(null);

    // Language options
    const languageOptions: LanguageOption[] = ISO6391.getAllCodes().map(code => ({
        value: code,
        label: ISO6391.getName(code)
    }));

    // Check permissions early
    useEffect(() => {
        const checkPermissions = async () => {
            try {
                console.log('🔐 Checking media permissions');
                const permission = await navigator.permissions.query({ name: 'camera' as PermissionName });
                console.log('📷 Camera permission:', permission.state);

                const micPermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
                console.log('🎤 Microphone permission:', micPermission.state);

                if (permission.state === 'denied' || micPermission.state === 'denied') {
                    toast.error('Camera or microphone access denied. Please enable permissions in your browser settings.');
                }
            } catch (error) {
                console.log('⚠️ Permission API not supported, will request during media access');
            }
        };

        checkPermissions();
    }, []);

    // Initialize socket connection
    useEffect(() => {
        console.log('🔌 Initializing socket connection');
        const newSocket = io(socketUrl, {
            transports: ['websocket'],
        });
        setSocket(newSocket);

        newSocket.on('me', (id: string) => {
            console.log('✅ Socket connected with ID:', id);
            setMyId(id);
            setIsConnected(true);
        });

        newSocket.on('callUser', (data: any) => {
            console.log('📞 Incoming call received:', data);
            setIncomingCall(data);
        });

        newSocket.on('callRejected', () => {
            console.log('❌ Call was rejected');
            toast.error('Call was rejected');
            endCall();
        });

        newSocket.on('callEnded', () => {
            console.log('📞 Call ended by remote user');
            endCall();
        });

        newSocket.on('connection-issues', (data: any) => {
            console.log('⚠️ Connection issues reported:', data);
            if (data.type === 'ice-failure' && data.retries >= 3) {
                toast.error('Connection issues detected. The call may be unstable.');
            }
        });

        newSocket.on('disconnect', () => {
            console.log('🔌 Socket disconnected');
            setIsConnected(false);
        });

        return () => {
            console.log('🔌 Disconnecting socket');
            newSocket.disconnect();
        };
    }, []);

    // Socket event listeners that depend on other states
    useEffect(() => {
        if (!socket || !webRTC) return;

        const handleCallAccepted = (signal: any) => {
            console.log('✅ Call accepted, signal received:', signal);
            setCallAccepted(true);
            if (webRTC) {
                console.log('📞 Handling answer signal');
                webRTC.handleAnswer(signal);
            }
        };

        const handleTranslation = (data: any) => {
            console.log('🌐 Translation received:', data);
            console.log('🔊 Speaker enabled status:', speakerEnabled);
            console.log('🎵 Translation data:', {
                original: data.original,
                translated: data.translated,
                fromLang: data.fromLang,
                toLang: data.toLang,
                hasTranslatedText: !!data.translated
            });

            // Always play TTS for incoming translations (unless explicitly disabled)
            if (data.translated && data.translated.trim()) {
                console.log('🎤 Playing TTS for incoming translation:', data.translated.substring(0, 50) + '...');
                try {
                    TTS(data.translated, {
                        language: data.toLang || 'en',
                        gender: 'female' // Default to female voice
                    });
                } catch (error) {
                    console.error('❌ TTS Error:', error);
                }
            } else {
                console.warn('⚠️ No translated text to play via TTS');
            }

            // Add to translations list
            setTranslations(prev => [...prev, {
                ...data,
                isSent: false,
                id: `trans-${Date.now()}`,
                timestamp: new Date(data.timestamp || Date.now())
            }]);
        };

        const handleIceCandidate = (candidate: any) => {
            console.log('🧊 ICE candidate received:', candidate);
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
            console.log('🔄 Initializing WebRTC service');
            const rtcService = new WebRTCService(socket);
            setWebRTC(rtcService);

            rtcService.onRemoteStream((stream) => {
                console.log('🎵 Remote stream received, setting up audio/video');
                setRemoteStream(stream);

                // CRITICAL FIX: Set up remote audio for speaker output
                if (remoteAudioRef.current) {
                    console.log('🔊 Connecting remote stream to audio element');
                    remoteAudioRef.current.srcObject = stream;
                    remoteAudioRef.current.play().catch(e => {
                        console.error('❌ Failed to play remote audio:', e);
                        // Retry on user interaction
                        const enableAudio = () => {
                            if (remoteAudioRef.current) {
                                remoteAudioRef.current.play().catch(console.error);
                            }
                            document.removeEventListener('click', enableAudio);
                        };
                        document.addEventListener('click', enableAudio);
                    });
                }
            });
        }
    }, [socket]);

    // Start local video stream
    useEffect(() => {
        const startLocalStream = async () => {
            if (webRTC) {
                try {
                    console.log('🎥 Starting local video stream');
                    const stream = await webRTC.getUserMedia();
                    if (localVideoRef.current) {
                        localVideoRef.current.srcObject = stream;
                    }
                } catch (error) {
                    console.error('❌ Failed to access camera/microphone:', error);
                    toast.error('Failed to access camera/microphone');
                }
            }
        };
        startLocalStream();
    }, [webRTC]);

    // Handle remote stream updates
    useEffect(() => {
        console.log('🎵 Remote stream updated:', !!remoteStream, remoteStream ? `ID: ${remoteStream.id}` : 'No stream');

        // Reset video content state when stream changes
        setRemoteVideoHasContent(false);
        setShowAudioOnlyOverlay(false);

        if (remoteStream) {
            console.log('📊 Remote stream details:', {
                id: remoteStream.id,
                active: remoteStream.active,
                videoTracks: remoteStream.getVideoTracks().length,
                audioTracks: remoteStream.getAudioTracks().length,
                videoTrackEnabled: remoteStream.getVideoTracks()[0]?.enabled,
                audioTrackEnabled: remoteStream.getAudioTracks()[0]?.enabled
            });

            // Assume video is available if there are video tracks - don't wait too long
            const hasVideoTracks = remoteStream.getVideoTracks().length > 0;
            if (hasVideoTracks) {
                console.log('✅ Video tracks detected, assuming video content available');
                setRemoteVideoHasContent(true);
                setShowAudioOnlyOverlay(false);
            } else {
                console.log('⚠️ No video tracks detected, showing audio-only overlay');
                setShowAudioOnlyOverlay(true);
            }

            // Simple delayed check for video content as backup
            const videoCheckTimeout = setTimeout(() => {
                if (remoteVideoRef.current) {
                    const video = remoteVideoRef.current;
                    const hasVideoContent = video.videoWidth > 0 && video.videoHeight > 0;
                    console.log('🔍 Delayed video check:', {
                        hasVideoContent,
                        videoWidth: video.videoWidth,
                        videoHeight: video.videoHeight,
                        readyState: video.readyState
                    });
                    setRemoteVideoHasContent(hasVideoContent);
                    setShowAudioOnlyOverlay(!hasVideoContent);
                }
            }, 2000); // Check after 2 seconds

            return () => {
                clearTimeout(videoCheckTimeout);
            };
        } else {
            setShowAudioOnlyOverlay(false);
        }

        if (remoteStream && remoteVideoRef.current) {
            console.log('📹 Setting remote video stream');
            remoteVideoRef.current.srcObject = remoteStream;

            // Force play after setting srcObject
            setTimeout(() => {
                if (remoteVideoRef.current && remoteVideoRef.current.srcObject === remoteStream) {
                    const playPromise = remoteVideoRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            console.log('✅ Remote video started playing successfully');
                        }).catch(e => {
                            console.error('❌ Failed to play remote video:', e.name + ':', e.message);
                            // Try to play with user interaction
                            const playOnClick = () => {
                                if (remoteVideoRef.current) {
                                    remoteVideoRef.current.play().catch(console.error);
                                }
                                document.removeEventListener('click', playOnClick);
                            };
                            document.addEventListener('click', playOnClick);
                        });
                    }
                }
            }, 100);
        }

        if (remoteStream && remoteAudioRef.current) {
            console.log('🔊 Setting remote audio stream');
            // Prevent multiple rapid assignments
            if (remoteAudioRef.current.srcObject !== remoteStream) {
                remoteAudioRef.current.srcObject = remoteStream;
                // Set volume to maximum for remote audio
                remoteAudioRef.current.volume = 1.0;
                console.log('🔊 Remote audio volume set to:', remoteAudioRef.current.volume);

                // Add a small delay before playing to avoid interruption
                setTimeout(() => {
                    if (remoteAudioRef.current && remoteAudioRef.current.srcObject === remoteStream) {
                        console.log('🎵 Attempting to play remote audio...');
                        remoteAudioRef.current.play().then(() => {
                            console.log('✅ Remote audio playing successfully');
                        }).catch(e => {
                            console.error('❌ Failed to play remote audio:', e.name + ':', e.message);
                            // Try manual play on next user interaction
                            const enableAudioOnClick = () => {
                                if (remoteAudioRef.current) {
                                    remoteAudioRef.current.play().catch(console.error);
                                }
                                document.removeEventListener('click', enableAudioOnClick);
                            };
                            document.addEventListener('click', enableAudioOnClick);
                        });
                    }
                }, 100);
            }
        }
    }, [remoteStream, remoteVideoHasContent]);

    // Initialize STT for translation (only when call is accepted and audioEnabled)
    useEffect(() => {
        console.log('🎤 STT Effect - callAccepted:', callAccepted, 'myLanguage:', myLanguage?.value, 'audioEnabled:', audioEnabled);
        let lastEmit = 0;
        let interimTimeout: NodeJS.Timeout | null = null;
        let isActiveRef = { current: false }; // Use a ref to track if STT should be active

        if (callAccepted && myLanguage && audioEnabled && targetLanguage) {
            console.log('✅ Starting STT with language:', myLanguage.value);
            isActiveRef.current = true; // Mark as active

            const stt = STT({
                language: myLanguage.value,
                continuous: true,
                interimResults: true,
                shouldContinue: () => isActiveRef.current // Use ref for real-time check
            }, {
                onResult: ({ transcript, isFinal }) => {
                    if (!transcript.trim()) return;
                    console.log('🎤 STT Result:', { transcript, isFinal, fromLang: myLanguage.value, toLang: targetLanguage?.value });

                    const now = Date.now();
                    if (!isFinal) {
                        // Handle interim results
                        setTranslations(prev => {
                            const filtered = prev.filter(msg => !msg.id.startsWith('interim-'));
                            return [
                                ...filtered,
                                {
                                    id: `interim-${now}`,
                                    original: transcript,
                                    translated: '...',
                                    fromLang: myLanguage.value,
                                    toLang: targetLanguage?.value || '',
                                    timestamp: new Date(),
                                    isSent: true
                                }
                            ];
                        });
                        // Throttle interim emissions
                        if (now - lastEmit > 1000) {
                            console.log('📤 Sending interim translation');
                            handleTranslation(transcript, true);
                            lastEmit = now;
                        } else {
                            if (interimTimeout) clearTimeout(interimTimeout);
                            interimTimeout = setTimeout(() => {
                                console.log('📤 Sending delayed interim translation');
                                handleTranslation(transcript, true);
                                lastEmit = Date.now();
                            }, 1000 - (now - lastEmit));
                        }
                    } else {
                        // Handle final results
                        console.log('📤 Sending final translation');
                        handleTranslation(transcript, false);
                    }
                },
                onError: (err) => {
                    console.error('❌ STT Error:', err);
                    toast.error(err);
                }
            });

            if (stt) {
                console.log('🎤 STT initialized successfully');
                sttRef.current = stt;
                stt.start();
            } else {
                console.error('❌ Failed to initialize STT');
            }
        } else {
            console.log('⏹️ Stopping STT - requirements not met');
            isActiveRef.current = false; // Mark as inactive immediately
            if (sttRef.current) {
                console.log('🛑 Stopping and clearing STT reference');
                sttRef.current.stop();
                sttRef.current = null;
            }
        }

        return () => {
            console.log('🧹 Cleanup: Stopping STT');
            isActiveRef.current = false; // Ensure ref is marked inactive
            if (sttRef.current) {
                sttRef.current.stop();
                sttRef.current = null;
            }
            if (interimTimeout) clearTimeout(interimTimeout);
        };
    }, [callAccepted, myLanguage, audioEnabled, targetLanguage]);

    // Send transcript for translation (interim or final)
    const handleTranslation = (text: string, isInterim = false) => {
        console.log('🌐 handleTranslation called:', {
            text: text.substring(0, 50) + '...',
            isInterim,
            myLanguage: myLanguage?.value,
            targetLanguage: targetLanguage?.value,
            hasSocket: !!socket,
            hasWebRTC: !!webRTC
        });

        if (!socket) {
            console.error('❌ No socket connection for translation');
            return;
        }

        if (!webRTC) {
            console.error('❌ No WebRTC connection for translation');
            return;
        }

        if (!myLanguage || !targetLanguage) {
            console.error('❌ Missing language configuration for translation');
            return;
        }

        if (!text.trim()) {
            console.warn('⚠️ Empty text, skipping translation');
            return;
        }

        const payload = {
            text,
            fromLang: myLanguage.value,
            toLang: targetLanguage.value,
            isInterim
        };
        console.log('📤 Emitting translation:', payload);
        socket.emit('translation', payload);

        // Update local UI with sending status
        if (!isInterim) { // Only show final translations in UI
            setTranslations(prev => [
                ...prev,
                {
                    id: `trans-${Date.now()}`,
                    original: text,
                    translated: 'Translating...',
                    fromLang: myLanguage.value,
                    toLang: targetLanguage.value,
                    timestamp: new Date(),
                    isSent: true
                }
            ]);
        }
    };

    const callUser = async () => {
        console.log('📞 Initiating call to:', callerId.trim());
        if (!webRTC || !callerId.trim()) {
            console.error('❌ Missing WebRTC or caller ID');
            toast.error('Please enter a valid caller ID');
            return;
        }
        if (!targetLanguage) {
            console.error('❌ Missing target language');
            toast.error('Please select a language to listen in');
            return;
        }

        // Ensure we have a local stream before making the call
        const localStream = webRTC.getLocalStream();
        if (!localStream) {
            console.warn('⚠️ No local stream, attempting to get media first');
            try {
                await webRTC.getUserMedia();
                console.log('✅ Local stream acquired for call');
            } catch (error) {
                console.error('❌ Failed to get local stream for call:', error);
                toast.error('Camera/microphone access required to make a call');
                return;
            }
        }

        try {
            console.log('🔄 Creating offer');
            const offer = await webRTC.createOffer();
            console.log('📤 Sending call with languages:', { from: myLanguage?.value, to: targetLanguage.value });
            webRTC.callUser({
                phone: callerId,
                signalData: offer,
                from: myId,
                fromLang: myLanguage?.value || 'en',
                toLang: targetLanguage.value
            });
        } catch (error) {
            console.error('❌ Failed to start call:', error);
            toast.error('Failed to start call');
        }
    };

    const answerCall = async () => {
        console.log('📞 Answering call from:', incomingCall?.from);
        if (!webRTC || !incomingCall || !myLanguage) {
            console.error('❌ Missing requirements for answering call');
            toast.error("Please select a language first.");
            return;
        }

        // Ensure we have a local stream before answering the call
        const localStream = webRTC.getLocalStream();
        if (!localStream) {
            console.warn('⚠️ No local stream, attempting to get media first');
            try {
                await webRTC.getUserMedia();
                console.log('✅ Local stream acquired for answer');
            } catch (error) {
                console.error('❌ Failed to get local stream for answer:', error);
                toast.error('Camera/microphone access required to answer the call');
                return;
            }
        }

        try {
            console.log('🔄 Creating answer');
            const answer = await webRTC.createAnswer(incomingCall.signal);

            // When answering:
            // - My fromLang is my selected language
            // - My toLang is the caller's original language (fromLang)
            // - I want to translate TO the caller's language
            console.log('📤 Sending answer with languages:', {
                from: myLanguage.value,
                to: incomingCall.fromLang,
                callerWantsToTranslateTo: incomingCall.toLang
            });

            webRTC.answerCall({
                to: incomingCall.from,
                signal: answer,
                fromLang: myLanguage.value,
                toLang: incomingCall.fromLang  // Translate TO caller's language
            });

            // Set target language to the caller's original language 
            // so I translate my speech TO their language
            setTargetLanguage({
                value: incomingCall.fromLang,
                label: ISO6391.getName(incomingCall.fromLang)
            });
            setCallAccepted(true);
            setIncomingCall(null);
        } catch (error) {
            console.error('❌ Failed to answer call:', error);
            toast.error('Failed to answer call');
        }
    };

    const rejectCall = () => {
        console.log('❌ Rejecting call from:', incomingCall?.from);
        if (webRTC && incomingCall) {
            webRTC.rejectCall(incomingCall.from);
            setIncomingCall(null);
        }
    };

    const endCall = () => {
        console.log('📞 Ending call');

        // Stop STT immediately
        if (sttRef.current) {
            console.log('🛑 Force stopping STT in endCall');
            sttRef.current.stop();
            sttRef.current = null;
        }

        // End WebRTC connection
        if (webRTC) {
            webRTC.endCall();
        }

        // Reset states
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

    // Toggle STT (translation) on/off
    const toggleAudio = () => {
        setAudioEnabled((prev) => {
            const newState = !prev;
            console.log('🎤 Toggling STT/Translation audio:', newState);
            if (newState && callAccepted && sttRef.current) {
                sttRef.current.start();
            } else if (!newState && sttRef.current) {
                sttRef.current.stop();
            }
            return newState;
        });
    };

    const toggleSpeaker = () => {
        setSpeakerEnabled(!speakerEnabled);
        console.log('🔊 Speaker enabled:', !speakerEnabled);
    };

    const handleMyLanguageChange = (option: SingleValue<LanguageOption>) => {
        if (option) {
            console.log('🌐 My language changed to:', option.value);
            setMyLanguage(option);
        }
    };

    const handleTargetLanguageChange = (option: SingleValue<LanguageOption>) => {
        if (option) {
            console.log('🌐 Target language changed to:', option.value);
            setTargetLanguage(option);
        }
    };

    // Debug function to check video/audio elements
    const debugMediaElements = () => {
        console.log('🔍 DEBUG: Media Elements Status');

        if (remoteVideoRef.current) {
            const video = remoteVideoRef.current;
            console.log('📹 Remote Video Element:', {
                srcObject: !!video.srcObject,
                videoWidth: video.videoWidth,
                videoHeight: video.videoHeight,
                readyState: video.readyState,
                paused: video.paused,
                muted: video.muted,
                volume: video.volume,
                currentTime: video.currentTime,
                duration: video.duration,
                style: {
                    display: getComputedStyle(video).display,
                    visibility: getComputedStyle(video).visibility,
                    width: getComputedStyle(video).width,
                    height: getComputedStyle(video).height
                }
            });
        }

        if (remoteAudioRef.current) {
            const audio = remoteAudioRef.current;
            console.log('🔊 Remote Audio Element:', {
                srcObject: !!audio.srcObject,
                readyState: audio.readyState,
                paused: audio.paused,
                muted: audio.muted,
                volume: audio.volume,
                currentTime: audio.currentTime,
                duration: audio.duration
            });
        }

        if (remoteStream) {
            console.log('🎵 Remote Stream:', {
                id: remoteStream.id,
                active: remoteStream.active,
                videoTracks: remoteStream.getVideoTracks().map(track => ({
                    id: track.id,
                    kind: track.kind,
                    enabled: track.enabled,
                    readyState: track.readyState,
                    settings: track.getSettings()
                })),
                audioTracks: remoteStream.getAudioTracks().map(track => ({
                    id: track.id,
                    kind: track.kind,
                    enabled: track.enabled,
                    readyState: track.readyState,
                    settings: track.getSettings()
                }))
            });
        }
    };

    // Force play media elements (for autoplay restrictions)
    const forcePlayMedia = async () => {
        console.log('🎬 Force playing media elements...');

        if (remoteVideoRef.current) {
            try {
                await remoteVideoRef.current.play();
                console.log('✅ Remote video force play successful');
                toast.success('Remote video playing');
            } catch (e) {
                console.error('❌ Remote video force play failed:', e);
                toast.error('Failed to play remote video: ' + (e as Error).message);
            }
        }

        if (remoteAudioRef.current) {
            try {
                await remoteAudioRef.current.play();
                console.log('✅ Remote audio force play successful');
                toast.success('Remote audio playing');
            } catch (e) {
                console.error('❌ Remote audio force play failed:', e);
                toast.error('Failed to play remote audio: ' + (e as Error).message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1e40af] via-[#22c55e]/30 to-white dark:from-[#0f172a] dark:to-[#1e293b] p-0 sm:p-4 flex flex-col">
            {/* CRITICAL FIX: Hidden audio element for remote stream playback */}
            <audio
                ref={remoteAudioRef}
                autoPlay
                playsInline
                controls={false}
                muted={false}
                style={{ display: 'none' }}
                onLoadedMetadata={() => {
                    console.log('🔊 Remote audio metadata loaded');
                    if (remoteAudioRef.current) {
                        remoteAudioRef.current.volume = 1.0; // Full volume
                    }
                }}
                onPlay={() => console.log('▶️ Remote audio playing')}
                onPause={() => console.log('⏸️ Remote audio paused')}
                onError={(e) => console.error('❌ Remote audio error:', e)}
                onVolumeChange={() => {
                    if (remoteAudioRef.current) {
                        console.log('🔊 Remote audio volume:', remoteAudioRef.current.volume);
                    }
                }}
            />

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
                                    {isConnected && (
                                        <span className="inline-block ml-2 p-2 cursor-pointer border border-[#22c55e]/20 rounded hover:bg-gray-100" title="Copy to clipboard">
                                            <Copy
                                                className="inline-block cursor-pointer"
                                                size={16}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(myId);
                                                    toast.success('Copied to clipboard');
                                                }}
                                            />
                                        </span>
                                    )}
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
                                    <div className="relative w-full aspect-video">
                                        <video
                                            ref={remoteVideoRef}
                                            autoPlay
                                            playsInline
                                            controls={false}
                                            muted={false}
                                            style={{ width: '100%', height: '100%' }}
                                            className="w-full aspect-video object-cover rounded-3xl"
                                            onLoadedMetadata={(e) => {
                                                const video = e.target as HTMLVideoElement;
                                                const hasVideoContent = video.videoWidth > 0 && video.videoHeight > 0;
                                                console.log('🔊 Remote video metadata loaded:', {
                                                    videoWidth: video.videoWidth,
                                                    videoHeight: video.videoHeight,
                                                    duration: video.duration,
                                                    srcObject: !!video.srcObject,
                                                    hasContent: hasVideoContent
                                                });
                                                setRemoteVideoHasContent(hasVideoContent);

                                                if (hasVideoContent) {
                                                    console.log('✅ Remote video content detected - hiding audio-only overlay');
                                                    setShowAudioOnlyOverlay(false);
                                                } else {
                                                    console.log('⚠️ Remote video track has no content (likely audio-only call)');
                                                }
                                            }}
                                            onCanPlay={(e) => {
                                                const video = e.target as HTMLVideoElement;
                                                const hasVideoContent = video.videoWidth > 0 && video.videoHeight > 0;
                                                console.log('▶️ Remote video can play:', {
                                                    readyState: video.readyState,
                                                    videoWidth: video.videoWidth,
                                                    videoHeight: video.videoHeight,
                                                    hasContent: hasVideoContent
                                                });
                                                setRemoteVideoHasContent(hasVideoContent);

                                                if (hasVideoContent) {
                                                    setShowAudioOnlyOverlay(false);
                                                }
                                            }}
                                            onPlay={(e) => {
                                                const video = e.target as HTMLVideoElement;
                                                const hasVideoContent = video.videoWidth > 0 && video.videoHeight > 0;
                                                console.log('▶️ Remote video playing:', {
                                                    currentTime: video.currentTime,
                                                    paused: video.paused,
                                                    videoWidth: video.videoWidth,
                                                    videoHeight: video.videoHeight,
                                                    hasContent: hasVideoContent
                                                });
                                                setRemoteVideoHasContent(hasVideoContent);

                                                if (hasVideoContent) {
                                                    setShowAudioOnlyOverlay(false);
                                                }
                                            }}
                                            onError={(e) => {
                                                const video = e.target as HTMLVideoElement;
                                                console.error('❌ Remote video error:', video.error);
                                            }}
                                            onLoadStart={() => {
                                                console.log('🔄 Remote video load start');
                                            }}
                                            onWaiting={() => {
                                                console.log('⏳ Remote video waiting for data');
                                            }}
                                            onStalled={() => {
                                                console.log('⏸️ Remote video stalled');
                                            }}
                                        />
                                        {/* Overlay for audio-only calls */}
                                        {showAudioOnlyOverlay && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1e40af]/80 to-[#22c55e]/40 rounded-3xl">
                                                <div className="text-center text-white">
                                                    <div className="text-6xl mb-4">🎤</div>
                                                    <p className="text-lg font-medium">Audio Only Call</p>
                                                    <p className="text-sm opacity-80">Remote user has no video</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-full aspect-video flex items-center justify-center">
                                        <p className="text-gray-600 dark:text-gray-400">Waiting for other user...</p>
                                    </div>
                                )}
                                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                    Remote {remoteStream && (
                                        remoteVideoHasContent
                                            ? `(${remoteStream.getVideoTracks().length}V/${remoteStream.getAudioTracks().length}A)`
                                            : `(Audio Only - ${remoteStream.getAudioTracks().length}A)`
                                    )}
                                </div>
                            </div>

                            {/* Call Controls */}
                            {callAccepted && (
                                <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-white/80 dark:bg-[#1e293b]/80 rounded-full shadow-lg p-3">
                                    <Button onClick={toggleVideo} variant="ghost" size="icon" className="rounded-full">
                                        {videoEnabled ? <Video /> : <VideoOff className="text-red-500" />}
                                    </Button>
                                    <Button onClick={toggleAudio} variant="ghost" size="icon" className="rounded-full" title="Toggle Translation">
                                        {audioEnabled ? <Mic /> : <MicOff className="text-red-500" />}
                                    </Button>
                                    <Button onClick={toggleSpeaker} variant="ghost" size="icon" className="rounded-full" title="Toggle Speaker">
                                        {speakerEnabled ? <Volume2 /> : <VolumeX className="text-red-500" />}
                                    </Button>
                                    <Button onClick={forcePlayMedia} variant="ghost" size="icon" className="rounded-full" title="Force Play Media">
                                        🎬
                                    </Button>
                                    <Button onClick={debugMediaElements} variant="ghost" size="icon" className="rounded-full" title="Debug Media">
                                        🔍
                                    </Button>
                                    <Button onClick={forcePlayMedia} variant="ghost" size="icon" className="rounded-full" title="Force Play Media">
                                        ▶️
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
                                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                                    Live Translation ({translations.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="h-96 overflow-y-auto p-4 space-y-4">
                                {translations.map((msg) => (
                                    <div key={msg.id} className={`flex flex-col ${msg.isSent ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-xs p-3 rounded-xl ${msg.isSent ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                                            <div className="text-xs opacity-60">{msg.fromLang} → {msg.toLang}</div>
                                            <div className="font-semibold">{msg.original}</div>
                                            <div className="italic">{msg.translated}</div>
                                            <p className="text-xs opacity-70 mt-1">
                                                {msg.timestamp instanceof Date ? msg.timestamp.toLocaleTimeString() : ''}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {translations.length === 0 && (
                                    <div className="text-center text-gray-500 dark:text-gray-400">
                                        Start speaking to see translations here
                                    </div>
                                )}
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
                            <p className="text-gray-600">
                                Wants to speak in: <span className='font-bold'>{ISO6391.getName(incomingCall.fromLang)}</span>
                            </p>
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
                                <Button
                                    onClick={answerCall}
                                    disabled={!myLanguage}
                                    className="bg-green-500 hover:bg-green-600 text-white rounded-full w-20 h-20 flex items-center justify-center"
                                >
                                    <Phone size={30} />
                                </Button>
                                <Button
                                    onClick={rejectCall}
                                    className="bg-red-500 hover:bg-red-600 text-white rounded-full w-20 h-20 flex items-center justify-center"
                                >
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