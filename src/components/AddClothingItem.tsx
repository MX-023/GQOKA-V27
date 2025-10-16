import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Camera, Image as Gallery } from "lucide-react";

export default function AddClothingItem({ onUpload }: { onUpload: () => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMessage("Veuillez sélectionner une image.");

    try {
      setLoading(true);
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("Utilisateur non connecté.");

      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("wardrobe-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("wardrobe-images")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase.from("wardrobe").insert([
        {
          name,
          category,
          image_url: imageUrl,
          user_id: user.id,
        },
      ]);

      if (insertError) throw insertError;

      setMessage("✅ Vêtement ajouté !");
      setName("");
      setCategory("");
      setFile(null);
      setPreview(null);
      onUpload();
    } catch (error: any) {
      console.error(error);
      setMessage("Erreur : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "40px", padding: "20px", textAlign: "center" }}>
      <h3 style={{ marginBottom: "15px" }}>Ajouter un vêtement</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du vêtement"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            margin: "5px",
            width: "250px",
          }}
        />
        <br />

        {/* 📷 Boutons Caméra + Bibliothèque */}
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <label
            htmlFor="cameraUpload"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Camera size={18} /> Caméra
          </label>

          <label
            htmlFor="galleryUpload"
            style={{
              backgroundColor: "#444",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Gallery size={18} /> Bibliothèque
          </label>

          {/* Champs masqués */}
          <input
            id="cameraUpload"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <input
            id="galleryUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Prévisualisation */}
        {preview && (
          <div style={{ marginTop: "20px" }}>
            <img
              src={preview}
              alt="Aperçu"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        )}

        <br />

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#008000",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          {loading ? "Ajout en cours..." : "Valider"}
        </button>
      </form>

      {message && (
        <p style={{ color: message.includes("Erreur") ? "red" : "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}
