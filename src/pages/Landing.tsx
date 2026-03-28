import { Leaf, Sparkles, Cpu, BookOpen, ShoppingCart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useApp } from '@/contexts/AppContext';

const features = [
  { icon: Sparkles, title: 'AI Farm Guide', desc: 'Smart crop advice powered by real AI', emoji: '🧠' },
  { icon: Cpu, title: 'IoT Sensors', desc: 'Real-time soil moisture & pH data', emoji: '📡' },
  { icon: BookOpen, title: 'IP Learning', desc: 'Protect your farming innovations', emoji: '📚' },
  { icon: ShoppingCart, title: 'Marketplace', desc: 'Sell crops directly to buyers', emoji: '🛒' },
];

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useApp();

  return (
    <div className="min-h-screen hero-bg hero-grid">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 h-14 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-emerald)' }}>
            <Leaf className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-sm tracking-wide">AGRIPIO</span>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <button onClick={() => navigate('/dashboard')} className="btn-emerald text-sm py-2 px-4">
              Dashboard
            </button>
          ) : (
            <>
              <button onClick={() => navigate('/auth')} className="btn-emerald-outline text-sm py-2 px-4">
                {t('signIn')}
              </button>
              <button onClick={() => navigate('/auth')} className="btn-emerald text-sm py-2 px-4">
                {t('getStarted')}
              </button>
            </>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 relative">
        <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(var(--emerald) / 0.08) 0%, transparent 70%)' }} />
        
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 animate-float"
          style={{ background: 'var(--gradient-emerald)', boxShadow: 'var(--shadow-emerald-strong)' }}>
          <Leaf className="w-8 h-8 text-primary-foreground" />
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-2xl animate-slide-up text-foreground">
          From Soil to Market
        </h1>
        <p className="text-lg md:text-xl mt-4 text-muted-foreground max-w-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Smart Farming Starts Here 🌱
        </p>
        <p className="text-sm mt-2 text-muted-foreground max-w-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {t('heroSubtitle')}
        </p>

        <div className="flex gap-3 mt-10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <button onClick={() => navigate(user ? '/dashboard' : '/auth')}
            className="btn-emerald flex items-center gap-2 text-base py-4 px-8">
            🌱 {t('getStarted')} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="glass-card p-6 text-center animate-slide-up" style={{ animationDelay: `${0.1 * i}s` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'hsl(var(--emerald) / 0.1)' }}>
                <span className="text-2xl">{f.emoji}</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-border">
        <p className="text-xs font-medium text-muted-foreground">© 2026 AgriPio Team</p>
        <p className="text-[10px] text-muted-foreground mt-1">KWIZERA Elissa, INEZA Elyon Ivo, INEZA Aliza, ISHIMWE Ornella</p>
      </footer>
    </div>
  );
}
