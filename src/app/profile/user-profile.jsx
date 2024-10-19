import {fetchUser} from "../fetcher/fetchUser"

export async function UserProfile() {
  const user = await fetchUser();
  return (
    <div className="profile-card">
        <img className="userImg" src={user.image} alt="User-image"></img>
        <div className="userName">
          <h1 style={{marginLeft: "-30px"}}>{user.firstName}</h1>
          <h1 
          style={{
            marginLeft: "10px",
            paddingTop: "0px"
            }}>{user.lastName}</h1>
        </div>
        <div className="userBackground">
          <button className="editBtn"> Edit Profile</button>
          <div style={{
            width: "70%",
            height: "50%",
            background: "yellow",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{
            width: "100%",
            height: "50%",
            background: "black",
            display: "flex",
            flexDirection: "column"
          }}></div>
            <div style={{
            width: "100%",
            height: "50%",
            background: "red",
            display: "flex",
            flexDirection: "column"
          }}></div>

          </div>

        </div>
        
    </div>
  )
}
