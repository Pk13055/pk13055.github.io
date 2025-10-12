import {
  fadeIn,
  fadeInUp,
  rotateIn,
  scaleIn,
  slideInFromLeft,
  slideInFromRight,
} from "@/lib/animations";
import { motion, useInView, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?:
    | "fadeInUp"
    | "fadeIn"
    | "slideInFromLeft"
    | "slideInFromRight"
    | "scaleIn"
    | "rotateIn";
  delay?: number;
  threshold?: number;
}

export function AnimatedSection({
  children,
  className = "",
  animationType = "fadeInUp",
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-50px 0px -50px 0px",
    amount: threshold,
  });

  const getAnimationVariant = (): Variants => {
    switch (animationType) {
      case "fadeIn":
        return fadeIn;
      case "slideInFromLeft":
        return slideInFromLeft;
      case "slideInFromRight":
        return slideInFromRight;
      case "scaleIn":
        return scaleIn;
      case "rotateIn":
        return rotateIn;
      default:
        return fadeInUp;
    }
  };

  const animationVariant = getAnimationVariant();

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={animationVariant}
      transition={{
        ...animationVariant.transition,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({
  children,
  className = "",
  animationType = "fadeInUp",
  delay = 0,
}: AnimatedSectionProps) {
  const getAnimationVariant = (): Variants => {
    switch (animationType) {
      case "fadeIn":
        return fadeIn;
      case "slideInFromLeft":
        return slideInFromLeft;
      case "slideInFromRight":
        return slideInFromRight;
      case "scaleIn":
        return scaleIn;
      case "rotateIn":
        return rotateIn;
      default:
        return fadeInUp;
    }
  };

  const animationVariant = getAnimationVariant();

  return (
    <motion.div
      variants={animationVariant}
      transition={{
        ...animationVariant.transition,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-50px 0px -50px 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
