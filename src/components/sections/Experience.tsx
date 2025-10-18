import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IconBriefcase } from "@tabler/icons-react";

const experiences = [
  {
    title: "AI Innovation Specialist",
    company: "Trilogy (ESW Capital Group)",
    location: "TX, USA",
    period: "Feb 2025 - Present",
    achievements: [
      "Leading high-impact AI-first projects, applying advanced machine learning and deep learning techniques to solve complex enterprise software challenges",
      "Driving innovation within the software portfolio using PyTorch, TensorFlow, and modern ML frameworks",
    ],
  },
  {
    title: "Quantitative Engineer",
    company: "Trade Wise Capital",
    location: "USA",
    period: "Nov 2022 - Present",
    achievements: [
      "Architected and built complete end-to-end algorithmic trading bot as scalable VPS SaaS solution using Python, achieving consistent alpha generation",
      "Developed machine learning models for supplemental trading signal generation, improving strategy performance by 15%",
      "Research and integrate new alpha-generating strategies using ML-driven indicators on MT5 and TradingView platforms",
    ],
  },
  {
    title: "Partner, CTO",
    company: "Synalytica LLC",
    companyUrl: "https://synalytica.com",
    location: "USA",
    period: "Nov 2020 - Present",
    achievements: [
      "Co-founded venture studio, leading technology vision for AI-driven products across healthcare, finance, and education sectors",
      "Architected FolioWiz: AI-powered stock portfolio optimization platform using machine learning for risk-adjusted returns",
      "Built Starter Up: AI-based content creation tool leveraging NLP and generative models",
      "Developed Energylicious: predictive analytics platform for energy consumption optimization using time-series forecasting",
      "Created WarrVault: logistics tracking system with computer vision for warranty document processing",
    ],
  },
  {
    title: "Chief Technical Lead",
    company: "QuantifAI",
    location: "Malaysia",
    period: "Apr 2019 - Feb 2020",
    achievements: [
      "Engineered high-frequency, low-latency algorithmic trading platform using FiX API, handling 1000+ transactions per second",
      "Deployed autonomous forex trading strategies on AlgoTrader platform, achieving 23% annualized returns through ML-driven backtesting",
      "Led and mentored team of 5 software engineers, establishing CI/CD pipelines and best practices for financial ML systems",
    ],
  },
  {
    title: "Technical Consultant/Contractor",
    company: "Docturnal",
    location: "Hyderabad, India",
    period: "May 2018 - Feb 2020",
    achievements: [
      "Re-architected platform transitioning to Airflow-based ML pipeline and scheduling system, reducing processing time by 40%",
      "Provided architectural consultation for Python microservices platform, implementing FastAPI and Docker containerization",
      "Designed ML architecture using XGBoost and CNNs for respiratory illness classification (COPD, tuberculosis) from cough audio, achieving 87% accuracy",
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
