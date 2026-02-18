import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { Leaf, ChevronRight, ChevronLeft, Loader2, Target, Calendar, Droplets, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

type WizardStep = 'soil' | 'location' | 'budget' | 'result';

interface ProjectPlan {
  crop: string;
  plantingDate: string;
  irrigationSchedule: string;
  fertilizerPlan: string;
  pestRisk: string;
  expectedYield: string;
  estimatedRevenue: string;
  profitabilityScore: number;
  marketStrategy: string;
}

const cropOptions = ['Maize', 'Tomatoes', 'Beans', 'Avocado', 'Sweet Potato', 'Cassava', 'Coffee', 'Tea'];

export default function AIGuidance() {
  const { t } = useApp();
  const [step, setStep] = useState<WizardStep>('soil');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<ProjectPlan | null>(null);
  
  const [form, setForm] = useState({
    soilPH: '6.2', nitrogen: '45', phosphorus: '32', potassium: '180', moisture: '68',
    region: 'Kigali', cropPreference: 'Maize', farmSize: '2.5',
    budget: '500000', timeline: '6',
  });

  const generatePlan = () => {
    setLoading(true);
    setTimeout(() => {
      setPlan({
        crop: form.cropPreference || 'Maize',
        plantingDate: 'February 28, 2024 (Optimal Window)',
        irrigationSchedule: 'Every 3 days — 25mm per irrigation. Reduce to 5 days after germination.',
        fertilizerPlan: 'Week 1: 40kg/ha DAP. Week 4: 30kg/ha Urea. Week 8: 20kg/ha Potassium Sulfate.',
        pestRisk: 'Moderate — Late blight (35% risk), Stem borer (20% risk). Monitor weekly.',
        expectedYield: `${Math.round(parseFloat(form.farmSize) * 4200)} kg (4.2 tons/ha)`,
        estimatedRevenue: `RWF ${(parseFloat(form.farmSize) * 4200 * 350).toLocaleString()}`,
        profitabilityScore: 78,
        marketStrategy: 'Sell 60% to Kigali bulk buyers in June. Hold 40% for August premium pricing window.',
      });
      setStep('result');
      setLoading(false);
    }, 2500);
  };

  const InputField = ({ label, id, value, onChange, type = 'text', suffix = '', min = '' }: any) => (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      <div className="flex items-center">
        <input type={type} value={value} onChange={onChange} min={min}
          className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)', color: 'hsl(120 20% 96%)' }} />
        {suffix && <span className="ml-2 text-xs text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">AI Project Guidance</h1>
          <p className="text-sm text-muted-foreground mt-0.5">AI-powered farm planning from soil to harvest</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          {(['soil', 'location', 'budget', 'result'] as WizardStep[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all"
                style={step === s ? { background: 'hsl(145 100% 39%)', color: 'hsl(0 0% 4%)' } 
                  : i < (['soil', 'location', 'budget', 'result'] as WizardStep[]).indexOf(step) 
                  ? { background: 'hsl(145 100% 39% / 0.3)', color: 'hsl(145 100% 39%)' }
                  : { background: 'hsl(0 0% 12%)', color: 'hsl(120 10% 55%)' }}>
                {i + 1}
              </div>
              {i < 3 && <div className="flex-1 h-0.5 w-8" style={{ background: i < (['soil', 'location', 'budget', 'result'] as WizardStep[]).indexOf(step) ? 'hsl(145 100% 39%)' : 'hsl(0 0% 15%)' }} />}
            </div>
          ))}
          <div className="ml-2 text-xs text-muted-foreground capitalize">{step === 'result' ? 'AI Plan Generated' : `Step: ${step}`}</div>
        </div>

        <div className="glass-card p-6">
          
          {/* Step 1: Soil */}
          {step === 'soil' && !loading && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h2 className="text-xl font-semibold mb-1">🌱 Soil Data</h2>
                <p className="text-sm text-muted-foreground">Enter your soil analysis values or sync from IoT device</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Soil pH" id="ph" value={form.soilPH} type="number" onChange={(e: any) => setForm(p => ({ ...p, soilPH: e.target.value }))} />
                <InputField label="Nitrogen (mg/kg)" value={form.nitrogen} type="number" onChange={(e: any) => setForm(p => ({ ...p, nitrogen: e.target.value }))} />
                <InputField label="Phosphorus (mg/kg)" value={form.phosphorus} type="number" onChange={(e: any) => setForm(p => ({ ...p, phosphorus: e.target.value }))} />
                <InputField label="Potassium (mg/kg)" value={form.potassium} type="number" onChange={(e: any) => setForm(p => ({ ...p, potassium: e.target.value }))} />
                <InputField label="Moisture (%)" value={form.moisture} type="number" onChange={(e: any) => setForm(p => ({ ...p, moisture: e.target.value }))} />
              </div>
              <div className="p-3 rounded-xl flex items-center gap-3" style={{ background: 'hsl(145 100% 39% / 0.08)', border: '1px solid hsl(145 100% 39% / 0.2)' }}>
                <span className="text-xl">🤖</span>
                <span className="text-sm">IoT device detected — click to auto-fill from live sensor data</span>
                <button className="tag emerald ml-auto cursor-pointer">Sync Now</button>
              </div>
              <div className="flex justify-end">
                <button className="btn-emerald flex items-center gap-2" onClick={() => setStep('location')}>
                  Next: Location <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 'location' && !loading && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h2 className="text-xl font-semibold mb-1">📍 Farm & Crop Details</h2>
                <p className="text-sm text-muted-foreground">Location, farm size, and crop preference</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Region</label>
                  <select value={form.region} onChange={e => setForm(p => ({ ...p, region: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)', color: 'hsl(120 20% 96%)' }}>
                    {['Kigali', 'Northern Province', 'Southern Province', 'Eastern Province', 'Western Province'].map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Preferred Crop</label>
                  <select value={form.cropPreference} onChange={e => setForm(p => ({ ...p, cropPreference: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)', color: 'hsl(120 20% 96%)' }}>
                    {cropOptions.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <InputField label="Farm Size (hectares)" value={form.farmSize} type="number" onChange={(e: any) => setForm(p => ({ ...p, farmSize: e.target.value }))} />
                <InputField label="Growing Timeline (months)" value={form.timeline} type="number" onChange={(e: any) => setForm(p => ({ ...p, timeline: e.target.value }))} />
              </div>
              <div className="flex gap-3 justify-between">
                <button className="btn-emerald-outline flex items-center gap-2" onClick={() => setStep('soil')}>
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button className="btn-emerald flex items-center gap-2" onClick={() => setStep('budget')}>
                  Next: Budget <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 'budget' && !loading && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <h2 className="text-xl font-semibold mb-1">💰 Budget & Goals</h2>
                <p className="text-sm text-muted-foreground">Help AI optimize your profit strategy</p>
              </div>
              <InputField label="Total Budget (RWF)" value={form.budget} type="number" onChange={(e: any) => setForm(p => ({ ...p, budget: e.target.value }))} />
              <div className="p-4 rounded-xl space-y-2" style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 13%)' }}>
                <h3 className="text-sm font-medium mb-3">AI Analysis Summary</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Soil Health</span>
                  <span style={{ color: 'hsl(145 100% 39%)' }}>74% — Good</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Crop Match</span>
                  <span style={{ color: 'hsl(145 100% 39%)' }}>{form.cropPreference} — 89% compatible</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Season Timing</span>
                  <span style={{ color: 'hsl(43 96% 56%)' }}>Optimal — 2 weeks ahead</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Market Demand</span>
                  <span style={{ color: 'hsl(145 100% 39%)' }}>High — +18% price trend</span>
                </div>
              </div>
              <div className="flex gap-3 justify-between">
                <button className="btn-emerald-outline flex items-center gap-2" onClick={() => setStep('location')}>
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button className="btn-emerald flex items-center gap-2" onClick={generatePlan}>
                  🤖 Generate AI Plan <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-4 animate-fade-in">
              <div className="relative">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'hsl(145 100% 39% / 0.1)' }}>
                  <Leaf className="w-10 h-10 animate-pulse" style={{ color: 'hsl(145 100% 39%)' }} />
                </div>
                <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'hsl(145 100% 39% / 0.1)' }} />
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-1">AI Analyzing Your Farm...</h3>
                <p className="text-sm text-muted-foreground">Processing soil, weather, market data & generating optimal plan</p>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground text-center">
                {['Analyzing soil composition...', 'Checking weather patterns...', 'Querying market intelligence...', 'Calculating yield prediction...'].map((msg, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" style={{ color: 'hsl(145 100% 39%)' }} />
                    <span>{msg}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {step === 'result' && plan && !loading && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">🎯 AI Farming Plan</h2>
                  <p className="text-sm text-muted-foreground">{plan.crop} • {form.farmSize} ha • {form.region}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: 'hsl(145 100% 39%)' }}>{plan.profitabilityScore}</div>
                  <div className="text-xs text-muted-foreground">Profit Score</div>
                </div>
              </div>

              <div className="score-meter mb-4">
                <div className="score-meter-fill" style={{ width: `${plan.profitabilityScore}%` }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Calendar, label: 'Planting Date', value: plan.plantingDate, color: 'hsl(145 100% 39%)' },
                  { icon: Droplets, label: 'Irrigation', value: plan.irrigationSchedule, color: 'hsl(200 90% 50%)' },
                  { icon: Leaf, label: 'Fertilizer Plan', value: plan.fertilizerPlan, color: 'hsl(43 96% 56%)' },
                  { icon: AlertTriangle, label: 'Pest Risk', value: plan.pestRisk, color: 'hsl(45 100% 51%)' },
                  { icon: Target, label: 'Expected Yield', value: plan.expectedYield, color: 'hsl(145 100% 39%)' },
                  { icon: TrendingUp, label: 'Est. Revenue', value: plan.estimatedRevenue, color: 'hsl(43 96% 56%)' },
                ].map(item => (
                  <div key={item.label} className="p-4 rounded-xl" style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 13%)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                    <p className="text-sm leading-snug">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl" style={{ background: 'hsl(145 100% 39% / 0.08)', border: '1px solid hsl(145 100% 39% / 0.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4" style={{ color: 'hsl(145 100% 39%)' }} />
                  <span className="text-sm font-medium">Market Strategy</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.marketStrategy}</p>
              </div>

              <div className="flex gap-3">
                <button className="btn-emerald flex-1 flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Save Project
                </button>
                <button className="btn-emerald-outline px-4" onClick={() => { setStep('soil'); setPlan(null); }}>
                  New Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
