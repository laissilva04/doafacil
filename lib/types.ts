import { Institution, Category, DonationType } from '@prisma/client'

export interface InstitutionWithRelations extends Institution {
  institutionCategories: {
    category: Category
  }[]
  institutionDonationTypes: {
    donationType: DonationType
  }[]
}

export interface SearchInstitutionsParams {
  searchText?: string
  categoryName?: string
  cityName?: string
  stateName?: string
  donationTypeName?: string
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface CreateInstitutionData {
  name: string
  description: string
  address: string
  city: string
  state: string
  phone: string
  email: string
  website?: string
  cnpj: string
  responsibleName: string
  responsibleCpf: string
  operatingHours?: string
  additionalInfo?: string
  categoryIds: string[]
  donationTypeIds: string[]
}

export interface UpdateInstitutionData extends Partial<CreateInstitutionData> {
  id: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
