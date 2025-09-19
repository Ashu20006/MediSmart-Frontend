import { Navigation } from "@/components/navigation"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center py-12 pt-20 px-4">
        <RegisterForm />
      </main>
    </div>
  )
}
