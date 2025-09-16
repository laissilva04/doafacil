"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Heart,
  Users,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Phone,
  Mail,
  MapPin,
  Globe,
  Calendar,
} from "lucide-react"
import Link from "next/link"

// Mock data for pending applications
const pendingApplications = [
  {
    id: 1,
    name: "Associação Amigos do Bem",
    description: "Organização focada em ajudar famílias em situação de vulnerabilidade social.",
    categories: ["Assistência Social", "Crianças"],
    location: "Salvador, BA",
    email: "contato@amigosbem.org.br",
    phone: "(71) 3333-4444",
    website: "https://amigosbem.org.br",
    responsibleName: "Maria Silva Santos",
    responsibleCpf: "123.456.789-00",
    cnpj: "12.345.678/0001-90",
    acceptedDonations: ["Alimentos", "Roupas", "Medicamentos"],
    submittedAt: "2024-01-15",
    status: "pending",
  },
  {
    id: 2,
    name: "Instituto Tecnologia Social",
    description: "Promove inclusão digital e educação tecnológica para jovens de baixa renda.",
    categories: ["Educação", "Tecnologia"],
    location: "Recife, PE",
    email: "contato@techsocial.org.br",
    phone: "(81) 2222-3333",
    website: "https://techsocial.org.br",
    responsibleName: "João Carlos Oliveira",
    responsibleCpf: "987.654.321-00",
    cnpj: "98.765.432/0001-10",
    acceptedDonations: ["Equipamentos", "Material Escolar", "Computadores"],
    submittedAt: "2024-01-12",
    status: "pending",
  },
  {
    id: 3,
    name: "Lar Esperança Animal",
    description: "Abrigo para animais abandonados com foco em reabilitação e adoção responsável.",
    categories: ["Animais"],
    location: "Florianópolis, SC",
    email: "contato@laresperanca.org.br",
    phone: "(48) 1111-2222",
    website: "",
    responsibleName: "Ana Paula Costa",
    responsibleCpf: "456.789.123-00",
    cnpj: "45.678.912/0001-34",
    acceptedDonations: ["Ração", "Medicamentos Veterinários", "Cobertores", "Brinquedos"],
    submittedAt: "2024-01-10",
    status: "pending",
  },
]

// Mock data for approved ONGs
const approvedOngs = [
  {
    id: 1,
    name: "Instituto Criança Feliz",
    categories: ["Crianças", "Educação"],
    location: "São Paulo, SP",
    approvedAt: "2024-01-05",
    status: "active",
  },
  {
    id: 2,
    name: "Lar dos Idosos São Vicente",
    categories: ["Idosos", "Saúde"],
    location: "Rio de Janeiro, RJ",
    approvedAt: "2024-01-03",
    status: "active",
  },
  {
    id: 3,
    name: "Proteção Animal Unidos",
    categories: ["Animais"],
    location: "Belo Horizonte, MG",
    approvedAt: "2023-12-28",
    status: "active",
  },
  {
    id: 4,
    name: "Verde Esperança",
    categories: ["Meio Ambiente"],
    location: "Curitiba, PR",
    approvedAt: "2023-12-25",
    status: "active",
  },
]

