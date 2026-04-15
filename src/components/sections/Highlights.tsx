import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { highlights as rawHighlights } from "@/data/resume";
import {
  IconBriefcase,
  IconBulb,
  IconCode,
  IconRocket,
  IconSchool,
  IconSparkles,
  IconUsers,
} from "@tabler/icons-react";

const titleIconMap: Record<string, React.ElementType> = {
  "AI & Innovation": IconRocket,
  "Product Leadership": IconBriefcase,
  "Technical Expertise": IconCode,
  "Research & Development": IconBulb,
  "Full-Stack Proficiency": IconUsers,
  Philosophy: IconSchool,
};

const highlights = rawHighlights.map((h) => ({
  ...h,
  icon: titleIconMap[h.title] ?? IconSparkles,
}));

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
