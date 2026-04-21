import { getLoggedinUser } from "@/app/server-actions/user";
import { IUser } from "@/interfaces";
import { redirect, RedirectType } from 'next/navigation'

import React from "react";

async function ProductsPage() {
  const userResponse = await getLoggedinUser();
  if (!userResponse.success){
    console.log(userResponse.message);
    //redirect("/login")
  }
  const user:IUser = userResponse.data;
  console.log(user)
    console.log(user.email)

  return <div>
    <h1 >User: {user.name}</h1>
        <h1>Email: {user.email}</h1>

  </div>;
}

export default ProductsPage;
