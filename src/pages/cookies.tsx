export default function CookiesPage() {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>🍪 Politique de cookies</h1>
      <p>
        Ce site utilise des cookies afin d’améliorer votre expérience et de
        mesurer l’audience. Les cookies nous permettent de personnaliser le
        contenu et d’analyser l’utilisation du site de manière anonyme.
      </p>

      <h2>1. Types de cookies utilisés</h2>
      <ul>
        <li>
          <strong>Cookies essentiels :</strong> nécessaires au fonctionnement du
          site (authentification, sécurité, préférences).
        </li>
        <li>
          <strong>Cookies analytiques :</strong> utilisés pour mesurer les
          visites et optimiser les fonctionnalités.
        </li>
      </ul>

      <h2>2. Consentement</h2>
      <p>
        Lors de votre première visite, une bannière vous informe de
        l’utilisation de cookies. Vous pouvez les accepter ou les refuser à tout
        moment via les paramètres de votre navigateur.
      </p>

      <h2>3. Données personnelles</h2>
      <p>
        GQOKA respecte le Règlement Général sur la Protection des Données
        (RGPD). Les données collectées ne sont jamais revendues et sont stockées
        sur des serveurs européens conformes aux normes de sécurité en vigueur.
      </p>

      <p style={{ marginTop: "30px" }}>
        Pour toute question, contactez :{" "}
        <a href="mailto:privacy@gqoka.com">privacy@gqoka.com</a>
      </p>
    </div>
  );
}
