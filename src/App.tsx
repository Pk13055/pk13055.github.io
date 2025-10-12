import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useState } from "react";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-primary font-mono">PK</div>
            <ul className="flex gap-8">
              {["home", "about", "experience", "projects", "contact"].map(
                (section) => (
                  <li key={section}>
                    <button
                      onClick={() => scrollToSection(section)}
                      className={`capitalize text-sm font-medium transition-colors hover:text-primary ${
                        activeSection === section
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {section}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-8 py-32">
          <p className="text-primary font-mono text-base mb-5">
            Hi, my name is
          </p>
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-4">
            Pratik K.
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold text-muted-foreground mb-6">
            I build things for the web.
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed mb-12">
            I'm a software engineer specializing in building exceptional digital
            experiences. Currently, I'm focused on building accessible,
            human-centered products.
          </p>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="font-mono"
          >
            Get In Touch
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 py-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-bold text-foreground">About Me</h2>
            <Separator className="flex-1 max-w-xs" />
          </div>
          <div className="max-w-3xl">
            <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                Hello! My name is Pratik and I enjoy creating things that live
                on the internet. My interest in web development started back in
                college when I decided to try building custom themes — turns out
                hacking together a custom theme taught me a lot about HTML &
                CSS!
              </p>
              <p>
                Fast-forward to today, and I've had the privilege of working at
                various companies, a start-up, and a student-led design studio.
                My main focus these days is building accessible, inclusive
                products and digital experiences for a variety of clients.
              </p>
              <p className="mb-4">
                Here are a few technologies I've been working with recently:
              </p>
              <ul className="grid grid-cols-2 gap-2 max-w-md">
                {[
                  "JavaScript (ES6+)",
                  "TypeScript",
                  "React",
                  "Node.js",
                  "Python",
                  "GraphQL",
                ].map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 font-mono text-sm"
                  >
                    <span className="text-primary">▹</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 py-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-bold text-foreground">
              Where I've Worked
            </h2>
            <Separator className="flex-1 max-w-xs" />
          </div>
          <div className="space-y-8 max-w-3xl">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-xl">
                  Software Engineer @{" "}
                  <span className="text-primary">Company Name</span>
                </CardTitle>
                <CardDescription className="font-mono">
                  January 2023 - Present
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Develop and maintain web applications using React and Node.js",
                    "Collaborate with cross-functional teams to deliver high-quality products",
                    "Write modern, performant, and maintainable code",
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-muted-foreground">
                      <span className="text-primary mt-1">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="text-xl">
                  Frontend Developer @{" "}
                  <span className="text-primary">Previous Company</span>
                </CardTitle>
                <CardDescription className="font-mono">
                  June 2021 - December 2022
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Built and shipped features for multiple web applications",
                    "Worked with designers to implement pixel-perfect UI components",
                    "Optimized applications for maximum speed and scalability",
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-muted-foreground">
                      <span className="text-primary mt-1">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 py-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-bold text-foreground">
              Some Things I've Built
            </h2>
            <Separator className="flex-1 max-w-xs" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Project One",
                description:
                  "A web application built with React and Node.js that helps users manage their tasks efficiently.",
                tech: ["React", "Node.js", "MongoDB"],
                links: [
                  { label: "GitHub", icon: Github },
                  { label: "Live Demo", icon: ExternalLink },
                ],
              },
              {
                title: "Project Two",
                description:
                  "A mobile-responsive website that showcases modern web design principles and best practices.",
                tech: ["HTML5", "CSS3", "JavaScript"],
                links: [
                  { label: "GitHub", icon: Github },
                  { label: "Live Demo", icon: ExternalLink },
                ],
              },
              {
                title: "Project Three",
                description:
                  "An API service that provides real-time data processing and analytics for business applications.",
                tech: ["Python", "FastAPI", "PostgreSQL"],
                links: [
                  { label: "GitHub", icon: Github },
                  { label: "Documentation", icon: ExternalLink },
                ],
              },
            ].map((project, idx) => (
              <Card
                key={idx}
                className="flex flex-col hover:border-primary transition-all hover:-translate-y-2"
              >
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="font-mono text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-4">
                  {project.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href="#"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </a>
                    );
                  })}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 py-32 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Get In Touch
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              I'm currently looking for new opportunities. Whether you have a
              question or just want to say hi, I'll try my best to get back to
              you!
            </p>
            <Button
              size="lg"
              variant="outline"
              className="font-mono mb-12"
              asChild
            >
              <a href="mailto:your-email@example.com">
                <Mail className="mr-2 h-4 w-4" />
                Say Hello
              </a>
            </Button>
            <div className="flex justify-center gap-6">
              {[
                {
                  icon: Github,
                  label: "GitHub",
                  href: "https://github.com/pk13055",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/yourprofile",
                },
                {
                  icon: Twitter,
                  label: "Twitter",
                  href: "https://twitter.com/yourhandle",
                },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-muted-foreground text-sm font-mono">
            &copy; 2025 pk13055. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
