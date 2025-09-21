import { Server, Socket } from "socket.io";
import { AITranslate } from "../config/openAI";

interface User {
    id: string;
    peerId?: string;
}

const users = new Map<string, User>();

export const SocketConnection = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);
        users.set(socket.id, { id: socket.id });
        socket.emit("me", socket.id);

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            const disconnectedUser = users.get(socket.id);
            if (disconnectedUser && disconnectedUser.peerId) {
                io.to(disconnectedUser.peerId).emit("callEnded");
            }
            users.delete(socket.id);
        });

        socket.on("callUser", (data) => {
            if (!data.phone || !data.signalData || !data.from || !data.fromLang || !data.toLang) {
                socket.emit("error", "Missing required call data");
                return;
            }

            const callee = Array.from(users.values()).find(u => u.id === data.phone);
            if (callee) {
                io.to(callee.id).emit("callUser", {
                    signal: data.signalData,
                    from: data.from,
                    name: data.name,
                    fromLang: data.fromLang,
                    toLang: data.toLang,
                });
            } else {
                socket.emit("error", "User not found");
            }
        });

        socket.on("answerCall", (data) => {
            if (!data.to || !data.signal) {
                socket.emit("error", "Missing required answer data");
                return;
            }
            const caller = users.get(data.to);
            const callee = users.get(socket.id);

            if (caller && callee) {
                // Correctly link both peers to each other
                caller.peerId = callee.id;
                callee.peerId = caller.id;
                io.to(data.to).emit("callAccepted", data.signal);
            }
        });

        socket.on("rejectCall", (data) => {
            if (data.to) {
                io.to(data.to).emit("callRejected");
            }
        });

        socket.on("ice-candidate", (data) => {
            const currentUser = users.get(socket.id);
            if (data.candidate && currentUser && currentUser.peerId) {
                io.to(currentUser.peerId).emit("ice-candidate", data.candidate);
            }
        });

        socket.on("translation", async (data) => {
            console.log('🌐 Translation request received:', {
                from: socket.id,
                text: data.text?.substring(0, 50) + '...',
                fromLang: data.fromLang,
                toLang: data.toLang,
                isInterim: data.isInterim
            });

            const currentUser = users.get(socket.id);
            if (currentUser && currentUser.peerId && data.text && data.fromLang && data.toLang) {
                try {
                    console.log('🔄 Calling AI translate function');
                    const translatedText = await AITranslate(data.fromLang, data.toLang, data.text);
                    console.log('✅ Translation successful:', translatedText?.substring(0, 50) + '...');

                    const translationData = {
                        original: data.text,
                        translated: translatedText,
                        fromLang: data.fromLang,
                        toLang: data.toLang,
                        timestamp: new Date(),
                        isInterim: data.isInterim || false
                    };

                    console.log('📤 Sending translation to peer:', currentUser.peerId);
                    io.to(currentUser.peerId).emit("translation", translationData);

                    // Optional: also emit to sender for confirmation
                    socket.emit("translationSent", translationData);
                } catch (error) {
                    console.error("❌ Translation error:", error);
                    socket.emit("error", "Translation failed");
                }
            } else {
                console.warn('❌ Missing translation requirements:', {
                    hasUser: !!currentUser,
                    hasPeer: !!currentUser?.peerId,
                    hasText: !!data.text,
                    hasFromLang: !!data.fromLang,
                    hasToLang: !!data.toLang
                });
            }
        });

        socket.on("callEnded", () => {
            const currentUser = users.get(socket.id);
            if (currentUser && currentUser.peerId) {
                const peerId = currentUser.peerId;
                io.to(peerId).emit("callEnded");
                const peer = users.get(peerId);
                if (peer) {
                    peer.peerId = undefined;
                }
                currentUser.peerId = undefined;
            }
        });
    });
};