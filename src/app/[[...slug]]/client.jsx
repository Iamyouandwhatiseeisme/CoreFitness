'use client'
 
import React from 'react'
import dynamic from 'next/dynamic'
 
const App = dynamic(() => import('..'), { ssr: false })
 
export function ClientOnly(path) {
  return <App path={path}/>
}