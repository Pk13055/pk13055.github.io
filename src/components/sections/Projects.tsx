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
import { projects } from "@/data/resume";
import { IconFolderOpen } from "@tabler/icons-react";

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
