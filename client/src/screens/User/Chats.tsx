import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, MessageSquare, Search } from 'lucide-react';

// Dummy data for chats
const chats = [
    {
        id: '1',
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        time: '10:30 AM',
        unread: 2,
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        id: '2',
        name: 'Jane Smith',
        lastMessage: 'Let’s catch up soon!',
        time: '09:15 AM',
        unread: 0,
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        id: '3',
        name: 'Family Group',
        lastMessage: 'Dinner at 8?',
        time: 'Yesterday',
        unread: 5,
        avatar: '',
        group: true,
    },
];


const Chats: React.FC = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Filter chats by name or last message
    const filteredChats = chats.filter(
        chat =>
            chat.name.toLowerCase().includes(search.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(search.toLowerCase())
    );

    // Focus input when search opens
    useEffect(() => {
        if (searchOpen) inputRef.current?.focus();
        if (!searchOpen) setSearch('');
    }, [searchOpen]);

    return (
        <div className="h-screen w-full flex flex-col bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-[#fff7f0] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#1e293b] relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-0" style={{ background: 'radial-gradient(circle at 80% 20%, #22c55e22 0%, transparent 60%), radial-gradient(circle at 20% 80%, #1e40af22 0%, transparent 60%)' }} />

            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 bg-gradient-to-r from-[#1e40af] to-[#22c55e] shadow-md z-10 relative">
                <h2 className="text-2xl font-extrabold text-white tracking-wide flex items-center gap-3">
                    <MessageSquare size={26} /> Chats
                </h2>
                <div className="flex items-center gap-2">
                    {/* Animated search input */}
                    <div className={`transition-all duration-300 flex items-center ${searchOpen ? 'w-56 sm:w-72' : 'w-0'} overflow-hidden bg-white/20 rounded-lg`}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search chats..."
                            className="px-4 py-2 w-full bg-transparent text-white placeholder-white/80 focus:outline-none"
                            style={{ minWidth: searchOpen ? 120 : 0 }}
                        />
                    </div>
                    <button
                        className={`p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white ${searchOpen ? 'bg-white/10' : ''}`}
                        onClick={() => setSearchOpen(o => !o)}
                        aria-label="Search"
                        type="button"
                    >
                        <Search className="text-white" size={22} />
                    </button>
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 flex flex-col items-center relative z-10 overflow-y-auto px-2 sm:px-0" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #fff7f0 100%)' }}>
                <div className={`w-full max-w-2xl ${filteredChats.length === 0 ? 'flex flex-col items-center justify-center h-full' : 'py-6 sm:py-10'}`}
                    style={{ minHeight: filteredChats.length <= 3 ? '60vh' : undefined, justifyContent: filteredChats.length <= 3 ? 'center' : 'flex-start' }}>
                    {filteredChats.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-96">
                            <MessageSquare size={60} className="text-[#1e40af] mb-4" />
                            <div className="text-2xl font-bold text-[#1e40af] mb-2">No Chats Found</div>
                            <div className="text-base text-[#64748b]">Try searching with a different keyword.</div>
                        </div>
                    ) : (
                        filteredChats.map((chat, idx) => (
                            <React.Fragment key={chat.id}>
                                <Link
                                    to={`/user/chats/${chat.id}`}
                                    className="flex items-center gap-4 px-6 py-5 rounded-2xl mb-3 bg-white/80 dark:bg-[#334155]/80 hover:scale-[1.025] hover:shadow-lg hover:bg-gradient-to-r hover:from-[#1e40af]/10 hover:to-[#22c55e]/10 transition-all group shadow border border-[#e5e7eb] dark:border-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                                    style={{ boxShadow: '0 2px 8px 0 rgba(30,64,175,0.04)' }}
                                >
                                    <div className="relative">
                                        {chat.avatar ? (
                                            <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#22c55e]/40 shadow" />
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1e40af] to-[#22c55e] flex items-center justify-center text-white font-bold text-xl shadow">
                                                <User size={28} />
                                            </div>
                                        )}
                                        {chat.unread > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#22c55e] to-[#1e40af] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                                                {chat.unread}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-lg text-[#1e40af] dark:text-white truncate group-hover:text-[#22c55e]">{chat.name}</span>
                                            <span className="text-xs text-[#22c55e] font-semibold ml-2">{chat.time}</span>
                                        </div>
                                        <div className="text-base text-[#64748b] dark:text-[#94a3b8] truncate">
                                            {chat.lastMessage}
                                        </div>
                                    </div>
                                </Link>
                                {/* Divider except after last chat */}
                                {idx !== filteredChats.length - 1 && (
                                    <div className="mx-8 border-b border-dashed border-[#e5e7eb] dark:border-[#64748b] opacity-60" />
                                )}
                            </React.Fragment>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chats;
