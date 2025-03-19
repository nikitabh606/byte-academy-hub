
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { ProfileDetails } from "@/components/ProfileDetails";
import { ProblemsList } from "@/components/ProblemsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, User, ListChecks } from "lucide-react";

const Dashboard = () => {
  const { loading, profile, problems } = useAuth();

  // Calculate stats
  const solvedCount = problems.filter(p => profile && profile.id && 
    problems.some(sp => sp.id === p.id)).length;
  
  const totalProblems = problems.length;
  const progress = totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 flex">
        <Sidebar />
        <main className="flex-1 sm:ml-64 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-card rounded-xl p-6 border flex items-center">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Username</p>
                  {loading ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <p className="font-medium">{profile?.username || "Not set"}</p>
                  )}
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-6 border flex items-center">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <ListChecks className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Problems Solved</p>
                  {loading ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <p className="font-medium">{solvedCount} / {totalProblems}</p>
                  )}
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-6 border">
                <p className="text-sm text-muted-foreground mb-2">Progress</p>
                {loading ? (
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : (
                  <>
                    <div className="h-2 bg-muted rounded-full mb-2">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground text-right">{progress.toFixed(1)}%</p>
                  </>
                )}
              </div>
            </div>
            
            <Tabs defaultValue="problems" className="space-y-4">
              <TabsList>
                <TabsTrigger value="problems">Problems</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>
              
              <TabsContent value="problems" className="space-y-4">
                <ProblemsList />
              </TabsContent>
              
              <TabsContent value="profile">
                <ProfileDetails />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
