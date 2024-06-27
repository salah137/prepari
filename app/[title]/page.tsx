"use client"
import { useEffect, useState } from "react"
import { FaFilePdf } from "react-icons/fa"
import ReactPlayer from "react-player"
import dynamic from 'next/dynamic'
import "./style.css"
import { useParams } from "next/navigation"
import { getDoc, doc, getFirestore } from "firebase/firestore"
import firebase_app from "../firebase-config"
import logo from "../assets/logo.png"
import Image from "next/image"

export default function page() {
    const [isClient, setIsClient] = useState(false)
    const params = useParams<{ title: string }>()
    const db = getFirestore(firebase_app)
    const [vid, setVid] = useState<any>()
    useEffect(() => {

        setIsClient(true)

    }, [])

    useEffect(
        () => {
            getDoc(doc(db, "video", `${params.title}`)).then(
                snap => {
                    setVid(snap.data())
                    console.log(snap.data());
                    
                }
            );

        },[]
    )

    return <div className="all">
    <header className="main-header">
        <Image src={logo} width={200} height={200} alt="logo" />
    </header><main>
        {isClient && vid ? <div className="watching">
            <div className="vidd">
                <ReactPlayer
                    width="100vw"
                    height="60vh"
                    url={vid["video"]}
                    controls={true}
                    light={false}
                    pip={true}
                />
            </div>
            <h1>{vid["title"]}</h1>
            {
               vid["pdf"] &&            <a target="_blank" href={vid["pdf"]} rel="noopener noreferrer">
                            <div className="files">
                
                                <FaFilePdf />
                                <h3>Check our docs</h3>
                            </div></a>
            }
        </div>
            : <></>
        }</main></div>
}