
import { Problem } from "@/data/courses";
import { ProblemCheckbox } from "@/components/ProblemCheckbox";
import { ExternalLink } from "lucide-react";

interface ProblemsListProps {
  problems: Problem[];
}

export function ProblemsList({ problems }: ProblemsListProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Problems List</h2>
      
      <div className="space-y-4">
        {problems.map((problem) => (
          <div 
            key={problem.id}
            className="flex p-4 border rounded-lg bg-card hover:shadow-md transition-all"
          >
            <div className="flex-grow">
              <a 
                href={problem.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{problem.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        problem.difficulty === "easy" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" :
                        problem.difficulty === "medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" : 
                        "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                      }`}>
                        {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground ml-3">
                        {problem.platform === "leetcode" ? "LeetCode" : 
                         problem.platform === "geeksforgeeks" ? "GeeksforGeeks" : 
                         "CodeForces"}
                      </span>
                    </div>
                  </div>
                  
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              </a>
            </div>
            <div className="flex items-center ml-4">
              <ProblemCheckbox 
                problemId={problem.id} 
                initialState={problem.completed || false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
