import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    authorId: {type: String, required: true},
    authorName: {type: String},
    content: {type: String, required: true, maxLength: 500}
}, {timestamps: true})

export const Post = mongoose.model("Post", postSchema)