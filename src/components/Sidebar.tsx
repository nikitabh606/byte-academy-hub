
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Bookmark, 
  BookOpen, 
  Cpu, 
  FileCode, 
  Home, 
  LayoutGrid, 
  Save, 
  User
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Profile", path: "/dashboard", icon: User },
    { name: "DSA Sheets", path: "/topics", icon: BookOpen, expandable: true },
    { name: "System Design", path: "/system-design", icon: LayoutGrid },
    { name: "DSA Playlist", path: "/dsa-playlist", icon: FileCode, expandable: true },
    { name: "Core Sheets", path: "/core-sheets", icon: Cpu, expandable: true },
    { name: "Saved Notes", path: "/notes", icon: Save },
    { name: "Fullstack", path: "/fullstack", icon: Bookmark },
  ];

  return (
    <aside className="hidden sm:block w-64 bg-sidebar fixed h-screen border-r border-border overflow-y-auto pt-20 pb-4 transition-all">
      <div className="px-4 py-2">
        <nav className="space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sm font-medium"
            asChild
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>

          <Separator className="my-4" />

          {navItems.map((item) => (
            <div key={item.path}>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start text-sm font-medium mb-1",
                  location.pathname === item.path && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
                asChild
              >
                <Link to={item.path}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                  {item.expandable && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-auto h-4 w-4"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  )}
                </Link>
              </Button>
            </div>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-4 inset-x-0 px-4">
        <Button className="w-full" variant="outline">
          <span className="mr-2">✨</span> Upgrade to Plus
        </Button>
      </div>
    </aside>
  );
}
