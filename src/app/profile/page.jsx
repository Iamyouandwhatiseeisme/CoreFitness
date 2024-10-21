"use client"
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Gear from "../../../public/images/Gear.gif"
import {UserProfile} from './user-profile'
import "./index.css"
import { useState, useEffect } from "react";

export default  function Profile (){
    const [ user, setUser ] = useState(null)
    const retrieveAccessToken = () =>{
        const cookieStore = document.cookie;
        const retrievedCookie = cookieStore.match(/refreshToken=([^;]*)/)
        return retrievedCookie[1];
    }

    useEffect  (()=>{
        const token = retrieveAccessToken();
        async function fetchUser (){
            try {
                const response = await fetch ("https://dummyjson.com/user/me", {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`,
                    },
                  });
                if(response.ok){
                    const data = await response.json();
                    setUser(data);
                }
            } catch (error) {
                console.error('Something went wrong: ', error)  
            }
        }
        fetchUser();
    }, [] )
    
    return (
        <div className="page-wrapper">
        <Header />
            <div className="default-layout">
            {user ? <>
                <UserProfile user={user}/>
                <Footer />    
            </>: 
            <div>Loading<img src={Gear.src} alt='loading icon'></img></div>}
            </div>
        </div>
    )
}