import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Settings as SettingsIcon, User, Shield, BookOpen, Users, Globe, Bell, Lock, Copyright, Lightbulb, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const teamMembers = [
  { name: 'KWIZERA Elissa', role: 'Lead Developer & System Architect', avatar: 'KE', color: 'hsl(var(--emerald))' },
  { name: 'INEZA Elyon Ivo', role: 'AI & IoT Integration Engineer', avatar: 'IE', color: 'hsl(var(--sky))' },
  { name: 'INEZA Aliza', role: 'UI/UX Designer & Frontend Engineer', avatar: 'IA', color: 'hsl(270 60% 60%)' },
  { name: 'ISHIMWE Ornella', role: 'Backend & Data Analytics Lead', avatar: 'IO', color: 'hsl(var(--gold))' },
];

const ipConcepts = [
  {
    type: '🔒 Patent',
    title: '3-Chamber Smart Testing System',
    description: 'A novel agricultural IoT device architecture featuring three specialized testing chambers (Soil, Crop, Fertilizer) that simultaneously analyze multiple parameters using integrated sensors. The system provides real-time data transmission via MQTT/REST protocols to a cloud-based AI analysis engine.',
    status: 'Patent Pending',
    color: 'hsl(var(--emerald))',
  },
  {
    type: '🔒 Patent',
    title: 'AI Production-Demand Alignment Engine',
    description: 'An intelligent matching algorithm that correlates real-time agricultural production data (soil conditions, crop health, yield predictions) with market demand signals (buyer requests, price trends, regional shortages) to optimize farmer profitability and reduce food waste.',
    status: 'Patent Pending',
    color: 'hsl(var(--emerald))',
  },
  {
    type: '🔒 Patent',
    title: 'Agricultural Smart Matching Algorithm',
    description: 'A multi-factor scoring engine (0-100) that considers soil compatibility, crop alignment, timeline match, location proximity, quantity match, and profit margin to automatically pair farmers with buyers, investors with projects, and fertilizers with soil profiles.',
    status: 'Patent Pending',
    color: 'hsl(var(--emerald))',
  },
  {
    type: '©️ Copyright',
    title: 'AgriPio Signal-First UI Architecture',
    description: 'A proprietary dashboard design system featuring: High-Impedance Status Hero (central health gauge), 2x2 Quadrant Grid layout, Context Mode Switcher (Smart/Manual/Market/Production), and role-based adaptive interfaces. The glassmorphic dark theme with emerald accent system is uniquely designed for agricultural intelligence platforms.',
    status: 'Copyright © 2026',
    color: 'hsl(var(--sky))',
  },
  {
    type: '🤫 Trade Secret',
    title: 'Market Optimization Algorithm',
    description: 'Proprietary logic for analyzing commodity price trends, weather patterns, regional supply-demand dynamics, and farmer production capacity to generate optimal selling timing recommendations. The algorithm incorporates 12+ weighted variables including seasonality, transport costs, and quality degradation rates.',
    status: 'Confidential',
    color: 'hsl(var(--gold))',
  },
  {
    type: '🤫 Trade Secret',
    title: 'Smart Matching Scoring Logic',
    description: 'The internal weighting system and threshold calibration used in the matching engine. Includes adaptive learning from successful matches, geographic proximity scoring with transport cost modeling, and quality-price elasticity curves specific to East African agricultural markets.',
    status: 'Confidential',
    color: 'hsl(var(--gold))',
  },
  {
    type: '™️ Trademark',
    title: 'AgriPio Brand Identity',
    description: 'The "AgriPio" name, logo, tagline "Intelligent Agriculture from Soil to Market", the emerald-on-dark carbon color scheme, and all associated visual brand elements are registered trademarks. The brand represents innovation in bio-digital agricultural technology.',
    status: 'Trademark ™',
    color: 'hsl(270 60% 60%)',
  },
];

