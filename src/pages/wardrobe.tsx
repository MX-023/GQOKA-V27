import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AddClothingItem from "../components/AddClothingItem";

export default function WardrobePage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("wardrobe_items")
        .select("*");
      if (!error && data) setItems(data);
    })();
  }, []);

  return (
    <div className="page">
      <h1>Ma garde-robe</h1>
      <AddClothingItem />
      <div style={{ marginTop: 24 }}>
        {items.map((item) => (
          <div key={item.id} style={{ marginBottom: 12 }}>
            <img
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/wardrobe-images/${item.image_path}`}
              alt={item.title}
              width="120"
            />
            <div>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

