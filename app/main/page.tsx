"use client"
import { Firestore, collection, doc, getDoc, getFirestore, getDocs, query, DocumentData, } from "firebase/firestore"
import Image from "next/image"
import { SetStateAction, useEffect, useState } from "react"
import firebase_app from "../firebase-config"
import { useRouter } from "next/navigation"
import ww from "../assets/writing.jpeg"
import logo from "../assets/logo.png"
import { orderBy } from "firebase/firestore"

export default function page() {
    const [user, setUser] = useState<any>({
        payed: true
    })
    const router = useRouter()
    const [videos, setVideos] = useState<any>([])


    useEffect(
        () => {
            (async () => {
                const db = getFirestore(firebase_app);
                const querySnapshot = await getDoc(doc(db, "users", `${localStorage.getItem("uuid")}`));
                setUser(querySnapshot.data())

                const queryi = query(collection(db, 'video'),orderBy('timestampField'))
                const docs = await getDocs(queryi)
                let ds: ((prevState: never[]) => never[]) | DocumentData[] = []
                docs.forEach(
                    (e) => {
                        e.id
                        let { image, pdf, video, title, free } = e.data()
                        ds.push(
                            {
                                image, pdf, video, title, id: e.id, free
                            }
                        )
                    }
                )

                setVideos(ds)
                console.log(ds);


            })()
        }, []
    )
    return <div className="all">
        <header className="main-header">
            <Image src={logo} width={200} height={200} alt="logo" />
        </header>
        <main>
            <div className="vids">
                {
                    videos.map(
                        (e: any) => {
                            return <div className="video" onClick={
                                () => {
                                    console.log(e.free);

                                    if (!user.payed && !e.free) {
                                        router.push("/payout")
                                    } else {
                                        router.push(e["id"])
                                    }
                                }
                            }>
                                <Image className="imge" src={e["image"]} alt={""}></Image>
                                <h2>{e["title"]}</h2>
                                {e.free && <h1 className="free">free</h1>}
                            </div>

                        }
                    )
                }        </div>
        </main>
    </div>
}