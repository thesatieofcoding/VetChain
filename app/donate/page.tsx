"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Star, CreditCard, Wallet, DollarSign, Info, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DonatePage() {
  const searchParams = useSearchParams()
  const clinicId = searchParams.get("clinic")
  const [selectedAmount, setSelectedAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("stellar")
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    anonymous: false,
  })

  // Mock clinic data - in real app this would come from API
  const clinic = {
    id: 1,
    name: "Animal Rescue Center",
    location: "São Paulo, Brazil",
    image: "/placeholder.svg?height=200&width=300&text=Animal+Rescue+Center",
    rating: 4.9,
    reviews: 127,
    specialization: "Stray Animal Rescue",
    description: "Dedicated to rescuing and rehabilitating stray dogs and cats in São Paulo metropolitan area.",
    urgentNeeds: ["Emergency Surgery Fund", "Vaccination Program"],
    walletAddress: "GCKFBEIYTKP...",
    verified: true,
    totalReceived: "$12,450",
    animalsHelped: 342,
  }

  const predefinedAmounts = ["10", "25", "50", "100", "250"]
  const finalAmount = selectedAmount === "custom" ? customAmount : selectedAmount

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Make a Donation</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/clinics" className="hover:text-primary">
            Clinics
          </Link>
          <span className="mx-2">/</span>
          <span>Donate</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Clinic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Donating to
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={clinic.image || "/placeholder.svg"} alt={clinic.name} fill className="object-cover" />
                  {clinic.verified && <Badge className="absolute -top-1 -right-1 bg-primary text-xs">✓</Badge>}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{clinic.name}</h3>
                  <div className="flex items-center text-muted-foreground mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{clinic.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium ml-1">{clinic.rating}</span>
                      <span className="text-sm text-muted-foreground ml-1">({clinic.reviews} reviews)</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {clinic.specialization}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{clinic.description}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Received:</span>
                  <p className="font-semibold text-primary">{clinic.totalReceived}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Animals Helped:</span>
                  <p className="font-semibold">{clinic.animalsHelped}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Current Urgent Needs:</p>
                <div className="flex flex-wrap gap-2">
                  {clinic.urgentNeeds.map((need, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {need}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Donation Amount */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Choose Donation Amount
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {predefinedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => setSelectedAmount(amount)}
                    className="h-12"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={selectedAmount === "custom" ? "default" : "outline"}
                  onClick={() => setSelectedAmount("custom")}
                  className="h-12 px-4"
                >
                  Custom
                </Button>
                {selectedAmount === "custom" && (
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="h-12"
                    />
                  </div>
                )}
              </div>

              {finalAmount && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Your ${finalAmount} donation will be converted to USDC stablecoin and sent directly to the clinic's
                    Stellar wallet. VetChain charges a 1% platform fee ($
                    {(Number.parseFloat(finalAmount) * 0.01).toFixed(2)}).
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                  <RadioGroupItem value="stellar" id="stellar" />
                  <Label htmlFor="stellar" className="flex items-center gap-2 cursor-pointer flex-1">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground text-xs font-bold">S</span>
                    </div>
                    <div>
                      <div className="font-medium">Stellar Wallet</div>
                      <div className="text-sm text-muted-foreground">Direct crypto payment (Recommended)</div>
                    </div>
                  </Label>
                  <Badge variant="secondary" className="text-xs">
                    Lowest Fees
                  </Badge>
                </div>

                <div className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-muted-foreground">Converted to USDC automatically</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-md p-4">
                  <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                  <Label htmlFor="bank-transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                    <div className="w-6 h-6 bg-muted rounded flex items-center justify-center">
                      <span className="text-xs">🏦</span>
                    </div>
                    <div>
                      <div className="font-medium">Bank Transfer</div>
                      <div className="text-sm text-muted-foreground">Traditional bank transfer</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "credit-card" && (
                <div className="mt-4 space-y-4 p-4 bg-muted/50 rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" placeholder="John Doe" />
                  </div>
                </div>
              )}

              {paymentMethod === "stellar" && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    You'll be redirected to connect your Stellar wallet to complete the donation.
                  </p>
                  <div className="text-xs text-muted-foreground">
                    Supported wallets: Freighter, Albedo, Rabet, xBull
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Donor Information */}
          <Card>
            <CardHeader>
              <CardTitle>Donor Information (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="donor-name">Full Name</Label>
                  <Input
                    id="donor-name"
                    placeholder="Your name"
                    value={donorInfo.name}
                    onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donor-email">Email</Label>
                  <Input
                    id="donor-email"
                    type="email"
                    placeholder="your@email.com"
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message to Clinic (Optional)</Label>
                <Textarea id="message" placeholder="Leave an encouraging message for the clinic team..." rows={3} />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={donorInfo.anonymous}
                  onChange={(e) => setDonorInfo({ ...donorInfo, anonymous: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Make this donation anonymous
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Donation Summary */}
        <div>
          <div className="sticky top-20">
            <Card>
              <CardHeader>
                <CardTitle>Donation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {finalAmount ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Donation Amount</span>
                        <span className="font-medium">${finalAmount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Platform Fee (1%)</span>
                        <span className="font-medium">${(Number.parseFloat(finalAmount) * 0.01).toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Processing Fee</span>
                        <span className="font-medium">
                          {paymentMethod === "stellar"
                            ? "$0.01"
                            : "$" + (Number.parseFloat(finalAmount) * 0.029 + 0.3).toFixed(2)}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>
                          $
                          {paymentMethod === "stellar"
                            ? (Number.parseFloat(finalAmount) * 1.01 + 0.01).toFixed(2)
                            : (Number.parseFloat(finalAmount) * 1.039 + 0.3).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-primary">
                        <span>Clinic Receives</span>
                        <span className="font-medium">${(Number.parseFloat(finalAmount) * 0.99).toFixed(2)} USDC</span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-3">
                      <Button className="w-full" size="lg" asChild>
                        <Link href="/donate/confirm">
                          <Heart className="h-4 w-4 mr-2" />
                          Complete Donation
                        </Link>
                      </Button>

                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="h-3 w-3" />
                        <span>Secure & Transparent</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Select a donation amount to continue</p>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Why Donate?</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• 100% transparent blockchain tracking</li>
                    <li>• Direct payments to clinic wallets</li>
                    <li>• Immediate impact on animal welfare</li>
                    <li>• Tax-deductible in many countries</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
