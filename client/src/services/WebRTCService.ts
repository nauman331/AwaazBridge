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
            iceCandidatePoolSize: 10
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
            console.log('🎵 Remote track received:', event.streams.length, 'streams');

            // Avoid duplicate stream assignments
            if (this.remoteStream && this.remoteStream.id === event.streams[0].id) {
                console.log('⏭️ Skipping duplicate stream assignment');
                return;
            }

            this.remoteStream = event.streams[0];
            if (this.onRemoteStreamCallback) {
                console.log('📞 Calling remote stream callback');
                this.onRemoteStreamCallback(this.remoteStream);
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

            if (this.peerConnection?.iceConnectionState === 'failed') {
                console.log('🧊 ICE connection failed, restarting ICE');
                this.restartIce();
            }
        };

        this.peerConnection.onicegatheringstatechange = () => {
            console.log('🧊 ICE gathering state changed:', this.peerConnection?.iceGatheringState);
        };
    }

    private handleConnectionFailure() {
        console.log('🔧 Handling connection failure');
        // In a real implementation, you might want to:
        // 1. Retry the connection
        // 2. Notify the user
        // 3. Fall back to different TURN servers
    }

    private restartIce() {
        console.log('🔄 Restarting ICE connection');
        if (this.peerConnection) {
            this.peerConnection.restartIce();
        }
    } onRemoteStream(callback: (stream: MediaStream) => void) {
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
            this.localStream = stream;

            if (this.peerConnection) {
                stream.getTracks().forEach(track => {
                    console.log('➕ Adding track to peer connection:', track.kind);
                    this.peerConnection!.addTrack(track, stream);
                });
            }

            return stream;
        } catch (error) {
            console.error('❌ Failed to access camera/microphone:', error);
            throw new Error(error instanceof Error ? error.message : 'Failed to access camera/microphone');
        }
    }

    async createOffer(): Promise<RTCSessionDescriptionInit> {
        if (!this.peerConnection) throw new Error('Peer connection not initialized');

        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        return offer;
    }

    async createAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
        if (!this.peerConnection) throw new Error('Peer connection not initialized');

        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        return answer;
    }

    async handleAnswer(answer: RTCSessionDescriptionInit) {
        if (!this.peerConnection) throw new Error('Peer connection not initialized');
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
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
}
