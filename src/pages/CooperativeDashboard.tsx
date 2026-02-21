import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { Users, TrendingUp, Leaf, BarChart3, MapPin, CheckCircle } from 'lucide-react';

const members = [
  { name: 'Jean Paul U.', crop: 'Maize', yield: '4,200 kg', status: 'Active', score: 82 },
  { name: 'Marie C.', crop: 'Tomatoes', yield: '1,800 kg', status: 'Active', score: 91 },
  { name: 'Pierre M.', crop: 'Avocado', yield: '2,500 kg', status: 'Active', score: 76 },
  { name: 'Agnes N.', crop: 'Potatoes', yield: '6,000 kg', status: 'Inactive', score: 68 },
];

export default function CooperativeDashboard() {
  const { user } = useApp();

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Cooperative Dashboard 🤝</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Member Management & Collective Performance</p>
        </div>

        <div className="glass-card p-6 text-center" style={{ border: '1px solid hsl(270 60% 60% / 0.2)' }}>
          <div className="text-xs uppercase tracking-widest mb-2" style={{ color: 'hsl(270 60% 60%)' }}>Collective Performance</div>
          <div className="text-5xl font-bold mono mb-1" style={{ color: 'hsl(270 60% 60%)' }}>79</div>
          <div className="text-sm text-muted-foreground">4 members • 14,500 kg total production</div>
          <div className="score-meter mt-3">
            <div className="score-meter-fill" style={{ width: '79%', background: 'hsl(270 60% 60%)' }} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Members', value: '4', icon: Users, color: 'hsl(270 60% 60%)' },
            { label: 'Total Yield', value: '14.5T', icon: Leaf, color: 'hsl(var(--emerald))' },
            { label: 'Revenue', value: 'RWF 6.8M', icon: TrendingUp, color: 'hsl(43 96% 56%)' },
            { label: 'Avg Score', value: '79%', icon: BarChart3, color: 'hsl(200 90% 50%)' },
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

        <div className="glass-card p-5">
          <h2 className="font-semibold mb-4">Members</h2>
          <div className="space-y-3">
            {members.map((m, i) => (
              <div key={i} className="p-4 rounded-xl flex items-center justify-between"
                style={{ background: 'hsl(0 0% 6%)', border: '1px solid hsl(0 0% 12%)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: 'hsl(270 60% 60% / 0.2)', color: 'hsl(270 60% 60%)' }}>
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-sm flex items-center gap-1">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.crop} • {m.yield}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`tag text-xs ${m.status === 'Active' ? 'emerald' : 'warning'}`}>{m.status}</span>
                  <span className="text-sm font-bold mono" style={{ color: 'hsl(var(--emerald))' }}>{m.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
