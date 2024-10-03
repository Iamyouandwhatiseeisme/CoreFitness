import * as assets from "../../../assets/images/assets.js";
import BlogPost from "../../content/BlogPost/BlogPost.js"
import * as Posts from "../../../assets/Posts.js"
import { Link } from 'react-router-dom';




export default function Blog (){
    
    

    return (
        <div>
            <div className="blog-container">

<Link to="/amanita-muscaria">
    <BlogPost 
        image={assets.AmanitaMuscaria} 
        name="Amanita Muscaria" 
        description={Posts.AmanitaMuscariaPost} 
        heading="Amanita Muscaria: The Iconic, Mysterious Mushroom"
    />
</Link>
<Link to="/amanita-pantherina">
    <BlogPost 
        image={assets.AmanitaPanterina} 
        name="Amanita Panterina" 
        description={Posts.AmanitaPanterinaPost} 
        heading="Amanita Panterina: The Stronger, Yet more Mysterious" 
    />
</Link>
<Link to="/cordyceps">
    <BlogPost 
        image={assets.Cordyceps} 
        name="Cordyceps" 
        description={Posts.CordycepsPost} 
        heading="Cordyceps: Parasitic, yet Symbiotic" 
    />
</Link>
<Link to="/lions-mane">
    <BlogPost 
        image={assets.LionsMane} 
        name="Lions Mane" 
        description={Posts.LionsManePost} 
        heading="Lion's Mane: What if you used more of your brain?" 
    />
</Link>
<Link to="/maitake">
    <BlogPost 
        image={assets.Maitake} 
        name="Maitake" 
        description={Posts.MaitakePost} 
        heading="Maitake Magic: Unlocking the Health Benefits of the Dancing Mushroom" 
    />
</Link>
<Link to="/reishi">
    <BlogPost 
        image={assets.Reishi} 
        name="Reishi" 
        description={Posts.ReishiPost} 
        heading="Reishi: The Mushroom of Immortality and Wellness" 
    />
</Link>
<Link to="/shiitake">
    <BlogPost 
        image={assets.Shitake} 
        name="Shitake" 
        description={Posts.ShitakePost} 
        heading="Shitake: The Mushroom That Does It All—Flavor, Health, and More!" 
    />
</Link>
<Link to="/turkey-tail">
    <BlogPost 
        image={assets.TurkeyTail} 
        name="Turkey Tail" 
        description={Posts.TurkeyTailPost} 
        heading="Turkey Tail: Nature's Immune System Ally" 
    />
</Link>
<Link to="/yamabushitake">
    <BlogPost 
        image={assets.Yamabushitake} 
        name="Yamabushitake" 
        description={Posts.YamabushitakePost} 
        heading="Yamabushitake: A Journey into Cognitive Health and Healing" 
    />
</Link>

                

            </div>
        </div>
    )

}