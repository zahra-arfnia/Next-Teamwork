"use server";
import { connection, connect, disconnect } from "mongoose";
const connectDB = async () => {
  if (connection.readyState === 1) return;
  try {
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};
const disconnectDB = async () => {
  try {
    await disconnect(() => {
      console.log("Disconnected to MongoDB");
    });
  } catch (err) {
    console.error("MongoDB disconnecting error:", err);
  }
};
export { connectDB, disconnectDB };
