import express from "express"
import {ENV} from "./config/env.js"
import {connectDB} from "./db/db.js";
import {clerkMiddleware} from "@clerk/express";
import {serve} from "inngest/express"
import {functions, inngest} from "./config/inngest.js";

const app = express()

app.use(express.json())
app.use(clerkMiddleware())
app.use('/', serve({client: inngest, functions}))

app.get('/', (req, res) => {
    res.send("Connected")
})

const startServer = async () => {
    try {
        await connectDB()
        if (ENV.NODE_ENV !== "production") {
            app.listen(ENV.PORT, () => {
                console.log("Server started on Port: ", ENV.PORT)
            })
        }
    } catch (error) {
        console.log("Error starting the server:", error)
        process.exit(1)
    }
}

startServer()

export  default app;