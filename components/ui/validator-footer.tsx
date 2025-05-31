import { motion } from "motion/react";

export function ValidatorFooter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-16 text-center"
    >
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Built with Next.js, TailwindCSS, and Framer Motion
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Created by</span>
          <a
            href="https://github.com/Zishan-7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            @Zishan-7
          </a>
        </div>
      </div>
    </motion.div>
  );
}
