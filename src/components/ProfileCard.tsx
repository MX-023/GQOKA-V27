import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function ProfileCard() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setEmail(user?.email ?? null);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    location.href = "/";
  }

  return (
    <div className="card" style={{ display: "grid", gap: 8 }}>
      <strong>Profil</strong>
      <div style={{ color: "#bbb" }}>
        Email : {email || "non connecté"}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <a className="btn" href="/login">Se connecter</a>
        <button className="btn" onClick={signOut}>Se déconnecter</button>
      </div>
    </div>
  );
}
