import React, {useEffect, useState} from 'react'
import {useAuth} from "@clerk/clerk-react";
import {getPosts} from "../api/posts.js";
import CreatePost from "./CreatePost.jsx";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const {getToken} = useAuth()

    useEffect(() => {
        loadPosts()
    }, []);

    const loadPosts = async () => {
        const res = await getPosts()
        console.log(res.data)
        setPosts(res.data)
    }
    
    return (
        <div>
            <CreatePost onPostCreated={loadPosts}/>
            <h2>Feed</h2>
            {posts.map(p =>(
                <div key={p._id}>
                    <strong>{p.authorName}</strong>
                    <p>{p.content}</p>
                    <small>{new Date(p.createdAt).toLocaleString()}</small>
                    <hr/>
                </div>
            ))}
        </div>
    )
}
export default HomePage
