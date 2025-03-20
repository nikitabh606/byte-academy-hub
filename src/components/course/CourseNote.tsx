
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function CourseNote() {
  const [showNote, setShowNote] = useState(false);
  
  return (
    <div className="border rounded-lg overflow-hidden mb-8">
      <div 
        className="p-4 bg-card flex items-center justify-between cursor-pointer"
        onClick={() => setShowNote(!showNote)}
      >
        <h2 className="text-lg font-semibold">Note</h2>
        {showNote ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      
      {showNote && (
        <div className="p-4 bg-muted/30">
          <p className="text-sm">
            This course follows a step-by-step approach to learning DSA. It's recommended to complete each step sequentially for the best results. 
            The problems are carefully chosen to build your understanding gradually.
          </p>
        </div>
      )}
    </div>
  );
}
