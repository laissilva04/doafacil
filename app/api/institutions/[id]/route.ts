import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createInstitutionSchema, updateInstitutionSchema } from '@/lib/validations'
import { formatInstitution } from '@/lib/utils-backend'
import { ApiResponse } from '@/lib/types'

// GET /api/institutions/[id] - Buscar instituição por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const institution = await prisma.institution.findUnique({
      where: { id },
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

    if (!institution) {
      const response: ApiResponse = {
        success: false,
        error: 'Instituição não encontrada'
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse = {
      success: true,
      data: formatInstitution(institution)
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Erro ao buscar instituição:', error)
    
    const response: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor'
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// PUT /api/institutions/[id] - Atualizar instituição
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    // Validar dados
    const validatedData = updateInstitutionSchema.parse({ ...body, id })

    // Verificar se instituição existe
    const existingInstitution = await prisma.institution.findUnique({
      where: { id }
    })

    if (!existingInstitution) {
      const response: ApiResponse = {
        success: false,
        error: 'Instituição não encontrada'
      }
      return NextResponse.json(response, { status: 404 })
    }

    // Verificar se CNPJ já existe (se foi alterado)
    if (validatedData.cnpj && validatedData.cnpj !== existingInstitution.cnpj) {
      const cnpjExists = await prisma.institution.findUnique({
        where: { cnpj: validatedData.cnpj }
      })

      if (cnpjExists) {
        const response: ApiResponse = {
          success: false,
          error: 'CNPJ já cadastrado'
        }
        return NextResponse.json(response, { status: 400 })
      }
    }

    // Verificar categorias (se fornecidas)
    if (validatedData.categoryIds) {
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
    }

    // Verificar tipos de doação (se fornecidos)
    if (validatedData.donationTypeIds) {
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
    }

    // Preparar dados para atualização
    const updateData: any = {
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
      additionalInfo: validatedData.additionalInfo
    }

    // Remover campos undefined
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key]
      }
    })

    // Atualizar instituição
    const institution = await prisma.institution.update({
      where: { id },
      data: {
        ...updateData,
        // Atualizar categorias se fornecidas
        ...(validatedData.categoryIds && {
          institutionCategories: {
            deleteMany: {},
            create: validatedData.categoryIds.map(categoryId => ({
              categoryId
            }))
          }
        }),
        // Atualizar tipos de doação se fornecidos
        ...(validatedData.donationTypeIds && {
          institutionDonationTypes: {
            deleteMany: {},
            create: validatedData.donationTypeIds.map(donationTypeId => ({
              donationTypeId
            }))
          }
        })
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
      message: 'Instituição atualizada com sucesso'
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Erro ao atualizar instituição:', error)
    
    const response: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor'
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// DELETE /api/institutions/[id] - Deletar instituição (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Verificar se instituição existe
    const existingInstitution = await prisma.institution.findUnique({
      where: { id }
    })

    if (!existingInstitution) {
      const response: ApiResponse = {
        success: false,
        error: 'Instituição não encontrada'
      }
      return NextResponse.json(response, { status: 404 })
    }

    // Soft delete - marcar como inativa
    await prisma.institution.update({
      where: { id },
      data: { isActive: false }
    })

    const response: ApiResponse = {
      success: true,
      message: 'Instituição removida com sucesso'
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Erro ao deletar instituição:', error)
    
    const response: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor'
    }

    return NextResponse.json(response, { status: 500 })
  }
}
