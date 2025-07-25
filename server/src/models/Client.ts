import mongoose, { Document, Schema } from "mongoose";

export interface IClient extends Document {
    name: string;
    address: string;
    phone: string;
    companyId: mongoose.Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const clientSchema = new Schema<IClient>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export const Client = mongoose.model<IClient>("Client", clientSchema);
