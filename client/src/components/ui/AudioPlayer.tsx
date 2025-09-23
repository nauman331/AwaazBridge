import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
    audioSrc: string | null;
    onEnded: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, onEnded }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioSrc && audioElement) {
            audioElement.src = audioSrc;
            audioElement.play().catch(e => console.error("Audio play failed:", e));
        }
    }, [audioSrc]);

    return (
        <audio
            ref={audioRef}
            onEnded={onEnded}
            onError={(e) => {
                console.error('❌ Audio Element Error:', e);
                onEnded(); // Ensure queue progresses even on error
            }}
            hidden
        />
    );
};
