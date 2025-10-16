# DoaFácil Backend Setup Script

Write-Host "🚀 Configurando o backend do DoaFácil..." -ForegroundColor Green

# Verificar se o Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se o npm está instalado
try {
    $npmVersion = npm --version
    Write-Host "✅ npm encontrado: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm não encontrado. Por favor, instale o npm primeiro." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
npm install

Write-Host "🔧 Configurando banco de dados..." -ForegroundColor Yellow

# Verificar se o arquivo .env.local existe
if (-not (Test-Path ".env.local")) {
    Write-Host "⚠️  Arquivo .env.local não encontrado." -ForegroundColor Yellow
    Write-Host "📝 Criando arquivo .env.local com configurações padrão..." -ForegroundColor Yellow
    
    $envContent = @"
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/doafacil"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
"@
    
    $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Host "✅ Arquivo .env.local criado. Por favor, configure a DATABASE_URL com suas credenciais." -ForegroundColor Green
}

Write-Host "🗄️  Aplicando mudanças no schema do banco..." -ForegroundColor Yellow
npm run db:push

Write-Host "🌱 Populando banco com dados iniciais..." -ForegroundColor Yellow
npm run db:seed

Write-Host "✅ Setup concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Configure a DATABASE_URL no arquivo .env.local" -ForegroundColor White
Write-Host "2. Execute 'npm run dev' para iniciar o servidor" -ForegroundColor White
Write-Host "3. Acesse http://localhost:3000/api/stats para testar a API" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentação completa em README-BACKEND.md" -ForegroundColor Cyan
Write-Host "🧪 Exemplos de testes em examples/api-tests.http" -ForegroundColor Cyan
