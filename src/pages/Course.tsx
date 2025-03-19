
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { CourseProgress } from "@/components/CourseProgress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp, ExternalLink, Info } from "lucide-react";
import { dsaCourse } from "@/data/courses";

const Course = () => {
  const [showHighlights, setShowHighlights] = useState(true);
  const [showNote, setShowNote] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 flex">
        <Sidebar />
        <main className="flex-1 sm:ml-64 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{dsaCourse.title}</h1>
            <p className="text-muted-foreground mb-6">{dsaCourse.description}</p>
            
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
            
            {/* Progress Bar */}
            <div className="border rounded-lg p-4 mb-8 bg-card">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm">Your Progress: {dsaCourse.completed}/{dsaCourse.totalProblems}</div>
                <div className="font-medium text-brand-600 dark:text-brand-400">{Math.round((dsaCourse.completed! / dsaCourse.totalProblems) * 100)}% complete</div>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-500 rounded-full"
                  style={{ width: `${(dsaCourse.completed! / dsaCourse.totalProblems) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Key Highlights Section */}
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
            
            {/* Notes Section */}
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
            
            {/* Course Steps */}
            <div className="space-y-6">
              {dsaCourse.steps.map((step) => (
                <CourseProgress 
                  key={step.id}
                  title={step.title}
                  completed={step.completed || 0}
                  total={step.total}
                  difficulty={step.difficulty}
                />
              ))}
            </div>
            
            {/* Topic Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Problems List</h2>
              
              <div className="space-y-4">
                {dsaCourse.steps[2].problems.map((problem) => (
                  <a 
                    key={problem.id}
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border rounded-lg bg-card hover:shadow-md transition-all"
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
                      
                      <div className="flex items-center">
                        {problem.completed ? (
                          <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mr-2">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-500 dark:text-emerald-300" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 border border-muted-foreground/30 rounded-full mr-2"></div>
                        )}
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Course;
