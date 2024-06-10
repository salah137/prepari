"use client"

import "./style.css"
import Image from "next/image"
import cih from "../assets/logo-cih.png"
import firebase_app from "../firebase-config"
import { collection, doc, getDoc, getFirestore, setDoc, deleteDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function page() {
    const [user, setUser] = useState<any>()
    const db = getFirestore(firebase_app)
    const [rib, setRib] = useState<string>()
    const [ref, setRef] = useState<string | null>()
    const router = useRouter()
    useEffect(
        () => {
            (async () => {
                let r = collection(db, "users")
                const querySnapshot = await getDoc(doc(db, "users", `${localStorage.getItem("uuid")}`));
                setRef(localStorage.getItem("uuid"));

                setUser(querySnapshot.data())

            })()
        }, []
    )
    return <main className="payout">
        <div className="cih">
            <Image src={cih} alt="cih" width={300} height={150} />
            <h1>use CIH to pay</h1>
        </div>
        <div className="rib">
            <div className="y-rib">
                <h2> Give us your rib</h2>
                <input type="text" value={rib} onChange={
                    (e) => {
                        setRib(e.target.value)
                    }
                }></input>
            </div>

            <div className="txt">
                send money to this rib
                <span className="m-rib">
                    267 UYUYZY B17 7H1HQ1UH1H8
                </span>
                and now your account wait 24h to be verified
            </div>
            <button onClick={
                async () => {
                    if (rib) {
             
                        let dd = {
                            payed: false,
                            uuid: user.uuid,
                            rib: rib
                        }
                        await deleteDoc(doc(db, "users", `${ref}`))
                        let result = await setDoc(doc(db, "users", `${ref}`), dd, {
                            merge: true,
                        });
                        router.push("/main")
                    }
                }
            }>Done</button>

        </div>
    </main>
}