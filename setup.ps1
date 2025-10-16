Write-Host "=== 🚀 GQOKA V27 — Installation & déploiement automatique ===" -ForegroundColor Cyan

# Étape 1 : Installation des dépendances
Write-Host "`n[1/5] Installation des dépendances..." -ForegroundColor Yellow
npm install next react react-dom typescript lucide-react framer-motion @supabase/supabase-js dotenv @types/react @types/node @headlessui/react clsx tailwindcss postcss autoprefixer

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur pendant npm install" -ForegroundColor Red
    exit 1
}

# Étape 2 : Build de l’application
Write-Host "`n[2/5] Build du projet..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build échoué" -ForegroundColor Red
    exit 1
}

# Étape 3 : Commit & push GitHub
Write-Host "`n[3/5] Push GitHub..." -ForegroundColor Yellow
git add .
git commit -m "Auto-setup GQOKA V27 — Build stable"
git branch -M main
git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Aucun changement à pousser (ou erreur git). Continuité." -ForegroundColor DarkYellow
}

# Étape 4 : Lancement du serveur local
Write-Host "`n[4/5] Lancement serveur local..." -ForegroundColor Yellow
Start-Process "http://localhost:3000"
npm run dev

# Étape 5 : Confirmation
Write-Host "`n✅ GQOKA V27 prêt. Accessible sur http://localhost:3000" -ForegroundColor Green
Write-Host "🌀 Si connecté à Vercel, le déploiement se lancera automatiquement." -ForegroundColor DarkCyan
