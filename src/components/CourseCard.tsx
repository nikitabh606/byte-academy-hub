
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface CourseCardProps {
  title: string;
  description: string;
  slug: string;
  className?: string;
  style?: CSSProperties;
}

export function CourseCard({ title, description, slug, className, style }: CourseCardProps) {
  return (
    <Link 
      to={`/topics/${slug}`}
      className={cn(
        "block group relative overflow-hidden rounded-lg border bg-card p-6 transition-all card-hover",
        className
      )}
      style={style}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-primary font-medium">View all</div>
          <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-brand-300 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
