
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Profile {
  id: string;
  username: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  created_at: string;
}

interface SolvedProblem {
  id: string;
  user_id: string;
  problem_id: string;
  solved_at: string;
}

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  profileLoading: boolean;
  signUp: (email: string, password: string, userData?: { username?: string, full_name?: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  refreshProfile: () => Promise<void>;
  problems: Problem[];
  problemsLoading: boolean;
  solvedProblems: SolvedProblem[];
  solvedProblemsLoading: boolean;
  markProblemAsSolved: (problemId: string) => Promise<void>;
  markProblemAsUnsolved: (problemId: string) => Promise<void>;
  isProblemSolved: (problemId: string) => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [problemsLoading, setProblemsLoading] = useState(true);
  const [solvedProblems, setSolvedProblems] = useState<SolvedProblem[]>([]);
  const [solvedProblemsLoading, setSolvedProblemsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile
  const fetchProfile = async (userId: string) => {
    setProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
    } finally {
      setProfileLoading(false);
    }
  };

  // Fetch problems
  const fetchProblems = async () => {
    setProblemsLoading(true);
    try {
      const { data, error } = await supabase
        .from('problems')
        .select('*')
        .order('difficulty', { ascending: true });
      
      if (error) throw error;
      setProblems(data || []);
    } catch (error: any) {
      console.error('Error fetching problems:', error.message);
    } finally {
      setProblemsLoading(false);
    }
  };

  // Fetch solved problems
  const fetchSolvedProblems = async (userId: string) => {
    setSolvedProblemsLoading(true);
    try {
      const { data, error } = await supabase
        .from('solved_problems')
        .select('*')
        .eq('user_id', userId);
      
      if (error) throw error;
      setSolvedProblems(data || []);
    } catch (error: any) {
      console.error('Error fetching solved problems:', error.message);
    } finally {
      setSolvedProblemsLoading(false);
    }
  };

  // Refresh profile
  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
      await fetchSolvedProblems(user.id);
    }
  };

  // Mark problem as solved
  const markProblemAsSolved = async (problemId: string) => {
    if (!user) {
      toast.error("You must be logged in to track progress");
      return;
    }

    try {
      // Check if already solved
      if (isProblemSolved(problemId)) {
        return;
      }

      const { error } = await supabase
        .from('solved_problems')
        .insert({ 
          user_id: user.id, 
          problem_id: problemId 
        });
      
      if (error) throw error;

      // Refresh the solved problems list
      await fetchSolvedProblems(user.id);
      toast.success("Problem marked as solved!");
    } catch (error: any) {
      console.error('Error marking problem as solved:', error.message);
      toast.error(`Failed to mark problem as solved: ${error.message}`);
    }
  };

  // Mark problem as unsolved
  const markProblemAsUnsolved = async (problemId: string) => {
    if (!user) {
      toast.error("You must be logged in to track progress");
      return;
    }

    try {
      const solvedProblemRecord = solvedProblems.find(
        (sp) => sp.problem_id === problemId
      );

      if (!solvedProblemRecord) {
        return;
      }

      const { error } = await supabase
        .from('solved_problems')
        .delete()
        .eq('id', solvedProblemRecord.id);
      
      if (error) throw error;

      // Refresh the solved problems list
      await fetchSolvedProblems(user.id);
      toast.success("Problem marked as unsolved!");
    } catch (error: any) {
      console.error('Error marking problem as unsolved:', error.message);
      toast.error(`Failed to mark problem as unsolved: ${error.message}`);
    }
  };

  // Check if problem is solved
  const isProblemSolved = (problemId: string): boolean => {
    return solvedProblems.some((sp) => sp.problem_id === problemId);
  };

  useEffect(() => {
    // Fetch problems when component mounts
    fetchProblems();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session);
      setLoading(false);

      if (session?.user) {
        fetchProfile(session.user.id);
        fetchSolvedProblems(session.user.id);
      } else {
        setProfileLoading(false);
        setSolvedProblemsLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session);
        setLoading(false);

        if (session?.user) {
          await fetchProfile(session.user.id);
          await fetchSolvedProblems(session.user.id);
        } else {
          setProfileLoading(false);
          setSolvedProblemsLoading(false);
        }

        if (event === 'SIGNED_IN') {
          toast.success("Signed in successfully");
        } else if (event === 'SIGNED_OUT') {
          toast.info("Signed out");
          setProfile(null);
          setSolvedProblems([]);
        } else if (event === 'USER_UPDATED') {
          toast.success("Profile updated successfully");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signUp = async (
    email: string, 
    password: string, 
    userData?: { username?: string, full_name?: string }
  ) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: window.location.origin + '/dashboard'
        }
      });

      if (error) throw error;
      toast.success("Sign up successful! Please check your email to verify your account.");
    } catch (error: any) {
      toast.error(error.message || "Error during sign up");
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Error signing in");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
    } catch (error: any) {
      toast.error(error.message || "Error signing out");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        profileLoading,
        signUp,
        signIn,
        signOut,
        isAuthenticated,
        refreshProfile,
        problems,
        problemsLoading,
        solvedProblems,
        solvedProblemsLoading,
        markProblemAsSolved,
        markProblemAsUnsolved,
        isProblemSolved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
