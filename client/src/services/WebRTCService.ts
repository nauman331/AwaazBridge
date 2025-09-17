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
        this.socket = socket;
        this.initializePeerConnection();
    }

    private initializePeerConnection() {
        const configuration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }
            ]
        };

        this.peerConnection = new RTCPeerConnection(configuration);

        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.socket.emit('ice-candidate', {
                    candidate: event.candidate,
                });
            }
        };

        this.peerConnection.ontrack = (event) => {
            this.remoteStream = event.streams[0];
            if (this.onRemoteStreamCallback) {
                this.onRemoteStreamCallback(this.remoteStream);
            }
        };
    }

    onRemoteStream(callback: (stream: MediaStream) => void) {
        this.onRemoteStreamCallback = callback;
    }

    async getUserMedia(): Promise<MediaStream> {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            this.localStream = stream;

            if (this.peerConnection) {
                stream.getTracks().forEach(track => {
                    this.peerConnection!.addTrack(track, stream);
                });
            }

            return stream;
        } catch (error) {
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
        this.socket.emit('callUser', callData);
    }

    answerCall(answerData: AnswerData) {
        this.socket.emit('answerCall', answerData);
    }

    rejectCall(to: string) {
        this.socket.emit('rejectCall', { to });
    }

    endCall() {
        if (this.peerConnection) {
            this.peerConnection.close();
        }

        if (this.localStream) {
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
        if (this.localStream) {
            const videoTrack = this.localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = enabled;
            }
        }
    }

    toggleAudio(enabled: boolean) {
        if (this.localStream) {
            const audioTrack = this.localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = enabled;
            }
        }
    }
}
