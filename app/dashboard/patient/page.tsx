"use client"
import { PatientDashboard } from "@/components/dashboards/patient-dashboard"
import withAuth from "@/components/auth/withAuth"

 function PatientDashboardPage() {
  return <PatientDashboard />
}

export default withAuth(PatientDashboardPage)

