import express from "express"
import {ENV} from "./config/env.js"
import {connectDB} from "./db/db.js";

const app = express()

app.use(express.json())
app.get('/', (req, res) => {
    res.send("Connected")
})
connectDB()
app.listen(ENV.PORT, ()=> {
    console.log("Server started on PORT:", ENV.PORT);
})