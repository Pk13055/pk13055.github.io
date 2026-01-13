import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/button";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandLinkedin,
  IconExternalLink,
  IconMail,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
    icon: IconBrandFacebook,
    label: "Facebook",
    href: "https://fb.com/pk13055",
  },
  {
    icon: IconMail,
    label: "Email",
    href: "mailto:hi@pk13055.com",
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
          <AnimatedItem className="flex items-center justify-center gap-4 mb-6">
            <IconMail className="w-8 h-8 text-rose-400" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent animate-gradient">
              Get In Touch
            </h2>
          </AnimatedItem>
          <AnimatedItem>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              Open to full-time AI/ML engineering roles, freelance consulting
              projects, and research collaborations. Whether you're looking for
              expertise in algorithmic trading, computer vision, deep learning,
              or building production ML systems, I'd love to hear from you.
              Available for opportunities worldwide and remote work.
            </p>
          </AnimatedItem>
          <AnimatedItem>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                size="lg"
                variant="outline"
                className="font-mono border-2 border-gradient-to-r from-rose-400 to-pink-500 bg-gradient-to-r from-rose-400/10 to-pink-500/10 hover:from-rose-400/20 hover:to-pink-500/20"
                asChild
              >
                <a
                  href="mailto:hi@pk13055.com"
                  className="text-rose-400 hover:text-rose-300"
                >
                  <IconMail className="mr-2 h-4 w-4" />
                  Say Hello
                </a>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="font-mono border-2 border-rose-500/60 bg-card/60 hover:bg-card/80"
                asChild
              >
                <Link to="/blog" className="flex items-center text-rose-100">
                  <IconExternalLink className="mr-2 h-4 w-4" />
                  Blog
                </Link>
              </Button>
            </div>
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
