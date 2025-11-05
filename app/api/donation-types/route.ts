import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createDonationTypeSchema } from '@/lib/validations'
import { ApiResponse } from '@/lib/types'

// GET /api/donation-types - Buscar todos os tipos de doação
export async function GET(request: NextRequest) {
  try {
    const donationTypes = await prisma.donationType.findMany({
      orderBy: { name: 'asc' }
    })

    const response: ApiResponse = {
      success: true,
      data: donationTypes
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Erro ao buscar tipos de doação:', error)
    
    const response: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor'
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// POST /api/donation-types - Criar novo tipo de doação
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar dados
    const validatedData = createDonationTypeSchema.parse(body)
    
    // Verificar se tipo de doação já existe
    const existingDonationType = await prisma.donationType.findUnique({
      where: { name: validatedData.name }
    })

    if (existingDonationType) {
      const response: ApiResponse = {
        success: false,
        error: 'Tipo de doação já existe'
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Criar tipo de doação
    const donationType = await prisma.donationType.create({
      data: validatedData
    })

    const response: ApiResponse = {
      success: true,
      data: donationType,
      message: 'Tipo de doação criado com sucesso'
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar tipo de doação:', error)
    
    const response: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor'
    }

    return NextResponse.json(response, { status: 500 })
  }
}
