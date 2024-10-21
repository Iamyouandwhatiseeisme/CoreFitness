"use client"
// import User from "../components/data/User"
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useAuth} from "../components/UserProvider/UserProvider"
import {UserProfile} from "./user-profile"

import "./index.css"



export default function Profile (){
    const  [ authUser, setUathUser, isLoggedIn, setIsLoggedIn ] = useAuth();
    
    console.log("authUser", authUser);
    
    return (
        <div className="page-wrapper">
        <Header />
            <div className="default-layout">
                <UserProfile user={authUser}/>
              <Footer />
            </div>
        </div>

    )
}