import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AddClothingItem from "../components/AddClothingItem";

export default function WardrobePage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("wardrobe_items")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setItems(data);
    })();
  }, []);

  return (
    <div className="page">
      <h1>Ma garde-robe</h1>
      <AddClothingItem />
      <div className="items">
        {items.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image_url} alt={item.title || "Vêtement"} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

