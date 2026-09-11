import { connect, disconnect } from "mongoose";

export async function connectDB() {
  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  await connect(mongodbUri);
  console.log("Connected to MongoDB");
}

export async function disconnectDB() {
  await disconnect();
  console.log("Disconnected from MongoDB");
}
