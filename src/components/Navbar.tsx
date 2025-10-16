import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="nav">
      <div><b>GQOKA</b></div>
      <div style={{display:"flex",gap:12}}>
        <Link href="/"><span className="link">Accueil</span></Link>
        <Link href="/wardrobe"><span className="link">Garde-robe</span></Link>
        <Link href="/login"><button className="btn">Se connecter</button></Link>
      </div>
    </nav>
  );
}
