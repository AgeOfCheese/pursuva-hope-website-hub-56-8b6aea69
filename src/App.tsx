import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- Authentication Imports ---
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute"; // Add this import

// --- Page Imports ---
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EnrollPage from "./pages/Enroll";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard";
import AdminDashboardPage from "@/components/admin/AdminDashboard"; 
import AdminUsersPage from "./components/admin/AdminUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/enroll" element={<EnrollPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminUsersPage/>
                </AdminRoute>
              }
            />

            {/* Catch-all Not Found Route - MUST BE LAST */}
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;