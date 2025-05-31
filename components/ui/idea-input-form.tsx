"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, TrendingUp } from "lucide-react";

interface IdeaInputFormProps {
  idea: string;
  onIdeaChange: (value: string) => void;
  onSubmit: () => void;
  isDisabled?: boolean;
}

export function IdeaInputForm({
  idea,
  onIdeaChange,
  onSubmit,
  isDisabled = false,
}: IdeaInputFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-xl shadow-primary/5">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Sparkles className="h-5 w-5 text-primary" />
            Describe Your Startup Idea
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label
              htmlFor="startup-idea"
              className="text-sm font-medium text-foreground"
            >
              What&apos;s your startup idea?
            </Label>
            <Textarea
              id="startup-idea"
              placeholder="Describe your startup idea in detail... What problem does it solve? Who is your target audience? What makes it unique?"
              value={idea}
              onChange={(e) => onIdeaChange(e.target.value)}
              className="min-h-[150px] resize-none border-border/50 bg-background/50 text-base leading-relaxed placeholder:text-muted-foreground/70 focus:border-primary/50 focus:ring-primary/20"
              rows={6}
            />
            <p className="text-xs text-muted-foreground">
              The more detailed your description, the better insights
              you&apos;ll receive.
            </p>
          </div>

          <Button
            onClick={onSubmit}
            disabled={isDisabled || !idea.trim()}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed h-12 text-base font-medium transition-all duration-200"
          >
            {isDisabled ? (
              <>
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Validating with AI...
              </>
            ) : (
              <>
                <TrendingUp className="mr-2 h-5 w-5" />
                Validate Idea
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
