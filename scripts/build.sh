#!/bin/bash
set -e

echo "🔧 Gerando Prisma Client..."
npx prisma generate

echo "🏗️  Iniciando build do Next.js..."
next build

