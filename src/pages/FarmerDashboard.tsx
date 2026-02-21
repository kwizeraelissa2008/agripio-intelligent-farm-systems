import { useApp } from '@/contexts/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import ModeSwitch from '@/components/ModeSwitch';
import {
  Thermometer, Droplets, Wind, Sun, AlertTriangle, 
  TrendingUp, TrendingDown, ArrowRight, Leaf, Zap,
  CloudRain, Activity, Target, ChevronRight
} from 'lucide-react';

const soilMetrics = [
  { label: 'pH Level', value: '6.2', unit: '', score: 78, icon: '🌱' },
  { label: 'Nitrogen', value: '45', unit: 'mg/kg', score: 62, icon: '⚗️' },
  { label: 'Phosphorus', value: '32', unit: 'mg/kg', score: 55, icon: '🔬' },
  { label: 'Potassium', value: '180', unit: 'mg/kg', score: 82, icon: '🧪' },
  { label: 'Moisture', value: '68', unit: '%', score: 68, icon: '💧' },
  { label: 'Salinity', value: '0.3', unit: 'dS/m', score: 90, icon: '🧂' },
];

const weatherData = [
  { label: 'Temperature', value: '24°C', icon: Thermometer, color: 'hsl(43 96% 56%)' },
  { label: 'Humidity', value: '72%', icon: Droplets, color: 'hsl(200 90% 50%)' },
  { label: 'Wind Speed', value: '12 km/h', icon: Wind, color: 'hsl(var(--emerald))' },
  { label: 'UV Index', value: '5 Mod', icon: Sun, color: 'hsl(45 100% 51%)' },
];

const alerts = [
  { type: 'warning', message: 'Heavy rainfall expected tomorrow. Check drainage.', icon: CloudRain, color: 'hsl(200 90% 50%)' },
  { type: 'critical', message: 'Late blight risk high for tomatoes. Inspect field.', icon: AlertTriangle, color: 'hsl(0 100% 66%)' },
  { type: 'info', message: 'Maize prices +18% in Kigali. Optimal sell window.', icon: TrendingUp, color: 'hsl(var(--emerald))' },
];

const aiInsights = [
  { title: 'Apply Fertilizer', desc: 'Nitrogen levels low. Apply 40kg/ha urea this week.', priority: 'High', color: 'hsl(45 100% 51%)' },
  { title: 'Irrigation Needed', desc: 'North field Zone B needs water in 6 hours.', priority: 'Medium', color: 'hsl(200 90% 50%)' },
  { title: 'Harvest Window', desc: 'Maize in Field A ready for harvest in 12 days.', priority: 'Low', color: 'hsl(var(--emerald))' },
];

const recentActivity = [
  { action: 'Soil test completed', field: 'Field A', time: '2h ago', status: 'done' },
  { action: 'Irrigation scheduled', field: 'Field B', time: '4h ago', status: 'active' },
  { action: 'Market listing approved', field: 'Maize 500kg', time: '1d ago', status: 'done' },
  { action: 'Media captured', field: 'Tomatoes', time: '2d ago', status: 'done' },
];

function ScoreMeter({ score, color }: { score: number; color: string }) {
  return (
    <div className="score-meter">
      <div className="score-meter-fill" style={{ width: `${score}%`, background: color }} />
    </div>
  );
}

