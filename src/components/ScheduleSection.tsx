import { motion } from "framer-motion";

const ScheduleSection = () => {
  return (
    <section
      id="schedule"
      className="relative py-28 bg-gradient-to-br from-[#020617] via-[#001f2f] to-[#000814] text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          📅 Event Schedule
        </motion.h2>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* ========================= DAY 1 ========================= */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 
                       backdrop-blur-xl 
                       border border-cyan-400/20 
                       rounded-3xl 
                       p-10 
                       shadow-[0_0_40px_rgba(0,255,255,0.15)]"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-10 text-center">
              Day 1 - 17 March 2026
            </h3>

            <div className="space-y-8">
              <TimelineItem time="8:00 AM" title="Check-Ins" />

              <TimelineItem
                time="10:00 AM"
                title="Welcome & Rules"
                description="Industry intro, rules explained (30 mins)"
              />

              <TimelineItem
                time="10:30 AM"
                title="Core Working Phase"
                description="Ideation, solution building, modelling (120 mins)"
              />

              <TimelineItem
                time="Lunch Break"
                title="Lunch Break"
              />

              <TimelineItem
                time="2:00 PM"
                title="On-Table Evaluation"
                description="Discussion with teams (210 mins)"
              />
            </div>
          </motion.div>

          {/* ========================= DAY 2 ========================= */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 
                       backdrop-blur-xl 
                       border border-cyan-400/20 
                       rounded-3xl 
                       p-10 
                       shadow-[0_0_40px_rgba(179,0,255,0.15)]"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-10 text-center">
              Day 2 - 18 March 2026
            </h3>

            <div className="space-y-8">
              <TimelineItem
                time="Submission Deadline"
                title="Design Report & Video"
              />

              <TimelineItem
                time="9:45 AM"
                title="Top 5 Announcement"
              />

              <TimelineItem
                time="10:00 AM"
                title="Final Presentations"
                description="5 teams × 15 mins each (75 mins)"
              />

              <TimelineItem
                time="11:30 AM"
                title="Closing Ceremony"
                description="Winner announcement (60 mins)"
              />

              <TimelineItem
                time="Lunch"
                title="Lunch"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

/* ========================= TIMELINE ITEM COMPONENT ========================= */

function TimelineItem({
  time,
  title,
  description,
}: {
  time: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex gap-4 items-start">

      {/* DOT */}
      <div className="relative mt-2">
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 shadow-lg" />
      </div>

      {/* CONTENT */}
      <div>
        <p className="text-sm text-gray-400">{time}</p>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        {description && (
          <p className="text-gray-300 text-sm mt-1">{description}</p>
        )}
      </div>

    </div>
  );
}

export default ScheduleSection;