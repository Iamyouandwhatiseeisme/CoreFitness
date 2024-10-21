// import {fetchUser} from "../fetcher/fetchUser"
import { AvatarName} from "./user-avatar-name"
import { UserBackground } from "./user-background"


export function UserProfile({user}) {
  // const user = await fetchUser(currentUser.id);
  // console.log("user", user);
  return (
    <div className="profile-card">
        
        <AvatarName user={user}/>
        <UserBackground user={user}/>
        
        
    </div>
  )
}
