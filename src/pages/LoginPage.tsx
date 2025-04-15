// src/app/login/page.tsx (or src/pages/login.tsx)
'use client'; // Required for hooks like useState in App Router
import { Link, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

// --- Firebase Imports (Placeholder - needed for actual login) ---
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { app } from "@/firebaseConfig"; // Assuming 'app' is your initialized Firebase app

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Added password state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log('Attempting to login:', { email }); // Don't log password in production

    // --- Placeholder for Firebase Authentication Logic ---
    try {
      // const auth = getAuth(app);
      // await signInWithEmailAndPassword(auth, email, password);

      // --- Mock Success ---
      console.log('Simulated login successful for:', email);
      toast({
        title: "Login Successful!",
        description: "Welcome back!",
      });
      // Redirect to a dashboard or home page after successful login
      navigate('/'); // Use navigate function

      // Clear form (optional)
      // setEmail('');
      // setPassword('');

    } catch (error: any) {
      console.error("Login failed:", error);
      // --- Mock Failure ---
       toast({
         title: "Login Failed",
         // In real Firebase, you'd check error.code (e.g., 'auth/user-not-found', 'auth/wrong-password')
         description: "Invalid email or password. Please try again.", // Generic error message
         variant: "destructive",
       });
    } finally {
      setIsSubmitting(false);
    }
    // --- End Placeholder Logic ---
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto"> {/* Slightly narrower for login form */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
            Login to Pursuva
          </h1>
          <p className="text-center text-gray-700 mb-10">
            Enter your credentials to access your account.
          </p>

          <div className="bg-white p-8 rounded-lg">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full border-gray-300 focus:border-pursuva-blue focus:ring focus:ring-pursuva-blue focus:ring-opacity-50 rounded-md shadow-sm"
                  autoComplete="email" // Added autocomplete
                />
              </div>
              <div>
                <Label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full border-gray-300 focus:border-pursuva-blue focus:ring focus:ring-pursuva-blue focus:ring-opacity-50 rounded-md shadow-sm"
                  autoComplete="current-password" // Added autocomplete
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-pursuva-blue text-white hover:bg-pursuva-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pursuva-blue disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Logging In...' : 'Login'}
              </Button>
            </form>
            {/* Optional: Add link to enrollment/signup page */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
            <Link to="/enroll" className="font-medium text-pursuva-blue hover:underline">
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