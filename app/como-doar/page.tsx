"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Phone, Mail, Instagram, Globe, Heart, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import logo from "../../public/logo.png"

export default function ComoDoarePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center gap-3">
              <div className="relative h-[7.75rem] w-[7.75rem]">
                <Image
                  src={logo}
                  alt="Logo DoaFácil"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 12rem, (max-width: 1024px) 14rem, 18rem"
                />
              </div>
              <span className="sr-only">DoaFácil</span>
            </div>
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--doafacil-primary-orange)" }}>
              Como Doar?
            </h2>
            <p className="text-lg text-gray-600 text-pretty">
              Siga estes passos simples para transformar vidas através da sua generosidade
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {/* Step 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: "var(--doafacil-primary-orange)" }}
                  >
                    1
                  </div>
                  <Search className="h-5 w-5" style={{ color: "var(--doafacil-primary-orange)" }} />
                  Encontre a instituição ideal
                </CardTitle>
                <CardDescription>
                  Use o Doa Fácil para buscar e filtrar instituições que combinam com o tipo de doação que você deseja
                  fazer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Nossa plataforma facilita a descoberta de ONGs por categoria, localização e causa. Explore diferentes
                  categorias como educação, saúde, meio ambiente, animais e muito mais.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-900 font-medium mb-1 text-sm">💡 Dica:</p>
                  <p className="text-orange-800 text-sm">
                    Você pode filtrar por região para encontrar instituições próximas a você.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6" style={{ color: "var(--doafacil-primary-orange)" }} />
            </div>

            {/* Step 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: "var(--doafacil-secondary-green)" }}
                  >
                    2
                  </div>
                  <Mail className="h-5 w-5" style={{ color: "var(--doafacil-secondary-green" }} />
                  Acesse as informações de contato
                </CardTitle>
                <CardDescription>
                  O Doa Fácil fornece todas as informações necessárias para você entrar em contato direto com a
                  instituição escolhida
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Você terá acesso aos seguintes canais de contato:</p>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <Globe className="w-5 h-5 text-blue-600 mb-2" />
                    <p className="font-semibold text-blue-900 text-sm">Website</p>
                    <p className="text-xs text-blue-700">Site oficial da ONG</p>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                    <Instagram className="w-5 h-5 text-pink-600 mb-2" />
                    <p className="font-semibold text-pink-900 text-sm">Instagram</p>
                    <p className="text-xs text-pink-700">Perfil nas redes sociais</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <Phone className="w-5 h-5 text-green-600 mb-2" />
                    <p className="font-semibold text-green-900 text-sm">Telefone</p>
                    <p className="text-xs text-green-700">Contato direto</p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-900 font-medium mb-1 text-sm">ℹ️ Importante:</p>
                  <p className="text-green-800 text-sm">
                    Todas as informações de contato são verificadas e atualizadas regularmente.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowRight className="w-6 h-6" style={{ color: "var(--doafacil-secondary-green" }} />
            </div>

            {/* Step 3 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: "var(--doafacil-neutral-blue)" }}
                  >
                    3
                  </div>
                  <CheckCircle2 className="h-5 w-5" style={{ color: "var(--doafacil-neutral-blue)" }} />
                  Entre em contato e realize sua doação
                </CardTitle>
                <CardDescription>
                  Com as informações em mãos, entre em contato diretamente com a instituição para combinar os detalhes
                  da sua doação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Cada ONG tem seus próprios processos e formas de receber doações. Ao entrar em contato:
                </p>
                <div className="space-y-3 mb-4">
                  
                  <div className="flex items-start gap-2">
                    <CheckCircle2
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "var(--doafacil-neutral-blue)" }}
                    />
                    <p className="text-gray-700 text-sm">
                      <strong>Combine a entrega:</strong> Defina como e quando você pode fazer a doação
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "var(--doafacil-neutral-blue)" }}
                    />
                    <p className="text-gray-700 text-sm">
                      <strong>Solicite comprovante:</strong> Peça um recibo ou comprovante da sua doação, se necessário
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900 font-medium mb-1 text-sm">✨ Lembre-se:</p>
                  <p className="text-blue-800 text-sm">
                    O Doa Fácil é uma plataforma de conexão. A doação é feita diretamente entre você e a instituição,
                    garantindo que 100% da sua generosidade chegue a quem precisa.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="mt-12">
            <Card className="border-2" style={{ borderColor: "var(var(--doafacil-primary-orange))" }}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--doafacil-primary-orange)" }}>
                    Pronto para fazer a diferença?
                  </h3>
                  <p className="text-gray-600 mb-6 text-pretty">
                    Comece agora a buscar pela instituição perfeita para sua doação
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                      <Button
                        size="lg"
                        className="text-white font-semibold px-8"
                        style={{ backgroundColor: "var(--doafacil-primary-orange)", cursor: "pointer" }}
                      >
                        Voltar ao Início e buscar
                        <Search className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
