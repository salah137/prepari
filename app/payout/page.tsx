"use client"

import "./style.css"
import Image from "next/image"
import cih from "../assets/logo-cih.png"
import firebase_app from "../firebase-config"
import { collection, doc, getDoc, getFirestore, setDoc, deleteDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import logo from "../assets/logo.png"
import wafa from "../assets/wafa.png"
export default function page() {
    "use client"

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
    return <div className="all">
        <header className="main-header">
            <Image src={logo} width={200} height={200} alt="logo" />
        </header><main className="payout">
            <div className="cih">
                <Image src={cih} alt="cih" width={300} height={150} />
                <Image src={wafa} alt="cih" width={300} height={150} />
                
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
                        5810245211017400
                    </span>
                    and contact me at
                    <span className="m-rib">
                        +212 614107997
                    </span>
                    and now your account wait 24h to be verified
                    Or use <span className="m-rib"> 
                        wafa cash
                    </span> and contact <span className="m-rib">
                        +212 614107997
                    </span>
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
        </main></div>
}