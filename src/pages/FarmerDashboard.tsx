import { useAuth } from '@/hooks/useAuth';
import { useApp } from '@/contexts/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Droplets, Sparkles, AlertTriangle, ChevronRight, Leaf } from 'lucide-react';
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
  { emoji: '📈', title: 'Market opportunity', desc: 'Tomatoes at RWF 900/kg in Kigali. Best time to sell!' },
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

        {alerts.map((a, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: a.color + '10', border: `1px solid ${a.color}25` }}>
            <a.icon className="w-4 h-4 flex-shrink-0" style={{ color: a.color }} />
            <span className="text-sm flex-1">{a.message}</span>
          </div>
        ))}

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <Leaf className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
              {t('soilIntelligence')}
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="status-dot online" />
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {soilMetrics.map(m => (
              <div key={m.label} className="p-4 rounded-xl bg-secondary border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{m.icon}</span>
                  <span className="text-sm text-muted-foreground">{m.label}</span>
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-3xl font-bold">{m.value}</span>
                  <span className="text-sm text-muted-foreground mb-1">{m.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground">{m.tip}</p>
                <ScoreMeter score={m.score}
                  color={m.score >= 70 ? 'hsl(var(--emerald))' : m.score >= 50 ? 'hsl(var(--warning))' : 'hsl(var(--alert))'} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
            {t('aiAdvice')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {aiAdvice.map((a, i) => (
              <div key={i} className="glass-card p-4 transition-all hover:scale-[1.01]"
                style={{ borderLeft: `3px solid hsl(var(--emerald) / ${0.4 + i * 0.1})` }}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{a.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-sm">{a.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link to="/dashboard/ai-guidance"
          className="glass-card p-5 flex items-center gap-4 transition-all hover:scale-[1.01] cursor-pointer group block"
          style={{ border: '1px solid hsl(var(--emerald) / 0.3)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--gradient-emerald)' }}>
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold group-hover:text-primary transition-colors">{t('chatWithGuide')}</h3>
            <p className="text-xs text-muted-foreground">{t('projectCreation')}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </Link>

        <div className="text-center pt-2">
          <p className="text-xs font-medium" style={{ color: 'hsl(var(--emerald))' }}>© 2026 AgriPio Team</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
