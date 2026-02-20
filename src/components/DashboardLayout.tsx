import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import {
  Leaf, LayoutDashboard, ShoppingBag, Cpu, Eye, BarChart3,
  TrendingUp, Bell, Settings, Menu, X, ChevronRight,
  Mic, Globe, LogOut, User, Newspaper
} from 'lucide-react';
import VoiceAssistant from './VoiceAssistant';
import NotificationPanel from './NotificationPanel';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'dashboard' },
  { path: '/dashboard/ai-guidance', icon: Leaf, label: 'myProjects' },
  { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'marketplace' },
  { path: '/dashboard/devices', icon: Cpu, label: 'devices' },
  { path: '/dashboard/vision', icon: Eye, label: 'visionAI' },
  { path: '/dashboard/market-intel', icon: TrendingUp, label: 'marketIntel' },
  { path: '/dashboard/analytics', icon: BarChart3, label: 'analytics' },
  { path: '/dashboard/news', icon: Newspaper, label: 'news' },
];

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
    farmer: 'hsl(145 100% 39%)',
    buyer: 'hsl(200 90% 50%)',
    investor: 'hsl(43 96% 56%)',
    supplier: 'hsl(14 24% 34%)',
    cooperative: 'hsl(270 60% 60%)',
    admin: 'hsl(0 100% 66%)',
  };

  const roleColor = roleColors[user?.role || 'farmer'];

  return (
    <div className="flex min-h-screen w-full" style={{ background: 'hsl(0 0% 4%)' }}>
      {/* Sidebar - Desktop */}
      {!isMobile && (
        <aside className="flex flex-col h-screen sticky top-0 transition-all duration-300"
          style={{ 
            width: sidebarOpen ? '240px' : '64px', 
            background: 'hsl(0 0% 5%)', 
            borderRight: '1px solid hsl(0 0% 10%)' 
          }}>
          {/* Logo */}
          <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: 'hsl(0 0% 10%)' }}>
            <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: 'var(--gradient-emerald)' }}>
              <Leaf className="w-4 h-4" style={{ color: 'hsl(0 0% 4%)' }} />
            </div>
            {sidebarOpen && <span className="font-bold text-sm tracking-wide">AGRIPIO</span>}
          </div>

          {/* User */}
          {sidebarOpen && user && (
            <div className="px-4 py-4 border-b" style={{ borderColor: 'hsl(0 0% 10%)' }}>
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
                  {sidebarOpen && <span>{t(item.label as any)}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="px-2 py-4 border-t space-y-1" style={{ borderColor: 'hsl(0 0% 10%)' }}>
            <button className="nav-item w-full" onClick={() => setLanguage(language === 'en' ? 'rw' : 'en')}
              title={!sidebarOpen ? (language === 'en' ? 'Kinyarwanda' : 'English') : undefined}>
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
            style={{ background: 'hsl(0 0% 12%)', border: '1px solid hsl(0 0% 20%)', color: 'hsl(120 10% 55%)' }}>
            <ChevronRight className="w-3.5 h-3.5" style={{ transform: sidebarOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
          </button>
        </aside>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 h-14"
          style={{ background: 'hsl(0 0% 5% / 0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid hsl(0 0% 10%)' }}>
          
          {isMobile && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-emerald)' }}>
                <Leaf className="w-4 h-4" style={{ color: 'hsl(0 0% 4%)' }} />
              </div>
              <span className="font-bold text-sm">AGRIPIO</span>
            </div>
          )}
          {!isMobile && <div />}

          <div className="flex items-center gap-2">
            {/* Lang toggle */}
            <button onClick={() => setLanguage(language === 'en' ? 'rw' : 'en')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: 'hsl(0 0% 10%)', color: 'hsl(145 100% 39%)', border: '1px solid hsl(145 100% 39% / 0.2)' }}>
              {language.toUpperCase()}
            </button>

            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/5"
              onClick={() => { setShowNotifications(!showNotifications); setShowVoice(false); }}>
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'hsl(0 100% 66%)', color: 'white' }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Voice */}
            <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              onClick={() => { setShowVoice(!showVoice); setShowNotifications(false); }}
              style={{ background: showVoice ? 'hsl(145 100% 39% / 0.2)' : 'transparent' }}>
              <Mic className="w-4 h-4" style={{ color: showVoice ? 'hsl(145 100% 39%)' : undefined }} />
            </button>

            {/* User avatar */}
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
                  style={{ color: active ? 'hsl(145 100% 39%)' : 'hsl(120 10% 55%)', background: active ? 'hsl(145 100% 39% / 0.1)' : 'transparent' }}>
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs">{t(item.label as any).split(' ')[0]}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      {/* Voice Assistant */}
      {showVoice && <VoiceAssistant onClose={() => setShowVoice(false)} />}

      {/* Floating Voice Button */}
      {!showVoice && (
        <button className="fixed bottom-20 md:bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-50 animate-emerald-glow"
          onClick={() => setShowVoice(true)}
          style={{ background: 'var(--gradient-emerald)', boxShadow: 'var(--shadow-emerald-strong)' }}>
          <Mic className="w-6 h-6" style={{ color: 'hsl(0 0% 4%)' }} />
        </button>
      )}
    </div>
  );
}
