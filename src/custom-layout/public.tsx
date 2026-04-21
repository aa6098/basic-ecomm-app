"use client"
import React from 'react'

function PublicLayout({children}: {children:React.ReactNode}) {
  return <div className='flex flex-col'>
    <h1>Hello</h1>
    {children}</div>
}

export default PublicLayout;