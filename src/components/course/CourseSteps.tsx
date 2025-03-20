
import { CourseProgress } from "@/components/CourseProgress";
import { CourseStep } from "@/data/courses";

interface CourseStepsProps {
  steps: CourseStep[];
}

export function CourseSteps({ steps }: CourseStepsProps) {
  return (
    <div className="space-y-6">
      {steps.map((step) => (
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
