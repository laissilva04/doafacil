"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Globe, Phone, Users, Handshake, TreePine, Baby } from "lucide-react"
import Image from "next/image"
import logo from "../public/logo.png"
import logobranca from "../public/logo-branca.png"

// Mock data for ONGs
const mockOngs = [
  {
    id: 1,
    name: "Instituto Criança Feliz",
    description: "Dedicada ao cuidado e educação de crianças em situação de vulnerabilidade social.",
    categories: ["Crianças", "Educação"],
    location: "São Paulo, SP",
    website: "https://criancafeliz.org.br",
    phone: "(11) 1234-5678",
    acceptedDonations: ["Roupas", "Brinquedos", "Material Escolar"],
  },
  {
    id: 2,
    name: "Lar dos Idosos São Vicente",
    description: "Casa de repouso que oferece cuidados especializados para idosos.",
    categories: ["Idosos", "Saúde"],
    location: "Rio de Janeiro, RJ",
    website: "https://larsaovicente.org.br",
    phone: "(21) 9876-5432",
    acceptedDonations: ["Medicamentos", "Fraldas", "Alimentos"],
  },
  {
    id: 3,
    name: "Proteção Animal Unidos",
    description: "ONG focada no resgate e cuidado de animais abandonados.",
    categories: ["Animais"],
    location: "Belo Horizonte, MG",
    website: "https://protecaoanimal.org.br",
    phone: "(31) 5555-1234",
    acceptedDonations: ["Ração", "Medicamentos Veterinários", "Cobertores"],
  },
]

