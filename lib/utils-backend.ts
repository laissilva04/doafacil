import { InstitutionWithRelations, PaginatedResponse } from './types'

// Formatar CNPJ
export function formatCNPJ(cnpj: string): string {
  const numbers = cnpj.replace(/\D/g, '')
  return numbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}

// Formatar CPF
export function formatCPF(cpf: string): string {
  const numbers = cpf.replace(/\D/g, '')
  return numbers.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
}

// Formatar telefone
export function formatPhone(phone: string): string {
  const numbers = phone.replace(/\D/g, '')
  if (numbers.length === 10) {
    return numbers.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
  } else if (numbers.length === 11) {
    return numbers.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
  }
  return phone
}

// Formatar instituição para resposta da API
export function formatInstitution(institution: InstitutionWithRelations) {
  return {
    id: institution.id,
    name: institution.name,
    description: institution.description,
    address: institution.address,
    city: institution.city,
    state: institution.state,
    phone: institution.phone,
    email: institution.email,
    website: institution.website,
    cnpj: institution.cnpj,
    responsibleName: institution.responsibleName,
    responsibleCpf: institution.responsibleCpf,
    operatingHours: institution.operatingHours,
    additionalInfo: institution.additionalInfo,
    isActive: institution.isActive,
    isVerified: institution.isVerified,
    createdAt: institution.createdAt,
    updatedAt: institution.updatedAt,
    categories: institution.institutionCategories.map(ic => ({
      id: ic.category.id,
      name: ic.category.name,
      description: ic.category.description
    })),
    donationTypes: institution.institutionDonationTypes.map(idt => ({
      id: idt.donationType.id,
      name: idt.donationType.name,
      description: idt.donationType.description
    }))
  }
}

// Criar resposta paginada
export function createPaginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / limit)
  
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  }
}

// Sanitizar string para busca
export function sanitizeSearchText(text: string): string {
  return text
    .trim()
    .replace(/[^\w\s]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, ' ') // Remove espaços múltiplos
    .toLowerCase()
}

// Gerar slug a partir de string
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens múltiplos
    .trim()
}

// Validar se string é UUID
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

// Calcular distância entre duas coordenadas (Haversine)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

// Formatar data para exibição
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

// Formatar data e hora para exibição
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Truncar texto
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

// Capitalizar primeira letra de cada palavra
export function capitalizeWords(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
