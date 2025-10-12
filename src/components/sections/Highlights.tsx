import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  IconBriefcase,
  IconBulb,
  IconCode,
  IconRocket,
  IconSchool,
  IconSparkles,
  IconUsers,
} from "@tabler/icons-react";

const highlights = [
  {
    icon: IconRocket,
    title: "AI & Innovation",
    content:
      "Spearheaded the development of AI-first projects, including end-to-end algorithmic trading bots, computer vision systems for quality control, and machine learning models for supplemental signal generation in financial markets.",
  },
  {
    icon: IconBriefcase,
    title: "Product Leadership",
    content:
      "Co-founded Synalytica LLC, building AI-driven products in healthcare, finance, and content creation. Key products include FolioWiz (portfolio optimization) and Starter Up (content creation/curation).",
  },
  {
    icon: IconCode,
    title: "Technical Expertise",
    content:
      "Extensive experience in the entire ML lifecycle, from architectural design and algorithmic development (XGBoost, CNNs) to pipeline conversion (Python to C++), containerization (Docker), and optimization for edge devices (Nvidia Jetson TX2).",
  },
  {
    icon: IconBulb,
    title: "Research & Development",
    content:
      "Contributed to cutting-edge research in mental illness detection using social network analysis, mobile camera image quality assessment (bokeh detection), and fisheye stereo correspondence for autonomous driving systems.",
  },
  {
    icon: IconUsers,
    title: "Full-Stack Proficiency",
    content:
      "Versatile skill set spanning machine learning, backend development (Python, microservices), web technologies (React, Vue.js), and DevOps (GCP, AWS, Azure), enabling complete end-to-end solutions.",
  },
  {
    icon: IconSchool,
    title: "Philosophy",
    content:
      "Strong believer in a hands-on, collaborative approach to problem-solving, focused on creating scalable and stable platforms through modern software engineering practices like airflow-based pipelining and microservice architecture.",
  },
];

export function Highlights() {
  return (
    <section
      id="highlights"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-emerald-900/25 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection>
          <AnimatedItem className="flex items-center gap-4 mb-12">
            <IconSparkles className="w-8 h-8 text-emerald-400" />
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Key Highlights
            </h2>
            <Separator className="flex-1 max-w-xs" />
          </AnimatedItem>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {highlights.map((highlight, idx) => (
              <AnimatedItem
                key={idx}
                animationType={
                  idx % 2 === 0 ? "slideInFromLeft" : "slideInFromRight"
                }
                delay={idx * 0.1}
              >
                <div className="h-full p-[1px] bg-gradient-to-r from-emerald-400 to-green-500 rounded-lg hover:shadow-lg transition-shadow">
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-emerald-400/10">
                          <highlight.icon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <CardTitle className="text-xl">
                          {highlight.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-base leading-relaxed">
                        {highlight.content}
                      </CardDescription>
                    </CardHeader>
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
