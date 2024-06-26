import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import logo from "./assets/logo.png"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "prepari",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <header>
      <div className="first-x"></div>
          <Image src={logo} alt={""} width={120} height={120}></Image>
        </header>
        {children}
      </body>
    </html>
  );
}
