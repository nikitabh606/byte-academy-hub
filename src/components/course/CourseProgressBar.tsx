
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressBarProps {
  completed: number;
  total: number;
}

export function CourseProgressBar({ completed, total }: CourseProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="border rounded-lg p-4 mb-8 bg-card">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm">Your Progress: {completed}/{total}</div>
        <div className="font-medium text-brand-600 dark:text-brand-400">{percentage}% complete</div>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-300",
            percentage >= 80 ? "bg-emerald-500" : 
            percentage >= 50 ? "bg-brand-500" : 
            percentage >= 25 ? "bg-amber-500" : "bg-red-500"
          )}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
