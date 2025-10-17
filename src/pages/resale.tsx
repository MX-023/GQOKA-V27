import Head from "next/head";
import Navbar from "@/components/Navbar";
import WardrobeItem from "@/components/WardrobeItem";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";

type Item = {
  id: string;
  title?: string | null;
  category?: string | null;
  color?: string | null;
  image_url: string;
};

export default function ResalePage() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("wardrobe_items")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      setItems(data || []);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Revente — GQOKA</title>
      </Head>
      <Navbar />
      <main className="container" style={{ paddingTop: 24 }}>
        <h2 style={{ margin: "8px 0 16px" }}>Revente</h2>
        <div className="items">
          {items.map((it) => (
            <WardrobeItem key={it.id} {...it} />
          ))}
        </div>
      </main>
    </>
  );
}
