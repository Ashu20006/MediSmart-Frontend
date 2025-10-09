"use client"
import API_BASE_URL from "@/config/api";
import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, User, Calendar, Phone, Mail, MapPin, FileText, Pill } from "lucide-react"

export function PatientDetailsTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [patients, setPatients] = useState<any[]>([])
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDoctorPatients = async () => {
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

        const res = await fetch(`${API_BASE_URL}/api/appointments/doctor/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) {
          const msg = await res.text()
          throw new Error(msg || `Failed to load patients (${res.status})`)
        }
        const data = await res.json()

        // Build unique patients list from appointments
        const map = new Map<number, any>()
        for (const a of Array.isArray(data) ? data : []) {
          const p = a.patient
          if (!p || p.id == null) continue
          const existing = map.get(p.id)
          const apptDate = a.appointmentDate ? new Date(a.appointmentDate) : null
          const lastVisit = apptDate ? apptDate.toISOString().slice(0, 10) : undefined
          const merged = {
            id: p.id,
            name: p.name || "Patient",
            age: p.age ?? "",
            gender: p.gender ?? "",
            phone: p.phoneNumber ?? "",
            email: p.email ?? "",
            address: p.location ?? "",
            lastVisit: lastVisit || existing?.lastVisit || "",
            condition: p.specialty || "",
            image: "/placeholder.svg",
            medicalHistory: existing?.medicalHistory || [],
            prescriptions: existing?.prescriptions || [],
          }
          map.set(p.id, merged)
        }

        const patientsArr = Array.from(map.values())
        setPatients(patientsArr)
        setSelectedPatient(patientsArr[0] || null)
      } catch (e: any) {
        setError(e?.message || "Failed to load patients")
      } finally {
        setLoading(false)
      }
    }

    fetchDoctorPatients()
  }, [])

  const filteredPatients = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return patients.filter((patient) =>
      (patient.name || "").toLowerCase().includes(term) || (patient.condition || "").toLowerCase().includes(term),
    )
  }, [patients, searchTerm])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Patient Details</h2>
        <p className="text-muted-foreground">View comprehensive patient information and medical history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>My Patients</CardTitle>
            <CardDescription>Search and select a patient to view details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading && <p className="text-sm text-muted-foreground">Loading patients...</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedPatient?.id === patient.id
                      ? "bg-primary/10 border border-primary"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={patient.image || "/placeholder.svg"} />
                      <AvatarFallback>
                        {patient.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">{patient.condition}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Patient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedPatient?.image || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {selectedPatient?.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{selectedPatient?.name}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant="secondary">{selectedPatient?.age} years old</Badge>
                      <Badge variant="secondary">{selectedPatient?.gender}</Badge>
                      <Badge>{selectedPatient?.condition}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedPatient?.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedPatient?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 md:col-span-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedPatient?.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Last visit: {selectedPatient?.lastVisit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical History and Prescriptions */}
          <Tabs defaultValue="history" className="space-y-4">
            <TabsList>
              <TabsTrigger value="history">Medical History</TabsTrigger>
              <TabsTrigger value="prescriptions">Current Prescriptions</TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Medical History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(selectedPatient?.medicalHistory || []).map((record: any, index: number) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{record.diagnosis}</h4>
                          <span className="text-sm text-muted-foreground">{record.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{record.treatment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prescriptions">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Pill className="h-5 w-5" />
                    <span>Current Prescriptions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(selectedPatient?.prescriptions || []).map((prescription: any, index: number) => (
                      <div key={index} className="bg-muted p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{prescription.medication}</h4>
                          <span className="text-sm text-muted-foreground">{prescription.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
