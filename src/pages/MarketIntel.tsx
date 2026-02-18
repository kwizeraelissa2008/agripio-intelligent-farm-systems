import DashboardLayout from '@/components/DashboardLayout';
import { TrendingUp, TrendingDown, BarChart3, Globe } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const priceData = [
  { month: 'Aug', maize: 280, tomatoes: 750, beans: 1100 },
  { month: 'Sep', maize: 295, tomatoes: 820, beans: 1050 },
  { month: 'Oct', maize: 310, tomatoes: 780, beans: 1150 },
  { month: 'Nov', maize: 325, tomatoes: 850, beans: 1200 },
  { month: 'Dec', maize: 340, tomatoes: 900, beans: 1180 },
  { month: 'Jan', maize: 350, tomatoes: 870, beans: 1220 },
];

const demandData = [
  { region: 'Kigali', demand: 95 },
  { region: 'Musanze', demand: 72 },
  { region: 'Rubavu', demand: 68 },
  { region: 'Huye', demand: 58 },
  { region: 'Rwamagana', demand: 45 },
];

const crops = [
  { name: 'Maize', price: 'RWF 350/kg', change: '+18%', trend: 'up', demand: 'Very High', supply: 'Medium', opportunity: 'Export' },
  { name: 'Tomatoes', price: 'RWF 900/kg', change: '+5%', trend: 'up', demand: 'High', supply: 'Low', opportunity: 'Local Markets' },
  { name: 'Beans', price: 'RWF 1,200/kg', change: '-3%', trend: 'down', demand: 'Medium', supply: 'High', opportunity: 'Hold for Q2' },
  { name: 'Avocado', price: 'RWF 450/kg', change: '+22%', trend: 'up', demand: 'Very High', supply: 'Low', opportunity: 'Export Premium' },
  { name: 'Cassava', price: 'RWF 250/kg', change: '+2%', trend: 'up', demand: 'High', supply: 'Medium', opportunity: 'Processing' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 text-xs">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: RWF {p.value}/kg</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MarketIntel() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Market Intelligence</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Live commodity prices • Regional demand • Export opportunities</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="status-dot online" />
            <span className="text-xs text-muted-foreground">Live data</span>
          </div>
        </div>

        {/* Market overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Market Opportunity', value: 'Maize Export', sub: 'Highest margin now', color: 'hsl(145 100% 39%)' },
            { label: 'Avg Price Index', value: '+8.4%', sub: 'vs last month', color: 'hsl(145 100% 39%)' },
            { label: 'Overproduction Risk', value: 'Beans', sub: 'Sell or store now', color: 'hsl(0 100% 66%)' },
            { label: 'Export Demand', value: 'Avocado +22%', sub: 'Premium market', color: 'hsl(43 96% 56%)' },
          ].map(s => (
            <div key={s.label} className="metric-card">
              <span className="text-xs text-muted-foreground block mb-2">{s.label}</span>
              <span className="text-lg font-bold block" style={{ color: s.color }}>{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.sub}</span>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-5">
            <h2 className="font-semibold mb-4">Crop Price Trends (RWF/kg)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={priceData}>
                <defs>
                  <linearGradient id="gMaize" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(145 100% 39%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(145 100% 39%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gTomatoes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0 100% 66%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(0 100% 66%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 15%)" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(120 10% 55%)', fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: 'hsl(120 10% 55%)', fontSize: 11 }} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="maize" stroke="hsl(145 100% 39%)" fill="url(#gMaize)" strokeWidth={2} name="maize" />
                <Area type="monotone" dataKey="tomatoes" stroke="hsl(0 100% 66%)" fill="url(#gTomatoes)" strokeWidth={2} name="tomatoes" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card p-5">
            <h2 className="font-semibold mb-4">Regional Demand Index</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={demandData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 15%)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'hsl(120 10% 55%)', fontSize: 11 }} axisLine={false} />
                <YAxis type="category" dataKey="region" tick={{ fill: 'hsl(120 10% 55%)', fontSize: 11 }} axisLine={false} width={70} />
                <Tooltip contentStyle={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 15%)', borderRadius: '8px' }} />
                <Bar dataKey="demand" fill="hsl(145 100% 39%)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crop table */}
        <div className="glass-card p-5 overflow-x-auto">
          <h2 className="font-semibold mb-4 flex items-center gap-2"><Globe className="w-4 h-4" style={{ color: 'hsl(145 100% 39%)' }} /> Commodity Overview</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: 'hsl(0 0% 12%)' }}>
                {['Crop', 'Current Price', '30d Change', 'Demand', 'Supply', 'AI Signal'].map(h => (
                  <th key={h} className="text-left py-2 pr-4 text-xs text-muted-foreground font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {crops.map(crop => (
                <tr key={crop.name} className="border-b" style={{ borderColor: 'hsl(0 0% 8%)' }}>
                  <td className="py-3 pr-4 font-medium">{crop.name}</td>
                  <td className="py-3 pr-4 font-semibold" style={{ color: 'hsl(145 100% 39%)' }}>{crop.price}</td>
                  <td className="py-3 pr-4">
                    <span className="flex items-center gap-1" style={{ color: crop.trend === 'up' ? 'hsl(145 100% 39%)' : 'hsl(0 100% 66%)' }}>
                      {crop.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {crop.change}
                    </span>
                  </td>
                  <td className="py-3 pr-4"><span className="tag">{crop.demand}</span></td>
                  <td className="py-3 pr-4"><span className="tag">{crop.supply}</span></td>
                  <td className="py-3"><span className="tag emerald">{crop.opportunity}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
