import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Defina a variável de ambiente MONGODB_URI no .env");
}

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  if (!MONGODB_URI){
    return;
  }

  return mongoose.connect(MONGODB_URI);
}
