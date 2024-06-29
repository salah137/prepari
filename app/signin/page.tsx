"use client"
import { useState } from "react"
import { FaLock, FaLockOpen } from "react-icons/fa"
import firebase_app from "../firebase-config"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import writing from "../assets/writing.jpeg"
import logo from "../assets/logo.png"
import Image from "next/image"
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
   
    return <div className="all-auth">
    <div className="imag">
        <Image src={writing} alt="image" className="big-img" />
    </div>
    <main className="form">
        <Image src={logo} width={200} height={200} alt="logo" />

        <h1>accéder à votre compte</h1>
        <input type="email" placeholder="email" onChange={(e) => {
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
            </span>
        </div>
        <button onClick={signIn}>
            Login
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

        <h2>
            you don't have an account <Link href={"/signup"}>Sign Up</Link>
        </h2>

    </main>
</div>
}
