import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProblemStatement() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#001f2f] to-[#000814] text-white px-6 py-16">

      {/* 🔙 Back Button */}
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-12 px-6 py-2 bg-cyan-500/20 border border-cyan-400 rounded-md hover:bg-cyan-500/40 transition"
        >
          ← Back to Home
        </button>
      </div>

      <div className="max-w-6xl mx-auto text-center">

        {/* ROUND LABEL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="bg-red-600 px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
            ROUND 1 - PRELIMINARY
          </span>
        </motion.div>

        {/* MAIN TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-6"
        >
          Problem Statement
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl text-cyan-400 mb-16"
        >
          "Smart Glass Cleaning Robot"
        </motion.h2>

      </div>

      {/* 📋 BACKGROUND SECTION */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black/40 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-10 shadow-[0_0_40px_rgba(0,255,255,0.15)]"
        >
          <h3 className="text-3xl font-bold text-purple-400 mb-6 text-center">
            📋 Background
          </h3>

          <p className="text-gray-300 leading-relaxed text-lg mb-4 text-center">
            eGlean Facilities Management company is planning to design a{" "}
            <span className="text-cyan-400 font-semibold">
              Smart Glass Cleaning Robot
            </span>{" "}
            for high-rise buildings with minimal human intervention.
          </p>

          <p className="text-gray-300 leading-relaxed text-lg text-center">
            Due to excessive dust and pollution in metro cities, cleaning wide
            windows on tall and multi-story buildings is tedious and dangerous,
            leading to several critical problems.
          </p>
        </motion.div>
      </div>

      {/* ⚠ PROBLEM CONSIDERATIONS */}
      <div className="max-w-6xl mx-auto mb-24 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-red-500 mb-12"
        >
          ⚠ Problem Considerations
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              title: "Health Concerns",
              text: "Exposure to dust and pollutants can cause negative health effects. Regular cleaning reduces risks."
            },
            {
              title: "Cost",
              text: "Maintenance and manpower for large buildings can be expensive."
            },
            {
              title: "Time-Consuming",
              text: "Cleaning glass panels in high-rise buildings requires significant time and effort."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-red-600/20 to-yellow-600/20 backdrop-blur-xl border border-red-400/20 p-8 rounded-2xl shadow-[0_0_30px_rgba(255,0,0,0.15)] hover:shadow-[0_0_40px_rgba(255,0,0,0.4)] transition-all duration-300"
            >
              <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
              <p className="text-gray-300">{item.text}</p>
            </motion.div>
          ))}

        </div>
      </div>

      {/* 🎨 DESIGN CONSIDERATIONS */}
      <div className="max-w-6xl mx-auto text-center">

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-8"
        >
          🎨 Design Considerations
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-gray-300 text-lg leading-relaxed mb-6"
        >
          Research & Develop a Design on{" "}
          <span className="text-cyan-400 font-semibold">
            "Smart Glass Cleaning Robot"
          </span>{" "}
          which does smooth Cleaning, Climbing and self-carrying liquid cleaners.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-gray-300 text-lg leading-relaxed mb-14"
        >
          The Smart Glass Cleaning Robot should focus on quick cleaning of dust
          from high-rise buildings by ensuring hygiene.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">

          {[
            "The Robot should clean and collect the dust from glass panels & windows",
            "Robot liquid cleaner capacity should be between 01-10 litres",
            "Robots can be autonomous or remote controlled",
            "Select lightweight and transport-friendly materials",
            "Max size should not exceed 100cm H / 100cm L / 100cm W",
            "Rendered images and Animations must be added in PPT",
            "Min 1 component must be optimized using Generative Design",
            "Implement Industry 4.0 applications like IOT, AI"
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-600/20 to-cyan-600/20 backdrop-blur-xl border border-cyan-400/20 p-6 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.15)] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all duration-300 text-left"
            >
              <span className="text-green-400 font-bold mr-2">✓</span>
              {item}
            </motion.div>
          ))}

        </div>

      </div>

    </div>
  );
}