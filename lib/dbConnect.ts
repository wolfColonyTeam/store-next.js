import mongoose from "mongoose";

export const dbConnect = async (): Promise<typeof mongoose> => {
  try {
    const connection = await mongoose.connect(String(process.env.MONGODB_URI));
    console.log("✅ MongoDB connected successfully");
    return connection;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};
