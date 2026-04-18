"use server";

import { IUser } from "@/interfaces";
import UserModel from "../models/user-model";
import { email } from "zod";
import bcrypt from "bcryptjs";

export const registerUser = async (payload: Partial<IUser>) => {
  try {
    const userExists = await UserModel.findOne({ email: payload.email });
    if (userExists) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(payload.password!, 10);
    payload.password = hashedPassword;

    await UserModel.create(payload);
    return { success: true, message: "user registered" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const loginUser = async (payload: Partial<IUser>) => {
  try {
    const userExists = await UserModel.findOne({ email: payload.email });
    if (!userExists) throw new Error("User does not exists");
    console.log(userExists);
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
