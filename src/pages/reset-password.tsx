import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Vérifie et restaure la session via le hash de l'URL
  useEffect(() => {
    async function handleRecovery() {
      const hash = window.location.hash;
      if (hash.includes("access_token")) {
        const params = new URLSearchParams(hash.replace("#", "?"));
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        // Restaure la session Supabase
        const { error } = await supabase.auth.setSession({
          access_token: access_token!,
          refresh_token: refresh_token!,
        });

        if (error) {
          console.error(error);
          setMessage("Erreur de session : " + error.message);
        }
        setLoading(false);
      } else {
        setMessage("Lien invalide ou expiré.");
        setLoading(false);
      }
    }

    handleRecovery();
  }, []);

  // Réinitialise le mot de passe
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage("Erreur : " + error.message);
    } else {
      setMessage("✅ Mot de passe réinitialisé avec succès !");
      setTimeout(() => router.push("/login"), 2500);
    }
  }

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Réinitialiser le mot de passe</h2>

      {message ? (
        <p style={{ color: message.startsWith("Erreur") ? "red" : "green" }}>
          {message}
        </p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "8px",
              margin: "5px",
              width: "250px",
            }}
          />
          <br />
          <button
            type="submit"
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Valider
          </button>
        </form>
      )}
    </div>
  );
}

           