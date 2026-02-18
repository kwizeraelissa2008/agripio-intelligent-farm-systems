import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import FarmerDashboard from "./pages/FarmerDashboard";
import Marketplace from "./pages/Marketplace";
import AIGuidance from "./pages/AIGuidance";
import IoTDevices from "./pages/IoTDevices";
import VisionSystem from "./pages/VisionSystem";
import MarketIntel from "./pages/MarketIntel";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated } = useApp();
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/dashboard" element={isAuthenticated ? <FarmerDashboard /> : <Navigate to="/onboarding" />} />
      <Route path="/dashboard/marketplace" element={isAuthenticated ? <Marketplace /> : <Navigate to="/onboarding" />} />
      <Route path="/dashboard/ai-guidance" element={isAuthenticated ? <AIGuidance /> : <Navigate to="/onboarding" />} />
      <Route path="/dashboard/devices" element={isAuthenticated ? <IoTDevices /> : <Navigate to="/onboarding" />} />
      <Route path="/dashboard/vision" element={isAuthenticated ? <VisionSystem /> : <Navigate to="/onboarding" />} />
      <Route path="/dashboard/market-intel" element={isAuthenticated ? <MarketIntel /> : <Navigate to="/onboarding" />} />
      <Route path="/dashboard/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/onboarding" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
