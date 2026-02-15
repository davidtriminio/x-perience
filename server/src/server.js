import express from "express"
import {ENV} from "./config/env.js"
import { connectDB } from "./db/db.js"
import authRoutes from "./routes/auth.routes.js";

const app = express()

// Connect to MongoDB
connectDB()

app.use(express.json()) //To parse Json Request bodies

// Define API Routes
app.get('/', (req, res) => {
    res.send("Connected")
})

app.use('/auth', authRoutes)

// Start server on port
app.listen(ENV.PORT, ()=> {
    console.log("Server started on PORT:", ENV.PORT);
})