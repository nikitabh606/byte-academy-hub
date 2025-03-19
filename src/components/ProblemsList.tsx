
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const colorMap = {
    easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    hard: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
  };

  return (
    <Badge className={colorMap[difficulty as keyof typeof colorMap]}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </Badge>
  );
};

export function ProblemsList() {
  const { 
    problems, 
    problemsLoading, 
    isProblemSolved, 
    markProblemAsSolved, 
    markProblemAsUnsolved,
    solvedProblemsLoading,
    isAuthenticated
  } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Extract unique categories
  const categories = [...new Set(problems.map(problem => problem.category))];

  // Filter problems by category if one is selected
  const filteredProblems = activeCategory 
    ? problems.filter(problem => problem.category === activeCategory)
    : problems;

  if (problemsLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          onClick={() => setActiveCategory(null)}
          className="text-sm"
        >
          All
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => setActiveCategory(category)}
            className="text-sm"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProblems.map(problem => (
          <Card key={problem.id} className="h-full flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{problem.title}</CardTitle>
                <DifficultyBadge difficulty={problem.difficulty} />
              </div>
              <CardDescription>{problem.category}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{problem.description}</p>
            </CardContent>
            <CardFooter className="pt-2 border-t">
              {!isAuthenticated ? (
                <p className="text-xs text-muted-foreground italic">Sign in to track your progress</p>
              ) : solvedProblemsLoading ? (
                <Button disabled variant="outline" className="w-full">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Loading...
                </Button>
              ) : isProblemSolved(problem.id) ? (
                <Button 
                  variant="outline" 
                  className="w-full text-emerald-600 border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300"
                  onClick={() => markProblemAsUnsolved(problem.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" /> Solved
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => markProblemAsSolved(problem.id)}
                >
                  <XCircle className="h-4 w-4 mr-2" /> Mark as Solved
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
