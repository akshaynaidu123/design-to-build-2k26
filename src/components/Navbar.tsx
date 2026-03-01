import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Domains", href: "#events" },
  { label: "Schedule", href: "#schedule" },
  { label: "Contact", href: "#contact" },
];

// 🔥 Logos with redirect links
const logos = [
  {
    src: "/images/apsche.png",
    link: "https://cets.apsche.ap.gov.in/APSCHE/APSCHEHome.aspx",
  },
  {
    src: "/images/asme.png",
    link: "https://www.asmefoundation.org/",
  },
  {
    src: "/images/scet.png",
    link: "https://www.swarnandhra.ac.in/",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoIndex, setLogoIndex] = useState(0);
  const navigate = useNavigate();

  // 🔥 Auto change logo every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % logos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO + TITLE */}
        <div className="flex items-center gap-3">

          {/* 🔥 Clickable Animated Logo */}
          <div className="relative w-9 h-9 md:w-10 md:h-10">
            <AnimatePresence mode="wait">
              <motion.a
                key={logoIndex}
                href={logos[logoIndex].link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, rotateY: -180, scale: 0.6 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 180, scale: 0.6 }}
                transition={{ duration: 0.6 }}
                className="absolute w-full h-full block"
              >
                <img
                  src={logos[logoIndex].src}
                  alt="logo"
                  className="w-full h-full object-cover rounded-full border border-cyan-400 shadow-[0_0_12px_rgba(0,255,255,0.8)] bg-black hover:scale-110 transition"
                />
              </motion.a>
            </AnimatePresence>
          </div>

          {/* Title (UNCHANGED) */}
          <a href="#home">
            <span className="font-heading text-lg font-bold tracking-wider text-foreground">
              Design to Build Challenges 2K26
            </span>
          </a>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex items-center gap-8">

          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-display text-sm font-medium tracking-widest uppercase text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}

          {/* Submit Project */}
          <button
            onClick={() => navigate("/submission")}
            className="rounded-md border border-cyan-400/50 bg-purple-500/10 px-5 py-2 font-display text-sm font-semibold tracking-wider uppercase text-cyan-400 transition-all hover:bg-cyan-500/20"
          >
            Submit Project
          </button>

          {/* Register */}
          <button
            onClick={() => navigate("/register")}
            className="rounded-md border border-primary/50 bg-primary/10 px-5 py-2 font-display text-sm font-semibold tracking-wider uppercase text-primary transition-all hover:bg-primary/20 box-glow"
          >
            Register
          </button>

        </div>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-4 px-6 py-6">

              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-base font-medium tracking-widest uppercase text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}

              <button
                onClick={() => {
                  navigate("/submission");
                  setIsOpen(false);
                }}
                className="text-left font-display text-base font-semibold uppercase text-purple-400"
              >
                Submit Project
              </button>

              <button
                onClick={() => {
                  navigate("/register");
                  setIsOpen(false);
                }}
                className="text-left font-display text-base font-semibold uppercase text-primary"
              >
                Register
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;