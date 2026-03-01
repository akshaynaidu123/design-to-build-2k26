import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const LocationSection = () => {
  return (
    <section id="location" className="relative py-24 bg-background">
      <div className="container mx-auto px-6">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase text-primary mb-3">
            Venue
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground text-glow mb-6">
            EVENT LOCATION
          </h2>
          <div className="mx-auto h-px w-24 gradient-line" />
        </motion.div>

        {/* Location Card */}
        <div className="max-w-5xl mx-auto rounded-2xl border border-border bg-card/40 backdrop-blur-md shadow-xl overflow-hidden">

          {/* Top Info Section */}
          <div className="flex flex-col md:flex-row items-center justify-between p-6 border-b border-border/30">
            
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/20">
                <MapPin className="text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground">
                  Swarnandhra College of Engineering & Technology
                </h3>
                <p className="text-muted-foreground text-sm">
                  Narsapuram, Andhra Pradesh, India
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Swarnandhra+College+of+Engineering+and+Technology"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 rounded-full bg-primary px-6 py-2 text-white font-semibold hover:bg-primary/80 transition-all"
            >
              Get Directions
            </a>
          </div>

          {/* Google Map Embed */}
          <div className="w-full h-[300px]">
            <iframe
              src="https://www.google.com/maps?q=Swarnandhra+College+of+Engineering+and+Technology&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;