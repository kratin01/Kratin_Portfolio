import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiGithub,
  FiExternalLink,
  FiHome,
  FiLinkedin,
  FiMail,
  FiFileText,
} from "react-icons/fi";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import { FaEarlybirds } from "react-icons/fa6";
import { Link } from "react-router-dom";
import projects from "../data/projects.json"; // Import projects data
import socialData from "../data/social.json";

// Data for skills
const skills = {
  languages: ["C/C++", "Python", "TypeScript", "JavaScript", "HTML/CSS", "SQL"],
  frameworks: [
    "React.js",
    "Redux",
    "Node.js",
    "Express.js",
    "Next.js",
    "REST API",
    "Tailwind CSS",
  ],
  databases: ["MongoDB", "MySQL"],
  tools: ["GitHub", "Docker", "Streamlit", "Postman", "Figma", "Canva"],
};

const iconMap = {
  FiGithub,
  FiLinkedin,
  FaEarlybirds,
  SiLeetcode,
  SiCodeforces,
  SiCodechef,
};

// Data for education
const education = [
  {
    degree: "B.Tech (CSE)",
    institution: "Indian Institute of Information Technology (IIIT) Kota",
    period: "2022 - 2026",
    CGPA: "8.0",
  },
  {
    degree: "Senior Secondary",
    institution: "Aggarwal Public School, Faridabad (CBSE)",
    period: "2022",
  },
];

