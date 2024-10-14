import { useState, useEffect } from 'react';
import axios from 'axios';

import '../paging/paging.css'
import Post from '../paging/post.jsx'

export default function Paging() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [currentPage, setCurrent] = useState(1);
    const [postPerPage, setPostPerPage] = useState(12);


    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)

            try {
                const result = await axios.get("https://jsonplaceholder.typicode.com/posts")
                setPosts(result.data)
                setLoading(false);
            } catch (err) {
                setError(err.message)
                return
            }

        }
        fetchPost();
    }, [])
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)
    const totalPages = Math.ceil(posts.length / postPerPage);

    const pre_for = function (ev) {
        if (ev.target.innerText === "Previous" && currentPage > 1) {
            setCurrent(currentPage - 1)
        } else if (ev.target.innerText === "Next" && currentPage < totalPages) {
            setCurrent(currentPage + 1)
        }
        toTop()
    }
    const toTop = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (error) {
        return <h1>{error}</h1>
    } else {
        return (<div className="paging">
            <h1>Posts ({posts.length})</h1>

            <Post posts={currentPost} loading={loading} />
            {
                loading ? "" :
                    <div className='pre_for'>
                        <button disabled={currentPage === 1} onClick={pre_for} >Previous</button>
                        <span title="Scroll to top" className='showPage' onClick={toTop} >{currentPage} / {totalPages}</span>
                        <button onClick={pre_for} disabled={currentPage === totalPages} >Next</button>
                    </div>
            }
        </div>
        )
    }
}