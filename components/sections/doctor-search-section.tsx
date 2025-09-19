"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Calendar, Clock } from "lucide-react"

export function DoctorSearchSection() {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearched, setIsSearched] = useState(false)
  const [locations, setLocations] = useState<string[]>([])
  const [specialties, setSpecialties] = useState<string[]>([
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Cardiologist",
  ])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [availability, setAvailability] = useState("")

  // Fetch unique locations from API
  useEffect(() => {
    fetch("http://localhost:8080/api/recommendations/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        if (data.length > 0) {
          setSelectedLocation(data[2]);  // Set first location as default
        }
      })
      .catch((err) => console.error("Failed to fetch locations:", err));
  }, []);

  const handleSearch = async () => {
    console.log("Searching with:", { selectedLocation, selectedSpecialty, availability })

    try {
      const normalizedLocation = selectedLocation.toLowerCase().trim()
      const normalizedSpecialty = selectedSpecialty.toLowerCase().trim() // trim here strictly
      const normalizedAvailability = availability.toLowerCase().trim()

      const res = await fetch(
        `http://localhost:8080/api/recommendations/doctors?location=${encodeURIComponent(
          normalizedLocation
        )}&specialty=${encodeURIComponent(normalizedSpecialty)}&availability=${encodeURIComponent(
          normalizedAvailability
        )}`
      )

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log("Fetched doctors:", data)
      setSearchResults(data)
      setIsSearched(true)
    } catch (err) {
      console.error("Failed to fetch doctors:", err)
      setSearchResults([])
      setIsSearched(true)
    }
  }

  return (
    <section id="doctor-search" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Find Available Doctors</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Search for qualified doctors by location, specialty, and availability. Book appointments instantly.
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-4xl mx-auto mb-12">
          <CardHeader>
            <CardTitle>Search for Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Location Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto" position="popper" align="start">
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Specialty Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto" position="popper" align="start">
                    {specialties.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Availability Input */}
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Input
                  id="availability"
                  placeholder="Enter day (e.g., Monday)"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="flex items-end col-span-3">
                <Button onClick={handleSearch} className="w-full">
                  Search Doctors
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {isSearched && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Available Doctors ({searchResults.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((doctor, index) => (
                <Card key={doctor.id || doctor.email || index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
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
                          <span className="text-sm text-muted-foreground">
                            • {doctor.yearsOfExperience} years
                          </span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {doctor.availability}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4"
                      onClick={() => alert("Please register to book appointments")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}