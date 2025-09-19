"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { DoctorSidebar } from "@/components/dashboards/doctor-sidebar"
import { AppointmentRequestsTab } from "@/components/dashboards/doctor/appointment-requests-tab"
import { PrescriptionsTab } from "@/components/dashboards/doctor/prescriptions-tab"
import { PatientDetailsTab } from "@/components/dashboards/doctor/patient-details-tab"
import { ScheduleTab } from "@/components/dashboards/doctor/schedule-tab"
import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserDTO {
  name: string
  email: string
  role: string
  age?: number
  gender?: string
}

export function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("appointments")
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  const renderContent = () => {
    switch (activeTab) {
      case "appointments":
        return <AppointmentRequestsTab />
      case "prescriptions":
        return <PrescriptionsTab />
      case "patients":
        return <PatientDetailsTab />
      case "schedule":
        return <ScheduleTab />
      default:
        return <AppointmentRequestsTab />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex pt-16 relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <DoctorSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main
          className={`flex-1 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "lg:ml-80" : "ml-0"
          } p-4 sm:p-6 bg-muted/30 overflow-auto`}
        >
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="shrink-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {user ? `Welcome, Dr. ${user.name}` : "Welcome,"}
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Manage your appointments and patient care
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Bell className="h-4 w-4" />
              Notifications
            </Button>
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
