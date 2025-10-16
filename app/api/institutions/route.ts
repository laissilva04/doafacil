import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { searchInstitutionsSchema } from '@/lib/validations'
import { createPaginatedResponse, formatInstitution, sanitizeSearchText } from '@/lib/utils-backend'
import { ApiResponse, SearchInstitutionsParams } from '@/lib/types'

// GET /api/institutions - Buscar instituições
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const params = Object.fromEntries(searchParams.entries())
    
    // Validar parâmetros
    const validatedParams = searchInstitutionsSchema.parse(params)
    const { searchText, categoryName, cityName, stateName, donationTypeName, page, limit } = validatedParams

    // Construir filtros
    const where: any = {
      isActive: true
    }

    // Filtro por texto de busca
    if (searchText) {
      const sanitizedText = sanitizeSearchText(searchText)
      where.OR = [
        { name: { contains: sanitizedText, mode: 'insensitive' } },
        { description: { contains: sanitizedText, mode: 'insensitive' } },
        { city: { contains: sanitizedText, mode: 'insensitive' } }
      ]
    }

    // Filtro por cidade
    if (cityName) {
      where.city = { contains: cityName, mode: 'insensitive' }
    }

    // Filtro por estado
    if (stateName) {
      where.state = stateName.toUpperCase()
    }

    // Filtro por categoria
    if (categoryName) {
      where.institutionCategories = {
        some: {
          category: {
            name: categoryName
          }
        }
      }
    }

    // Filtro por tipo de doação
    if (donationTypeName) {
      where.institutionDonationTypes = {
        some: {
          donationType: {
            name: donationTypeName
          }
        }
      }
    }

    // Calcular offset para paginação
    const offset = (page - 1) * limit

    // Buscar instituições
    const [institutions, total] = await Promise.all([
      prisma.institution.findMany({
        where,
        include: {
          institutionCategories: {
            include: {
              category: true
            }
          },
          institutionDonationTypes: {
            include: {
              donationType: true
            }
          }
        },
        orderBy: { name: 'asc' },
        skip: offset,
        take: limit
      }),
      prisma.institution.count({ where })
    ])

    // Formatar resposta
    const formattedInstitutions = institutions.map(formatInstitution)
    const paginatedResponse = createPaginatedResponse(
      formattedInstitutions,
      page,
      limit,
      total
    )

    const response: ApiResponse = {
      success: true,
      data: paginatedResponse
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Erro ao buscar instituições:', error)
    
    const response: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor'
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// POST /api/institutions - Criar nova instituição
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar dados
    const validatedData = searchInstitutionsSchema.parse(body)
    
    // Verificar se CNPJ já existe
    const existingInstitution = await prisma.institution.findUnique({
      where: { cnpj: validatedData.cnpj }
    })

    if (existingInstitution) {
      const response: ApiResponse = {
        success: false,
        error: 'CNPJ já cadastrado'
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Verificar se categorias existem
    const categories = await prisma.category.findMany({
      where: { id: { in: validatedData.categoryIds } }
    })

    if (categories.length !== validatedData.categoryIds.length) {
      const response: ApiResponse = {
        success: false,
        error: 'Uma ou mais categorias não foram encontradas'
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Verificar se tipos de doação existem
    const donationTypes = await prisma.donationType.findMany({
      where: { id: { in: validatedData.donationTypeIds } }
    })

    if (donationTypes.length !== validatedData.donationTypeIds.length) {
      const response: ApiResponse = {
        success: false,
        error: 'Um ou mais tipos de doação não foram encontrados'
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Criar instituição
    const institution = await prisma.institution.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        phone: validatedData.phone,
        email: validatedData.email,
        website: validatedData.website,
        cnpj: validatedData.cnpj,
        responsibleName: validatedData.responsibleName,
        responsibleCpf: validatedData.responsibleCpf,
        operatingHours: validatedData.operatingHours,
        additionalInfo: validatedData.additionalInfo,
        institutionCategories: {
          create: validatedData.categoryIds.map(categoryId => ({
            categoryId
          }))
        },
        institutionDonationTypes: {
          create: validatedData.donationTypeIds.map(donationTypeId => ({
            donationTypeId
          }))
        }
      },
      include: {
        institutionCategories: {
          include: {
            category: true
          }
        },
        institutionDonationTypes: {
          include: {
            donationType: true
          }
        }
      }
    })

    const response: ApiResponse = {
      success: true,
      data: formatInstitution(institution),
      message: 'Instituição criada com sucesso'
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar instituição:', error)
    
    const response: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor'
    }

    return NextResponse.json(response, { status: 500 })
  }
}
