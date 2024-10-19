import {fetchUser} from "../fetcher/fetchUser"

export async function UserProfile() {
  const User = await fetchUser();
  return (
    <div className="profile-card">
        <h1>Name: {User.firstName}</h1>
        <h1>Last Name: {User.lastName}</h1>
        <p>Email: {User.email}</p>
        <img src={User.image} style={{width:"250px"}} alt="User-image"></img>
        
    </div>
  )
}
