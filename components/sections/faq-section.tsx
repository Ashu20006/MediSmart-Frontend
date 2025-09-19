"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqs = [
    {
      question: "How do I book an appointment with a doctor?",
      answer:
        "You can book an appointment by searching for available doctors in your area, selecting your preferred time slot, and confirming your booking. You'll need to register for an account first.",
    },
    {
      question: "Is my medical information secure on MediSmart?",
      answer:
        "Yes, we use HIPAA-compliant security measures to protect your medical information. All data is encrypted and stored securely, and we never share your information without your explicit consent.",
    },
    {
      question: "Can I have online consultations with doctors?",
      answer:
        "We offer secure video consultations with qualified doctors. You can schedule online appointments and connect with healthcare professionals from the comfort of your home.",
    },
    {
      question: "How does the emergency SOS feature work?",
      answer:
        "The SOS feature provides instant access to emergency services. When activated, it plays an alert sound, shows a confirmation popup, and can redirect you to emergency contacts or services like WhatsApp or direct calling.",
    },
    {
      question: "What types of doctors are available on the platform?",
      answer:
        "We have a wide range of specialists including cardiologists, dermatologists, neurologists, pediatricians, orthopedic surgeons, and general practitioners. You can filter by specialty when searching.",
    },
    {
      question: "How do I access my prescriptions?",
      answer:
        "All your prescriptions are stored digitally in your patient dashboard. You can view, download, and share them with pharmacies. You'll also receive medication reminders if enabled.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Currently, MediSmart is available as a responsive web application that works seamlessly on all devices. A dedicated mobile app is in development and will be available soon.",
    },
    {
      question: "How much do consultations cost?",
      answer:
        "Consultation fees vary by doctor and type of appointment. You can see the pricing before booking. We also accept most major insurance plans and offer affordable self-pay options.",
    },
  ]

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Find answers to common questions about our healthcare platform and services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <Collapsible open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <CardTitle className="flex items-center justify-between text-left">
                      <span className="text-lg">{faq.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          openItems.includes(index) ? "transform rotate-180" : ""
                        }`}
                      />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-pretty">{faq.answer}</p>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
