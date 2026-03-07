import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Settings as SettingsIcon, Users, BookOpen, Globe, Sun, Moon } from 'lucide-react';
import { Language, languageNames, languageFlags } from '@/lib/translations';

const allLanguages: Language[] = ['en', 'rw', 'fr', 'sw', 'lg', 'zu'];

export default function SettingsPage() {
  const { user, language, setLanguage, theme, toggleTheme, t } = useApp();
  const [activeTab, setActiveTab] = useState<'general' | 'team' | 'about'>('general');

  const tabs = [
    { id: 'general', label: t('general'), icon: SettingsIcon },
    { id: 'team', label: t('team'), icon: Users },
    { id: 'about', label: t('about'), icon: BookOpen },
  ] as const;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in pb-24">
        <div>
          <h1 className="text-xl font-bold">⚙️ {t('settings')}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage your account & learn about AgriPio</p>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {tabs.map(tb => (
            <button key={tb.id} onClick={() => setActiveTab(tb.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
              style={activeTab === tb.id
                ? { background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }
                : { background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}>
              <tb.icon className="w-4 h-4" /> {tb.label}
            </button>
          ))}
        </div>

        {activeTab === 'general' && (
          <div className="space-y-4">
            {/* Theme */}
            <div className="glass-card p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                {theme === 'light' ? <Sun className="w-4 h-4" style={{ color: 'hsl(var(--gold))' }} /> : <Moon className="w-4 h-4" style={{ color: 'hsl(var(--sky))' }} />}
                {t('theme')}
              </h2>
              <div className="flex gap-3">
                {[
                  { mode: 'light' as const, label: t('lightMode'), desc: 'Sunny farm look' },
                  { mode: 'dark' as const, label: t('darkMode'), desc: 'Easy on eyes at night' },
                ].map(tm => (
                  <button key={tm.mode} onClick={toggleTheme}
                    className="flex-1 p-4 rounded-xl text-sm font-medium transition-all text-left"
                    style={theme === tm.mode
                      ? { background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }
                      : { background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}>
                    <div className="text-lg mb-1">{tm.label}</div>
                    <div className="text-xs text-muted-foreground">{tm.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language — All 6 */}
            <div className="glass-card p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
                {t('language')} 🌍
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {allLanguages.map(lang => (
                  <button key={lang} onClick={() => setLanguage(lang)}
                    className="px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
                    style={language === lang
                      ? { background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }
                      : { background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}>
                    <span className="text-lg">{languageFlags[lang]}</span>
                    <span>{languageNames[lang]}</span>
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
