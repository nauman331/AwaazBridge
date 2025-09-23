import { io, Socket } from 'socket.io-client';
import { socketUrl } from '../utils/exports';
import { toast } from 'sonner';

export interface CallData {
    signal: any;
    from: string;
    name: string;
    fromLang: string;
    toLang: string;
}

export interface TranslationData {
    original: string;
    translated: string;
    fromLang: string;
    toLang: string;
    timestamp: Date;
    isInterim: boolean;
}

export interface WebRTCConfig {
    iceServers: RTCIceServer[];
}

export interface CallUser {
    userId: string;
    name: string;
    fromLang: string;
    toLang: string;
}

export class WebRTCService {
    private socket: Socket;
    private localStream: MediaStream | null = null;
    private remoteStream: MediaStream | null = null;
    private peerConnection: RTCPeerConnection | null = null;
    private callActive = false;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;

    // Event callbacks
    public onLocalStream?: (stream: MediaStream | null) => void;
    public onRemoteStream?: (stream: MediaStream | null) => void;
    public onCallReceived?: (data: CallData) => void;
    public onCallAccepted?: () => void;
    public onCallRejected?: () => void;
    public onCallEnded?: () => void;
    public onTranslationReceived?: (data: TranslationData) => void;
    public onError?: (error: string) => void;
    public onConnectionStateChange?: (state: RTCPeerConnectionState) => void;

