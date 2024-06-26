"use client"
import { useState } from "react"
import { FaLock, FaLockOpen } from "react-icons/fa"
import firebase_app from "../firebase-config"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import writing from "../assets/writing.jpeg"
import Image from "next/image"
import logo from "../assets/logo.png"
import Link from "next/link"

export default function page() {
    const [seePassword, setPasswordObs] = useState(false)
    const [seeConfPassword, setConfPasswordObs] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [confPassword, confSetPassword] = useState('')
    const [showErr, setErr] = useState("")
    const auth = getAuth(firebase_app)
    const router = useRouter()

    const signUp = () => {
        if (password && confPassword && email && name && confPassword == password) {
            createUserWithEmailAndPassword(
                auth,
                email,
                password
            ).then(
                async u => {
                    const db = getFirestore(firebase_app)
                    console.log(u.user.uid);

                    let result = await setDoc(doc(db, "users", `${u.user.email}`), {
                        "payed": false,
                        "uuid": u.user.uid
                    }, {
                        merge: true,
                    });
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

            <h1>Créer un compte</h1>
            <input type="email" placeholder="email" onChange={(e) => {
                setEmail(e.target.value)
            }} ></input>
            <input type="text" placeholder="name" onChange={(e) => {
                setName(e.target.value)
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
            </div>                <div className="password">
                <input type={seeConfPassword ? "text" : "password"} placeholder="your password" onChange={(e) => {
                    confSetPassword(e.target.value)
                }} />
                <span className="pass-icon" onClick={() => {
                    setConfPasswordObs(
                        (pass) => !pass
                    )
                }}>
                    {
                        seeConfPassword ?
                            <FaLockOpen />
                            :
                            <FaLock />
                    }
                </span>
            </div>
            <button onClick={signUp}>
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
                you have an account <Link href={"/signin"}>Sign In</Link>
            </h2>

        </main>
    </div>
}