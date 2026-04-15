import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { skillGroups as rawSkillGroups } from "@/data/resume";
import {
  IconBrain,
  IconCloud,
  IconCode,
  IconDatabase,
  IconRobot,
  IconWorld,
} from "@tabler/icons-react";

const categoryIconMap: Record<string, React.ElementType> = {
  LLM: IconRobot,
  "Machine Learning": IconBrain,
  "Programming Languages": IconCode,
  "Web Development": IconWorld,
  Databases: IconDatabase,
  "DevOps & Cloud": IconCloud,
};

const skillGroups = rawSkillGroups.map((g) => ({
  ...g,
  icon: categoryIconMap[g.category] ?? IconCode,
}));

export function Skills() {
  return (
    <section
      id="skills"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-lime-900/30 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection>
          <AnimatedItem className="flex items-center gap-4 mb-12">
            <IconCode className="w-8 h-8 text-lime-400" />
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent animate-gradient">
              Technical Skills
            </h2>
            <Separator className="flex-1 max-w-xs" />
          </AnimatedItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillGroups.map((skillGroup, idx) => {
              const IconComponent = skillGroup.icon;
              return (
                <AnimatedItem
                  key={idx}
                  animationType={
                    idx % 2 === 0 ? "slideInFromLeft" : "slideInFromRight"
                  }
                  delay={idx * 0.1}
                >
                  <div className="h-full p-[1px] bg-gradient-to-r from-lime-400 to-green-500 rounded-lg hover:shadow-lg transition-all">
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <IconComponent className="w-5 h-5 text-lime-400" />
                          {skillGroup.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="font-mono text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </AnimatedItem>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