    private config: WebRTCConfig = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
            // Add your TURN server configuration here for better connectivity
            // {
            //   urls: 'turn:your-turn-server.com:3478',
            //   username: 'user',
            //   credential: 'password'
            // }
        ]
    };

    constructor() {
        this.socket = io(socketUrl, {
            transports: ['websocket'],
            upgrade: true,
            reconnection: true,
            reconnectionAttempts: this.maxReconnectAttempts,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
        });
        this.setupSocketListeners();
    }

    private setupSocketListeners(): void {
        this.socket.on('connect', () => {
            console.log('✅ Connected to signaling server');
            this.reconnectAttempts = 0;
            // Re-establish call state if needed
            if (this.callActive && this.peerConnection?.connectionState === 'disconnected') {
                console.log('🔄 Attempting to restore call connection...');
                // Don't automatically end call on reconnect
            }
        });

        this.socket.on('disconnect', (reason) => {
            console.log('❌ Disconnected from signaling server:', reason);
            // Only handle call end if it's not a network issue
            if (reason === 'io server disconnect') {
                this.handleCallEnd();
            } else {
                console.log('🔄 Network disconnection, attempting to reconnect...');
                this.reconnectAttempts++;
                if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                    console.log('❌ Max reconnection attempts reached');
                    this.handleCallEnd();
                }
            }
        });

        this.socket.on('reconnect', (attemptNumber) => {
            console.log(`✅ Reconnected to signaling server (attempt ${attemptNumber})`);
            toast.success('Connection restored');
        });

        this.socket.on('reconnect_error', (error) => {
            console.error('❌ Reconnection failed:', error);
        });

        this.socket.on('callUser', (data: CallData) => {
            console.log('📞 Incoming call from:', data.from);
            this.onCallReceived?.(data);
        });

        this.socket.on('callAccepted', async (signal: any) => {
            console.log('✅ Call accepted');
            this.onCallAccepted?.();
            if (this.peerConnection) {
                await this.peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
            }
        });

        this.socket.on('callRejected', () => {
            console.log('❌ Call rejected');
            this.onCallRejected?.();
            this.handleCallEnd();
        });

        this.socket.on('callEnded', () => {
            console.log('📵 Call ended');
            this.handleCallEnd();
        });

        this.socket.on('ice-candidate', async (candidate: RTCIceCandidate) => {
            if (this.peerConnection && candidate) {
                try {
                    await this.peerConnection.addIceCandidate(candidate);
                    console.log('🧊 ICE candidate added');
                } catch (error) {
                    console.error('❌ Error adding ICE candidate:', error);
                }
            }
        });

        this.socket.on('translation', (data: TranslationData) => {
            console.log('🌐 Translation received:', data);
            this.onTranslationReceived?.(data);
        });

        // Add new socket listener for translation confirmations
        this.socket.on('translationConfirmed', (data: TranslationData) => {
            console.log('✅ Translation confirmed:', data);
            this.onTranslationReceived?.(data);
        });

        this.socket.on('error', (error: string) => {
            console.error('❌ Socket error:', error);
            this.onError?.(error);
            toast.error(error);
        });
    }

    async initializeLocalStream(constraints: MediaStreamConstraints = { video: true, audio: true }): Promise<MediaStream> {
        try {
            // Try with video first, fallback to audio only
            let stream: MediaStream;
            const hasVideo = constraints.video;

            try {
                if (hasVideo) {
                    // First attempt: try with video if requested
                    const videoConstraints = typeof hasVideo === 'object' ? hasVideo : {
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    };
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: videoConstraints,
                        audio: {
                            echoCancellation: true,
                            noiseSuppression: true,
                            autoGainControl: true
                        }
                    });
                    console.log('🎥 Local stream initialized with video and audio');
                } else {
                    // If video is explicitly false, go straight to audio-only
                    throw new Error("Video explicitly disabled");
                }
            } catch (videoError) {
                console.warn('⚠️ Video not available or disabled, trying audio only:', videoError);

                // Fallback: audio only
                stream = await navigator.mediaDevices.getUserMedia({
                    video: false,
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true
                    }
                });
                console.log('🎤 Local stream initialized with audio only');
                if (hasVideo) { // Only toast if video was attempted
                    toast.info('Video not available, continuing with audio only');
                }
            }

            this.localStream = stream;
            // Call callback directly instead of using setTimeout
            this.onLocalStream?.(stream);
            return stream;
        } catch (error) {
            console.error('❌ Failed to get local stream:', error);
            const errorMsg = 'Failed to access microphone. Please check permissions and ensure microphone is available.';
            this.onError?.(errorMsg);
            toast.error(errorMsg);
            throw error;
        }
    } private createPeerConnection(): RTCPeerConnection {
        const pc = new RTCPeerConnection(this.config);

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                this.socket.emit('ice-candidate', { candidate: event.candidate });
                console.log('🧊 ICE candidate sent');
            }
        };

        pc.ontrack = (event) => {
            console.log('🎵 Remote track received:', event.track.kind, 'Stream ID:', event.streams[0]?.id);
            if (event.streams && event.streams[0]) {
                this.remoteStream = event.streams[0];
                console.log('📹 Updated remote stream');
                // Always fire the callback with the latest stream object to ensure UI updates
                this.onRemoteStream?.(this.remoteStream);
            }
        };

        pc.onconnectionstatechange = () => {
            console.log('🔗 Connection state:', pc.connectionState);
            this.onConnectionStateChange?.(pc.connectionState);

            if (pc.connectionState === 'connected') {
                this.callActive = true;
                toast.success('Call connected successfully!');
            } else if (pc.connectionState === 'disconnected') {
                // Don't end the call immediately. WebRTC might be trying to reconnect.
                console.log('🔌 Peer connection disconnected. Waiting for potential reconnection...');
                toast.warning('Connection unstable, attempting to reconnect...');
            } else if (pc.connectionState === 'failed') {
                // The connection has failed and will not recover.
                this.handleCallEnd();
                toast.error('Connection failed. Please try again.');
            }
        };

        pc.oniceconnectionstatechange = () => {
            console.log('🧊 ICE connection state:', pc.iceConnectionState);
            // The 'failed' state is better handled by onconnectionstatechange
        };

        return pc;
    }

    async callUser(callUser: CallUser): Promise<void> {
        try {
            if (this.callActive || this.peerConnection) {
                console.warn('⚠️ Cannot initiate call, another call is already active.');
                toast.warning('A call is already in progress.');
                return;
            }

            if (!this.localStream) {
                // Initialize with video preference but audio required
                await this.initializeLocalStream({ video: true, audio: true });
            }

            this.peerConnection = this.createPeerConnection();

            // Add local stream to peer connection
            if (this.localStream) {
                this.localStream.getTracks().forEach(track => {
                    console.log(`🎵 Adding ${track.kind} track to peer connection`);
                    this.peerConnection!.addTrack(track, this.localStream!);
                });
            }

            // Create offer
            const offer = await this.peerConnection.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            });

            await this.peerConnection.setLocalDescription(offer);

            // Send call request
            this.socket.emit('callUser', {
                phone: callUser.userId,
                signalData: offer,
                from: this.socket.id,
                name: callUser.name,
                fromLang: callUser.fromLang,
                toLang: callUser.toLang,
            });

            console.log('📞 Call initiated to:', callUser.userId);
            toast.info('Calling...');

        } catch (error) {
            console.error('❌ Failed to initiate call:', error);
            this.onError?.('Failed to initiate call');
            toast.error('Failed to initiate call');
        }
    } async answerCall(callData: CallData): Promise<void> {
        try {
            if (this.peerConnection) {
                console.warn('⚠️ Cannot answer call, a peer connection already exists.');
                return;
            }

            if (!this.localStream) {
                // Initialize with video preference but audio required
                await this.initializeLocalStream({ video: true, audio: true });
            }

            this.peerConnection = this.createPeerConnection();

            // Add local stream to peer connection
            if (this.localStream) {
                this.localStream.getTracks().forEach(track => {
                    console.log(`🎵 Adding ${track.kind} track to peer connection`);
                    this.peerConnection!.addTrack(track, this.localStream!);
                });
            }

            // Set remote description
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(callData.signal));

            // Create answer
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);

            // Send answer
            this.socket.emit('answerCall', {
                signal: answer,
                to: callData.from,
            });

            console.log('✅ Call answered');
            toast.success('Call answered!');

        } catch (error) {
            console.error('❌ Failed to answer call:', error);
            this.onError?.('Failed to answer call');
            toast.error('Failed to answer call');
        }
    }

    rejectCall(callData: CallData): void {
        this.socket.emit('rejectCall', { to: callData.from });
        console.log('❌ Call rejected');
        toast.info('Call rejected');
    }

    endCall(): void {
        this.socket.emit('callEnded');
        this.handleCallEnd();
        console.log('📵 Call ended by user');
        toast.info('Call ended');
    }

    private handleCallEnd(): void {
        this.callActive = false;

        // Close peer connection
        if (this.peerConnection) {
            this.peerConnection.close();
            this.peerConnection = null;
        }

        // Stop local stream and notify UI
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
            this.onLocalStream?.(null);
        }

        // Clear remote stream and notify UI
        if (this.remoteStream) {
            this.remoteStream = null;
            this.onRemoteStream?.(null);
        }

        this.onCallEnded?.();
    }

    sendTranslation(text: string, fromLang: string, toLang: string, isInterim = false): void {
        if (!this.callActive) {
            console.warn('⚠️ Cannot send translation - call not active');
            return;
        }

        if (!this.socket.connected) {
            console.warn('⚠️ Cannot send translation - socket not connected');
            toast.warning('Connection lost. Trying to reconnect...');
            return;
        }

        this.socket.emit('translation', {
            text,
            fromLang,
            toLang,
            isInterim,
        });

        console.log('🌐 Translation sent:', { text: text.substring(0, 30) + '...', fromLang, toLang });
    }

    getSocketId(): string | undefined {
        return this.socket.id;
    }

    isCallActive(): boolean {
        return this.callActive;
    }

    getLocalStream(): MediaStream | null {
        return this.localStream;
    }

    getRemoteStream(): MediaStream | null {
        return this.remoteStream;
    }

    isSocketConnected(): boolean {
        return this.socket.connected;
    }

    destroy(): void {
        this.handleCallEnd();
        this.socket.disconnect();
        console.log('🗑️ WebRTC service destroyed');
    }
}

export default WebRTCService;