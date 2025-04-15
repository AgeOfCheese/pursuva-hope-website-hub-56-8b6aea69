import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- Authentication Imports ---
import { AuthProvider } from "./context/AuthContext"; // Adjust path if needed
import ProtectedRoute from "./components/ProtectedRoute"; // Adjust path if needed

// --- Page Imports ---
import Index from "./pages/Index"; // Your main page component
import NotFound from "./pages/NotFound";
import EnrollPage from "./pages/Enroll"; // Renamed import variable for clarity
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard"; // Import the new Dashboard page

// Unused import, can be removed:
// import { LogIn } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* AuthProvider should wrap BrowserRouter so context is available to all routes */}
      <AuthProvider>
        <Toaster /> {/* Toasters can be inside or outside AuthProvider */}
        <Sonner />
        <BrowserRouter>
          {/* Navbar and Footer are likely rendered inside Index, EnrollPage etc. */}
          {/* If Navbar/Footer were here, they'd need to be inside BrowserRouter */}
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

            {/* Catch-all Not Found Route - MUST BE LAST */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;