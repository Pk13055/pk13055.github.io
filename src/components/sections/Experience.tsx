import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { experiences } from "@/data/resume";
import { IconBriefcase } from "@tabler/icons-react";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-orange-900/30 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection>
          <AnimatedItem className="flex items-center gap-4 mb-12">
            <IconBriefcase className="w-8 h-8 text-orange-400" />
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent animate-gradient">
              Professional Journey
            </h2>
            <Separator className="flex-1 max-w-xs" />
          </AnimatedItem>
          <div className="space-y-8">
            {experiences.map((job, idx) => (
              <AnimatedItem
                key={idx}
                animationType="fadeInUp"
                delay={idx * 0.15}
              >
                <div className="p-[1px] bg-gradient-to-r from-orange-400 to-red-500 rounded-lg hover:shadow-lg transition-all group">
                  <Card className="border-l-4 border-l-primary h-full">
                    <CardHeader>
                      <CardTitle className="text-xl flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                        <span className="break-words">{job.title}</span>
                        {job.companyUrl ? (
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent break-words hover:underline"
                          >
                            @ {job.company}
                          </a>
                        ) : (
                          <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent break-words">
                            @ {job.company}
                          </span>
                        )}
                        {job.location && (
                          <span className="text-sm text-muted-foreground break-words">
                            {job.location}
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription className="font-mono">
                        {job.period}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {job.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-muted-foreground"
                          >
                            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mt-1 flex-shrink-0">
                              ▹
                            </span>
                            <span className="text-sm sm:text-base">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
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
