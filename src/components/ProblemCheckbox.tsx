
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface ProblemCheckboxProps {
  problemId: string;
  initialState?: boolean;
  onChange?: (checked: boolean) => void;
}

export function ProblemCheckbox({ problemId, initialState = false, onChange }: ProblemCheckboxProps) {
  const [checked, setChecked] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Fetch initial state from the database
  useEffect(() => {
    if (!isAuthenticated || !user) return;
    
    const fetchSolvedState = async () => {
      try {
        const { data, error } = await supabase
          .from("solved_problems")
          .select("*")
          .eq("user_id", user.id)
          .eq("problem_id", problemId)
          .single();
        
        if (error && error.code !== "PGRST116") { // PGRST116 is the "no rows returned" error code
          console.error("Error fetching problem state:", error);
          return;
        }
        
        setChecked(!!data);
      } catch (error) {
        console.error("Error in fetchSolvedState:", error);
      }
    };
    
    fetchSolvedState();
  }, [problemId, user, isAuthenticated]);

  const handleCheckChange = async (checked: boolean) => {
    if (!isAuthenticated || !user) {
      toast.error("You must be logged in to track solved problems");
      return;
    }
    
    setLoading(true);
    setChecked(checked);
    
    try {
      if (checked) {
        // Mark as solved
        const { error } = await supabase
          .from("solved_problems")
          .upsert({ 
            user_id: user.id, 
            problem_id: problemId,
            solved_at: new Date().toISOString()
          });
        
        if (error) throw error;
      } else {
        // Mark as unsolved
        const { error } = await supabase
          .from("solved_problems")
          .delete()
          .eq("user_id", user.id)
          .eq("problem_id", problemId);
        
        if (error) throw error;
      }
      
      // Call the onChange callback if provided
      if (onChange) {
        onChange(checked);
      }
    } catch (error: any) {
      console.error("Error updating problem state:", error);
      toast.error("Failed to update problem status");
      setChecked(!checked); // Revert the checkbox state
    } finally {
      setLoading(false);
    }
  };

  return (
    <Checkbox 
      checked={checked}
      disabled={loading || !isAuthenticated}
      onCheckedChange={handleCheckChange}
      className={`${loading ? 'opacity-50' : ''}`}
    />
  );
}
