import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { TrendingUp, DollarSign, BarChart3, Target, Leaf, MapPin, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const roiData = [
  { month: 'Aug', roi: 4.2 }, { month: 'Sep', roi: 5.8 }, { month: 'Oct', roi: 7.1 },
  { month: 'Nov', roi: 6.5 }, { month: 'Dec', roi: 9.2 }, { month: 'Jan', roi: 11.4 },
];

const projects = [
  { name: 'Maize Production — Musanze', farmer: 'Jean Paul U.', funded: 'RWF 2.5M', roi: '+18%', status: 'Active', risk: 'Low' },
  { name: 'Avocado Export — Rubavu', farmer: 'Pierre M.', funded: 'RWF 4.0M', roi: '+32%', status: 'Growing', risk: 'Medium' },
  { name: 'Tomato Greenhouse — Kigali', farmer: 'Marie C.', funded: 'RWF 1.2M', roi: '+12%', status: 'Harvesting', risk: 'Low' },
];

export default function InvestorDashboard() {
  const { user } = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">{greeting}, {user?.name?.split(' ')[0] || 'Investor'} 📈</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Investment Portfolio & Opportunities Dashboard</p>
        </div>

        {/* Status Hero */}
        <div className="glass-card p-6 text-center" style={{ border: '1px solid hsl(43 96% 56% / 0.2)' }}>
          <div className="text-xs uppercase tracking-widest mb-2" style={{ color: 'hsl(43 96% 56%)' }}>Portfolio Performance</div>
          <div className="text-5xl font-bold mono mb-1" style={{ color: 'hsl(43 96% 56%)' }}>+22%</div>
          <div className="text-sm text-muted-foreground">Average ROI across 3 active investments</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Invested', value: 'RWF 7.7M', icon: DollarSign, color: 'hsl(43 96% 56%)' },
            { label: 'Active Projects', value: '3', icon: Target, color: 'hsl(var(--emerald))' },
            { label: 'Avg ROI', value: '+22%', icon: TrendingUp, color: 'hsl(43 96% 56%)' },
            { label: 'Opportunities', value: '14', icon: BarChart3, color: 'hsl(200 90% 50%)' },
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

        {/* ROI Chart */}
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-4">ROI Trend (%)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={roiData}>
              <defs>
                <linearGradient id="gRoi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(43 96% 56%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(43 96% 56%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 15%)" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(120 10% 55%)', fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: 'hsl(120 10% 55%)', fontSize: 11 }} axisLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 15%)', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="roi" stroke="hsl(43 96% 56%)" fill="url(#gRoi)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Funded Projects */}
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-4">Funded Projects</h2>
          <div className="space-y-3">
            {projects.map((p, i) => (
              <div key={i} className="p-4 rounded-xl flex items-center justify-between"
                style={{ background: 'hsl(0 0% 6%)', border: '1px solid hsl(0 0% 12%)' }}>
                <div>
                  <div className="font-medium text-sm">{p.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                    <Leaf className="w-3 h-3" /> {p.farmer} • {p.funded}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold flex items-center gap-1" style={{ color: 'hsl(var(--emerald))' }}>
                    <ArrowUpRight className="w-3 h-3" />{p.roi}
                  </div>
                  <div className="flex gap-1 mt-0.5">
                    <span className="tag emerald text-xs">{p.status}</span>
                    <span className={`tag text-xs ${p.risk === 'Low' ? 'emerald' : 'warning'}`}>{p.risk}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
