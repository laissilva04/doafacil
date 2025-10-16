#!/bin/bash

echo "🚀 Configurando o backend do DoaFácil..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Por favor, instale o npm primeiro."
    exit 1
fi

echo "📦 Instalando dependências..."
npm install

echo "🔧 Configurando banco de dados..."

# Verificar se o arquivo .env.local existe
if [ ! -f ".env.local" ]; then
    echo "⚠️  Arquivo .env.local não encontrado."
    echo "📝 Criando arquivo .env.local com configurações padrão..."
    cat > .env.local << EOF
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/doafacil"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
EOF
    echo "✅ Arquivo .env.local criado. Por favor, configure a DATABASE_URL com suas credenciais."
fi

echo "🗄️  Aplicando mudanças no schema do banco..."
npm run db:push

echo "🌱 Populando banco com dados iniciais..."
npm run db:seed

echo "✅ Setup concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure a DATABASE_URL no arquivo .env.local"
echo "2. Execute 'npm run dev' para iniciar o servidor"
echo "3. Acesse http://localhost:3000/api/stats para testar a API"
echo ""
echo "📚 Documentação completa em README-BACKEND.md"
echo "🧪 Exemplos de testes em examples/api-tests.http"
