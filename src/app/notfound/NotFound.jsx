
import Link from "next/link";
function ReturnBackButton ({destination}){
    return (<Link href={`/${destination}`}>
          <button>Go back </button>
        </Link>
    )


}

export default function NotFound(props) {
    return (
      <div style={{display: "flex", alignItems: "center", flexDirection:"column"}}>
        <h1>Oops! Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <ReturnBackButton destination={props.page}/>
        
        
      </div>
    );
}



export {
    ReturnBackButton
}