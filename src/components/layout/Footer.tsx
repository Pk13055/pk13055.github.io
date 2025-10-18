import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-border py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
        <p className="text-muted-foreground text-sm font-mono">
          &copy; 2025{" "}
          <a
            href="https://github.com/pk13055"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            @pk13055
          </a>
          . All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
}
