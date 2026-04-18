import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { required } from "zod/v4-mini";

const userschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const UserModel = mongoose.models.users || mongoose.model("users", userschema);

export default UserModel;
