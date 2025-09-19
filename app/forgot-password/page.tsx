import { ForgotPassword } from "@/components/auth/forgot-password"
import { Navigation } from "@/components/navigation"
export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
          <Navigation />
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <ForgotPassword />
    </div>
    </div>
  )
}