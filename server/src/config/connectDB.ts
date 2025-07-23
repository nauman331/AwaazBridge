import mongoose, {Mongoose} from "mongoose";

const connectDB = async (): Promise<Mongoose | undefined> => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI is not defined in environment variables.");
            throw new Error("MONGO_URI is missing");
        } 
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectDB;