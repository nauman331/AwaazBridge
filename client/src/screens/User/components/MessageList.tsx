import React from 'react';

interface Message {
    id: number;
    text?: string;
    time: string;
    sent: boolean;
    voiceUrl?: string;
}

interface MessageListProps {
    messages: Message[];
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, messagesEndRef }) => (
    <div className="flex-1 overflow-y-auto px-2 sm:px-10 py-6 space-y-4 relative z-10" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #fff7f0 100%)' }}>
        {messages.map(msg => (
            <div
                key={msg.id}
                className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
            >
                <div className={`max-w-[70vw] md:max-w-xl px-5 py-3 rounded-2xl shadow text-base ${msg.sent ? 'bg-gradient-to-br from-[#1e40af] to-[#22c55e] text-white rounded-br-md' : 'bg-white/90 dark:bg-[#334155]/90 text-[#1e293b] dark:text-white rounded-bl-md'} font-medium transition-all flex items-center gap-3`}>
                    {msg.voiceUrl ? (
                        <audio controls src={msg.voiceUrl} className="w-40">
                            Your browser does not support the audio element.
                        </audio>
                    ) : (
                        msg.text
                    )}
                    <div className="text-xs text-right mt-1 opacity-70 min-w-fit">{msg.time}</div>
                </div>
            </div>
        ))}
        <div ref={messagesEndRef} />
    </div>
);

export default MessageList;
