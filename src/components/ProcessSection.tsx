import { motion } from "framer-motion";
import { Lightbulb, Search, Megaphone, Trophy } from "lucide-react";

const processData = [
  {
    icon: Lightbulb,
    title: "Idea Submission",
    description:
      "Participants must submit their ideas for Round 1 on or before 8th March, 2026 (12:00 PM). All submissions should be made via the official 'Submit Project' section on the website.",
    date: "Deadline: 8th March before 12:00 PM",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Search,
    title: "Screening Round",
    description:
      "Submitted ideas will be evaluated on 9th March, 2026 by the designated review panel. Shortlisted teams will be selected based on the problem statement evaluation criteria.",
    date: "Screening: 9th March",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: Megaphone,
    title: "Team Announcement",
    description:
      "Results of the screening round will be officially announced on 10th March, 2026. Shortlisted teams will be notified through official communication channels and website updates.",
    date: "Announcement: 10th March",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Trophy,
    title: "Grand Finale",
    description:
      "The Grand Finale celebrates innovation, creativity, and problem-solving skills. Winners will receive meaningful prizes supporting their academic and professional growth.",
    date: "Finale: 17th – 18th March",
    color: "from-green-400 to-emerald-500",
  },
];

const ProcessSection = () => {
  return (
    <section
      id="process"
      className="relative py-28 bg-gradient-to-b from-[#020617] via-[#001320] to-[#020617] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* SECTION TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl md:text-5xl font-bold text-cyan-400 mb-20"
        >
          Hackathon Process
        </motion.h2>

        {/* TIMELINE */}
        <div className="relative">

          {/* Vertical Gradient Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-500 opacity-40" />

          <div className="space-y-24">

            {processData.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* CARD */}
                  <div
                    className={`w-full md:w-5/12 backdrop-blur-xl bg-white/5 border border-cyan-400/20 rounded-2xl p-8 shadow-lg hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all duration-500`}
                  >
                    <div
                      className={`w-14 h-14 mb-6 flex items-center justify-center rounded-full bg-gradient-to-r ${item.color} shadow-lg`}
                    >
                      <item.icon className="text-white" size={28} />
                    </div>

                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {item.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <p className="text-cyan-400 font-semibold text-sm">
                      {item.date}
                    </p>
                  </div>

                  {/* CENTER DOT */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.8)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;