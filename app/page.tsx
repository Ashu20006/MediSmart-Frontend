import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { DoctorFeedbackSection } from "@/components/sections/doctor-feedback-section"
import { FAQSection } from "@/components/sections/faq-section"
import { ContactSection } from "@/components/sections/contact-section"
import { DoctorSearchSection } from "@/components/sections/doctor-search-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20 sm:pt-24">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <DoctorSearchSection />
        <DoctorFeedbackSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
