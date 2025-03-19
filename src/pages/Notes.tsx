
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Edit, Search, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Sample notes data
const savedNotes = [
  {
    id: "n1",
    title: "Binary Search Implementation",
    content: "Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one.",
    topic: "Binary Search",
    date: "2023-06-15",
    tags: ["algorithm", "searching", "divide-and-conquer"]
  },
  {
    id: "n2",
    title: "Quick Sort vs Merge Sort",
    content: "Quick Sort has an average-case time complexity of O(n log n), but can degrade to O(n²) in the worst case. Merge Sort consistently performs at O(n log n) but requires additional space. Quick Sort is often faster in practice due to better cache locality.",
    topic: "Sorting",
    date: "2023-07-02",
    tags: ["algorithm", "sorting", "comparison"]
  },
  {
    id: "n3",
    title: "Dynamic Programming Approach to Fibonacci",
    content: "Using memoization or tabulation to calculate Fibonacci numbers reduces time complexity from O(2^n) to O(n), by storing previously computed results to avoid redundant calculations.",
    topic: "Dynamic Programming",
    date: "2023-07-18",
    tags: ["algorithm", "dp", "optimization"]
  },
  {
    id: "n4",
    title: "Graph Representation: Adjacency List vs Matrix",
    content: "Adjacency lists are more space-efficient for sparse graphs, while adjacency matrices provide constant-time edge lookups but require O(V²) space regardless of the number of edges.",
    topic: "Graph",
    date: "2023-08-05",
    tags: ["data-structure", "graph", "representation"]
  },
  {
    id: "n5",
    title: "System Design: Load Balancer Types",
    content: "Load balancers can be hardware-based (expensive but high performance), software-based (more flexible, less costly), or DNS-based (simple but with potential propagation delays).",
    topic: "System Design",
    date: "2023-08-21",
    tags: ["system-design", "scalability", "infrastructure"]
  }
];

export default function Notes() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main className="pt-20 pb-16 sm:pl-64">
        <div className="container px-4 md:px-8 mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Saved Notes</h1>
              <p className="text-muted-foreground mt-2">
                Access and manage your personal notes and study materials
              </p>
            </div>
            <Button>
              <Edit className="mr-2 h-4 w-4" /> New Note
            </Button>
          </div>

          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search your notes..." className="pl-10" />
            </div>
            <Button variant="outline">
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedNotes.map((note) => (
              <Card key={note.id} className="transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-medium">{note.title}</CardTitle>
                    <div className="flex items-center text-xs font-medium text-muted-foreground">
                      <BookOpen className="mr-1 h-3 w-3" />
                      {note.topic}
                    </div>
                  </div>
                  <CardDescription className="text-xs">{new Date(note.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-3">{note.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex flex-wrap gap-1">
                    {note.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="inline-block bg-accent text-accent-foreground px-2 py-0.5 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {note.tags.length > 2 && (
                      <span className="inline-block bg-accent text-accent-foreground px-2 py-0.5 rounded text-xs">
                        +{note.tags.length - 2}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
