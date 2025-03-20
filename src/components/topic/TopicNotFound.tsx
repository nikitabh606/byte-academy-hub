
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export function TopicNotFound() {
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
