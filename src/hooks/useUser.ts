import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { UserDocument } from '@/types/firebase';

export const useUser = (uid: string) => {
  const [user, setUser] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as UserDocument);
        } else {
          setUser(null);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (uid) fetchUser();
  }, [uid]);

  const updateUserRole = async (role: 'student' | 'admin') => {
    if (!user) return;
    
    try {
      await updateDoc(doc(db, 'users', uid), { role });
      setUser({ ...user, role });
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    }
  };

  return { user, loading, error, updateUserRole };
};