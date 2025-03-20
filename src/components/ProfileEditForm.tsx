
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Github, Linkedin, Twitter, Globe } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ProfileEditForm({ onClose }: { onClose: () => void }) {
  const { profileData, updateProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    full_name: profileData?.full_name || "",
    username: profileData?.username || "",
    location: profileData?.location || "",
    university: profileData?.university || "",
    leetcode_username: profileData?.leetcode_username || "",
    github_url: profileData?.github_url || "",
    linkedin_url: profileData?.linkedin_url || "",
    twitter_url: profileData?.twitter_url || "",
    website_url: profileData?.website_url || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      onClose();
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <ScrollArea className="max-h-[70vh] pr-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="johndoe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="university">University/Company</Label>
          <Input
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="Stanford University"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="leetcode_username">LeetCode Username</Label>
          <Input
            id="leetcode_username"
            name="leetcode_username"
            value={formData.leetcode_username}
            onChange={handleChange}
            placeholder="leetcode_username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github_url" className="flex items-center gap-2">
            <Github className="h-4 w-4" /> GitHub URL
          </Label>
          <Input
            id="github_url"
            name="github_url"
            value={formData.github_url}
            onChange={handleChange}
            placeholder="https://github.com/username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin_url" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" /> LinkedIn URL
          </Label>
          <Input
            id="linkedin_url"
            name="linkedin_url"
            value={formData.linkedin_url}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitter_url" className="flex items-center gap-2">
            <Twitter className="h-4 w-4" /> Twitter URL
          </Label>
          <Input
            id="twitter_url"
            name="twitter_url"
            value={formData.twitter_url}
            onChange={handleChange}
            placeholder="https://twitter.com/username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website_url" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> Website URL
          </Label>
          <Input
            id="website_url"
            name="website_url"
            value={formData.website_url}
            onChange={handleChange}
            placeholder="https://your-website.com"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2 sticky bottom-0 bg-background pb-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </ScrollArea>
  );
}
