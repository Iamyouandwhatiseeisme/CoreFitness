import { UserDescriptionComponent } from "./description-component"
import { BorderDiv } from "./border-div"

export function UserDescription(props) {
  const user = props.user;

  return (
    <div className="userDescription">
      <UserDescriptionComponent descProp="Gender" descValue={user.gender}/>
      <BorderDiv />
      {/* <UserDescriptionComponent descProp="User name" descValue={user.company.depart}/> */}
      <BorderDiv />
      {/* <UserDescriptionComponent descProp="Department" descValue={user.company.department}/> */}
    </div>
  )
}
