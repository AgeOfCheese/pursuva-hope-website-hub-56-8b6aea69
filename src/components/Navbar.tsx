// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/firebaseConfig';
import { toast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isHomepage = location.pathname === '/';

  useEffect(() => {
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
    if (isMobileMenuOpen) toggleMobileMenu();
    if (isHomepage) {
      e.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileLinkClick = () => {
    if (isMobileMenuOpen) toggleMobileMenu();
  };

  const handleLogout = async () => {
    if (isMobileMenuOpen) toggleMobileMenu();
    const auth = getAuth(app);
    try {
      await signOut(auth);
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      navigate('/');
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
        <Link to="/" className="flex items-center" aria-label="Pursuva Home" onClick={handleMobileLinkClick}>
          <img src="/lovable-uploads/802db8de-7a0a-4d81-887c-b28d6e701edb.png" alt="Pursuva Logo" className="h-9 w-auto"/>
          <span className={logoTextClasses}>Pursuva</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to={getNavLinkPath('about')} onClick={(e) => handleSectionLinkClick(e, 'about')} className={navLinkClasses}>About</Link>
          <Link to={getNavLinkPath('programs')} onClick={(e) => handleSectionLinkClick(e, 'programs')} className={navLinkClasses}>Courses</Link>
          <Link to={getNavLinkPath('impact')} onClick={(e) => handleSectionLinkClick(e, 'impact')} className={navLinkClasses}>Approach</Link>
          <Link to={getNavLinkPath('team')} onClick={(e) => handleSectionLinkClick(e, 'team')} className={navLinkClasses}>Team</Link>
          <Link to={getNavLinkPath('contact')} onClick={(e) => handleSectionLinkClick(e, 'contact')} className={navLinkClasses}>Contact</Link>

          {currentUser ? (
            <>
              <Link to="/dashboard" className={navLinkClasses}>Dashboard</Link>
              
              {/* Updated Admin Dropdown - Fixed hover area */}
              {currentUser.role === 'admin' && (
                <div className="relative group h-full flex items-center">
                  <div className="relative">
                    <button className={navLinkClasses + " flex items-center"}>
                      Admin
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute right-0 top-full pt-2 w-48">
                      <div className="bg-white rounded-md shadow-lg py-1 border border-gray-200">
                        <Link 
                          to="/admin" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={handleMobileLinkClick}
                        >
                          Dashboard
                        </Link>
                        <Link 
                          to="/admin/users" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={handleMobileLinkClick}
                        >
                          User Management
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout} 
                className={cn(
                  "border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
                  currentUser?.role === 'admin' ? "ml-2" : ""
                )}
              >
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
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden text-gray-800 hover:bg-gray-100" onClick={toggleMobileMenu} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMobileMenuOpen}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 border-t border-gray-200">
          <div className="container px-4 mx-auto py-4">
            <nav className="flex flex-col space-y-4">
              <Link to={getNavLinkPath('about')} onClick={(e) => handleSectionLinkClick(e, 'about')} className={navLinkClasses + " block py-1"}>About</Link>
              <Link to={getNavLinkPath('programs')} onClick={(e) => handleSectionLinkClick(e, 'programs')} className={navLinkClasses + " block py-1"}>Courses</Link>
              <Link to={getNavLinkPath('impact')} onClick={(e) => handleSectionLinkClick(e, 'impact')} className={navLinkClasses + " block py-1"}>Approach</Link>
              <Link to={getNavLinkPath('team')} onClick={(e) => handleSectionLinkClick(e, 'team')} className={navLinkClasses + " block py-1"}>Team</Link>
              <Link to={getNavLinkPath('contact')} onClick={(e) => handleSectionLinkClick(e, 'contact')} className={navLinkClasses + " block py-1"}>Contact</Link>

              {currentUser ? (
                <>
                  <Link to="/dashboard" onClick={handleMobileLinkClick} className={navLinkClasses + " block py-1"}>Dashboard</Link>
                  {currentUser.role === 'admin' && (
                    <>
                      <Link to="/admin" onClick={handleMobileLinkClick} className={navLinkClasses + " block py-1"}>Admin Dashboard</Link>
                      <Link to="/admin/users" onClick={handleMobileLinkClick} className={navLinkClasses + " block py-1"}>User Management</Link>
                    </>
                  )}
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
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;