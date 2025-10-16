import { useEffect, useState } from "react";

type Weather = { name: string; temp: number; desc: string } | null;

export default function WeatherWidget() {
  const [data, setData] = useState<Weather>(null);
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  useEffect(() => {
    if (!apiKey) return;
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric&lang=fr`;
        const res = await fetch(url);
        const json = await res.json();
        setData({
          name: json.name,
          temp: Math.round(json.main?.temp),
          desc: json.weather?.[0]?.description ?? ""
        });
      },
      () => setData(null),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [apiKey]);

  if (!data) return <div className="small">Météo indisponible</div>;
  return (
    <div className="small">
      {data.name} · {data.temp}°C · {data.desc}
    </div>
  );
}
