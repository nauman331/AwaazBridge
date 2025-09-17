
import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

interface Message {
    id: number;
    text?: string;
    time: string;
    sent: boolean;
    voiceUrl?: string;
}


const initialMessages: Message[] = [
    { id: 1, text: 'Hey! How are you?', time: '10:30 AM', sent: true },
    { id: 2, text: 'I am good, thanks! And you?', time: '10:31 AM', sent: false },
    { id: 3, text: 'Doing well. Ready for the meeting?', time: '10:32 AM', sent: true },
    { id: 4, text: 'Yes, let’s start in 5 minutes.', time: '10:33 AM', sent: false },
];

const SingleChat: React.FC = () => {
    const { id } = useParams();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>(initialMessages);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (text: string) => {
        setMessages(prev => [
            ...prev,
            {
                id: prev.length + 1,
                text,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sent: true,
            },
        ]);
    };

    const handleSendVoice = (audioUrl: string) => {
        setMessages(prev => [
            ...prev,
            {
                id: prev.length + 1,
                voiceUrl: audioUrl,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sent: true,
            },
        ]);
    };

    return (
        <div className="h-screen w-full flex flex-col bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-[#fff7f0] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#1e293b] relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-0" style={{ background: 'radial-gradient(circle at 80% 20%, #22c55e22 0%, transparent 60%), radial-gradient(circle at 20% 80%, #1e40af22 0%, transparent 60%)' }} />

            {/* Header */}
            <div className="flex items-center gap-4 px-6 sm:px-10 py-5 bg-gradient-to-r from-[#1e40af] to-[#22c55e] shadow-md z-10 relative">
                <Link to="/user/chats" className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors">
                    <ArrowLeft size={26} />
                </Link>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e40af] to-[#22c55e] flex items-center justify-center text-white font-bold text-xl">
                        <User size={24} />
                    </div>
                    <span className="font-bold text-xl text-white tracking-wide">Chat {id}</span>
                </div>
            </div>

            {/* Messages */}
            <MessageList messages={messages} messagesEndRef={messagesEndRef} />

            {/* Input */}
            <MessageInput onSend={handleSend} onSendVoice={handleSendVoice} />
        </div>
    );
};

export default SingleChat;
