import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import {
  Leaf, LayoutDashboard, ShoppingBag, Cpu, Camera, BarChart3,
  TrendingUp, Bell, Settings, ChevronRight,
  Mic, Globe, LogOut, Sun, Moon, Newspaper, Sparkles, BookOpen
} from 'lucide-react';
import VoiceAssistant from './VoiceAssistant';
import NotificationPanel from './NotificationPanel';
import IPLessonModal from './IPLessonModal';

const getNavItems = (role: string) => {
  const common = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'dashboard' },
  ];
  switch (role) {
    case 'farmer':
      return [
        ...common,
        { path: '/dashboard/ai-guidance', icon: Sparkles, label: 'AgriGuide' },
        { path: '/dashboard/ip-learning', icon: BookOpen, label: 'Learn IP' },
        { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'marketplace' },
        { path: '/dashboard/devices', icon: Cpu, label: 'devices' },
        { path: '/dashboard/capture', icon: Camera, label: 'capture' },
        { path: '/dashboard/market-intel', icon: TrendingUp, label: 'marketIntel' },
        { path: '/dashboard/analytics', icon: BarChart3, label: 'AI Advice' },
        { path: '/dashboard/news', icon: Newspaper, label: 'news' },
      ];
    case 'buyer':
      return [...common, { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'marketplace' }, { path: '/dashboard/market-intel', icon: TrendingUp, label: 'marketIntel' }, { path: '/dashboard/news', icon: Newspaper, label: 'news' }];
    case 'investor':
      return [...common, { path: '/dashboard/market-intel', icon: TrendingUp, label: 'marketIntel' }, { path: '/dashboard/analytics', icon: BarChart3, label: 'analytics' }, { path: '/dashboard/news', icon: Newspaper, label: 'news' }];
    case 'supplier':
      return [...common, { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'marketplace' }, { path: '/dashboard/market-intel', icon: TrendingUp, label: 'marketIntel' }, { path: '/dashboard/news', icon: Newspaper, label: 'news' }];
    case 'cooperative':
      return [...common, { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'marketplace' }, { path: '/dashboard/analytics', icon: BarChart3, label: 'analytics' }, { path: '/dashboard/news', icon: Newspaper, label: 'news' }];
    case 'admin':
      return [...common, { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'marketplace' }, { path: '/dashboard/devices', icon: Cpu, label: 'devices' }, { path: '/dashboard/market-intel', icon: TrendingUp, label: 'marketIntel' }, { path: '/dashboard/analytics', icon: BarChart3, label: 'analytics' }, { path: '/dashboard/news', icon: Newspaper, label: 'news' }];
    default:
      return common;
  }
};

