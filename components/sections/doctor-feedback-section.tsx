"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function DoctorFeedbackSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const feedbacks = [
    {
      id: 1,
      patientName: "Sarah M.",
      doctorName: "Dr. Johnson",
      rating: 5,
      comment: "Excellent care and very professional. Dr. Johnson took the time to explain everything clearly.",
      date: "2 days ago",
    },
    {
      id: 2,
      patientName: "Michael R.",
      doctorName: "Dr. Chen",
      rating: 5,
      comment: "Outstanding service! The online consultation was smooth and the doctor was very knowledgeable.",
      date: "1 week ago",
    },
    {
      id: 3,
      patientName: "Emily K.",
      doctorName: "Dr. Rodriguez",
      rating: 4,
      comment: "Great experience overall. Quick appointment booking and professional consultation.",
      date: "2 weeks ago",
    },
    {
      id: 4,
      patientName: "David L.",
      doctorName: "Dr. Thompson",
      rating: 5,
      comment: "Highly recommend! The doctor was very thorough and the platform is easy to use.",
      date: "3 weeks ago",
    },
  ]

  const nextFeedback = () => {
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length)
  }

  const prevFeedback = () => {
    setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length)
  }

  return (
    <section id="feedback" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">What Our Patients Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Real feedback from patients who have experienced our healthcare services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Card className="p-8">
              <CardContent className="text-center space-y-6">
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < feedbacks[currentIndex].rating ? "text-yellow-500 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="text-xl text-foreground italic text-pretty">
                  "{feedbacks[currentIndex].comment}"
                </blockquote>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{feedbacks[currentIndex].patientName}</p>
                  <p className="text-muted-foreground">
                    Patient of {feedbacks[currentIndex].doctorName} • {feedbacks[currentIndex].date}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent"
              onClick={prevFeedback}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent"
              onClick={nextFeedback}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {feedbacks.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
