import User from "../components/data/User"
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import "./index.css"


export default function Profile (){
    return (
        <>
        <Header />
            <div className="profile-card">
                <h1>Name: {User.name}</h1>
                <h1>Last Name: {User.lastName}</h1>
                <p>Email: {User.email}</p>
                <img src={User.Image.src} style={{width:"300px"}} alt="User-image"></img>
                
            </div>
        <Footer />
        </>
    )
}