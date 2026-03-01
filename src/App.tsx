import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "./pages/Index";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProblemStatement from "./pages/ProblemStatement";
import Submission from "./pages/Submission";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>

            {/* Homepage */}
            <Route path="/" element={<Index />} />

            {/* Registration */}
            <Route path="/register" element={<Register />} />

            {/* Admin */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* Problem Statement */}
            <Route path="/problem-statement" element={<ProblemStatement />} />

            {/* Submission */}
            <Route path="/submission" element={<Submission />} />

            {/* Safe fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;