export default function SettingsPage() {
  const { user, language, setLanguage } = useApp();
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

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
              style={activeTab === t.id
                ? { background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }
                : { background: 'hsl(0 0% 8%)', color: 'hsl(var(--muted-foreground))', border: '1px solid hsl(0 0% 13%)' }}>
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
                  { label: 'Location', value: typeof user?.location === 'string' ? user.location : 'Rwanda' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-xs text-muted-foreground mb-1.5 block">{f.label}</label>
                    <div className="px-4 py-3 rounded-xl text-sm capitalize" style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(var(--border))' }}>
                      {f.value}
                    </div>
                  </div>
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
                      : { background: 'hsl(0 0% 8%)', color: 'hsl(var(--muted-foreground))', border: '1px solid hsl(0 0% 13%)' }}>
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
                  <div key={pref} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'hsl(0 0% 6%)', border: '1px solid hsl(0 0% 12%)' }}>
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
                  <p className="text-xs text-muted-foreground">Interactive W3Schools-style tutorials on intellectual property in agriculture</p>
                </div>
                <Link to="/dashboard/ip-learning" className="btn-emerald-outline flex items-center gap-2 text-sm">
                  Start Learning <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ip' && (
          <div className="space-y-4">
            <div className="glass-card p-5" style={{ border: '1px solid hsl(var(--emerald) / 0.2)', background: 'hsl(145 30% 5% / 0.7)' }}>
              <h2 className="font-semibold mb-2">🛡️ Intellectual Property Portfolio</h2>
              <p className="text-sm text-muted-foreground">AgriPio's innovations are protected through multiple IP mechanisms. Below is a summary of our IP assets, each designed to safeguard our technological and creative contributions to agricultural intelligence.</p>
            </div>

            {ipConcepts.map((ip, i) => (
              <div key={i} className="glass-card p-5 transition-all hover:scale-[1.005]" style={{ borderLeft: `3px solid ${ip.color}` }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{ip.type.split(' ')[0]}</span>
                    <span className="text-xs font-bold uppercase" style={{ color: ip.color }}>{ip.type.replace(/[^\w\s]/g, '').trim()}</span>
                  </div>
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
              <p className="text-sm text-muted-foreground">The talented engineers and designers behind AgriPio's bio-digital agricultural ecosystem.</p>
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
              <p className="text-xs text-muted-foreground mt-3">Version 1.0.0 • Built with ❤️ in Rwanda</p>
            </div>

            <div className="glass-card p-5">
              <h3 className="font-semibold mb-3">About AgriPio</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AgriPio is a smart bio-digital agricultural ecosystem that connects farmers, buyers, investors, suppliers, and cooperatives through AI-powered intelligence. Our platform integrates real-time IoT soil monitoring, AI crop guidance, weather intelligence, market demand analysis, and an agricultural marketplace — all designed to transform farming in East Africa and beyond.
              </p>
            </div>

            <div className="glass-card p-5">
              <h3 className="font-semibold mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  '🔬 3-Chamber IoT Testing', '🤖 AI Farm Advisor', '📡 Real-time Monitoring', '🛒 Agricultural Marketplace',
                  '📊 Smart Analytics', '🌍 Multilingual (EN/RW)', '🎤 Voice Assistant', '📰 News Intelligence',
                  '🔐 Role-based Access', '📷 Media Capture', '🌦️ Weather Integration', '🤝 Smart Matching',
                ].map(f => (
                  <div key={f} className="text-xs p-2 rounded-lg" style={{ background: 'hsl(0 0% 6%)' }}>{f}</div>
                ))}
              </div>
            </div>

            <div className="text-center py-4">
              <p className="text-sm font-semibold" style={{ color: 'hsl(var(--emerald))' }}>
                <Copyright className="w-4 h-4 inline mr-1" />
                Copyright © 2026 AgriPio. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">Smart Bio-Digital Agricultural Ecosystem</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
