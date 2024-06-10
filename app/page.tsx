"use client"
import { useEffect, useState } from "react";
import { HeroScreen } from "./heroScreen";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [uuid, setUuid] = useState<any>()

  useEffect(
    () => {
      setUuid(localStorage.getItem("uuid"))
    }
  )

  useEffect(
    () => {
      if (uuid) {
        router.push("/main")
      }
    }, []
  )
  return (
    <HeroScreen />
  );
}
