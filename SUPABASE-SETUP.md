# Configuração do Supabase

Este documento explica como configurar a integração com o Supabase para o projeto DoaFácil.

## 📋 Pré-requisitos

1. Conta no Supabase (https://supabase.com)
2. Projeto criado no Supabase
3. Senha do banco de dados do projeto

## 🔧 Configuração

### 1. Obter a Connection String do PostgreSQL

Para que o Prisma funcione corretamente, você precisa da connection string completa do PostgreSQL:

1. Acesse o painel do Supabase: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** > **Database**
4. Role até a seção **Connection string**
5. Selecione a aba **URI** (não Transaction)
6. Copie a connection string

A connection string terá um formato similar a:
```
postgresql://postgres:[YOUR-PASSWORD]@db.edournvwmwjyztjuoxow.supabase.co:5432/postgres
```

**Importante:** Substitua `[YOUR-PASSWORD]` pela senha do seu banco de dados (a senha que você definiu ao criar o projeto).

### 2. Configurar o arquivo .env.local

O arquivo `.env.local` já foi criado com as configurações básicas. Você precisa:

1. Abrir o arquivo `.env.local`
2. Substituir `[YOUR-PASSWORD]` na `DATABASE_URL` pela senha real do seu banco de dados

Exemplo:
```env
DATABASE_URL="postgresql://postgres:minhasenha123@db.edournvwmwjyztjuoxow.supabase.co:5432/postgres"
```

### 3. Connection Pooling (Opcional, mas Recomendado)

Para melhor performance em produção, você pode usar connection pooling:

1. No painel do Supabase, vá em **Settings** > **Database**
2. Selecione a aba **Connection pooling**
3. Copie a connection string do pooler
4. Use essa connection string no lugar da connection string direta

A connection string do pooler terá um formato similar a:
```
postgresql://postgres.edournvwmwjyztjuoxow:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

## 🚀 Próximos Passos

Após configurar a `DATABASE_URL`:

1. **Gerar o Prisma Client:**
   ```bash
   npm run db:generate
   ```

2. **Aplicar o schema ao banco de dados:**
   ```bash
   npm run db:push
   ```

3. **Popular o banco com dados iniciais (opcional):**
   ```bash
   npm run db:seed
   ```

4. **Verificar a conexão:**
   ```bash
   npm run db:studio
   ```
   Isso abrirá o Prisma Studio onde você pode visualizar e gerenciar os dados.

## 📚 Uso do Supabase Client

O projeto também está configurado para usar o cliente Supabase para operações via API REST. Para usar:

```typescript
import { supabase } from '@/lib/supabase'

// Exemplo de uso
const { data, error } = await supabase
  .from('institutions')
  .select('*')
```

## ⚠️ Notas Importantes

- **Nunca commite o arquivo `.env.local`** - ele já está no `.gitignore`
- A `DATABASE_URL` contém credenciais sensíveis - mantenha-a segura
- Use connection pooling em produção para melhor performance
- A API key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) é pública e pode ser exposta no frontend, mas configure Row Level Security (RLS) no Supabase para proteger seus dados

## 🔒 Segurança

1. Configure Row Level Security (RLS) no Supabase para suas tabelas
2. Use políticas de segurança adequadas
3. Nunca exponha a senha do banco de dados
4. Use variáveis de ambiente para todas as credenciais

