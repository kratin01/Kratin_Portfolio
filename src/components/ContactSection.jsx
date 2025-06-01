import React, { forwardRef, useState } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

import img from "./../../public/screenshots/kratin_img2.jpg";

const ContactSection = forwardRef((props, ref) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      e.target.reset();
      toast.success("Message sent successfully!", {
        duration: 4000,
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send message. Please try again.", {
        duration: 4000,
        position: "bottom-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="bg-black text-white min-h-screen flex flex-col justify-between py-20 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-red-900 opacity-40 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile Picture Section */}
          <div className="lg:w-1/3 flex justify-center">
            <div className="relative group">
              <img
                src={img}
                alt="Profile"
                className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-red-500/30 
                group-hover:border-red-500/70 transition-all duration-500 shadow-xl
                group-hover:shadow-red-500/20 transform group-hover:scale-105"
              />
              {/* Glow effect */}
              <div
                className="absolute inset-0 rounded-full bg-red-500/10 blur-md 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
              ></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-2/3 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-red-600 text-transparent bg-clip-text">
              GET IN TOUCH
            </h2>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl w-full mb-12 mx-auto lg:mx-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative z-10">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full p-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  />
                </div>
                <div className="relative z-10">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full p-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                  />
                </div>
              </div>
              <div className="relative z-10 mb-6">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  required
                  className="w-full p-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 md:px-10 md:py-4 relative overflow-hidden 
                  bg-gradient-to-r from-red-300 to-red-700 hover:from-red-600 hover:to-red-800 
                  text-white font-semibold tracking-wide rounded-lg 
                  transform hover:scale-[1.02] active:scale-95 
                  transition-all duration-300 
                  shadow-lg hover:shadow-xl 
                  disabled:opacity-70 disabled:cursor-not-allowed
                  group w-full md:w-auto"
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 
                  transition-opacity duration-500 
                  bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%)]"
                ></span>
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 text-white transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        ></path>
                      </svg>
                      Send Message
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12">
              <a
                href="https://github.com/kratin01"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-300 group relative transition-all duration-300"
              >
                <FaGithub className="w-12 h-12 md:w-14 md:h-14 relative z-10 transition-all duration-300 ease-in-out group-hover:text-[#181717]" />
              </a>

              <a
                href="https://linkedin.com/in/kratin-aggarwal-691157257/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-300 group relative transition-all duration-300"
              >
                <FaLinkedin className="w-12 h-12 md:w-14 md:h-14 relative z-10 transition-all duration-300 ease-in-out group-hover:text-[#0076b5]" />
              </a>

              <a
                href="https://mail.google.com/mail/u/0/?fs=1&to=kratinaggarwal8750@gmail.com&tf=cm"
                className="text-red-300 group relative transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiGmail className="w-12 h-12 md:w-14 md:h-14 relative z-10 transition-all duration-300 ease-in-out group-hover:text-[#db4537e2]" />
              </a>

              <a
                href="https://wa.me/+918750281658"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-300 group relative transition-all duration-300"
              >
                <FaWhatsapp className="w-12 h-12 md:w-14 md:h-14 relative z-10 transition-all duration-300 ease-in-out group-hover:text-[#25d366]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20 pt-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} KRATIN AGGARWAL. Built with love using React &
            Tailwind — pixel by pixel.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Always learning, always improving — one pixel at a time.
          </p>
        </div>
      </footer>
    </section>
  );
});

export default ContactSection;
