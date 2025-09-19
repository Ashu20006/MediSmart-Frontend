"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function ForgotPassword() {
  const [step, setStep] = useState(1) // 1: email, 2: OTP, 3: new password
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter()

  const handleSendOtp = async () => {
    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")
    
    try {
      const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStep(2)
        setSuccessMessage(data.message || "OTP sent to your email")
      } else {
        setErrorMessage(data.error || "Failed to send OTP")
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")
    
    try {
      const response = await fetch("http://localhost:8080/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })

      const data = await response.json()

      if (response.ok) {
        setStep(3)
        setSuccessMessage(data.message || "OTP verified successfully")
      } else {
        setErrorMessage(data.error || "Invalid OTP")
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match")
      return
    }

    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")
    
    try {
      const response = await fetch("http://localhost:8080/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage(data.message || "Password reset successfully")
        setTimeout(() => router.push("/login"), 2000)
      } else {
        setErrorMessage(data.error || "Failed to reset password")
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-4">
      <CardHeader className="text-center">
        <div className="bg-primary p-3 rounded-lg w-fit mx-auto mb-4">
          <Lock className="h-8 w-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">
          {step === 1 ? "Reset Password" : step === 2 ? "Verify OTP" : "Set New Password"}
        </CardTitle>
        <CardDescription>
          {step === 1 && "Enter your email to receive a verification code"}
          {step === 2 && "Enter the OTP sent to your email"}
          {step === 3 && "Create a new password for your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <Button 
                onClick={handleSendOtp} 
                className="w-full" 
                disabled={isLoading || !email}
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button 
                onClick={handleVerifyOtp} 
                className="w-full" 
                disabled={isLoading || otp.length < 6}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button 
                onClick={handleResetPassword} 
                className="w-full" 
                disabled={isLoading || !newPassword || !confirmPassword}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </>
          )}

          {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}

          <div className="text-center text-sm text-muted-foreground">
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-sm text-primary hover:underline"
              onClick={() => step === 1 ? router.push("/login") : setStep(step - 1)}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to {step === 1 ? "Login" : "Previous"}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
