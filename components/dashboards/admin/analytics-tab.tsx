"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, Calendar, Stethoscope, AlertTriangle } from "lucide-react"

export function AnalyticsTab() {
  const metrics = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      period: "vs last month",
    },
    {
      title: "Active Doctors",
      value: "156",
      change: "+3.2%",
      trend: "up",
      period: "vs last month",
    },
    {
      title: "Appointments",
      value: "2,891",
      change: "+18.7%",
      trend: "up",
      period: "this month",
    },
    {
      title: "SOS Alerts",
      value: "47",
      change: "-8.3%",
      trend: "down",
      period: "vs last month",
    },
  ]

  const topDoctors = [
    { name: "Dr. Sarah Johnson", specialty: "Cardiology", appointments: 89, rating: 4.9 },
    { name: "Dr. Michael Chen", specialty: "Dermatology", appointments: 76, rating: 4.8 },
    { name: "Dr. Emily Rodriguez", specialty: "General Medicine", appointments: 65, rating: 4.9 },
    { name: "Dr. James Wilson", specialty: "Orthopedics", appointments: 58, rating: 4.7 },
  ]

  const platformStats = [
    { metric: "Average Session Duration", value: "12.5 minutes", change: "+2.1%" },
    { metric: "User Satisfaction", value: "4.8/5.0", change: "+0.2" },
    { metric: "Appointment Completion Rate", value: "94.2%", change: "+1.8%" },
    { metric: "Emergency Response Time", value: "8.5 minutes", change: "-1.2 min" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Analytics & Reports</h2>
        <p className="text-muted-foreground">Platform performance metrics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                  {index === 0 && <Users className="h-6 w-6 text-primary" />}
                  {index === 1 && <Stethoscope className="h-6 w-6 text-primary" />}
                  {index === 2 && <Calendar className="h-6 w-6 text-primary" />}
                  {index === 3 && <AlertTriangle className="h-6 w-6 text-primary" />}
                </div>
              </div>
              <div className="flex items-center mt-4">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.change}
                </span>
                <span className="text-sm text-muted-foreground ml-1">{metric.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Doctors */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Doctors</CardTitle>
            <CardDescription>Based on appointments and ratings this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDoctors.map((doctor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{doctor.name}</h4>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{doctor.appointments} appointments</Badge>
                      <Badge>{doctor.rating}★</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{stat.metric}</h4>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{stat.value}</div>
                    <div className="text-sm text-green-600">{stat.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Trends</CardTitle>
          <CardDescription>Platform activity over the past 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">89%</div>
              <div className="text-sm text-muted-foreground">User Retention Rate</div>
              <div className="text-xs text-green-600 mt-1">+5.2% from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2.3x</div>
              <div className="text-sm text-muted-foreground">Growth Rate</div>
              <div className="text-xs text-green-600 mt-1">+0.4x from last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.2</div>
              <div className="text-sm text-muted-foreground">Avg. Sessions per User</div>
              <div className="text-xs text-green-600 mt-1">+0.8 from last month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
