import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert("Erreur : " + error.message);
    else alert("Compte créé avec succès !");
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Inscription</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Créer un compte</button>
      </form>
    </main>
  );
}

