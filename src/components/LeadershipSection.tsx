import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

interface Person {
  name: string;
  role: string;
  image: string;
  bio: string;
  category: string;
}

const people: Person[] = [
  // ===== CHIEF PATRONS =====
  {
    name: "Sri K V Satyanarayana",
    role: "Chairman, SCET",
    image: "/leaders/satyanarayana.jpeg",
    bio: "Visionary Chairman guiding institutional excellence.",
    category: "Chief Patrons",
  },
  {
    name: "Sri K V Swamy",
    role: "Treasurer, SCET",
    image: "/leaders/swamy.jpeg",
    bio: "Overseeing financial and strategic growth initiatives.",
    category: "Chief Patrons",
  },
  {
    name: "Sri A Srihari",
    role: "Director, SCET",
    image: "/leaders/srihari.jpeg",
    bio: "Driving innovation and academic transformation.",
    category: "Chief Patrons",
  },

  // ===== PATRONS =====
  {
    name: "Dr. S. Suresh Kumar",
    role: "Principal",
    image: "/leaders/suresh.jpeg",
    bio: "Principal ensuring academic excellence and discipline.",
    category: "Patrons",
  },
  {
    name: "Dr. A. Gopichand",
    role: "Vice Principal",
    image: "/leaders/gopichand.jpeg",
    bio: "Supporting institutional leadership and innovation.",
    category: "Patrons",
  },

  // ===== CONVENERS =====
  {
    name: "Dr. Bomma Rama Krishna",
    role: "Professor & HoD - AI & ML",
    image: "/leaders/ramakrishna.jpeg",
    bio: "Head of AI & ML Department, guiding innovation in artificial intelligence and leading the technical execution of the hackathon.",
    category: "Conveners",
  },
  {
    name: "Dr. Francis Luther King M",
    role: "Professor & HoD - Mech & Robotics",
    image: "/leaders/francis.jpeg",
    bio: "Head of Mechanical & Robotics Engineering, promoting practical engineering excellence and coordinating event execution.",
    category: "Conveners",
  },
];

const categories = ["Chief Patrons", "Patrons", "Conveners"];

const LeadershipSection = () => {
  const [selected, setSelected] = useState<Person | null>(null);

  return (
    <section className="relative py-28 bg-gradient-to-b from-[#020617] via-[#001320] to-[#020617] text-white">

      <div className="max-w-6xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-4xl md:text-5xl font-bold text-cyan-400 mb-20"
        >
          Patrons & Conveners
        </motion.h2>

        {categories.map((cat) => (
          <div key={cat} className="mb-20">

            <h3 className="text-center text-xl md:text-2xl font-semibold text-gray-300 mb-12 tracking-wide uppercase">
              {cat}
            </h3>

            {/* CENTER FIXED FLEX LAYOUT */}
            <div className="flex flex-wrap justify-center items-center gap-16">

              {people
                .filter((p) => p.category === cat)
                .map((person, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.08 }}
                    onClick={() => setSelected(person)}
                    className="cursor-pointer text-center w-60"
                  >
                    <div className="relative w-44 h-44 mx-auto rounded-full overflow-hidden border-4 border-cyan-400 shadow-[0_0_40px_rgba(0,255,255,0.6)] hover:shadow-[0_0_70px_rgba(0,255,255,1)] transition-all duration-500">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-center">
                      {person.name}
                    </h3>

                    <p className="text-gray-400 text-sm text-center">
                      {person.role}
                    </p>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* ===== 3D PROFILE POPUP ===== */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ rotateY: -90, scale: 0.6 }}
              animate={{ rotateY: 0, scale: 1 }}
              exit={{ rotateY: 90, scale: 0.6 }}
              transition={{ duration: 0.6 }}
              className="relative bg-[#0f172a] border border-cyan-400/30 rounded-2xl p-10 max-w-lg w-full text-center shadow-[0_0_50px_rgba(0,255,255,0.4)]"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white"
              >
                <X />
              </button>

              <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-cyan-400 mb-6">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-bold mb-2">
                {selected.name}
              </h3>

              <p className="text-cyan-400 mb-4">
                {selected.role}
              </p>

              <p className="text-gray-300 text-sm leading-relaxed">
                {selected.bio}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default LeadershipSection;