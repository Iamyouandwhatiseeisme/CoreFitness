"use client"
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Gear from "../../../public/images/Gear.gif"

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
        console.log(token);
        async function fetchUser (){
            try {
                const response = await fetch    ("https://dummyjson.com/user/me", {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token}`,
                    },
                    
                  });

                // console.log(response);
                if(response.ok){
                    const data = await response.json();
                    console.log(data);
                    setUser(data);


                }
            } catch (error) {
                console.error('Something went wrong: ', error)  
            }
        }

        fetchUser();
    }, [] )
    
    
    console.log("authUser", authUser);
    
    return (
        <div className="page-wrapper">
        <Header />
            <div className="profile-card">
            {user ? <>
                <div>{user.firstName}</div>
            </>: 
            <div>Loading<img src={Gear.src} alt='loading icon'></img></div>}
            </div>
        </div>

    )
}