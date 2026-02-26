const requireAuth = async (req, res, next) => {
    try {
        const {userId, sessionId} = await req.auth()
        if (!userId) return res.status(401).json({error: 'No autorizado. Usuario Inválido.'})
        req.user = {userId, sessionId}
        next();
    } catch (e) {
        console.log("Error en autenticación:", e)
        res.status(401).json({error: "No autorizado."})
    }
}

export default requireAuth;