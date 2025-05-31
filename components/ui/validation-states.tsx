import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface LoadingStateProps {
  isVisible: boolean;
}

interface ErrorStateProps {
  isVisible: boolean;
  error: string;
}

export function LoadingState({ isVisible }: LoadingStateProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <Card>
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
          <p className="text-muted-foreground">
            Analyzing your startup idea with AI...
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This may take 10-30 seconds
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ErrorState({ isVisible, error }: ErrorStateProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <Card className="border-red-200 bg-red-50/50 dark:border-red-800/30 dark:bg-red-950/20">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-950/50">
              <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
            Validation Failed
          </h3>
          <p className="text-red-700 dark:text-red-400 mb-4">{error}</p>
          <p className="text-sm text-red-600 dark:text-red-500">
            Please try again or check your input.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
