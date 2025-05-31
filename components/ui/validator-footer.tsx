"use client";

import { motion } from "motion/react";

export function ValidatorFooter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-16 text-center"
    >
      <p className="text-sm text-muted-foreground">
        Built with Next.js, TailwindCSS, and Framer Motion
      </p>
    </motion.div>
  );
}
