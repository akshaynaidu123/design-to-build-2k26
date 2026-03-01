import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  X,
  Download,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const targetDate = new Date("2026-03-17T09:00:00").getTime();

// 🔥 Logo + Redirect Links
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

const HeroSection = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [showBrochure, setShowBrochure] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 🔥 Force video autoplay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // 🔥 Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = targetDate - now;
      if (diff <= 0) return clearInterval(timer);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-32 md:pt-40 overflow-hidden"
    >
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/videos/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 text-center">

        {/* 🔥 LOGOS WITH REDIRECT (UPDATED) */}
        <div className="flex justify-center items-center gap-14 md:gap-20 mb-16 flex-wrap">
          {logos.map((logo, index) => (
            <motion.a
              key={index}
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.08 }}
              className="relative w-32 h-32 md:w-40 md:h-40"
            >
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400 shadow-[0_0_45px_rgba(0,255,255,0.9)]" />
              <div className="w-full h-full rounded-full overflow-hidden bg-black">
                <img
                  src={logo.src}
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-2xl font-bold text-cyan-400"
        >
          Swarnandhra College of Engineering and Technology
        </motion.h2>

        <p className="text-gray-300 mt-2">
          Seetharampuram, Narsapur, West Godavari - 534280
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-5xl md:text-7xl font-black text-white"
        >
          Design to Build Challenge
        </motion.h1>

        <p className="mt-4 text-3xl font-semibold text-cyan-400">2K26</p>
        <p className="text-cyan-400">Powered by ASME, India</p>

        {/* DATE */}
        <div className="mt-8 flex justify-center gap-6 text-gray-200">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-cyan-400" />
            March 17, 2026
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-cyan-400" />
            SCET Campus
          </span>
        </div>

        {/* COUNTDOWN */}
        <div className="mt-12 flex justify-center gap-6">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div
              key={label}
              className="bg-black/40 px-6 py-4 rounded-lg border border-cyan-400/30"
            >
              <div className="text-3xl font-bold text-white">
                {String(value).padStart(2, "0")}
              </div>
              <div className="text-xs uppercase text-gray-400">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="mt-12 flex justify-center gap-6">
          <button
            onClick={() => navigate("/problem-statement")}
            className="px-8 py-3 bg-cyan-500/20 border border-cyan-400 text-white hover:bg-cyan-500/40 transition"
          >
            Problem Statement
          </button>

          <a
            href="#events"
            className="px-8 py-3 bg-cyan-500/20 border border-cyan-400 text-white hover:bg-cyan-500/40 transition"
          >
            Explore Domains
          </a>

          <button
            onClick={() => setShowBrochure(true)}
            className="px-8 py-3 bg-cyan-500 border border-cyan-400 text-white hover:bg-cyan-600 transition"
          >
            View Brochure
          </button>
        </div>
      </div>

      {/* BROCHURE MODAL (UNCHANGED) */}
      <AnimatePresence>
        {showBrochure && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ rotateX: -15, scale: 0.8 }}
              animate={{ rotateX: 0, scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className={`relative bg-black rounded-xl shadow-2xl ${
                fullscreen ? "w-full h-full p-6" : "max-w-5xl w-full p-6"
              }`}
            >
              <div className="flex justify-end gap-4 mb-4 text-white">
                <button onClick={() => setZoom(zoom + 0.1)}>
                  <ZoomIn />
                </button>
                <button onClick={() => setZoom(Math.max(1, zoom - 0.1))}>
                  <ZoomOut />
                </button>
                <button onClick={() => setFullscreen(!fullscreen)}>
                  {fullscreen ? <Minimize2 /> : <Maximize2 />}
                </button>
                <a href="/browchure.pdf" download>
                  <Download />
                </a>
                <button onClick={() => setShowBrochure(false)}>
                  <X />
                </button>
              </div>

              <div className="overflow-auto h-[80vh]">
                <iframe
                  src="/browchure.pdf"
                  title="Brochure"
                  className="w-full h-full rounded-lg"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "top center",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;