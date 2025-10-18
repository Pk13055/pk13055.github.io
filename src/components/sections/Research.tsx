import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IconMicroscope } from "@tabler/icons-react";

const researchExperiences = [
  {
    title: "Research Scholar",
    organization: "Cognitive Research Lab, IIIT-H",
    location: "India",
    period: "Dec 2018 - May 2021",
    description:
      "Developed theoretical framework for modeling real-world social networks using graph neural networks and network science. Research focused on mental illness detection through machine learning analysis of music consumption patterns and social interaction trends. Published findings on correlation between social media behavior and mental health indicators, achieving 82% classification accuracy using ensemble methods.",
  },
  {
    title: "Deep Learning Intern",
    organization: "Siemens, Perception Lab",
    location: "Bangalore, India",
    period: "May 2019 - Jun 2019",
    description:
      "Contributed to 'ITF' intelligent traffic management system deployment. Optimized performance-critical computer vision pipeline by converting Python implementation to C++ using OpenCV and TensorRT, achieving 3x speedup. Containerized application using Docker for deployment on Nvidia Jetson TX2 edge devices, enabling real-time traffic analysis at 30 FPS with <100ms latency.",
  },
  {
    title: "Deep Learning Intern",
    organization: "Valeo Dar",
    location: "Germany",
    period: "Jul 2018 - Jan 2019",
    description:
      "Advanced computer vision research for autonomous driving systems. Developed fisheye stereo correspondence algorithms and direct depth estimation models using CNNs to replace expensive LIDAR sensors. Engineered production-grade C++ deep learning pipeline achieving 95% depth estimation accuracy at 20 FPS, reducing sensor costs by $10K per vehicle while maintaining SLAM module performance.",
  },
  {
    title: "Vision Researcher",
    organization: "Computer Vision Lab, IIIT-H",
    location: "India",
    period: "May 2018 - Dec 2018",
    description:
      "Conducted research on mobile camera image quality assessment under Dr. Vineet Gandhi. Developed novel algorithms for computational photography: bokeh detection using semantic segmentation and depth estimation, plus quantitative bokeh quality metrics. Implemented models using PyTorch achieving 89% accuracy on smartphone image dataset of 10K+ photos.",
  },
  {
    title: "Machine Learning Engineer",
    organization: "Variance AI",
    location: "",
    period: "Sep 2017 - Mar 2018",
    description:
      "Architected core ML framework for AI-powered fitness training platform. Implemented real-time 3D pose estimation and human pose tracking using Kinect depth sensors and point cloud processing. Developed user recognition system and automated exercise correction feedback using sequence-to-sequence models, achieving 91% accuracy in pose classification across 50+ exercise types.",
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
