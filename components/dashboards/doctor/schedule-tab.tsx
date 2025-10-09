"use client"
import API_BASE_URL from "@/config/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Video, MapPin, User } from "lucide-react"

export function ScheduleTab() {
  const todaySchedule = [
    {
      id: 1,
      time: "9:00 AM",
      patient: "Lisa Wilson",
      type: "Video Call",
      duration: "30 min",
      status: "Confirmed",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      time: "10:30 AM",
      patient: "David Brown",
      type: "In-Person",
      duration: "45 min",
      status: "Confirmed",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      time: "2:00 PM",
      patient: "John Doe",
      type: "In-Person",
      duration: "30 min",
      status: "Pending",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      time: "3:30 PM",
      patient: "Mary Smith",
      type: "Video Call",
      duration: "30 min",
      status: "Confirmed",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      time: "4:30 PM",
      patient: "Available Slot",
      type: "Open",
      duration: "30 min",
      status: "Available",
      image: null,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Available":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">My Schedule</h2>
        <p className="text-muted-foreground">View your daily appointment schedule</p>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Today's Schedule - January 15, 2024</span>
          </CardTitle>
          <CardDescription>Your appointments for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaySchedule.map((appointment) => (
              <div key={appointment.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                <div className="text-center min-w-[80px]">
                  <div className="font-semibold text-foreground">{appointment.time}</div>
                  <div className="text-sm text-muted-foreground">{appointment.duration}</div>
                </div>

                <div className="flex-1 flex items-center space-x-4">
                  {appointment.image ? (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={appointment.image || "/placeholder.svg"} />
                      <AvatarFallback>
                        {appointment.patient
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}

                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{appointment.patient}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      {appointment.type === "Video Call" ? (
                        <Video className="h-4 w-4" />
                      ) : appointment.type === "In-Person" ? (
                        <MapPin className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                      <span>{appointment.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                  {appointment.status === "Confirmed" && appointment.type === "Video Call" && (
                    <Button size="sm">Join Call</Button>
                  )}
                  {appointment.status === "Available" && (
                    <Button size="sm" variant="outline">
                      Block Slot
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">8</div>
            <div className="text-sm text-muted-foreground">Total Appointments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">6</div>
            <div className="text-sm text-muted-foreground">Confirmed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-2">1</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
