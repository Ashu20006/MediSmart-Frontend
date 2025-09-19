"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Video, MapPin } from "lucide-react"

export function AppointmentsTab() {
  const todayAppointments = [
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. Sarah Johnson",
      time: "9:00 AM",
      type: "In-Person",
      status: "Confirmed",
      patientImage: "/placeholder.svg?height=40&width=40",
      doctorImage: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      patient: "Mary Smith",
      doctor: "Dr. Michael Chen",
      time: "10:30 AM",
      type: "Video Call",
      status: "Confirmed",
      patientImage: "/placeholder.svg?height=40&width=40",
      doctorImage: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      patient: "Robert Johnson",
      doctor: "Dr. Emily Rodriguez",
      time: "2:00 PM",
      type: "In-Person",
      status: "Pending",
      patientImage: "/placeholder.svg?height=40&width=40",
      doctorImage: "/placeholder.svg?height=40&width=40",
    },
  ]

  const upcomingAppointments = [
    {
      id: 4,
      patient: "Lisa Wilson",
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-16",
      time: "11:00 AM",
      type: "Video Call",
      status: "Confirmed",
      patientImage: "/placeholder.svg?height=40&width=40",
      doctorImage: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      patient: "David Brown",
      doctor: "Dr. Michael Chen",
      date: "2024-01-17",
      time: "3:30 PM",
      type: "In-Person",
      status: "Confirmed",
      patientImage: "/placeholder.svg?height=40&width=40",
      doctorImage: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const AppointmentCard = ({ appointment, showDate = false }: { appointment: any; showDate?: boolean }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="flex -space-x-2">
              <Avatar className="h-10 w-10 border-2 border-background">
                <AvatarImage src={appointment.patientImage || "/placeholder.svg"} />
                <AvatarFallback>
                  {appointment.patient
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10 border-2 border-background">
                <AvatarImage src={appointment.doctorImage || "/placeholder.svg"} />
                <AvatarFallback>
                  {appointment.doctor
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold text-foreground">{appointment.patient}</h4>
                <p className="text-sm text-muted-foreground">with {appointment.doctor}</p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                {showDate && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{appointment.date}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {appointment.type === "Video Call" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                  <span>{appointment.type}</span>
                </div>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Appointment Management</h2>
        <p className="text-muted-foreground">Monitor and manage all platform appointments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-foreground mb-2">89</div>
            <div className="text-sm text-muted-foreground">Today's Appointments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">76</div>
            <div className="text-sm text-muted-foreground">Confirmed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-2">8</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600 mb-2">5</div>
            <div className="text-sm text-muted-foreground">Cancelled</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today ({todayAppointments.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <div className="space-y-4">
            {todayAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} showDate={true} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
