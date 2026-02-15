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
    firstName: {type: String, required: true},
    lastName: {type: String},
    level: {type: Number, min: 0},
    xp: {type: Number, min: 0},
    imageUrl: {type: String},
}, {timestamps: true});

export const User = mongoose.model('User', userSchema)