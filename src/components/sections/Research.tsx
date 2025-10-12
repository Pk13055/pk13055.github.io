import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const researchExperiences = [
  {
    title: "Research Scholar",
    organization: "Cognitive Research Lab, IIIT-H",
    location: "India",
    period: "Dec 2018 - May 2021",
    description:
      "Worked under Dr. Vinoo Alluri on developing a theoretical framework to model real-world social networks, focusing on mental illness detection through music consumption habits and social interaction trends.",
  },
  {
    title: "Deep Learning Intern",
    organization: "Siemens, Perception Lab",
    location: "Bangalore, India",
    period: "May 2019 - Jun 2019",
    description:
      "Contributed to deployment of 'ITF' - an intelligent traffic management system. Executed performance-critical pipeline conversion from Python to C++, followed by optimization and containerization (Docker) for Nvidia Jetson TX2.",
  },
  {
    title: "Deep Learning Intern",
    organization: "Valeo Dar",
    location: "Germany",
    period: "Jul 2018 - Jan 2019",
    description:
      "Focused on computer vision for autonomous driving, specifically fisheye stereo correspondence and direct depth estimation. Engineered end-to-end deep C++ pipeline to replace LIDAR for SLAM module.",
  },
  {
    title: "Vision Researcher",
    organization: "Computer Vision Lab, IIIT-H",
    location: "India",
    period: "May 2018 - Dec 2018",
    description:
      "Part of research team under Dr. Vineet Gandhi, working on mobile camera image quality assessment. Developed algorithms for bokeh detection and quantification.",
  },
  {
    title: "Machine Learning Engineer",
    organization: "Variance AI",
    location: "",
    period: "Sep 2017 - Mar 2018",
    description:
      "Designed core framework architecture for AI-powered fitness trainer. Implemented pose detection and labeling using Kinect point cloud data with client recognition and real-time correction feedback.",
  },
];

export function Research() {
  return (
    <section
      id="research"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-blue-900/25 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection>
          <AnimatedItem className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
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
