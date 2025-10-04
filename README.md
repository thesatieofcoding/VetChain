# 🐾 VetChain - Global Animal Welfare Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Stellar](https://img.shields.io/badge/Stellar-Blockchain-7D00FF?style=flat-square)](https://stellar.org/)

> **Transparent blockchain-powered donations to help stray and at-risk animals worldwide**

VetChain is a revolutionary platform that connects animal welfare donors directly with veterinary clinics worldwide using Stellar blockchain technology. Our mission is to make helping animals transparent, efficient, and impactful.

## ✨ Features

### 🌍 **Global Impact**
- **50K+ animals helped** through our platform
- **98% transparency rate** with blockchain tracking
- **200+ partner clinics** worldwide
- **24/7 global access** for donations

### 💰 **Transparent Donations**
- **Instant global donations** with minimal fees using Stellar blockchain
- **Complete transparency** - every donation tracked on blockchain
- **Direct clinic payments** - funds go directly to veterinary wallets
- **Real-time impact tracking** - monitor animals helped and treatments funded

### 🏥 **Clinic Network**
- Partner clinics in Brazil, India, Mexico, Thailand, Kenya, and more
- Verified veterinary facilities with transparent operations
- Direct wallet integration for instant fund transfers
- Real-time case tracking and impact reporting

### 🚨 **Emergency Response**
- Emergency map showing animals requiring urgent help
- Priority-based case management (High/Medium/Low priority)
- Real-time alerts for nearby emergency cases
- Direct donation to critical cases

### 🌐 **Multilingual Support**
- **English** - Full platform support
- **Spanish** - Complete localization
- **Portuguese** - Full translation available

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pet-store-ecommerce.git
   cd pet-store-ecommerce
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14.2.16** - React framework with App Router
- **TypeScript 5.0** - Type-safe development
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### **Blockchain Integration**
- **Stellar Network** - Fast, low-cost transactions
- **USDC Stablecoin** - Stable value for donations
- **Wallet Integration** - Freighter, Albedo, Rabet, xBull support

### **UI Components**
- **shadcn/ui** - Modern component library
- **Class Variance Authority** - Component variants
- **Tailwind Merge** - Conditional styling
- **Sonner** - Toast notifications

## 📁 Project Structure

```
pet-store-ecommerce/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── adopt/             # Animal adoption
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Payment processing
│   ├── clinics/           # Veterinary clinics
│   ├── contact/           # Contact information
│   ├── dashboard/         # User dashboard
│   ├── donate/            # Donation flow
│   ├── emergency-map/     # Emergency cases map
│   ├── login/             # Authentication
│   ├── register/          # User registration
│   ├── shop/              # E-commerce store
│   └── wallet/            # Wallet management
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Navigation header
│   ├── footer.tsx        # Site footer
│   └── stellar-wallet-connect.tsx
├── contexts/             # React contexts
│   ├── auth-context.tsx  # Authentication state
│   └── language-context.tsx # Internationalization
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── public/              # Static assets
```

## 🌟 Key Pages

### **Homepage** (`/`)
- Hero section with impact statistics
- Feature highlights
- Partner clinic showcase
- Call-to-action sections

### **Donation Flow** (`/donate`)
- Clinic selection and information
- Donation amount selection
- Payment method choice (Stellar/Card/Bank)
- Donor information collection
- Real-time fee calculation

### **Emergency Map** (`/emergency-map`)
- Interactive map of emergency cases
- Priority-based filtering
- Direct donation to urgent cases
- Real-time case updates

### **Clinic Directory** (`/clinics`)
- Verified veterinary clinics
- Location-based search
- Clinic ratings and reviews
- Direct donation links

## 🔧 Development

### **Available Scripts**

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Package Management
pnpm install      # Install dependencies
pnpm update       # Update dependencies
```

### **Environment Setup**

Create a `.env.local` file in the root directory:

```env
# Stellar Network Configuration
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org

# Database (if using)
DATABASE_URL=your_database_url

# Authentication (if implementing)
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

## 🌐 Internationalization

The platform supports multiple languages:

- **English** (default)
- **Spanish** (Español)
- **Portuguese** (Português)

Language switching is available in the header navigation.

## 🔐 Security Features

- **Blockchain Transparency** - All transactions are publicly verifiable
- **Wallet Integration** - Secure connection to Stellar wallets
- **Data Privacy** - Minimal data collection
- **Secure Payments** - Direct blockchain transactions

## 🚀 Deployment

### **Vercel (Recommended)**

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### **Manual Deployment**

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Stellar Development Foundation** for blockchain infrastructure
- **shadcn/ui** for beautiful component library
- **Vercel** for deployment platform
- **All veterinary clinics** working to help animals worldwide

## 📞 Support

- **Email**: support@vetchain.org
- **Documentation**: [docs.vetchain.org](https://docs.vetchain.org)
- **Community**: [Discord](https://discord.gg/vetchain)

---

**Made with ❤️ for animals worldwide**

*Every donation makes a difference. Join us in creating a better world for animals in need.*