"use client"
import API_BASE_URL from "@/config/api";
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Video, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AppointmentsTab() {
  const { toast } = useToast()
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      setError(null)
      try {
        const storedUser = localStorage.getItem("user")
        const patientId = storedUser ? JSON.parse(storedUser)?.id : null
        if (!patientId) {
          setError("Missing patient info. Please login again.")
          setLoading(false)
          return
        }

        const token = localStorage.getItem("token") || ""
        if (!token) {
          setError("No auth token. Please login again.")
          setLoading(false)
          return
        }

        const res = await fetch(`${API_BASE_URL}/api/appointments/patient/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          const msg = await res.text()
          throw new Error(msg || `Failed to load appointments (${res.status})`)
        }

        const data = await res.json()
        setAppointments(Array.isArray(data) ? data : [])
      } catch (e: any) {
        setError(e?.message || "Failed to load appointments")
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const mapToCard = (a: any) => {
    const iso = a.appointmentDate as string
    const dateObj = iso ? new Date(iso) : null
    const date = dateObj ? dateObj.toLocaleDateString() : ""
    const time = dateObj ? dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""
    return {
      id: a.id,
      doctor: a.doctor?.name || "Doctor",
      specialty: a.doctor?.specialty || "",
      date,
      time,
      type: "In-Person",
      status: a.status || "PENDING",
      location: a.doctor?.location || "",
      image: "/placeholder.svg",
    }
  }

  const { upcomingAppointments, pastAppointments } = useMemo(() => {
    const past = [] as any[]
    const upcoming = [] as any[]
    for (const a of appointments) {
      if ((a.status || "").toUpperCase() === "COMPLETED") past.push(mapToCard(a))
      else upcoming.push(mapToCard(a))
    }
    return { upcomingAppointments: upcoming, pastAppointments: past }
  }, [appointments])

  const handleCancelAppointment = (appointmentId: number) => {
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled successfully.",
    })
  }

  const handleJoinCall = (appointmentId: number) => {
    toast({
      title: "Joining Video Call",
      description: "Redirecting to video consultation...",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const AppointmentCard = ({ appointment, showActions = false }: { appointment: any; showActions?: boolean }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={appointment.image || "/placeholder.svg"}
            alt={appointment.doctor}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-foreground">{appointment.doctor}</h4>
                <p className="text-muted-foreground">{appointment.specialty}</p>
              </div>
              <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                {appointment.type === "Video Call" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                <span>{appointment.location}</span>
              </div>
            </div>

            {showActions && (
              <div className="flex space-x-2 pt-2">
                {appointment.type === "Video Call" && appointment.status === "Confirmed" && (
                  <Button size="sm" onClick={() => handleJoinCall(appointment.id)}>
                    <Video className="h-4 w-4 mr-2" />
                    Join Call
                  </Button>
                )}
                {appointment.status !== "Completed" && (
                  <Button size="sm" variant="outline" onClick={() => handleCancelAppointment(appointment.id)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                )}
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
        <h2 className="text-2xl font-bold text-foreground mb-2">My Appointments</h2>
        <p className="text-muted-foreground">View and manage your healthcare appointments</p>
        {loading && (
          <p className="text-sm text-muted-foreground mt-2">Loading appointments...</p>
        )}
        {error && (
          <p className="text-sm text-red-600 mt-2">{error}</p>
        )}
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">Past Appointments ({pastAppointments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} showActions={true} />
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Upcoming Appointments</h3>
                <p className="text-muted-foreground">You don't have any scheduled appointments.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
