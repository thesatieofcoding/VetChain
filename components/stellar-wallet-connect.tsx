"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, RefreshCw, ExternalLink, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface StellarWalletConnectProps {
  onConnect?: (walletData: any) => void
  className?: string
}

export function StellarWalletConnect({ onConnect, className }: StellarWalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    setIsConnecting(true)

    try {
      console.log("[v0] Attempting to connect Stellar wallet...")

      // Check for Freighter wallet
      if (typeof window !== "undefined" && (window as any).freighter) {
        console.log("[v0] Freighter wallet detected")

        // Simulate wallet connection
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const walletData = {
          address: "GCKFBEIYTKPQJQVOCVKBQZPQJQVOCVKBQZPQJQVOCVKBQZPQJQVOCVKB",
          publicKey: "GCKFBEIYTKPQJQVOCVKBQZPQJQVOCVKBQZPQJQVOCVKBQZPQJQVOCVKB",
          network: "Stellar Mainnet",
          isConnected: true,
        }

        if (onConnect) {
          onConnect(walletData)
        }

        toast({
          title: "Wallet Connected",
          description: "Successfully connected to Stellar wallet",
        })
      } else {
        // Wallet not found
        toast({
          title: "Wallet Not Found",
          description: "Please install a Stellar wallet extension like Freighter",
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

  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
          <Wallet className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-lg">Connect Stellar Wallet</CardTitle>
        <CardDescription>Connect your wallet to make secure donations using Stellar blockchain</CardDescription>
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

        <div className="space-y-3">
          <div className="text-center text-sm text-muted-foreground">Supported wallets:</div>
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              Freighter
            </Badge>
            <Badge variant="outline" className="text-xs">
              Albedo
            </Badge>
            <Badge variant="outline" className="text-xs">
              Rabet
            </Badge>
            <Badge variant="outline" className="text-xs">
              xBull
            </Badge>
          </div>

          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">New to Stellar?</p>
              <p>Install Freighter wallet extension to get started with secure crypto donations.</p>
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full bg-transparent">
            <ExternalLink className="mr-2 h-3 w-3" />
            Install Freighter Wallet
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
