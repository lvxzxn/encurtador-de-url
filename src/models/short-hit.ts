import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IShortHit extends Document {
  short_id: string;
  addr: string;
  createdAt: Date;
}

const ShortHitSchema: Schema = new Schema({
  short_id: { type: String, required: true },
  addr: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ShortHit: Model<IShortHit> =
  mongoose.models.Hit || mongoose.model<IShortHit>("Hit", ShortHitSchema);
