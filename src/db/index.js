import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(`# MONGODB was connected......`)
  } catch (error) {
    console.log("MONGODB connection FAILED :", error.message);
  }
};
export default connectDB;
