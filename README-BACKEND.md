# DoaFácil - Backend API

Este documento descreve a API backend do projeto DoaFácil, uma plataforma para conectar doadores com instituições de caridade.

## 🚀 Configuração Inicial

### 1. Instalar Dependências
```bash
npm install
# ou
pnpm install
```

### 2. Configurar Banco de Dados

O projeto está configurado para usar **Supabase** como banco de dados PostgreSQL.

1. O arquivo `.env.local` já foi criado com as configurações básicas
2. **Importante:** Você precisa obter a connection string completa do PostgreSQL do Supabase:
   - Acesse o painel do Supabase: https://supabase.com/dashboard
   - Vá em **Settings** > **Database**
   - Copie a connection string (URI) e substitua `[YOUR-PASSWORD]` pela senha do seu banco
3. Configure a variável `DATABASE_URL` no arquivo `.env.local`:
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.edournvwmwjyztjuoxow.supabase.co:5432/postgres"
```

📚 **Para instruções detalhadas, consulte o arquivo [SUPABASE-SETUP.md](./SUPABASE-SETUP.md)**

### 3. Executar Migrações
```bash
npm run db:push
# ou
pnpm db:push
```

### 4. Popular Banco com Dados Iniciais
```bash
npm run db:seed
# ou
pnpm db:seed
```

## 📚 Endpoints da API

### Instituições

#### GET /api/institutions
Buscar instituições com filtros opcionais.

**Parâmetros de Query:**
- `searchText` (string): Texto para busca
- `categoryName` (string): Nome da categoria
- `cityName` (string): Nome da cidade
- `stateName` (string): Sigla do estado
- `donationTypeName` (string): Nome do tipo de doação
- `page` (number): Página (padrão: 1)
- `limit` (number): Limite por página (padrão: 10, máximo: 100)

**Exemplo:**
```bash
GET /api/institutions?searchText=crianças&cityName=São Paulo&page=1&limit=10
```

#### GET /api/institutions/[id]
Buscar instituição específica por ID.

#### POST /api/institutions
Criar nova instituição.

**Body:**
```json
{
  "name": "Nome da Instituição",
  "description": "Descrição da instituição",
  "address": "Endereço completo",
  "city": "Cidade",
  "state": "SP",
  "phone": "(11) 1234-5678",
  "email": "contato@instituicao.org.br",
  "website": "https://instituicao.org.br",
  "cnpj": "12.345.678/0001-90",
  "responsibleName": "Nome do Responsável",
  "responsibleCpf": "123.456.789-00",
  "operatingHours": "Segunda a Sexta, 8h às 17h",
  "additionalInfo": "Informações adicionais",
  "categoryIds": ["uuid-categoria-1", "uuid-categoria-2"],
  "donationTypeIds": ["uuid-tipo-1", "uuid-tipo-2"]
}
```

#### PUT /api/institutions/[id]
Atualizar instituição existente.

#### DELETE /api/institutions/[id]
Desativar instituição (soft delete).

### Categorias

#### GET /api/categories
Listar todas as categorias.

#### POST /api/categories
Criar nova categoria.

**Body:**
```json
{
  "name": "Nome da Categoria",
  "description": "Descrição da categoria"
}
```

### Tipos de Doação

#### GET /api/donation-types
Listar todos os tipos de doação.

#### POST /api/donation-types
Criar novo tipo de doação.

**Body:**
```json
{
  "name": "Nome do Tipo",
  "description": "Descrição do tipo"
}
```

### Estatísticas

#### GET /api/stats
Buscar estatísticas gerais da plataforma.

**Resposta:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalInstitutions": 100,
      "activeInstitutions": 95,
      "verifiedInstitutions": 80,
      "totalCategories": 8,
      "totalDonationTypes": 16
    },
    "institutionsByState": [
      { "state": "SP", "count": 45 },
      { "state": "RJ", "count": 30 }
    ],
    "institutionsByCategory": [
      { "categoryId": "uuid", "categoryName": "Crianças", "count": 25 }
    ],
    "institutionsByDonationType": [
      { "donationTypeId": "uuid", "donationTypeName": "Roupas", "count": 40 }
    ]
  }
}
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build
npm start

# Banco de Dados
npm run db:generate    # Gerar cliente Prisma
npm run db:push        # Aplicar mudanças no schema
npm run db:migrate     # Executar migrações
npm run db:seed        # Popular banco com dados iniciais
npm run db:studio      # Abrir Prisma Studio

# Linting
npm run lint
```

## 🛡️ Validações

A API inclui validações robustas para:

- **CNPJ**: Validação completa com dígitos verificadores
- **CPF**: Validação completa com dígitos verificadores
- **Email**: Formato de email válido
- **Telefone**: Formato brasileiro (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
- **Estado**: Sigla de 2 caracteres
- **UUIDs**: Validação de IDs de categorias e tipos de doação

## 📊 Estrutura do Banco

### Tabelas Principais
- `institutions`: Instituições/ONGs
- `categories`: Categorias de atuação
- `donation_types`: Tipos de doação aceitos
- `institution_categories`: Relacionamento N:N entre instituições e categorias
- `institution_donation_types`: Relacionamento N:N entre instituições e tipos de doação

### Índices
- Busca por cidade, estado
- Filtros por status (ativo, verificado)
- Relacionamentos para performance

## 🔍 Funcionalidades

### Busca Avançada
- Busca por texto em nome, descrição e cidade
- Filtros por categoria, cidade, estado e tipo de doação
- Paginação com limite configurável

### Formatação de Dados
- Formatação automática de CNPJ, CPF e telefone
- Sanitização de texto de busca
- Capitalização de nomes

### Estatísticas
- Contadores gerais
- Distribuição por estado
- Distribuição por categoria
- Distribuição por tipo de doação

## 🚨 Tratamento de Erros

Todas as rotas retornam respostas padronizadas:

```json
{
  "success": true/false,
  "data": {}, // Dados da resposta
  "error": "Mensagem de erro", // Apenas em caso de erro
  "message": "Mensagem de sucesso" // Apenas em operações de criação/atualização
}
```

## 🔒 Segurança

- Headers de segurança configurados
- Validação de entrada em todas as rotas
- Sanitização de dados
- CORS configurado
- Rate limiting (recomendado para produção)

## 📝 Próximos Passos

1. Implementar autenticação e autorização
2. Adicionar sistema de doações
3. Implementar notificações
4. Adicionar upload de imagens
5. Implementar geolocalização
6. Adicionar sistema de avaliações
