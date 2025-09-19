"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone, Mail, MapPin, Stethoscope } from "lucide-react"

export function Footer() {
  const pathname = usePathname()

  if (pathname !== "/") {
    return null
  }

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo and Description */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">MediSmart</h3>
                <p className="text-xs text-muted-foreground">Smart Healthcare System</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Revolutionizing healthcare with smart technology solutions for patients and medical professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link
                href="/services"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Our Services
              </Link>
              <Link
                href="/doctors"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Find Doctors
              </Link>
              <Link href="/faq" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                FAQ
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Online Consultations</p>
              <p className="text-muted-foreground text-sm">Appointment Booking</p>
              <p className="text-muted-foreground text-sm">Prescription Management</p>
              <p className="text-muted-foreground text-sm">Emergency SOS</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm break-all">support@medismart.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">123 Healthcare Ave, Medical City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-muted-foreground text-sm">© 2025 MediSmart Healthcare System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
