"use client"
import React, {  useContext, useEffect, useState } from 'react'
    const AuthContext = React.createContext(null);
export  function  UserProvider ({children}) {
    const [ authUser, setAuthUser] = useState(()=>{
        const storedUser = localStorage.getItem('userData');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [ isLoggedIn, setIsLoggedIn] = useState(()=>{
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    const value = [
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    ]
    useEffect(() => {
        console.log('setting local')
        localStorage.setItem('userData', JSON.stringify(authUser));
        localStorage.setItem('isLoggedIn', isLoggedIn);
        console.log('local set')

    }, [authUser, isLoggedIn]);
     
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
        
    )
}
export function useAuth (){
    const context = useContext(AuthContext);
    if(!context){
        throw Error('No context')
    }
    return context
}

