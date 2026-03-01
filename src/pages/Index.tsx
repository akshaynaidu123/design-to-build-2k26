import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import LeadershipSection from "@/components/LeadershipSection";
import ScheduleSection from "@/components/ScheduleSection";
import ProcessSection from "@/components/ProcessSection";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {

  // ✅ Prevent random re-render crash
  const particles = useMemo(() => {
    return [...Array(25)].map(() => ({
      left: `${Math.random() * 100}%`,
      duration: `${10 + Math.random() * 10}s`,
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">

      {/* 🤖 ROBOTIC BACKGROUND (SAFE LAYER) */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        
        <div className="robotic-grid absolute inset-0"></div>
        <div className="robotic-glow-wave absolute inset-0"></div>
        <div className="human-ai-aura absolute inset-0"></div>

        <div className="absolute inset-0">
          {particles.map((p, i) => (
            <span
              key={i}
              className="robotic-particle"
              style={{
                left: p.left,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>

      </div>

      {/* 🌐 MAIN CONTENT */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <LeadershipSection /> 
        <ScheduleSection />
        <ProcessSection />

        <LocationSection />
        <ContactSection />
        <Footer />
      </div>

    </div>
  );
};

export default Index;