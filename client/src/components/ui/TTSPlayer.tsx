import React, { useState, useEffect, useRef } from 'react';
import { WebRTCService } from '../../services/WebRTCService';

interface TTSPlayerProps {
    webRTCRef: React.RefObject<WebRTCService | null>;
    queue: string[];
    language: string;
    onDone: () => void;
}

export const TTSPlayer: React.FC<TTSPlayerProps> = ({ webRTCRef, queue, language, onDone }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    useEffect(() => {
        const socket = webRTCRef.current?.getSocket();
        if (!socket) return;

        const handleAudioChunk = (chunk: ArrayBuffer) => {
            audioChunksRef.current.push(new Blob([chunk]));
        };

        const handleAudioEnd = () => {
            if (audioChunksRef.current.length === 0) {
                // Handle cases where no audio was generated
                setIsPlaying(false);
                onDone();
                return;
            }

            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mpeg' });
            const audioUrl = URL.createObjectURL(audioBlob);

            if (audioRef.current) {
                audioRef.current.src = audioUrl;
                audioRef.current.play().catch(e => {
                    console.error("Audio play failed:", e);
                    // Unblock queue even if play fails
                    setIsPlaying(false);
                    onDone();
                });
            }
            audioChunksRef.current = []; // Clear chunks for next audio
        };

        socket.on('tts-audio-chunk', handleAudioChunk);
        socket.on('tts-audio-end', handleAudioEnd);

        return () => {
            socket.off('tts-audio-chunk', handleAudioChunk);
            socket.off('tts-audio-end', handleAudioEnd);
        };
    }, [webRTCRef, onDone]);

    useEffect(() => {
        const socket = webRTCRef.current?.getSocket();
        if (socket && !isPlaying && queue.length > 0) {
            const textToPlay = queue[0];
            setIsPlaying(true);
            audioChunksRef.current = []; // Reset chunks before request
            socket.emit('tts-request', { text: textToPlay, language });
        }
    }, [queue, isPlaying, language, webRTCRef]);

    const handleAudioEnded = () => {
        setIsPlaying(false);
        onDone();
    };

    return (
        <audio
            ref={audioRef}
            onEnded={handleAudioEnded}
            onError={(e) => {
                console.error('❌ Audio Element Error:', e);
                handleAudioEnded();
            }}
            hidden
        />
    );
};
