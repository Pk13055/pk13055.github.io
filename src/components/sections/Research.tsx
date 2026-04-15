import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { researchExperiences } from "@/data/resume";
import { IconMicroscope } from "@tabler/icons-react";

export function Research() {
  return (
    <section
      id="research"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-blue-900/25 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection>
          <AnimatedItem className="flex items-center gap-4 mb-12">
            <IconMicroscope className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent animate-gradient">
              Internships & Research
            </h2>
            <Separator className="flex-1 max-w-xs" />
          </AnimatedItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchExperiences.map((research, idx) => (
              <AnimatedItem
                key={idx}
                animationType={
                  idx % 2 === 0 ? "slideInFromLeft" : "slideInFromRight"
                }
                delay={idx * 0.1}
              >
                <div className="h-full p-[1px] bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg hover:shadow-lg transition-shadow">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {research.title}
                      </CardTitle>
                      <CardDescription className="font-semibold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                        {research.organization}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {research.location && <span>{research.location}</span>}
                        <span>•</span>
                        <span className="font-mono">{research.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {research.description}
                      </p>
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
