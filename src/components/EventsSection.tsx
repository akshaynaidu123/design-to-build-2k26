import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Bot,
  Cpu,
  Wifi,
  Brain,
  Settings,
  Layers,
  ShieldCheck,
  Factory,
  Zap,
  Code2,
} from "lucide-react";

const domains = [
  { icon: Bot, title: "Robotics & Mechanical Design" },
  { icon: Cpu, title: "Electronics & Embedded Systems" },
  { icon: Wifi, title: "IoT" },
  { icon: Brain, title: "Artificial Intelligence" },
  { icon: Settings, title: "Control Systems" },
  { icon: Layers, title: "Industrial / Product Design" },
  { icon: ShieldCheck, title: "Safety Engineering" },
  { icon: Factory, title: "Manufacturing & Generative Design" },
  { icon: Zap, title: "Energy Systems" },
  { icon: Code2, title: "Software Development" },
];

const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="events"
      className="relative py-24 bg-gradient-to-b from-[#020617] via-[#001f2f] to-[#000814] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.06),transparent_70%)]" />

      <div ref={ref} className="container mx-auto px-6 relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-cyan-400 mb-3">
            Domains
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            EXPLORE YOUR DOMAIN
          </h2>

          <div className="mx-auto h-px w-24 bg-gradient-to-r from-cyan-400 to-purple-500" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {domains.map((domain, i) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              whileHover={{ scale: 1.05 }}
              className="group relative rounded-2xl border border-cyan-400/20 bg-black/40 backdrop-blur-xl p-8 text-center transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.4)]"
            >
              {/* Hover Glow Layer */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Icon */}
              <div className="relative flex justify-center mb-6">
                <domain.icon className="w-10 h-10 text-cyan-400 group-hover:text-white transition duration-300" />
              </div>

              {/* Title */}
              <h3 className="relative text-white font-semibold text-lg leading-snug">
                {domain.title}
              </h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EventsSection;