import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "The username is required"],
        unique: [true, "The username is already in use"],
        min: [3, "Too few characters"],
        max: [15, "Too many characters"],
    },
    email: {
        type: String,
        required: [true, "The email is required"],
        unique: [true, "The email is already in use"],
    },
    firstName: {type: String, required: true, default: ""},
    lastName: {type: String, default: ""},
    level: {type: Number, min: 0, default: 0},
    xp: {type: Number, min: 0, default: 0},
    image: {type: String, default: ""},
    clerkId: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

export const User = mongoose.model('User', userSchema)