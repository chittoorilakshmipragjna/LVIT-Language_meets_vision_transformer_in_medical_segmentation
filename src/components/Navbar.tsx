import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Moon, Sun, Activity } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export const Navbar = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isLandingPage = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-glow-intense bg-clip-text text-transparent">
              MedAI Scan
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {isLandingPage ? (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="hover:text-primary">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="shadow-glow">Get Started</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" className="hover:text-primary">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/history">
                  <Button variant="ghost" className="hover:text-primary">
                    History
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" className="hover:text-primary">
                    Profile
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="ghost" className="hover:text-primary">
                    Contact
                  </Button>
                </Link>
              </>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:text-primary"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
