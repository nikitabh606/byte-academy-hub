
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { CourseCard } from "@/components/CourseCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { topics } from "@/data/topics";

const Topics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 flex">
        <Sidebar />
        <main className="flex-1 sm:ml-64 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Data Structures & Algorithms</h1>
            
            {/* Search */}
            <div className="mb-8 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search topics..."
                  className="pl-10 h-12"
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
                  style={{ '--delay': index % 9 } as React.CSSProperties}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Topics;
