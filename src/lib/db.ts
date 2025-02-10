import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Por favor, defina a variável de ambiente MONGODB_URI no .env");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = globalThis.mongooseCache || { conn: null, promise: null };

async function connectToDatabase(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  globalThis.mongooseCache = cached;

  return cached.conn;
}

export default connectToDatabase;