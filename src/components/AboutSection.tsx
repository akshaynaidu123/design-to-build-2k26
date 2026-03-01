import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Users, Trophy, Lightbulb } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Participants" },
  { icon: Code, value: "24", label: "Hours" },
  { icon: Trophy, value: "₹2L+", label: "Prize Pool" },
  { icon: Lightbulb, value: "50+", label: "Projects" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 gradient-radial-violet opacity-30" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-3">About The Event</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground text-glow mb-6">
            IGNITE YOUR CODE
          </h2>
          <div className="mx-auto h-px w-24 gradient-line mb-8" />
          <p className="max-w-2xl mx-auto text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            Design to Build Challenge 2K26 is the flagship national-level hackathon organized by Swarnandhra College of Engineering & Technology. 
            Bring your ideas, form your team, and build innovative solutions in 24 hours of intense coding, mentoring, and collaboration.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="flex flex-col items-center rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm p-6 border-glow"
            >
              <stat.icon className="h-8 w-8 text-primary mb-3" />
              <span className="font-heading text-3xl font-bold text-foreground text-glow">{stat.value}</span>
              <span className="font-display text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
