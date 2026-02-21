import React, {useState} from 'react'
import {useSignIn, useSignUp} from "@clerk/clerk-react";
import {useNavigate} from "react-router";
import toast from "react-hot-toast";

import "../styles/auth-styles.css"
import logo from "../assets/xperience-logo.png"
import {Chrome} from "lucide-react";

const AuthPage = () => {
    const {signIn, isLoaded: signInLoaded, setActive} = useSignIn();
    const {signUp, isLoaded: signUpLoaded} = useSignUp();
    const navigate = useNavigate()

    const [isRegister, setIsRegister] = useState(false)
    const [identifier, setIdentifier] = useState("")
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [pendingVerification, setPendingVerification] = useState(false)
    const [code, setCode] = useState("")


    if (!signInLoaded || !signUpLoaded) return null

    // Login Normal

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const result = await signIn.create({
                identifier, password
            })

            if (result.status === "complete") {
                await setActive({session: result.createdSessionId})
            }

            navigate('/')
        } catch (err) {
            console.log("Login Error", err)
            setError(err.errors?.[0]?.message || "Usuario o contraseña incorrectos")
        }
        setLoading(false)
    }

    /*Registro Normal*/
    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            await signUp.create({
                emailAddress: email, username: userName, password
            })

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code"
            })

            setPendingVerification(true)

            toast.success("Revisa tu correo para verificar tu cuenta.")
            setLoading(false)
        } catch (err) {
            console.log("Register Error", err)
            setError(err?.errors[0]?.message || "Register failed")
            setLoading(false)
        }
    }

    // Google Auth (Login/Registro)
    const handleGoogleOAuth = async () => {
        try {
            await signIn.authenticateWithRedirect({
                strategy: "oauth_google", redirectUrl: "/oauth/callback", redirectUrlComplete: "/"
            })
        } catch (err) {
            console.error("Oauth Error:", err)
            setError("Google Sign-In Failed")
        }
    }

    const handleVerifyEmail = async (e) => {
        e.preventDefault()

        setLoading(true)
        setError("")

        try {
            const result = await signUp.attemptEmailAddressVerification({
                code
            })

            // Si se completa. Hace el login automático.
            if (result.status === "complete") {
                await setActive({
                    session: result.createdSessionId
                });

                toast.success("Correo verificado correctamente.")
                navigate("/")
            }
        } catch (err) {
            console.log("Verify Error: ", err)
            setError("Código inválido o expirado")
        }
        setLoading(false)
    }

    return (<div className="auth-container">
        <form className={`auth-card ${isRegister ? "register-mode" : "login-mode"}`}
              onSubmit={pendingVerification ? handleVerifyEmail : isRegister ? handleRegister : handleLogin}>
            {/*    Logo */}
            <img src={logo} alt="Logo" className="auth-logo"/>
            <h1>X-PERIENCE</h1>
            <p className="subtitle">
                {isRegister ? "Crear cuenta" : "Acceder al Portal"}
            </p>
            {/* /.subtitle */}
            {/*    Error */}
            {error && <span className="error">{error}</span>}
            {/* /.error */}

            {/*Verificación de Email*/}
            {pendingVerification ? (<>
                <input
                    type="text"
                    placeholder="Código de verificación"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />

                <button disabled={loading}>
                    {loading ? "VALIDANDO..." : "Confirmar código"}
                </button>

            </>) : (<>
                {/*    Register Fields*/}
                {isRegister && (<>
                    <input type="text"
                           placeholder="Username"
                           value={userName}
                           onChange={(e) => setUserName(e.target.value)}
                           required/>
                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>
                </>)}

                {/*    Login Fields*/}
                {!isRegister && (<>
                    <input type="text"
                           placeholder="Email o Username"
                           value={identifier}
                           onChange={(e) => setIdentifier(e.target.value)}
                           required
                    />
                </>)}

                {/*    Password*/}
                <input type="password"
                       placeholder="Clave de Seguridad"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required/>
            </>)}

            {/*    Button*/}
            {!pendingVerification && (
                <button disabled={loading}>
                    {loading ? "PROCESSING..." : isRegister ? "REGISTRAR" : "ENTRAR"}
                </button>
            )}

            {/*Google Button*/}

            {!pendingVerification && (
                <button
                    type="button"
                    className="oauth-google-btn" onClick={handleGoogleOAuth}
                    disabled={loading}>
                    <Chrome size={18}/>
                    <span>
                        {isRegister ? "Registrarse con Google" : "Entrar con Google"}
                    </span>
                </button>
            )}

            {/*    Switch*/}
            <div className="auth-switch">
                {isRegister ? (<>
                    ¿Ya tienes una cuenta?
                    <span onClick={() => setIsRegister(false)}>
                                {" "}Iniciar Sesión
                            </span>
                </>) : (<>
                    ¿Nuevo Aquí? {" "}
                    <span onClick={() => setIsRegister(true)}>Registrar</span>
                </>)}
            </div>
            {/* /.auth-switch */}

        </form>
    </div>)
}
export default AuthPage
