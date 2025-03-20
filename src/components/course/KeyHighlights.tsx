
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function KeyHighlights() {
  const [showHighlights, setShowHighlights] = useState(true);
  
  return (
    <div className="border rounded-lg overflow-hidden mb-8">
      <div 
        className="p-4 bg-card flex items-center justify-between cursor-pointer"
        onClick={() => setShowHighlights(!showHighlights)}
      >
        <h2 className="text-lg font-semibold">Key Highlights</h2>
        {showHighlights ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      
      {showHighlights && (
        <div className="p-4 bg-muted/30">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-brand-500 mr-2">•</span>
              <span>Covers all important Data Structures and Algorithms</span>
            </li>
            <li className="flex items-start">
              <span className="text-brand-500 mr-2">•</span>
              <span>Structured learning path from basic to advanced topics</span>
            </li>
            <li className="flex items-start">
              <span className="text-brand-500 mr-2">•</span>
              <span>Curated interview questions from top companies</span>
            </li>
            <li className="flex items-start">
              <span className="text-brand-500 mr-2">•</span>
              <span>Progress tracking to monitor your learning journey</span>
            </li>
            <li className="flex items-start">
              <span className="text-brand-500 mr-2">•</span>
              <span>Access to high-quality video tutorials and explanations</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
