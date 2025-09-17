import React, { useState } from 'react';
import VoiceChat from './VoiceChat';
import { Send } from 'lucide-react';

interface MessageInputProps {
    onSend: (text: string) => void;
    onSendVoice: (audioUrl: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, onSendVoice }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSend(input);
            setInput('');
        }
    };

    return (
        <form className="flex items-center gap-2 px-2 sm:px-10 py-4 bg-white/80 dark:bg-[#1e293b]/80 border-t border-[#22c55e]/10 z-10" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-5 py-3 rounded-full bg-[#f8fafc] dark:bg-[#334155] border border-[#22c55e]/10 focus:outline-none focus:ring-2 focus:ring-[#22c55e] text-base shadow"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <VoiceChat onSend={onSendVoice} />
            <button type="submit" className="p-3 rounded-full bg-gradient-to-br from-[#1e40af] to-[#22c55e] text-white hover:scale-105 transition-transform shadow-lg">
                <Send size={22} />
            </button>
        </form>
    );
};

export default MessageInput;
