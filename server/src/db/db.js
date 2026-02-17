import mongoose from "mongoose"
import {ENV} from "../config/env.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI)
        console.log('MongoDB Connected successfully to host:', conn.connection.host)
    }catch (error) {
        console.error('Failed to connect to MongoDB.')
        process.exit(1)
    }
}