"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { AdminSidebar } from "@/components/dashboards/admin-sidebar"
import { OverviewTab } from "@/components/dashboards/admin/overview-tab"
import { UsersTab } from "@/components/dashboards/admin/users-tab"
import { AppointmentsTab } from "@/components/dashboards/admin/appointments-tab"
import { SOSAlertsTab } from "@/components/dashboards/admin/sos-alerts-tab"
import { AnalyticsTab } from "@/components/dashboards/admin/analytics-tab"
import { Button } from "@/components/ui/button"
import { Menu, Settings, Bell } from "lucide-react"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />
      case "users":
        return <UsersTab />
      case "appointments":
        return <AppointmentsTab />
      case "sos":
        return <SOSAlertsTab />
      case "analytics":
        return <AnalyticsTab />
      default:
        return <OverviewTab />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex pt-16 relative">
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <AdminSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? "lg:ml-80" : "ml-0"}`}>
          <div className="bg-background border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="shrink-0">
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Welcome, Admin User</h1>
                <p className="text-sm text-muted-foreground">System Administrator Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                System Controls
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Alerts (2)
              </Button>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-muted/30 min-h-[calc(100vh-8rem)]">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
