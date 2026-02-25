import express from "express";
import {User} from "../models/user.model.js";
import {Post} from "../models/post.model.js";
import calculateLevel from "../utils/calculate-level.js";
import requireAuth from "../middleware/clerk-auth.js";

const router = express.Router()

router.post('/', requireAuth, async (req, res) => {
    try {
        const {content} = req.body
        const userId = req.user.userId

        const user = await User.findOne({clerkId: userId})
        if(!user) return res.status(404).json({error: "User not found."})
        
        const post = await Post.create({
            authorId: userId,
            authorName: user.username,
            content
        });
        
        const XP_PER_POST = 20
        user.xp += XP_PER_POST
        
        user.level = calculateLevel(user.xp)
        
        await user.save()
        res.json(post)
    } catch (e) {
        res.status(500).json({errors: "Error creando posts"})
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1})
        res.json(posts)
    }catch (e) {
        res.status(500).json({error: "Error cargando posts"})
    }
})

export default router;