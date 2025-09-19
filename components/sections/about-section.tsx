import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export function AboutSection() {
  const features = [
    "HIPAA-compliant security and privacy protection",
    "AI-powered health insights and recommendations",
    "Seamless integration with existing healthcare systems",
    "Multi-language support for diverse communities",
    "Real-time appointment scheduling and management",
    "Comprehensive patient and doctor dashboard systems",
  ]

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
              Revolutionizing Healthcare with Smart Technology
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              MediSmart is a comprehensive healthcare platform that bridges the gap between patients and healthcare
              providers through innovative technology solutions. Our mission is to make quality healthcare accessible,
              efficient, and personalized for everyone.
            </p>
            <p className="text-lg text-muted-foreground text-pretty">
              Founded by healthcare professionals and technology experts, we understand the challenges in modern
              healthcare delivery and have created solutions that benefit both patients and medical practitioners.
            </p>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About Stats */}
          <Card className="p-8">
            <CardContent className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">Our Impact</h3>
                <p className="text-muted-foreground">Making healthcare accessible worldwide</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">1M+</div>
                  <div className="text-sm text-muted-foreground">Consultations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">4.9★</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
