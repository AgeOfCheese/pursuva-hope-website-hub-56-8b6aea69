// src/pages/EnrollPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

// --- Firebase Imports ---
import { app, db } from "@/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";

// Define available courses
const AVAILABLE_COURSES = [
  { id: 'python', label: 'Python Programming' },
  { id: 'java', label: 'Java Fundamentals' },
  { id: 'physics', label: 'Physics Basics' },
];

function EnrollPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<Record<string, boolean>>(
    AVAILABLE_COURSES.reduce((acc, course) => ({ ...acc, [course.id]: false }), {})
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCourseChange = (courseId: string, checked: boolean | 'indeterminate') => {
     if (typeof checked === 'boolean') {
         setSelectedCourses(prevState => ({
             ...prevState,
             [courseId]: checked,
         }));
     }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast({ title: "Password Mismatch", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Weak Password", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }

    const enrolledCourses = Object.keys(selectedCourses).filter(
      courseId => selectedCourses[courseId] === true
    );

    setIsSubmitting(true);
    console.log('Attempting to create user account:', { name, email, enrolledCourses });

    try {
      const auth = getAuth(app);
      console.log('Firebase Auth instance obtained.');

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Firebase Auth user created successfully:', user.uid);

      // Save User Profile Data with role set to "student"
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        name: name,
        email: user.email,
        enrolledCourses: enrolledCourses,
        role: 'student', // <-- Add this line to set default role
        createdAt: serverTimestamp(),
      });
      console.log('User profile data saved to Firestore.');

      // Save Enrollment Record
      const enrollmentsCollectionRef = collection(db, "enrollments");
      await addDoc(enrollmentsCollectionRef, {
        userId: user.uid,
        name: name,
        email: user.email,
        enrolledCourses: enrolledCourses,
        enrollmentTimestamp: serverTimestamp()
      });
      console.log('Enrollment record saved.');

      toast({
        title: "Account Created!",
        description: `Welcome, ${name}! You can now log in.`,
      });

      navigate('/login');

      // Clear form state
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSelectedCourses(AVAILABLE_COURSES.reduce((acc, course) => ({ ...acc, [course.id]: false }), {}));

    } catch (error: any) {
        console.error("Firebase user creation failed:", error);
        let title = "Signup Failed";
        let description = "Could not create account. Please try again.";

        if (error.code) {
          switch (error.code) {
            case AuthErrorCodes.EMAIL_EXISTS: case 'auth/email-already-in-use':
              title = "Email Already In Use"; description = "This email is already registered. Please log in."; break;
            case AuthErrorCodes.WEAK_PASSWORD: case 'auth/weak-password':
              title = "Weak Password"; description = "Password must be at least 6 characters long."; break;
            case AuthErrorCodes.INVALID_EMAIL: case 'auth/invalid-email':
              title = "Invalid Email"; description = "Please enter a valid email address."; break;
            case 'auth/requires-recent-login':
                 title = "Action Requires Recent Login"; description = "Please log in again to complete this action."; break;
            default: console.error("Unhandled Firebase Auth Error:", error.code, error.message); break;
          }
        } else if (error.message) { description = error.message; }

        toast({ title: title, description: description, variant: "destructive", });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
            Create Your Pursuva Account
          </h1>
          <p className="text-center text-gray-700 mb-10">
            Fill out the form below and select your courses.
          </p>

          <div className="bg-white p-8 rounded-lg ">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            
            {/* Email Field */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            
            {/* Password Field */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <div>
            <Label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-foreground/80">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full"
              aria-required="true"
            />
          </div>

              {/* Course Selection */}
              <div className="space-y-4">
                <Label className="block text-sm font-medium text-gray-700">Select Courses</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {AVAILABLE_COURSES.map((course) => (
                    <div key={course.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={course.id}
                        checked={selectedCourses[course.id]}
                        onCheckedChange={(checked) => handleCourseChange(course.id, checked)}
                        disabled={isSubmitting}
                      />
                      <Label
                        htmlFor={course.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {course.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-pursuva-blue text-white hover:bg-pursuva-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pursuva-blue disabled:opacity-50 transition-colors">
                {isSubmitting ? 'Creating Account...' : 'Create Account & Enroll'}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-pursuva-blue hover:underline">
                Log In
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default EnrollPage;