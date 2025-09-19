"use client"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Video } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AppointmentRequestsTab() {
  const { toast } = useToast()
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      setLoading(true)
      setError(null)
      try {
        const storedUser = localStorage.getItem("user")
        const doctorId = storedUser ? JSON.parse(storedUser)?.id : null
        if (!doctorId) {
          setError("Missing doctor info. Please login again.")
          setLoading(false)
          return
        }

        const token = localStorage.getItem("token") || ""
        if (!token) {
          setError("No auth token. Please login again.")
          setLoading(false)
          return
        }

        const res = await fetch(`http://localhost:8080/api/appointments/doctor/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
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

    fetchDoctorAppointments()
  }, [])

  const mapToCard = (a: any) => {
    const iso = a.appointmentDate as string
    const dateObj = iso ? new Date(iso) : null
    const date = dateObj ? dateObj.toLocaleDateString() : ""
    const time = dateObj ? dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""
    return {
      id: a.id,
      patient: a.patient?.name || "Patient",
      age: a.patient?.age ?? "",
      gender: a.patient?.gender ?? "",
      date,
      time,
      type: "In-Person",
      reason: a.reason || "",
      status: (a.status || "PENDING").toUpperCase(),
      image: "/placeholder.svg",
    }
  }

  const categorized = useMemo(() => {
    const pending: any[] = []
    const approved: any[] = []
    const rejected: any[] = []
    const completed: any[] = []
    const all: any[] = []

    for (const a of appointments) {
      const card = mapToCard(a)
      all.push(card)
      switch (card.status) {
        case "PENDING":
          pending.push(card)
          break
        case "APPROVED":
          approved.push(card)
          break
        case "REJECTED":
          rejected.push(card)
          break
        case "COMPLETED":
          completed.push(card)
          break
        default:
          pending.push(card)
      }
    }
    return { pending, approved, rejected, completed, all }
  }, [appointments])

  const handleStatusChange = async (appointmentId: number, newStatus: string, patientName: string) => {
    try {
      const token = localStorage.getItem("token") || ""
      const res = await fetch(
        `http://localhost:8080/api/appointments/${appointmentId}/status?status=${newStatus}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (!res.ok) throw new Error(`Failed to update status`)

      // update local state
      setAppointments((prev) =>
        prev.map((a) => (a.id === appointmentId ? { ...a, status: newStatus } : a))
      )

      toast({
        title: `Status Updated`,
        description: `Appointment with ${patientName} is now ${newStatus}.`,
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update appointment status.",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "REJECTED":
        return "bg-red-100 text-red-800"
      case "COMPLETED":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const AppointmentCard = ({ appointment, inAllTab = false }: { appointment: any; inAllTab?: boolean }) => {
    const { id, patient, age, gender, date, time, type, reason, status, image } = appointment

    // Button disable rules
    const isPending = status === "PENDING"
    const isApprovedOrRejected = status === "APPROVED" || status === "REJECTED"
    const isCompleted = status === "COMPLETED"

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={image} />
              <AvatarFallback>
                {patient.split(" ").map((n: string) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">{patient}</h4>
                  <p className="text-sm text-muted-foreground">
                    {age} years old • {gender}
                  </p>
                </div>
                <Badge className={getStatusColor(status)}>{status}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {type === "Video Call" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                  <span>{type}</span>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-1">Reason for visit:</p>
                <p className="text-sm text-muted-foreground">{reason}</p>
              </div>

              {inAllTab && (
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" disabled className="opacity-50 cursor-not-allowed">Pending</Button>
                  <Button
                    size="sm"
                    disabled={!isPending || isApprovedOrRejected || isCompleted}
                    onClick={() => handleStatusChange(id, "APPROVED", patient)}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!isPending || isApprovedOrRejected || isCompleted}
                    onClick={() => handleStatusChange(id, "REJECTED", patient)}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={!isApprovedOrRejected || isCompleted}
                    onClick={() => handleStatusChange(id, "COMPLETED", patient)}
                  >
                    Complete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Appointment Management</h2>
        <p className="text-muted-foreground">Review and manage patient appointment requests</p>
        {loading && <p className="text-sm text-muted-foreground mt-2">Loading appointments...</p>}
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({categorized.pending.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({categorized.approved.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({categorized.rejected.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({categorized.completed.length})</TabsTrigger>
          <TabsTrigger value="all">All ({categorized.all.length})</TabsTrigger>
        </TabsList>

        {/* Pending Tab */}
        <TabsContent value="pending" className="space-y-4">
          {categorized.pending.length > 0 ? (
            categorized.pending.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <p>No Pending Requests</p>
          )}
        </TabsContent>

        {/* Approved Tab */}
        <TabsContent value="approved" className="space-y-4">
          {categorized.approved.length > 0 ? (
            categorized.approved.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <p>No Approved Appointments</p>
          )}
        </TabsContent>

        {/* Rejected Tab */}
        <TabsContent value="rejected" className="space-y-4">
          {categorized.rejected.length > 0 ? (
            categorized.rejected.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <p>No Rejected Appointments</p>
          )}
        </TabsContent>

        {/* Completed Tab */}
        <TabsContent value="completed" className="space-y-4">
          {categorized.completed.length > 0 ? (
            categorized.completed.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <p>No Completed Appointments</p>
          )}
        </TabsContent>

        {/* All Tab */}
        <TabsContent value="all" className="space-y-4">
          {categorized.all.length > 0 ? (
            categorized.all.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} inAllTab={true} />
            ))
          ) : (
            <p>No Appointments</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
