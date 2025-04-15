// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { useAuth } from '@/context/AuthContext'; // *** IMPORT useAuth hook ***
import { getAuth, signOut } from 'firebase/auth'; // *** IMPORT Firebase sign out ***
import { app } from '@/firebaseConfig'; // *** IMPORT Firebase app ***
import { toast } from '@/hooks/use-toast'; // *** IMPORT For logout feedback ***

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation after logout
  const { currentUser } = useAuth(); // *** GET current user from context ***
  // ADD A CONSOLE LOG HERE FOR DEBUGGING:
  console.log('[Navbar] currentUser:', currentUser);
  const isHomepage = location.pathname === '/';


  useEffect(() => {
    // ... (scroll handling useEffect remains the same) ...
    const handleScroll = () => {
        const offset = window.scrollY;
        setIsScrolled(offset > 50);
      };
      handleScroll();
      setIsMobileMenuOpen(false);
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  }, [location]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const getNavLinkPath = (sectionId: string): string => isHomepage ? `#${sectionId}` : `/#${sectionId}`;

  const handleSectionLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    // ... (section link click handler remains the same) ...
    if (isMobileMenuOpen) toggleMobileMenu();
    if (isHomepage) {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileLinkClick = () => {
    if (isMobileMenuOpen) toggleMobileMenu();
  };

  // --- *** Logout Handler *** ---
  const handleLogout = async () => {
    if (isMobileMenuOpen) toggleMobileMenu(); // Close menu if open
    const auth = getAuth(app);
    try {
      await signOut(auth);
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      navigate('/'); // Redirect to homepage after logout
    } catch (error) {
      console.error("Logout failed:", error);
      toast({ title: "Logout Failed", description: "Could not log out. Please try again.", variant: "destructive" });
    }
  };

  const navLinkClasses = cn("transition-colors hover:text-pursuva-blue font-medium", "text-gray-700");
  const headerClasses = cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled || isMobileMenuOpen ? "bg-white shadow-sm py-2" : "bg-transparent py-4");
  const logoTextClasses = cn("ml-2 text-xl font-semibold transition-colors", isScrolled || isMobileMenuOpen ? "text-gray-800" : "text-gray-800");

  return (
    <header className={headerClasses}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Pursuva Home" onClick={handleMobileLinkClick}>
          <img src="/lovable-uploads/802db8de-7a0a-4d81-887c-b28d6e701edb.png" alt="Pursuva Logo" className="h-9 w-auto"/>
          <span className={logoTextClasses}>Pursuva</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Common Links */}
          <Link to={getNavLinkPath('about')} onClick={(e) => handleSectionLinkClick(e, 'about')} className={navLinkClasses}>About</Link>
          <Link to={getNavLinkPath('programs')} onClick={(e) => handleSectionLinkClick(e, 'programs')} className={navLinkClasses}>Courses</Link>
          <Link to={getNavLinkPath('impact')} onClick={(e) => handleSectionLinkClick(e, 'impact')} className={navLinkClasses}>Approach</Link>
          <Link to={getNavLinkPath('team')} onClick={(e) => handleSectionLinkClick(e, 'team')} className={navLinkClasses}>Team</Link>
          <Link to={getNavLinkPath('contact')} onClick={(e) => handleSectionLinkClick(e, 'contact')} className={navLinkClasses}>Contact</Link>

          {/* --- *** Conditional Links *** --- */}
          {currentUser ? (
            <>
              <Link to="/dashboard" className={navLinkClasses}>Dashboard</Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className={navLinkClasses}>Login</Link>
              <Button asChild size="sm" className="bg-pursuva-blue hover:bg-pursuva-blue/90 text-white">
                <Link to="/enroll">Enroll Now</Link>
              </Button>
            </>
          )}
          {/* --- End Conditional Links --- */}
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden text-gray-800 hover:bg-gray-100" onClick={toggleMobileMenu} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMobileMenuOpen}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* --- Mobile Menu Panel --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 border-t border-gray-200">
          <div className="container px-4 mx-auto py-4">
            <nav className="flex flex-col space-y-4">
              {/* Common Links */}
              <Link to={getNavLinkPath('about')} onClick={(e) => handleSectionLinkClick(e, 'about')} className={navLinkClasses + " block py-1"}>About</Link>
              <Link to={getNavLinkPath('programs')} onClick={(e) => handleSectionLinkClick(e, 'programs')} className={navLinkClasses + " block py-1"}>Courses</Link>
              <Link to={getNavLinkPath('impact')} onClick={(e) => handleSectionLinkClick(e, 'impact')} className={navLinkClasses + " block py-1"}>Approach</Link>
              <Link to={getNavLinkPath('team')} onClick={(e) => handleSectionLinkClick(e, 'team')} className={navLinkClasses + " block py-1"}>Team</Link>
              <Link to={getNavLinkPath('contact')} onClick={(e) => handleSectionLinkClick(e, 'contact')} className={navLinkClasses + " block py-1"}>Contact</Link>

              {/* --- *** Conditional Mobile Links *** --- */}
              {currentUser ? (
                <>
                  <Link to="/dashboard" onClick={handleMobileLinkClick} className={navLinkClasses + " block py-1"}>Dashboard</Link>
                  <Button variant="outline" onClick={handleLogout} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white w-full mt-2">
                     Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={handleMobileLinkClick} className={navLinkClasses + " block py-1"}>Login</Link>
                  <Button asChild className="bg-pursuva-blue hover:bg-pursuva-blue/90 text-white w-full mt-2">
                    <Link to="/enroll" onClick={handleMobileLinkClick}>Enroll Now</Link>
                  </Button>
                </>
              )}
              {/* --- End Conditional Mobile Links --- */}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;