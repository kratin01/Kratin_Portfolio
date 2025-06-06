import React from "react";
import { forwardRef } from "react";
import { motion } from "framer-motion";

const AboutSection = forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      id="about"
      className="bg-black text-white min-h-screen flex items-center py-20 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Red glow effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-red-900 opacity-40 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Title & Description */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-red-600 text-transparent bg-clip-text">
            WHO I AM
          </h2>
          <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
            A disciplined and passionate Computer Science student from IIIT
            Kota, with a strong foundation in MERN stack development and a knack
            for solving complex problems through data structures and algorithms.
            I enjoy building efficient and user-centric web applications, and
            I’m always looking for new challenges that sharpen my logical
            thinking and coding skills.
          </p>
        </div>

        {/* Education & Skills Columns */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Education Timeline */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-white to-red-600 text-transparent bg-clip-text">
              Education & Formation
            </h3>
            <div className="relative pl-8 border-l-2 border-red-600/30 space-y-10">
              {/* B.Tech */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="absolute w-3 h-3 bg-red-400 rounded-full -left-[20px] top-2"></div>
                <div className="flex items-center gap-4 mb-1">
                  <img
                    src="/files/iiitkota.webp"
                    alt="IIIT Kota"
                    className="w-10 h-10 rounded-md object-contain"
                  />
                  <p className="font-semibold">2022 – 2026</p>
                </div>
                <p className="opacity-80">B.Tech in Computer Science</p>
                <p className="opacity-80 mt-1">
                  Indian Institute of Information Technology (IIIT) Kota
                </p>
                <p className="opacity-80 mt-1">CGPA: 8.0</p>
              </motion.div>

              {/* 12th Grade */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="absolute w-3 h-3 bg-red-400 rounded-full -left-[20px] top-2"></div>
                <div className="flex items-center gap-4 mb-1">
                  <img
                    src="/files/school.png"
                    alt="Aggarwal Public School"
                    className="w-10 h-10 rounded-md object-contain"
                  />
                  <p className="font-semibold">2021 – 2022</p>
                </div>
                <p className="opacity-80">Higher Secondary (12th Grade)</p>
                <p className="opacity-80 mt-1">
                  Aggarwal Public School, Ballabgarh, Faridabad
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Skills Cards */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-white to-red-600 text-transparent bg-clip-text">
              Core Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Web Development",
                  desc: "Building modern applications with JavaScript and leveraging the latest frameworks.",
                  delay: 0.2,
                },
                {
                  title: "Data Structures & Algorithms",
                  desc: "Tackling challenging problems through efficient algorithms and thoughtful problem-solving.",
                  delay: 0.3,
                },
                {
                  title: "Team & Project Management",
                  desc: "Organizing tech initiatives and guiding club-driven innovation and events.",
                  delay: 0.4,
                },
                {
                  title: "UI/UX Design",
                  desc: "Crafting seamless user experiences by applying modern design principles.",
                  delay: 0.5,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="group relative p-6 bg-black/50 backdrop-blur-sm border rounded-xl border-red-400/50 overflow-hidden transition-all duration-300 hover:scale-[1.03] ease-in-out"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.delay, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {/* animated border glow layer */}
                  <div className="glow-hover absolute inset-0 rounded-xl z-0"></div>

                  {/* content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="opacity-80 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
