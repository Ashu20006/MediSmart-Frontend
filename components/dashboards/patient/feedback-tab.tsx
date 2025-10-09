"use client"
import API_BASE_URL from "@/config/api";
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FeedbackTab() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const pastAppointments = [
    { id: 1, doctor: "Dr. Sarah Johnson", date: "2024-01-10", specialty: "Cardiology" },
    { id: 2, doctor: "Dr. Emily Rodriguez", date: "2024-01-05", specialty: "General Medicine" },
    { id: 3, doctor: "Dr. James Wilson", date: "2023-12-28", specialty: "Orthopedics" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! It helps us improve our services.",
    })

    setIsSubmitting(false)
    setRating(0)
  }

  const StarRating = () => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none"
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => setRating(star)}
        >
          <Star
            className={`h-6 w-6 transition-colors ${
              star <= (hoveredRating || rating) ? "text-yellow-500 fill-current" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Doctor Feedback</h2>
        <p className="text-muted-foreground">Share your experience and help other patients</p>
      </div>

      {/* Feedback Form */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Feedback</CardTitle>
          <CardDescription>Rate your recent appointment and share your experience</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="appointment">Select Appointment</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a recent appointment" />
                </SelectTrigger>
                <SelectContent>
                  {pastAppointments.map((appointment) => (
                    <SelectItem key={appointment.id} value={appointment.id.toString()}>
                      {appointment.doctor} - {appointment.date} ({appointment.specialty})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Overall Rating</Label>
              <div className="flex items-center space-x-2">
                <StarRating />
                <span className="text-sm text-muted-foreground">{rating > 0 && `${rating} out of 5 stars`}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="communication">Communication Rating</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Rate communication" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Excellent</SelectItem>
                    <SelectItem value="4">Very Good</SelectItem>
                    <SelectItem value="3">Good</SelectItem>
                    <SelectItem value="2">Fair</SelectItem>
                    <SelectItem value="1">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="punctuality">Punctuality Rating</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Rate punctuality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Excellent</SelectItem>
                    <SelectItem value="4">Very Good</SelectItem>
                    <SelectItem value="3">Good</SelectItem>
                    <SelectItem value="2">Fair</SelectItem>
                    <SelectItem value="1">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Share your experience with the doctor and the appointment..."
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recommend">Would you recommend this doctor?</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select recommendation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes, definitely</SelectItem>
                  <SelectItem value="maybe">Maybe</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={isSubmitting || rating === 0}>
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Previous Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Your Previous Feedback</CardTitle>
          <CardDescription>Feedback you've submitted for past appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-semibold text-foreground">Dr. Emily Rodriguez</h4>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">January 5, 2024 • General Medicine</p>
              <p className="text-sm">
                "Excellent doctor! Very thorough examination and clear explanations. Highly recommend."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
