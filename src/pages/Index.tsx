
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { topics } from "@/data/topics";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-background to-secondary/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Learn Data Structures & Algorithms
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Master DSA with structured learning paths, interactive problems, and a supportive community. 
                Everything you need to ace your coding interviews.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/courses">Start Learning</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-16">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for a topic..."
                  className="pl-10 h-12 rounded-full bg-card"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTopics.map((topic, index) => (
                <CourseCard
                  key={topic.id}
                  title={topic.title}
                  description={topic.description}
                  slug={topic.slug}
                  className="animate-enter"
                  style={{ '--delay': index } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Byte Academy?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Structured Curriculum</h3>
                <p className="text-muted-foreground">Learn DSA through a carefully designed curriculum that takes you from basics to advanced topics.</p>
              </div>
              
              <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Practice Problems</h3>
                <p className="text-muted-foreground">Hundreds of curated problems from platforms like LeetCode, GeeksforGeeks, and Codeforces.</p>
              </div>
              
              <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
                <p className="text-muted-foreground">Monitor your learning journey with our intuitive dashboard that shows your progress across topics.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-brand-600 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to master DSA?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers who have improved their skills with Byte Academy.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/topics">Explore Topics</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="font-semibold text-lg">Byte Academy</span>
              </Link>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Byte Academy. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
