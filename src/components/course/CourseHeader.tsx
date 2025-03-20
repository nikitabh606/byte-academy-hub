
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface CourseHeaderProps {
  title: string;
  description: string;
}

export function CourseHeader({ title, description }: CourseHeaderProps) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button size="sm" variant="outline" className="rounded-full">
            <Info className="mr-1 h-4 w-4" />
            FAQ
          </Button>
        </div>
        
        <Button variant="outline" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1 h-4 w-4"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Show Revision
        </Button>
      </div>
    </>
  );
}