const categories = ["Todas", "Crianças", "Idosos", "Animais", "Educação", "Saúde"]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [filteredOngs, setFilteredOngs] = useState(mockOngs)

  const handleSearch = () => {
    let filtered = mockOngs

    if (searchTerm) {
      filtered = filtered.filter(
        (ong) =>
          ong.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ong.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ong.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "Todas") {
      filtered = filtered.filter((ong) => ong.categories.includes(selectedCategory))
    }

    setFilteredOngs(filtered)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    let filtered = mockOngs

    if (category !== "Todas") {
      filtered = filtered.filter((ong) => ong.categories.includes(category))
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (ong) =>
          ong.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ong.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ong.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredOngs(filtered)
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div
        className="absolute top-20 right-10 w-32 h-32 rounded-full opacity-10 z-0"
        style={{ backgroundColor: "var(--doafacil-secondary-green)" }}
      ></div>
      <div
        className="absolute top-96 left-0 w-24 h-24 rounded-full opacity-15 z-0"
        style={{ backgroundColor: "var(--doafacil-accent-purple)" }}
      ></div>
      <div
        className="absolute bottom-40 right-20 w-40 h-40 rounded-full opacity-10 z-0"
        style={{ backgroundColor: "var(--doafacil-primary-orange)" }}
      ></div>

      {/* Header */}
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky 
      top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image src={logo} alt="Logo DoaFácil"  className="h-31 w-31 object-contain" />
              </div>
             
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                ONGs
              </a>
              <a href="/cadastrar-ong" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                Cadastrar ONG
              </a>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundColor: "var(--doafacil-background-yellow)" }}
        ></div>

        {/* Decorative shapes */}
        <div
          className="absolute top-10 right-1/4 w-20 h-20 rounded-full opacity-20"
          style={{ backgroundColor: "var(--doafacil-accent-purple)" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-16 h-16 rounded-full opacity-25"
          style={{ backgroundColor: "var(--doafacil-secondary-green)" }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Transforme
                  <span className="block" style={{ color: "var(--doafacil-primary-orange)" }}>
                    vidas com sua
                  </span>
                  <span className="block">generosidade</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Sua doação pode mudar vidas. Conectamos corações generosos com instituições que fazem a diferença.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="text-white font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                      style={{ backgroundColor: "var(--doafacil-primary-orange)" }}
                    >
                      <a href="/como-doar">Como Doar</a>
                    </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 font-bold px-8 py-4 text-lg rounded-full bg-white hover:bg-gray-50 transition-all"
                    style={{
                      borderColor: "var(--doafacil-secondary-green)",
                      color: "var(--doafacil-secondary-green)",
                    }}
                  >
                    <a
                      href="https://www.instagram.com/doafacil.unifor"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Saiba Mais
                    </a>
                  </Button>
                </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="w-80 h-80 mx-auto rounded-full overflow-hidden shadow-2xl border-8 border-white">
                  <img
                    src="/box.png"
                    alt="Crianças felizes brincando"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Decorative elements around the image */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-80"
                style={{ backgroundColor: "var(--doafacil-secondary-green)" }}
              ></div>
              <div
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full opacity-60"
                style={{ backgroundColor: "var(--doafacil-neutral-blue)" }}
              ></div>
              <div
                className="absolute top-1/2 -right-8 w-16 h-16 rounded-full opacity-70"
                style={{ backgroundColor: "var(--doafacil-accent-purple)" }}
              ></div>

              {/* Decorative lines */}
              <div
                className="absolute top-20 -left-10 w-20 h-1 opacity-40"
                style={{ backgroundColor: "var(--doafacil-primary-orange)" }}
              ></div>
              <div
                className="absolute bottom-32 -right-12 w-16 h-1 opacity-40"
                style={{ backgroundColor: "var(--doafacil-secondary-green)" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <p
              className="text-sm font-semibold tracking-wide uppercase mb-4"
              style={{ color: "var(--doafacil-accent-purple)" }}
            >
              Formas de Ajudar
            </p>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Você pode nos ajudar de diversas maneiras.
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Sua doação pode mudar vidas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Baby,
                title: "Ajuda monetária",
                desc: "Contribuições financeiras que chegam diretamente às instituições",
              },
              {
                icon: Handshake,
                title: "Doação de alimentos",
                desc: "Alimentos não perecíveis que alimentam famílias inteiras",
              },
              {
                icon: Users,
                title: "Roupas e calçados",
                desc: "Vestimentas que aquecem e dignificam pessoas em necessidade",
              },
              {
                icon: TreePine,
                title: "Brinquedos e livros",
                desc: "Itens que trazem alegria e educação para crianças",
              },
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: `var(--doafacil-${index % 2 === 0 ? "secondary-green" : "neutral-blue"})`,
                    }}
                  >
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section id="instituicoes" className="py-12 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Encontre Instituições</h3>
            <p className="text-lg text-gray-600">Descubra ONGs próximas a você que precisam da sua ajuda</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Buscar por nome, localização ou tipo de doação..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg rounded-xl border-gray-200 focus:border-orange-300"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button
                onClick={handleSearch}
                className="h-14 px-8 text-white font-bold text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
                style={{ backgroundColor: "var(--doafacil-primary-orange)" }}
              >
                <Search className="h-5 w-5 mr-2" />
                Buscar
              </Button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-gray-600 font-medium">
                <Filter className="h-5 w-5" />
                Filtrar por:
              </div>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryClick(category)}
                  className={`rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "text-white shadow-md"
                      : "text-gray-600 border-gray-300 hover:border-gray-400"
                  }`}
                  style={selectedCategory === category ? { backgroundColor: "var(--doafacil-accent-purple)" } : {}}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ONGs Listing */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {filteredOngs.length} {filteredOngs.length === 1 ? "Instituição Encontrada" : "Instituições Encontradas"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOngs.map((ong) => (
              <Card
                key={ong.id}
                className="hover:shadow-xl transition-all duration-300 border-0 shadow-md rounded-2xl overflow-hidden bg-white"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 mb-3 leading-tight">{ong.name}</CardTitle>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <MapPin className="h-4 w-4 mr-2" />
                        {ong.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ong.categories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{ backgroundColor: "var(--doafacil-background-yellow)", color: "#374151" }}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {ong.description}
                  </CardDescription>

                  <div className="mb-6">
                    <h4 className="font-bold text-sm text-gray-900 mb-3">Aceita doações de:</h4>
                    <div className="flex flex-wrap gap-2">
                      {ong.acceptedDonations.map((donation) => (
                        <Badge
                          key={donation}
                          variant="outline"
                          className="text-xs font-medium px-3 py-1 rounded-full border-2"
                          style={{
                            borderColor: "var(--doafacil-secondary-green)",
                            color: "var(--doafacil-secondary-green)",
                          }}
                        >
                          {donation}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={ong.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-medium hover:underline transition-colors"
                      style={{ color: "var(--doafacil-neutral-blue)" }}
                    >
                      <Globe className="h-4 w-4 mr-3" />
                      Visitar Site
                    </a>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-3" />
                      {ong.phone}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredOngs.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-300 mb-6">
                <Search className="h-20 w-20 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Nenhuma instituição encontrada</h3>
              <p className="text-gray-600 text-lg">Tente ajustar seus filtros ou termo de busca.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative">
        <div
          className="absolute top-0 left-1/4 w-32 h-32 rounded-full opacity-5"
          style={{ backgroundColor: "var(--doafacil-primary-orange)" }}
        ></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3">
                <Image src={logobranca} alt="Logo DoaFácil"  className="h-42 w-42 object-contain" />
              </div>
              <p className="text-gray-300 leading-relaxed">
                Conectando pessoas generosas com instituições que fazem a diferença. Juntos, podemos transformar vidas
                através da solidariedade.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 mt-8">Links Úteis</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/como-doar" className="text-gray-300 hover:text-white transition-colors">
                    Como Doar
                  </a>
                </li>
                <li>
                  <a href="/cadastrar-ong" className="text-gray-300 hover:text-white transition-colors">
                    Cadastrar ONG
                  </a>
                </li>
                <li>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6  mt-8">Contato</h4>
              <div className="text-gray-300 space-y-3">
                <p>doafacilunifor@gmail.com</p>
                <p>Fortaleza, CE</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DoaFácil. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
