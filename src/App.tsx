import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import FarmerDashboard from "./pages/FarmerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import CooperativeDashboard from "./pages/CooperativeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AIGuidance from "./pages/AIGuidance";
import IoTDevices from "./pages/IoTDevices";
import Analytics from "./pages/Analytics";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import SettingsPage from "./pages/Settings";
import IPLearning from "./pages/IPLearning";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function RoleDashboard() {
  const { user } = useApp();
  switch (user?.role) {
    case 'buyer': return <BuyerDashboard />;
    case 'investor': return <InvestorDashboard />;
    case 'supplier': return <SupplierDashboard />;
    case 'cooperative': return <CooperativeDashboard />;
    case 'admin': return <AdminDashboard />;
    default: return <FarmerDashboard />;
  }
}

function AppRoutes() {
  const { isAuthenticated } = useApp();
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/dashboard" element={isAuthenticated ? <RoleDashboard /> : <Navigate to="/onboarding" />} />
      <Route path="/dashboard/ai-guidance" element={isAuthenticated ? <AIGuidance /> : <Navigate to="/onboarding" />} />
      <Route path="/dashboard/devices" element={isAuthenticated ? <IoTDevices /> : <Navigate to="/onboarding" />} />
      <Route path="/dashboard/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/onboarding" />} />
      <Route path="/dashboard/news" element={isAuthenticated ? <News /> : <Navigate to="/onboarding" />} />
      <Route path="/dashboard/news/:id" element={isAuthenticated ? <NewsDetail /> : <Navigate to="/onboarding" />} />
      <Route path="/dashboard/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/onboarding" />} />
      <Route path="/dashboard/ip-learning" element={isAuthenticated ? <IPLearning /> : <Navigate to="/onboarding" />} />
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
