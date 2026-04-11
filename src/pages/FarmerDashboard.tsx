import { useAuth } from '@/hooks/useAuth';
import { useApp } from '@/contexts/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Droplets, Sparkles, AlertTriangle, ChevronRight, Leaf, Users, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const soilMetrics = [
  { label: 'Moisture Level', value: '68', unit: '%', score: 68, icon: '💧', tip: 'Adequate for most crops. Monitor during dry spells.' },
  { label: 'pH Level', value: '6.2', unit: 'pH', score: 78, icon: '🌱', tip: 'Slightly acidic — ideal for maize, beans, coffee.' },
];

const alerts = [
  { message: 'Nitrogen low — apply 40kg/ha compost this week.', icon: AlertTriangle, color: 'hsl(var(--warning))' },
  { message: 'Heavy rainfall expected tomorrow. Delay fertilizer.', icon: Droplets, color: 'hsl(var(--sky))' },
];

const aiAdvice = [
  { emoji: '🌾', title: 'Plant maize + beans together', desc: 'Intercropping increases yield by 25%.' },
  { emoji: '💧', title: 'Mulch your root zones', desc: 'Dry period expected in 5 days. Mulching retains moisture.' },
  { emoji: '🧪', title: 'Apply organic compost', desc: 'Nitrogen at 45 mg/kg is below ideal. Split 20kg now + 20kg in 2 weeks.' },
  { emoji: '🛡️', title: 'Protect your innovation!', desc: 'Got a unique farming method? Ask AgriGuide about IP rights!' },
];

function ScoreMeter({ score, color }: { score: number; color: string }) {
  return (
    <div className="w-full h-2 rounded-full overflow-hidden bg-secondary mt-2">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, background: color }} />
    </div>
  );
}

export default function FarmerDashboard() {
  const { profile } = useAuth();
  const { t } = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <DashboardLayout>
      <div className="space-y-5 animate-fade-in pb-24">
        <div>
          <h1 className="text-xl font-bold">{greeting}, {profile?.display_name?.split(' ')[0] || 'Farmer'} 👋</h1>
          <p className="text-muted-foreground text-xs mt-0.5">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Quick AI Guide Preview */}
        <Link to="/dashboard/ai-guidance"
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white transition-all hover:scale-[1.02] hover:shadow-xl cursor-pointer group block">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">AI Farm Guide</h3>
                <p className="text-emerald-100 text-sm">Get instant farming advice + IP protection tips</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
          </div>
        </Link>

        {/* Prominent Club Hub Button */}
        <Link to="/dashboard/club-hub"
          className="bg-gradient-to-r from-amber-400 to-amber-500 p-6 rounded-2xl text-white transition-all hover:scale-[1.02] hover:shadow-xl cursor-pointer group block">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Join Club Hub</h3>
                <p className="text-amber-100 text-sm">Connect with 20+ members & learn IP rights</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
          </div>
        </Link>

        {alerts.map((a, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: a.color + '10', border: `1px solid ${a.color}25` }}>
            <a.icon className="w-4 h-4 flex-shrink-0" style={{ color: a.color }} />
            <span className="text-sm flex-1">{a.message}</span>
          </div>
        ))}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-600" />
              Soil Intelligence
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">Live</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {soilMetrics.map(m => (
              <div key={m.label} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{m.icon}</span>
                  <span className="text-sm text-gray-600">{m.label}</span>
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-3xl font-bold text-gray-900">{m.value}</span>
                  <span className="text-sm text-gray-500 mb-1">{m.unit}</span>
                </div>
                <p className="text-xs text-gray-600">{m.tip}</p>
                <ScoreMeter score={m.score}
                  color={m.score >= 70 ? '#10b981' : m.score >= 50 ? '#f59e0b' : '#ef4444'} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            AI Quick Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {aiAdvice.map((a, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all hover:shadow-md hover:scale-[1.01]"
                style={{ borderLeft: `3px solid #10b981` }}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{a.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">{a.title}</h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link to="/dashboard/my-projects" className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center transition-all hover:shadow-md hover:scale-[1.01]">
            <TrendingUp className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-900">My Projects</p>
          </Link>
          <Link to="/dashboard/ip-learning" className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center transition-all hover:shadow-md hover:scale-[1.01]">
            <Shield className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-900">IP Learning</p>
          </Link>
          <Link to="/dashboard/devices" className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center transition-all hover:shadow-md hover:scale-[1.01]">
            <Droplets className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-900">IoT Devices</p>
          </Link>
          <Link to="/dashboard/settings" className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center transition-all hover:shadow-md hover:scale-[1.01]">
            <AlertTriangle className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-900">Settings</p>
          </Link>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs font-medium text-emerald-600">© 2026 AgriPio Team</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
