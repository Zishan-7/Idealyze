"use client";

import { motion } from "motion/react";
import { Lightbulb } from "lucide-react";

export function ValidatorHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-primary/10 p-3">
          <Lightbulb className="h-8 w-8 text-primary" />
        </div>
      </div>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        Startup Idea Validator
      </h1>
      <p className="mb-12 text-lg text-muted-foreground sm:text-xl">
        Transform your ideas into actionable insights with AI-powered validation
      </p>
    </motion.div>
  );
}
