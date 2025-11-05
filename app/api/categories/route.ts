import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createCategorySchema } from '@/lib/validations'
import { ApiResponse } from '@/lib/types'

// GET /api/categories - Buscar todas as categorias
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    })

    const response: ApiResponse = {
      success: true,
      data: categories
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    
    const response: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor'
    }

    return NextResponse.json(response, { status: 500 })
  }
}

// POST /api/categories - Criar nova categoria
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar dados
    const validatedData = createCategorySchema.parse(body)
    
    // Verificar se categoria já existe
    const existingCategory = await prisma.category.findUnique({
      where: { name: validatedData.name }
    })

    if (existingCategory) {
      const response: ApiResponse = {
        success: false,
        error: 'Categoria já existe'
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Criar categoria
    const category = await prisma.category.create({
      data: validatedData
    })

    const response: ApiResponse = {
      success: true,
      data: category,
      message: 'Categoria criada com sucesso'
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar categoria:', error)
    
    const response: ApiResponse = {
      success: false,
      error: 'Erro interno do servidor'
    }

    return NextResponse.json(response, { status: 500 })
  }
}
