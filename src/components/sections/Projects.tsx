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
import { IconFolderOpen } from "@tabler/icons-react";

const projects = [
  {
    title: "Pill Anomaly Rejection System",
    client: "Graviti Pharma",
    period: "Jul 2020 - Dec 2020",
    problem:
      "Pharmaceutical manufacturing required automated quality control to detect defective pills at production speeds.",
    solution:
      "Architected end-to-end computer vision pipeline using CNNs and PyTorch for real-time anomaly detection. Built custom dataset of 50K+ pill images with defect annotations.",
    results:
      "Achieved 96% accuracy in defect classification, processing 200 pills/second with sub-50ms latency, reducing manual inspection costs by 65%.",
    tech: [
      "Python",
      "PyTorch",
      "CNNs",
      "Computer Vision",
      "Real-time Processing",
      "OpenCV",
    ],
  },
  {
    title: "Tangible Learning",
    client: "Stanford University",
    period: "Oct 2018 - Dec 2019",
    problem: "Remote collaboration in education lacked physical interactivity.",
    solution:
      "Developed mixed-reality application using computer vision and deep learning to recognize physical learning tiles and project them in real-time to remote participants. Implemented custom object detection model using TensorFlow and integrated with WebRTC for low-latency streaming.",
    results:
      "Enabled seamless tangible interaction for distributed teams with <100ms end-to-end latency, supporting 10+ concurrent users.",
    tech: [
      "Computer Vision",
      "TensorFlow",
      "Deep Learning",
      "Mixed Reality",
      "WebRTC",
      "Python",
    ],
  },
  {
    title: "Hindi-English Code Mixed Dataset",
    client: "Language Tech Research Center, IIIT-H",
    period: "Sep 2018",
    problem:
      "NLP research on code-mixed languages (Hindi-English) lacked large-scale datasets.",
    solution:
      "Built high-performance multi-processed web scraping pipeline using Python and BeautifulSoup to collect and process code-mixed social media content. Implemented distributed processing across 16 cores with Redis queue management.",
    results:
      "Collected dataset of 7000+ articles (5M+ tokens), published for academic research, enabling sentiment analysis and language identification models for code-mixed text.",
    tech: [
      "Python",
      "NLP",
      "Multi-processing",
      "Data Engineering",
      "Redis",
      "BeautifulSoup",
    ],
  },
  {
    title: "Competitive Coding Application",
    client: "Project under Dr. Raghu Reddy",
    period: "Apr 2017",
    problem:
      "Need for secure online coding platform for educational assessment.",
    solution:
      "Developed full-stack web application using Flask with sandboxed Docker containers for safe code execution. Implemented custom judge module supporting Python, C++, and Java with automated test case generation and performance metrics.",
    results:
      "Platform used by 500+ students for competitive programming practice, executing 10K+ code submissions with 99.9% uptime.",
    tech: [
      "Flask",
      "Python",
      "Docker",
      "Sandboxing",
      "Full-stack",
      "PostgreSQL",
    ],
  },
  {
    title: "Legend of Zelda Game",
    client: "Project under Dr. Avinash Sharma",
    period: "Dec 2017",
    problem:
      "Explore AI techniques in game development and graphics programming.",
    solution:
      "Developed 3D game remake using OpenGL and C++ with intelligent enemy NPCs featuring A* pathfinding, behavior trees, and state machines. Implemented custom shader programs for lighting and created procedural terrain generation.",
    results:
      "Fully playable game with 5 levels, showcasing advanced AI behaviors and achieving 60 FPS on mid-range hardware.",
    tech: ["OpenGL", "C++", "Game AI", "A* Algorithm", "3D Graphics", "GLSL"],
  },
  {
    title: "Linux Shell Project",
    client: "Project under Dr. P.K. Reddy",
    period: "Sep 2017",
    problem:
      "Understand Unix system calls and shell mechanics through implementation.",
    solution:
      "Created feature-rich Zsh-like shell in C++ supporting process management, I/O redirection, piping, background jobs, and command auto-completion using trie data structure. Implemented signal handling and custom prompt themes.",
    results:
      "Fully functional shell with 25+ built-in commands, demonstrating deep understanding of OS concepts and system-level programming.",
    tech: [
      "C++",
      "Linux",
      "System Programming",
      "Unix APIs",
      "Process Management",
    ],
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
            <IconFolderOpen className="w-8 h-8 text-fuchsia-400" />
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
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
                      <div className="space-y-3">
                        <div>
                          <Badge className="mb-2 font-semibold bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200 hover:bg-fuchsia-200">
                            Problem
                          </Badge>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.problem}
                          </p>
                        </div>
                        <div>
                          <Badge className="mb-2 font-semibold bg-fuchsia-200 text-fuchsia-900 border-fuchsia-300 hover:bg-fuchsia-300">
                            Solution
                          </Badge>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.solution}
                          </p>
                        </div>
                        <div>
                          <Badge className="mb-2 font-semibold bg-gradient-to-r from-fuchsia-400 to-pink-500 text-white border-0 hover:from-fuchsia-500 hover:to-pink-600">
                            Results
                          </Badge>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.results}
                          </p>
                        </div>
                      </div>
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
