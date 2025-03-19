
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { TopicProgress } from "@/components/TopicProgress";
import { Separator } from "@/components/ui/separator";

const systemDesignTopics = [
  {
    id: "sd1",
    title: "Fundamentals",
    description: "Basic concepts and principles of system design.",
    slug: "system-design-fundamentals",
    count: 12
  },
  {
    id: "sd2",
    title: "Scalability",
    description: "Designing systems that can handle growth.",
    slug: "scalability",
    count: 8
  },
  {
    id: "sd3",
    title: "Load Balancing",
    description: "Distributing network traffic across multiple servers.",
    slug: "load-balancing",
    count: 5
  },
  {
    id: "sd4",
    title: "Caching",
    description: "Strategies for implementing and using caches effectively.",
    slug: "caching",
    count: 7
  },
  {
    id: "sd5",
    title: "Database Sharding",
    description: "Techniques for horizontal partitioning of databases.",
    slug: "database-sharding",
    count: 6
  },
  {
    id: "sd6",
    title: "Microservices",
    description: "Building applications as suites of independently deployable services.",
    slug: "microservices",
    count: 9
  },
  {
    id: "sd7",
    title: "API Design",
    description: "Principles and best practices for designing APIs.",
    slug: "api-design",
    count: 7
  },
  {
    id: "sd8",
    title: "Distributed Systems",
    description: "Concepts and challenges in designing distributed systems.",
    slug: "distributed-systems",
    count: 11
  },
  {
    id: "sd9",
    title: "System Design Interview",
    description: "Practice problems and approaches for system design interviews.",
    slug: "system-design-interview",
    count: 15
  }
];

export default function SystemDesign() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main className="pt-20 pb-16 sm:pl-64">
        <div className="container px-4 md:px-8 mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">System Design</h1>
            <p className="text-muted-foreground mt-2">
              Learn how to design scalable systems and architecture for real-world applications
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
            <div className="md:col-span-2 lg:col-span-3">
              <h2 className="text-xl font-semibold mb-4">Popular Topics</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {systemDesignTopics.slice(0, 6).map((topic) => (
                  <CourseCard
                    key={topic.id}
                    title={topic.title}
                    description={topic.description}
                    slug={topic.slug}
                  />
                ))}
              </div>

              <Separator className="my-8" />

              <h2 className="text-xl font-semibold mb-4">All System Design Topics</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {systemDesignTopics.map((topic) => (
                  <CourseCard
                    key={topic.id}
                    title={topic.title}
                    description={topic.description}
                    slug={topic.slug}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
              <div className="space-y-3">
                {systemDesignTopics
                  .filter(topic => topic.count)
                  .slice(0, 5)
                  .map((topic) => (
                    <TopicProgress
                      key={topic.id}
                      topic={topic.title}
                      count={topic.count || 0}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
