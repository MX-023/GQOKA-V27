import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Erreur : " + error.message);
    } else {
      setMessage("Connexion réussie !");
      // Redirection automatique après 1s
      setTimeout(() => {
        router.push("/wardrobe");
      }, 1000);
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            margin: "5px",
            width: "250px",
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Mot de passe"
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
          Se connecter
        </button>
      </form>

      {message && (
        <p style={{ color: message.startsWith("Erreur") ? "red" : "green" }}>
          {message}
        </p>
      )}

      <p>
        <a href="/reset-password" style={{ color: "blue" }}>
          Mot de passe oublié ?
        </a>
      </p>
    </div>
  );
}

