import dotenv from "dotenv";
dotenv.config({ quiet: true });
import express, { Express } from "express";
const app: Express = express();
const PORT = process.env.PORT;
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { SocketConnection } from "./sockets/SocketConnection";
import connectDB from "./config/connectDB";
import authRoutes from "./routes/auth.route"
import { AITranslate } from "./config/openAI"

const corsoptions = {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
};

app.use(cors(corsoptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({ msg: "Routes Working Perfectly" })
})

app.get("/translate", async (req, res) => {
    AITranslate("en", "ur", "Hello, how are you?").then((translatedText) => {
        res.json({ translatedText });
    }).catch((error) => {
        res.status(500).json({ error: "Translation failed" });
    })
})

connectDB()

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true,
    },
})

SocketConnection(io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

