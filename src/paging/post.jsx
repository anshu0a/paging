import "../paging/post.css"
import Card from "../paging/card.jsx"
export default function Post({posts , loading}){
    if(loading){
        return <h2>Loading . . .</h2>
    }else{
        return ( <div className="posts">
            {posts.map(post=>(<div key={post.id} className="post"><Card  post={post}/></div>))}
                </div> )}
}