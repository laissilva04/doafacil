import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ApiResponse } from '@/lib/types'

// GET /api/stats - Buscar estatísticas gerais
export async function GET(request: NextRequest) {
  try {
    // Buscar estatísticas em paralelo
    const [
      totalInstitutions,
      activeInstitutions,
      verifiedInstitutions,
      totalCategories,
      totalDonationTypes,
      institutionsByState,
      institutionsByCategory,
      institutionsByDonationType
    ] = await Promise.all([
      // Total de instituições
      prisma.institution.count(),
      
      // Instituições ativas
      prisma.institution.count({
        where: { isActive: true }
      }),
      
      // Instituições verificadas
      prisma.institution.count({
        where: { isVerified: true, isActive: true }
      }),
      
      // Total de categorias
      prisma.category.count(),
      
      // Total de tipos de doação
      prisma.donationType.count(),
      
      // Instituições por estado
      prisma.institution.groupBy({
        by: ['state'],
        where: { isActive: true },
        _count: { state: true },
        orderBy: { _count: { state: 'desc' } }
      }),
      
      // Instituições por categoria
      prisma.institutionCategory.groupBy({
        by: ['categoryId'],
        where: {
          institution: { isActive: true }
        },
        _count: { categoryId: true },
        orderBy: { _count: { categoryId: 'desc' } }
      }),
      
      // Instituições por tipo de doação
      prisma.institutionDonationType.groupBy({
        by: ['donationTypeId'],
        where: {
          institution: { isActive: true }
        },
        _count: { donationTypeId: true },
        orderBy: { _count: { donationTypeId: 'desc' } }
      })
    ])

    // Buscar nomes das categorias e tipos de doação
    const [categories, donationTypes] = await Promise.all([
      prisma.category.findMany({
        select: { id: true, name: true }
      }),
      prisma.donationType.findMany({
        select: { id: true, name: true }
      })
    ])

    // Mapear IDs para nomes
    const categoryMap = new Map(categories.map(c => [c.id, c.name]))
    const donationTypeMap = new Map(donationTypes.map(dt => [dt.id, dt.name]))

    // Formatar dados
    const stats = {
      overview: {
        totalInstitutions,
        activeInstitutions,
        verifiedInstitutions,
        totalCategories,
        totalDonationTypes
      },
      institutionsByState: institutionsByState.map(item => ({
        state: item.state,
        count: item._count.state
      })),
      institutionsByCategory: institutionsByCategory.map(item => ({
        categoryId: item.categoryId,
        categoryName: categoryMap.get(item.categoryId),
        count: item._count.categoryId
      })),
      institutionsByDonationType: institutionsByDonationType.map(item => ({
        donationTypeId: item.donationTypeId,
        donationTypeName: donationTypeMap.get(item.donationTypeId),
        count: item._count.donationTypeId
      }))
    }

    const response: ApiResponse = {
      success: true,
      data: stats
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    
    const response: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor'
    }

    return NextResponse.json(response, { status: 500 })
  }
}
