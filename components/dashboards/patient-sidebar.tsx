"use client"

import { Button } from "@/components/ui/button"
import { logoutUser } from "@/components/auth/logout";
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Calendar, FileText, MessageSquare, User, Settings, LogOut, X } from "lucide-react"
import { useState, useEffect } from "react"

interface PatientSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isOpen: boolean
  onClose: () => void
}

interface Role {
  id: number
  name: string
}

interface UserData {
  id?: number  // Made optional to handle cases where it might be undefined
  name: string
  email: string
  phoneNumber?: string
  gender?: string
  role: Role
  specialty?: string
  location?: string
  yearsOfExperience?: number
  rating?: number
  availability?: string
  qualification?: string
  bio?: string
  age?: number
}

export function PatientSidebar({ activeTab, onTabChange, isOpen, onClose }: PatientSidebarProps) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const menuItems = [
    { id: "search", label: "Find Doctors", icon: Search },
    { id: "appointments", label: "My Appointments", icon: Calendar },
    { id: "prescriptions", label: "Prescriptions", icon: FileText },
    { id: "feedback", label: "Doctor Feedback", icon: MessageSquare },
  ]

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")
        
        // Check if token exists and is valid
        if (!token || token.trim() === "") {
          throw new Error("No authentication token found")
        }

        const response = await fetch("http://localhost:8080/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: UserData = await response.json()
        setUserData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch user data")
        console.error("Error fetching user data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Function to get initials from name
  const getInitials = (name: string) => {
    if (!name) return "US"
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Generate patient ID based on user ID with safety check
  const getPatientId = (user: UserData | null) => {
    if (!user || !user.id) return "P000000" // Default value if userId is undefined
    return `P${user.id.toString().padStart(6, '0')}`
  }

  return (

    <>
      <div
        className={`fixed lg:absolute top-0 left-0 h-full w-80 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:top-16`}
      >
        <div className="p-6 space-y-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center lg:hidden">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Profile */}
          <Card>
            <CardContent className="p-6">
              {loading ? (
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>...</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-32 animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-28 animate-pulse"></div>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center text-destructive text-sm">
                  Failed to load user data
                </div>
              ) : userData ? (
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/default-profile-avatar.png" />
                    <AvatarFallback>{getInitials(userData.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                   <h3 className="font-semibold text-foreground">{userData.name}</h3>
                    <p className="text-sm text-muted-foreground"> {userData.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {userData.age && `Age: ${userData.age}`}
                      {userData.age && userData.gender && " • "}
                      {userData.gender && `${userData.gender}`}
                      {!userData.age && !userData.gender && userData.email}
                    </p>
                    {/* {userData.role && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Role: {userData.role.name}
                      </p>
                    )} */}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  onTabChange(item.id)
                  if (window.innerWidth < 1024) {
                    onClose()
                  }
                }}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Account Actions */}
          <div className="space-y-2 pt-4 border-t border-border">
            <Button variant="ghost" className="w-full justify-start">
              <User className="h-4 w-4 mr-3" />
              Profile Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-3" />
              Account Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={logoutUser}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}