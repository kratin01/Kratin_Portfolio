import React, { useRef, lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { PacmanLoader } from "react-spinners";

// Lazy-loaded components
const HeroSection = lazy(() => import("./components/Herosection"));
const AboutSection = lazy(() => import("./components/AboutSection"));
const SkillsSection = lazy(() => import("./components/SkillsSection"));
const ProjectsSection = lazy(() => import("./components/ProjectsSection"));
const ContactSection = lazy(() => import("./components/ContactSection"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));

// Loader configuration
const loaderOverride = {
  display: "block",
  margin: "0 auto",
};

export default function App() {
  // Create refs for all sections
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Array of refs for the navbar
  const sectionRefs = [heroRef, aboutRef, skillsRef, projectsRef, contactRef];

  // Loading state for initial delay
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "!bg-gray-900 !text-white",
          success: {
            className: "!bg-green-700 !text-white",
            iconTheme: {
              primary: "#fff",
              secondary: "#16a34a",
            },
          },
          error: {
            className: "!bg-red-700 !text-white",
            iconTheme: {
              primary: "#fff",
              secondary: "#dc2626",
            },
          },
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            isLoading ? (
              <div className="min-h-screen bg-black flex items-center justify-center">
                <PacmanLoader
                  color="#ef4444"
                  loading={true}
                  cssOverride={loaderOverride}
                  size={50}
                  aria-label="Loading..."
                />
              </div>
            ) : (
              <>
                <Navbar sectionRefs={sectionRefs} />
                <Suspense
                  fallback={
                    <div className="min-h-screen bg-black flex items-center justify-center">
                      <PacmanLoader
                        color="#ef4444"
                        loading={true}
                        cssOverride={loaderOverride}
                        size={50}
                        aria-label="Loading..."
                      />
                    </div>
                  }
                >
                  <>
                    <HeroSection
                      ref={heroRef}
                      scrollToProjects={() =>
                        projectsRef.current?.scrollIntoView({ behavior: "smooth" })
                      }
                    />
                    <AboutSection ref={aboutRef} />
                    <SkillsSection ref={skillsRef} />
                    <ProjectsSection ref={projectsRef} />
                    <ContactSection ref={contactRef} />
                  </>
                </Suspense>
              </>
            )
          }
        />

        <Route
          path="/projects"
          element={
            <Suspense
              fallback={
                <div className="min-h-screen bg-black flex items-center justify-center">
                  <PacmanLoader
                    color="#ef4444"
                    loading={true}
                    cssOverride={loaderOverride}
                    size={50}
                    aria-label="Loading..."
                  />
                </div>
              }
            >
              <ProjectsPage />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}