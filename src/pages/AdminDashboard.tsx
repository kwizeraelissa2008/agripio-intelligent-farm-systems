import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { Shield, Users, Package, AlertTriangle, CheckCircle, XCircle, Eye, BarChart3 } from 'lucide-react';

const pendingItems = [
  { type: 'Listing', item: 'Avocado Hass — 1,200kg', user: 'Pierre M.', submitted: '2h ago' },
  { type: 'Account', item: 'New Supplier Registration', user: 'Tech Seeds Ltd', submitted: '4h ago' },
  { type: 'Listing', item: 'Organic Fertilizer 25kg', user: 'GreenGrow Co.', submitted: '6h ago' },
  { type: 'Report', item: 'Crop Disease Report', user: 'Marie C.', submitted: '1d ago' },
];

const systemStats = [
  { label: 'Total Users', value: '12,400', icon: Users, color: 'hsl(var(--emerald))' },
  { label: 'Active Listings', value: '1,240', icon: Package, color: 'hsl(200 90% 50%)' },
  { label: 'Pending Review', value: '4', icon: AlertTriangle, color: 'hsl(45 100% 51%)' },
  { label: 'System Health', value: '99.9%', icon: Shield, color: 'hsl(var(--emerald))' },
];

export default function AdminDashboard() {
  const { user } = useApp();

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Admin Control Panel ⚙️</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Platform Moderation & System Analytics</p>
        </div>

        <div className="glass-card p-6 text-center" style={{ border: '1px solid hsl(0 100% 66% / 0.2)' }}>
          <div className="text-xs uppercase tracking-widest mb-2" style={{ color: 'hsl(0 100% 66%)' }}>System Status</div>
          <div className="text-5xl font-bold mono mb-1" style={{ color: 'hsl(var(--emerald))' }}>99.9%</div>
          <div className="text-sm text-muted-foreground">All systems operational • 4 items pending review</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {systemStats.map(s => (
            <div key={s.label} className="metric-card">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="glass-card p-5">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" style={{ color: 'hsl(45 100% 51%)' }} /> Pending Approvals
          </h2>
          <div className="space-y-3">
            {pendingItems.map((item, i) => (
              <div key={i} className="p-4 rounded-xl flex items-center justify-between"
                style={{ background: 'hsl(0 0% 6%)', border: '1px solid hsl(0 0% 12%)' }}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="tag warning text-xs">{item.type}</span>
                    <span className="font-medium text-sm">{item.item}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.user} • {item.submitted}</div>
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'hsl(var(--emerald) / 0.15)' }}>
                    <CheckCircle className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'hsl(0 100% 66% / 0.15)' }}>
                    <XCircle className="w-4 h-4" style={{ color: 'hsl(0 100% 66%)' }} />
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'hsl(0 0% 12%)' }}>
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
