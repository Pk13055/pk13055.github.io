import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IconUser } from "@tabler/icons-react";

export function About() {
  return (
    <section
      id="about"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-cyan-900/25 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection>
          <AnimatedItem className="flex items-center gap-4 mb-12">
            <IconUser className="w-8 h-8 text-cyan-400" />
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
              Executive Summary
            </h2>
            <Separator className="flex-1 max-w-xs" />
          </AnimatedItem>
          <AnimatedItem>
            <div className="p-[1px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Dynamic AI/ML engineer and technical leader with 5+ years
                    architecting and deploying cutting-edge machine learning
                    solutions using{" "}
                    <span className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      PyTorch, TensorFlow, and deep learning frameworks
                    </span>{" "}
                    across diverse sectors including finance, healthcare,
                    autonomous systems, and manufacturing. Proven track record
                    building high-frequency algorithmic trading platforms,
                    computer vision systems for quality control, and NLP models
                    for code-mixed datasets. Expert in the full ML lifecycle:
                    from research and model development to production
                    deployment, containerization (Docker), and optimization for
                    edge devices (Nvidia Jetson). Co-founded Synalytica LLC,
                    leading development of AI-driven products in healthcare and
                    finance. Open to full-time opportunities, consulting
                    engagements, and research collaborations.
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
