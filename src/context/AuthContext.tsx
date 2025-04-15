import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '@/firebaseConfig'; // Import your Firebase app instance

interface AuthContextType {
  currentUser: User | null;
  loading: boolean; // To handle initial auth state check
}

// Create context with a default value
const AuthContext = createContext<AuthContextType>({ currentUser: null, loading: true });

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set user to null if logged out, or User object if logged in
      setLoading(false); // Auth state determined, stop loading
      console.log('Auth State Changed:', user ? `Logged in as ${user.email}` : 'Logged out');
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []); // Empty dependency array ensures this runs only once on mount

  const value = {
    currentUser,
    loading,
  };

  // Render children only when not loading to prevent flash of incorrect UI
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};