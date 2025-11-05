
-- (Nenhum enum necessário na versão simplificada)

-- =============================================

-- (Sem tabela de usuários nesta fase do projeto)

-- Tabela de instituições/ONGs
CREATE TABLE institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    address VARCHAR(500) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    responsible_name VARCHAR(255) NOT NULL,
    responsible_cpf VARCHAR(14) NOT NULL,
    operating_hours VARCHAR(100),
    additional_info TEXT,
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de categorias
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de tipos de doação
CREATE TABLE donation_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de relacionamento entre instituições e categorias
CREATE TABLE institution_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    UNIQUE(institution_id, category_id)
);

-- Tabela de relacionamento entre instituições e tipos de doação aceitos
CREATE TABLE institution_donation_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    donation_type_id UUID NOT NULL REFERENCES donation_types(id) ON DELETE CASCADE,
    UNIQUE(institution_id, donation_type_id)
);

-- (Sem tabela de doações nesta fase do projeto)

-- =============================================

-- Índices para busca de instituições
CREATE INDEX idx_institutions_city ON institutions(city);
CREATE INDEX idx_institutions_state ON institutions(state);
CREATE INDEX idx_institutions_is_active ON institutions(is_active);
CREATE INDEX idx_institutions_is_verified ON institutions(is_verified);

-- (Sem índices de doações nesta fase)

-- Índices para relacionamentos
CREATE INDEX idx_institution_categories_institution ON institution_categories(institution_id);
CREATE INDEX idx_institution_categories_category ON institution_categories(category_id);
CREATE INDEX idx_institution_donation_types_institution ON institution_donation_types(institution_id);
CREATE INDEX idx_institution_donation_types_type ON institution_donation_types(donation_type_id);

-- =============================================
-- DADOS INICIAIS - CATEGORIAS
-- =============================================

INSERT INTO categories (name, description) VALUES
('Crianças', 'Instituições que trabalham com crianças e adolescentes'),
('Idosos', 'Instituições que trabalham com idosos'),
('Animais', 'Instituições que trabalham com proteção animal'),
('Meio Ambiente', 'Instituições que trabalham com preservação ambiental'),
('Educação', 'Instituições que trabalham com educação'),
('Saúde', 'Instituições que trabalham com saúde'),
('Assistência Social', 'Instituições que trabalham com assistência social'),
('Cultura', 'Instituições que trabalham com cultura');

-- =============================================
-- DADOS INICIAIS - TIPOS DE DOAÇÃO
-- =============================================

INSERT INTO donation_types (name, description) VALUES
('Roupas', 'Roupas em bom estado'),
('Alimentos', 'Alimentos não perecíveis'),
('Medicamentos', 'Medicamentos não vencidos'),
('Brinquedos', 'Brinquedos em bom estado'),
('Material Escolar', 'Materiais escolares e educacionais'),
('Móveis', 'Móveis em bom estado'),
('Eletrodomésticos', 'Eletrodomésticos funcionando'),
('Livros', 'Livros e material de leitura'),
('Equipamentos', 'Equipamentos diversos'),
('Ração', 'Ração para animais'),
('Fraldas', 'Fraldas descartáveis'),
('Cobertores', 'Cobertores e agasalhos'),
('Ferramentas', 'Ferramentas de trabalho'),
('Mudas', 'Mudas de plantas'),
('Material de Limpeza', 'Produtos de limpeza e higiene'),
('Outros', 'Outros tipos de doação');

-- =============================================
-- DADOS DE EXEMPLO - INSTITUIÇÕES
-- =============================================

INSERT INTO institutions (
    name, description, address, city, state, phone, email, website, cnpj,
    responsible_name, responsible_cpf, operating_hours, additional_info, is_verified
) VALUES
(
    'Instituto Criança Feliz',
    'Dedicada ao cuidado e educação de crianças em situação de vulnerabilidade social.',
    'Rua das Flores, 123',
    'São Paulo',
    'SP',
    '(11) 1234-5678',
    'contato@criancafeliz.org.br',
    'https://criancafeliz.org.br',
    '12.345.678/0001-90',
    'Maria Silva Santos',
    '123.456.789-00',
    'Segunda a Sexta, 8h às 17h',
    'Instituição sem fins lucrativos que atende crianças de 0 a 12 anos.',
    true
),
(
    'Lar dos Idosos São Vicente',
    'Casa de repouso que oferece cuidados especializados para idosos.',
    'Av. Principal, 456',
    'Rio de Janeiro',
    'RJ',
    '(21) 9876-5432',
    'contato@larsaovicente.org.br',
    'https://larsaovicente.org.br',
    '98.765.432/0001-10',
    'João Oliveira Costa',
    '987.654.321-00',
    '24 horas',
    'Casa de repouso com 50 leitos para idosos.',
    true
),
(
    'Proteção Animal Unidos',
    'ONG focada no resgate e cuidado de animais abandonados.',
    'Rua dos Animais, 789',
    'Belo Horizonte',
    'MG',
    '(31) 5555-1234',
    'contato@protecaoanimal.org.br',
    'https://protecaoanimal.org.br',
    '11.222.333/0001-44',
    'Ana Paula Ferreira',
    '111.222.333-44',
    'Segunda a Domingo, 7h às 19h',
    'Abrigo com capacidade para 200 animais.',
    true
),
(
    'Verde Esperança',
    'Organização dedicada à preservação ambiental e reflorestamento.',
    'Rua Verde, 321',
    'Curitiba',
    'PR',
    '(41) 7777-8888',
    'contato@verdeesperanca.org.br',
    'https://verdeesperanca.org.br',
    '55.666.777/0001-88',
    'Carlos Eduardo Lima',
    '555.666.777-88',
    'Segunda a Sexta, 9h às 18h',
    'Projetos de reflorestamento em áreas degradadas.',
    true
);

