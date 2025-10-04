"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, Heart, Copy, ExternalLink, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function DonationConfirmPage() {
  const [copied, setCopied] = useState(false)

  // Mock donation data - in real app this would come from the donation process
  const donation = {
    id: "VET-2024-001234",
    amount: "50.00",
    platformFee: "0.50",
    processingFee: "0.01",
    total: "50.51",
    clinicReceives: "49.50",
    transactionHash: "7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
    timestamp: new Date().toISOString(),
    clinic: {
      name: "Animal Rescue Center",
      location: "São Paulo, Brazil",
      walletAddress: "GCKFBEIYTKPQJQVOCVKBQZPQJQVOCVKBQZPQJQVOCVKBQZPQJQVOCVKB",
    },
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Donation Successful!</h1>
        <p className="text-muted-foreground">
          Thank you for helping animals in need. Your donation has been processed and sent to the clinic.
        </p>
      </div>

      {/* Donation Details */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Donation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Donation ID</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">{donation.id}</span>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(donation.id)} className="h-6 w-6 p-0">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Amount Donated</span>
            <span className="font-medium">${donation.amount}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Platform Fee</span>
            <span className="font-medium">${donation.platformFee}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Processing Fee</span>
            <span className="font-medium">${donation.processingFee}</span>
          </div>

          <Separator />

          <div className="flex items-center justify-between font-medium">
            <span>Total Charged</span>
            <span>${donation.total}</span>
          </div>

          <div className="flex items-center justify-between text-primary">
            <span>Clinic Receives</span>
            <span className="font-medium">${donation.clinicReceives} USDC</span>
          </div>
        </CardContent>
      </Card>

      {/* Clinic Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Donation Recipient</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">{donation.clinic.name}</h3>
              <p className="text-sm text-muted-foreground">{donation.clinic.location}</p>
            </div>
            <Badge className="ml-auto">Verified</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Clinic Wallet</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs">
                  {donation.clinic.walletAddress.slice(0, 8)}...{donation.clinic.walletAddress.slice(-8)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(donation.clinic.walletAddress)}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Transaction */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Blockchain Transaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Transaction Hash</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs">
                {donation.transactionHash.slice(0, 8)}...{donation.transactionHash.slice(-8)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(donation.transactionHash)}
                className="h-6 w-6 p-0"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Network</span>
            <span>Stellar Mainnet</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Confirmed
            </Badge>
          </div>

          <Button variant="outline" className="w-full bg-transparent" asChild>
            <Link href={`https://stellar.expert/explorer/public/tx/${donation.transactionHash}`} target="_blank">
              View on Stellar Explorer
              <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary-foreground text-xs font-bold">1</span>
            </div>
            <div>
              <p className="font-medium">Funds Received</p>
              <p className="text-sm text-muted-foreground">
                The clinic has received your donation in their Stellar wallet as USDC stablecoin.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary-foreground text-xs font-bold">2</span>
            </div>
            <div>
              <p className="font-medium">Impact Updates</p>
              <p className="text-sm text-muted-foreground">
                You'll receive email updates about how your donation is being used to help animals.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary-foreground text-xs font-bold">3</span>
            </div>
            <div>
              <p className="font-medium">Tax Receipt</p>
              <p className="text-sm text-muted-foreground">
                A tax-deductible receipt will be sent to your email within 24 hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex-1" asChild>
          <Link href="/dashboard">
            View My Donations
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent" asChild>
          <Link href="/clinics">Donate to Another Clinic</Link>
        </Button>
      </div>

      {/* Share */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-4">Help spread the word about VetChain and animal welfare</p>
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm">
            Share on Twitter
          </Button>
          <Button variant="outline" size="sm">
            Share on Facebook
          </Button>
        </div>
      </div>
    </div>
  )
}