export default function FarmerDashboard() {
  const { t, farmerMode, user } = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const healthScore = 74;
  const healthColor = healthScore >= 70 ? 'var(--emerald)' : healthScore >= 50 ? 'var(--warning)' : 'var(--alert)';
  const healthStatus = healthScore >= 70 ? 'Healthy' : healthScore >= 50 ? 'Warning' : 'Critical';

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold">{greeting}, {user?.name?.split(' ')[0] || 'Farmer'} 👋</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Farm Intelligence Dashboard • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <ModeSwitch />
        </div>

        {/* Signal-First: High-Impedance Status Hero */}
        <div className="glass-card p-6" style={{ border: `1px solid hsl(${healthColor} / 0.25)` }}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(0 0% 12%)" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke={`hsl(${healthColor})`} strokeWidth="8"
                  strokeDasharray={`${healthScore * 2.64} 264`} strokeLinecap="round"
                  style={{ filter: `drop-shadow(0 0 10px hsl(${healthColor} / 0.5))` }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold mono">{healthScore}</span>
                <span className="text-xs font-medium" style={{ color: `hsl(${healthColor})` }}>{healthStatus}</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: `hsl(${healthColor})` }}>
                Farm Performance Index
              </div>
              <div className="text-lg font-semibold mb-2">Your farm is performing well</div>
              <div className="text-sm text-muted-foreground mb-3">+6 points from last week • Apply AI recommendations to improve further</div>
              {/* 2x2 Quadrant Mini */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Soil Health', value: '74%', color: 'var(--emerald)' },
                  { label: 'Crop Status', value: 'Good', color: 'var(--emerald)' },
                  { label: 'Market Opp.', value: '+18%', color: 'var(--gold)' },
                  { label: 'Risk Alert', value: '2 Active', color: 'var(--alert)' },
                ].map(q => (
                  <div key={q.label} className="p-2 rounded-lg text-center" style={{ background: 'hsl(0 0% 8%)' }}>
                    <div className="text-xs text-muted-foreground">{q.label}</div>
                    <div className="text-sm font-bold" style={{ color: `hsl(${q.color})` }}>{q.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl animate-slide-in-left"
                style={{ background: alert.color + '12', border: `1px solid ${alert.color}30`, animationDelay: `${i * 0.1}s` }}>
                <alert.icon className="w-4 h-4 flex-shrink-0" style={{ color: alert.color }} />
                <span className="text-sm flex-1">{alert.message}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        )}

        {/* Weather */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {weatherData.map(w => (
            <div key={w.label} className="metric-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">{w.label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: w.color + '20' }}>
                  <w.icon className="w-4 h-4" style={{ color: w.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold live-metric">{w.value}</div>
            </div>
          ))}
        </div>

        {/* 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold">Soil Intelligence</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Live sensor data • Last sync: 12 min ago</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="status-dot online" />
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {soilMetrics.map(m => (
                <div key={m.label} className="p-3 rounded-xl" style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 12%)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{m.icon}</span>
                    <span className="text-xs text-muted-foreground">{m.label}</span>
                  </div>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-xl font-bold">{m.value}</span>
                    <span className="text-xs text-muted-foreground mb-0.5">{m.unit}</span>
                  </div>
                  <ScoreMeter score={m.score} 
                    color={m.score >= 80 ? 'hsl(var(--emerald))' : m.score >= 60 ? 'hsl(45 100% 51%)' : 'hsl(0 100% 66%)'} />
                  <span className="text-xs mt-1 block" style={{ 
                    color: m.score >= 80 ? 'hsl(var(--emerald))' : m.score >= 60 ? 'hsl(45 100% 51%)' : 'hsl(0 100% 66%)' 
                  }}>
                    {m.score}% optimal
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold">AI Action Plan</h2>
              <span className="mode-badge smart">Smart Mode</span>
            </div>
            <div className="space-y-3">
              {aiInsights.map((insight, i) => (
                <div key={i} className="p-3 rounded-xl" style={{ background: insight.color + '10', border: `1px solid ${insight.color}25` }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{insight.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: insight.color + '20', color: insight.color }}>
                      {insight.priority}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{insight.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-5">
              <h3 className="text-sm font-medium mb-3">7-Day Forecast</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={day} className="flex flex-col items-center gap-1 flex-shrink-0 px-2 py-2 rounded-lg"
                    style={{ background: i === 0 ? 'hsl(var(--emerald) / 0.15)' : 'hsl(0 0% 8%)' }}>
                    <span className="text-xs text-muted-foreground">{day}</span>
                    <span className="text-lg">{['☀️', '⛅', '🌧️', '🌧️', '⛅', '☀️', '☀️'][i]}</span>
                    <span className="text-xs font-medium">{[24, 22, 19, 20, 23, 25, 26][i]}°</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Market Snapshot</h2>
              <button className="text-xs flex items-center gap-1" style={{ color: 'hsl(var(--emerald))' }}>
                {t('viewAll')} <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { crop: 'Maize', price: 'RWF 350/kg', change: '+18%', trend: 'up', demand: 'High' },
                { crop: 'Tomatoes', price: 'RWF 800/kg', change: '+5%', trend: 'up', demand: 'Very High' },
                { crop: 'Beans', price: 'RWF 1,200/kg', change: '-3%', trend: 'down', demand: 'Medium' },
                { crop: 'Cassava', price: 'RWF 250/kg', change: '+2%', trend: 'up', demand: 'High' },
              ].map(item => (
                <div key={item.crop} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'hsl(0 0% 10%)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(0 0% 10%)' }}>
                      <span className="text-sm">🌾</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">{item.crop}</span>
                      <span className="text-xs text-muted-foreground ml-2">{item.demand} demand</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{item.price}</div>
                    <div className="flex items-center gap-1" style={{ color: item.trend === 'up' ? 'hsl(var(--emerald))' : 'hsl(0 100% 66%)' }}>
                      {item.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span className="text-xs">{item.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Recent Activity</h2>
              <Activity className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
            </div>
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: a.status === 'done' ? 'hsl(var(--emerald))' : 'hsl(45 100% 51%)' }} />
                  <div className="flex-1">
                    <span className="text-sm">{a.action}</span>
                    <span className="text-xs text-muted-foreground ml-2">• {a.field}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
