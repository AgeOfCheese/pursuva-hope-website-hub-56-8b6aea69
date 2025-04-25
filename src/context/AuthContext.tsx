import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User as FirebaseAuthUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { app, db } from '@/firebaseConfig';
import { AppUser, UserDocument } from '@/types/firebase';

interface AuthContextType {
  currentUser: AppUser | null;
  userData: UserDocument | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userData: null,
  loading: true,
  isAdmin: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [userData, setUserData] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Merge Firebase Auth user with Firestore data
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        
        if (userDoc.exists()) {
          const userDocData = userDoc.data() as UserDocument;
          setUserData(userDocData);
          
          // Create extended user object
          const extendedUser: AppUser = {
            ...firebaseUser,
            role: userDocData.role,
            groups: userDocData.groups,
            enrolledCourses: userDocData.enrolledCourses,
          };
          setCurrentUser(extendedUser);
        } else {
          // User doesn't have Firestore document yet
          setCurrentUser(firebaseUser);
          setUserData(null);
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    isAdmin: userData?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);