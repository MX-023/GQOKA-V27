import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Camera, Image as Gallery } from "lucide-react";

export default function AddClothingItem() {
  const [loading, setLoading] = useState(false);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const { data, error } = await supabase.storage
      .from("wardrobe-images")
      .upload(`wardrobe/${Date.now()}-${file.name}`, file);

    setLoading(false);

    if (error) {
      alert("Erreur lors du téléchargement : " + error.message);
    } else {
      console.log("Image uploadée :", data);
      alert("Image ajoutée à votre garde-robe !");
    }
  }

  return (
    <div className="add-item">
      <label htmlFor="file-upload" className="btn">
        <Camera /> Ajouter un vêtement
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
      {loading && <p style={{ color: "#aaa" }}>Téléchargement en cours...</p>}
    </div>
  );
}


