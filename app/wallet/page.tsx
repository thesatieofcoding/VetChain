"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Wallet,
  Copy,
  ExternalLink,
  RefreshCw,
  Plus,
  Send,
  History,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface WalletData {
  address: string
  balance: {
    xlm: number
    usdc: number
  }
  isConnected: boolean
  network: string
}

interface Transaction {
  id: string
  type: "donation" | "received"
  amount: number
  currency: string
  clinic?: string
  donor?: string
  date: string
  status: "completed" | "pending"
  hash: string
}

export default function WalletPage() {
  const [wallet, setWallet] = useState<WalletData | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "donation",
      amount: 25,
      currency: "USDC",
      clinic: "Animal Care Clinic - Mexico City",
      date: "2024-01-15T10:30:00Z",
      status: "completed",
      hash: "abc123def456",
    },
    {
      id: "2",
      type: "donation",
      amount: 50,
      currency: "USDC",
      clinic: "Street Paws Veterinary - São Paulo",
      date: "2024-01-10T14:20:00Z",
      status: "completed",
      hash: "def456ghi789",
    },
  ])

  const connectWallet = async () => {
    setIsConnecting(true)

    try {
      console.log("[v0] Attempting to connect Stellar wallet...")

      // Check if Freighter wallet is available
      if (typeof window !== "undefined" && (window as any).freighter) {
        console.log("[v0] Freighter wallet detected")
        // Simulate connection process
        await new Promise((resolve) => setTimeout(resolve, 2000))

        setWallet({
          address: "GCKFBEIYTKPQJQVOCVKBQZPQJQVOCVKBQZPQJQVOCVKBQZPQJQVOCVKB",
          balance: {
            xlm: 1250.75,
            usdc: 485.2,
          },
          isConnected: true,
          network: "Stellar Mainnet",
        })

        toast({
          title: "Wallet Connected",
          description: "Successfully connected to Stellar wallet",
        })
      } else {
        // Simulate wallet not found
        toast({
          title: "Wallet Not Found",
          description: "Please install Freighter wallet extension",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.log("[v0] Wallet connection error:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Wallet</h1>
            <p className="text-muted-foreground">
              Manage your Stellar wallet and track your donations to animal welfare causes
            </p>
          </div>

          {!wallet ? (
            /* Wallet Connection */
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Wallet className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Connect Your Stellar Wallet</CardTitle>
                <CardDescription>
                  Connect your Stellar wallet to start making donations and track your impact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={connectWallet} disabled={isConnecting} className="w-full" size="lg">
                  {isConnecting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p className="mb-2">Supported wallets:</p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    <Badge variant="outline">Freighter</Badge>
                    <Badge variant="outline">Albedo</Badge>
                    <Badge variant="outline">Rabet</Badge>
                    <Badge variant="outline">xBull</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Connected Wallet Dashboard */
            <div className="space-y-6">
              {/* Wallet Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Stellar Wallet</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Connected
                          </Badge>
                          <span className="text-sm text-muted-foreground">{wallet.network}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Wallet Address */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="flex-1 px-3 py-2 bg-muted rounded-md text-sm font-mono">
                        {wallet.address.slice(0, 12)}...{wallet.address.slice(-12)}
                      </code>
                      <Button variant="outline" size="sm" onClick={() => copyAddress(wallet.address)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Balance */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">XLM Balance</div>
                      <div className="text-2xl font-bold">{wallet.balance.xlm.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Stellar Lumens</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground">USDC Balance</div>
                      <div className="text-2xl font-bold">${wallet.balance.usdc.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">USD Coin</div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Send Donation
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Funds
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction History */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <History className="h-5 w-5" />
                        Transaction History
                      </CardTitle>
                      <CardDescription>Your donation history and wallet activity</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Explorer
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((tx, index) => (
                      <div key={tx.id}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                tx.type === "donation" ? "bg-primary/10" : "bg-accent/10"
                              }`}
                            >
                              {tx.type === "donation" ? (
                                <Send className="h-4 w-4 text-primary" />
                              ) : (
                                <Plus className="h-4 w-4 text-accent" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">
                                {tx.type === "donation" ? "Donation Sent" : "Funds Received"}
                              </div>
                              <div className="text-sm text-muted-foreground">{tx.clinic || tx.donor}</div>
                              <div className="text-xs text-muted-foreground">{formatDate(tx.date)}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              {tx.type === "donation" ? "-" : "+"}
                              {tx.amount} {tx.currency}
                            </div>
                            <div className="flex items-center gap-1">
                              {tx.status === "completed" ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <AlertCircle className="h-3 w-3 text-yellow-500" />
                              )}
                              <span className="text-xs text-muted-foreground capitalize">{tx.status}</span>
                            </div>
                          </div>
                        </div>
                        {index < transactions.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Your wallet keys are stored securely in your browser extension</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">All transactions are recorded on the Stellar blockchain</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">VetChain never has access to your private keys</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
