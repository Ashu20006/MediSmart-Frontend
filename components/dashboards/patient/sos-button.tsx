"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle, Phone, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SOSButton() {
  const [isSOSOpen, setIsSOSOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const { toast } = useToast()

  const handleSOSClick = () => {
    setIsSOSOpen(true)
    setIsPlaying(true)

    // Play siren sound (simulated)
    toast({
      title: "Emergency Alert Activated",
      description: "Emergency services are being contacted...",
      variant: "destructive",
    })
  }

  const handleConfirmEmergency = () => {
    setIsSOSOpen(false)
    setIsPlaying(false)

    // Simulate redirect to emergency services
    toast({
      title: "Emergency Services Contacted",
      description: "Redirecting to emergency contact options...",
    })
  }

  const handleCancel = () => {
    setIsSOSOpen(false)
    setIsPlaying(false)

    toast({
      title: "Emergency Alert Cancelled",
      description: "Emergency alert has been cancelled.",
    })
  }

  const handleWhatsApp = () => {
    // Simulate WhatsApp redirect
    window.open("https://wa.me/911", "_blank")
    setIsSOSOpen(false)
    setIsPlaying(false)
  }

  const handleCall = () => {
    // Simulate phone call
    window.open("tel:911", "_self")
    setIsSOSOpen(false)
    setIsPlaying(false)
  }

  return (
    <>
      <Button
        size="lg"
        className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 text-lg animate-pulse"
        onClick={handleSOSClick}
      >
        <AlertTriangle className="h-6 w-6 mr-2" />
        EMERGENCY SOS
      </Button>

      <Dialog open={isSOSOpen} onOpenChange={setIsSOSOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-6 w-6" />
              <span>Emergency Alert</span>
            </DialogTitle>
            <DialogDescription>
              {isPlaying && (
                <div className="text-center py-4">
                  <div className="animate-pulse text-red-600 font-bold text-lg mb-2">🚨 EMERGENCY ALERT ACTIVE 🚨</div>
                  <div>Emergency siren is playing. Do you need immediate assistance?</div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-center text-muted-foreground">
              Choose how you'd like to contact emergency services:
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleCall} className="bg-red-600 hover:bg-red-700">
                <Phone className="h-4 w-4 mr-2" />
                Call 911
              </Button>
              <Button onClick={handleWhatsApp} variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancel}>
              Cancel Alert
            </Button>
            <Button onClick={handleConfirmEmergency} className="bg-red-600 hover:bg-red-700">
              Confirm Emergency
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
