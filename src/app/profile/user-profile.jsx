import {fetchUser} from "../fetcher/fetchUser"
import { AvatarName} from "./user-avatar-name"

export async function UserProfile() {
  const user = await fetchUser();
  return (
    <div key={user.id} className="profile-card">
        
        <AvatarName src={user}/>
        <div className="userBackground">
          <button className="editBtn"> Edit Profile</button>
          <div style={{
            width: "80%",
            height: "50%",
            // background: "yellow",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{
            width: "100%",
            height: "50%",
            // background: "white",
            display: "flex",
            // flexDirection: "column"
            justifyContent: "space-between"
            
          }}>
            <div style={{
            width: "30%",
            height: "100%",
            // background: "aqua",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            alignItems: "center"
          }}>
              <b style={{fontSize: "24px", textAlign: "center"}}>{user.company.title}</b> 
              <div style={{paddingTop: "10px"}}>Title</div> 
            </div>
            <div style={{ background: "gray", width: "2px"}}></div>
            <div style={{
              width: "30%",
              height: "100%",
              // background: "blue",
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              alignItems: "center"
            }}>
            <b style={{fontSize: "24px", textAlign: "center"}}>{user.company.name}</b> 
            <div style={{paddingTop: "10px"}}>Company name</div>
          </div>
          <div style={{ background: "gray", width: "2px"}}></div>
            <div style={{
              width: "30%",
              height: "100%",
              // background: "yellow",
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              alignItems: "center"
            }}>
            <b style={{fontSize: "20px", textAlign: "center"}}>{user.company.department}</b> 
            <div style={{paddingTop: "10px"}}>Department</div>
          </div>
          </div>
            <div style={{
            width: "100%",
            height: "50%",
            // background: "red",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "end"
          }}>
            <div style={{paddingRight: "10px"}}>Phone: {user.phone}</div> 
            <div style={{paddingRight: "10px"}}>Email: {user.email}</div> 
          </div>

          </div>

        </div>
        
    </div>
  )
}
