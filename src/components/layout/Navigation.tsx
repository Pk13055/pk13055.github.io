import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  IconBriefcase,
  IconCode,
  IconFolderOpen,
  IconHome,
  IconMail,
  IconMicroscope,
  IconSchool,
  IconSparkles,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({
  activeSection,
  onSectionChange,
}: NavigationProps) {
  const navigationItems = [
    { id: "home", label: "Home", icon: IconHome },
    { id: "about", label: "About", icon: IconUser },
    { id: "highlights", label: "Highlights", icon: IconSparkles },
    { id: "experience", label: "Experience", icon: IconBriefcase },
    { id: "research", label: "Research", icon: IconMicroscope },
    { id: "projects", label: "Projects", icon: IconFolderOpen },
    { id: "skills", label: "Skills", icon: IconCode },
    { id: "education", label: "Education", icon: IconSchool },
    { id: "other-experience", label: "Leadership", icon: IconUsers },
    { id: "contact", label: "Contact", icon: IconMail },
  ];

  // Gradient colors for each section
  const sectionGradients: Record<
    string,
    { from: string; to: string; bg: string }
  > = {
    home: {
      from: "from-purple-500",
      to: "to-violet-600",
      bg: "bg-gradient-to-br from-purple-600 to-violet-700",
    },
    about: {
      from: "from-cyan-500",
      to: "to-blue-600",
      bg: "bg-gradient-to-br from-cyan-600 to-blue-700",
    },
    highlights: {
      from: "from-emerald-500",
      to: "to-green-600",
      bg: "bg-gradient-to-br from-emerald-600 to-green-700",
    },
    experience: {
      from: "from-orange-500",
      to: "to-red-600",
      bg: "bg-gradient-to-br from-orange-600 to-red-700",
    },
    research: {
      from: "from-blue-500",
      to: "to-indigo-600",
      bg: "bg-gradient-to-br from-blue-600 to-indigo-700",
    },
    projects: {
      from: "from-fuchsia-500",
      to: "to-pink-600",
      bg: "bg-gradient-to-br from-fuchsia-600 to-pink-700",
    },
    skills: {
      from: "from-lime-500",
      to: "to-green-600",
      bg: "bg-gradient-to-br from-lime-600 to-green-700",
    },
    education: {
      from: "from-indigo-500",
      to: "to-purple-600",
      bg: "bg-gradient-to-br from-indigo-600 to-purple-700",
    },
    "other-experience": {
      from: "from-teal-500",
      to: "to-cyan-600",
      bg: "bg-gradient-to-br from-teal-600 to-cyan-700",
    },
    contact: {
      from: "from-rose-500",
      to: "to-pink-600",
      bg: "bg-gradient-to-br from-rose-600 to-pink-700",
    },
  };

  const activeGradient =
    sectionGradients[activeSection] || sectionGradients.home;

  return (
    <TooltipProvider>
      <motion.nav
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      >
        <div className="bg-background/80 backdrop-blur-md border border-border rounded-full p-2 shadow-lg">
          <ul className="flex flex-col gap-1">
            {navigationItems.map(({ id, label, icon: Icon }, index) => {
              const isActive = activeSection === id;
              const activeIndex = navigationItems.findIndex(
                (item) => item.id === activeSection
              );
              const distance = Math.abs(index - activeIndex);

              return (
                <li key={id} className="relative">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.button
                        whileHover={{
                          scale: 1.8,
                          y: -8,
                          transition: {
                            type: "spring",
                            stiffness: 500,
                            damping: 15,
                          },
                        }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => onSectionChange(id)}
                        className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 overflow-hidden ${
                          isActive
                            ? "text-white shadow-xl"
                            : "hover:bg-muted/50"
                        }`}
                        animate={{
                          scale: isActive ? 1.2 : 1,
                          y: isActive ? -4 : 0,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                          },
                        }}
                        style={{
                          zIndex: isActive ? 30 : 10,
                        }}
                      >
                        {/* Gradient background that fades behind the icon */}
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className={`absolute inset-0 ${activeGradient.bg}`}
                            style={{
                              maskImage:
                                "radial-gradient(circle at center, transparent 20%, black 60%)",
                              WebkitMaskImage:
                                "radial-gradient(circle at center, transparent 20%, black 60%)",
                            }}
                          />
                        )}
                        <Icon size={20} className="relative z-10" />
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="font-medium">
                      {label}
                    </TooltipContent>
                  </Tooltip>

                  {/* Surrounding icons scale effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-muted/10"
                    animate={{
                      scale:
                        isActive && distance <= 2 ? 1.1 - distance * 0.05 : 1,
                      opacity:
                        isActive && distance <= 2 ? 0.3 - distance * 0.1 : 0,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        delay: distance * 0.05,
                      },
                    }}
                    style={{
                      zIndex: 0,
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </motion.nav>
    </TooltipProvider>
  );
}
