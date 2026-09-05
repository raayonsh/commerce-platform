import { connect } from "mongoose";

async function database() {
  try {
    const mongodbUri = process.env.MONGODB_URI;
    if (!mongodbUri) {
      throw new Error("MONGODB_URI is not defined");
    }
    await connect(mongodbUri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export default database;
