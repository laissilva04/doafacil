import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar categorias
  const categories = [
    { name: 'Crianças', description: 'Instituições que trabalham com crianças e adolescentes' },
    { name: 'Idosos', description: 'Instituições que trabalham com idosos' },
    { name: 'Animais', description: 'Instituições que trabalham com proteção animal' },
    { name: 'Meio Ambiente', description: 'Instituições que trabalham com preservação ambiental' },
    { name: 'Educação', description: 'Instituições que trabalham com educação' },
    { name: 'Saúde', description: 'Instituições que trabalham com saúde' },
    { name: 'Assistência Social', description: 'Instituições que trabalham com assistência social' },
    { name: 'Cultura', description: 'Instituições que trabalham com cultura' }
  ]

  console.log('📂 Criando categorias...')
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    })
  }

  // Criar tipos de doação
  const donationTypes = [
    { name: 'Roupas', description: 'Roupas em bom estado' },
    { name: 'Alimentos', description: 'Alimentos não perecíveis' },
    { name: 'Medicamentos', description: 'Medicamentos não vencidos' },
    { name: 'Brinquedos', description: 'Brinquedos em bom estado' },
    { name: 'Material Escolar', description: 'Materiais escolares e educacionais' },
    { name: 'Móveis', description: 'Móveis em bom estado' },
    { name: 'Eletrodomésticos', description: 'Eletrodomésticos funcionando' },
    { name: 'Livros', description: 'Livros e material de leitura' },
    { name: 'Equipamentos', description: 'Equipamentos diversos' },
    { name: 'Ração', description: 'Ração para animais' },
    { name: 'Fraldas', description: 'Fraldas descartáveis' },
    { name: 'Cobertores', description: 'Cobertores e agasalhos' },
    { name: 'Ferramentas', description: 'Ferramentas de trabalho' },
    { name: 'Mudas', description: 'Mudas de plantas' },
    { name: 'Material de Limpeza', description: 'Produtos de limpeza e higiene' },
    { name: 'Outros', description: 'Outros tipos de doação' }
  ]

  console.log('🎁 Criando tipos de doação...')
  for (const donationType of donationTypes) {
    await prisma.donationType.upsert({
      where: { name: donationType.name },
      update: {},
      create: donationType
    })
  }

  // Buscar IDs das categorias e tipos de doação criados
  const [criancas, idosos, animais, meioAmbiente, educacao, saude, assistenciaSocial, cultura] = await Promise.all([
    prisma.category.findUnique({ where: { name: 'Crianças' } }),
    prisma.category.findUnique({ where: { name: 'Idosos' } }),
    prisma.category.findUnique({ where: { name: 'Animais' } }),
    prisma.category.findUnique({ where: { name: 'Meio Ambiente' } }),
    prisma.category.findUnique({ where: { name: 'Educação' } }),
    prisma.category.findUnique({ where: { name: 'Saúde' } }),
    prisma.category.findUnique({ where: { name: 'Assistência Social' } }),
    prisma.category.findUnique({ where: { name: 'Cultura' } })
  ])

  const [roupas, alimentos, medicamentos, brinquedos, materialEscolar, livros, racao, cobertores, mudas, ferramentas, equipamentos] = await Promise.all([
    prisma.donationType.findUnique({ where: { name: 'Roupas' } }),
    prisma.donationType.findUnique({ where: { name: 'Alimentos' } }),
    prisma.donationType.findUnique({ where: { name: 'Medicamentos' } }),
    prisma.donationType.findUnique({ where: { name: 'Brinquedos' } }),
    prisma.donationType.findUnique({ where: { name: 'Material Escolar' } }),
    prisma.donationType.findUnique({ where: { name: 'Livros' } }),
    prisma.donationType.findUnique({ where: { name: 'Ração' } }),
    prisma.donationType.findUnique({ where: { name: 'Cobertores' } }),
    prisma.donationType.findUnique({ where: { name: 'Mudas' } }),
    prisma.donationType.findUnique({ where: { name: 'Ferramentas' } }),
    prisma.donationType.findUnique({ where: { name: 'Equipamentos' } })
  ])

  // Criar instituições de exemplo
  const institutions = [
    {
      name: 'Instituto Criança Feliz',
      description: 'Dedicada ao cuidado e educação de crianças em situação de vulnerabilidade social.',
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      phone: '(11) 1234-5678',
      email: 'contato@criancafeliz.org.br',
      website: 'https://criancafeliz.org.br',
      cnpj: '12.345.678/0001-90',
      responsibleName: 'Maria Silva Santos',
      responsibleCpf: '123.456.789-00',
      operatingHours: 'Segunda a Sexta, 8h às 17h',
      additionalInfo: 'Instituição sem fins lucrativos que atende crianças de 0 a 12 anos.',
      isVerified: true,
      categoryIds: [criancas!.id, educacao!.id],
      donationTypeIds: [roupas!.id, brinquedos!.id, materialEscolar!.id, livros!.id]
    },
    {
      name: 'Lar dos Idosos São Vicente',
      description: 'Casa de repouso que oferece cuidados especializados para idosos.',
      address: 'Av. Principal, 456',
      city: 'Rio de Janeiro',
      state: 'RJ',
      phone: '(21) 9876-5432',
      email: 'contato@larsaovicente.org.br',
      website: 'https://larsaovicente.org.br',
      cnpj: '98.765.432/0001-10',
      responsibleName: 'João Oliveira Costa',
      responsibleCpf: '987.654.321-00',
      operatingHours: '24 horas',
      additionalInfo: 'Casa de repouso com 50 leitos para idosos.',
      isVerified: true,
      categoryIds: [idosos!.id, saude!.id],
      donationTypeIds: [alimentos!.id, medicamentos!.id, roupas!.id]
    },
    {
      name: 'Proteção Animal Unidos',
      description: 'ONG focada no resgate e cuidado de animais abandonados.',
      address: 'Rua dos Animais, 789',
      city: 'Belo Horizonte',
      state: 'MG',
      phone: '(31) 5555-1234',
      email: 'contato@protecaoanimal.org.br',
      website: 'https://protecaoanimal.org.br',
      cnpj: '11.222.333/0001-44',
      responsibleName: 'Ana Paula Ferreira',
      responsibleCpf: '111.222.333-44',
      operatingHours: 'Segunda a Domingo, 7h às 19h',
      additionalInfo: 'Abrigo com capacidade para 200 animais.',
      isVerified: true,
      categoryIds: [animais!.id],
      donationTypeIds: [racao!.id, medicamentos!.id, cobertores!.id]
    },
    {
      name: 'Verde Esperança',
      description: 'Organização dedicada à preservação ambiental e reflorestamento.',
      address: 'Rua Verde, 321',
      city: 'Curitiba',
      state: 'PR',
      phone: '(41) 7777-8888',
      email: 'contato@verdeesperanca.org.br',
      website: 'https://verdeesperanca.org.br',
      cnpj: '55.666.777/0001-88',
      responsibleName: 'Carlos Eduardo Lima',
      responsibleCpf: '555.666.777-88',
      operatingHours: 'Segunda a Sexta, 9h às 18h',
      additionalInfo: 'Projetos de reflorestamento em áreas degradadas.',
      isVerified: true,
      categoryIds: [meioAmbiente!.id],
      donationTypeIds: [mudas!.id, ferramentas!.id, equipamentos!.id]
    }
  ]

  console.log('🏢 Criando instituições de exemplo...')
  for (const institutionData of institutions) {
    const { categoryIds, donationTypeIds, ...institutionInfo } = institutionData

    const institution = await prisma.institution.upsert({
      where: { cnpj: institutionInfo.cnpj },
      update: {},
      create: {
        ...institutionInfo,
        institutionCategories: {
          create: categoryIds.map(categoryId => ({ categoryId }))
        },
        institutionDonationTypes: {
          create: donationTypeIds.map(donationTypeId => ({ donationTypeId }))
        }
      }
    })

    console.log(`✅ Instituição criada: ${institution.name}`)
  }

  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
