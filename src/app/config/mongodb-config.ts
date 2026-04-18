import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("Success connected");
  } catch (error) {
    console.log("Error connecting", error);
  }
};
