
import { cn } from "@/lib/utils";

interface TopicProgressProps {
  topic: string;
  count: number;
}

export function TopicProgress({ topic, count }: TopicProgressProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-card rounded-lg border transition-all hover:shadow-md">
      <span className="font-medium">{topic}</span>
      <div className="flex items-center gap-2">
        <span className={cn(
          "text-sm px-2 py-0.5 rounded",
          count > 50 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" :
          count > 20 ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" :
          "bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300"
        )}>
          x{count}
        </span>
      </div>
    </div>
  );
}
