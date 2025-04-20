import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import projects from "../data/projects";

const ProjectsSection = React.forwardRef((props, ref) => {
  const featuredProjects = React.useMemo(
    () => projects.filter((project) => project.featured).slice(0, 3),
    []
  );

  const handleScrollReset = React.useCallback(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className="bg-black text-white py-20 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-16 text-center bg-gradient-to-r from-white to-red-600 text-transparent bg-clip-text"
        >
          FEATURED WORK
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/projects"
            onClick={handleScrollReset}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-red-400 text-red-300 rounded-full 
                        transition-all duration-300 hover:bg-red-400 hover:text-white hover:border-red-500 
                        hover:scale-105 group"
          >
            <span>View All Projects</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      className="group relative bg-gradient-to-br from-black/80 to-red-900/20 rounded-2xl p-6 
            border border-white/10 hover:border-red-400/30 transition-all duration-3000 cursor-pointer"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
          <div className="h-px bg-gradient-to-r from-red-400/30 to-transparent w-full mb-4" />
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-6 line-clamp-3 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs bg-red-900/30 rounded-full border border-red-900/50 
                            text-red-300 hover:border-red-400 hover:bg-red-900/50 transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-red-300 hover:text-red-100 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <span className="text-sm">Source Code</span>
          </a>

          {/* Add this if you have live demos */}
          <a
            href={project.live}
            className="group flex items-center gap-2 text-red-300 hover:text-red-200 transition-colors"
            aria-label="Live Demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-sm">Live Demo</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute -inset-[2px] bg-gradient-to-r from-red-400/10 to-transparent rounded-2xl" />
        <div className="absolute -inset-[2px] bg-gradient-to-b from-red-400/10 to-transparent rounded-2xl" />
      </div>
    </motion.div>
  );
};

export default React.memo(ProjectsSection);
