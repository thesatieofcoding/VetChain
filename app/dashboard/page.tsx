"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Search,
  ExternalLink,
  Heart,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

// Mock data for the dashboard
const donationStats = {
  totalDonated: 12450.75,
  totalAnimalsHelped: 342,
  activeClinics: 28,
  thisMonthDonations: 2340.5,
}

const monthlyData = [
  { month: "Jan", donations: 1200, animals: 45 },
  { month: "Feb", donations: 1800, animals: 62 },
  { month: "Mar", donations: 2100, animals: 78 },
  { month: "Apr", donations: 1650, animals: 54 },
  { month: "May", donations: 2340, animals: 89 },
  { month: "Jun", donations: 3360, animals: 114 },
]

const clinicDistribution = [
  { name: "Mexico", value: 35, color: "#22c55e" },
  { name: "Brazil", value: 28, color: "#3b82f6" },
  { name: "Colombia", value: 20, color: "#f59e0b" },
  { name: "Argentina", value: 17, color: "#ef4444" },
]

const recentTransactions = [
  {
    id: "tx_001",
    amount: 75,
    currency: "USDC",
    clinic: "Animal Care Clinic",
    location: "Mexico City, Mexico",
    animal: "Injured street dog - Luna",
    date: "2024-01-20T15:30:00Z",
    status: "completed",
    hash: "abc123def456ghi789",
    impact: "Surgery completed successfully",
  },
  {
    id: "tx_002",
    amount: 45,
    currency: "USDC",
    clinic: "Street Paws Veterinary",
    location: "São Paulo, Brazil",
    animal: "Malnourished cat - Whiskers",
    date: "2024-01-19T09:15:00Z",
    status: "completed",
    hash: "def456ghi789jkl012",
    impact: "Full recovery, ready for adoption",
  },
  {
    id: "tx_003",
    amount: 120,
    currency: "USDC",
    clinic: "Hope Animal Hospital",
    location: "Bogotá, Colombia",
    animal: "Abandoned puppies (3)",
    date: "2024-01-18T12:45:00Z",
    status: "in-progress",
    hash: "ghi789jkl012mno345",
    impact: "Treatment ongoing, good progress",
  },
]

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")

  const filteredTransactions = recentTransactions.filter((tx) => {
    const matchesSearch =
      tx.clinic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.animal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Impact Dashboard</h1>
            <p className="text-muted-foreground">
              Track your donations and see the real impact you're making on animal welfare worldwide
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Donated</p>
                    <p className="text-2xl font-bold">${donationStats.totalDonated.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">+12.5%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Animals Helped</p>
                    <p className="text-2xl font-bold">{donationStats.totalAnimalsHelped}</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">+28</span>
                  <span className="text-muted-foreground ml-1">this month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Clinics</p>
                    <p className="text-2xl font-bold">{donationStats.activeClinics}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <Users className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-muted-foreground">Across 12 countries</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold">${donationStats.thisMonthDonations.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <Progress value={65} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">65% of monthly goal</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="impact">Impact Map</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Donations</CardTitle>
                    <CardDescription>Your donation activity over the past 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="donations" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Clinic Distribution</CardTitle>
                    <CardDescription>Donations by country</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={clinicDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {clinicDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Animals Helped Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Animals Helped Over Time</CardTitle>
                  <CardDescription>Cumulative impact of your donations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="animals"
                        stroke="hsl(var(--accent))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--accent))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search transactions..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Time Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction List */}
              <div className="space-y-4">
                {filteredTransactions.map((tx) => (
                  <Card key={tx.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Heart className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{tx.animal}</h3>
                              <p className="text-sm text-muted-foreground">{tx.clinic}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {tx.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(tx.date)}
                            </div>
                          </div>
                          <div className="mt-2">
                            <Badge
                              variant={
                                tx.status === "completed"
                                  ? "default"
                                  : tx.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="mr-2"
                            >
                              {tx.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {tx.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                              {tx.status === "pending" && <AlertCircle className="h-3 w-3 mr-1" />}
                              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{tx.impact}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-lg font-semibold">
                              ${tx.amount} {tx.currency}
                            </div>
                            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View on Blockchain
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Global Impact Map</CardTitle>
                  <CardDescription>See where your donations are making a difference</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Interactive Map Coming Soon</h3>
                      <p className="text-muted-foreground max-w-md">
                        We're building an interactive map to show real-time locations of animals you've helped and the
                        clinics you've supported worldwide.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Impact Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">342</h3>
                    <p className="text-muted-foreground">Animals Rescued</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">28</h3>
                    <p className="text-muted-foreground">Partner Clinics</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">12</h3>
                    <p className="text-muted-foreground">Countries Reached</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
