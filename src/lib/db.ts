import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Por favor, defina a variável de ambiente MONGODB_URI no .env");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declaração global correta para evitar erro de propriedade inexistente
declare global {
  // biome-ignore lint/suspicious/noExplicitAny: Cache do Mongoose pode ser qualquer valor inicialmente
  var mongooseCache: MongooseCache | undefined;
}

// Garante que `mongooseCache` exista globalmente
globalThis.mongooseCache = globalThis.mongooseCache ?? { conn: null, promise: null };

async function connectToDatabase() {
  if (!globalThis.mongooseCache){
    return;
  }

  if (globalThis.mongooseCache.conn) {
    return globalThis.mongooseCache.conn;
  }

  if (!globalThis.mongooseCache.promise) {
    const opts = { bufferCommands: false };
    globalThis.mongooseCache.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
  }

  globalThis.mongooseCache.conn = await globalThis.mongooseCache.promise;
  return globalThis.mongooseCache.conn;
}

export default connectToDatabase;
