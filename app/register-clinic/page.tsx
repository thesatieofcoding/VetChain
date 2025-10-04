"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Upload, MapPin, Phone, FileText, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterClinicPage() {
  const [step, setStep] = useState(1)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 max-w-2xl mx-auto">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Register Your Veterinary Clinic</CardTitle>
          <CardDescription className="text-center">
            Join VetChain to receive direct donations and help animals in need
          </CardDescription>

          {/* Progress indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              <div className={`w-8 h-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <div className={`w-8 h-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Basic Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="clinic-name">Clinic Name *</Label>
                <Input id="clinic-name" placeholder="Animal Care Veterinary Clinic" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="director-name">Director/Owner Name *</Label>
                  <Input id="director-name" placeholder="Dr. Sarah Johnson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license-number">Veterinary License Number *</Label>
                  <Input id="license-number" placeholder="VET-2024-001234" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  placeholder="123 Main Street, City, State/Province, Country, Postal Code"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="br">Brazil</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="mx">Mexico</SelectItem>
                      <SelectItem value="th">Thailand</SelectItem>
                      <SelectItem value="ke">Kenya</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="established">Year Established</Label>
                  <Input id="established" type="number" placeholder="2020" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Contact & Services
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="info@animalcare.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input id="website" type="url" placeholder="https://www.animalcare.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="services">Services Provided *</Label>
                <Textarea
                  id="services"
                  placeholder="Emergency care, vaccinations, spay/neuter, dental care, surgery, etc."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization (Optional)</Label>
                <Input id="specialization" placeholder="Stray animal rescue, wildlife rehabilitation, etc." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Monthly Animal Capacity</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select capacity range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-50">1-50 animals</SelectItem>
                    <SelectItem value="51-100">51-100 animals</SelectItem>
                    <SelectItem value="101-200">101-200 animals</SelectItem>
                    <SelectItem value="200+">200+ animals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Verification & Wallet Setup
              </h3>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Upload Veterinary License</p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">PDF, JPG, PNG up to 10MB</p>
                </div>

                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Business Registration (Optional)</p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Stellar Wallet Setup</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  We'll create a secure Stellar wallet for your clinic to receive donations. You'll receive the wallet
                  details after approval.
                </p>
                <div className="flex items-center space-x-2">
                  <Checkbox id="wallet-terms" />
                  <Label htmlFor="wallet-terms" className="text-sm">
                    I understand that VetChain will create a Stellar wallet for donation management
                  </Label>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="transparency" />
                  <Label htmlFor="transparency" className="text-sm">
                    I agree to transparent reporting of how donations are used for animal care
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="commission" />
                  <Label htmlFor="commission" className="text-sm">
                    I understand VetChain charges a 1% commission on donations for platform maintenance
                  </Label>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Previous
            </Button>
          )}

          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)} className="ml-auto">
              Next Step
            </Button>
          ) : (
            <Button className="ml-auto">Submit Application</Button>
          )}
        </CardFooter>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Already registered?{" "}
          <Link href="/clinic-dashboard" className="text-primary hover:underline">
            Access your dashboard
          </Link>
        </p>
      </div>
    </div>
  )
}
