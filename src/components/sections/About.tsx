import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function About() {
  return (
    <section
      id="about"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-cyan-900/25 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection>
          <AnimatedItem className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Executive Summary
            </h2>
            <Separator className="flex-1 max-w-xs" />
          </AnimatedItem>
          <AnimatedItem>
            <div className="p-[1px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    A dynamic and entrepreneurial AI specialist with a proven
                    track record of architecting and deploying cutting-edge
                    machine learning solutions across diverse sectors including{" "}
                    <span className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      finance, healthcare, autonomous systems, and manufacturing
                    </span>
                    . Adept at leading teams and driving the development of
                    AI-first products from ideation to execution. Possesses deep
                    technical expertise in the full machine learning lifecycle,
                    from theoretical research and model development to
                    deployment and optimization on edge devices. Passionate
                    about leveraging advanced AI methodologies to build robust,
                    efficient, and intelligent systems that deliver significant
                    business and social value.
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
