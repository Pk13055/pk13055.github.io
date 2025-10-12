import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const projects = [
  {
    title: "Pill Anomaly Rejection System",
    client: "Graviti Pharma",
    period: "Jul 2020 - Dec 2020",
    description:
      "Built end-to-end Python pipeline for medicine pill anomaly detection and rejection using CNNs to identify and estimate defects at real-time rates.",
    tech: ["Python", "CNNs", "Computer Vision", "Real-time Processing"],
  },
  {
    title: "Tangible Learning",
    client: "Stanford University",
    period: "Oct 2018 - Dec 2019",
    description:
      "Developed mixed-reality application for real-time, tangible collaboration. Used computer vision to recognize physical tiles and project virtually to remote participants.",
    tech: ["Computer Vision", "Deep Learning", "Mixed Reality"],
  },
  {
    title: "Hindi-English Code Mixed Dataset",
    client: "Language Tech Research Center, IIIT-H",
    period: "Sep 2018",
    description:
      "Developed high-speed, multi-processed application to download and process code-mixed articles. Collected dataset of ~7000 articles for NLP research.",
    tech: ["Python", "NLP", "Multi-processing", "Data Engineering"],
  },
  {
    title: "Competitive Coding Application",
    client: "Project under Dr. Raghu Reddy",
    period: "Apr 2017",
    description:
      "Developed full-stack Flask application with sandboxed judge module for code compilation, execution, and checking with test case generation.",
    tech: ["Flask", "Python", "Sandboxing", "Full-stack"],
  },
  {
    title: "Legend of Zelda Game",
    client: "Project under Dr. Avinash Sharma",
    period: "Dec 2017",
    description:
      "Developed 3D remake using OpenGL with smart enemies featuring pathfinding and behavioral AI, along with custom textures and sound design.",
    tech: ["OpenGL", "C++", "Game AI", "3D Graphics"],
  },
  {
    title: "Linux Shell Project",
    client: "Project under Dr. P.K. Reddy",
    period: "Sep 2017",
    description:
      "Created Zsh-like shell in C++ with piping, redirection, auto-completion, and themed-PS1 prompt support.",
    tech: ["C++", "Linux", "System Programming"],
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-fuchsia-900/25 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection>
          <AnimatedItem className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
              Innovation & Key Projects
            </h2>
            <Separator className="flex-1 max-w-xs" />
          </AnimatedItem>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <AnimatedItem
                key={idx}
                animationType={
                  idx % 2 === 0 ? "slideInFromLeft" : "slideInFromRight"
                }
                delay={idx * 0.1}
                className="h-full"
              >
                <div className="h-full p-[1px] bg-gradient-to-r from-fuchsia-400 to-pink-500 rounded-lg hover:shadow-lg transition-all">
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-lg leading-tight">
                          {project.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-xs font-semibold bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
                        {project.client}
                      </CardDescription>
                      <CardDescription className="text-xs font-mono">
                        {project.period}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col gap-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
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
                  </Card>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
