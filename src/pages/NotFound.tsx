
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      window.location.pathname
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
            B
          </div>
          <h1 className="text-5xl font-bold mb-2">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Page not found</p>
          <p className="text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/topics">Explore Topics</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
