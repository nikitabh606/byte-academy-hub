
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { TopicProgress } from "@/components/TopicProgress";
import { Separator } from "@/components/ui/separator";

const fullstackTopics = [
  {
    id: "fs1",
    title: "Frontend Basics",
    description: "HTML, CSS, and JavaScript fundamentals for building user interfaces.",
    slug: "frontend-basics",
    count: 25
  },
  {
    id: "fs2",
    title: "React",
    description: "Component-based UI library for building interactive web applications.",
    slug: "react",
    count: 32
  },
  {
    id: "fs3",
    title: "Node.js",
    description: "JavaScript runtime for building server-side applications.",
    slug: "nodejs",
    count: 18
  },
  {
    id: "fs4",
    title: "Express.js",
    description: "Web application framework for Node.js.",
    slug: "expressjs",
    count: 15
  },
  {
    id: "fs5",
    title: "MongoDB",
    description: "NoSQL database for modern applications.",
    slug: "mongodb",
    count: 12
  },
  {
    id: "fs6",
    title: "Authentication",
    description: "Implementing user authentication and authorization.",
    slug: "authentication",
    count: 8
  },
  {
    id: "fs7",
    title: "RESTful APIs",
    description: "Design and implementation of REST APIs.",
    slug: "restful-apis",
    count: 14
  },
  {
    id: "fs8",
    title: "GraphQL",
    description: "Query language and runtime for your API.",
    slug: "graphql",
    count: 11
  },
  {
    id: "fs9",
    title: "TypeScript",
    description: "Typed superset of JavaScript for robust applications.",
    slug: "typescript",
    count: 20
  },
  {
    id: "fs10",
    title: "Testing",
    description: "Techniques and tools for testing web applications.",
    slug: "testing",
    count: 16
  },
  {
    id: "fs11",
    title: "Deployment",
    description: "Strategies for deploying web applications.",
    slug: "deployment",
    count: 9
  },
  {
    id: "fs12",
    title: "CI/CD",
    description: "Continuous integration and deployment pipelines.",
    slug: "ci-cd",
    count: 7
  }
];

export default function Fullstack() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main className="pt-20 pb-16 sm:pl-64">
        <div className="container px-4 md:px-8 mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Fullstack Development</h1>
            <p className="text-muted-foreground mt-2">
              Master both frontend and backend development to build complete web applications
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
            <div className="md:col-span-2 lg:col-span-3">
              <h2 className="text-xl font-semibold mb-4">Frontend Topics</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {fullstackTopics.slice(0, 3).map((topic) => (
                  <CourseCard
                    key={topic.id}
                    title={topic.title}
                    description={topic.description}
                    slug={topic.slug}
                  />
                ))}
              </div>

              <Separator className="my-8" />

              <h2 className="text-xl font-semibold mb-4">Backend Topics</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {fullstackTopics.slice(3, 6).map((topic) => (
                  <CourseCard
                    key={topic.id}
                    title={topic.title}
                    description={topic.description}
                    slug={topic.slug}
                  />
                ))}
              </div>

              <Separator className="my-8" />

              <h2 className="text-xl font-semibold mb-4">All Fullstack Topics</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {fullstackTopics.map((topic) => (
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
                {fullstackTopics
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
