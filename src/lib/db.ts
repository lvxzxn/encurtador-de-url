import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Por favor, defina a variável de ambiente MONGODB_URI no .env");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let cached = (global as any).mongoose;

if (!cached) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, 
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
