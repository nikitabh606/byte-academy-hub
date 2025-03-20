
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { topics } from "@/data/topics";
import { topicProblems } from "@/data/courses";
import { TopicLoading } from "@/components/topic/TopicLoading";
import { TopicNotFound } from "@/components/topic/TopicNotFound";
import { ProblemList } from "@/components/topic/ProblemList";
import { TheorySection } from "@/components/topic/TheorySection";
import { ResourcesSection } from "@/components/topic/ResourcesSection";

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
    return <TopicLoading />;
  }
  
  if (!topic) {
    return <TopicNotFound />;
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
              
              <TabsContent value="problems">
                <ProblemList problems={problems} />
              </TabsContent>
              
              <TabsContent value="theory">
                <TheorySection topicTitle={topic.title} />
              </TabsContent>
              
              <TabsContent value="resources">
                <ResourcesSection />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TopicDetail;
