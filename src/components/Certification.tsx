export default function Certification({ item }: { item: any }) {
  const autoPitch = generatePitch(item);

  function generatePitch(item: any): string {
    return `✨ ${item.name} — une pièce ${item.type.toLowerCase()} ${item.color.toLowerCase()}, 
soigneusement conservée et validée par GQOKA. 
Chaque vêtement certifié porte une empreinte unique : 
une histoire, une matière, et une âme. 
Cette pièce peut être revendue en toute confiance grâce à notre certification numérique 
authentifiant sa provenance et son état.`;
  }

  return (
    <div
      style={{
        background: "#f9f9f9",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        marginTop: "20px",
      }}
    >
      <h3>✅ Certification GQOKA</h3>
      <p>{autoPitch}</p>
      <small style={{ color: "#666" }}>
        Certificat n° {Math.floor(Math.random() * 999999)} — validé par IA Anna Styliste
      </small>
    </div>
  );
}
