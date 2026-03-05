import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Settings as SettingsIcon, User, Shield, BookOpen, Users, Globe, Bell, Copyright, Lightbulb, ChevronRight, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const teamMembers = [
  { name: 'KWIZERA Elissa', role: 'Lead Developer & System Architect', avatar: 'KE', color: 'hsl(var(--emerald))' },
  { name: 'INEZA Elyon Ivo', role: 'AI & IoT Integration Engineer', avatar: 'IE', color: 'hsl(var(--sky))' },
  { name: 'INEZA Aliza', role: 'UI/UX Designer & Frontend Engineer', avatar: 'IA', color: 'hsl(270 60% 60%)' },
  { name: 'ISHIMWE Ornella', role: 'Backend & Data Analytics Lead', avatar: 'IO', color: 'hsl(var(--gold))' },
];

const ipConcepts = [
  { type: '🔒 Patent', title: '3-Chamber Smart Testing System', description: 'A novel agricultural IoT device with specialized testing chambers for Soil and Fertilizer analysis using integrated sensors and real-time data.', status: 'Patent Pending', color: 'hsl(var(--emerald))' },
  { type: '🔒 Patent', title: 'AI Production-Demand Alignment Engine', description: 'An intelligent matching algorithm correlating real-time agricultural production data with market demand signals.', status: 'Patent Pending', color: 'hsl(var(--emerald))' },
  { type: '©️ Copyright', title: 'AgriPio Signal-First UI Architecture', description: 'Proprietary dashboard design system featuring High-Impedance Status Hero, Quadrant Grid, and adaptive interfaces.', status: 'Copyright © 2026', color: 'hsl(var(--sky))' },
  { type: '🤫 Trade Secret', title: 'Market Optimization Algorithm', description: 'Proprietary logic analyzing commodity prices, weather, supply-demand, and farmer capacity for optimal timing.', status: 'Confidential', color: 'hsl(var(--gold))' },
  { type: '™️ Trademark', title: 'AgriPio Brand Identity', description: '"AgriPio" name, logo, tagline "Intelligent Agriculture from Soil to Market" and visual brand elements.', status: 'Trademark ™', color: 'hsl(270 60% 60%)' },
];

