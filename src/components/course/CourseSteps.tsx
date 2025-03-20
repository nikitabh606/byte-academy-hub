
import { CourseProgress } from "@/components/CourseProgress";
import { CourseStep } from "@/data/courses";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

interface CourseStepsProps {
  steps: CourseStep[];
}

export function CourseSteps({ steps }: CourseStepsProps) {
  const [updatedSteps, setUpdatedSteps] = useState<CourseStep[]>(steps);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    
    const fetchSolvedProblems = async () => {
      try {
        const { data } = await supabase
          .from("solved_problems")
          .select("problem_id")
          .eq("user_id", user.id);
        
        if (!data) return;
        
        // Create a set of solved problem IDs for quick lookup
        const solvedProblemIds = new Set(data.map(item => item.problem_id));
        
        // Update the steps with completed information
        const stepsWithCompletion = steps.map(step => {
          // Count how many problems in this step are solved
          const completedProblems = step.problems.filter(problem => 
            solvedProblemIds.has(problem.id)
          ).length;
          
          return {
            ...step,
            completed: completedProblems,
            problems: step.problems.map(problem => ({
              ...problem,
              completed: solvedProblemIds.has(problem.id)
            }))
          };
        });
        
        setUpdatedSteps(stepsWithCompletion);
      } catch (error) {
        console.error("Error fetching solved problems:", error);
      }
    };
    
    fetchSolvedProblems();
  }, [steps, user, isAuthenticated]);

  return (
    <div className="space-y-6">
      {updatedSteps.map((step) => (
        <CourseProgress 
          key={step.id}
          title={step.title}
          completed={step.completed || 0}
          total={step.total}
          difficulty={step.difficulty}
        />
      ))}
    </div>
  );
}