-- =============================================
-- ASSOCIAR CATEGORIAS ÀS INSTITUIÇÕES
-- =============================================

-- Instituto Criança Feliz - Crianças e Educação
INSERT INTO institution_categories (institution_id, category_id)
SELECT i.id, c.id
FROM institutions i, categories c
WHERE i.name = 'Instituto Criança Feliz' 
AND c.name IN ('Crianças', 'Educação');

-- Lar dos Idosos - Idosos e Saúde
INSERT INTO institution_categories (institution_id, category_id)
SELECT i.id, c.id
FROM institutions i, categories c
WHERE i.name = 'Lar dos Idosos São Vicente' 
AND c.name IN ('Idosos', 'Saúde');

-- Proteção Animal - Animais
INSERT INTO institution_categories (institution_id, category_id)
SELECT i.id, c.id
FROM institutions i, categories c
WHERE i.name = 'Proteção Animal Unidos' 
AND c.name = 'Animais';

-- Verde Esperança - Meio Ambiente
INSERT INTO institution_categories (institution_id, category_id)
SELECT i.id, c.id
FROM institutions i, categories c
WHERE i.name = 'Verde Esperança' 
AND c.name = 'Meio Ambiente';

-- =============================================
-- ASSOCIAR TIPOS DE DOAÇÃO ÀS INSTITUIÇÕES
-- =============================================

-- Instituto Criança Feliz
INSERT INTO institution_donation_types (institution_id, donation_type_id)
SELECT i.id, dt.id
FROM institutions i, donation_types dt
WHERE i.name = 'Instituto Criança Feliz' 
AND dt.name IN ('Roupas', 'Brinquedos', 'Material Escolar', 'Livros');

-- Lar dos Idosos
INSERT INTO institution_donation_types (institution_id, donation_type_id)
SELECT i.id, dt.id
FROM institutions i, donation_types dt
WHERE i.name = 'Lar dos Idosos São Vicente' 
AND dt.name IN ('Alimentos', 'Medicamentos', 'Fraldas', 'Roupas');

-- Proteção Animal
INSERT INTO institution_donation_types (institution_id, donation_type_id)
SELECT i.id, dt.id
FROM institutions i, donation_types dt
WHERE i.name = 'Proteção Animal Unidos' 
AND dt.name IN ('Ração', 'Medicamentos', 'Cobertores');

-- Verde Esperança
INSERT INTO institution_donation_types (institution_id, donation_type_id)
SELECT i.id, dt.id
FROM institutions i, donation_types dt
WHERE i.name = 'Verde Esperança' 
AND dt.name IN ('Mudas', 'Ferramentas', 'Equipamentos');

-- =============================================
-- (Sem usuários nesta fase)

-- =============================================
-- (Sem doações nesta fase)

-- =============================================

-- Função para buscar instituições com filtros
CREATE OR REPLACE FUNCTION search_institutions(
    search_text TEXT DEFAULT NULL,
    category_name TEXT DEFAULT NULL,
    city_name TEXT DEFAULT NULL,
    state_name TEXT DEFAULT NULL,
    donation_type_name TEXT DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    name VARCHAR(255),
    description TEXT,
    address VARCHAR(500),
    city VARCHAR(100),
    state VARCHAR(2),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    is_verified BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT
        i.id,
        i.name,
        i.description,
        i.address,
        i.city,
        i.state,
        i.phone,
        i.email,
        i.website,
        i.is_verified
    FROM institutions i
    LEFT JOIN institution_categories ic ON i.id = ic.institution_id
    LEFT JOIN categories c ON ic.category_id = c.id
    LEFT JOIN institution_donation_types idt ON i.id = idt.institution_id
    LEFT JOIN donation_types dt ON idt.donation_type_id = dt.id
    WHERE i.is_active = true
    AND (search_text IS NULL OR 
         i.name ILIKE '%' || search_text || '%' OR
         i.description ILIKE '%' || search_text || '%' OR
         i.city ILIKE '%' || search_text || '%')
    AND (category_name IS NULL OR c.name = category_name)
    AND (city_name IS NULL OR i.city ILIKE '%' || city_name || '%')
    AND (state_name IS NULL OR i.state = state_name)
    AND (donation_type_name IS NULL OR dt.name = donation_type_name)
    ORDER BY i.name;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- COMENTÁRIOS FINAIS
-- =============================================

-- Este script cria um banco de dados completo para a plataforma DoaFácil
-- Execute este script no Supabase SQL Editor para criar todas as tabelas,
-- relacionamentos, índices e dados de exemplo necessários.

