import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const experiences = [
  {
    title: "AI Innovation Specialist",
    company: "Trilogy (ESW Capital Group)",
    location: "TX, USA",
    period: "Feb 2025 - Present",
    achievements: [
      "Leading and contributing to high-impact, AI-first projects, applying advanced machine learning techniques to solve complex business challenges",
      "Driving innovation within the enterprise software portfolio",
    ],
  },
  {
    title: "Quantitative Engineer",
    company: "Trade Wise Capital",
    location: "USA",
    period: "Nov 2022 - Present",
    achievements: [
      "Architected and built a complete, end-to-end algorithmic trading bot as a scalable VPS SaaS solution",
      "Developing ML models to generate supplemental trading signals, enhancing strategy performance",
      "Researching and integrating new alpha-generating strategies and indicators using MT5 and TradingView",
    ],
  },
  {
    title: "Partner, CTO",
    company: "Synalytica LLC",
    location: "USA",
    period: "Nov 2020 - Present",
    achievements: [
      "Co-founded a venture studio focused on building innovative products across healthcare, finance, content, and education",
      "Led technology vision and development of FolioWiz (AI-driven stock portfolio optimization platform)",
      "Built Starter Up (AI-based content creation and curation tool)",
      "Developed Energylicious (predictive analytics for energy-saving insights)",
      "Created WarrVault (logistics and tracking system for warranties)",
    ],
  },
  {
    title: "Chief Technical Lead",
    company: "QuantifAI",
    location: "Malaysia",
    period: "Apr 2019 - Feb 2020",
    achievements: [
      "Engineered high-frequency, low-latency algorithmic trading platform utilizing FiX-based API",
      "Worked with AlgoTrader platform to back-test, validate, and deploy autonomous forex trading strategies",
      "Managed and mentored a team of five software developer interns",
    ],
  },
  {
    title: "Technical Consultant/Contractor",
    company: "Docturnal",
    location: "Hyderabad, India",
    period: "May 2018 - Feb 2020",
    achievements: [
      "Re-architected platform by transitioning to Airflow-based pipelining and scheduling system",
      "Provided architectural consultation for Python microservices-based platform",
      "Designed and implemented ML architecture using XGBoost for classification of respiratory illnesses (COPD, tuberculosis) based on cough audio signatures",
    ],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-orange-900/30 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <AnimatedSection>
          <AnimatedItem className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
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
                      <CardTitle className="text-xl flex flex-wrap items-baseline gap-2">
                        <span>{job.title}</span>
                        <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                          @ {job.company}
                        </span>
                        {job.location && (
                          <span className="text-sm text-muted-foreground">
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
