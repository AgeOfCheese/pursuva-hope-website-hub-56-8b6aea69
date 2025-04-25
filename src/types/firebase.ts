import { User as FirebaseAuthUser } from 'firebase/auth';
import { Timestamp, FieldValue } from 'firebase/firestore';

// Extended user type that includes Firestore data
export interface AppUser extends FirebaseAuthUser {
  role?: 'student' | 'admin';
  groups?: string[];
  enrolledCourses?: string[];
}

// Separate type for Firestore user document
export interface UserDocument {
  uid: string;
  email: string;
  displayName?: string;
  role: 'student' | 'admin';
  groups: string[];
  enrolledCourses: string[];
  createdAt?: Date | string;
}

export interface Assignment {
    id?: string;
    title: string;
    description: string;
    dueDate: string;
    groups: string[];
    createdAt: Timestamp | Date | string | FieldValue; // Add FieldValue here
  }