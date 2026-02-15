import mongoose from "mongoose"
import { ENV } from "../config/env"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI)
        console.log("Mongo DB Connected Successfully", conn.connection.host);
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        process.exit(1)
    }
}