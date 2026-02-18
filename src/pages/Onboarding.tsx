import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, UserRole } from '@/contexts/AppContext';
import { Language } from '@/lib/translations';
import { 
  Leaf, ChevronRight, ChevronLeft, MapPin, Eye, EyeOff, 
  Camera, Mic, Bell, Check, User, ShoppingCart, TrendingUp, 
  Truck, Users, Shield
} from 'lucide-react';

type Step = 'language' | 'role' | 'register' | 'permissions';

const roles: { id: UserRole; icon: any; emoji: string }[] = [
  { id: 'farmer', icon: Leaf, emoji: '🌾' },
  { id: 'buyer', icon: ShoppingCart, emoji: '🛒' },
  { id: 'investor', icon: TrendingUp, emoji: '📈' },
  { id: 'supplier', icon: Truck, emoji: '🚚' },
  { id: 'cooperative', icon: Users, emoji: '🤝' },
  { id: 'admin', icon: Shield, emoji: '⚙️' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { t, setLanguage, language, setUser, setIsAuthenticated } = useApp();
  const [step, setStep] = useState<Step>('language');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);
  const [form, setForm] = useState({
    name: '', nationalId: '', phone: '', email: '', password: '', farmSize: ''
  });

  const handleDetectLocation = () => {
    setDetecting(true);
    setTimeout(() => { setDetecting(false); setLocationDetected(true); }, 1500);
  };

  const handleRegister = () => {
    setStep('permissions');
  };

  const handleFinish = () => {
    setUser({
      id: '1',
      name: form.name || 'Demo User',
      role: selectedRole || 'farmer',
      email: form.email || 'demo@agripio.com',
      phone: form.phone || '+250 700 000 000',
      farmSize: selectedRole === 'farmer' ? parseFloat(form.farmSize) || 2.5 : undefined,
      location: locationDetected ? { lat: -1.9441, lng: 30.0619 } : undefined,
      farmerMode: 'smart',
      verified: false,
    });
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const stepIndex = { language: 0, role: 1, register: 2, permissions: 3 };
  const progress = ((stepIndex[step] + 1) / 4) * 100;

  return (
    <div className="min-h-screen hero-bg hero-grid flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-emerald)' }}>
            <Leaf className="w-5 h-5" style={{ color: 'hsl(0 0% 4%)' }} />
          </div>
          <span className="text-2xl font-bold">AGRIPIO</span>
        </div>

        {/* Progress */}
        <div className="score-meter mb-8">
          <div className="score-meter-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="glass-card p-8 animate-slide-up">
          
          {/* Step 1: Language */}
          {step === 'language' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">{t('selectLanguage')}</h2>
              <p className="text-muted-foreground mb-8 text-sm">Hitamo ururimi / Choose your language</p>
              <div className="grid grid-cols-2 gap-4">
                {(['en', 'rw'] as Language[]).map(lang => (
                  <button key={lang} onClick={() => { setLanguage(lang); }}
                    className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                      language === lang 
                        ? 'border-emerald-500 bg-emerald-500/10' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                    style={language === lang ? { borderColor: 'hsl(145 100% 39%)', background: 'hsl(145 100% 39% / 0.1)' } : {}}>
                    <span className="text-3xl">{lang === 'en' ? '🇬🇧' : '🇷🇼'}</span>
                    <span className="font-semibold">{lang === 'en' ? 'English' : 'Kinyarwanda'}</span>
                  </button>
                ))}
              </div>
              <button className="btn-emerald w-full mt-6 flex items-center justify-center gap-2" onClick={() => setStep('role')}>
                {t('continueBtn')} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Role */}
          {step === 'role' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">{t('selectRole')}</h2>
              <p className="text-muted-foreground mb-8 text-sm">Select your primary role in the agricultural ecosystem</p>
              <div className="grid grid-cols-2 gap-3">
                {roles.map(r => (
                  <button key={r.id} onClick={() => setSelectedRole(r.id)}
                    className={`p-4 rounded-xl border text-left transition-all`}
                    style={selectedRole === r.id 
                      ? { borderColor: 'hsl(145 100% 39%)', background: 'hsl(145 100% 39% / 0.1)' }
                      : { borderColor: 'hsl(0 0% 15%)', background: 'hsl(0 0% 7%)' }}>
                    <div className="text-2xl mb-2">{r.emoji}</div>
                    <div className="font-semibold text-sm capitalize">{t(r.id as any)}</div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{t(`${r.id}Desc` as any)}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button className="btn-emerald-outline flex-1 flex items-center justify-center gap-2" onClick={() => setStep('language')}>
                  <ChevronLeft className="w-4 h-4" /> {t('back')}
                </button>
                <button className="btn-emerald flex-1 flex items-center justify-center gap-2" onClick={() => setStep('register')} disabled={!selectedRole}
                  style={{ opacity: selectedRole ? 1 : 0.5 }}>
                  {t('continueBtn')} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Register */}
          {step === 'register' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">{t('createAccount')}</h2>
              <p className="text-muted-foreground mb-6 text-sm capitalize">{t(selectedRole || 'farmer')} Registration</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{t('fullName')}</label>
                  <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Jean Paul Uwimana"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-1"
                    style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)', color: 'hsl(120 20% 96%)', '--tw-ring-color': 'hsl(145 100% 39%)' } as any} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{t('phone')}</label>
                  <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+250 700 000 000" type="tel"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)', color: 'hsl(120 20% 96%)' }} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{t('email')}</label>
                  <input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com" type="email"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)', color: 'hsl(120 20% 96%)' }} />
                </div>
                <div className="relative">
                  <label className="text-xs text-muted-foreground mb-1.5 block">{t('password')}</label>
                  <input value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none pr-10"
                    style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)', color: 'hsl(120 20% 96%)' }} />
                  <button className="absolute right-3 bottom-3 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {selectedRole === 'farmer' && (
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">{t('farmSize')}</label>
                    <input value={form.farmSize} onChange={e => setForm(p => ({ ...p, farmSize: e.target.value }))}
                      placeholder="2.5" type="number"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)', color: 'hsl(120 20% 96%)' }} />
                  </div>
                )}
                <button onClick={handleDetectLocation}
                  className="w-full px-4 py-3 rounded-xl text-sm flex items-center gap-3 transition-all"
                  style={{ background: locationDetected ? 'hsl(145 100% 39% / 0.1)' : 'hsl(0 0% 10%)', border: `1px solid ${locationDetected ? 'hsl(145 100% 39% / 0.4)' : 'hsl(0 0% 15%)'}`, color: locationDetected ? 'hsl(145 100% 39%)' : 'hsl(120 10% 55%)' }}>
                  <MapPin className="w-4 h-4" />
                  {detecting ? 'Detecting...' : locationDetected ? '✓ Location Detected (Kigali, Rwanda)' : t('detectLocation')}
                </button>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="btn-emerald-outline flex-1 flex items-center justify-center gap-2" onClick={() => setStep('role')}>
                  <ChevronLeft className="w-4 h-4" /> {t('back')}
                </button>
                <button className="btn-emerald flex-1 flex items-center justify-center gap-2" onClick={handleRegister}>
                  {t('continueBtn')} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Permissions */}
          {step === 'permissions' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Enable Features</h2>
              <p className="text-muted-foreground mb-6 text-sm">Allow access to unlock all Agripio features</p>
              <div className="space-y-3">
                {[
                  { icon: Camera, title: t('cameraAccess'), desc: t('cameraDesc'), recommended: true },
                  { icon: Mic, title: t('micAccess'), desc: t('micDesc'), recommended: true },
                  { icon: MapPin, title: t('locationAccess'), desc: t('locationDesc'), recommended: true },
                  { icon: Bell, title: t('notifAccess'), desc: t('notifDesc'), recommended: false },
                ].map((perm, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 13%)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'hsl(145 100% 39% / 0.1)' }}>
                      <perm.icon className="w-5 h-5" style={{ color: 'hsl(145 100% 39%)' }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{perm.title}</span>
                        {perm.recommended && <span className="tag emerald">Recommended</span>}
                      </div>
                      <span className="text-xs text-muted-foreground">{perm.desc}</span>
                    </div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: 'hsl(145 100% 39%)' }}>
                      <Check className="w-3.5 h-3.5" style={{ color: 'hsl(0 0% 4%)' }} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-emerald w-full mt-6 flex items-center justify-center gap-2 text-base py-4" onClick={handleFinish}>
                🚀 Launch Agripio Dashboard
              </button>
              <button className="w-full text-center text-xs text-muted-foreground mt-3 hover:text-foreground transition-colors" onClick={handleFinish}>
                Skip for now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
