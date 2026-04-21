"use client"
import React from 'react'
import useAuthStore, { IAuthStore } from '@/global-store/user-store'

function PrivateLayout({children}: {children: React.ReactNode}) {
  const {user, setUser}: IAuthStore = useAuthStore() as IAuthStore;
  return (
    
    <div className='flex flex-col'>
        <div className="p-5 bg-primary flex justify-between">
            <h1 className='text-2xl font-bold text-white'>SheyShop </h1>
            <h1>UserName</h1>
        </div>
        <div>{children}</div>
    </div>
  )
}

export default PrivateLayout