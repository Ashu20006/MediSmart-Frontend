"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, Clock, MapPin, Phone, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SOSAlertsTab() {
  const { toast } = useToast()

  const activeAlerts = [
    {
      id: 1,
      patient: "John Doe",
      patientId: "P001234",
      location: "123 Main St, New York, NY",
      time: "2 minutes ago",
      status: "Active",
      priority: "High",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      patient: "Mary Smith",
      patientId: "P005678",
      location: "456 Oak Ave, Brooklyn, NY",
      time: "8 minutes ago",
      status: "Responding",
      priority: "Critical",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const recentAlerts = [
    {
      id: 3,
      patient: "Robert Johnson",
      patientId: "P009876",
      location: "789 Pine St, Queens, NY",
      time: "1 hour ago",
      status: "Resolved",
      priority: "Medium",
      responseTime: "12 minutes",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      patient: "Lisa Wilson",
      patientId: "P004321",
      location: "321 Elm St, Manhattan, NY",
      time: "3 hours ago",
      status: "Resolved",
      priority: "High",
      responseTime: "8 minutes",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleRespond = (alertId: number, patientName: string) => {
    toast({
      title: "Emergency Response Initiated",
      description: `Emergency services have been contacted for ${patientName}.`,
    })
  }

  const handleResolve = (alertId: number, patientName: string) => {
    toast({
      title: "Alert Resolved",
      description: `SOS alert for ${patientName} has been marked as resolved.`,
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-red-100 text-red-800"
      case "Responding":
        return "bg-yellow-100 text-yellow-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const AlertCard = ({ alert, isActive = false }: { alert: any; isActive?: boolean }) => (
    <Card className={`${alert.priority === "Critical" ? "border-red-300 bg-red-50" : ""}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={alert.image || "/placeholder.svg"} />
              <AvatarFallback>
                {alert.patient
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold text-foreground flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span>{alert.patient}</span>
                </h4>
                <p className="text-sm text-muted-foreground">Patient ID: {alert.patientId}</p>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{alert.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{alert.time}</span>
                </div>
                {alert.responseTime && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Resolved in {alert.responseTime}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex space-x-2">
              <Badge className={getPriorityColor(alert.priority)}>{alert.priority}</Badge>
              <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
            </div>
            {isActive && (
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => handleRespond(alert.id, alert.patient)}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call 911
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleResolve(alert.id, alert.patient)}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Resolve
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">SOS Emergency Alerts</h2>
        <p className="text-muted-foreground">Monitor and respond to emergency alerts from patients</p>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600 mb-2">{activeAlerts.length}</div>
            <div className="text-sm text-muted-foreground">Active Alerts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-foreground mb-2">24</div>
            <div className="text-sm text-muted-foreground">Total Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">8.5</div>
            <div className="text-sm text-muted-foreground">Avg Response (min)</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Resolution Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <span>Active Emergency Alerts ({activeAlerts.length})</span>
          </CardTitle>
          <CardDescription>Immediate attention required</CardDescription>
        </CardHeader>
        <CardContent>
          {activeAlerts.length > 0 ? (
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} isActive={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Active Alerts</h3>
              <p className="text-muted-foreground">All emergency situations have been resolved.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Recently resolved emergency situations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
