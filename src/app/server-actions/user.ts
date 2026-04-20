"use server";

import { IUser } from "@/interfaces";
import UserModel from "../models/user-model";
import { email, success } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Cookies from 'js-cookie'
import { cookies } from "next/headers";
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

    const isMatch = await bcrypt.compare(payload.password!, userExists.password);

    if (!isMatch) {
      throw new Error("Password don't match");
    }

    const token = jwt.sign(
      {
        id: userExists._id,
        email: userExists.email
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );
    console.log(token)
    return { success: true, message: "Successful", data: token };


  } catch (error: any) {
    return { success: false, message: error.message };
  }
};


export const getLoggedinUser = async () => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token) throw new Error("Invalid authentication");
    const decryptedData = await jwt.verify(token, process.env.JWT_SECRET!)

    const { _id, email } = decryptedData as { _id: string, email: string };
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Invalid user");
    return { success: true, message: "user fetched" , data: user}
  } catch (error:any) {
    return { success: false, message: error.message };
  }

}