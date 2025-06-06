import React from "react";
import { forwardRef } from "react";
import { motion } from "framer-motion";

import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiPython,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiFigma,
  SiCanva,
  SiAdobephotoshop,
  SiPostman,
  SiGit,
  SiGithub,
  SiNpm,
  SiStreamlit,
  SiDocker
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";
import { RiTailwindCssFill, RiNextjsFill } from "react-icons/ri";

const frontendTools = [
  { Icon: SiHtml5, color: "#E34F26" },
  { Icon: SiCss3, color: "#1572B6" },
  { Icon: RiTailwindCssFill, color: "#38BDF8" },
  { Icon: SiJavascript, color: "#F7DF1E" },
  { Icon: SiReact, color: "#61DAFB" },
  { Icon: RiNextjsFill, color: "#333333" },
];

const backendTools = [
  { Icon: SiPython, color: "#3776AB" },
  { Icon: SiNodedotjs, color: "#339933" },
  { Icon: SiExpress, color: "#000000" },
  { Icon: SiMysql, color: "#4479A1" },
  { Icon: SiMongodb, color: "#47A248" },
];

const designTools = [
  { Icon: SiFigma, color: "#F66D5D" },
  { Icon: SiCanva, color: "#6F3BE4" },
  { Icon: SiAdobephotoshop, color: "#24BEE8" },
];

const devTools = [
  { Icon: SiDocker, color: "#2496ED" }, // Docker added here
  { Icon: BiLogoVisualStudio, color: "#16ADEE" },
  { Icon: SiPostman, color: "#FF6C37" },
  { Icon: SiGit, color: "#F05032" },
  { Icon: SiGithub, color: "#181717" },
  { Icon: SiNpm, color: "#CB3837" },
  { Icon: SiStreamlit, color: "#FF4B4B" },
];

const cardVariants = {
  offscreen: {
    opacity: 0,
    x: -50,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const SkillsSection = forwardRef((props, ref) => {
  return (
    <motion.section
      ref={ref}
      id="skills"
      className="bg-black text-white min-h-screen flex items-center py-20 px-6 md:px-12 relative overflow-hidden"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-red-900 opacity-40 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-white to-red-600 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          TECH STACK
        </motion.h2>

        <div className="flex flex-col gap-8 hover:cursor-pointer">
          {/* Frontend Card */}
          <TechCard title="Frontend Development" tools={frontendTools} />
          {/* Backend Card */}
          <TechCard title="Backend & Databases" tools={backendTools} />
          {/* Design Tools */}
          <TechCard title="Design Tools" tools={designTools} />
          {/* Dev Tools */}
          <TechCard title="Development Tools" tools={devTools} />
        </div>
      </div>
    </motion.section>
  );
});

// Reusable TechCard component
const TechCard = ({ title, tools }) => (
  <motion.div
    className="p-6 bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl shadow-red-300/30 shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-6"
    variants={cardVariants}
    initial="offscreen"
    whileInView="onscreen"
    viewport={{ once: true, amount: 0.5 }}
    whileHover={{
      borderColor: "rgba(239,68,68,0.3)",
      boxShadow: "0 0 30px rgba(239,68,68,0.2)",
    }}
  >
    <div className="md:w-1/4">
      <h3 className="text-xl font-bold bg-gradient-to-r from-white to-red-600 text-transparent bg-clip-text">
        {title}
      </h3>
    </div>
    <div className="w-full md:w-3/4 flex overflow-x-auto md:overflow-visible pb-3 md:pb-0">
      <motion.div
        className="flex flex-nowrap gap-4 md:gap-6 min-w-max"
        variants={{
          hidden: { opacity: 1 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {tools.map(({ Icon, color }, index) => (
          <motion.div
            key={index}
            variants={iconVariants}
            whileHover={{
              scale: 1.2,
              color: color,
              transition: { duration: 0.2 },
            }}
            className="cursor-pointer text-red-300"
          >
            <Icon className="h-8 md:h-10 w-auto flex-shrink-0 text-current" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

export default SkillsSection;
