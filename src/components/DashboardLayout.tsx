import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/hooks/useAuth';
import {
  Leaf, LayoutDashboard, Cpu, Bell,
  Settings, Globe, LogOut, Sun, Moon, Sparkles, BookOpen, ShoppingCart, ChevronDown
} from 'lucide-react';
import { Language, languageNames, languageFlags } from '@/lib/translations';
import NotificationPanel from './NotificationPanel';
import IPLessonModal from './IPLessonModal';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Home', emoji: '🏠' },
  { path: '/dashboard/ai-guidance', icon: Sparkles, label: 'Guide', emoji: '🌟' },
  { path: '/dashboard/marketplace', icon: ShoppingCart, label: 'Market', emoji: '🛒' },
  { path: '/dashboard/devices', icon: Cpu, label: 'IoT', emoji: '📡' },
  { path: '/dashboard/settings', icon: Settings, label: 'Settings', emoji: '⚙️' },
];

const allLanguages: Language[] = ['en', 'rw', 'fr', 'sw', 'lg', 'zu'];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { unreadCount, language, setLanguage, theme, toggleTheme, t } = useApp();
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar - Desktop only */}
      {!isMobile && (
        <aside className="flex flex-col h-screen sticky top-0 w-[220px] bg-sidebar border-r border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--gradient-emerald)' }}>
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm tracking-wide">AGRIPIO</span>
          </div>

          {profile && (
            <div className="px-4 py-4 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'hsl(var(--emerald) / 0.2)', color: 'hsl(var(--emerald))' }}>
                  {profile.display_name?.charAt(0) || '?'}
                </div>
                <div>
                  <div className="text-sm font-medium truncate">{profile.display_name}</div>
                  <div className="text-xs capitalize" style={{ color: 'hsl(var(--emerald))' }}>{profile.role}</div>
                </div>
              </div>
            </div>
          )}

          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}
                  className={`nav-item ${active ? 'active' : ''}`}>
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.emoji} {item.label}</span>
                </Link>
              );
            })}
            <Link to="/dashboard/ip-learning"
              className={`nav-item ${location.pathname === '/dashboard/ip-learning' ? 'active' : ''}`}>
              <BookOpen className="w-4 h-4 flex-shrink-0" />
              <span>📚 IP</span>
            </Link>
          </nav>

          <div className="px-2 py-4 border-t border-sidebar-border space-y-1">
            <button className="nav-item w-full" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>{theme === 'light' ? t('darkMode') : t('lightMode')}</span>
            </button>
            <div className="relative">
              <button className="nav-item w-full" onClick={() => setShowLangPicker(!showLangPicker)}>
                <Globe className="w-4 h-4" />
                <span className="flex-1">{languageFlags[language]} {languageNames[language]}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {showLangPicker && (
                <div className="absolute bottom-full left-0 right-0 mb-1 rounded-xl overflow-hidden shadow-lg border border-border z-50"
                  style={{ background: 'hsl(var(--card))' }}>
                  {allLanguages.map(lang => (
                    <button key={lang} onClick={() => { setLanguage(lang); setShowLangPicker(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-all hover:bg-secondary"
                      style={language === lang ? { color: 'hsl(var(--emerald))', background: 'hsl(var(--emerald) / 0.1)' } : {}}>
                      <span>{languageFlags[lang]}</span>
                      <span>{languageNames[lang]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="nav-item w-full text-left" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--emerald) / 0.04), transparent 60%),
              radial-gradient(ellipse 60% 40% at 80% 100%, hsl(var(--sky) / 0.03), transparent 50%)
            `,
          }} />

        <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 h-14 bg-background/80 backdrop-blur-xl border-b border-border">
          {isMobile ? (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--gradient-emerald)' }}>
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm">AGRIPIO</span>
            </div>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-secondary">
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" style={{ color: 'hsl(var(--gold))' }} />}
            </button>
            <div className="relative">
              <button onClick={() => setShowLangPicker(!showLangPicker)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary border border-border flex items-center gap-1"
                style={{ color: 'hsl(var(--emerald))' }}>
                {languageFlags[language]} {language.toUpperCase()}
                <ChevronDown className="w-3 h-3" />
              </button>
              {showLangPicker && (
                <div className="absolute top-full right-0 mt-1 rounded-xl overflow-hidden shadow-lg border border-border z-50 min-w-[160px]"
                  style={{ background: 'hsl(var(--card))' }}>
                  {allLanguages.map(lang => (
                    <button key={lang} onClick={() => { setLanguage(lang); setShowLangPicker(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-all hover:bg-secondary"
                      style={language === lang ? { color: 'hsl(var(--emerald))', background: 'hsl(var(--emerald) / 0.1)' } : {}}>
                      <span>{languageFlags[lang]}</span>
                      <span>{languageNames[lang]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-secondary"
              onClick={() => setShowNotifications(!showNotifications)}>
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: 'hsl(var(--alert))' }}>
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {showNotifications && (
          <div className="absolute top-14 right-4 z-50 w-80 animate-slide-up">
            <NotificationPanel onClose={() => setShowNotifications(false)} />
          </div>
        )}

        <main className="flex-1 overflow-auto p-4 md:p-6 relative z-10">
          {children}
        </main>

        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-2 py-2 backdrop-blur-xl border-t border-border"
            style={{ background: 'hsl(var(--background) / 0.85)' }}>
            {navItems.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}
                  className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all min-w-[56px]"
                  style={{
                    color: active ? 'hsl(var(--emerald))' : 'hsl(var(--muted-foreground))',
                    background: active ? 'hsl(var(--emerald) / 0.1)' : 'transparent',
                  }}>
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      <IPLessonModal />
    </div>
  );
}
