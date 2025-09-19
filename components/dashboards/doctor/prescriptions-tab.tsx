"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Pill, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PrescriptionsTab() {
  const [isCreating, setIsCreating] = useState(false)
  const [appointments, setAppointments] = useState<any[]>([])
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>("")
  const [notes, setNotes] = useState("")
  const [prescriptionText, setPrescriptionText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recent, setRecent] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        const storedUser = localStorage.getItem("user")
        const doctorId = storedUser ? JSON.parse(storedUser)?.id : null
        const token = localStorage.getItem("token") || ""
        if (!doctorId || !token) {
          setError("Missing auth/user. Please login again.")
          setLoading(false)
          return
        }

        // ✅ Fetch doctor's appointments
        const apptRes = await fetch(`http://localhost:8080/api/appointments/doctor/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (apptRes.ok) {
          const apptData = await apptRes.json()
          setAppointments(Array.isArray(apptData) ? apptData : [])
        }

        // ✅ Fetch doctor's prescriptions
        const recentRes = await fetch(`http://localhost:8080/api/records/doctor/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (recentRes.ok) {
          const rec = await recentRes.json()
          setRecent(Array.isArray(rec) ? rec : [])
        }
      } catch (e: any) {
        setError(e?.message || "Failed to load data")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const appointmentOptions = useMemo(() => {
    return appointments.map((a: any) => {
      const dt = a.appointmentDate ? new Date(a.appointmentDate) : null
      const date = dt ? dt.toLocaleDateString() : ""
      const time = dt ? dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""
      return {
        id: a.id,
        label: `${a.patient?.name || "Patient"} • ${date} ${time}`.trim(),
        patientId: a.patient?.id,
      }
    })
  }, [appointments])

  const handleCreatePrescription = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    try {
      const token = localStorage.getItem("token") || ""
      if (!token) throw new Error("No auth token")
      const selected = appointmentOptions.find((o) => o.id === Number(selectedAppointmentId))
      if (!selected) throw new Error("Select a valid appointment")

      const payload = {
        appointmentId: Number(selectedAppointmentId),
        notes,
        prescription: prescriptionText,
      }

      // ✅ Correct API for creation
      const res = await fetch("http://localhost:8080/api/records/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || `Failed to create prescription (${res.status})`)
      }

      // ✅ Show success toast
      toast({ title: "Prescription Created", description: "Record saved successfully." })
      
      // ✅ ADDED: Show success alert message
      alert("Prescription created successfully!");
      
      setSelectedAppointmentId("")
      setNotes("")
      setPrescriptionText("")

      // 🔄 Refresh doctor's prescriptions
      const storedUser = localStorage.getItem("user")
      const doctorId = storedUser ? JSON.parse(storedUser)?.id : null
      if (doctorId) {
        const recentRes = await fetch(`http://localhost:8080/api/records/doctor/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (recentRes.ok) setRecent(await recentRes.json())
      }
    } catch (err: any) {
      toast({
        title: "Failed to create prescription",
        description: err?.message || "Error",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Prescription Management</h2>
          <p className="text-muted-foreground">Create and manage patient prescriptions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Prescription
        </Button>
      </div>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Create Prescription</TabsTrigger>
          <TabsTrigger value="recent">Recent Prescriptions</TabsTrigger>
        </TabsList>

        {/* ✅ Create Prescription */}
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Prescription</CardTitle>
              <CardDescription>Add prescription details for your patient</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePrescription} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="appointment">Select Appointment</Label>
                  <Select value={selectedAppointmentId} onValueChange={setSelectedAppointmentId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an appointment" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentOptions.map((opt) => (
                        <SelectItem key={opt.id} value={String(opt.id)}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add medical notes"
                    className="min-h-[100px]"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prescription">Prescription</Label>
                  <Textarea
                    id="prescription"
                    placeholder="Enter prescription text"
                    className="min-h-[120px]"
                    value={prescriptionText}
                    onChange={(e) => setPrescriptionText(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" disabled={isCreating} className="w-full">
                  {isCreating ? "Creating Prescription..." : "Create Prescription"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ✅ Recent Prescriptions */}
        <TabsContent value="recent" className="space-y-4">
          <div className="space-y-4">
            {recent.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item.patient?.image || "/placeholder.svg"} />
                      <AvatarFallback>
                        {(item.patient?.name || "")
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground flex items-center space-x-2">
                            <Pill className="h-4 w-4 text-primary" />
                            <span>Prescription</span>
                          </h4>
                          <p className="text-muted-foreground">Patient: {item.patient?.name}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {item.prescription}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}