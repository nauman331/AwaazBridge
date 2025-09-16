import { Server, Socket } from "socket.io";
import { AITranslate } from "../config/openAI";

export const SocketConnection = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);
        socket.emit("me", socket.id);

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
            socket.broadcast.emit("callEnded");
        });

        socket.on("callUser", (data) => {
            if (!data.phone || !data.signalData || !data.from || !data.fromLang || !data.toLang) {
                socket.emit("error", "Missing required call data");
                return;
            }

            io.to(data.phone).emit("callUser", {
                signal: data.signalData,
                from: data.from,
                name: data.name,
                fromLang: data.fromLang,
                toLang: data.toLang,
            });
        });

        socket.on("answerCall", (data) => {
            if (!data.to || !data.signal) {
                socket.emit("error", "Missing required answer data");
                return;
            }

            io.to(data.to).emit("callAccepted", data.signal);
        });

        socket.on("rejectCall", (data) => {
            if (data.to) {
                io.to(data.to).emit("callRejected");
            }
        });

        socket.on("ice-candidate", (data) => {
            if (data.candidate && data.to) {
                io.to(data.to).emit("ice-candidate", data);
            }
        });

        // Handle translation requests
        socket.on("translateText", async (data) => {
            try {
                if (!data.text || !data.fromLang || !data.toLang || !data.to) {
                    socket.emit("translationError", "Missing required translation data");
                    return;
                }

                const translatedText = await AITranslate(data.fromLang, data.toLang, data.text);

                // Send translation to the requesting socket
                socket.emit("translationResult", {
                    id: data.id,
                    original: data.text,
                    translated: translatedText,
                    fromLang: data.fromLang,
                    toLang: data.toLang,
                    timestamp: new Date()
                });

                // Send translation to the other participant
                io.to(data.to).emit("translation", {
                    original: data.text,
                    translated: translatedText,
                    fromLang: data.fromLang,
                    toLang: data.toLang,
                    timestamp: new Date(),
                    from: socket.id
                });
            } catch (error) {
                console.error("Translation error:", error);
                socket.emit("translationError", "Translation failed");
            }
        });

        socket.on("translation", (data) => {
            if (data.to && data.original && data.translated) {
                io.to(data.to).emit("translation", {
                    original: data.original,
                    translated: data.translated,
                    fromLang: data.fromLang,
                    toLang: data.toLang,
                    timestamp: new Date()
                });
            }
        });

        socket.on("callEnded", () => {
            socket.broadcast.emit("callEnded");
        });
    });
};