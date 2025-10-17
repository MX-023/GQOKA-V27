import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) alert("Erreur : " + error.message);
    else alert("Lien de réinitialisation envoyé !");
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Réinitialiser le mot de passe</h1>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Envoyer</button>
      </form>
    </main>
  );
}

           
