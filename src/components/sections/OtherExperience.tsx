import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IconUsers } from "@tabler/icons-react";

const experiences = [
  {
    title: "Teaching Assistant",
    organization: "IIIT Hyderabad",
    period: "Aug 2018 - Nov 2018",
    description:
      "Served as TA for Structured Systems Analysis Design (SSAD) course. Guided three student teams in managing client requirements and software engineering best practices.",
  },
  {
    title: "Technical Project Manager",
    organization: "MBR Informatics",
    period: "Jan 2018 - Jul 2018",
    description:
      "Managed team of 10 developers, overseeing project timelines, CI integration, and workflow design. Led development of Django-based health management platform.",
  },
  {
    title: "Web Administrator",
    organization: "IIIT Hyderabad",
    period: "Oct 2017 - Jan 2018",
    description:
      "Managed entire college web framework and led design and implementation of new image-sharing portal for student body.",
  },
  {
    title: "Web Developer",
    organization: "Mayabazaar",
    period: "Aug 2016 - Oct 2016",
    description:
      "Developed user interface for movie industry-based e-commerce portal. Integrated secure payment gateway (Stripe) for online transactions.",
  },
];

const communityInvolvement = [
  "OSDG Volunteer: Led rebuild of college applications (courier portal, recommendation system) using modern technologies (2020)",
  "BeeTech Co-founder: Started Medium publication to provide consolidated free information about tech",
  "Teacher, Ashakiran (2017-2018): Taught English, Physics, and Science to underprivileged children",
  "Listener, 7 Cups (2016-2017): Provided emotional support through active listening sessions",
  "IIIT-H MUN: Member of the Organizing Committee (2016-2017)",
];

export function OtherExperience() {
  return (
    <section
      id="other-experience"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-teal-900/25 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection>
          <AnimatedItem className="flex items-center gap-4 mb-12">
            <IconUsers className="w-8 h-8 text-teal-400" />
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent animate-gradient">
              Other Experience & Leadership
            </h2>
            <Separator className="flex-1 max-w-xs" />
          </AnimatedItem>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((experience, idx) => (
              <AnimatedItem
                key={idx}
                animationType={
                  idx % 2 === 0 ? "slideInFromLeft" : "slideInFromRight"
                }
                delay={idx * 0.1}
              >
                <div className="h-full p-[1px] bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg hover:shadow-md transition-shadow">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {experience.title}
                      </CardTitle>
                      <CardDescription className="font-semibold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                        {experience.organization}
                      </CardDescription>
                      <CardDescription className="text-xs font-mono">
                        {experience.period}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {experience.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </AnimatedItem>
            ))}
          </div>

          {/* Community Involvement */}
          <AnimatedItem className="mt-12">
            <div className="p-[1px] bg-gradient-to-r from-teal-400 to-cyan-500 rounded-lg">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Community Involvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {communityInvolvement.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-sm text-muted-foreground"
                      >
                        <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mt-1 flex-shrink-0">
                          ▹
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
