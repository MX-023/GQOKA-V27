import { useEffect } from "react";

export default function AnnaBotpress() {
  useEffect(() => {
    const s1 = document.createElement("script");
    s1.src = process.env.NEXT_PUBLIC_BOTPRESS_SCRIPT1!;
    document.body.appendChild(s1);

    const s2 = document.createElement("script");
    s2.src = process.env.NEXT_PUBLIC_BOTPRESS_SCRIPT2!;
    s2.defer = true;
    document.body.appendChild(s2);

    return () => {
      document.body.removeChild(s1);
      document.body.removeChild(s2);
    };
  }, []);
  return null;
}
