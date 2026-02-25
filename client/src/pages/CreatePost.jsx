import React, {useState} from 'react'
import {useAuth} from "@clerk/clerk-react";
import {createPost} from "../api/posts.js";
import {useNavigate} from "react-router";

const CreatePost = ({onPostCreated}) => {
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {getToken} = useAuth()
    const navigate = useNavigate()
    const submit = async () => {
        if (isLoading || !content.trim()) return;
        
        try {
            setIsLoading(true)
            const token = await getToken()
            await createPost({content}, token)
            setContent("")
            if (onPostCreated){
                onPostCreated()
            }
            navigate('/')
        } catch (error) {
            console.error("Error creando post:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <textarea
            value={content}
            onChange={e=>setContent(e.target.value)}
            placeholder="¿Qué está pasando?"/>
            <button onClick={submit} disabled={isLoading || !content.trim()}>{isLoading ? "Publicando..." : "Publicar"}</button>
        </div>
    )
}
export default CreatePost
