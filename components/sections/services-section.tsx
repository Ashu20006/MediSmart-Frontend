import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Video, FileText, AlertTriangle, Stethoscope, Pill } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Calendar,
      title: "Appointment Booking",
      description: "Schedule appointments with qualified doctors at your convenience. Easy online booking system.",
    },
    {
      icon: Video,
      title: "Online Consultations",
      description: "Connect with doctors remotely through secure video calls and chat consultations.",
    },
    {
      icon: FileText,
      title: "Prescription Management",
      description: "Digital prescriptions, medication reminders, and easy prescription history tracking.",
    },
    {
      icon: AlertTriangle,
      title: "Emergency SOS",
      description: "24/7 emergency assistance with instant alerts and direct connection to emergency services.",
    },
    {
      icon: Stethoscope,
      title: "Health Monitoring",
      description: "Track your health metrics, medical history, and receive personalized health insights.",
    },
    {
      icon: Pill,
      title: "Medication Tracking",
      description: "Never miss a dose with smart medication reminders and drug interaction alerts.",
    },
  ]

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Healthcare Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Comprehensive healthcare solutions designed to make medical care accessible, efficient, and personalized for
            everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-lg w-fit">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
