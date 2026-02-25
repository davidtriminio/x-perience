import {authenticateRequest} from "@clerk/express";

const requireAuth = (req, res, next) => {
    try {
        if (!req) throw  new Error("Request no definido.")
        const {userId, sessionId} = authenticateRequest(req)
        if (!userId)return res.status(401).json({error: 'No autorizado. Usuario Inválido.'})
        req.user = {userId, sessionId}
        next();
    } catch (e) {
        console.log("Error en autenticación:", e)
        res.status(401).json({error: "No autorizado."})
    }
}

export default requireAuth;