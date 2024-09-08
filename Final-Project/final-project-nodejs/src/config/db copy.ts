import mongoose from "mongoose";
import { DATABASE_URL } from "../env";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/final-project');
    // await mongoose.connect(DATABASE_URL, {
    //   dbName: "final-project",

    // });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
