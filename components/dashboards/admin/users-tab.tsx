"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreHorizontal, UserCheck, UserX, Mail, Phone } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export function UsersTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const patients = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      joinDate: "2024-01-10",
      status: "Active",
      appointments: 5,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Mary Smith",
      email: "mary.smith@email.com",
      phone: "+1 (555) 987-6543",
      joinDate: "2024-01-08",
      status: "Active",
      appointments: 3,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@email.com",
      phone: "+1 (555) 456-7890",
      joinDate: "2024-01-05",
      status: "Inactive",
      appointments: 1,
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@medismart.com",
      phone: "+1 (555) 111-2222",
      specialty: "Cardiology",
      joinDate: "2023-12-01",
      status: "Verified",
      patients: 45,
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      email: "michael.chen@medismart.com",
      phone: "+1 (555) 333-4444",
      specialty: "Dermatology",
      joinDate: "2023-11-15",
      status: "Verified",
      patients: 32,
      rating: 4.8,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@medismart.com",
      phone: "+1 (555) 555-6666",
      specialty: "General Medicine",
      joinDate: "2024-01-12",
      status: "Pending",
      patients: 0,
      rating: 0,
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleUserAction = (action: string, userName: string) => {
    toast({
      title: `User ${action}`,
      description: `${userName} has been ${action.toLowerCase()}.`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Verified":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const UserCard = ({ user, type }: { user: any; type: "patient" | "doctor" }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image || "/placeholder.svg"} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold text-foreground">{user.name}</h4>
                {type === "doctor" && <p className="text-sm text-muted-foreground">{user.specialty}</p>}
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>{user.phone}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-muted-foreground">Joined: {user.joinDate}</span>
                {type === "patient" && <span className="text-muted-foreground">Appointments: {user.appointments}</span>}
                {type === "doctor" && (
                  <>
                    <span className="text-muted-foreground">Patients: {user.patients}</span>
                    {user.rating > 0 && <span className="text-muted-foreground">Rating: {user.rating}★</span>}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleUserAction("Activated", user.name)}>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Activate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUserAction("Suspended", user.name)}>
                  <UserX className="h-4 w-4 mr-2" />
                  Suspend
                </DropdownMenuItem>
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Send Message</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">User Management</h2>
          <p className="text-muted-foreground">Manage patients and doctors on the platform</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-10 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="patients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patients">Patients ({patients.length})</TabsTrigger>
          <TabsTrigger value="doctors">Doctors ({doctors.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {patients
              .filter((patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((patient) => (
                <UserCard key={patient.id} user={patient} type="patient" />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="doctors" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {doctors
              .filter((doctor) => doctor.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((doctor) => (
                <UserCard key={doctor.id} user={doctor} type="doctor" />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
