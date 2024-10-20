import { UserDescriptionComponent } from "./description-component"

export function UserDescription(props) {
  const user = props.user;

  return (
    <div className="userDescription">
      <UserDescriptionComponent descProp="Title" descValue={user.company.title}/>
      {/* <div style={{
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
      </div> */}
      
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
  )
}
