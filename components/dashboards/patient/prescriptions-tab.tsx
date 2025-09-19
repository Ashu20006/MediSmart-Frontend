"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, Tablet, Clock, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Prescription {
  id: number
  notes: string
  prescription: string
  createdAt: string
  appointment: {
    id: number
    doctor: {
      name: string
      specialty?: string
    }
    appointmentDate: string
    status: string
  }
}

interface User {
  id: number
  name: string
}

export function PrescriptionsTab() {
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserAndPrescriptions = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) throw new Error("User not logged in")

        // Fetch user info
        const userRes = await fetch("http://localhost:8080/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!userRes.ok) throw new Error("Failed to fetch user")
        const currentUser: User = await userRes.json()
        setUser(currentUser)

        // Fetch prescriptions
        const presRes = await fetch(`http://localhost:8080/api/records/patient/${currentUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!presRes.ok) throw new Error("Failed to fetch prescriptions")
        const data: Prescription[] = await presRes.json()
        setPrescriptions(data)
      } catch (err) {
        console.error(err)
        toast({
          title: "Error",
          description: "Failed to load prescriptions",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserAndPrescriptions()
  }, [toast])

  const handleDownload = (id: number) => {
    toast({
      title: "Prescription Downloaded",
      description: `Prescription ${id} downloaded successfully`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "COMPLETED":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) return <p>Loading prescriptions...</p>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">My Prescriptions</h2>
        <p className="text-muted-foreground">
          Welcome {user?.name}! View and download your digital prescriptions
        </p>
      </div>

      {prescriptions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Tablet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Prescriptions</h3>
            <p className="text-muted-foreground">You don't have any prescriptions yet.</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {prescriptions.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground text-lg flex items-center space-x-2">
                        <Tablet className="h-5 w-5 text-primary" />
                        <span>{p.prescription}</span>
                      </h4>
                      <p className="text-muted-foreground">
                        Prescribed by {p.appointment.doctor.name}{" "}
                        {p.appointment.doctor.specialty && `(${p.appointment.doctor.specialty})`}
                      </p>
                    </div>
                    <Badge className={getStatusColor(p.appointment.status)}>{p.appointment.status}</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Appointment: {new Date(p.appointment.appointmentDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Created: {new Date(p.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      <span>Notes: {p.notes}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" onClick={() => handleDownload(p.id)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
