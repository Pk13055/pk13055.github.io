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
import { education } from "@/data/resume";
import { IconSchool } from "@tabler/icons-react";

export function Education() {
  return (
    <section
      id="education"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-indigo-900/25 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection>
          <AnimatedItem className="flex items-center gap-4 mb-12">
            <IconSchool className="w-8 h-8 text-indigo-400" />
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
              Education
            </h2>
            <Separator className="flex-1 max-w-xs" />
          </AnimatedItem>
          <AnimatedItem>
            <div className="p-[1px] bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg hover:shadow-lg transition-all">
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-2xl">{education.degree}</CardTitle>
                  <CardDescription className="text-base font-semibold text-foreground">
                    {education.field}
                  </CardDescription>
                  <CardDescription className="text-sm break-words">
                    {education.institution}, {education.location}
                  </CardDescription>
                  <CardDescription className="text-sm font-mono">
                    {education.period}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Selected Coursework:</strong>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {education.courses.map((course) => (
                      <Badge
                        key={course}
                        variant="secondary"
                        className="font-mono text-xs"
                      >
                        {course}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    {education.note}
                  </p>
                </CardContent>
              </Card>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
