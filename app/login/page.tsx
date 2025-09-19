import { Navigation } from "@/components/navigation"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center py-12 pt-20 px-4">
        <LoginForm />
      </main>
    </div>
  )
}
