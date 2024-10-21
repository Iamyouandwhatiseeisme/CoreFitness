'use client'
 
import React from 'react'
import dynamic from 'next/dynamic'
// import App from '../../App'
 
const App = dynamic(() => import('..'), { ssr: false })
 
export function ClientOnly({path}) {
  console.log(path);
  
  return <App path={path}></App>
}