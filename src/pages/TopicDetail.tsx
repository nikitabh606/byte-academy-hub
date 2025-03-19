
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import { topics } from "@/data/topics";
import { topicProblems } from "@/data/courses";

const TopicDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [topic, setTopic] = useState<any>(null);
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (slug) {
      const currentTopic = topics.find(t => t.slug === slug);
      const topicProblemsList = topicProblems[slug as string] || [];
      
      setTopic(currentTopic);
      setProblems(topicProblemsList);
      setLoading(false);
    }
  }, [slug]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 pt-20 flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
  if (!topic) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 pt-20 flex">
          <Sidebar />
          <main className="flex-1 sm:ml-64 p-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-6">Topic Not Found</h1>
              <p className="text-muted-foreground mb-8">The topic you are looking for does not exist or has been removed.</p>
              <Button asChild>
                <Link to="/topics">Back to Topics</Link>
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 flex">
        <Sidebar />
        <main className="flex-1 sm:ml-64 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
              <p className="text-muted-foreground">{topic.description}</p>
            </div>
            
            <Tabs defaultValue="problems" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="problems">Practice Problems</TabsTrigger>
                <TabsTrigger value="theory">Theory & Concepts</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="problems" className="space-y-4">
                {problems.length > 0 ? (
                  problems.map((problem) => (
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
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">No problems available yet</h3>
                    <p className="text-muted-foreground">We're working on adding practice problems for this topic.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="theory" className="space-y-6">
                <div className="p-6 border rounded-lg bg-card">
                  <h2 className="text-xl font-semibold mb-4">Introduction to {topic.title}</h2>
                  <p className="mb-4">
                    {topic.title} are a fundamental concept in computer science and programming. They are used to store collections of data, and are an important part of most programming languages and algorithms.
                  </p>
                  
                  <h3 className="text-lg font-medium mb-2">Key Concepts</h3>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Basic operations and their time complexities</li>
                    <li>Common patterns and techniques</li>
                    <li>Optimizing solutions using {topic.title.toLowerCase()}</li>
                    <li>Real-world applications and use cases</li>
                  </ul>
                  
                  <h3 className="text-lg font-medium mb-2">Why Master {topic.title}?</h3>
                  <p>
                    Understanding {topic.title.toLowerCase()} is crucial for solving a wide range of problems efficiently. Strong knowledge in this area will significantly improve your problem-solving skills and prepare you for coding interviews.
                  </p>
                </div>
                
                <div className="p-6 border rounded-lg bg-card">
                  <h2 className="text-xl font-semibold mb-4">Learning Path</h2>
                  <ol className="list-decimal pl-6 space-y-4">
                    <li>
                      <h3 className="font-medium">Basics and Fundamentals</h3>
                      <p className="text-sm text-muted-foreground">Start with the core concepts and basic operations</p>
                    </li>
                    <li>
                      <h3 className="font-medium">Common Techniques</h3>
                      <p className="text-sm text-muted-foreground">Learn standard algorithms and approaches</p>
                    </li>
                    <li>
                      <h3 className="font-medium">Advanced Problems</h3>
                      <p className="text-sm text-muted-foreground">Practice with complex scenarios and optimizations</p>
                    </li>
                    <li>
                      <h3 className="font-medium">Interview Preparation</h3>
                      <p className="text-sm text-muted-foreground">Focus on common interview questions and patterns</p>
                    </li>
                  </ol>
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="space-y-6">
                <div className="p-6 border rounded-lg bg-card">
                  <h2 className="text-xl font-semibold mb-4">Recommended Resources</h2>
                  
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md hover:bg-muted/30 transition-colors">
                      <a 
                        href="https://www.geeksforgeeks.org/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-medium">GeeksforGeeks</h3>
                          <p className="text-sm text-muted-foreground">Comprehensive tutorials and practice problems</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    </div>
                    
                    <div className="p-3 border rounded-md hover:bg-muted/30 transition-colors">
                      <a 
                        href="https://leetcode.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-medium">LeetCode</h3>
                          <p className="text-sm text-muted-foreground">Platform for practicing coding interviews</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    </div>
                    
                    <div className="p-3 border rounded-md hover:bg-muted/30 transition-colors">
                      <a 
                        href="https://www.youtube.com/c/takeUforward" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-medium">takeUforward (YouTube)</h3>
                          <p className="text-sm text-muted-foreground">Video explanations and tutorials</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    </div>
                    
                    <div className="p-3 border rounded-md hover:bg-muted/30 transition-colors">
                      <a 
                        href="https://www.hackerrank.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-medium">HackerRank</h3>
                          <p className="text-sm text-muted-foreground">Practice challenges and competitions</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    </div>
                    
                    <div className="p-3 border rounded-md hover:bg-muted/30 transition-colors">
                      <a 
                        href="https://codeforces.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-medium">Codeforces</h3>
                          <p className="text-sm text-muted-foreground">Competitive programming and contests</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border rounded-lg bg-card">
                  <h2 className="text-xl font-semibold mb-4">Books & Courses</h2>
                  
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md hover:bg-muted/30 transition-colors">
                      <div>
                        <h3 className="font-medium">"Cracking the Coding Interview" by Gayle Laakmann McDowell</h3>
                        <p className="text-sm text-muted-foreground">Comprehensive guide for technical interviews</p>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md hover:bg-muted/30 transition-colors">
                      <div>
                        <h3 className="font-medium">"Introduction to Algorithms" by CLRS</h3>
                        <p className="text-sm text-muted-foreground">Classic textbook on algorithms and data structures</p>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md hover:bg-muted/30 transition-colors">
                      <div>
                        <h3 className="font-medium">MIT OpenCourseWare - Introduction to Algorithms</h3>
                        <p className="text-sm text-muted-foreground">Free online course covering algorithm fundamentals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TopicDetail;
