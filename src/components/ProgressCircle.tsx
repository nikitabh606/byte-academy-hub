
import { cn } from "@/lib/utils";

interface ProgressCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function ProgressCircle({
  value,
  size = 120,
  strokeWidth = 10,
  label
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-muted"
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            "stroke-brand-500 dark:stroke-brand-400 transition-all duration-1000 ease-in-out",
            value >= 80 && "stroke-emerald-500",
            value >= 50 && value < 80 && "stroke-brand-500",
            value < 50 && value >= 25 && "stroke-amber-500",
            value < 25 && "stroke-red-500"
          )}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        
        {/* Percentage text */}
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          className="fill-foreground text-lg font-bold"
        >
          {value}%
        </text>
      </svg>
      
      {label && (
        <div className="absolute -bottom-6 text-sm font-medium text-center w-full">
          {label}
        </div>
      )}
    </div>
  );
}
