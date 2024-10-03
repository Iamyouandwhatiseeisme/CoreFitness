import User from "../../data/User/User";

import "./Profile.css"


export default function Profile (){
    return (
        <div className="profile-card">
            <h1>Name: {User.name}</h1>
            <h1>Last Name: {User.lastName}</h1>
            <p>Email: {User.email}</p>
            <img src={User.Image} style={{width:"300px"}} alt="User-image"></img>
            
        </div>
    )
}