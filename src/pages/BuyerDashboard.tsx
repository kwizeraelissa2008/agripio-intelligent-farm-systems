import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/hooks/useAuth';
import { ShoppingBag, TrendingUp, Package, MapPin, Star, Search, CheckCircle, ArrowRight } from 'lucide-react';

const openRequests = [
  { crop: 'Maize', quantity: '10,000 kg', deadline: 'Mar 15', matches: 12, status: 'active' },
  { crop: 'Tomatoes', quantity: '2,000 kg/week', deadline: 'Ongoing', matches: 8, status: 'active' },
  { crop: 'Avocado Hass', quantity: '5,000 kg', deadline: 'Apr 1', matches: 3, status: 'pending' },
];

const topSuppliers = [
  { name: 'Jean Paul U.', crop: 'Maize', score: 94, location: 'Musanze', verified: true },
  { name: 'Marie C.', crop: 'Tomatoes', score: 88, location: 'Nyabihu', verified: true },
  { name: 'Pierre M.', crop: 'Avocado', score: 76, location: 'Rubavu', verified: false },
  { name: 'Agnes N.', crop: 'Potatoes', score: 91, location: 'Burera', verified: true },
];

export default function BuyerDashboard() {
  const { user } = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold">{greeting}, {user?.name?.split(' ')[0] || 'Buyer'} 🛒</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Buyer Dashboard • Procurement & Supply Intelligence</p>
          </div>
        </div>

        {/* Status Hero */}
        <div className="glass-card p-6 text-center" style={{ border: '1px solid hsl(200 90% 50% / 0.2)' }}>
          <div className="text-xs uppercase tracking-widest mb-2" style={{ color: 'hsl(200 90% 50%)' }}>Supply Chain Health</div>
          <div className="text-5xl font-bold mono mb-1" style={{ color: 'hsl(200 90% 50%)' }}>82</div>
          <div className="text-sm text-muted-foreground">3 active requests • 23 matched suppliers</div>
          <div className="score-meter mt-3">
            <div className="score-meter-fill" style={{ width: '82%', background: 'hsl(200 90% 50%)' }} />
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Requests', value: '3', icon: Search, color: 'hsl(200 90% 50%)' },
            { label: 'Matched Suppliers', value: '23', icon: CheckCircle, color: 'hsl(var(--emerald))' },
            { label: 'Total Procurement', value: 'RWF 8.2M', icon: Package, color: 'hsl(43 96% 56%)' },
            { label: 'Avg Quality Score', value: '87%', icon: Star, color: 'hsl(45 100% 51%)' },
          ].map(s => (
            <div key={s.label} className="metric-card">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Open Requests */}
          <div className="glass-card p-5">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Search className="w-4 h-4" style={{ color: 'hsl(200 90% 50%)' }} /> My Requests
            </h2>
            <div className="space-y-3">
              {openRequests.map((req, i) => (
                <div key={i} className="p-4 rounded-xl flex items-center justify-between"
                  style={{ background: 'hsl(0 0% 6%)', border: '1px solid hsl(0 0% 12%)' }}>
                  <div>
                    <div className="font-medium text-sm">{req.crop}</div>
                    <div className="text-xs text-muted-foreground">{req.quantity} • Due: {req.deadline}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold" style={{ color: 'hsl(var(--emerald))' }}>{req.matches} matches</div>
                    <span className="tag emerald text-xs">{req.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Suppliers */}
          <div className="glass-card p-5">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} /> Top Matched Suppliers
            </h2>
            <div className="space-y-3">
              {topSuppliers.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'hsl(0 0% 10%)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: 'hsl(var(--emerald) / 0.2)', color: 'hsl(var(--emerald))' }}>
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium flex items-center gap-1">
                        {s.name} {s.verified && <CheckCircle className="w-3 h-3" style={{ color: 'hsl(var(--emerald))' }} />}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{s.location} • {s.crop}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" style={{ color: 'hsl(43 96% 56%)' }} />
                    <span className="text-sm font-bold" style={{ color: 'hsl(43 96% 56%)' }}>{s.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
