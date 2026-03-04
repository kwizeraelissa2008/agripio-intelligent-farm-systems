import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import {
  Leaf, LayoutDashboard, ShoppingBag, Cpu, Camera, BarChart3,
  TrendingUp, Bell, Settings, Menu, X, ChevronRight,
  Mic, Globe, LogOut, User, Newspaper, Plus
} from 'lucide-react';
import VoiceAssistant from './VoiceAssistant';
import NotificationPanel from './NotificationPanel';
import IPLessonModal from './IPLessonModal';

// Role-specific nav items
const getNavItems = (role: string) => {
  const common = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'dashboard' },
  ];

  switch (role) {
    case 'farmer':
      return [
        ...common,
        { path: '/dashboard/ai-guidance', icon: Leaf, label: 'myProjects' },
        { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'marketplace' },
        { path: '/dashboard/devices', icon: Cpu, label: 'devices' },
        { path: '/dashboard/capture', icon: Camera, label: 'capture' },
        { path: '/dashboard/market-intel', icon: TrendingUp, label: 'marketIntel' },
        { path: '/dashboard/analytics', icon: BarChart3, label: 'AI Advice' },
        { path: '/dashboard/news', icon: Newspaper, label: 'news' },
      ];
    case 'buyer':
      return [
        ...common,
        { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'marketplace' },
        { path: '/dashboard/market-intel', icon: TrendingUp, label: 'marketIntel' },
        { path: '/dashboard/news', icon: Newspaper, label: 'news' },
      ];
    case 'investor':
      return [
        ...common,
        { path: '/dashboard/market-intel', icon: TrendingUp, label: 'marketIntel' },
        { path: '/dashboard/analytics', icon: BarChart3, label: 'analytics' },
        { path: '/dashboard/news', icon: Newspaper, label: 'news' },
      ];
    case 'supplier':
      return [
        ...common,
        { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'marketplace' },
        { path: '/dashboard/market-intel', icon: TrendingUp, label: 'marketIntel' },
        { path: '/dashboard/news', icon: Newspaper, label: 'news' },
      ];
    case 'cooperative':
      return [
        ...common,
        { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'marketplace' },
        { path: '/dashboard/analytics', icon: BarChart3, label: 'analytics' },
        { path: '/dashboard/news', icon: Newspaper, label: 'news' },
      ];
    case 'admin':
      return [
        ...common,
        { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'marketplace' },
        { path: '/dashboard/devices', icon: Cpu, label: 'devices' },
        { path: '/dashboard/market-intel', icon: TrendingUp, label: 'marketIntel' },
        { path: '/dashboard/analytics', icon: BarChart3, label: 'analytics' },
        { path: '/dashboard/news', icon: Newspaper, label: 'news' },
      ];
    default:
      return common;
  }
};

// Role-specific FAB config
const getFabConfig = (role: string) => {
  switch (role) {
    case 'farmer': return { label: '🌱 Start AI Project', path: '/dashboard/ai-guidance' };
    case 'buyer': return { label: '📋 Post Request', path: '/dashboard/marketplace' };
    case 'supplier': return { label: '📦 Add Product', path: '/dashboard/marketplace' };
    case 'investor': return { label: '💰 Fund Project', path: '/dashboard/market-intel' };
    default: return { label: '🌱 Get Started', path: '/dashboard' };
  }
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { t, user, sidebarOpen, setSidebarOpen, unreadCount, language, setLanguage } = useApp();
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
    buyer: 'hsl(200 90% 50%)',
    investor: 'hsl(43 96% 56%)',
    supplier: 'hsl(20 30% 50%)',
    cooperative: 'hsl(270 60% 60%)',
    admin: 'hsl(0 100% 66%)',
  };

  const roleColor = roleColors[user?.role || 'farmer'];
  const navItems = getNavItems(user?.role || 'farmer');
  const fabConfig = getFabConfig(user?.role || 'farmer');

  return (
    <div className="flex min-h-screen w-full" style={{ background: 'hsl(var(--background))' }}>
      {/* Sidebar - Desktop */}
      {!isMobile && (
        <aside className="flex flex-col h-screen sticky top-0 transition-all duration-300"
          style={{ 
            width: sidebarOpen ? '240px' : '64px', 
            background: 'hsl(var(--sidebar-background))', 
            borderRight: '1px solid hsl(var(--border))' 
          }}>
          {/* Logo */}
          <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
            <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: 'var(--gradient-emerald)' }}>
              <Leaf className="w-4 h-4" style={{ color: 'hsl(var(--primary-foreground))' }} />
            </div>
            {sidebarOpen && <span className="font-bold text-sm tracking-wide">AGRIPIO</span>}
          </div>

          {/* User */}
          {sidebarOpen && user && (
            <div className="px-4 py-4 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
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
                  title={!sidebarOpen ? t(item.label as any) : undefined}>
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {sidebarOpen && <span>{item.label === 'capture' ? 'Media Capture' : t(item.label as any)}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="px-2 py-4 border-t space-y-1" style={{ borderColor: 'hsl(var(--border))' }}>
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
            className="absolute -right-3 top-7 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: 'hsl(var(--muted))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
            <ChevronRight className="w-3.5 h-3.5" style={{ transform: sidebarOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
          </button>
        </aside>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 50% 0%, hsl(145 60% 8% / 0.4), transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 100%, hsl(200 40% 8% / 0.25), transparent 50%),
            linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(145 10% 4%) 50%, hsl(0 0% 4%) 100%)
          `,
          backgroundAttachment: 'fixed',
        }}>
        {/* Subtle grid pattern overlay */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(hsl(var(--emerald)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--emerald)) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 h-14"
          style={{ background: 'hsl(var(--sidebar-background) / 0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid hsl(var(--border))' }}>
          {isMobile && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-emerald)' }}>
                <Leaf className="w-4 h-4" style={{ color: 'hsl(var(--primary-foreground))' }} />
              </div>
              <span className="font-bold text-sm">AGRIPIO</span>
            </div>
          )}
          {!isMobile && <div />}

          <div className="flex items-center gap-2">
            <button onClick={() => setLanguage(language === 'en' ? 'rw' : 'en')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: 'hsl(var(--secondary))', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.2)' }}>
              {language.toUpperCase()}
            </button>

            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/5"
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
        <main className="flex-1 overflow-auto p-4 md:p-6">
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
                  <span className="text-xs">{item.label === 'capture' ? 'Capture' : t(item.label as any).split(' ')[0]}</span>
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
          {/* Main FAB */}
          <button className="px-5 py-3 rounded-full flex items-center gap-2 text-sm font-semibold animate-emerald-glow"
            onClick={() => navigate(fabConfig.path)}
            style={{ background: 'var(--gradient-emerald)', boxShadow: 'var(--shadow-emerald-strong)', color: 'hsl(var(--primary-foreground))' }}>
            {fabConfig.label}
          </button>
          {/* Voice FAB */}
          <button className="w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() => setShowVoice(true)}
            style={{ background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--emerald) / 0.3)' }}>
            <Mic className="w-5 h-5" style={{ color: 'hsl(var(--emerald))' }} />
          </button>
        </div>
      )}
    </div>
  );
}