export default function SettingsPage() {
  const { user, language, setLanguage, theme, toggleTheme } = useApp();
  const [activeTab, setActiveTab] = useState<'general' | 'ip' | 'team' | 'about'>('general');

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'ip', label: 'Intellectual Property', icon: Shield },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'about', label: 'About', icon: BookOpen },
  ] as const;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">⚙️ Settings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage your account, view IP documentation & team info</p>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab !== t.id ? 'bg-secondary text-muted-foreground' : ''}`}
              style={activeTab === t.id
                ? { background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }
                : { border: '1px solid hsl(var(--border))' }}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'general' && (
          <div className="space-y-4">
            {/* Profile */}
            <div className="glass-card p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2"><User className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} /> Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Name', value: user?.name || 'AgriPio User' },
                  { label: 'Role', value: user?.role || 'farmer' },
                  { label: 'Email', value: 'user@agripio.rw' },
                  { label: 'Location', value: 'Rwanda' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-xs text-muted-foreground mb-1.5 block">{f.label}</label>
                    <div className="px-4 py-3 rounded-xl text-sm capitalize bg-secondary border border-border">
                      {f.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div className="glass-card p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                {theme === 'light' ? <Sun className="w-4 h-4" style={{ color: 'hsl(var(--gold))' }} /> : <Moon className="w-4 h-4" style={{ color: 'hsl(var(--sky))' }} />}
                Theme
              </h2>
              <div className="flex gap-3">
                {[
                  { mode: 'light' as const, label: '☀️ Light Mode', desc: 'Sunny farm greens' },
                  { mode: 'dark' as const, label: '🌙 Dark Mode', desc: 'Classic AgriPio' },
                ].map(t => (
                  <button key={t.mode} onClick={() => toggleTheme()}
                    className={`flex-1 p-4 rounded-xl text-sm font-medium transition-all text-left ${theme !== t.mode ? 'bg-secondary text-muted-foreground' : ''}`}
                    style={theme === t.mode
                      ? { background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }
                      : { border: '1px solid hsl(var(--border))' }}>
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
                    className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${language !== lang.code ? 'bg-secondary text-muted-foreground' : ''}`}
                    style={language === lang.code
                      ? { background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }
                      : { border: '1px solid hsl(var(--border))' }}>
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="glass-card p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2"><Bell className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} /> Notifications</h2>
              <div className="space-y-3">
                {['Weather Alerts', 'Market Price Updates', 'Disease Warnings', 'IoT Device Alerts', 'Marketplace Activity'].map(pref => (
                  <div key={pref} className="flex items-center justify-between p-3 rounded-xl bg-secondary border border-border">
                    <span className="text-sm">{pref}</span>
                    <div className="w-10 h-5 rounded-full flex items-center px-0.5" style={{ background: 'hsl(var(--emerald))', justifyContent: 'flex-end' }}>
                      <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* IP Learning Link */}
            <div className="glass-card p-5" style={{ border: '1px solid hsl(var(--sky) / 0.3)' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'hsl(var(--sky) / 0.15)' }}>
                  <Lightbulb className="w-6 h-6" style={{ color: 'hsl(var(--sky))' }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Learn IP for Agriculture</h3>
                  <p className="text-xs text-muted-foreground">Interactive tutorials on intellectual property</p>
                </div>
                <Link to="/dashboard/ip-learning" className="btn-emerald-outline flex items-center gap-2 text-sm">
                  Start <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ip' && (
          <div className="space-y-4">
            <div className="glass-card p-5" style={{ border: '1px solid hsl(var(--emerald) / 0.2)' }}>
              <h2 className="font-semibold mb-2">🛡️ Intellectual Property Portfolio</h2>
              <p className="text-sm text-muted-foreground">AgriPio's innovations protected through multiple IP mechanisms.</p>
            </div>
            {ipConcepts.map((ip, i) => (
              <div key={i} className="glass-card p-5 transition-all hover:scale-[1.005]" style={{ borderLeft: `3px solid ${ip.color}` }}>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-bold uppercase" style={{ color: ip.color }}>{ip.type}</span>
                  <span className="tag text-xs" style={{ background: ip.color + '15', color: ip.color }}>{ip.status}</span>
                </div>
                <h3 className="font-semibold text-base mb-2">{ip.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ip.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-4">
            <div className="glass-card p-5" style={{ border: '1px solid hsl(var(--emerald) / 0.2)' }}>
              <h2 className="font-semibold mb-2">👥 AgriPio Team</h2>
              <p className="text-sm text-muted-foreground">The engineers and designers behind AgriPio.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member, i) => (
                <div key={i} className="glass-card p-5 transition-all hover:scale-[1.01]" style={{ borderTop: `3px solid ${member.color}` }}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold"
                      style={{ background: member.color + '20', color: member.color }}>
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">{member.name}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="glass-card p-6 text-center" style={{ border: '1px solid hsl(var(--emerald) / 0.3)' }}>
              <div className="text-4xl mb-3">🌱</div>
              <h2 className="text-2xl font-bold mb-1">AgriPio</h2>
              <p className="text-sm" style={{ color: 'hsl(var(--emerald))' }}>Intelligent Agriculture from Soil to Market</p>
              <p className="text-xs text-muted-foreground mt-3">Version 2.0.0 • Built with ❤️ in Rwanda</p>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-semibold mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  '🔬 IoT Soil & Fertilizer Testing', '🌟 AgriGuide AI Chat Mentor', '📡 Real-time Monitoring', '🛒 Agricultural Marketplace',
                  '📊 Smart Analytics', '🌍 Multilingual (EN/RW)', '🎤 Voice Assistant', '📰 News Intelligence',
                  '📚 IP Learning Center', '📷 Media Capture', '🌦️ Weather Integration', '🏆 Certificates & Badges',
                ].map(f => (
                  <div key={f} className="text-xs p-2 rounded-lg bg-secondary">{f}</div>
                ))}
              </div>
            </div>
            <div className="text-center py-4">
              <p className="text-sm font-semibold" style={{ color: 'hsl(var(--emerald))' }}>
                <Copyright className="w-4 h-4 inline mr-1" />
                Copyright © 2026 AgriPio. All rights reserved.
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
