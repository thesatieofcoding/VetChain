"use client"

import { useState, useEffect } from "react"
import { MapPin, Clock, AlertTriangle, Heart, Phone, Navigation } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/language-context"

export default function EmergencyMapPage() {
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [userLocation, setUserLocation] = useState(null)

  const { t } = useLanguage()

  // Mock emergency animals data
  const emergencyAnimals = [
    {
      id: 1,
      name: "Perro sin nombre",
      species: "Perro",
      condition: "Herida en pata trasera",
      severity: "Alta",
      location: {
        address: "Av. Paulista, 1000 - São Paulo, Brasil",
        coordinates: { lat: -23.5613, lng: -46.6565 },
        clinic: "Animal Rescue Center",
      },
      foundDate: "2024-01-15",
      requirements: ["Cirugía urgente", "Antibióticos", "Cuidados post-operatorios"],
      expectedRecovery: "7-10 días para caminar normalmente",
      image: "/injured-street-dog-brown.jpg",
      donationsNeeded: 450,
      donationsReceived: 280,
      contact: "+55 11 9999-8888",
    },
    {
      id: 2,
      name: "Gata Mimi",
      species: "Gato",
      condition: "Desnutrición severa",
      severity: "Media",
      location: {
        address: "Colonia Roma Norte - Ciudad de México, México",
        coordinates: { lat: 19.4326, lng: -99.1332 },
        clinic: "Hope Veterinary",
      },
      foundDate: "2024-01-14",
      requirements: ["Alimentación especializada", "Vitaminas", "Monitoreo veterinario"],
      expectedRecovery: "3-4 semanas para peso normal",
      image: "/malnourished-street-cat-orange.jpg",
      donationsNeeded: 200,
      donationsReceived: 150,
      contact: "+52 55 1234-5678",
    },
    {
      id: 3,
      name: "Cachorro rescatado",
      species: "Perro",
      condition: "Infección ocular",
      severity: "Media",
      location: {
        address: "Bandra West - Mumbai, India",
        coordinates: { lat: 19.0596, lng: 72.8295 },
        clinic: "Street Paws Clinic",
      },
      foundDate: "2024-01-13",
      requirements: ["Gotas oftálmicas", "Limpieza diaria", "Seguimiento veterinario"],
      expectedRecovery: "2-3 semanas para recuperación completa",
      image: "/puppy-eye-infection-street.jpg",
      donationsNeeded: 120,
      donationsReceived: 90,
      contact: "+91 98765-43210",
    },
    {
      id: 4,
      name: "Conejo herido",
      species: "Conejo",
      condition: "Fractura en pata",
      severity: "Alta",
      location: {
        address: "Sukhumvit Road - Bangkok, Tailandia",
        coordinates: { lat: 13.7563, lng: 100.5018 },
        clinic: "Care4Animals",
      },
      foundDate: "2024-01-12",
      requirements: ["Radiografías", "Inmovilización", "Analgésicos"],
      expectedRecovery: "4-6 semanas para movilidad normal",
      image: "/injured-rabbit-leg-cast.jpg",
      donationsNeeded: 300,
      donationsReceived: 180,
      contact: "+66 2 123-4567",
    },
  ]

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Location access denied")
        },
      )
    }
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Alta":
        return "destructive"
      case "Media":
        return "default"
      case "Baja":
        return "secondary"
      default:
        return "default"
    }
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const getNearbyAnimals = () => {
    if (!userLocation) return []
    return emergencyAnimals.filter((animal) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        animal.location.coordinates.lat,
        animal.location.coordinates.lng,
      )
      return distance < 50
    })
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-destructive/5 to-background">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{t("emergencyMapTitle")}</h1>
            </div>
            <p className="max-w-[600px] mx-auto text-muted-foreground text-lg">{t("emergencyMapSubtitle")}</p>
          </div>

          {userLocation && getNearbyAnimals().length > 0 && (
            <div className="max-w-4xl mx-auto mb-8">
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <Navigation className="h-5 w-5" />
                    {t("nearbyAlerts")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t("thereAre")} {getNearbyAnimals().length} {t("nearbyAnimalsText")}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Emergency Animals Grid */}
      <section className="py-8">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyAnimals.map((animal) => (
              <Card key={animal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={animal.image || "/placeholder.svg"}
                    alt={animal.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant={getSeverityColor(animal.severity)}>
                      {animal.severity === "Alta"
                        ? t("highPriority")
                        : animal.severity === "Media"
                          ? t("mediumPriority")
                          : t("lowPriority")}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-background/90">
                      {animal.species}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{animal.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {new Date(animal.foundDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {animal.location.address}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-1">{t("condition")}</h4>
                    <p className="text-sm text-muted-foreground">{animal.condition}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-1">{t("clinic")}</h4>
                    <p className="text-sm text-muted-foreground">{animal.location.clinic}</p>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{t("donations")}</span>
                      <span>
                        ${animal.donationsReceived} / ${animal.donationsNeeded}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(animal.donationsReceived / animal.donationsNeeded) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          {t("viewDetails")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            {t("emergencyCase")} {animal.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="relative h-64">
                              <img
                                src={animal.image || "/placeholder.svg"}
                                alt={animal.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2">{t("expectedProgress")}</h3>
                              <p className="text-sm text-muted-foreground">{animal.expectedRecovery}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-semibold mb-2">{t("caseInformation")}</h3>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="font-medium">{t("animal")}</span> {animal.name}
                                </div>
                                <div>
                                  <span className="font-medium">{t("species")}</span> {animal.species}
                                </div>
                                <div>
                                  <span className="font-medium">{t("condition")}</span> {animal.condition}
                                </div>
                                <div>
                                  <span className="font-medium">{t("severity")}</span> {animal.severity}
                                </div>
                                <div>
                                  <span className="font-medium">{t("found")}</span>{" "}
                                  {new Date(animal.foundDate).toLocaleDateString()}
                                </div>
                                <div>
                                  <span className="font-medium">{t("location")}</span> {animal.location.address}
                                </div>
                                <div>
                                  <span className="font-medium">{t("clinic")}</span> {animal.location.clinic}
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="font-semibold mb-2">{t("immediateRequirements")}</h3>
                              <ul className="text-sm space-y-1">
                                {animal.requirements.map((req, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h3 className="font-semibold mb-2">{t("donationStatus")}</h3>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>{t("raised")}</span>
                                  <span className="font-medium">${animal.donationsReceived}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>{t("goal")}</span>
                                  <span className="font-medium">${animal.donationsNeeded}</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-3">
                                  <div
                                    className="bg-primary h-3 rounded-full transition-all"
                                    style={{ width: `${(animal.donationsReceived / animal.donationsNeeded) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-4">
                              <Button className="flex-1">
                                <Heart className="h-4 w-4 mr-2" />
                                {t("donateNow")}
                              </Button>
                              <Button variant="outline">
                                <Phone className="h-4 w-4 mr-2" />
                                {t("contactAction")}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button size="sm" className="flex-1">
                      <Heart className="h-4 w-4 mr-1" />
                      {t("donateNow")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4 md:text-3xl">{t("everySecondCounts")}</h2>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed mb-6">{t("emergencyCallToAction")}</p>
          <Button size="lg" variant="secondary" className="font-medium">
            <AlertTriangle className="h-5 w-5 mr-2" />
            {t("viewAllEmergencyCases")}
          </Button>
        </div>
      </section>
    </main>
  )
}
