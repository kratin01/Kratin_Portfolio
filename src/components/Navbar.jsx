import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaUser, 
  FaCode, 
  FaProjectDiagram, 
  FaPaperPlane,
  FaTerminal,
  FaLaptopCode,
  FaAddressCard
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = ({ sectionRefs }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navRef = useRef();

  const sections = [
    { id: 'hero', name: 'Home', icon: <FaHome /> },
    { id: 'about', name: 'About', icon: <FaUser /> },
    { id: 'skills', name: 'Skills', icon: <FaLaptopCode /> },
    { id: 'projects', name: 'Projects', icon: <FaProjectDiagram /> },
    { id: 'contact', name: 'Contact', icon: <FaAddressCard /> },
    { id: 'CLI', name: 'Terminal', icon: <FaTerminal />, isRoute: true }
  ];

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
      const ref = sectionRefs[index];
      if (ref?.current) {
        const { offsetTop, offsetHeight } = ref.current;
        if (
          scrollPosition > offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(index);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.6, ease: 'easeOut' }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/5 backdrop-blur-md rounded-full p-1.5 flex gap-2 border border-white/10 z-50"
    >
      {sections.map((section, index) => {
        const commonClasses = `p-2 rounded-full hover:text-red-400 transition-all cursor-pointer flex flex-col items-center ${activeSection === index
          ? 'bg-gradient-to-r from-red-600 to-red-400 text-white hover:text-white'
          : 'text-gray-400'
          }`;

        return (
          <motion.div
            key={section.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 2.2 + index * 0.1,
              type: 'spring',
              stiffness: 150
            }}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {section.isRoute ? (
              <Link to="/cli" className={commonClasses}>
                <span className="text-lg">{section.icon}</span>
              </Link>
            ) : (
              <button
                onClick={() => scrollToSection(sectionRefs[index])}
                className={commonClasses}
              >
                <span className="text-lg">{section.icon}</span>
              </button>
            )}

            {/* Tooltip */}
            {hoveredIndex === index && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs font-medium py-1 px-2 rounded whitespace-nowrap"
              >
                {section.name}
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </motion.nav>
  );
};

export default Navbar;