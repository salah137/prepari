"use client"
import { useState } from "react"
import { FaLock, FaLockOpen } from "react-icons/fa"
import firebase_app from "../firebase-config"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"

export default function page() {
    "use client"

    const [seePassword, setPasswordObs] = useState(false)
    const [seeConfPassword, setConfPasswordObs] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [showErr, setErr] = useState("")

    const auth = getAuth(firebase_app)
    const router = useRouter()

    const signIn = () => {
        if (password && email) {
            signInWithEmailAndPassword(
                auth,
                email,
                password
            ).then(
                u => {
                    console.log(u.user);
                    localStorage.setItem("uuid", `${u.user.email}`)
                    router.push("/main")
                }
            ).catch(
                function (e) {
                    setErr(`${e}`.substring(`${e}`.indexOf("/") + 1, `${e}`.length - 2))

                }
            )
        }
        else {
            setErr("verify your infos")
        }
    }
    return <main className="form">
        <h1>Get in our platforme</h1>
        <input placeholder="email" onChange={(e) => {
            setEmail(e.target.value)
        }} ></input>
        <div className="password">
            <input type={seePassword ? "text" : "password"} placeholder="your password" onChange={(e) => {
                setPassword(e.target.value)
            }} />
            <span className="pass-icon" onClick={() => {
                setPasswordObs(
                    (pass) => !pass
                )
            }}>
                {
                    seePassword ?
                        <FaLockOpen />
                        :
                        <FaLock />
                }
            </span></div>
        <button onClick={signIn}>
            Sign In
        </button>
        {
            showErr ? <div style={
                {
                    color: "red",
                    textAlign: "center"
                }
            }>
                {showErr}
            </div> : <></>
        }
    </main>
}