import { z } from 'zod'

// Validação de CNPJ
export const cnpjSchema = z.string()
  .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX')
  .refine((cnpj) => {
    // Remove caracteres não numéricos
    const numbers = cnpj.replace(/\D/g, '')
    
    // Verifica se tem 14 dígitos
    if (numbers.length !== 14) return false
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(numbers)) return false
    
    // Validação do primeiro dígito verificador
    let sum = 0
    let weight = 5
    for (let i = 0; i < 12; i++) {
      sum += parseInt(numbers[i]) * weight
      weight = weight === 2 ? 9 : weight - 1
    }
    const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (parseInt(numbers[12]) !== firstDigit) return false
    
    // Validação do segundo dígito verificador
    sum = 0
    weight = 6
    for (let i = 0; i < 13; i++) {
      sum += parseInt(numbers[i]) * weight
      weight = weight === 2 ? 9 : weight - 1
    }
    const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (parseInt(numbers[13]) !== secondDigit) return false
    
    return true
  }, 'CNPJ inválido')

// Validação de CPF
export const cpfSchema = z.string()
  .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF deve estar no formato XXX.XXX.XXX-XX')
  .refine((cpf) => {
    // Remove caracteres não numéricos
    const numbers = cpf.replace(/\D/g, '')
    
    // Verifica se tem 11 dígitos
    if (numbers.length !== 11) return false
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(numbers)) return false
    
    // Validação do primeiro dígito verificador
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers[i]) * (10 - i)
    }
    const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (parseInt(numbers[9]) !== firstDigit) return false
    
    // Validação do segundo dígito verificador
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers[i]) * (11 - i)
    }
    const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    if (parseInt(numbers[10]) !== secondDigit) return false
    
    return true
  }, 'CPF inválido')

// Validação de email
export const emailSchema = z.string().email('Email inválido')

// Validação de telefone brasileiro
export const phoneSchema = z.string()
  .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, 'Telefone deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX')

// Validação de estado brasileiro
export const stateSchema = z.string()
  .length(2, 'Estado deve ter 2 caracteres')
  .regex(/^[A-Z]{2}$/, 'Estado deve ser uma sigla válida')

// Schema para criação de instituição
export const createInstitutionSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(255, 'Nome muito longo'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres').max(500, 'Endereço muito longo'),
  city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres').max(100, 'Cidade muito longa'),
  state: stateSchema,
  phone: phoneSchema,
  email: emailSchema,
  website: z.string().url('Website deve ser uma URL válida').optional().or(z.literal('')),
  cnpj: cnpjSchema,
  responsibleName: z.string().min(2, 'Nome do responsável deve ter pelo menos 2 caracteres').max(255, 'Nome muito longo'),
  responsibleCpf: cpfSchema,
  operatingHours: z.string().max(100, 'Horário de funcionamento muito longo').optional(),
  additionalInfo: z.string().max(1000, 'Informações adicionais muito longas').optional(),
  categoryIds: z.array(z.string().uuid('ID de categoria inválido')).min(1, 'Selecione pelo menos uma categoria'),
  donationTypeIds: z.array(z.string().uuid('ID de tipo de doação inválido')).min(1, 'Selecione pelo menos um tipo de doação')
})

// Schema para atualização de instituição
export const updateInstitutionSchema = createInstitutionSchema.partial().extend({
  id: z.string().uuid('ID inválido')
})

// Schema para busca de instituições
export const searchInstitutionsSchema = z.object({
  searchText: z.string().optional(),
  categoryName: z.string().optional(),
  cityName: z.string().optional(),
  stateName: z.string().optional(),
  donationTypeName: z.string().optional(),
  page: z.coerce.number().min(1, 'Página deve ser maior que 0').default(1),
  limit: z.coerce.number().min(1, 'Limite deve ser maior que 0').max(100, 'Limite máximo é 100').default(10)
})

// Schema para criação de categoria
export const createCategorySchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
  description: z.string().max(500, 'Descrição muito longa').optional()
})

// Schema para criação de tipo de doação
export const createDonationTypeSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
  description: z.string().max(500, 'Descrição muito longa').optional()
})
