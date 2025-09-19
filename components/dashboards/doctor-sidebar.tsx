"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { logoutUser } from "@/components/auth/logout";
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Users, Clock, User, Settings, LogOut, Star, X } from "lucide-react"

interface DoctorSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isOpen: boolean
  onClose: () => void
}

interface UserDTO {
  name: string
  email: string
  role: string
  specialty?: string
  yearsOfExperience: number
  rating: number
}

export function DoctorSidebar({ activeTab, onTabChange, isOpen, onClose }: DoctorSidebarProps) {
  const [user, setUser] = useState<UserDTO | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return

        const response = await fetch("http://localhost:8080/api/auth/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data)
        } else {
          console.error("Failed to fetch user info")
        }
      } catch (err) {
        console.error("Error fetching user:", err)
      }
    }

    fetchUser()
  }, [])

  const menuItems = [
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "prescriptions", label: "Prescriptions", icon: FileText },
    { id: "patients", label: "Patient Details", icon: Users },
    { id: "schedule", label: "My Schedule", icon: Clock },
  ]

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

          {/* Doctor Profile */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/doctor-profile-avatar.jpg" />
                  <AvatarFallback>{user ? user.name.charAt(0) : "?"}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {user ? `Dr. ${user.name}` : "Loading..."}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.specialty || "Specialty"}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">
                        {user?.rating ?? "0.0"}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {user?.yearsOfExperience ?? 0} years exp.
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-foreground mb-4">Today's Overview</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Appointments</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Pending Requests</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Prescriptions</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
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
        onClick={logoutUser}  // Call our logout function
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
