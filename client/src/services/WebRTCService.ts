import { Socket } from 'socket.io-client';

export interface CallData {
    phone: string;
    signalData: any;
    from: string;
    name?: string;
    fromLang: string;
    toLang: string;
}

export interface AnswerData {
    to: string;
    signal: any;
    fromLang: string;
    toLang: string;
}

export class WebRTCService {
    private peerConnection: RTCPeerConnection | null = null;
    private localStream: MediaStream | null = null;
    private remoteStream: MediaStream | null = null;
    private socket: Socket;
    private onRemoteStreamCallback: ((stream: MediaStream) => void) | null = null;
    private connectionRetryCount: number = 0;
    private maxRetries: number = 3;
    private retryTimeout: NodeJS.Timeout | null = null;

    constructor(socket: Socket) {
        console.log('🚀 Initializing WebRTC Service');
        this.socket = socket;
        this.initializePeerConnection();
    }

    private initializePeerConnection() {
        console.log('🔄 Initializing peer connection');
        const configuration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },
                // Add TURN servers for better connectivity
                {
                    urls: 'turn:openrelay.metered.ca:80',
                    username: 'openrelayproject',
                    credential: 'openrelayproject'
                }
            ],
            iceCandidatePoolSize: 10,
            iceTransportPolicy: 'all' as RTCIceTransportPolicy,
            bundlePolicy: 'balanced' as RTCBundlePolicy,
            rtcpMuxPolicy: 'require' as RTCRtcpMuxPolicy
        };

        this.peerConnection = new RTCPeerConnection(configuration);

        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('🧊 ICE candidate generated:', event.candidate);
                this.socket.emit('ice-candidate', {
                    candidate: event.candidate,
                });
            }
        };

        // Avoid duplicate stream assignments
        this.peerConnection.ontrack = (event) => {
            console.log('🎵 Remote track received:', {
                streams: event.streams.length,
                track: event.track.kind,
                trackId: event.track.id,
                trackEnabled: event.track.enabled,
                trackReadyState: event.track.readyState
            });

            if (event.streams.length > 0) {
                const stream = event.streams[0];
                console.log('📊 Stream details:', {
                    id: stream.id,
                    active: stream.active,
                    videoTracks: stream.getVideoTracks().length,
                    audioTracks: stream.getAudioTracks().length
                });

                // Avoid duplicate stream assignments
                if (this.remoteStream && this.remoteStream.id === stream.id) {
                    console.log('⏭️ Skipping duplicate stream assignment');
                    return;
                }

                this.remoteStream = stream;
                if (this.onRemoteStreamCallback) {
                    console.log('📞 Calling remote stream callback');
                    this.onRemoteStreamCallback(this.remoteStream);
                }
            } else {
                console.warn('⚠️ No streams in track event');
            }
        };

        this.peerConnection.onconnectionstatechange = () => {
            console.log('🔗 Connection state changed:', this.peerConnection?.connectionState);

            if (this.peerConnection?.connectionState === 'failed') {
                console.log('🔄 Connection failed, attempting restart');
                this.handleConnectionFailure();
            }
        };

        this.peerConnection.oniceconnectionstatechange = () => {
            console.log('🧊 ICE connection state changed:', this.peerConnection?.iceConnectionState);

            switch (this.peerConnection?.iceConnectionState) {
                case 'failed':
                    console.log('🧊 ICE connection failed, attempting recovery');
                    this.handleIceFailure();
                    break;
                case 'disconnected':
                    console.log('🧊 ICE connection disconnected, waiting for recovery');
                    // Don't immediately restart on disconnect, give it time to recover
                    if (this.retryTimeout) clearTimeout(this.retryTimeout);
                    this.retryTimeout = setTimeout(() => {
                        if (this.peerConnection?.iceConnectionState === 'disconnected') {
                            console.log('🧊 ICE connection still disconnected, attempting restart');
                            this.handleIceFailure();
                        }
                    }, 5000); // Wait 5 seconds before attempting recovery
                    break;
                case 'connected':
                case 'completed':
                    console.log('🧊 ICE connection recovered');
                    this.connectionRetryCount = 0; // Reset retry count on successful connection
                    if (this.retryTimeout) {
                        clearTimeout(this.retryTimeout);
                        this.retryTimeout = null;
                    }
                    break;
            }
        };

        this.peerConnection.onicegatheringstatechange = () => {
            console.log('🧊 ICE gathering state changed:', this.peerConnection?.iceGatheringState);
        };
    }

    private handleConnectionFailure() {
        console.log('🔧 Handling connection failure');
        this.connectionRetryCount++;

        if (this.connectionRetryCount <= this.maxRetries) {
            console.log(`🔄 Attempting connection recovery (${this.connectionRetryCount}/${this.maxRetries})`);
            // Try restarting ICE first
            this.restartIce();
        } else {
            console.error('❌ Max connection retries exceeded, giving up');
            // Don't automatically end the call here - let the user decide
            // this.endCall();
        }
    }

    private handleIceFailure() {
        console.log('🧊 Handling ICE failure');
        this.connectionRetryCount++;

        if (this.connectionRetryCount <= this.maxRetries) {
            console.log(`🧊 Attempting ICE recovery (${this.connectionRetryCount}/${this.maxRetries})`);
            this.restartIce();
        } else {
            console.error('❌ Max ICE retries exceeded');
            // Emit an event to notify the UI about connection issues
            this.socket.emit('connection-issues', {
                type: 'ice-failure',
                retries: this.connectionRetryCount
            });
        }
    }

    private restartIce() {
        console.log('🔄 Restarting ICE connection');
        if (this.peerConnection) {
            this.peerConnection.restartIce();
        }
    }

    onRemoteStream(callback: (stream: MediaStream) => void) {
        this.onRemoteStreamCallback = callback;
    }

    async getUserMedia(): Promise<MediaStream> {
        try {
            console.log('🎤 Requesting user media access');

            // First, check if devices are available
            const devices = await navigator.mediaDevices.enumerateDevices();
            const hasVideo = devices.some(device => device.kind === 'videoinput');
            const hasAudio = devices.some(device => device.kind === 'audioinput');

            console.log('📱 Available devices:', { hasVideo, hasAudio });

            // Try different constraint combinations based on available devices
            const constraints: MediaStreamConstraints = {
                video: hasVideo,
                audio: hasAudio
            };

            let stream: MediaStream;

            try {
                stream = await navigator.mediaDevices.getUserMedia(constraints);
                console.log('✅ Media access granted with full constraints');
            } catch (firstError) {
                console.warn('⚠️ Full constraints failed, trying audio-only:', firstError);

                // Fallback: Try audio-only
                try {
                    stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
                    console.log('✅ Audio-only access granted');
                } catch (secondError) {
                    console.warn('⚠️ Audio-only failed, trying video-only:', secondError);

                    // Fallback: Try video-only
                    try {
                        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                        console.log('✅ Video-only access granted');
                    } catch (thirdError) {
                        console.error('❌ All media access attempts failed');
                        throw new Error('No camera or microphone available. Please check your device permissions and hardware.');
                    }
                }
            }

            console.log('✅ Final stream - Video tracks:', stream.getVideoTracks().length, 'Audio tracks:', stream.getAudioTracks().length);

            // Log track details
            stream.getTracks().forEach(track => {
                console.log(`📊 Local ${track.kind} track:`, {
                    id: track.id,
                    enabled: track.enabled,
                    readyState: track.readyState,
                    settings: track.getSettings?.() || 'not available'
                });
            });

            this.localStream = stream;

            if (this.peerConnection) {
                stream.getTracks().forEach(track => {
                    console.log('➕ Adding track to peer connection:', {
                        kind: track.kind,
                        id: track.id,
                        enabled: track.enabled
                    });
                    this.peerConnection!.addTrack(track, stream);
                });

                console.log('🔄 Current senders after adding tracks:',
                    this.peerConnection.getSenders().map(sender => ({
                        track: sender.track?.kind,
                        trackId: sender.track?.id
                    }))
                );
            }

            return stream;
        } catch (error) {
            console.error('❌ Failed to access camera/microphone:', error);
            throw new Error(error instanceof Error ? error.message : 'Failed to access camera/microphone');
        }
    }

    async createOffer(): Promise<RTCSessionDescriptionInit> {
        if (!this.peerConnection) throw new Error('Peer connection not initialized');

        console.log('🔄 Creating offer with tracks:', this.peerConnection.getSenders().length);
        const offer = await this.peerConnection.createOffer();
        console.log('📤 Created offer, setting local description');
        await this.peerConnection.setLocalDescription(offer);
        console.log('✅ Local description set');
        return offer;
    }

    async createAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
        if (!this.peerConnection) throw new Error('Peer connection not initialized');

        console.log('📥 Setting remote description from offer');
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        console.log('🔄 Creating answer with tracks:', this.peerConnection.getSenders().length);
        const answer = await this.peerConnection.createAnswer();
        console.log('📤 Created answer, setting local description');
        await this.peerConnection.setLocalDescription(answer);
        console.log('✅ Answer created and local description set');
        return answer;
    }

    async handleAnswer(answer: RTCSessionDescriptionInit) {
        if (!this.peerConnection) throw new Error('Peer connection not initialized');
        console.log('📥 Setting remote description from answer');
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        console.log('✅ Remote description set from answer');
    }

    async handleIceCandidate(candidate: RTCIceCandidateInit) {
        if (this.peerConnection) {
            await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
    }

    callUser(callData: CallData) {
        console.log('📞 Calling user:', callData);
        this.socket.emit('callUser', callData);
    }

    answerCall(answerData: AnswerData) {
        console.log('📞 Answering call:', answerData);
        this.socket.emit('answerCall', answerData);
    }

    rejectCall(to: string) {
        console.log('❌ Rejecting call to:', to);
        this.socket.emit('rejectCall', { to });
    }

    endCall() {
        console.log('📞 Ending call');

        // Clear any pending retry timeouts
        if (this.retryTimeout) {
            clearTimeout(this.retryTimeout);
            this.retryTimeout = null;
        }

        // Reset retry count
        this.connectionRetryCount = 0;

        if (this.peerConnection) {
            console.log('🔐 Closing peer connection');
            this.peerConnection.close();
        }

        if (this.localStream) {
            console.log('⏹️ Stopping local stream tracks');
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }
        this.remoteStream = null;
        this.socket.emit('callEnded');
        this.initializePeerConnection();
    }

    getLocalStream(): MediaStream | null {
        return this.localStream;
    }
    getRemoteStream(): MediaStream | null {
        return this.remoteStream;
    }


    toggleVideo(enabled: boolean) {
        console.log('📹 Toggling video:', enabled);
        if (this.localStream) {
            const videoTrack = this.localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = enabled;
                console.log('✅ Video track enabled:', enabled);
            } else {
                console.warn('⚠️ No video track found');
            }
        }
    }

    toggleAudio(enabled: boolean) {
        console.log('🔊 Toggling audio:', enabled);
        if (this.localStream) {
            const audioTrack = this.localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = enabled;
                console.log('✅ Audio track enabled:', enabled);
            } else {
                console.warn('⚠️ No audio track found');
            }
        }
    }

    debugVideoTracks() {
        console.log('🔍 WebRTC Service Video Debug:');

        // Debug local stream
        if (this.localStream) {
            const localVideoTracks = this.localStream.getVideoTracks();
            console.log('📹 Local video tracks:', localVideoTracks.map(track => ({
                id: track.id,
                label: track.label,
                enabled: track.enabled,
                readyState: track.readyState,
                kind: track.kind,
                settings: track.getSettings ? track.getSettings() : {}
            })));
        }

        // Debug remote stream
        if (this.remoteStream) {
            const remoteVideoTracks = this.remoteStream.getVideoTracks();
            console.log('📺 Remote video tracks:', remoteVideoTracks.map(track => ({
                id: track.id,
                label: track.label,
                enabled: track.enabled,
                readyState: track.readyState,
                kind: track.kind,
                settings: track.getSettings ? track.getSettings() : {}
            })));
        }

        // Debug peer connection senders/receivers
        if (this.peerConnection) {
            const senders = this.peerConnection.getSenders();
            const receivers = this.peerConnection.getReceivers();

            console.log('📤 Peer connection senders:', senders.map(sender => ({
                track: sender.track ? {
                    kind: sender.track.kind,
                    id: sender.track.id,
                    enabled: sender.track.enabled,
                    readyState: sender.track.readyState
                } : null,
                transport: sender.transport ? sender.transport.state : 'none'
            })));

            console.log('📥 Peer connection receivers:', receivers.map(receiver => ({
                track: receiver.track ? {
                    kind: receiver.track.kind,
                    id: receiver.track.id,
                    enabled: receiver.track.enabled,
                    readyState: receiver.track.readyState
                } : null,
                transport: receiver.transport ? receiver.transport.state : 'none'
            })));
        }
    }

    forceEnableRemoteVideo(): boolean {
        console.log('🎯 Force enabling remote video tracks...');
        let tracksEnabled = false;

        if (this.remoteStream) {
            const videoTracks = this.remoteStream.getVideoTracks();
            console.log(`🔧 Found ${videoTracks.length} remote video tracks`);

            videoTracks.forEach((track, index) => {
                console.log(`🔧 Enabling remote video track ${index}:`, track.id);
                track.enabled = true;
                tracksEnabled = true;
            });

            // Also check receivers
            if (this.peerConnection) {
                const receivers = this.peerConnection.getReceivers();
                receivers.forEach(receiver => {
                    if (receiver.track && receiver.track.kind === 'video') {
                        console.log('🔧 Enabling receiver video track:', receiver.track.id);
                        receiver.track.enabled = true;
                        tracksEnabled = true;
                    }
                });
            }
        }

        console.log(tracksEnabled ? '✅ Remote video tracks enabled' : '❌ No remote video tracks found');
        return tracksEnabled;
    }
}
