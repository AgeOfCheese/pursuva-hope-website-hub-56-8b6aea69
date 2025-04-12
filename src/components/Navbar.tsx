
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white shadow-sm py-2" : "bg-transparent py-4"
    )}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img 
            src="/lovable-uploads/802db8de-7a0a-4d81-887c-b28d6e701edb.png" 
            alt="Pursuva Logo" 
            className="h-9 w-auto"
          />
          <span className={cn(
            "ml-2 text-xl font-semibold transition-colors",
            isScrolled ? "text-gray-800" : "text-gray-800"
          )}>
            Pursuva
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#about" className={cn(
            "transition-colors hover:text-pursuva-blue font-medium",
            "text-gray-700"
          )}>
            About
          </a>
          <a href="#programs" className={cn(
            "transition-colors hover:text-pursuva-blue font-medium",
            "text-gray-700"
          )}>
            Courses
          </a>
          <a href="#impact" className={cn(
            "transition-colors hover:text-pursuva-blue font-medium",
            "text-gray-700"
          )}>
            Approach
          </a>
          <a href="#team" className={cn(
            "transition-colors hover:text-pursuva-blue font-medium",
            "text-gray-700"
          )}>
            Team
          </a>
          <a href="#contact" className={cn(
            "transition-colors hover:text-pursuva-blue font-medium",
            "text-gray-700"
          )}>
            Contact
          </a>
          <Button className="bg-pursuva-blue hover:bg-pursuva-blue/90 text-white">
            <Link to="/enroll">Enroll Now</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          className="md:hidden" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="text-gray-800" />
          ) : (
            <Menu className="text-gray-800" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container px-4 mx-auto py-4">
            <nav className="flex flex-col space-y-3">
              <a href="#about" className="text-gray-700 hover:text-pursuva-blue transition-colors" onClick={toggleMobileMenu}>
                About
              </a>
              <a href="#programs" className="text-gray-700 hover:text-pursuva-blue transition-colors" onClick={toggleMobileMenu}>
                Courses
              </a>
              <a href="#impact" className="text-gray-700 hover:text-pursuva-blue transition-colors" onClick={toggleMobileMenu}>
                Approach
              </a>
              <a href="#team" className="text-gray-700 hover:text-pursuva-blue transition-colors" onClick={toggleMobileMenu}>
                Team
              </a>
              <a href="#contact" className="text-gray-700 hover:text-pursuva-blue transition-colors" onClick={toggleMobileMenu}>
                Contact
              </a>
              <Button className="bg-pursuva-blue hover:bg-pursuva-blue/90 text-white w-full">
                <Link to="/enroll">Enroll Now</Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
