# Deploy na Vercel

Este documento explica como fazer deploy do DoaFácil na Vercel.

## 📋 Pré-requisitos

1. Conta na Vercel (https://vercel.com)
2. Repositório no GitHub conectado
3. Variáveis de ambiente configuradas

## 🔧 Configuração das Variáveis de Ambiente

Na Vercel, você precisa configurar as seguintes variáveis de ambiente:

### 1. Acesse as Configurações do Projeto

1. Vá para o dashboard da Vercel
2. Selecione seu projeto
3. Vá em **Settings** > **Environment Variables**

### 2. Adicione as Variáveis

Adicione as seguintes variáveis de ambiente:

#### DATABASE_URL (Obrigatório)
```
postgresql://postgres:[SUA-SENHA]@db.edournvwmwjyztjuoxow.supabase.co:5432/postgres?sslmode=require
```

**Importante:** Substitua `[SUA-SENHA]` pela senha real do seu banco Supabase.

#### NEXT_PUBLIC_SUPABASE_URL (Obrigatório)
```
https://edournvwmwjyztjuoxow.supabase.co
```

#### NEXT_PUBLIC_SUPABASE_ANON_KEY (Obrigatório)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkb3VybnZ3bXdqeXp0anVveG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MzI0NDksImV4cCI6MjA3NTAwODQ0OX0.hInwotljcCECLCuq6HFWiYy1YpM2Ks8rWIP3IrGufvo
```

#### NEXTAUTH_SECRET (Opcional, mas recomendado)
Gere uma string aleatória segura:
```bash
openssl rand -base64 32
```

#### NEXTAUTH_URL (Opcional)
URL do seu site na Vercel (será preenchida automaticamente, mas você pode definir manualmente)

#### SENDGRID_API_KEY (Opcional - apenas se usar envio de emails)
Chave da API do SendGrid para envio de emails

#### RECEIVER_EMAIL (Opcional - apenas se usar envio de emails)
Email que receberá os formulários (deve estar verificado no SendGrid)

### 3. Aplicar para Todos os Ambientes

Certifique-se de que as variáveis estão aplicadas para:
- ✅ Production
- ✅ Preview
- ✅ Development

## 🚀 Deploy

### Opção 1: Deploy Automático (Recomendado)

1. Conecte seu repositório GitHub à Vercel
2. A Vercel detectará automaticamente o Next.js
3. Configure as variáveis de ambiente
4. Faça push para a branch `master` ou `main`
5. O deploy será feito automaticamente

### Opção 2: Deploy Manual

1. Instale a Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Faça login:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

## ⚙️ Configurações Importantes

### Build Command
A Vercel usará automaticamente:
```
prisma generate && next build
```

### Install Command
```
pnpm install
```

### Output Directory
```
.next
```

## 🔍 Verificações Pós-Deploy

Após o deploy, verifique:

1. ✅ O build foi concluído com sucesso
2. ✅ As variáveis de ambiente estão configuradas
3. ✅ O Prisma Client foi gerado (verifique os logs)
4. ✅ A conexão com o banco está funcionando
5. ✅ As APIs estão respondendo

## 🐛 Troubleshooting

### Erro: "Cannot find module '.prisma/client/default'"

**Solução:** Certifique-se de que:
- O script `postinstall` está no `package.json`
- O Prisma está em `dependencies` (não `devDependencies`)
- A variável `DATABASE_URL` está configurada na Vercel

### Erro: "Connection refused" ou "Database connection failed"

**Solução:**
- Verifique se a `DATABASE_URL` está correta
- Verifique se o Supabase permite conexões externas
- Use connection pooling para produção

### Build falha

**Solução:**
- Verifique os logs de build na Vercel
- Certifique-se de que todas as dependências estão instaladas
- Verifique se não há erros de TypeScript ou ESLint

## 📚 Recursos

- [Documentação da Vercel](https://vercel.com/docs)
- [Next.js na Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Prisma na Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

