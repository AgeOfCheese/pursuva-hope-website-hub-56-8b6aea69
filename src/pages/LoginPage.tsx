// src/pages/LoginPage.tsx (or wherever your login page component resides)

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Ensure Link is imported if used
import Navbar from "@/components/Navbar"; // Adjust path if needed
import Footer from "@/components/Footer"; // Adjust path if needed
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext'; // Import useAuth hook

// --- Firebase Imports ---
import { getAuth, signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { app } from "@/firebaseConfig"; // Import initialized Firebase app

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Get current user state

  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser) {
      console.log("User already logged in, redirecting from login page.");
      navigate('/'); // Or navigate('/dashboard') or desired page
    }
  }, [currentUser, navigate]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log('Attempting to login with email:', email); // Avoid logging password

    try {
      const auth = getAuth(app); // Get Firebase Auth instance
      // --- Perform actual Firebase login ---
      await signInWithEmailAndPassword(auth, email, password);

      console.log('Firebase login successful for:', email);
      toast({
        title: "Login Successful!",
        description: "Welcome back!",
      });

      // Navigate to the home page (or dashboard) after successful login
      // The AuthContext listener will handle updating the global state
      navigate('/');

      // Form clearing is optional, as navigation will unmount the component
      // setEmail('');
      // setPassword('');

    } catch (error: any) {
      console.error("Firebase login failed:", error);

      let title = "Login Failed";
      let description = "An unexpected error occurred. Please try again.";

      // Provide more specific feedback based on Firebase error codes
      if (error.code) {
        switch (error.code) {
          case AuthErrorCodes.USER_DELETED:
          case AuthErrorCodes.USER_DISABLED:
          case 'auth/user-not-found': // Older SDK might use string literal
            description = "No account found with this email address.";
            break;
          case AuthErrorCodes.INVALID_PASSWORD:
          case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS: // Common for wrong password or email not found in newer SDKs
          case 'auth/wrong-password': // Older SDK might use string literal
            description = "Incorrect password. Please try again.";
            break;
          case AuthErrorCodes.INVALID_EMAIL:
          case 'auth/invalid-email':
            description = "Please enter a valid email address.";
            break;
          case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
          case 'auth/too-many-requests':
            description = "Access temporarily disabled due to too many attempts. Please try again later.";
            break;
          default:
            console.warn("Unhandled Firebase Login Error:", error.code, error.message);
            description = `An error occurred (${error.code}). Please try again.`; // Include code for debugging if needed
            break;
        }
      } else if (error.message) {
         // Fallback to error message if code isn't available
         description = error.message;
      }

      toast({
        title: title,
        description: description,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent rendering the form if already logged in and redirecting
  if (currentUser) {
    return null; // Or a loading indicator
  }

  return (
    <div className="flex flex-col min-h-screen bg-background"> {/* Use theme background */}
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-foreground font-heading"> {/* Use theme text */}
            Login to Pursuva
          </h1>
          <p className="text-center text-muted-foreground mb-10"> {/* Use theme text */}
            Enter your credentials to access your account.
          </p>

          {/* Form container with theme styles */}
          <div className="bg-card p-8 rounded-lg border"> {/* Use card/border from theme */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                 {/* Use theme label style */}
                <Label htmlFor="email" className="block mb-2 text-sm font-medium text-foreground/80">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full" // Input styling likely comes from index.css via CSS vars
                  autoComplete="email"
                  aria-required="true"
                />
              </div>
              <div>
                <Label htmlFor="password" className="block mb-2 text-sm font-medium text-foreground/80">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full"
                  autoComplete="current-password"
                  aria-required="true"
                />
                 {/* Optional: Add 'Forgot Password?' link here */}
                 {/* <div className="text-right mt-1">
                   <Link to="/forgot-password" className="text-sm font-medium text-pursuva-blue hover:underline">
                     Forgot Password?
                   </Link>
                 </div> */}
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                // Use primary button styling defined in tailwind.config/index.css
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging In...
                  </span>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground"> {/* Use theme text */}
              Don't have an account?{' '}
              <Link to="/enroll" className="font-medium text-primary hover:underline"> {/* Use primary theme color */}
                Enroll Now
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;