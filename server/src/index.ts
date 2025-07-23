import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express, { Express } from "express";
const app : Express = express();
const PORT = process.env.PORT || 3000;
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { SocketConnection } from "./sockets/SocketConnection";
import connectDB from "./config/connectDB";

app.use(cors());
app.use(express.json());

connectDB()

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    },
})

SocketConnection(io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

