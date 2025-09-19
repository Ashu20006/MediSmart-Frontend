"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, Calendar, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

export function OverviewTab() {
  const stats = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      description: "Active platform users",
    },
    {
      title: "Doctors",
      value: "156",
      change: "+3%",
      trend: "up",
      icon: UserCheck,
      description: "Registered doctors",
    },
    {
      title: "Appointments Today",
      value: "89",
      change: "-5%",
      trend: "down",
      icon: Calendar,
      description: "Scheduled for today",
    },
    {
      title: "Active SOS Alerts",
      value: "2",
      change: "0%",
      trend: "neutral",
      icon: AlertTriangle,
      description: "Emergency alerts",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "user_registration",
      message: "New patient registered: John Smith",
      time: "5 minutes ago",
      status: "info",
    },
    {
      id: 2,
      type: "sos_alert",
      message: "SOS alert triggered by patient ID: P001234",
      time: "12 minutes ago",
      status: "urgent",
    },
    {
      id: 3,
      type: "doctor_approval",
      message: "Doctor verification completed: Dr. Emily Chen",
      time: "1 hour ago",
      status: "success",
    },
    {
      id: 4,
      type: "appointment",
      message: "High volume of appointments scheduled for tomorrow",
      time: "2 hours ago",
      status: "warning",
    },
  ]

  const systemHealth = [
    { component: "Database", status: "Healthy", uptime: "99.9%" },
    { component: "API Services", status: "Healthy", uptime: "99.8%" },
    { component: "Video Calls", status: "Degraded", uptime: "97.2%" },
    { component: "Notifications", status: "Healthy", uptime: "99.9%" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "info":
        return "bg-blue-100 text-blue-800"
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getHealthColor = (status: string) => {
    switch (status) {
      case "Healthy":
        return "bg-green-100 text-green-800"
      case "Degraded":
        return "bg-yellow-100 text-yellow-800"
      case "Down":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                ) : stat.trend === "down" ? (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                ) : null}
                <span
                  className={`text-sm font-medium ${
                    stat.trend === "up"
                      ? "text-green-600"
                      : stat.trend === "down"
                        ? "text-red-600"
                        : "text-muted-foreground"
                  }`}
                >
                  {stat.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <Badge className={getStatusColor(activity.status)}>{activity.type.replace("_", " ")}</Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Current status of platform components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((component, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{component.component}</p>
                    <p className="text-sm text-muted-foreground">Uptime: {component.uptime}</p>
                  </div>
                  <Badge className={getHealthColor(component.status)}>{component.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
