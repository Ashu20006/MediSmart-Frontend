"use client"
import API_BASE_URL from "@/config/api";
import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { PatientSidebar } from "@/components/dashboards/patient-sidebar"
import { DoctorSearchTab } from "@/components/dashboards/patient/doctor-search-tab"
import { AppointmentsTab } from "@/components/dashboards/patient/appointments-tab"
import { PrescriptionsTab } from "@/components/dashboards/patient/prescriptions-tab"
import { FeedbackTab } from "@/components/dashboards/patient/feedback-tab"
import { SOSButton } from "@/components/dashboards/patient/sos-button"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserDTO {
  name: string
  email: string
  role: string
  age?: number
  gender?: string
}

export function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("search")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<UserDTO | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          console.warn("No authentication token found")
          setLoading(false)
          return
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
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
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const renderContent = () => {
    switch (activeTab) {
           case "search":
        return <DoctorSearchTab />
       case "appointments":
        return <AppointmentsTab />
      case "prescriptions":
        return <PrescriptionsTab />
      case "feedback":
        return <FeedbackTab />
      default:
        return <AppointmentsTab />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex pt-16 relative">
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <PatientSidebar
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
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="shrink-0">
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                {loading ? (
                  <>
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {user ? `Welcome, ${user.name}` : "Welcome, Patient"}
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Manage your healthcare appointments and prescriptions
                    </p>
                  </>
                )}
              </div>
            </div>
            <SOSButton />
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  )
}