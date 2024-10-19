import {fetchUser} from "../fetcher/fetchUser"

export async function UserProfile() {
  const user = await fetchUser();
  return (
    <div className="profile-card">
        <h1>Name: {user.firstName}</h1>
        <h1>Last Name: {user.lastName}</h1>
        <p>Email: {user.email}</p>
        <img src={user.image} style={{width:"250px"}} alt="User-image"></img>
        
    </div>
  )
}
