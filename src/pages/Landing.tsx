import { Leaf, Zap, BarChart3, Globe, Shield, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

const features = [
  { icon: Leaf, label: 'AI Crop Guidance', desc: 'Soil-to-harvest AI planning', color: 'var(--emerald)' },
  { icon: Zap, label: 'IoT Soil Intelligence', desc: 'Real-time field sensors', color: 'var(--warning)' },
  { icon: BarChart3, label: 'Market Intelligence', desc: 'Live price & demand data', color: 'var(--sky)' },
  { icon: Globe, label: 'Smart Matching', desc: 'Connect buyers & investors', color: 'var(--gold)' },
  { icon: Shield, label: 'Disease Detection', desc: 'AI vision crop protection', color: 'var(--alert)' },
  { icon: Mic, label: 'Voice Assistant', desc: 'Hands-free farm control', color: 'var(--emerald-accent)' },
];

const stats = [
  { value: '12,400+', label: 'Farmers' },
  { value: '94%', label: 'Yield Accuracy' },
  { value: '38 Countries', label: 'Coverage' },
  { value: '$2.1M', label: 'ROI Generated' },
];

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useApp();

  return (
    <div className="min-h-screen hero-bg hero-grid text-foreground overflow-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-emerald)' }}>
            <Leaf className="w-5 h-5" style={{ color: 'hsl(0 0% 4%)' }} />
          </div>
          <span className="text-xl font-bold tracking-tight">AGRIPIO</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
          <a href="#stats" className="hover:text-emerald-400 transition-colors">Impact</a>
          <a href="#mission" className="hover:text-emerald-400 transition-colors">Mission</a>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-emerald-outline text-sm py-2 px-5" onClick={() => navigate('/onboarding')}>
            Sign In
          </button>
          <button className="btn-emerald text-sm py-2 px-5" onClick={() => navigate('/onboarding')}>
            {t('getStarted')}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-8 pt-24 pb-20 text-center max-w-5xl mx-auto">
        {/* Glow orb */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(145 100% 39% / 0.08) 0%, transparent 70%)' }} />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 animate-fade-in"
          style={{ borderColor: 'hsl(145 100% 39% / 0.3)', background: 'hsl(145 100% 39% / 0.05)' }}>
          <span className="status-dot online" />
          <span className="text-xs font-medium" style={{ color: 'hsl(145 100% 39%)' }}>AI Systems Online — Live Intelligence Active</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
          {t('heroTitle').split(' ').slice(0, 4).join(' ')}{' '}
          <span className="shimmer-text">{t('heroTitle').split(' ').slice(4).join(' ')}</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up delay-100">
          {t('heroSubtitle')}
        </p>

        <p className="text-emerald-400 font-medium mb-10 text-sm tracking-widest uppercase animate-fade-in delay-200"
          style={{ color: 'hsl(145 100% 39%)' }}>
          {t('tagline')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-200">
          <button className="btn-emerald text-base py-3 px-8" onClick={() => navigate('/onboarding')}>
            🌱 {t('getStarted')}
          </button>
          <button className="btn-emerald-outline text-base py-3 px-8" onClick={() => navigate('/dashboard')}>
            View Live Demo
          </button>
        </div>

        {/* Stats */}
        <div id="stats" className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-slide-up delay-300">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-5 text-center animate-emerald-glow">
              <div className="text-3xl font-bold mb-1 shimmer-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-3">Complete Agricultural Intelligence</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          From IoT sensors in your soil to real-time market prices — every tool a modern farmer needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={f.label} className={`glass-card p-6 animate-slide-up delay-${(i % 5 + 1) * 100}`}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `hsl(${f.color === 'var(--emerald)' ? '145 100% 39%' : f.color === 'var(--warning)' ? '45 100% 51%' : f.color === 'var(--sky)' ? '200 90% 50%' : f.color === 'var(--gold)' ? '43 96% 56%' : f.color === 'var(--alert)' ? '0 100% 66%' : '151 100% 45%'} / 0.15)` }}>
                <f.icon className="w-6 h-6" style={{ color: `hsl(${f.color === 'var(--emerald)' ? '145 100% 39%' : f.color === 'var(--warning)' ? '45 100% 51%' : f.color === 'var(--sky)' ? '200 90% 50%' : f.color === 'var(--gold)' ? '43 96% 56%' : f.color === 'var(--alert)' ? '0 100% 66%' : '151 100% 45%'})` }} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.label}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="px-8 py-20">
        <div className="max-w-4xl mx-auto glass-card p-12 text-center" style={{ border: '1px solid hsl(145 100% 39% / 0.2)' }}>
          <div className="text-5xl mb-6">🌍</div>
          <h2 className="text-3xl font-bold mb-4">Connecting Soil to Market</h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Agripio bridges the gap between smallholder farmers and global markets through AI intelligence, 
            IoT infrastructure, and smart financial ecosystems — empowering every farmer, from Rwanda to the world.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Government-Ready', 'Investor-Demo Ready', 'Patent-Aligned', 'Farmer-Centered', 'Scalable AI'].map(tag => (
              <span key={tag} className="tag emerald">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-8 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-emerald)' }}>
            <Leaf className="w-3.5 h-3.5" style={{ color: 'hsl(0 0% 4%)' }} />
          </div>
          <span className="font-bold text-foreground">AGRIPIO</span>
        </div>
        <p>Intelligent Agriculture from Soil to Market © 2024</p>
      </footer>
    </div>
  );
}
