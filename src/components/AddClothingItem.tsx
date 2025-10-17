import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Camera, Image as Gallery } from "lucide-react";

export default function AddClothingItem() {
  const [loading, setLoading] = useState(false);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const { data, error } = await supabase.storage
      .from("wardrobe-images")
      .upload(`items/${Date.now()}_${file.name}`, file);

    if (error) alert("Erreur : " + error.message);
    else alert("Image uploadée : " + data.path);

    setLoading(false);
  }

  return (
    <div style={{ display: "flex", gap: 12 }}>
      <label className="btn" htmlFor="camera">
        <Camera size={20} /> Caméra
      </label>
      <input
        id="camera"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
      <label className="btn" htmlFor="library">
        <Gallery size={20} /> Bibliothèque
      </label>
      <input
        id="library"
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
      {loading && <span>Chargement...</span>}
    </div>
  );
}

