"use client"
import API_BASE_URL from "@/config/api";
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Calendar, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function DoctorSearchTab() {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearched, setIsSearched] = useState(false)
  const [locations, setLocations] = useState<string[]>([])
  const [specialties, setSpecialties] = useState<string[]>([
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
  ])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [availability, setAvailability] = useState("")

  // Booking form state
  const [open, setOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null)
  const [appointmentDate, setAppointmentDate] = useState("")

  // Fetch unique locations
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/recommendations/locations`)
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error("Failed to fetch locations:", err))
  }, [])

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/recommendations/doctors?location=${encodeURIComponent(
          selectedLocation.trim()
        )}&specialty=${encodeURIComponent(selectedSpecialty.trim())}&availability=${encodeURIComponent(
          availability.trim()
        )}`
      )

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      setSearchResults(data)
      setIsSearched(true)
    } catch (err) {
      console.error("Failed to fetch doctors:", err)
      setSearchResults([])
      setIsSearched(true)
    }
  }

  const handleBook = (doctor: any) => {
    setSelectedDoctor(doctor)
    setOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDoctor) return

    const token = localStorage.getItem("token") || ""
    if (!token) {
      alert("Please login to book an appointment")
      return
    }

    const storedUser = localStorage.getItem("user")
    const patientId = storedUser ? JSON.parse(storedUser)?.id : null
    if (!patientId) {
      alert("Missing patient information. Please re-login and try again.")
      return
    }

    const payload = {
      patientId,
      doctorId: selectedDoctor.id, // automatically picked from API
      appointmentDate,
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        alert("Appointment booked successfully!")
        setOpen(false)
        setAppointmentDate("")
        setSelectedDoctor(null)
      } else {
        const errorMsg = await res.text()
        alert("Failed to book appointment: " + errorMsg)
      }
    } catch (err) {
      console.error("Error booking appointment:", err)
    }
  }

  return (
    <section id="doctor-search" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-left">
          <h2 className="text-3xl lg:text-2xl font-bold text-foreground mb-4">Find Available Doctors</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Search for qualified doctors by location, specialty, and availability. Book appointments instantly.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto mb-12">
          <CardHeader>
            <CardTitle>Search for Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto" position="popper" align="start">
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Specialty</Label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto" position="popper" align="start">
                    {specialties.map((spec) => (
                      <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Availability</Label>
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="Enter day (e.g., Monday)"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="flex items-end col-span-3">
                <Button onClick={handleSearch} className="w-full">Search Doctors</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {isSearched && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Available Doctors ({searchResults.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((doctor, index) => (
                <Card key={doctor.id || index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="w-16 h-16 rounded-full object-cover" />
                      <div className="flex-1 space-y-2">
                        <h4 className="font-semibold text-foreground">{doctor.name}</h4>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{doctor.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{doctor.rating}</span>
                          <span className="text-sm text-muted-foreground">• {doctor.yearsOfExperience} years</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {doctor.availability}
                        </Badge>
                      </div>
                    </div>
                    <Button className="w-full mt-4" onClick={() => handleBook(doctor)}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book Appointment</DialogTitle>
              <DialogDescription>
                Select date & confirm your booking with {selectedDoctor?.name}.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Doctor</Label>
                <Input value={selectedDoctor?.name || ""} disabled className="w-full" />
              </div>

              <div>
                <Label>Appointment Date</Label>
                <Input
                  type="datetime-local"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <Button type="submit" className="w-full">Confirm Booking</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}