export default function AdminDashboard() {
  const [applications, setApplications] = useState(pendingApplications)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  const handleApprove = (id: number) => {
    setApplications((prev) => prev.filter((app) => app.id !== id))
    // In a real app, this would make an API call
    console.log(`[v0] Approved application ${id}`)
  }

  const handleReject = (id: number) => {
    setApplications((prev) => prev.filter((app) => app.id !== id))
    // In a real app, this would make an API call
    console.log(`[v0] Rejected application ${id}`)
  }

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application)
    setShowDetails(true)
  }

  const stats = {
    totalOngs: approvedOngs.length,
    pendingApplications: applications.length,
    totalDonations: 1247, // Mock number
    activeUsers: 3456, // Mock number
  }

  if (showDetails && selectedApplication) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <Heart className="h-8 w-8" style={{ color: "var(--doafacil-orange)" }} />
                <h1 className="text-2xl font-bold text-gray-900">DoaFácil Admin</h1>
              </Link>
              <Button variant="outline" onClick={() => setShowDetails(false)} className="flex items-center gap-2">
                ← Voltar
              </Button>
            </div>
          </div>
        </header>

        {/* Application Details */}
        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Detalhes da Aplicação</h2>
              <p className="text-gray-600">Revise todas as informações antes de aprovar ou rejeitar.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" style={{ color: "var(--doafacil-orange)" }} />
                      Informações da Instituição
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{selectedApplication.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{selectedApplication.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Localização</h4>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          {selectedApplication.location}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Data de Submissão</h4>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(selectedApplication.submittedAt).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Categorias</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.categories.map((category: string) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            style={{ backgroundColor: "var(--doafacil-light-gray)", color: "#374151" }}
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Tipos de Doações Aceitas</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.acceptedDonations.map((donation: string) => (
                          <Badge
                            key={donation}
                            variant="outline"
                            style={{ borderColor: "var(--doafacil-green)", color: "var(--doafacil-green)" }}
                          >
                            {donation}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" style={{ color: "var(--doafacil-green)" }} />
                      Informações de Contato
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-3" />
                      <span className="text-sm">{selectedApplication.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-3" />
                      <span className="text-sm">{selectedApplication.phone}</span>
                    </div>
                    {selectedApplication.website && (
                      <div className="flex items-center text-gray-600">
                        <Globe className="h-4 w-4 mr-3" />
                        <a
                          href={selectedApplication.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                          style={{ color: "var(--doafacil-orange)" }}
                        >
                          {selectedApplication.website}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Informações Legais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-900">Responsável: </span>
                      <span className="text-gray-600">{selectedApplication.responsibleName}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">CPF: </span>
                      <span className="text-gray-600">{selectedApplication.responsibleCpf}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">CNPJ: </span>
                      <span className="text-gray-600">{selectedApplication.cnpj}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Actions Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ações</CardTitle>
                    <CardDescription>Revise cuidadosamente antes de tomar uma decisão.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={() => handleApprove(selectedApplication.id)}
                      className="w-full text-white font-semibold"
                      style={{ backgroundColor: "var(--doafacil-green)" }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Aprovar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(selectedApplication.id)}
                      className="w-full"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Rejeitar
                    </Button>
                  </CardContent>
                </Card>

                <Alert>
                  <AlertDescription className="text-sm">
                    <strong>Lembrete:</strong> Após aprovar, a instituição aparecerá na listagem pública e receberá um
                    email de confirmação.
                  </AlertDescription>
                </Alert>
              </div>
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
              <h1 className="text-2xl font-bold text-gray-900">DoaFácil Admin</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-3 py-1">
                Administrador
              </Badge>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Ver Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Administrativo</h2>
            <p className="text-gray-600">Gerencie aplicações de ONGs e monitore a plataforma.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">ONGs Ativas</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalOngs}</p>
                  </div>
                  <Building className="h-8 w-8" style={{ color: "var(--doafacil-green)" }} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pendentes</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingApplications}</p>
                  </div>
                  <Clock className="h-8 w-8" style={{ color: "var(--doafacil-orange)" }} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Doações</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalDonations}</p>
                  </div>
                  <Heart className="h-8 w-8" style={{ color: "var(--doafacil-light-blue)" }} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Usuários</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                  </div>
                  <Users className="h-8 w-8" style={{ color: "var(--doafacil-green)" }} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Aplicações Pendentes ({applications.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                ONGs Aprovadas ({approvedOngs.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-6">
              {applications.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma aplicação pendente</h3>
                    <p className="text-gray-600">Todas as aplicações foram processadas.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {applications.map((application) => (
                    <Card key={application.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{application.name}</CardTitle>
                            <div className="flex items-center text-gray-500 text-sm mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {application.location}
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            style={{ backgroundColor: "var(--doafacil-orange)", color: "white" }}
                          >
                            Pendente
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{application.description}</p>

                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {application.categories.map((category) => (
                              <Badge
                                key={category}
                                variant="outline"
                                className="text-xs"
                                style={{ borderColor: "var(--doafacil-light-gray)" }}
                              >
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 mb-4">
                          Submetido em {new Date(application.submittedAt).toLocaleDateString("pt-BR")}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(application)}
                            className="flex-1"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver Detalhes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {approvedOngs.map((ong) => (
                  <Card key={ong.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{ong.name}</CardTitle>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {ong.location}
                          </div>
                        </div>
                        <Badge variant="secondary" style={{ backgroundColor: "var(--doafacil-green)", color: "white" }}>
                          Ativa
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {ong.categories.map((category) => (
                            <Badge
                              key={category}
                              variant="outline"
                              className="text-xs"
                              style={{ borderColor: "var(--doafacil-light-gray)" }}
                            >
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-xs text-gray-500">
                        Aprovado em {new Date(ong.approvedAt).toLocaleDateString("pt-BR")}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
