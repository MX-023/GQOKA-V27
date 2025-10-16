import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const clothingTypes = [
    "T-shirt",
    "Pantalon",
    "Chemise",
    "Robe",
    "Veste",
    "Pull",
    "Short",
    "Jupe",
    "Manteau",
    "Chaussures",
  ];

  const colors = [
    "Noir",
    "Blanc",
    "Bleu",
    "Rouge",
    "Vert",
    "Gris",
    "Beige",
    "Rose",
    "Marron",
    "Jaune",
  ];

  async function handleUpload() {
    if (!file) {
      setMessage("Aucun fichier sélectionné.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("Utilisateur non connecté.");
        return;
      }

      // Dossier personnel basé sur l’UID utilisateur
      const filePath = `${user.id}/${Date.now()}-${file.name}`;

      // Upload du fichier dans le bucket Supabase
      const { error: uploadError } = await supabase.storage
        .from("wardrobe-images")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Génère l’URL publique
      const { data } = supabase.storage
        .from("wardrobe-images")
        .getPublicUrl(filePath);

      const imageUrl = data.publicUrl;

      // Enregistre dans la table "wardrobe"
      const { error: insertError } = await supabase
        .from("wardrobe")
        .insert([
          {
            user_id: user.id,
            name,
            type,
            color,
            image_url: imageUrl,
          },
        ]);

      if (insertError) throw insertError;

      setMessage("✅ Vêtement ajouté avec succès !");
      setFile(null);
      setName("");
      setType("");
      setColor("");
    } catch (err: any) {
      setMessage("Erreur : " + err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h3>Ajouter un vêtement</h3>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        style={{ margin: "10px" }}
      />

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Nom du vêtement"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            margin: "5px",
            width: "250px",
          }}
        />

        <input
          list="clothingTypes"
          placeholder="Type de vêtement"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            margin: "5px",
            width: "250px",
          }}
        />
        <datalist id="clothingTypes">
          {clothingTypes.map((t) => (
            <option key={t} value={t} />
          ))}
        </datalist>

        <input
          list="colors"
          placeholder="Couleur"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            margin: "5px",
            width: "250px",
          }}
        />
        <datalist id="colors">
          {colors.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          borderRadius: "8px",
          background: uploading ? "gray" : "black",
          color: "white",
          cursor: uploading ? "not-allowed" : "pointer",
        }}
      >
        {uploading ? "Envoi en cours..." : "Uploader"}
      </button>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}
