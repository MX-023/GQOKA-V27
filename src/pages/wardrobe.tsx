import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import AddClothingItem from "../components/AddClothingItem";

export default function WardrobePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("wardrobe")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setItems(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Ma garde-robe</h1>

      {/* --- Composant d’ajout --- */}
      <AddClothingItem onUpload={fetchItems} />

      {loading ? (
        <p>Chargement...</p>
      ) : items.length === 0 ? (
        <p style={{ marginTop: "20px" }}>Aucun vêtement ajouté pour l’instant.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={item.image_url}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h3>{item.name}</h3>
              <p style={{ color: "#777" }}>{item.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

