import { useEffect, useState } from "react";

// Layout Components
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";

// Section Components
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { OtherExperience } from "@/components/sections/OtherExperience";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Skills } from "@/components/sections/Skills";

// SEO Component
import { SEO } from "@/components/SEO";
import { generateCompleteStructuredData } from "@/lib/seo";

export function HomePage() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "highlights",
        "experience",
        "research",
        "projects",
        "skills",
        "education",
        "other-experience",
        "contact",
      ];

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <SEO structuredData={generateCompleteStructuredData()} />
      <div className="min-h-screen bg-background">
        <Navigation
          activeSection={activeSection}
          onSectionChange={scrollToSection}
        />

        <Hero onContactClick={() => scrollToSection("contact")} />
        <About />
        <Highlights />
        <Experience />
        <Research />
        <Projects />
        <Skills />
        <Education />
        <OtherExperience />
        <Contact />

        <Footer />
      </div>
    </>
  );
}

export default HomePage;

