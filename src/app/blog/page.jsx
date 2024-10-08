import BlogPost from "../components/BlogPost/BlogPost.js"
import * as Mushrooms from "../components/data/Mushrooms.js"
import Header from "../components/header/Header.js"
import Footer from "../components/footer/Footer.js"
import "./index.css"
const MushroomsList = [Mushrooms.AmanitaMuscaria, Mushrooms.AmanitaPanterina, Mushrooms.Cordyceps, Mushrooms.LionsMane,Mushrooms.Maitake];




export default function Blog (){
    
    

    return (
        <div>
            <Header />
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
            <Footer />
        </div>
    )

}