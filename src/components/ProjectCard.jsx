import React, { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ProjectCard = React.memo(
  ({ project }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    // Animation variants for consistent motion handling
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    // Memoized tech stack rendering
    const techStackElements = useMemo(
      () =>
        project.tech.slice(0, 5).map((tech) => (
          <motion.span
            key={tech}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="px-2 py-1 text-xs bg-red-900/30 rounded-full border border-red-900/50"
          >
            {tech}
          </motion.span>
        )),
      [project.tech]
    );

    // Responsive and motion detection
    useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 768px)");
      const handleResize = (e) => setIsDesktop(e.matches);
      setIsDesktop(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleResize);
      return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    // Intersection Observer with cleanup
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setIsVisible(true),
        { rootMargin: "50px 0px", threshold: 0.1 }
      );

      const cardElement = document.getElementById(`project-card-${project.id}`);
      if (cardElement) observer.observe(cardElement);

      return () => cardElement && observer.unobserve(cardElement);
    }, [project.id]);

    // Early return for placeholder
    if (!isVisible)
      return <div id={`project-card-${project.id}`} className="h-[450px]" />;

    return (
      <motion.div
        id={`project-card-${project.id}`}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={shouldReduceMotion ? null : cardVariants}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="group relative p-px overflow-hidden rounded-2xl shadow-red-900/50 shadow-2xl hover:cursor-pointer "
      >
        {/* Animated Border Gradient */}
        {isDesktop && !shouldReduceMotion && (
          <div className="absolute inset-0 bg-gradient-to-r from-red-300/40 via-transparent to-red-300/40">
            <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] animate-border-rotate bg-[conic-gradient(from_0deg,transparent_0_,theme(colors.red.600)_25%,transparent_50%)]" />
          </div>
        )}

        {/* Card Content */}
        <div className="relative h-full bg-black/95 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex flex-col h-full">
            <h3 className="text-2xl font-bold mb-2 text-red-400 line-clamp-2">
              {project.name}
            </h3>

            <p className="text-gray-400 mb-4 line-clamp-4 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-8 after:bg-gradient-to-b from-transparent to-black/95">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {techStackElements}
              {project.tech.length > 5 && (
                <span className="px-2 py-1 text-xs text-red-300/70">
                  +{project.tech.length - 5}
                </span>
              )}
            </div>

            {/* Footer Links */}
            <div className="mt-auto flex items-center justify-between">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-red-300 hover:text-red-100 transition-colors"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                aria-label="View source code"
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
              </motion.a>

              <motion.a
                href={project.live}
                className="group flex items-center gap-2 text-red-300 hover:text-red-200 transition-colors"
                aria-label="View live demo"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
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
              </motion.a>
            </div>
          </div>
        </div>

        {/* Hover Effects */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Base Glow Layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-transparent rounded-2xl transition-all duration-500 group-hover:opacity-50" />

            {/* Moving Gradient Layer */}
            <div className="absolute -inset-[2px] overflow-hidden rounded-2xl">
              <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] animate-border-rotate bg-[conic-gradient(from_180deg,transparent_0%,theme(colors.red.400)_30%,transparent_50%)] opacity-40" />
            </div>

            {/* Pulse Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-transparent rounded-2xl animate-pulse-slow" />
          </div>
        )}

        <style jsx="true">{`
          @keyframes pulse-slow {
            0%,
            100% {
              opacity: 0.4;
            }
            50% {
              opacity: 0.8;
            }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
        `}</style>
      </motion.div>
    );
  },
  (prevProps, nextProps) => prevProps.project.id === nextProps.project.id
);

export default ProjectCard;
