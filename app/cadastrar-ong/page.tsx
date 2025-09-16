"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, ArrowLeft, CheckCircle, Building, Mail, Phone } from "lucide-react"
import Link from "next/link"

const categories = [
  "Crianças",
  "Idosos",
  "Animais",
  "Meio Ambiente",
  "Educação",
  "Saúde",
  "Assistência Social",
  "Cultura",
]

const donationTypes = [
  "Roupas",
  "Alimentos",
  "Medicamentos",
  "Brinquedos",
  "Material Escolar",
  "Móveis",
  "Eletrodomésticos",
  "Livros",
  "Equipamentos",
  "Ração",
  "Fraldas",
  "Cobertores",
  "Ferramentas",
  "Mudas",
  "Material de Limpeza",
  "Outros",
]

interface FormData {
  name: string
  description: string
  address: string
  city: string
  state: string
  phone: string
  email: string
  website: string
  responsibleName: string
  responsibleCpf: string
  cnpj: string
  categories: string[]
  acceptedDonations: string[]
  operatingHours: string
  additionalInfo: string
}

export default function CadastrarOngPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    website: "",
    responsibleName: "",
    responsibleCpf: "",
    cnpj: "",
    categories: [],
    acceptedDonations: [],
    operatingHours: "",
    additionalInfo: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, category] : prev.categories.filter((c) => c !== category),
    }))
  }

  const handleDonationTypeChange = (donationType: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      acceptedDonations: checked
        ? [...prev.acceptedDonations, donationType]
        : prev.acceptedDonations.filter((d) => d !== donationType),
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Nome da instituição é obrigatório"
    if (!formData.description.trim()) newErrors.description = "Descrição é obrigatória"
    if (!formData.address.trim()) newErrors.address = "Endereço é obrigatório"
    if (!formData.city.trim()) newErrors.city = "Cidade é obrigatória"
    if (!formData.state.trim()) newErrors.state = "Estado é obrigatório"
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório"
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório"
    if (!formData.responsibleName.trim()) newErrors.responsibleName = "Nome do responsável é obrigatório"
    if (!formData.responsibleCpf.trim()) newErrors.responsibleCpf = "CPF do responsável é obrigatório"
    if (!formData.cnpj.trim()) newErrors.cnpj = "CNPJ é obrigatório"

    if (formData.categories.length === 0) newErrors.categories = "Selecione pelo menos uma categoria"
    if (formData.acceptedDonations.length === 0) newErrors.acceptedDonations = "Selecione pelo menos um tipo de doação"

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <Heart className="h-8 w-8" style={{ color: "var(--doafacil-orange)" }} />
                <h1 className="text-2xl font-bold text-gray-900">DoaFácil</h1>
              </Link>
            </div>
          </div>
        </header>

        {/* Success Message */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="h-24 w-24 mx-auto mb-6" style={{ color: "var(--doafacil-green)" }} />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Cadastro Enviado com Sucesso!</h2>
              <p className="text-lg text-gray-600 mb-6 text-pretty">
                Obrigado por se cadastrar na DoaFácil! Sua instituição foi registrada e está aguardando aprovação.
              </p>
            </div>

            <Alert className="mb-8 text-left" style={{ borderColor: "var(--doafacil-light-blue)" }}>
              <AlertDescription className="text-sm leading-relaxed">
                <strong>Próximos passos:</strong>
                <br />• Nossa equipe irá analisar as informações fornecidas
                <br />• Você receberá um email de confirmação em até 48 horas
                <br />• Após a aprovação, sua instituição aparecerá na listagem do site
                <br />• Em caso de dúvidas, entre em contato conosco
              </AlertDescription>
            </Alert>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="text-white font-semibold px-8"
                  style={{ backgroundColor: "var(--doafacil-green)" }}
                >
                  Voltar ao Início
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-2 font-semibold px-8 bg-transparent"
                style={{ borderColor: "var(--doafacil-orange)", color: "var(--doafacil-orange)" }}
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({
                    name: "",
                    description: "",
                    address: "",
                    city: "",
                    state: "",
                    phone: "",
                    email: "",
                    website: "",
                    responsibleName: "",
                    responsibleCpf: "",
                    cnpj: "",
                    categories: [],
                    acceptedDonations: [],
                    operatingHours: "",
                    additionalInfo: "",
                  })
                }}
              >
                Cadastrar Outra Instituição
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-8 w-8" style={{ color: "var(--doafacil-orange)" }} />
              <h1 className="text-2xl font-bold text-gray-900">DoaFácil</h1>
            </Link>
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </div>
        </div>
      </header>

      {/* Form Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cadastrar Instituição</h2>
            <p className="text-lg text-gray-600 text-pretty">
              Preencha as informações abaixo para cadastrar sua ONG ou instituição na plataforma DoaFácil.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" style={{ color: "var(--doafacil-orange)" }} />
                Informações da Instituição
              </CardTitle>
              <CardDescription>Todos os campos marcados com * são obrigatórios</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">Nome da Instituição *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Ex: Instituto Criança Feliz"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Descrição da Instituição *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Descreva os objetivos e atividades da sua instituição..."
                      rows={4}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address">Endereço Completo *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Rua, número, bairro..."
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="São Paulo"
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <Label htmlFor="state">Estado *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="SP"
                      className={errors.state ? "border-red-500" : ""}
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone className="h-5 w-5" style={{ color: "var(--doafacil-green)" }} />
                    Informações de Contato
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="(11) 1234-5678"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="contato@instituicao.org.br"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="website">Site da Instituição</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://www.instituicao.org.br"
                      />
                    </div>
                  </div>
                </div>

                {/* Legal Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5" style={{ color: "var(--doafacil-light-blue)" }} />
                    Informações Legais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="responsibleName">Nome do Responsável *</Label>
                      <Input
                        id="responsibleName"
                        value={formData.responsibleName}
                        onChange={(e) => handleInputChange("responsibleName", e.target.value)}
                        placeholder="Nome completo"
                        className={errors.responsibleName ? "border-red-500" : ""}
                      />
                      {errors.responsibleName && <p className="text-red-500 text-sm mt-1">{errors.responsibleName}</p>}
                    </div>

                    <div>
                      <Label htmlFor="responsibleCpf">CPF do Responsável *</Label>
                      <Input
                        id="responsibleCpf"
                        value={formData.responsibleCpf}
                        onChange={(e) => handleInputChange("responsibleCpf", e.target.value)}
                        placeholder="000.000.000-00"
                        className={errors.responsibleCpf ? "border-red-500" : ""}
                      />
                      {errors.responsibleCpf && <p className="text-red-500 text-sm mt-1">{errors.responsibleCpf}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="cnpj">CNPJ da Instituição *</Label>
                      <Input
                        id="cnpj"
                        value={formData.cnpj}
                        onChange={(e) => handleInputChange("cnpj", e.target.value)}
                        placeholder="00.000.000/0000-00"
                        className={errors.cnpj ? "border-red-500" : ""}
                      />
                      {errors.cnpj && <p className="text-red-500 text-sm mt-1">{errors.cnpj}</p>}
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorias de Atuação *</h3>
                  <p className="text-sm text-gray-600 mb-4">Selecione as áreas em que sua instituição atua:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={formData.categories.includes(category)}
                          onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        />
                        <Label htmlFor={`category-${category}`} className="text-sm">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.categories && <p className="text-red-500 text-sm mt-2">{errors.categories}</p>}
                </div>

                {/* Donation Types */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipos de Doações Aceitas *</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Selecione os tipos de doações que sua instituição aceita:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {donationTypes.map((donationType) => (
                      <div key={donationType} className="flex items-center space-x-2">
                        <Checkbox
                          id={`donation-${donationType}`}
                          checked={formData.acceptedDonations.includes(donationType)}
                          onCheckedChange={(checked) => handleDonationTypeChange(donationType, checked as boolean)}
                        />
                        <Label htmlFor={`donation-${donationType}`} className="text-sm">
                          {donationType}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.acceptedDonations && <p className="text-red-500 text-sm mt-2">{errors.acceptedDonations}</p>}
                </div>

                {/* Additional Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Adicionais</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="operatingHours">Horário de Funcionamento</Label>
                      <Input
                        id="operatingHours"
                        value={formData.operatingHours}
                        onChange={(e) => handleInputChange("operatingHours", e.target.value)}
                        placeholder="Ex: Segunda a Sexta, 8h às 17h"
                      />
                    </div>

                    <div>
                      <Label htmlFor="additionalInfo">Informações Complementares</Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                        placeholder="Informações adicionais sobre a instituição, procedimentos para doação, etc."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="border-t pt-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <Link href="/">
                      <Button variant="outline" type="button" className="w-full sm:w-auto bg-transparent">
                        Cancelar
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto text-white font-semibold px-8"
                      style={{ backgroundColor: "var(--doafacil-green)" }}
                    >
                      {isSubmitting ? "Enviando..." : "Cadastrar Instituição"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
