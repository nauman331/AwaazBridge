import mongoose, { Document, Schema } from "mongoose";

export interface ITranscript extends Document {
    call: mongoose.Schema.Types.ObjectId;
    roomId: string;
    fromUser: mongoose.Schema.Types.ObjectId;
    fromLang: "ur" | "en";
    originalText: string;
    translatedText: string;
    targetLang: "ur" | "en";
    createdAt: Date;
    updatedAt: Date;
}

const TranscriptSchema = new Schema<ITranscript>({
    call: { type: mongoose.Schema.Types.ObjectId, ref: "Call", required: true },
    roomId: { type: String, required: true },
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fromLang: { type: String, enum: ["ur", "en"], required: true },
    originalText: { type: String, required: true },
    translatedText: { type: String, required: true },
    targetLang: { type: String, enum: ["ur", "en"], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export const Transcript = mongoose.model<ITranscript>("Transcript", TranscriptSchema);
