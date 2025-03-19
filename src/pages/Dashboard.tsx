
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ProgressCircle } from "@/components/ProgressCircle";
import { TopicProgress } from "@/components/TopicProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { topics } from "@/data/topics";
import { Edit, Github, Globe, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  
  const userTopics = [
    { topic: "Arrays", count: 73 },
    { topic: "Graph", count: 19 },
    { topic: "Binary Search", count: 18 },
    { topic: "Binary Tree", count: 15 },
    { topic: "Dynamic Programming", count: 13 },
    { topic: "Hashing", count: 12 },
    { topic: "Recursion", count: 12 },
    { topic: "Linked List", count: 10 },
    { topic: "Binary Search Tree", count: 7 },
    { topic: "Greedy", count: 6 },
    { topic: "Stack", count: 6 },
    { topic: "Sorting", count: 5 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 flex">
        <Sidebar />
        <main className="flex-1 sm:ml-64 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Information */}
              <div className="lg:col-span-1">
                <div className="border rounded-xl p-6 bg-card relative">
                  <button className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors">
                    <Edit className="h-4 w-4 text-muted-foreground" />
                  </button>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-muted-foreground/20 mb-4 overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold">John Doe</h2>
                    <p className="text-sm text-muted-foreground mb-4">#johndoe</p>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="relative inline-block">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          id="privateProfile"
                        />
                        <label 
                          htmlFor="privateProfile" 
                          className="block w-10 h-5 rounded-full bg-muted cursor-pointer peer-checked:bg-brand-500 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"
                        ></label>
                      </div>
                      <span className="text-sm">Private</span>
                    </div>
                    
                    <div className="flex space-x-4 mb-6">
                      <a href="#" className="p-2 rounded-full border hover:bg-muted transition-colors">
                        <Github className="h-5 w-5" />
                      </a>
                      <a href="#" className="p-2 rounded-full border hover:bg-muted transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a href="#" className="p-2 rounded-full border hover:bg-muted transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href="#" className="p-2 rounded-full border hover:bg-muted transition-colors">
                        <Globe className="h-5 w-5" />
                      </a>
                    </div>
                    
                    <Separator className="mb-4" />
                    
                    <div className="w-full space-y-4">
                      <div className="flex items-start space-x-3">
                        <svg viewBox="0 0 24 24" fill="none" className="flex-shrink-0 w-5 h-5 mt-0.5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm overflow-hidden text-ellipsis">johndoe@example.com</span>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <svg viewBox="0 0 24 24" fill="none" className="flex-shrink-0 w-5 h-5 mt-0.5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.6569 16.6569C16.7202 17.5935 15.4616 18.1716 14.1229 18.2803C12.7843 18.389 11.4522 18.0117 10.3744 17.2197C9.29661 16.4276 8.54781 15.2754 8.27549 13.9787C8.00318 12.6819 8.22348 11.3252 8.8948 10.1802C9.56613 9.03515 10.6456 8.18024 11.906 7.77604C13.1664 7.37184 14.5299 7.44218 15.7451 7.97518C16.9603 8.50818 17.9539 9.46937 18.5484 10.684C19.1429 11.8985 19.2987 13.2906 18.9878 14.6177" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm">Joined 3 months ago</span>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <svg viewBox="0 0 24 24" fill="none" className="flex-shrink-0 w-5 h-5 mt-0.5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 11.5C13.1046 11.5 14 10.6046 14 9.5C14 8.39543 13.1046 7.5 12 7.5C10.8954 7.5 10 8.39543 10 9.5C10 10.6046 10.8954 11.5 12 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 20L18 14C19.3333 12.6667 19.3333 10.3333 18 9L17 8C15.6667 6.66667 13.3333 6.66667 12 8L6 14C4.66667 15.3333 4.66667 17.6667 6 19L7 20C8.33333 21.3333 10.6667 21.3333 12 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm">San Francisco, CA</span>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <svg viewBox="0 0 24 24" fill="none" className="flex-shrink-0 w-5 h-5 mt-0.5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm">Stanford University</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* LeetCode Integration */}
                <div className="border rounded-xl p-6 bg-card mt-6">
                  <h3 className="text-lg font-medium mb-4">LeetCode Data</h3>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Your LeetCode Username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button className="w-full">Submit</Button>
                  </div>
                </div>
              </div>
              
              {/* Progress & Stats */}
              <div className="lg:col-span-2 space-y-6">
                <div className="border rounded-xl p-6 bg-card">
                  <h3 className="text-lg font-medium mb-6">Progress</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center">
                      <ProgressCircle value={29} label="A2Z DSA" />
                    </div>
                    <div className="flex flex-col items-center">
                      <ProgressCircle value={6} label="SDE Sheet" />
                    </div>
                    <div className="flex flex-col items-center">
                      <ProgressCircle value={19} label="Top 79" />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-xl p-6 bg-card">
                  <h3 className="text-lg font-medium mb-6">Topics Covered</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                    {userTopics.map((item, index) => (
                      <TopicProgress 
                        key={index} 
                        topic={item.topic} 
                        count={item.count} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-xl p-6 bg-card">
                  <h3 className="text-lg font-medium mb-6">Recent Activity</h3>
                  
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Completed: Two Sum</div>
                        <div className="text-sm text-muted-foreground">2 days ago</div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Arrays - LeetCode</div>
                    </div>
                    
                    <div className="p-3 border rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Completed: Binary Search</div>
                        <div className="text-sm text-muted-foreground">3 days ago</div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Binary Search - LeetCode</div>
                    </div>
                    
                    <div className="p-3 border rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Completed: Merge Two Sorted Lists</div>
                        <div className="text-sm text-muted-foreground mt-1">5 days ago</div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">Linked List - LeetCode</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
