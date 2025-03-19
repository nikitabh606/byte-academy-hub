
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProfileData {
  username?: string;
  full_name?: string;
  avatar_url?: string;
  location?: string;
  university?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  leetcode_username?: string;
}

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profileData: ProfileData | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: { username?: string, full_name?: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  updateProfile: (data: Partial<ProfileData>) => Promise<void>;
  fetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (error) throw error;
      setProfileData(data);
    } catch (error: any) {
      console.error("Error fetching profile data:", error.message);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session);
      setLoading(false);
      
      if (session?.user) {
        fetchProfile();
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session);
        setLoading(false);

        if (event === 'SIGNED_IN') {
          toast.success("Signed in successfully");
          await fetchProfile();
        } else if (event === 'SIGNED_OUT') {
          toast.info("Signed out");
          setProfileData(null);
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
          data: userData
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

  const updateProfile = async (data: Partial<ProfileData>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", user.id);
      
      if (error) throw error;
      
      toast.success("Profile updated successfully");
      await fetchProfile();
    } catch (error: any) {
      toast.error(error.message || "Error updating profile");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profileData,
        loading,
        signUp,
        signIn,
        signOut,
        isAuthenticated,
        updateProfile,
        fetchProfile,
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
