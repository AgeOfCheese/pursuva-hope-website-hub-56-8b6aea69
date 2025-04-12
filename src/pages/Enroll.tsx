import React, { useState } from 'react';
import Navbar from "@/components/Navbar"; // Assuming path is correct
import Footer from "@/components/Footer"; // Assuming path is correct
import { Button } from "@/components/ui/button"; // Assuming path & component name
import { Input } from "@/components/ui/input";   // Assuming path & component name
import { Label } from "@/components/ui/label";   // Assuming path & component name
import { toast } from "@/hooks/use-toast"; // Import the toast function

function EnrollPage() {
  // State to hold form input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Form Submission Handler ---
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default browser form submission
    setIsSubmitting(true);

    // ** TODO: Replace with your actual enrollment logic **
    // This is where you would typically send the data (name, email)
    // to your backend API endpoint.
    console.log('Enrollment data:', { name, email });

    try {
      // Example: Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // ** Handle successful enrollment **
      toast({ // Use the toast for user feedback
        title: "Enrollment Successful!",
        description: "Welcome! We'll be in touch soon.",
      });
      setName(''); // Clear form on success
      setEmail('');

    } catch (error) {
      // ** Handle enrollment error **
      console.error("Enrollment failed:", error);
      toast({
        title: "Enrollment Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive", // Use destructive variant for errors
      });
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  // --- Render Component ---
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main content area */}
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gradient"> {/* Use text-gradient from index.css */}
            Enroll in Pursuva
          </h1>
          <p className="text-center text-muted-foreground mb-10"> {/* Use text color from theme */}
            Take the next step in your journey. Fill out the form below to enroll in our programs.
          </p>

          {/* Enrollment Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="text-left block mb-2 text-sm font-medium">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full" // Ensure input takes full width
              />
            </div>

            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-left block mb-2 text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full"
              />
            </div>

            {/* TODO: Add more fields if needed (e.g., course selection dropdown) */}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gradient text-primary-foreground hover:opacity-90 transition-opacity" // Style with gradient from index.css
            >
              {isSubmitting ? 'Submitting...' : 'Enroll Now'}
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default EnrollPage;