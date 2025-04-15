import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // Use your Auth context hook

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Optional: Show a loading spinner or skeleton screen
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    // User not logged in, redirect to login page
    // 'replace' prevents adding the dashboard URL to history when redirected
    return <Navigate to="/login" replace />;
  }

  // User is logged in, render the children (the protected page)
  return <>{children}</>;
};

export default ProtectedRoute;