"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import PublicLayout from './public';
import PrivateLayout from './private';


function CustomLayout( {children}: {children:React.ReactNode}) {
    const pathName = usePathname();
    console.log(pathName)
    const isPublicRoute = ["/login", "/register", "/"].includes(pathName)
    if (isPublicRoute){
        console.log("public")
        return <PublicLayout>{children}</PublicLayout>
    } 
            console.log("private")

        return <PrivateLayout>{children}</PrivateLayout>
        
    
//   return (
//     <div>CustomLayout</div>
//   )
}

export default CustomLayout