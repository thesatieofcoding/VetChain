"use client"
import Image from "next/image"
import Link from "next/link"
import {
  Globe,
  Zap,
  Shield,
  TrendingUp,
  Users,
  MapPin,
  CheckCircle,
  DollarSign,
  PawPrint,
  Building2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

export default function HomePage() {
  const { t } = useLanguage()

  const impactStats = [
    {
      number: "50K+",
      label: t("animalsHelped"),
      description: t("animalsHelpedDesc"),
    },
    {
      number: "98%",
      label: t("transparencyRate"),
      description: t("transparencyRateDesc"),
    },
    {
      number: "200+",
      label: t("partnerClinics"),
      description: t("partnerClinicsDesc"),
    },
    {
      number: "24/7",
      label: t("globalAccess"),
      description: t("globalAccessDesc"),
    },
  ]

  const partnerClinics = [
    { name: "Animal Rescue Center", location: "São Paulo, Brazil" },
    { name: "Street Paws Clinic", location: "Mumbai, India" },
    { name: "Hope Veterinary", location: "Mexico City, Mexico" },
    { name: "Care4Animals", location: "Bangkok, Thailand" },
    { name: "Rescue Vet Clinic", location: "Nairobi, Kenya" },
  ]

  const features = [
    {
      icon: <Zap className="h-10 w-10 text-accent" />,
      title: t("instantDonations"),
      description: t("instantDonationsDesc"),
    },
    {
      icon: <Shield className="h-10 w-10 text-accent" />,
      title: t("completeTransparency"),
      description: t("completeTransparencyDesc"),
    },
    {
      icon: <Globe className="h-10 w-10 text-accent" />,
      title: t("directToClinics"),
      description: t("directToClinicsDesc"),
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-accent" />,
      title: t("realImpactTracking"),
      description: t("realImpactTrackingDesc"),
    },
  ]

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center grid-pattern">
        <div className="container px-4 py-12 md:px-6 md:py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="w-fit">
                {t("poweredBy")}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-balance">
                {t("heroTitle")}
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                {t("heroSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-medium flex items-center gap-2" asChild>
                  <Link href="/donate">
                    <DollarSign className="h-5 w-5" />
                    {t("donateNow")}
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-medium bg-transparent flex items-center gap-2"
                  asChild
                >
                  <Link href="/adopt">
                    <PawPrint className="h-5 w-5" />
                    {t("adoptAnimal")}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-xl overflow-hidden">
              <Image
                src="/veterinarian-caring-for-stray-animals-clinic-heart.jpg"
                alt="Veterinarian caring for animals"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-12 md:py-16 border-t">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm font-medium mb-2">{stat.label}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12 md:text-4xl">{t("teamworkSeamless")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Clinics */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">{t("trustedBy")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {partnerClinics.map((clinic, index) => (
              <Card key={index} className="bg-background/50 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">{clinic.name}</h3>
                  <p className="text-xs text-muted-foreground">{clinic.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose VetChain */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit">
                <Users className="h-3 w-3 mr-1" />
                {t("collaboration")}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t("fasterIteration")}</h2>
              <p className="text-muted-foreground leading-relaxed">{t("platformDescription")}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">{t("instantGlobalDonations")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">{t("blockchainTransparency")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">{t("directClinicPayments")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">{t("realTimeTracking")}</span>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/blockchain-network-visualization-with-animal-welfa.jpg"
                alt="VetChain platform visualization"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t("transformStory")}</h2>
            <p className="max-w-[600px] text-primary-foreground/90 text-lg">{t("joinThousands")}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="font-medium flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                {t("donateNow")}
              </Button>
              <Button size="lg" variant="secondary" className="font-medium flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {t("findClinics")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-medium border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent flex items-center gap-2"
              >
                <PawPrint className="h-5 w-5" />
                {t("adoptAnimal")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
