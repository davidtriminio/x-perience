import {User} from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

// Register a new User
export const register = async (req, res) => {
    try {
        const {username, email, firstName, lastName, password} = req.body

        const existingUser = await User.findOne({email})

        // Check if the user already exist
        if (existingUser) return res.status(400).json({message: "User already exist."})

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10)

        //     Create the user
        await User.create({username, email, firstName, lastName, password: hashedPassword})
        res.status(201).json({message: "User registered successfully."})
    } catch (error) {
        res.status(500).json({message: "Server error", error})
    }
}

// User Login
export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        // Verify if the user exist
        const user = await User.findOne({email})
        if (!user) return res.status(404).json({message: "User not found"})

        // Verify if the email and password match     
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({message: "Invalid Credentials"})

        // Generate JWT token
        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )
        res.json({token});
    } catch (error) {
        res.status(500).json({message: "Server error: ", error})
    }
}