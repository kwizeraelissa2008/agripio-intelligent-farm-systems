import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { Truck, Package, TrendingUp, Star, ShoppingBag, MapPin } from 'lucide-react';

const myProducts = [
  { name: 'DAP Fertilizer 50kg', category: 'Fertilizer', price: 'RWF 45,000', stock: 120, sold: 340 },
  { name: 'Drip Irrigation Kit', category: 'Tools', price: 'RWF 85,000', stock: 45, sold: 89 },
  { name: 'Hybrid Maize Seeds 5kg', category: 'Seeds', price: 'RWF 12,000', stock: 280, sold: 1200 },
  { name: 'Soil pH Tester', category: 'Devices', price: 'RWF 35,000', stock: 30, sold: 67 },
];

const recentOrders = [
  { buyer: 'Jean Paul U.', product: 'DAP Fertilizer', qty: 10, total: 'RWF 450K', status: 'Shipped' },
  { buyer: 'Coop Musanze', product: 'Maize Seeds', qty: 50, total: 'RWF 600K', status: 'Processing' },
  { buyer: 'Agnes N.', product: 'Irrigation Kit', qty: 2, total: 'RWF 170K', status: 'Delivered' },
];

export default function SupplierDashboard() {
  const { user } = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">{greeting}, {user?.name?.split(' ')[0] || 'Supplier'} 🚚</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Supplier Dashboard • Product & Order Management</p>
        </div>

        {/* Status Hero */}
        <div className="glass-card p-6 text-center" style={{ border: '1px solid hsl(20 30% 50% / 0.2)' }}>
          <div className="text-xs uppercase tracking-widest mb-2" style={{ color: 'hsl(20 30% 50%)' }}>Business Health</div>
          <div className="text-5xl font-bold mono mb-1" style={{ color: 'hsl(var(--emerald))' }}>91</div>
          <div className="text-sm text-muted-foreground">4 products listed • 1,696 total sales</div>
          <div className="score-meter mt-3">
            <div className="score-meter-fill" style={{ width: '91%' }} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Products Listed', value: '4', icon: Package, color: 'hsl(20 30% 50%)' },
            { label: 'Total Revenue', value: 'RWF 12.4M', icon: TrendingUp, color: 'hsl(var(--emerald))' },
            { label: 'Active Orders', value: '6', icon: Truck, color: 'hsl(200 90% 50%)' },
            { label: 'Avg Rating', value: '4.7', icon: Star, color: 'hsl(43 96% 56%)' },
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
          <div className="glass-card p-5">
            <h2 className="font-semibold mb-4">My Products</h2>
            <div className="space-y-3">
              {myProducts.map((p, i) => (
                <div key={i} className="p-3 rounded-xl flex items-center justify-between"
                  style={{ background: 'hsl(0 0% 6%)', border: '1px solid hsl(0 0% 12%)' }}>
                  <div>
                    <div className="font-medium text-sm">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.category} • Stock: {p.stock}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold" style={{ color: 'hsl(var(--emerald))' }}>{p.price}</div>
                    <div className="text-xs text-muted-foreground">{p.sold} sold</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h2 className="font-semibold mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {recentOrders.map((o, i) => (
                <div key={i} className="p-3 rounded-xl flex items-center justify-between"
                  style={{ background: 'hsl(0 0% 6%)', border: '1px solid hsl(0 0% 12%)' }}>
                  <div>
                    <div className="font-medium text-sm">{o.buyer}</div>
                    <div className="text-xs text-muted-foreground">{o.product} × {o.qty}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{o.total}</div>
                    <span className={`tag text-xs ${o.status === 'Delivered' ? 'emerald' : o.status === 'Shipped' ? 'sky' : 'warning'}`}>
                      {o.status}
                    </span>
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
