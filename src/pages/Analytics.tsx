import DashboardLayout from '@/components/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';

const yieldData = [
  { month: 'Aug', yield: 3200, target: 4000 },
  { month: 'Sep', yield: 3800, target: 4000 },
  { month: 'Oct', yield: 4200, target: 4000 },
  { month: 'Nov', yield: 3900, target: 4200 },
  { month: 'Dec', yield: 4500, target: 4200 },
  { month: 'Jan', yield: 4800, target: 4500 },
];

const profitData = [
  { month: 'Aug', profit: 420000, expenses: 180000 },
  { month: 'Sep', profit: 560000, expenses: 210000 },
  { month: 'Oct', profit: 740000, expenses: 195000 },
  { month: 'Nov', profit: 680000, expenses: 220000 },
  { month: 'Dec', profit: 920000, expenses: 240000 },
  { month: 'Jan', profit: 1100000, expenses: 260000 },
];

const waterData = [
  { week: 'W1', usage: 45 }, { week: 'W2', usage: 52 }, { week: 'W3', usage: 38 },
  { week: 'W4', usage: 61 }, { week: 'W5', usage: 44 }, { week: 'W6', usage: 39 },
];

const chartStyle = { background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 15%)', borderRadius: '8px', fontSize: '11px' };

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">Farm Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Performance trends • Yield insights • Financial overview</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Yield (Season)', value: '24,400 kg', change: '+12%', positive: true },
            { label: 'Net Profit', value: 'RWF 4.2M', change: '+28%', positive: true },
            { label: 'Water Efficiency', value: '84%', change: '+5%', positive: true },
            { label: 'Crop Loss Rate', value: '3.2%', change: '-1.1%', positive: true },
          ].map(kpi => (
            <div key={kpi.label} className="metric-card">
              <span className="text-xs text-muted-foreground block mb-2">{kpi.label}</span>
              <span className="text-xl font-bold block">{kpi.value}</span>
              <span className="text-xs" style={{ color: kpi.positive ? 'hsl(145 100% 39%)' : 'hsl(0 100% 66%)' }}>{kpi.change} vs last season</span>
            </div>
          ))}
        </div>

        {/* Yield Trend */}
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-4">Yield Performance (kg/ha)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={yieldData}>
              <defs>
                <linearGradient id="gYield" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(145 100% 39%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(145 100% 39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 15%)" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(120 10% 55%)', fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: 'hsl(120 10% 55%)', fontSize: 11 }} axisLine={false} />
              <Tooltip contentStyle={chartStyle} />
              <Area type="monotone" dataKey="yield" stroke="hsl(145 100% 39%)" fill="url(#gYield)" strokeWidth={2} name="Actual Yield" />
              <Line type="monotone" dataKey="target" stroke="hsl(45 100% 51%)" strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profit */}
          <div className="glass-card p-5">
            <h2 className="font-semibold mb-4">Revenue vs Expenses (RWF)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 15%)" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(120 10% 55%)', fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: 'hsl(120 10% 55%)', fontSize: 11 }} axisLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                <Tooltip contentStyle={chartStyle} formatter={(v: any) => [`RWF ${v.toLocaleString()}`, '']} />
                <Bar dataKey="profit" fill="hsl(145 100% 39%)" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="expenses" fill="hsl(0 100% 66% / 0.6)" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Water */}
          <div className="glass-card p-5">
            <h2 className="font-semibold mb-4">Water Usage (mm/week)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={waterData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 15%)" />
                <XAxis dataKey="week" tick={{ fill: 'hsl(120 10% 55%)', fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: 'hsl(120 10% 55%)', fontSize: 11 }} axisLine={false} />
                <Tooltip contentStyle={chartStyle} />
                <Line type="monotone" dataKey="usage" stroke="hsl(200 90% 50%)" strokeWidth={2} dot={{ fill: 'hsl(200 90% 50%)', r: 4 }} name="Water (mm)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
