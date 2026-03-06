import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Settings as SettingsIcon, Users, BookOpen, Globe, Sun, Moon } from 'lucide-react';

export default function SettingsPage() {
  const { user, language, setLanguage, theme, toggleTheme } = useApp();
  const [activeTab, setActiveTab] = useState<'general' | 'team' | 'about'>('general');

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'about', label: 'About', icon: BookOpen },
  ] as const;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in pb-24">
        <div>
          <h1 className="text-xl font-bold">⚙️ Settings</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage your account & learn about AgriPio</p>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
              style={activeTab === t.id
                ? { background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }
                : { background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'general' && (
          <div className="space-y-4">
            {/* Theme */}
            <div className="glass-card p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                {theme === 'light' ? <Sun className="w-4 h-4" style={{ color: 'hsl(var(--gold))' }} /> : <Moon className="w-4 h-4" style={{ color: 'hsl(var(--sky))' }} />}
                Theme
              </h2>
              <div className="flex gap-3">
                {[
                  { mode: 'light' as const, label: '☀️ Light Mode', desc: 'Sunny farm look' },
                  { mode: 'dark' as const, label: '🌙 Dark Mode', desc: 'Easy on eyes at night' },
                ].map(t => (
                  <button key={t.mode} onClick={toggleTheme}
                    className="flex-1 p-4 rounded-xl text-sm font-medium transition-all text-left"
                    style={theme === t.mode
                      ? { background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }
                      : { background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}>
                    <div className="text-lg mb-1">{t.label}</div>
                    <div className="text-xs text-muted-foreground">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="glass-card p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2"><Globe className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} /> Language</h2>
              <div className="flex gap-3">
                {[{ code: 'en' as const, label: '🇬🇧 English' }, { code: 'rw' as const, label: '🇷🇼 Kinyarwanda' }].map(lang => (
                  <button key={lang.code} onClick={() => setLanguage(lang.code)}
                    className="px-5 py-3 rounded-xl text-sm font-medium transition-all"
                    style={language === lang.code
                      ? { background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }
                      : { background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}>
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="glass-card p-8 text-center">
            <div className="text-4xl mb-4">🏫</div>
            <h2 className="text-lg font-bold mb-2">This Product Was Proudly Created By</h2>
            <p className="text-base font-semibold" style={{ color: 'hsl(var(--emerald))' }}>
              IP Club from Ecole Des Sciences Byimana.
            </p>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="glass-card p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🌱</div>
              <h2 className="text-xl font-bold">AgriPio</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed text-center">
              AgriPio is a smart app and device for Rwandan farmers, featuring soil monitoring (moisture/pH), 
              AI guidance with IP advice, project tracking, Bluetooth/IoT integration for plant analysis 
              and Arduino data flow—all powered by Lovable AI for agriculture innovation.
            </p>
            <div className="text-center mt-6">
              <p className="text-xs font-medium" style={{ color: 'hsl(var(--emerald))' }}>© 2026 AgriPio Team</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
