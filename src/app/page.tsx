import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col gap-0">
      <div className="bg-primary p-5 flex flex-row justify-between">
        <h1 className="text-2xl font-bold text-white"> SheyShop</h1>
        <Button variant={"outline"} className="font-bold">
          <Link href={"register"}>Login</Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-5 md:h-[90vh]  items-center px-20 md:gap-10">
        <div className="flex flex-col border-2">
          <h1 className="text-3xl font-bold text-primary">
            Welcome to Shey Shop
          </h1>
          <p>Your one stop shop for products and enjoy the experience</p>
        </div>
        <div className="flex flex-col">
          <img src={"home.jpg"} alt="home Page" className="w-fit"></img>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
