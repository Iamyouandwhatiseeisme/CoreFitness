"use client"
// import User from "../components/data/User"
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useAuth} from "../components/UserProvider/UserProvider"

import "./index.css"



export default function Profile (){
    const  [ authUser, setUathUser, isLoggedIn, setIsLoggedIn ] = useAuth();
    console.log(authUser.Image);
    
    
    return (
        <>
        <Header />
            <div className="profile-card">
                <h1>Name: {authUser.userName}</h1>
                <h1>Last Name: {authUser.lastName}</h1>
                <p>Email: {authUser.email}</p>
                <img src={authUser.Image} style={{width:"250px"}} alt="User-image"></img>
                
            </div>
        </div>

    )
}