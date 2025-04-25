import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { currentUser, isAdmin, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!currentUser) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;

  return (
    <div className="admin-layout">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        {children}
      </div>
    </div>
  );
}