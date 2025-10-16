import Link from "next/link";

export default function Home() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      {/* ---- HERO ---- */}
      <section style={{ textAlign: "center", marginTop: "80px" }}>
        <h1>Découvre ton style avec Anna</h1>
        <p>
          Ajoute tes vêtements et reçois des idées de tenues selon la météo ou ton humeur.
        </p>
        <div style={{ marginTop: "30px" }}>
          <Link href="/signup">
            <button
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Créer un compte
            </button>
          </Link>

          <Link href="/wardrobe">
            <button
              style={{
                backgroundColor: "#f3f3f3",
                color: "black",
                padding: "10px 20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Voir ma garde-robe
            </button>
          </Link>
        </div>
      </section>

      {/* ---- PITCH ÉMOTIONNEL ---- */}
      <section
        style={{
          textAlign: "center",
          marginTop: "80px",
          lineHeight: "1.6",
          padding: "0 20px",
        }}
      >
        <h2>💫 Réinventer la mode avec conscience</h2>
        <p style={{ fontSize: "18px", maxWidth: "700px", margin: "auto" }}>
          GQOKA n’est pas une simple plateforme de vêtements.  
          C’est une démarche vers une mode plus durable, où chaque tenue a une histoire.  
          Grâce à Anna, ta styliste IA, tu apprends à redonner vie à ton dressing et à mieux consommer.
        </p>
      </section>

      {/* ---- FOOTER ---- */}
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          fontSize: "14px",
          color: "#555",
          marginTop: "60px",
        }}
      >
        <Link href="/cookies" style={{ color: "#555" }}>
          Cookies & Confidentialité
        </Link>
      </footer>
    </div>
  );
}
