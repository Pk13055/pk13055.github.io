import { Button } from "@/components/ui/button";
import { IconMail } from "@tabler/icons-react";
import { motion } from "framer-motion";

interface HeroProps {
  onContactClick: () => void;
}

export function Hero({ onContactClick }: HeroProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 bg-gradient-to-b from-background via-purple-900/25 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-32">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12"
        >
          {/* Avatar Image */}
          <motion.div variants={fadeInUp} className="flex-shrink-0">
            <div className="p-[1px] bg-gradient-to-r from-purple-400 via-violet-500 to-purple-600 rounded-full hover:shadow-2xl transition-all">
              <img
                src="/avatar.png"
                alt="Pratik K - AI and Machine Learning Engineer specializing in Algorithmic Trading and Computer Vision"
                className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full object-cover shadow-xl"
                width="256"
                height="256"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-violet-500 to-purple-600 bg-clip-text text-transparent mb-4 animate-gradient"
            >
              Pratik K
            </motion.h1>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 to-violet-400 bg-clip-text text-transparent mb-6 animate-gradient"
            >
              AI & Machine Learning Engineer | Algorithmic Trading | Computer
              Vision
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground max-w-2xl text-base sm:text-lg leading-relaxed mb-8"
            >
              AI/ML specialist with 5+ years of experience building intelligent,
              scalable systems using PyTorch, TensorFlow, and deep learning.
              Expert in algorithmic trading bots, computer vision systems, and
              end-to-end machine learning pipelines. I architect AI-first
              solutions that deliver measurable business value across finance,
              healthcare, and autonomous systems.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                variant="default"
                onClick={onContactClick}
                className="font-mono bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white"
              >
                <IconMail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
