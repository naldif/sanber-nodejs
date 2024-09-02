/*
# src/utils/database.ts
*/
import mongoose from "mongoose";
import { DATABASE_URL } from "./env";

const connect = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: "sanber-be-bootcamp",
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connect;
