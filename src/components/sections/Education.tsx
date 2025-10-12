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

const courses = [
  "Machine Learning I*",
  "Artificial Intelligence",
  "Game Theory*",
  "Complexity and Advanced Algorithms*",
  "Algorithms",
  "Data Structures",
  "Structured Systems Design",
  "Introduction to Databases",
  "Operating Systems",
  "Computer Organisation",
];

export function Education() {
  return (
    <section
      id="education"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-indigo-900/25 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection>
          <AnimatedItem className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Education
            </h2>
            <Separator className="flex-1 max-w-xs" />
          </AnimatedItem>
          <AnimatedItem>
            <div className="p-[1px] bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg hover:shadow-lg transition-all">
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Bachelor of Technology
                  </CardTitle>
                  <CardDescription className="text-base font-semibold text-foreground">
                    Computer Science and Engineering
                  </CardDescription>
                  <CardDescription className="text-sm">
                    International Institute of Information Technology,
                    Hyderabad, India
                  </CardDescription>
                  <CardDescription className="text-sm font-mono">
                    May 2016 - May 2021
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Selected Coursework:</strong>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {courses.map((course) => (
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
                    * Denotes advanced or honors-level coursework
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