const getFabConfig = (role: string) => {
  switch (role) {
    case 'farmer': return { label: '🌟 Chat with AgriGuide', path: '/dashboard/ai-guidance' };
    case 'buyer': return { label: '📋 Post Request', path: '/dashboard/marketplace' };
    case 'supplier': return { label: '📦 Add Product', path: '/dashboard/marketplace' };
    case 'investor': return { label: '💰 Fund Project', path: '/dashboard/market-intel' };
    default: return { label: '🌱 Get Started', path: '/dashboard' };
  }
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { t, user, sidebarOpen, setSidebarOpen, unreadCount, language, setLanguage, theme, toggleTheme } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const roleColors: Record<string, string> = {
    farmer: 'hsl(var(--emerald))',
    buyer: 'hsl(var(--sky))',
    investor: 'hsl(var(--gold))',
    supplier: 'hsl(var(--earth-light))',
    cooperative: 'hsl(270 60% 60%)',
    admin: 'hsl(var(--alert))',
  };

  const roleColor = roleColors[user?.role || 'farmer'];
  const navItems = getNavItems(user?.role || 'farmer');
  const fabConfig = getFabConfig(user?.role || 'farmer');

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar - Desktop */}
      {!isMobile && (
        <aside className="flex flex-col h-screen sticky top-0 transition-all duration-300 bg-sidebar border-r border-sidebar-border"
          style={{ width: sidebarOpen ? '240px' : '64px' }}>
          {/* Logo */}
          <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
            <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: 'var(--gradient-emerald)' }}>
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            {sidebarOpen && <span className="font-bold text-sm tracking-wide">AGRIPIO</span>}
          </div>

          {/* User */}
          {sidebarOpen && user && (
            <div className="px-4 py-4 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: roleColor + '25', color: roleColor }}>
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{user.name}</div>
                  <div className="text-xs capitalize" style={{ color: roleColor }}>{user.role}</div>
                </div>
              </div>
            </div>
          )}

          {/* Nav */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map(item => {
              const active = location.pathname === item.path || 
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              return (
                <Link key={item.path} to={item.path}
                  className={`nav-item ${active ? 'active' : ''}`}
                  title={!sidebarOpen ? (item.label === 'AgriGuide' || item.label === 'Learn IP' || item.label === 'AI Advice' ? item.label : t(item.label as any)) : undefined}>
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label === 'capture' ? 'Media Capture' : item.label === 'AgriGuide' ? '🌟 AgriGuide' : item.label === 'Learn IP' ? '📚 Learn IP' : item.label === 'AI Advice' ? 'AI Advice' : t(item.label as any)}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="px-2 py-4 border-t border-sidebar-border space-y-1">
            <button className="nav-item w-full" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="w-4 h-4 flex-shrink-0" /> : <Sun className="w-4 h-4 flex-shrink-0" />}
              {sidebarOpen && <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
            </button>
            <button className="nav-item w-full" onClick={() => setLanguage(language === 'en' ? 'rw' : 'en')}>
              <Globe className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span>{language === 'en' ? 'Kinyarwanda' : 'English'}</span>}
            </button>
            <Link to="/dashboard/settings" className="nav-item">
              <Settings className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span>{t('settings')}</span>}
            </Link>
            <button className="nav-item w-full text-left" onClick={() => navigate('/')}>
              <LogOut className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span>Sign Out</span>}
            </button>
          </div>

          {/* Collapse toggle */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-7 w-6 h-6 rounded-full flex items-center justify-center bg-muted border border-border text-muted-foreground">
            <ChevronRight className="w-3.5 h-3.5 transition-transform" style={{ transform: sidebarOpen ? 'rotate(180deg)' : 'none' }} />
          </button>
        </aside>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Soft nature gradient background */}
        <div className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--emerald) / 0.04), transparent 60%),
              radial-gradient(ellipse 60% 40% at 80% 100%, hsl(var(--sky) / 0.03), transparent 50%)
            `,
          }} />
        {/* Grid pattern overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(hsl(var(--emerald)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--emerald)) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        {/* Top bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 h-14 bg-background/80 backdrop-blur-xl border-b border-border">
          {isMobile && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-emerald)' }}>
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-sm">AGRIPIO</span>
            </div>
          )}
          {!isMobile && <div />}

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-secondary"
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}>
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" style={{ color: 'hsl(var(--gold))' }} />}
            </button>

            <button onClick={() => setLanguage(language === 'en' ? 'rw' : 'en')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-secondary border border-border"
              style={{ color: 'hsl(var(--emerald))' }}>
              {language.toUpperCase()}
            </button>

            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-secondary"
              onClick={() => { setShowNotifications(!showNotifications); setShowVoice(false); }}>
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'hsl(var(--alert))', color: 'white' }}>
                  {unreadCount}
                </span>
              )}
            </button>

            <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              onClick={() => { setShowVoice(!showVoice); setShowNotifications(false); }}
              style={{ background: showVoice ? 'hsl(var(--emerald) / 0.2)' : 'transparent' }}>
              <Mic className="w-4 h-4" style={{ color: showVoice ? 'hsl(var(--emerald))' : undefined }} />
            </button>

            {user && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
                style={{ background: roleColor + '25', color: roleColor }}>
                {user.name.charAt(0)}
              </div>
            )}
          </div>
        </header>

        {/* Notification Panel */}
        {showNotifications && (
          <div className="absolute top-14 right-4 z-50 w-80 animate-slide-up">
            <NotificationPanel onClose={() => setShowNotifications(false)} />
          </div>
        )}

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 relative z-10">
          {children}
        </main>

        {/* Mobile bottom nav */}
        {isMobile && (
          <nav className="bottom-nav flex items-center justify-around px-2 py-2 sticky bottom-0 z-40">
            {navItems.slice(0, 5).map(item => {
              const active = location.pathname === item.path || 
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              return (
                <Link key={item.path} to={item.path}
                  className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all"
                  style={{ color: active ? 'hsl(var(--emerald))' : 'hsl(var(--muted-foreground))', background: active ? 'hsl(var(--emerald) / 0.1)' : 'transparent' }}>
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px]">{item.label === 'AgriGuide' ? 'Guide' : item.label === 'Learn IP' ? 'IP' : item.label === 'capture' ? 'Capture' : t(item.label as any).split(' ')[0]}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      {/* Voice Assistant */}
      {showVoice && <VoiceAssistant onClose={() => setShowVoice(false)} />}

      {/* Daily IP Lesson Popup */}
      <IPLessonModal />

      {/* Role-specific FAB */}
      {!showVoice && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
          <button className="px-5 py-3 rounded-full flex items-center gap-2 text-sm font-semibold animate-emerald-glow shadow-lg"
            onClick={() => navigate(fabConfig.path)}
            style={{ background: 'var(--gradient-emerald)', color: 'hsl(var(--primary-foreground))' }}>
            {fabConfig.label}
          </button>
          <button className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary border border-border shadow-md"
            onClick={() => setShowVoice(true)}>
            <Mic className="w-5 h-5" style={{ color: 'hsl(var(--emerald))' }} />
          </button>
        </div>
      )}
    </div>
  );
}
