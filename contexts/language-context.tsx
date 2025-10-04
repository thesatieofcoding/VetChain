"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "English" | "Spanish" | "Portuguese"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  English: {
    // Navigation
    home: "Home",
    findClinics: "View Clinics",
    donateNow: "Donate Now",
    adoptAnimal: "Adopt Animal",
    emergencyMap: "Emergency Map",
    about: "About",
    contact: "Contact",
    enterEmail: "Enter Email",
    language: "Language",
    wallet: "Wallet",
    signIn: "Sign In",
    menu: "Menu",
    theme: "Theme",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    subscribe: "Subscribe",
    emailPlaceholder: "your@email.com",

    // Homepage
    poweredBy: "Powered by Stellar Blockchain",
    heroTitle: "Now helping is much easier",
    heroSubtitle:
      "With just a few clicks, you can make a difference in the life of an animal that needs our support. Your contribution, no matter how small, adds hope and improves their future.",
    animalsHelped: "animals helped",
    animalsHelpedDesc: "Stray and at-risk animals received care through our platform",
    transparencyRate: "transparency rate",
    transparencyRateDesc: "All donations tracked on blockchain for complete visibility",
    partnerClinics: "partner clinics",
    partnerClinicsDesc: "Veterinary clinics worldwide receiving direct donations",
    globalAccess: "global access",
    globalAccessDesc: "Donate from anywhere, anytime with instant processing",
    trustedBy: "Trusted by veterinary clinics worldwide",
    instantDonations: "Instant Global Donations",
    instantDonationsDesc: "Send donations worldwide in seconds using Stellar blockchain technology with minimal fees.",
    completeTransparency: "Complete Transparency",
    completeTransparencyDesc:
      "Every donation is tracked on blockchain. See exactly where your money goes and its impact.",
    directToClinics: "Direct to Clinics",
    directToClinicsDesc: "Funds go directly to veterinary clinics' wallets, eliminating intermediaries and delays.",
    realImpactTracking: "Real Impact Tracking",
    realImpactTrackingDesc: "Monitor the animals helped and treatments funded through your contributions.",
    collaboration: "Collaboration",
    fasterIteration: "Faster iteration. More innovation.",
    platformDescription:
      "The platform for rapid progress. Let donors focus on helping animals instead of managing complex payment systems with automated blockchain transactions, built-in transparency, and integrated impact tracking.",
    instantGlobalDonations: "Instant global donations with minimal fees",
    blockchainTransparency: "Complete blockchain transparency",
    directClinicPayments: "Direct clinic payments",
    realTimeTracking: "Real-time impact tracking",
    transformStory: "Together, we can transform the story of street animals",
    joinThousands:
      "Every donation is tracked on blockchain for complete transparency. Join thousands of people helping animals around the world.",
    teamworkSeamless: "Make teamwork seamless. Tools for donors and clinics to share impact and iterate faster.",

    // Emergency Map
    emergencyMapTitle: "Emergency Map",
    emergencyMapSubtitle: "Animals requiring urgent help. Find nearby clinics and donate directly for critical cases.",
    nearbyAlerts: "Nearby Alerts to Your Location",
    nearbyAnimalsText: "animals needing urgent help near you.",
    highPriority: "High Priority",
    mediumPriority: "Medium Priority",
    lowPriority: "Low Priority",
    condition: "Condition:",
    clinic: "Clinic:",
    donations: "Donations",
    viewDetails: "View Details",
    emergencyCase: "Emergency Case:",
    expectedProgress: "Expected Progress",
    caseInformation: "Case Information",
    animal: "Animal:",
    species: "Species:",
    severity: "Severity:",
    found: "Found:",
    location: "Location:",
    immediateRequirements: "Immediate Requirements",
    donationStatus: "Donation Status",
    raised: "Raised:",
    goal: "Goal:",
    donateNow: "Donate Now",
    contactAction: "Contact",
    everySecondCounts: "Every Second Counts",
    emergencyCallToAction:
      "Animals in critical condition need your immediate help. With VetChain, your donation reaches the veterinary clinic directly in seconds, without intermediaries or delays.",
    viewAllEmergencyCases: "View All Emergency Cases",
    thereAre: "There are",
  },
  Spanish: {
    // Navigation
    home: "Inicio",
    findClinics: "Ver Clínicas",
    donateNow: "Donar Ahora",
    adoptAnimal: "Adoptar Animal",
    emergencyMap: "Mapa Emergencia",
    about: "Acerca de",
    contact: "Contacto",
    enterEmail: "Ingresar Correo",
    language: "Idioma",
    wallet: "Billetera",
    signIn: "Iniciar Sesión",
    menu: "Menú",
    theme: "Tema",
    lightMode: "Modo Día",
    darkMode: "Modo Noche",
    subscribe: "Suscribirse",
    emailPlaceholder: "tu@email.com",

    // Homepage
    poweredBy: "Impulsado por Blockchain Stellar",
    heroTitle: "Ahora ayudar es mucho más fácil",
    heroSubtitle:
      "Con solo unos clics, puedes marcar la diferencia en la vida de un animal que necesita nuestro apoyo. Tu aporte, por pequeño que sea, suma esperanza y mejora su futuro.",
    animalsHelped: "animales ayudados",
    animalsHelpedDesc: "Animales callejeros y en riesgo recibieron atención a través de nuestra plataforma",
    transparencyRate: "tasa de transparencia",
    transparencyRateDesc: "Todas las donaciones rastreadas en blockchain para completa visibilidad",
    partnerClinics: "clínicas asociadas",
    partnerClinicsDesc: "Clínicas veterinarias en todo el mundo recibiendo donaciones directas",
    globalAccess: "acceso global",
    globalAccessDesc: "Dona desde cualquier lugar, en cualquier momento con procesamiento instantáneo",
    trustedBy: "Confiado por clínicas veterinarias en todo el mundo",
    instantDonations: "Donaciones Globales Instantáneas",
    instantDonationsDesc:
      "Envía donaciones mundialmente en segundos usando tecnología blockchain Stellar con tarifas mínimas.",
    completeTransparency: "Transparencia Completa",
    completeTransparencyDesc:
      "Cada donación es rastreada en blockchain. Ve exactamente a dónde va tu dinero y su impacto.",
    directToClinics: "Directo a Clínicas",
    directToClinicsDesc:
      "Los fondos van directamente a las billeteras de las clínicas veterinarias, eliminando intermediarios y demoras.",
    realImpactTracking: "Seguimiento de Impacto Real",
    realImpactTrackingDesc:
      "Monitorea los animales ayudados y tratamientos financiados a través de tus contribuciones.",
    collaboration: "Colaboración",
    fasterIteration: "Iteración más rápida. Más innovación.",
    platformDescription:
      "La plataforma para el progreso rápido. Permite a los donantes enfocarse en ayudar animales en lugar de gestionar sistemas de pago complejos con transacciones blockchain automatizadas, transparencia integrada y seguimiento de impacto integrado.",
    instantGlobalDonations: "Donaciones globales instantáneas con tarifas mínimas",
    blockchainTransparency: "Transparencia blockchain completa",
    directClinicPayments: "Pagos directos a clínicas",
    realTimeTracking: "Seguimiento en tiempo real",
    transformStory: "Juntos, podemos transformar la historia de los animales callejeros",
    joinThousands:
      "Cada donación es rastreada en blockchain para completa transparencia. Únete a miles de personas ayudando animales en todo el mundo.",
    teamworkSeamless:
      "Haz que el trabajo en equipo sea fluido. Herramientas para donantes y clínicas para compartir impacto e iterar más rápido.",

    // Emergency Map
    emergencyMapTitle: "Mapa de Emergencias",
    emergencyMapSubtitle:
      "Animales que requieren ayuda urgente. Encuentra clínicas cercanas y dona directamente para casos críticos.",
    nearbyAlerts: "Alertas Cercanas a Tu Ubicación",
    nearbyAnimalsText: "animales que necesitan ayuda urgente cerca de ti.",
    highPriority: "Alta Prioridad",
    mediumPriority: "Media Prioridad",
    lowPriority: "Baja Prioridad",
    condition: "Condición:",
    clinic: "Clínica:",
    donations: "Donaciones",
    viewDetails: "Ver Detalles",
    emergencyCase: "Caso de Emergencia:",
    expectedProgress: "Progreso Esperado",
    caseInformation: "Información del Caso",
    animal: "Animal:",
    species: "Especie:",
    severity: "Severidad:",
    found: "Encontrado:",
    location: "Ubicación:",
    immediateRequirements: "Requerimientos Inmediatos",
    donationStatus: "Estado de Donaciones",
    raised: "Recaudado:",
    goal: "Meta:",
    donateNow: "Donar Ahora",
    contactAction: "Contactar",
    everySecondCounts: "Cada Segundo Cuenta",
    emergencyCallToAction:
      "Los animales en estado crítico necesitan tu ayuda inmediata. Con VetChain, tu donación llega directamente a la clínica veterinaria en segundos, sin intermediarios ni demoras.",
    viewAllEmergencyCases: "Ver Todos los Casos de Emergencia",
    thereAre: "Hay",
  },
  Portuguese: {
    // Navigation
    home: "Início",
    findClinics: "Ver Clínicas",
    donateNow: "Doar Agora",
    adoptAnimal: "Adotar Animal",
    emergencyMap: "Mapa Emergência",
    about: "Sobre",
    contact: "Contato",
    enterEmail: "Inserir Email",
    language: "Idioma",
    wallet: "Carteira",
    signIn: "Entrar",
    menu: "Menu",
    theme: "Tema",
    lightMode: "Modo Dia",
    darkMode: "Modo Noite",
    subscribe: "Inscrever-se",
    emailPlaceholder: "seu@email.com",

    // Homepage
    poweredBy: "Alimentado por Blockchain Stellar",
    heroTitle: "Agora ajudar é muito mais fácil",
    heroSubtitle:
      "Com apenas alguns cliques, você pode fazer a diferença na vida de um animal que precisa do nosso apoio. Sua contribuição, por menor que seja, adiciona esperança e melhora seu futuro.",
    animalsHelped: "animais ajudados",
    animalsHelpedDesc: "Animais de rua e em risco receberam cuidados através da nossa plataforma",
    transparencyRate: "taxa de transparência",
    transparencyRateDesc: "Todas as doações rastreadas no blockchain para completa visibilidade",
    partnerClinics: "clínicas parceiras",
    partnerClinicsDesc: "Clínicas veterinárias mundialmente recebendo doações diretas",
    globalAccess: "acesso global",
    globalAccessDesc: "Doe de qualquer lugar, a qualquer hora com processamento instantâneo",
    trustedBy: "Confiado por clínicas veterinárias mundialmente",
    instantDonations: "Doações Globais Instantâneas",
    instantDonationsDesc:
      "Envie doações mundialmente em segundos usando tecnologia blockchain Stellar com taxas mínimas.",
    completeTransparency: "Transparência Completa",
    completeTransparencyDesc:
      "Cada doação é rastreada no blockchain. Veja exatamente para onde vai seu dinheiro e seu impacto.",
    directToClinics: "Direto para Clínicas",
    directToClinicsDesc:
      "Fundos vão diretamente para as carteiras das clínicas veterinárias, eliminando intermediários e atrasos.",
    realImpactTracking: "Rastreamento de Impacto Real",
    realImpactTrackingDesc: "Monitore os animais ajudados e tratamentos financiados através de suas contribuições.",
    collaboration: "Colaboração",
    fasterIteration: "Iteração mais rápida. Mais inovação.",
    platformDescription:
      "A plataforma para progresso rápido. Permite que doadores foquem em ajudar animais ao invés de gerenciar sistemas de pagamento complexos com transações blockchain automatizadas, transparência integrada e rastreamento de impacto integrado.",
    instantGlobalDonations: "Doações globais instantâneas com taxas mínimas",
    blockchainTransparency: "Transparência blockchain completa",
    directClinicPayments: "Pagamentos diretos para clínicas",
    realTimeTracking: "Rastreamento em tempo real",
    transformStory: "Juntos, podemos transformar a história dos animais de rua",
    joinThousands:
      "Cada doação é rastreada no blockchain para completa transparência. Junte-se a milhares de pessoas ajudando animais ao redor do mundo.",
    teamworkSeamless:
      "Torne o trabalho em equipe fluido. Ferramentas para doadores e clínicas compartilharem impacto e iterarem mais rápido.",

    // Emergency Map
    emergencyMapTitle: "Mapa de Emergência",
    emergencyMapSubtitle:
      "Animais que precisam de ajuda urgente. Encontre clínicas próximas e doe diretamente para casos críticos.",
    nearbyAlerts: "Alertas Próximos à Sua Localização",
    nearbyAnimalsText: "animais precisando de ajuda urgente perto de você.",
    highPriority: "Alta Prioridade",
    mediumPriority: "Média Prioridade",
    lowPriority: "Baixa Prioridade",
    condition: "Condição:",
    clinic: "Clínica:",
    donations: "Doações",
    viewDetails: "Ver Detalhes",
    emergencyCase: "Caso de Emergência:",
    expectedProgress: "Progresso Esperado",
    caseInformation: "Informações do Caso",
    animal: "Animal:",
    species: "Espécie:",
    severity: "Severidade:",
    found: "Encontrado:",
    location: "Localização:",
    immediateRequirements: "Requisitos Imediatos",
    donationStatus: "Status das Doações",
    raised: "Arrecadado:",
    goal: "Meta:",
    donateNow: "Doar Agora",
    contactAction: "Contatar",
    everySecondCounts: "Cada Segundo Conta",
    emergencyCallToAction:
      "Animais em estado crítico precisam da sua ajuda imediata. Com VetChain, sua doação chega diretamente à clínica veterinária em segundos, sem intermediários ou atrasos.",
    viewAllEmergencyCases: "Ver Todos os Casos de Emergência",
    thereAre: "Há",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("English")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
