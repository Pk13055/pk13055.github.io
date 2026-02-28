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
      "Spearheaded AI-first projects: healthcare document pipelines (Vertex AI classification and structured extraction), algorithmic trading bots and simulated trading platforms, computer vision for quality control, and ML models for trading signals and financial markets.",
  },
  {
    icon: IconBriefcase,
    title: "Product Leadership",
    content:
      "Co-founded Synalytica LLC; built TraderRoyale (competitive forex simulation) and PostAI (social media scheduling) for Trade Wise Capital. Delivered FolioWiz, Starter Up, and healthcare/education products from concept to production.",
  },
  {
    icon: IconCode,
    title: "Technical Expertise",
    content:
      "Full-stack and ML lifecycle: React/TypeScript, FastAPI, PostgreSQL, MongoDB, Redis, Docker Compose. Document AI and extraction pipelines; real-time market data and order execution; OAuth and crypto payment flows; edge deployment (Nvidia Jetson).",
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
      "Versatile skill set: React (Vite), FastAPI, PostgreSQL, MongoDB, Redis, TimescaleDB; Docker Compose and Nginx; GCP (Vertex AI, GCS). Delivers complete end-to-end products from API and data pipelines to responsive UIs and DevOps.",
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
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent animate-gradient">
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
