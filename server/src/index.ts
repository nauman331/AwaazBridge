import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express, { Express } from "express";
const app: Express = express();
const PORT = process.env.PORT || 5000;
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { SocketConnection } from "./sockets/SocketConnection";
import connectDB from "./config/connectDB";
import authRoutes from "./routes/auth.route";
import translateRoute from './routes/translateRoute';

// Simplified CORS configuration for Express 4.x
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://awaazbridge-frontend.onrender.com',
        'https://awaazbridge.vercel.app'
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "Authorization",
        "Cache-Control",
        "X-Access-Token"
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1', translateRoute);

app.get("/", (req, res) => {
    res.json({ msg: "Routes Working Perfectly" })
})


connectDB();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:5173',
            'https://awaazbridge-frontend.onrender.com',
            'https://awaazbridge.vercel.app'
        ],
        methods: ["GET", "POST"],
        credentials: true,
    }
});

SocketConnection(io);

server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌐 Socket.io server ready`);
});

