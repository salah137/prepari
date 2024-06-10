import Link from "next/link";

export function HeroScreen() {
    return <main className="hero-screen">
        <div className="box">
            <h1>MATH EXTENSON</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi nemo, veritatis fugit tenetur, explicabo dolores veniam exercitationem consectetur quibusdam quo praesentium adipisci sunt qui perferendis eum odio ipsum. Quibusdam, laudantium!</p>
        </div>
        <div className="btns">
            
            <Link href={"/signup"}><button>Login</button></Link>
            <Link href={"/signin"}><button>Sign In</button></Link>

        </div>
    </main>
}


