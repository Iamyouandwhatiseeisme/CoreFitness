import BlogPost from "../components/BlogPost/BlogPost.js"
import * as Mushrooms from "../components/data/Mushrooms.js"

const MushroomsList = [Mushrooms.AmanitaMuscaria, Mushrooms.AmanitaPanterina, Mushrooms.Cordyceps, Mushrooms.LionsMane,Mushrooms.Maitake];




export default function Blog (){
    
    

    return (
        <div>
            <div className="blog-container">

            {MushroomsList.map((mushroom)=>{
                return     <BlogPost
                            image={mushroom.img} 
                            name={mushroom.name} 
                            description={mushroom.posts} 
                            heading={mushroom.Heading}
                            />
                      
            })}
            </div>
        </div>
    )

}