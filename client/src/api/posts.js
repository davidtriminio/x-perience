import axios from "axios"
import {ENV} from "../config/env.js";

const API = `${ENV.API_URL}/api/posts`

export const getPosts = () => axios.get(API)

export const createPost = (data, token) => axios.post(API, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})