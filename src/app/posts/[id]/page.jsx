
import "./index.css"
import NotFound from "../../notfound/NotFound";
import { ReturnBackButton } from "../../notfound/NotFound";
import fetchSingleProduct from "../../fetcher/fetchSingleProduct";



export default async function PostPage (params) {
    
    const { id } = params.params;
    const fetchItemType = "posts"
    var post;


    post = await fetchSingleProduct({fetchItemType, id})

    
    
    if(!post) return <NotFound page="posts"/>
    return(
        <div className="post">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <p>
                Tags:{" "}
                {post.tags.map((tag, index) => (
                <span className="post-tag"key={index}>#{tag}</span>
                ))}{" "}
            </p>
            <div>Views: {post.views}</div>
            <ReturnBackButton destination={"posts"} />

            
        </div>
    )

}

