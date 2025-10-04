"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Heart, Star, Search, Phone, Mail, Clock, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"

export default function ClinicsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const { t } = useLanguage()

  const clinics = [
    {
      id: 1,
      name: "Animal Rescue Center",
      location: "São Paulo, Brazil",
      country: "Brazil",
      image: "/veterinary-clinic-modern-facility.jpg",
      bannerImage: "/veterinary-clinic-banner-1.jpg",
      rating: 4.9,
      reviews: 127,
      specialization: "Stray Animal Rescue",
      description: "Dedicated to rescuing and rehabilitating stray dogs and cats in São Paulo metropolitan area.",
      monthlyCapacity: "150+ animals",
      established: 2018,
      verified: true,
      urgentNeeds: ["Emergency Surgery Fund", "Vaccination Program"],
      totalReceived: "$12,450",
      phone: "+55 11 98765-4321",
      email: "contact@animalrescue.br",
      hours: "24/7 Emergency",
    },
    {
      id: 2,
      name: "Street Paws Clinic",
      location: "Mumbai, India",
      country: "India",
      image: "/veterinary-clinic-india.jpg",
      bannerImage: "/veterinary-clinic-banner-2.jpg",
      rating: 4.8,
      reviews: 89,
      specialization: "Street Animal Care",
      description: "Providing medical care and sterilization services for street animals across Mumbai.",
      monthlyCapacity: "200+ animals",
      established: 2020,
      verified: true,
      urgentNeeds: ["Sterilization Program", "Medicine Supplies"],
      totalReceived: "$8,920",
      phone: "+91 22 1234-5678",
      email: "info@streetpaws.in",
      hours: "Mon-Sat: 8AM-8PM",
    },
    {
      id: 3,
      name: "Hope Veterinary Clinic",
      location: "Mexico City, Mexico",
      country: "Mexico",
      image: "/veterinary-clinic-mexico.jpg",
      bannerImage: "/veterinary-clinic-banner-3.jpg",
      rating: 4.7,
      reviews: 156,
      specialization: "General Veterinary Care",
      description: "Full-service veterinary clinic with special programs for low-income pet owners.",
      monthlyCapacity: "100+ animals",
      established: 2015,
      verified: true,
      urgentNeeds: ["Equipment Upgrade", "Staff Training"],
      totalReceived: "$15,680",
      phone: "+52 55 1234-5678",
      email: "contacto@hopevet.mx",
      hours: "Mon-Fri: 9AM-7PM",
    },
    {
      id: 4,
      name: "Care4Animals Foundation",
      location: "Bangkok, Thailand",
      country: "Thailand",
      image: "/veterinary-clinic-thailand.jpg",
      bannerImage: "/veterinary-clinic-banner-4.jpg",
      rating: 4.9,
      reviews: 203,
      specialization: "Wildlife Rehabilitation",
      description: "Specialized in wildlife rescue and rehabilitation with focus on endangered species.",
      monthlyCapacity: "80+ animals",
      established: 2012,
      verified: true,
      urgentNeeds: ["Wildlife Enclosures", "Specialized Equipment"],
      totalReceived: "$22,340",
      phone: "+66 2 123-4567",
      email: "info@care4animals.th",
      hours: "Daily: 7AM-9PM",
    },
    {
      id: 5,
      name: "Rescue Vet Clinic",
      location: "Nairobi, Kenya",
      country: "Kenya",
      image: "/veterinary-clinic-kenya.jpg",
      bannerImage: "/veterinary-clinic-banner-5.jpg",
      rating: 4.6,
      reviews: 74,
      specialization: "Emergency Care",
      description: "24/7 emergency veterinary services for rescued and stray animals in Nairobi.",
      monthlyCapacity: "120+ animals",
      established: 2019,
      verified: true,
      urgentNeeds: ["Emergency Equipment", "Ambulance Service"],
      totalReceived: "$6,750",
      phone: "+254 20 123-4567",
      email: "emergency@rescuevet.ke",
      hours: "24/7 Emergency",
    },
    {
      id: 6,
      name: "Paws & Claws Veterinary",
      location: "Buenos Aires, Argentina",
      country: "Argentina",
      image: "/veterinary-clinic-argentina.jpg",
      bannerImage: "/veterinary-clinic-banner-6.jpg",
      rating: 4.8,
      reviews: 142,
      specialization: "Surgical Care",
      description: "Advanced surgical procedures and post-operative care for rescued animals.",
      monthlyCapacity: "90+ animals",
      established: 2017,
      verified: true,
      urgentNeeds: ["Surgical Equipment", "Recovery Facilities"],
      totalReceived: "$18,230",
      phone: "+54 11 4567-8901",
      email: "info@pawsclaws.ar",
      hours: "Mon-Sat: 8AM-6PM",
    },
  ]

  const filteredClinics = clinics.filter((clinic) => {
    const matchesSearch =
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCountry = selectedCountry === "all" || clinic.country === selectedCountry
    return matchesSearch && matchesCountry
  })

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
          {t.clinics?.title || "Find Veterinary Clinics"}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
          {t.clinics?.subtitle ||
            "Discover verified veterinary clinics worldwide helping stray and at-risk animals. Your donations go directly to their wallets with complete transparency."}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.clinics?.searchPlaceholder || "Search clinics by name, location, or specialization..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder={t.clinics?.filterByCountry || "Filter by country"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.clinics?.allCountries || "All Countries"}</SelectItem>
            <SelectItem value="Brazil">Brazil</SelectItem>
            <SelectItem value="India">India</SelectItem>
            <SelectItem value="Mexico">Mexico</SelectItem>
            <SelectItem value="Thailand">Thailand</SelectItem>
            <SelectItem value="Kenya">Kenya</SelectItem>
            <SelectItem value="Argentina">Argentina</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="mb-6 max-w-7xl mx-auto">
        <p className="text-muted-foreground">
          {t.clinics?.showing || "Showing"} {filteredClinics.length} {t.clinics?.of || "of"} {clinics.length}{" "}
          {t.clinics?.verifiedClinics || "verified clinics"}
        </p>
      </div>

      {/* Clinics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredClinics.map((clinic) => (
          <Card key={clinic.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="relative h-32 overflow-hidden">
              <Image
                src={clinic.bannerImage || "/placeholder.svg"}
                alt={`${clinic.name} banner`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              {clinic.verified && (
                <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm border-white/20">
                  <Award className="h-3 w-3 mr-1" />
                  {t.clinics?.verified || "Verified"}
                </Badge>
              )}
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-white font-bold text-lg drop-shadow-lg mb-1 line-clamp-1">{clinic.name}</h3>
                <div className="flex items-center text-white/90 text-sm drop-shadow-md">
                  <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <span className="line-clamp-1">{clinic.location}</span>
                </div>
              </div>
            </div>

            <div className="relative h-56 overflow-hidden">
              <Image
                src={clinic.image || "/placeholder.svg"}
                alt={clinic.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center bg-yellow-50 dark:bg-yellow-950/30 px-2 py-1 rounded-md">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold ml-1">{clinic.rating}</span>
                  <span className="text-xs text-muted-foreground ml-1">({clinic.reviews})</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {clinic.specialization}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{clinic.description}</p>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="line-clamp-1">{clinic.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="line-clamp-1">{clinic.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{clinic.hours}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                <div className="bg-muted/50 p-2 rounded-md">
                  <span className="text-muted-foreground block mb-1">{t.clinics?.capacity || "Monthly Capacity"}</span>
                  <p className="font-semibold">{clinic.monthlyCapacity}</p>
                </div>
                <div className="bg-muted/50 p-2 rounded-md">
                  <span className="text-muted-foreground block mb-1">{t.clinics?.established || "Established"}</span>
                  <p className="font-semibold">{clinic.established}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  {t.clinics?.urgentNeeds || "Urgent Needs:"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {clinic.urgentNeeds.map((need, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
                    >
                      {need}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">{t.clinics?.totalReceived || "Total Received"}</p>
                  <p className="font-bold text-lg text-primary">{clinic.totalReceived}</p>
                </div>
                <Button asChild className="group/btn">
                  <Link href={`/donate?clinic=${clinic.id}`}>
                    <Heart className="h-4 w-4 mr-2 group-hover/btn:fill-current transition-all" />
                    {t.clinics?.donateNow || "Donate Now"}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 max-w-3xl mx-auto">
        <Card className="overflow-hidden border-2">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
              {t.clinics?.notListed || "Is your clinic not listed?"}
            </h3>
            <p className="text-muted-foreground mb-6 text-pretty max-w-xl mx-auto">
              {t.clinics?.joinVetChain ||
                "Join VetChain to receive direct donations and help more animals in need. Registration is free and takes just a few minutes."}
            </p>
            <Button size="lg" asChild className="group/cta">
              <Link href="/register-clinic">
                <Award className="h-5 w-5 mr-2 group-hover/cta:rotate-12 transition-transform" />
                {t.clinics?.registerClinic || "Register Your Clinic"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
