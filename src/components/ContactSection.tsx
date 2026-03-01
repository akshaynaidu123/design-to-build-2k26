import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Instagram, Linkedin, Globe } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-24">
      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-3">Get In Touch</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground text-glow mb-6">
            CONTACT US
          </h2>
          <div className="mx-auto h-px w-24 gradient-line" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Mail, label: "Email", value: "akshayenaganti@gmail.com" },
            { icon: Phone, label: "Phone", value: "+91 9392977189" },
            { icon: MapPin, label: "Location", value: " Swarnandhra College of Engineering and Technology,Seetharamapuram, Narsapur, AP" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="flex flex-col items-center rounded-lg border border-border/50 bg-card/40 backdrop-blur-sm p-8 border-glow"
            >
              <item.icon className="h-8 w-8 text-primary mb-4" />
              <span className="font-display text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">{item.label}</span>
              <span className="font-body text-sm text-foreground text-center">{item.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-6 mt-12"
        >
          {[Instagram, Linkedin, Globe].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border/50 bg-card/40 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:box-glow"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
