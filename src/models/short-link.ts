import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IShortLink extends Document {
  original: string;
  shortened: string;
  addr?: string; // endereço IP opcional
  createdAt: Date;
}

const ShortLinkSchema: Schema = new Schema({
  original: { type: String, required: true },
  shortened: { type: String, required: true, unique: true },
  addr: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const ShortLink: Model<IShortLink> =
  mongoose.models.Link || mongoose.model<IShortLink>("Link", ShortLinkSchema);
