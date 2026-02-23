import DashboardLayout from '@/components/DashboardLayout';
import { Leaf, Droplets, Sun, Bug, TrendingUp, AlertTriangle, Lightbulb, Heart, Shield, Zap, Sprout, CloudRain } from 'lucide-react';

const adviceCards = [
  {
    title: 'Soil Fertility Boost',
    icon: Leaf,
    advice: 'Your nitrogen levels are 22% below optimal. Apply 40kg/ha of urea within the next 7 days to maximize crop uptake during the vegetative growth phase. Consider splitting application into two doses for better absorption.',
    action: 'Apply urea fertilizer this week',
    priority: 'High',
    bgGradient: 'linear-gradient(135deg, hsl(145 60% 8%), hsl(145 40% 12%))',
    borderColor: 'hsl(var(--emerald) / 0.4)',
    iconColor: 'hsl(var(--emerald))',
    badgeColor: 'hsl(var(--emerald))',
  },
  {
    title: 'Water Management',
    icon: Droplets,
    advice: 'Rainfall forecast shows 45mm expected in the next 3 days. Reduce irrigation by 60% to prevent waterlogging. Monitor drainage channels and ensure they are clear to avoid root rot in your tomato fields.',
    action: 'Reduce irrigation immediately',
    priority: 'Urgent',
    bgGradient: 'linear-gradient(135deg, hsl(200 60% 8%), hsl(200 40% 12%))',
    borderColor: 'hsl(var(--sky) / 0.4)',
    iconColor: 'hsl(var(--sky))',
    badgeColor: 'hsl(var(--sky))',
  },
  {
    title: 'Pest & Disease Alert',
    icon: Bug,
    advice: 'Late blight risk is HIGH in your region due to warm humid conditions (72% humidity, 24°C). Inspect tomato plants for dark spots on leaves. Apply copper-based fungicide preventively within 48 hours.',
    action: 'Inspect fields & apply fungicide',
    priority: 'Critical',
    bgGradient: 'linear-gradient(135deg, hsl(0 60% 8%), hsl(0 40% 12%))',
    borderColor: 'hsl(var(--alert) / 0.4)',
    iconColor: 'hsl(var(--alert))',
    badgeColor: 'hsl(var(--alert))',
  },
  {
    title: 'Market Timing Strategy',
    icon: TrendingUp,
    advice: 'Maize prices are trending upward (+18% this month) driven by export demand from East Africa. Hold your harvest for 2 more weeks for maximum profit. Expected peak price: RWF 380/kg by end of month.',
    action: 'Delay selling for 2 weeks',
    priority: 'Opportunity',
    bgGradient: 'linear-gradient(135deg, hsl(43 60% 8%), hsl(43 40% 12%))',
    borderColor: 'hsl(var(--gold) / 0.4)',
    iconColor: 'hsl(var(--gold))',
    badgeColor: 'hsl(var(--gold))',
  },
  {
    title: 'Crop Rotation Plan',
    icon: Sprout,
    advice: 'After harvesting beans in Field B, plant maize in the next season. The nitrogen fixed by bean roots will naturally boost maize growth by 15-20%. This rotation reduces fertilizer costs by RWF 25,000/ha.',
    action: 'Plan maize planting in Field B',
    priority: 'Recommended',
    bgGradient: 'linear-gradient(135deg, hsl(270 40% 8%), hsl(270 30% 12%))',
    borderColor: 'hsl(270 60% 50% / 0.4)',
    iconColor: 'hsl(270 60% 60%)',
    badgeColor: 'hsl(270 60% 60%)',
  },
  {
    title: 'Climate Adaptation',
    icon: CloudRain,
    advice: 'Seasonal forecast indicates El Niño conditions for the next 3 months — expect 30% above-average rainfall. Switch to drought-resistant crop varieties is unnecessary, but improve drainage infrastructure immediately.',
    action: 'Upgrade field drainage systems',
    priority: 'Seasonal',
    bgGradient: 'linear-gradient(135deg, hsl(180 40% 8%), hsl(180 30% 12%))',
    borderColor: 'hsl(180 60% 40% / 0.4)',
    iconColor: 'hsl(180 60% 50%)',
    badgeColor: 'hsl(180 60% 50%)',
  },
  {
    title: 'Investment Opportunity',
    icon: Lightbulb,
    advice: 'Avocado export demand from Europe is growing 22% year-over-year. Your altitude (1,800m) is ideal for Hass avocados. Consider dedicating 0.5ha to avocado trees — ROI begins in year 3 with RWF 2M+/year potential.',
    action: 'Start avocado planting project',
    priority: 'Long-term',
    bgGradient: 'linear-gradient(135deg, hsl(50 50% 8%), hsl(50 40% 12%))',
    borderColor: 'hsl(50 80% 50% / 0.4)',
    iconColor: 'hsl(50 80% 55%)',
    badgeColor: 'hsl(50 80% 55%)',
  },
  {
    title: 'Soil Health Protection',
    icon: Shield,
    advice: 'Soil organic matter at 2.1% is declining. Apply 5 tons/ha of compost before the next planting season. Mulching with crop residues will also improve moisture retention by 30% and protect beneficial soil organisms.',
    action: 'Source compost for application',
    priority: 'Important',
    bgGradient: 'linear-gradient(135deg, hsl(20 40% 8%), hsl(20 30% 12%))',
    borderColor: 'hsl(var(--earth-light) / 0.4)',
    iconColor: 'hsl(var(--earth-light))',
    badgeColor: 'hsl(var(--earth-light))',
  },
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">🧠 AI Farm Advice</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Personalized, actionable intelligence for your farm — updated daily by AI</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Advice', value: '8', icon: Lightbulb, color: 'hsl(var(--gold))' },
            { label: 'Critical Alerts', value: '2', icon: AlertTriangle, color: 'hsl(var(--alert))' },
            { label: 'Farm Score', value: '74/100', icon: Heart, color: 'hsl(var(--emerald))' },
            { label: 'Actions Completed', value: '12', icon: Zap, color: 'hsl(var(--sky))' },
          ].map(kpi => (
            <div key={kpi.label} className="metric-card">
              <div className="flex items-center gap-2 mb-2">
                <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
                <span className="text-xs text-muted-foreground">{kpi.label}</span>
              </div>
              <span className="text-2xl font-bold block" style={{ color: kpi.color }}>{kpi.value}</span>
            </div>
          ))}
        </div>

        {/* Advice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adviceCards.map((card, i) => (
            <div key={i} className="rounded-2xl p-5 transition-all hover:scale-[1.01]"
              style={{ background: card.bgGradient, border: `1px solid ${card.borderColor}` }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: card.iconColor + '20' }}>
                  <card.icon className="w-5 h-5" style={{ color: card.iconColor }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{card.title}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: card.badgeColor + '20', color: card.badgeColor }}>
                      {card.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.advice}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: `1px solid ${card.borderColor}` }}>
                <span className="text-xs font-medium" style={{ color: card.iconColor }}>
                  ✅ {card.action}
                </span>
                <button className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{ background: card.iconColor + '20', color: card.iconColor, border: `1px solid ${card.borderColor}` }}>
                  Apply Advice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
