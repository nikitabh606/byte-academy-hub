
import { ExternalLink } from "lucide-react";

export function ResourcesSection() {
  return (
    <div className="space-y-6">
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
    </div>
  );
}
