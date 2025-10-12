import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconExternalLink,
  IconMail,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    icon: IconBrandGithub,
    label: "GitHub",
    href: "https://github.com/pk13055",
  },
  {
    icon: IconBrandLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/pk13055",
  },
  {
    icon: IconMail,
    label: "Email",
    href: "mailto:pratik.k98@yahoo.com",
  },
  {
    icon: IconExternalLink,
    label: "Portfolio",
    href: "https://pk13055.github.io",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-rose-900/25 to-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
        <AnimatedSection className="max-w-2xl mx-auto">
          <AnimatedItem>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent mb-6">
              Get In Touch
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              I'm always interested in hearing about new opportunities,
              collaborations, or just connecting with fellow innovators. Whether
              you have a question or just want to say hi, I'll try my best to
              get back to you!
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <Button
              size="lg"
              variant="outline"
              className="font-mono mb-12 border-2 border-gradient-to-r from-rose-400 to-pink-500 bg-gradient-to-r from-rose-400/10 to-pink-500/10 hover:from-rose-400/20 hover:to-pink-500/20"
              asChild
            >
              <a
                href="mailto:pratik.k98@yahoo.com"
                className="text-rose-400 hover:text-rose-300"
              >
                <IconMail className="mr-2 h-4 w-4" />
                Say Hello
              </a>
            </Button>
          </AnimatedItem>
          <AnimatedItem>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-rose-400 transition-colors"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
