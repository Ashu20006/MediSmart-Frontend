"use client"

import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import withAuth from "@/components/auth/withAuth"

function AdminDashboardPage() {
  return <AdminDashboard />
}

export default withAuth(AdminDashboardPage)