// Command definitions
const commands = {
  help: {
    description: "Show this help message",
    aliases: ["h", "?"],
    fn: () => (
      <div className="space-y-2">
        {Object.entries(commands).map(([cmd, details]) => (
          <div key={cmd} className="flex flex-col sm:flex-row">
            <span className="w-full sm:w-32 font-mono text-purple-400 break-all">
              {cmd} {details.aliases && `(${details.aliases.join(", ")})`}
            </span>
            <span className="flex-1 text-gray-300 mt-1 sm:mt-0">
              {details.description}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  about: {
    description: "Display information about me",
    aliases: ["a"],
    fn: () => (
      <div className="space-y-3">
        <p className="text-green-400 text-base sm:text-lg">
          Hi, I'm Kratin Aggarwal
        </p>
        <p className="text-sm sm:text-base leading-relaxed">
          Final year Computer Science student at IIIT Kota with a passion for
          building innovative web applications and exploring new technologies. I
          also have a keen interest in Data Structures and Algorithms, and enjoy
          solving complex problems.
        </p>
        <div className="mt-4">
          <p className="text-yellow-400 text-sm sm:text-base font-medium">
            Core Fundamentals:
          </p>
          <ul className="ml-4 list-disc space-y-1 text-sm sm:text-base">
            <li>Data Structures and Algorithms</li>
            <li>Object-Oriented Programming</li>
            <li>Operating Systems</li>
            <li>Computer Networks</li>
            <li>DBMS</li>
            <li>Machine Learning</li>
          </ul>
        </div>
      </div>
    ),
  },
  skills: {
    description: "List my technical skills",
    aliases: ["s"],
    fn: () => (
      <div className="space-y-4">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <p className="text-blue-400 capitalize text-sm sm:text-base font-medium">
              {category}:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="px-2 sm:px-3 py-1 bg-gray-800 rounded-full text-xs sm:text-sm break-words"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },

  projects: {
    description: "List my projects",
    aliases: ["p", "ls"],
    fn: () => (
      <div className="space-y-4 sm:space-y-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-3 sm:p-4 bg-gray-900/50 rounded-lg border border-gray-700"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <h3 className="text-lg sm:text-xl font-bold text-purple-400 break-words">
                {project.name}
              </h3>
              <div className="flex gap-2 flex-shrink-0">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors touch-manipulation"
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <FiGithub />
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors touch-manipulation"
                    aria-label={`View ${project.name} live demo`}
                  >
                    <FiExternalLink />
                  </a>
                )}
              </div>
            </div>
            <p className="mt-2 text-gray-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-800 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  edu: {
    description: "Show my education",
    fn: () => (
      <div className="space-y-4 sm:space-y-6">
        {education.map((edu, index) => (
          <div
            key={index}
            // className="relative pl-6 sm:pl- border-l-2 border-gray-700 group"
          >
            {/* <div className="absolute left-[-4px] top-0 w-4 h-4 rounded-full bg-purple-500 group-hover:animate-pulse"></div> */}
            <div className="p-3 sm:p-5 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-yellow-400 transition-colors">
              <h3 className="text-base sm:text-lg font-bold text-yellow-400 break-words">
                {edu.degree}
              </h3>
              <p className="mt-2 text-gray-200 text-sm sm:text-base leading-relaxed">
                {edu.institution}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 sm:gap-3 items-center">
                <span className="px-2 sm:px-3 py-1 bg-gray-800 rounded-full text-xs sm:text-sm">
                  {edu.period}
                </span>
                {edu.CGPA && (
                  <span className="px-2 sm:px-3 py-1 bg-blue-900/30 rounded-full text-xs sm:text-sm border border-blue-500">
                    CGPA: {edu.CGPA}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  contact: {
    description: "Display contact information",
    aliases: ["c"],
    fn: () => (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <a
          href="https://mail.google.com/mail/u/0/?fs=1&to=kratinaggarwal8750@gmail.com&tf=cm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700 transition-all duration-200 hover:border-red-400 group touch-manipulation min-h-[60px]"
          aria-label="Send email to Kratin Aggarwal"
        >
          <div className="p-2 sm:p-3 bg-gray-900 rounded-lg group-hover:bg-red-900/30 flex-shrink-0">
            <FiMail className="text-lg sm:text-xl text-red-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-200 text-sm sm:text-base">
              Email
            </p>
            <p className="text-xs sm:text-sm text-gray-400 truncate">
              kratinaggarwal8750@gmail.com
            </p>
          </div>
          <FiExternalLink className="text-gray-500 group-hover:text-red-400 flex-shrink-0" />
        </a>

        <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-800/50 rounded-xl border border-gray-700 min-h-[60px]">
          <div className="p-2 sm:p-3 bg-gray-900 rounded-lg flex-shrink-0">
            <div className="text-lg sm:text-xl text-red-400 w-4 sm:w-5 h-4 sm:h-5 flex items-center justify-center font-bold">
              +91
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-200 text-sm sm:text-base">
              Phone
            </p>
            <p className="text-xs sm:text-sm text-gray-400">8750281658</p>
          </div>
        </div>
      </div>
    ),
  },
  social: {
    description: "Show social media links",
    aliases: ["so"],
    fn: () => {
      // Memoized sorted social data
      const sortedSocialData = [...socialData].sort((a, b) =>
        a.category === "Coding" ? -1 : b.category === "Coding" ? 1 : 0
      );

      return (
        <div className="space-y-4 sm:space-y-6">
          {sortedSocialData.map((section) => (
            <div key={section.category} className="space-y-3">
              <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 pb-2 border-b border-gray-700">
                {section.category}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {section.links.map(({ name, url, icon }) => {
                  const IconComponent = iconMap[icon] || FiGithub;
                  return (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700 transition-all duration-200 hover:border-purple-400 touch-manipulation min-h-[60px]"
                      aria-label={`Visit ${name}`}
                    >
                      <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-purple-900/30 transition-colors flex-shrink-0">
                        <IconComponent className="text-lg sm:text-xl text-purple-400 group-hover:text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-200 truncate text-sm sm:text-base">
                          {name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400 truncate break-all">
                          {url.replace(/^https?:\/\/(www\.)?/, "")}
                        </p>
                      </div>
                      <FiExternalLink className="text-gray-500 group-hover:text-purple-400 flex-shrink-0" />
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
  version: {
    description: "Show CLI version",
    aliases: ["v"],
    fn: () => (
      <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
        <p className="text-sm sm:text-base">CLI Portfolio v1.0.1</p>
        <p className="text-xs sm:text-sm text-gray-400">
          Built with React, Tailwind CSS, and Framer Motion
        </p>
      </div>
    ),
  },
  clear: {
    description: "Clear the terminal",
    aliases: ["cls"],
    fn: () => null,
  },
  gui: {
    description: "Switch to GUI mode",
    aliases: ["g"],
    fn: () => (
      <div className="p-3 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-500/30">
        <p className="text-green-400 text-sm sm:text-base">
          Switching to GUI mode...
        </p>
        <div className="mt-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-sm sm:text-base touch-manipulation min-h-[44px]"
          >
            <FiHome /> Go to Portfolio
          </Link>
        </div>
      </div>
    ),
  },
  resume: {
    description: "View my resume",
    fn: () => (
      <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-500/30">
        <p className="text-green-400 text-sm sm:text-base">
          Resume will open in a new tab
        </p>
        <div className="mt-3">
          <a
            href="https://drive.google.com/file/d/1YvW8STf9KgYq_o0SM7CW9a9RfhoNdNW-/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-sm sm:text-base touch-manipulation min-h-[44px]"
            aria-label="Open resume in new tab"
          >
            <FiFileText /> Open Resume
          </a>
        </div>
      </div>
    ),
  },
};

const CLIMode = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      type: "output",
      content:
        "Welcome to Kratin Aggarwal's CLI Portfolio! Type 'help' for available commands.",
    },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const endRef = useRef(null);
  const [time, setTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Scroll to bottom when history updates
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Format time to match design (10290 format)
  const formatTime = useCallback((time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }, []);

  // Format date to match design (DD-MM-YYYY)
  const formatDate = useCallback((date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }, []);

  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Improved command execution with error handling
  const executeCommand = useCallback((cmd, args) => {
    try {
      return commands[cmd]?.fn(...args);
    } catch (error) {
      console.error("Command execution error:", error);
      return (
        <div className="text-red-400 text-sm">
          Error executing command. Please try again.
        </div>
      );
    }
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!input.trim()) return;

      // Add command to history
      setHistory((prev) => [...prev, { type: "command", content: input }]);
      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);

      // Process command
      const [command, ...args] = input.split(" ");
      const cmd = command.toLowerCase();

      if (cmd === "clear" || cmd === "cls") {
        setHistory([]);
      } else if (commands[cmd]) {
        const output = executeCommand(cmd, args);
        if (output) {
          setHistory((prev) => [...prev, { type: "output", content: output }]);
        }
      } else {
        // Check for aliases
        const foundCommand = Object.entries(commands).find(
          ([_, details]) => details.aliases && details.aliases.includes(cmd)
        );

        if (foundCommand) {
          const output = executeCommand(foundCommand[0], args);
          if (output) {
            setHistory((prev) => [
              ...prev,
              { type: "output", content: output },
            ]);
          }
        } else {
          setHistory((prev) => [
            ...prev,
            {
              type: "error",
              content: `Command not found: ${command}. Type 'help' for available commands.`,
            },
          ]);
        }
      }

      setInput("");
    },
    [input, executeCommand]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex < commandHistory.length - 1
              ? historyIndex + 1
              : commandHistory.length - 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        } else {
          setHistoryIndex(-1);
          setInput("");
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        const inputText = input.trim().toLowerCase();

        if (inputText) {
          // Find matching commands
          const matches = Object.entries(commands).filter(
            ([cmd, details]) =>
              cmd.startsWith(inputText) ||
              (details.aliases &&
                details.aliases.some((alias) => alias.startsWith(inputText)))
          );

          if (matches.length === 1) {
            setInput(matches[0][0] + " ");
          } else if (matches.length > 1) {
            // Show possible completions
            const completions = matches.map(([cmd]) => cmd).join(", ");
            setHistory((prev) => [
              ...prev,
              {
                type: "output",
                content: `Possible completions: ${completions}`,
              },
            ]);
          }
        }
      }
    },
    [input, commandHistory, historyIndex]
  );

  const handleShortcut = useCallback((cmd) => {
    setInput(cmd);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
  }, []);

  // Memoized shortcut buttons
  const shortcutButtons = useMemo(
    () => [
      { cmd: "about", label: "About" },
      { cmd: "skills", label: "Skills" },
      { cmd: "projects", label: "Projects" },
      { cmd: "contact", label: "Contact" },
      { cmd: "gui", label: "GUI Mode" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 md:mb-8">
          <div className="flex-1 min-w-0">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent break-words"
            >
              <button
                className="hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                onClick={handleNavigate}
                aria-label="Navigate to main portfolio"
              >
                KRATIN AGGARWAL
              </button>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl text-gray-300"
            >
              DESIGNER & DEVELOPER
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 md:mt-0 text-right flex-shrink-0"
          >
            <div className="text-xl sm:text-2xl font-bold">
              {formatTime(time)}
            </div>
            <div className="text-gray-300 text-sm sm:text-base">
              {formatDate(time)}
            </div>
          </motion.div>
        </div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800 overflow-hidden shadow-2xl"
        >
          {/* Terminal header */}
          <div className="flex items-center justify-between p-3 bg-gray-900 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs sm:text-sm font-mono">terminal</div>
            <div className="text-xs sm:text-sm text-gray-400">ENG IN</div>
          </div>

          {/* Terminal content - Responsive height */}
          <div className="p-3 sm:p-4 h-[50vh] sm:h-[60vh] md:h-[400px] overflow-y-auto font-mono text-xs sm:text-sm">
            {history.map((item, index) => (
              <div key={index} className="mb-2 sm:mb-3 last:mb-0">
                {item.type === "command" && (
                  <div className="flex flex-wrap">
                    <span className="text-green-400 flex-shrink-0">
                      kratin@portfolio:~$
                    </span>
                    <span className="ml-2 break-all">{item.content}</span>
                  </div>
                )}
                {item.type === "output" && (
                  <div className="mt-1 overflow-auto">{item.content}</div>
                )}
                {item.type === "error" && (
                  <div className="mt-1 text-red-400 break-words">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center p-3 bg-gray-900 border-t border-gray-800"
          >
            <span className="text-green-400 text-xs sm:text-sm flex-shrink-0">
              kratin@portfolio:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="ml-2 flex-1 bg-transparent outline-none text-xs sm:text-sm min-w-0"
              autoFocus
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              aria-label="Terminal command input"
              aria-describedby="terminal-help"
            />
          </form>

          {/* Hidden accessibility helper */}
          <div id="terminal-help" className="sr-only">
            Use arrow keys for command history, tab for autocomplete, type help
            for available commands
          </div>
        </motion.div>

        {/* Command shortcuts - Improved mobile layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3"
        >
          {shortcutButtons.map((item) => (
            <button
              key={item.cmd}
              onClick={() => handleShortcut(item.cmd)}
              className="p-3 sm:p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 focus:border-purple-500 focus:outline-none transition-colors text-center text-xs sm:text-sm md:text-base min-h-[48px] sm:min-h-[56px] touch-manipulation flex items-center justify-center"
              aria-label={`Execute ${item.cmd} command`}
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CLIMode;
