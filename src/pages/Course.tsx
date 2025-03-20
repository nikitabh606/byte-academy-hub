
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { CourseHeader } from "@/components/course/CourseHeader";
import { CourseProgressBar } from "@/components/course/CourseProgressBar";
import { KeyHighlights } from "@/components/course/KeyHighlights";
import { CourseNote } from "@/components/course/CourseNote";
import { CourseSteps } from "@/components/course/CourseSteps";
import { ProblemsList } from "@/components/course/ProblemsList";
import { dsaCourse } from "@/data/courses";

const Course = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 flex">
        <Sidebar />
        <main className="flex-1 sm:ml-64 p-6">
          <div className="max-w-4xl mx-auto">
            <CourseHeader 
              title={dsaCourse.title} 
              description={dsaCourse.description} 
            />
            
            <CourseProgressBar 
              completed={dsaCourse.completed || 0} 
              total={dsaCourse.totalProblems} 
            />
            
            <KeyHighlights />
            
            <CourseNote />
            
            <CourseSteps steps={dsaCourse.steps} />
            
            <ProblemsList problems={dsaCourse.steps[2].problems} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Course;
