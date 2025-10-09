"use client"
import API_BASE_URL from "@/config/api";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { logoutUser } from "@/components/auth/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Calendar, AlertTriangle, User, Settings, LogOut, Shield, X } from "lucide-react"

interface AdminSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ activeTab, onTabChange, isOpen, onClose }: AdminSidebarProps) {
  const menuItems = [
    { id: "overview", label: "Dashboard Overview", icon: BarChart3 },
    { id: "users", label: "Patients", icon: Users },
    { id: "doctors", label: "Doctors", icon: User },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "sos", label: "SOS Alerts", icon: AlertTriangle },
    { id: "registered", label: "Registered Users", icon: Users },
    { id: "analytics", label: "Settings", icon: Settings },
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
            <h2 className="text-lg font-semibold">Admin Panel</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Admin Profile */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?key=admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">Admin User</h3>
                  <p className="text-sm text-muted-foreground">System Administrator</p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    <Shield className="h-3 w-3 mr-1" />
                    Full Access
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold text-foreground mb-4">System Status</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Users</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Sessions</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">SOS Alerts</span>
                  <Badge variant="destructive" className="text-xs">
                    2
                  </Badge>
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
              System Settings
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
