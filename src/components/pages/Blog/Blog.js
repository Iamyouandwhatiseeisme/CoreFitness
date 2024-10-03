import BlogPost from "../../content/BlogPost/BlogPost.js"
import { Link } from 'react-router-dom';
import * as Mushrooms from "../../data/Mushrooms.js"

const MushroomsList = [Mushrooms.AmanitaMuscaria, Mushrooms.AmanitaPanterina, Mushrooms.Cordyceps, Mushrooms.LionsMane,Mushrooms.Maitake];




export default function Blog (){
    
    

    return (
        <div>
            <div className="blog-container">

            {MushroomsList.map((mushroom)=>{
                return <Link to={mushroom.link} key={mushroom.key} >
                            <BlogPost
                            image={mushroom.img} 
                            name={mushroom.name} 
                            description={mushroom.posts} 
                            heading={mushroom.Heading}
                            />
                        </Link>
            })}
            </div>
        </div>
    )

}