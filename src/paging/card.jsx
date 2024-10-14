import "../paging/card.css"
export default function Card({ post }) {
    return (<>
        <div className="top">
            <div className="no">{post.id}</div>
            <h3>{post.title}</h3>
        </div>
        <p>{post.body}</p>
    </>)
}