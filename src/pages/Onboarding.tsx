import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Leaf, ChevronRight, MapPin, Camera, Mic, Bell, Check, Loader2 } from 'lucide-react';
import { Language } from '@/lib/translations';
import { toast } from 'sonner';

type Step = 'language' | 'profile' | 'permissions';

export default function Onboarding() {
  const navigate = useNavigate();
  const { t, setLanguage, language } = useApp();
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState<Step>('language');
  const [detecting, setDetecting] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ farmType: '', farmSize: '', crops: '' });

  const handleDetectLocation = () => {
    setDetecting(true);
    setTimeout(() => { setDetecting(false); setLocationDetected(true); }, 1500);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    await updateProfile({
      farm_type: form.farmType || null,
      farm_size: form.farmSize ? parseFloat(form.farmSize) : null,
      crops: form.crops ? form.crops.split(',').map(c => c.trim()) : null,
      language,
      location_name: locationDetected ? 'Kigali, Rwanda' : null,
      location_lat: locationDetected ? -1.9441 : null,
      location_lng: locationDetected ? 30.0619 : null,
    });
    toast.success(language === 'rw' ? 'Profil yabitswe!' : 'Profile saved!');
    setSaving(false);
    setStep('permissions');
  };

  const progress = step === 'language' ? 33 : step === 'profile' ? 66 : 100;
  const inputCls = 'w-full px-4 py-3 rounded-xl text-sm outline-none bg-secondary border border-border';

  return (
    <div className="min-h-screen hero-bg hero-grid flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-emerald)' }}>
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold">AGRIPIO</span>
        </div>

        <div className="score-meter mb-8">
          <div className="score-meter-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="glass-card p-8 animate-slide-up">
          {step === 'language' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">{t('selectLanguage')}</h2>
              <p className="text-muted-foreground mb-8 text-sm">Hitamo ururimi / Choose your language</p>
              <div className="grid grid-cols-2 gap-4">
                {(['en', 'rw'] as Language[]).map(lang => (
                  <button key={lang} onClick={() => setLanguage(lang)}
                    className="p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all"
                    style={language === lang ? { borderColor: 'hsl(var(--emerald))', background: 'hsl(var(--emerald) / 0.1)' } : { borderColor: 'hsl(var(--border))' }}>
                    <span className="text-3xl">{lang === 'en' ? '🇬🇧' : '🇷🇼'}</span>
                    <span className="font-semibold">{lang === 'en' ? 'English' : 'Kinyarwanda'}</span>
                  </button>
                ))}
              </div>
              <button className="btn-emerald w-full mt-6 flex items-center justify-center gap-2" onClick={() => setStep('profile')}>
                {t('continueBtn')} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">{language === 'rw' ? 'Uzuza Profil Yawe' : 'Complete Your Profile'}</h2>
              <p className="text-muted-foreground mb-6 text-sm">{language === 'rw' ? 'Twebere byinshi ku buhinzi bwawe' : 'Tell us about your farm'}</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{language === 'rw' ? 'Ubwoko bw\'ubuhinzi' : 'Farm Type'}</label>
                  <input value={form.farmType} onChange={e => setForm(p => ({ ...p, farmType: e.target.value }))}
                    placeholder={language === 'rw' ? 'urugero: Ubuhinzi bw\'imyaka' : 'e.g., Crop farming'} className={inputCls} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{t('farmSize')}</label>
                  <input value={form.farmSize} onChange={e => setForm(p => ({ ...p, farmSize: e.target.value }))}
                    placeholder="2.5" type="number" className={inputCls} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">{language === 'rw' ? 'Ibihingwa (bitandukanye na koma)' : 'Crops (comma separated)'}</label>
                  <input value={form.crops} onChange={e => setForm(p => ({ ...p, crops: e.target.value }))}
                    placeholder="Maize, Beans, Tomatoes" className={inputCls} />
                </div>
                <button onClick={handleDetectLocation}
                  className="w-full px-4 py-3 rounded-xl text-sm flex items-center gap-3 transition-all bg-secondary border border-border"
                  style={locationDetected ? { borderColor: 'hsl(var(--emerald) / 0.4)', color: 'hsl(var(--emerald))' } : {}}>
                  <MapPin className="w-4 h-4" />
                  {detecting ? (language === 'rw' ? 'Birimo gushaka...' : 'Detecting...') : locationDetected ? '✓ Kigali, Rwanda' : t('detectLocation')}
                </button>
              </div>
              <button className="btn-emerald w-full mt-6 flex items-center justify-center gap-2" onClick={handleSaveProfile} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {t('continueBtn')} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 'permissions' && (
            <div>
              <h2 className="text-2xl font-bold mb-2">{language === 'rw' ? 'Gufungura Ibikorwa' : 'Enable Features'}</h2>
              <p className="text-muted-foreground mb-6 text-sm">{language === 'rw' ? 'Emera uburenganzira kugira ngo ukoreshe AgriPio neza' : 'Allow access to unlock all features'}</p>
              <div className="space-y-3">
                {[
                  { icon: Camera, title: t('cameraAccess'), desc: t('cameraDesc'), recommended: true },
                  { icon: Mic, title: t('micAccess'), desc: t('micDesc'), recommended: true },
                  { icon: MapPin, title: t('locationAccess'), desc: t('locationDesc'), recommended: true },
                  { icon: Bell, title: t('notifAccess'), desc: t('notifDesc'), recommended: false },
                ].map((perm, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-secondary border border-border">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'hsl(var(--emerald) / 0.1)' }}>
                      <perm.icon className="w-5 h-5" style={{ color: 'hsl(var(--emerald))' }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{perm.title}</span>
                        {perm.recommended && <span className="tag emerald">{language === 'rw' ? 'Byifuzwa' : 'Recommended'}</span>}
                      </div>
                      <span className="text-xs text-muted-foreground">{perm.desc}</span>
                    </div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'hsl(var(--emerald))' }}>
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-emerald w-full mt-6 flex items-center justify-center gap-2 text-base py-4" onClick={() => navigate('/dashboard')}>
                🚀 {language === 'rw' ? 'Fungura Dashboard' : 'Launch Dashboard'}
              </button>
              <button className="w-full text-center text-xs text-muted-foreground mt-3 hover:text-foreground transition-colors" onClick={() => navigate('/dashboard')}>
                {language === 'rw' ? 'Simbuka ubu' : 'Skip for now'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
