"use client";

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Heart, Shield, Clock, Users } from "lucide-react"
import { useEffect, useState, Dispatch, SetStateAction } from "react"

export function HeroSection() {
  const [doctorCount, setDoctorCount] = useState(0)
  const [patientCount, setPatientCount] = useState(0)

  useEffect(() => {
    // Function to animate counting with proper TypeScript types
    const animateCount = (
      setter: Dispatch<SetStateAction<number>>, 
      target: number, 
      interval: number, 
      step: number
    ) => {
      let current = 0
      
      const timer = setInterval(() => {
        current += step
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setter(current)
      }, interval)
      
      return timer
    }

    // Start animations with different intervals
    const timer1 = animateCount(setDoctorCount, 500, 100, 50) // Counts by 50 every 100ms
    const timer2 = animateCount(setPatientCount, 10000, 100, 1000) // Counts by 1000 every 100ms

    // Cleanup on component unmount
    return () => {
      clearInterval(timer1)
      clearInterval(timer2)
    }
  }, [])

  // Format numbers with K for thousands
  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K+`
    }
    return `${count}+`
  }

  return (
    <section className="bg-gradient-to-br from-background to-card py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Smart Healthcare for a <span className="text-primary">Healthier Tomorrow</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Connect with qualified doctors, manage appointments, and access emergency care with our comprehensive
              healthcare platform designed for patients and medical professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/register">Get Started Today</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#doctor-search">Find a Doctor</Link>
              </Button>
            </div>
          </div>

          {/* Hero Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground">{formatCount(doctorCount)}</h3>
              <p className="text-muted-foreground">Qualified Doctors</p>
            </Card>
            <Card className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground">{formatCount(patientCount)}</h3>
              <p className="text-muted-foreground">Happy Patients</p>
            </Card>
            <Card className="p-6 text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground">24/7</h3>
              <p className="text-muted-foreground">Emergency Care</p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground">100%</h3>
              <p className="text-muted-foreground">Secure & Private</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}