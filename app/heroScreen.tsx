import Link from "next/link";

export function HeroScreen() {
    return <main className="hero-screen">
        <div className="box">
            <h1>MATH EXTENSON</h1>
            <p>Bienvenue sur Math Extension - votre destination ultime pour maîtriser les concepts mathématiques et réussir les examens compétitifs ! Plongez dans notre collection complète de leçons méticuleusement conçues pour affûter vos compétences et renforcer votre confiance. Que vous vous prépariez pour des compétitions exigeantes ou que vous cherchiez à exceller dans les évaluations académiques, Math Extension offre un trésor de ressources pour propulser votre parcours mathématique. Rejoignez-nous dans cette aventure passionnante et débloquez les secrets de la réussite mathématique !</p>
        </div>
        <div className="btns">
            
            <Link href={"/signup"}><button>Sign Up</button></Link>
            <Link href={"/signin"}><button>Sign In</button></Link>

        </div>
    </main>
}


