import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ImageUpload() {
  const [uploading, setUploading] = useState(false);

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const { data, error } = await supabase.storage
      .from("wardrobe-images")
      .upload(`wardrobe/${Date.now()}-${file.name}`, file);

    setUploading(false);

    if (error) alert("Erreur : " + error.message);
    else alert("Image téléchargée avec succès !");
  }

  return (
    <div>
      <input type="file" onChange={uploadImage} accept="image/*" />
      {uploading && <p>Chargement...</p>}
    </div>
  );
}

