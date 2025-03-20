
interface CourseProgressBarProps {
  completed: number;
  total: number;
}

export function CourseProgressBar({ completed, total }: CourseProgressBarProps) {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="border rounded-lg p-4 mb-8 bg-card">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm">Your Progress: {completed}/{total}</div>
        <div className="font-medium text-brand-600 dark:text-brand-400">{percentage}% complete</div>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-brand-500 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
