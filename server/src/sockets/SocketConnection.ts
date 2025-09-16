import { Server, Socket } from "socket.io";

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