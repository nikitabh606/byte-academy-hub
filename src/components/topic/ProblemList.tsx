
import { ExternalLink } from "lucide-react";
import { ProblemCheckbox } from "@/components/ProblemCheckbox";

interface Problem {
  id: string;
  title: string;
  difficulty: string;
  platform: string;
  link: string;
  completed?: boolean;
}

interface ProblemListProps {
  problems: Problem[];
}

export function ProblemList({ problems }: ProblemListProps) {
  if (problems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">No problems available yet</h3>
        <p className="text-muted-foreground">We're working on adding practice problems for this topic.</p>
      </div>
    );
  }

  return (
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
              className="block"
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
  );
}
