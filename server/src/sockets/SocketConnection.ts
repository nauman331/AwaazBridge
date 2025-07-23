import { Server, Socket } from "socket.io";

export const SocketConnection = (io: Server) => {
    io.on("connection", (socket: Socket) => {
       socket.on("connect", () => {
           console.log("New client connected");
       })
       socket.on("invoiceStatusUpdate", ({ companyId, invoiceId, status }) => {
           console.log("Received invoice status update:", { companyId, invoiceId, status });
       })
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
}