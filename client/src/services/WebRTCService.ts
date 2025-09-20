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
                { urls: 'stun:stun.l.google.com:19302' }
            ]
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

        this.peerConnection.ontrack = (event) => {
            console.log('🎵 Remote track received:', event.streams.length, 'streams');
            this.remoteStream = event.streams[0];
            if (this.onRemoteStreamCallback) {
                console.log('📞 Calling remote stream callback');
                this.onRemoteStreamCallback(this.remoteStream);
            }
        };

        this.peerConnection.onconnectionstatechange = () => {
            console.log('🔗 Connection state changed:', this.peerConnection?.connectionState);
        };

        this.peerConnection.oniceconnectionstatechange = () => {
            console.log('🧊 ICE connection state changed:', this.peerConnection?.iceConnectionState);
        };
    }

    onRemoteStream(callback: (stream: MediaStream) => void) {
        this.onRemoteStreamCallback = callback;
    }

    async getUserMedia(): Promise<MediaStream> {
        try {
            console.log('🎤 Requesting user media access');
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            console.log('✅ Media access granted. Video tracks:', stream.getVideoTracks().length, 'Audio tracks:', stream.getAudioTracks().length);
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
            throw new Error('Failed to access camera/microphone');
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
    // ...existing code...

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
