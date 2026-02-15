import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: 'Unauthorized: No token'})
    }

    const token = authHeader.split(" ")[1]
    //Check token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error){
        console.log("Error with Token: ", error)
        return  res.status(403).json({message: "Invalid or expired token."})
    }
}