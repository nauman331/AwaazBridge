import React, { useState } from 'react';
import { Mic, X, Send } from 'lucide-react';

interface VoiceChatProps {
    onSend: (audioUrl: string) => void;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ onSend }) => {
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        setAudioChunks([]);
        recorder.start();
        setRecording(true);
        recorder.ondataavailable = (e) => setAudioChunks((prev) => [...prev, e.data]);
        recorder.onstop = () => {
            const blob = new Blob(audioChunks, { type: 'audio/webm' });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
            setRecording(false);
        };
    };

    const stopRecording = () => {
        mediaRecorder?.stop();
        setRecording(false);
    };

    const handleSend = () => {
        if (audioUrl) {
            onSend(audioUrl);
            setAudioUrl(null);
            setAudioChunks([]);
        }
    };

    return (
        <div className="flex items-center gap-2">
            {!recording && !audioUrl && (
                <button type="button" onClick={startRecording} className="p-2 rounded-full bg-gradient-to-br from-[#1e40af] to-[#22c55e] text-white hover:scale-105 transition-transform shadow-lg" title="Record Voice">
                    <Mic size={22} />
                </button>
            )}
            {recording && (
                <button type="button" onClick={stopRecording} className="p-2 rounded-full bg-red-500 text-white animate-pulse shadow-lg" title="Stop Recording">
                    <X size={22} />
                </button>
            )}
            {audioUrl && (
                <div className="flex items-center gap-2">
                    <audio controls src={audioUrl} className="w-32" />
                    <button type="button" onClick={handleSend} className="p-2 rounded-full bg-gradient-to-br from-[#1e40af] to-[#22c55e] text-white shadow-lg" title="Send Voice">
                        <Send size={20} />
                    </button>
                    <button type="button" onClick={() => { setAudioUrl(null); setAudioChunks([]); }} className="p-2 rounded-full bg-gray-200 text-gray-700 shadow" title="Cancel">
                        <X size={20} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default VoiceChat;
