"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart, MapPin, Phone, Mail, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function AdoptPage() {
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecies, setFilterSpecies] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")

  const animalsForAdoption = [
    {
      id: 1,
      name: "Luna",
      species: "Perro",
      breed: "Mestizo",
      age: "2 años aprox.",
      gender: "Hembra",
      location: "São Paulo, Brasil",
      clinic: "Animal Rescue Center",
      description:
        "Luna es una perra muy cariñosa que fue rescatada de las calles. Le encanta jugar y es muy sociable con otros animales.",
      image: "/friendly-brown-dog-rescue.jpg",
      healthStatus: "Saludable",
      vaccinated: true,
      sterilized: true,
      contact: {
        phone: "+55 11 9999-8888",
        email: "adopciones@animalrescue.br",
      },
    },
    {
      id: 2,
      name: "Michi",
      species: "Gato",
      breed: "Siamés",
      age: "1 año aprox.",
      gender: "Macho",
      location: "Ciudad de México, México",
      clinic: "Hope Veterinary",
      description:
        "Michi es un gato muy inteligente y juguetón. Fue encontrado siendo muy pequeño y ahora busca una familia amorosa.",
      image: "/siamese-cat-blue-eyes.jpg",
      healthStatus: "Saludable",
      vaccinated: true,
      sterilized: false,
      contact: {
        phone: "+52 55 1234-5678",
        email: "adopciones@hopevet.mx",
      },
    },
    {
      id: 3,
      name: "Coco",
      species: "Conejo",
      breed: "Holandés",
      age: "6 meses aprox.",
      gender: "Hembra",
      location: "Mumbai, India",
      clinic: "Street Paws Clinic",
      description:
        "Coco es una conejita muy tranquila y dulce. Le gusta estar en espacios abiertos y comer vegetales frescos.",
      image: "/white-brown-rabbit-cute.jpg",
      healthStatus: "Saludable",
      vaccinated: true,
      sterilized: true,
      contact: {
        phone: "+91 98765-43210",
        email: "adopt@streetpaws.in",
      },
    },
    {
      id: 4,
      name: "Pío",
      species: "Ave",
      breed: "Canario",
      age: "8 meses aprox.",
      gender: "Macho",
      location: "Bangkok, Tailandia",
      clinic: "Care4Animals",
      description:
        "Pío es un canario muy alegre que canta hermosas melodías. Necesita una jaula espaciosa y mucho cariño.",
      image: "/yellow-canary-bird-singing.jpg",
      healthStatus: "Saludable",
      vaccinated: true,
      sterilized: false,
      contact: {
        phone: "+66 2 123-4567",
        email: "adoption@care4animals.th",
      },
    },
    {
      id: 5,
      name: "Max",
      species: "Perro",
      breed: "Labrador",
      age: "3 años aprox.",
      gender: "Macho",
      location: "Nairobi, Kenia",
      clinic: "Rescue Vet Clinic",
      description:
        "Max es un perro muy leal y protector. Es perfecto para familias con niños y le encanta correr al aire libre.",
      image: "/golden-labrador-dog-happy.jpg",
      healthStatus: "Saludable",
      vaccinated: true,
      sterilized: true,
      contact: {
        phone: "+254 20 123-4567",
        email: "adopt@rescuevet.ke",
      },
    },
    {
      id: 6,
      name: "Nala",
      species: "Gato",
      breed: "Persa",
      age: "4 años aprox.",
      gender: "Hembra",
      location: "Buenos Aires, Argentina",
      clinic: "Refugio Esperanza",
      description:
        "Nala es una gata muy elegante y tranquila. Le gusta descansar en lugares cómodos y recibir caricias.",
      image: "/persian-cat-long-hair-gray.jpg",
      healthStatus: "Saludable",
      vaccinated: true,
      sterilized: true,
      contact: {
        phone: "+54 11 4567-8901",
        email: "adopciones@refugioesperanza.ar",
      },
    },
  ]

  const filteredAnimals = animalsForAdoption.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecies = filterSpecies === "all" || animal.species.toLowerCase() === filterSpecies.toLowerCase()
    const matchesLocation = filterLocation === "all" || animal.location.includes(filterLocation)

    return matchesSearch && matchesSpecies && matchesLocation
  })

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Animales Disponibles para Adopción
            </h1>
            <p className="max-w-[600px] mx-auto text-muted-foreground text-lg">
              Encuentra tu nuevo compañero de vida. Cada adopción salva una vida y hace espacio para rescatar más
              animales.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, raza o ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterSpecies} onValueChange={setFilterSpecies}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Tipo de animal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="perro">Perros</SelectItem>
                  <SelectItem value="gato">Gatos</SelectItem>
                  <SelectItem value="conejo">Conejos</SelectItem>
                  <SelectItem value="ave">Aves</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Brasil">Brasil</SelectItem>
                  <SelectItem value="México">México</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="Tailandia">Tailandia</SelectItem>
                  <SelectItem value="Kenia">Kenia</SelectItem>
                  <SelectItem value="Argentina">Argentina</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Animals Grid */}
      <section className="py-8">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnimals.map((animal) => (
              <Card key={animal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image src={animal.image || "/placeholder.svg"} alt={animal.name} fill className="object-cover" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/90">
                      {animal.species}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{animal.name}</CardTitle>
                    <Heart className="h-5 w-5 text-muted-foreground hover:text-red-500 cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {animal.location}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Raza:</span> {animal.breed}
                    </div>
                    <div>
                      <span className="font-medium">Edad:</span> {animal.age}
                    </div>
                    <div>
                      <span className="font-medium">Sexo:</span> {animal.gender}
                    </div>
                    <div>
                      <span className="font-medium">Estado:</span> {animal.healthStatus}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {animal.vaccinated && (
                      <Badge variant="outline" className="text-xs">
                        Vacunado
                      </Badge>
                    )}
                    {animal.sterilized && (
                      <Badge variant="outline" className="text-xs">
                        Esterilizado
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{animal.description}</p>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Contactar para Adopción</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Adoptar a {animal.name}</DialogTitle>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative h-64 md:h-80">
                          <Image
                            src={animal.image || "/placeholder.svg"}
                            alt={animal.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Información del Animal</h3>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium">Nombre:</span> {animal.name}
                              </div>
                              <div>
                                <span className="font-medium">Especie:</span> {animal.species}
                              </div>
                              <div>
                                <span className="font-medium">Raza:</span> {animal.breed}
                              </div>
                              <div>
                                <span className="font-medium">Edad:</span> {animal.age}
                              </div>
                              <div>
                                <span className="font-medium">Sexo:</span> {animal.gender}
                              </div>
                              <div>
                                <span className="font-medium">Estado de salud:</span> {animal.healthStatus}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-2">Descripción</h3>
                            <p className="text-sm text-muted-foreground">{animal.description}</p>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-2">Contacto - {animal.clinic}</h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4" />
                                {animal.contact.phone}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4" />
                                {animal.contact.email}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4" />
                                {animal.location}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-4">
                            <Button className="flex-1">
                              <Phone className="h-4 w-4 mr-2" />
                              Llamar
                            </Button>
                            <Button variant="outline" className="flex-1 bg-transparent">
                              <Mail className="h-4 w-4 mr-2" />
                              Email
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAnimals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron animales con los filtros seleccionados.</p>
            </div>
          )}
        </div>
      </section>

      {/* Inspirational Message */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4 md:text-3xl">Ahora ayudar es mucho más fácil</h2>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed">
            Con solo unos clics, puedes marcar la diferencia en la vida de un animal que necesita nuestro apoyo. Tu
            aporte, por pequeño que sea, suma esperanza y mejora su futuro. Juntos, podemos transformar la historia de
            los animales callejeros.
          </p>
        </div>
      </section>
    </main>
  )
}
