"use client"
import { Firestore, collection, doc, getDoc, getFirestore, getDocs, query, DocumentData, } from "firebase/firestore"
import Image from "next/image"
import { SetStateAction, useEffect, useState } from "react"
import firebase_app from "../firebase-config"
import { useRouter } from "next/navigation"

export default function page() {
    const [user, setUser] = useState<any>()
    const router = useRouter()
    const [videos, setVideos] = useState<any>([])


    useEffect(
        () => {
            (async () => {
                const db = getFirestore(firebase_app);
                const querySnapshot = await getDoc(doc(db, "users", `${localStorage.getItem("uuid")}`));
                setUser(querySnapshot.data())

                const queryi = query(collection(db, 'video'),)
                const docs = await getDocs(queryi)
                let ds: ((prevState: never[]) => never[]) | DocumentData[] = []
                docs.forEach(
                    (e) => {
                        e.id
                        let { image, pdf, video } = e.data()
                        ds.push(
                            {
                                image, pdf, video, title: e.id
                            }
                        )
                    }
                )

                setVideos(ds)
                console.log(ds);


            })()
        }, []
    )

    return <main>
        <div className="vids">
            {
                videos.map(
                    (e: any) => {
                        return <div className="video" onClick={
                            () => {
                                if (!user.payed) {
                                    router.push("/payout")
                                } else {
                                    router.push(e["title"])
                                }
                            }
                        }>
                            <Image className="img" src={e["image"]} width={300} height={300} alt={""}></Image>
                            <h2>{e["title"]}</h2>
                        </div>

                    }
                )
            }        </div>
    </main>
}