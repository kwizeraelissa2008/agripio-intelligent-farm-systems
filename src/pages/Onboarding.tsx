import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Leaf, ChevronRight, Shield, Check, Loader2, AlertCircle } from 'lucide-react';
import { Language } from '@/lib/translations';
import { toast } from 'sonner';

type Step = 'language' | 'profile' | 'terms';

export default function Onboarding() {
  const navigate = useNavigate();
  const { t, setLanguage, language } = useApp();
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState<Step>('language');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ farmType: '', farmSize: '', crops: '' });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedEULA, setAcceptedEULA] = useState(false);

  const handleSaveProfile = async () => {
    if (!acceptedTerms || !acceptedEULA) {
      toast.error('Please accept all terms to continue');
      return;
    }
    
    setSaving(true);
    await updateProfile({
      farm_type: form.farmType || null,
      farm_size: form.farmSize ? parseFloat(form.farmSize) : null,
      crops: form.crops ? form.crops.split(',').map(c => c.trim()) : null,
      language,
      ip_terms_accepted: true,
      eula_accepted: true,
    });
    toast.success(language === 'rw' ? 'Profil yabitswe!' : 'Profile saved!');
    setSaving(false);
    navigate('/dashboard');
  };

  const progress = step === 'language' ? 33 : step === 'profile' ? 66 : 100;
  const inputCls = 'w-full px-4 py-3 rounded-xl text-sm outline-none bg-secondary border border-border';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">AGRIPIO</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }} 
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
          {step === 'language' && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{t('selectLanguage')}</h2>
              <p className="text-gray-600 mb-8 text-sm">Hitamo ururimi / Choose your language</p>
              <div className="grid grid-cols-2 gap-4">
                {(['en', 'rw', 'fr', 'sw'] as Language[]).map(lang => (
                  <button key={lang} onClick={() => setLanguage(lang)}
                    className="p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all hover:scale-105"
                    style={language === lang ? { borderColor: '#10b981', background: '#f0fdf4' } : { borderColor: '#e5e7eb' }}>
                    <span className="text-3xl">
                      {lang === 'en' ? '🇬🇧' : lang === 'rw' ? '🇷🇼' : lang === 'fr' ? '🇫🇷' : '🇰🇪'}
                    </span>
                    <span className="font-semibold text-gray-800">
                      {lang === 'en' ? 'English' : lang === 'rw' ? 'Kinyarwanda' : lang === 'fr' ? 'Français' : 'Swahili'}
                    </span>
                  </button>
                ))}
              </div>
              <button className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2" onClick={() => setStep('profile')}>
                {t('continueBtn')} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{language === 'rw' ? 'Uzuza Profil Yawe' : 'Complete Your Profile'}</h2>
              <p className="text-gray-600 mb-6 text-sm">{language === 'rw' ? 'Twebere byinshi ku buhinzi bwawe' : 'Tell us about your farm'}</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-600 mb-1.5 block">{language === 'rw' ? 'Ubwoko bw\'ubuhinzi' : 'Farm Type'}</label>
                  <input value={form.farmType} onChange={e => setForm(p => ({ ...p, farmType: e.target.value }))}
                    placeholder={language === 'rw' ? 'urugero: Ubuhinzi bw\'imyaka' : 'e.g., Crop farming'} className={inputCls} />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1.5 block">{t('farmSize')}</label>
                  <input value={form.farmSize} onChange={e => setForm(p => ({ ...p, farmSize: e.target.value }))}
                    placeholder="2.5" type="number" className={inputCls} />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1.5 block">{language === 'rw' ? 'Ibihingwa (bitandukanye na koma)' : 'Crops (comma separated)'}</label>
                  <input value={form.crops} onChange={e => setForm(p => ({ ...p, crops: e.target.value }))}
                    placeholder="Maize, Beans, Tomatoes" className={inputCls} />
                </div>
              </div>
              <button className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2" onClick={() => setStep('terms')}>
                {t('continueBtn')} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 'terms' && (
            <div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Respect Copyright</h2>
                <p className="text-gray-600 text-sm">{language === 'rw' ? 'Kwirinda kubona no gukoresha ibyanditswe by\'abandi bitemewe.' : 'Protect and respect creative works in agriculture.'}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm text-gray-800 mb-1">🌱 Farm Creative Works</h3>
                      <p className="text-xs text-gray-600">Your farming guides, videos, photos, and methods are protected by copyright. Learn how to protect them and respect others' work.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h3 className="font-semibold text-sm text-gray-800 mb-2">Intellectual Property Terms</h3>
                  <div className="text-xs text-gray-600 space-y-2">
                    <p>• All farming guides and content you create are yours to protect</p>
                    <p>• Always respect copyright when using others' materials</p>
                    <p>• Learn IP rights to protect your agricultural innovations</p>
                    <p>• Join the Copyright Shield program for extra protection</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-xs text-gray-700">
                      <strong>Required:</strong> I agree to respect copyright and intellectual property rights in all my farming activities and content creation.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={acceptedEULA}
                      onChange={(e) => setAcceptedEULA(e.target.checked)}
                      className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-xs text-gray-700">
                      <strong>Required:</strong> I accept the End User License Agreement and terms of service for AgriPio.
                    </span>
                  </label>
                </div>
              </div>

              <button 
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={handleSaveProfile} 
                disabled={saving || !acceptedTerms || !acceptedEULA}
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                🚀 {language === 'rw' ? 'Tangira AgriPio' : 'Start AgriPio'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
