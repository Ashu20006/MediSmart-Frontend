"use client"
import { DoctorDashboard } from "@/components/dashboards/doctor-dashboard"
import withAuth from "@/components/auth/withAuth"

 function DoctorDashboardPage() {
  return <DoctorDashboard />
}



export default withAuth(DoctorDashboardPage)

