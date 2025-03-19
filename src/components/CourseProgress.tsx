
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  title: string;
  completed: number;
  total: number;
  difficulty?: "easy" | "medium" | "hard";
}

export function CourseProgress({ 
  title, 
  completed, 
  total, 
  difficulty = "easy" 
}: CourseProgressProps) {
  const [expanded, setExpanded] = useState(false);
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="border rounded-lg overflow-hidden transition-all">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{title}</h3>
            <span className="text-sm text-muted-foreground">
              {completed}/{total}
            </span>
          </div>
          <Progress 
            value={percentage} 
            className={cn(
              "h-2",
              difficulty === "easy" && "bg-emerald-200 dark:bg-emerald-950",
              difficulty === "medium" && "bg-amber-200 dark:bg-amber-950",
              difficulty === "hard" && "bg-red-200 dark:bg-red-950"
            )}
          />
        </div>
        {expanded ? (
          <ChevronUp className="ml-2 h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="ml-2 h-5 w-5 text-muted-foreground" />
        )}
      </div>
      
      {expanded && (
        <div className="p-4 pt-0 bg-card border-t">
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span>Problem 1: Two Sum</span>
              <span className="text-emerald-600 dark:text-emerald-400">Completed</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Problem 2: Valid Parentheses</span>
              <span className="text-emerald-600 dark:text-emerald-400">Completed</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Problem 3: Merge Two Sorted Lists</span>
              <span className="text-muted-foreground">Pending</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
