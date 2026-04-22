"use client";
import React, { useEffect } from "react";
import useAuthStore, { IAuthStore } from "@/global-store/user-store";
import { useRouter } from "next/navigation";
import { getLoggedinUser } from "@/app/server-actions/user";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser }: IAuthStore = useAuthStore() as IAuthStore;
  const router = useRouter();
  const getData = async () => {
    try {
      const response: any = await getLoggedinUser();
      if (!response.success) {
        throw new Error("unable to log user");
      }
      setUser(JSON.parse(response.data));
    } catch (error: any) {
      router.push("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      getData();
    }
  }, []);
  return (
    <div className="flex flex-col">
      <div className="py-5 px-10 bg-primary flex justify-between">
        <h1 className="text-2xl font-bold text-white">SheyShop </h1>
        <h1 className="text-white font-medium">{user?.name}</h1>
      </div>
      <div className=" px-10">{children}</div>
    </div>
  );
}

export default PrivateLayout;
