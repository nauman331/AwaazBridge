import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express, { Express } from "express";
const app: Express = express();
const PORT = process.env.PORT || 5000;
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { priceSocket } from "./sockets/priceSocket";
import connectDB from "./config/connectDB";
import authRoutes from "./routes/auth.route";
import tradeRoutes from "./routes/trade.route";
import "./cronjobs/tradeTime";


const corsOptions = {
    origin: true,
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

app.use(cors(corsOptions));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/trade", tradeRoutes);

app.get("/", (req, res) => {
    res.json({ msg: "Routes Working Perfectly" })
})


connectDB();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: true,
        methods: ["GET", "POST"],
        credentials: true,
    }
});

priceSocket(io);

server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌐 Socket.io server ready`);
});
