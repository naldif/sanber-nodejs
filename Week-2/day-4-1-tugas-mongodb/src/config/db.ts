import mongoose from "mongoose";
import { DATABASE_URL } from "../env";

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: "tugas-mongodb",

    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
