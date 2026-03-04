/**
 * AgriPio IoT Smart Devices — 2-Chamber System (Soil + Fertilizer)
 * No images, pure card-based UI with rich AI advice
 * © 2026 AgriPio — All rights reserved.
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import IPWatermark from '@/components/IPWatermark';
import { useApp } from '@/contexts/AppContext';
import {
  Wifi, WifiOff, Shield, Clock, CheckCircle, Settings, Camera,
  Leaf, Eye, X, Loader2, RefreshCw, Play, Activity,
  TrendingUp, BatteryMedium, Radio, Sparkles, Lightbulb,
  Droplets, ThermometerSun, FlaskConical, Gauge, Zap,
  ShieldCheck, AlertTriangle, Bug, CloudRain, Sprout
} from 'lucide-react';

const jitter = (base: number, range: number) => +(base + (Math.random() - 0.5) * range).toFixed(1);
const buildHistory = (base: number, range: number, len = 12) => Array.from({ length: len }, () => jitter(base, range));

interface SensorReading {
  value: number; unit: string; status: 'optimal' | 'good' | 'moderate' | 'low' | 'critical' | 'safe';
  label: string; labelRw: string; desc: string; descRw: string; icon: string; min: number; max: number; history: number[];
}
interface DeviceControl { id: string; label: string; labelRw: string; desc: string; descRw: string; enabled: boolean; }
interface Device {
  id: string; name: string; nameRw: string; description: string; descRw: string;
  chamber: 'soil' | 'fertilizer'; chamberIcon: string; status: 'online' | 'offline';
  battery: number; lastSync: string; readings: Record<string, SensorReading>;
  controls: DeviceControl[];
}

const initialDevices: Device[] = [
  {
    id: 'AGR-001', name: 'Soil Chamber Sensor', nameRw: "Senseur y'Ubutaka",
    description: 'Monitors soil pH, moisture, temperature, and NPK levels in real-time for precision agriculture.',
    descRw: "Igenzura pH y'ubutaka, ubuhehere, ubushyuhe, n'ibipimo bya NPK mu gihe nyacyo.",
    chamber: 'soil', chamberIcon: '🌍', status: 'online', battery: 87, lastSync: '2 min ago',
    readings: {
      ph: { value: 6.2, unit: 'pH', status: 'optimal', label: 'Soil pH', labelRw: "pH y'Ubutaka", desc: 'Slightly acidic — ideal for most crops', descRw: 'Bitose gato — byiza ku bihingwa byinshi', icon: '⚗️', min: 0, max: 14, history: buildHistory(6.2, 0.4) },
      moisture: { value: 68, unit: '%', status: 'good', label: 'Moisture', labelRw: 'Ubuhehere', desc: '68% saturation — adequate', descRw: '68% — ubuhehere buhagije', icon: '💧', min: 0, max: 100, history: buildHistory(68, 10) },
      temperature: { value: 24, unit: '°C', status: 'optimal', label: 'Temperature', labelRw: 'Ubushyuhe', desc: '24°C — perfect growing temp', descRw: '24°C — ubushyuhe bwiza', icon: '🌡️', min: 0, max: 50, history: buildHistory(24, 3) },
      nitrogen: { value: 45, unit: 'mg/kg', status: 'low', label: 'Nitrogen (N)', labelRw: 'Azote (N)', desc: '45 mg/kg — below recommended', descRw: "45 mg/kg — munsi y'urwego", icon: '🧪', min: 0, max: 200, history: buildHistory(45, 8) },
      phosphorus: { value: 32, unit: 'mg/kg', status: 'moderate', label: 'Phosphorus (P)', labelRw: 'Fosifore (P)', desc: '32 mg/kg — acceptable', descRw: '32 mg/kg — rwemewe', icon: '🔬', min: 0, max: 100, history: buildHistory(32, 6) },
      potassium: { value: 180, unit: 'mg/kg', status: 'good', label: 'Potassium (K)', labelRw: 'Potasiyumu (K)', desc: '180 mg/kg — sufficient', descRw: '180 mg/kg — ibihagije', icon: '⚡', min: 0, max: 300, history: buildHistory(180, 15) },
    },
    controls: [
      { id: 'data_logging', label: 'Data Logging', labelRw: 'Kubika Amakuru', desc: 'Record every 15 min', descRw: 'Andika buri minota 15', enabled: true },
      { id: 'alerts', label: 'Smart Alerts', labelRw: 'Ubutumwa Bwenge', desc: 'Out-of-range notifications', descRw: 'Menyeshwa ibipimo byavuye', enabled: true },
      { id: 'sleep_mode', label: 'Power Save', labelRw: 'Gukiza Ingufu', desc: 'Reduce sampling frequency', descRw: 'Gabanya isuzumwa', enabled: false },
    ],
  },
  {
    id: 'AGR-002', name: 'Fertilizer Analyzer', nameRw: "Isesengura ry'Ifumbire",
    description: 'Tests fertilizer compatibility, concentration safety, and nutrient release rates for optimal application.',
    descRw: "Isuzuma ibihuje by'ifumbire, umutekano w'ibipimo, n'uburyo bwo gutanga intungamubiri.",
    chamber: 'fertilizer', chamberIcon: '🧬', status: 'offline', battery: 12, lastSync: '3h ago',
    readings: {
      compatibility: { value: 91, unit: '%', status: 'good', label: 'Soil Compatibility', labelRw: "Guhuje n'Ubutaka", desc: '91% compatible', descRw: "91% bihuje n'ubutaka", icon: '✅', min: 0, max: 100, history: buildHistory(91, 3) },
      concentration: { value: 78, unit: '%', status: 'safe', label: 'Concentration', labelRw: 'Ibipimo', desc: 'Safe level', descRw: 'Ibipimo bikomeye', icon: '🧫', min: 0, max: 100, history: buildHistory(78, 5) },
      releaseRate: { value: 65, unit: '%', status: 'moderate', label: 'Release Rate', labelRw: 'Igipimo cyo Gutanga', desc: 'Medium-slow', descRw: '65% — hagati', icon: '⏱️', min: 0, max: 100, history: buildHistory(65, 8) },
      npkBalance: { value: 85, unit: '/100', status: 'good', label: 'NPK Balance', labelRw: 'NPK Ihagije', desc: 'NPK 20-10-10', descRw: 'NPK 20-10-10 bihagije', icon: '⚖️', min: 0, max: 100, history: buildHistory(85, 4) },
      organicContent: { value: 42, unit: '%', status: 'moderate', label: 'Organic Content', labelRw: 'Ibintu bya Kamere', desc: '42% organic', descRw: '42% kamere', icon: '🌱', min: 0, max: 100, history: buildHistory(42, 6) },
      effectiveness: { value: 88, unit: '%', status: 'good', label: 'Effectiveness', labelRw: 'Imikorere', desc: '88% effective', descRw: '88% imikorere', icon: '🎯', min: 0, max: 100, history: buildHistory(88, 4) },
    },
    controls: [
      { id: 'auto_test', label: 'Auto Testing', labelRw: 'Isuzumwa Bwikora', desc: 'Test new batches auto', descRw: 'Isuzuma bwikora', enabled: false },
      { id: 'mixing_guide', label: 'Mixing Guide', labelRw: 'Kuvanga', desc: 'AI mixing ratios', descRw: 'AI itanga igipimo', enabled: true },
      { id: 'safety_check', label: 'Safety Monitor', labelRw: 'Umutekano', desc: 'Concentration alerts', descRw: 'Menyesha ibipimo byinshi', enabled: true },
    ],
  },
];

/* AI Advice cards — descriptive, multi-topic */
const aiAdviceCards = [
  {
    icon: Droplets, title: 'Soil Moisture Strategy', titleRw: 'Ingamba z\'Ubuhehere',
    advice: 'Your soil moisture at 68% is adequate for current crops. During the next dry period (expected in 5 days), apply mulch around root zones to retain moisture. Avoid overwatering — it reduces oxygen availability to roots and can promote fungal diseases.',
    adviceRw: 'Ubuhehere bw\'ubutaka kuri 68% buhagije. Mu gihe cy\'amapfa (hasigaye iminsi 5), shyira ibikoresho ku mashami kugira ngo ubuhehere bukomeze. Irinde gusuka amazi menshi.',
    gradient: 'linear-gradient(135deg, hsl(200 80% 15%), hsl(200 60% 8%))',
    border: 'hsl(200 80% 40% / 0.4)', accent: 'hsl(200 80% 55%)', tag: 'Moisture'
  },
  {
    icon: FlaskConical, title: 'Nitrogen Deficiency Alert', titleRw: 'Azote Nke',
    advice: 'Nitrogen is at 45 mg/kg — 25% below the recommended 60 mg/kg threshold for maize. Apply 40kg/ha of organic compost or well-aged manure within the next 5 days. Split application (20kg now + 20kg in 2 weeks) yields better absorption rates and reduces runoff loss.',
    adviceRw: 'Azote iri kuri 45 mg/kg — munsi 25% y\'urwego rusabwa rwa 60 mg/kg ku ibigori. Shyiraho 40kg/ha ya compost mu minsi 5. Igabanyemo kabiri (20kg ubu + 20kg mu byumweru 2) bituma byinjira neza.',
    gradient: 'linear-gradient(135deg, hsl(45 80% 15%), hsl(45 60% 8%))',
    border: 'hsl(45 80% 50% / 0.4)', accent: 'hsl(45 80% 55%)', tag: 'Nutrition'
  },
  {
    icon: ThermometerSun, title: 'Temperature & Growth', titleRw: 'Ubushyuhe n\'Gukura',
    advice: 'Soil temperature at 24°C is in the optimal range (20-28°C) for tropical crops. Night temperatures are dropping to ~18°C which is beneficial for starch accumulation in tubers. No intervention needed — your crops are in an ideal thermal environment for the next 7 days.',
    adviceRw: 'Ubushyuhe bw\'ubutaka kuri 24°C buri mu rwego rwiza (20-28°C) ku bihingwa byo mu turere dushyuha. Nta kintu gisabwa — ibihingwa byawe biri mu buzima bwiza.',
    gradient: 'linear-gradient(135deg, hsl(15 70% 15%), hsl(15 50% 8%))',
    border: 'hsl(15 70% 45% / 0.4)', accent: 'hsl(15 70% 55%)', tag: 'Climate'
  },
  {
    icon: Bug, title: 'Pest & Disease Prevention', titleRw: 'Kwirinda Ibyonnyi',
    advice: 'Current humidity (72%) combined with warm temperatures creates moderate risk for fungal infections, particularly late blight on tomatoes and leaf rust on beans. Inspect lower leaves for early signs. Use companion planting (marigolds near tomatoes) and ensure adequate spacing between plants for air circulation.',
    adviceRw: 'Ubuhehere bwa none (72%) hamwe n\'ubushyuhe bishobora gutera indwara z\'ibihingwa. Suzuma amababi yo hasi. Koresha uburyo bwo gutera hamwe (marigolds hafi ya tomate) kandi usige umwanya uhagije.',
    gradient: 'linear-gradient(135deg, hsl(0 60% 15%), hsl(0 40% 8%))',
    border: 'hsl(0 60% 45% / 0.4)', accent: 'hsl(0 60% 55%)', tag: 'Protection'
  },
  {
    icon: Sprout, title: 'Planting Calendar Advice', titleRw: 'Inama z\'Igihe cyo Gutera',
    advice: 'Based on your soil conditions (pH 6.2, good potassium), this is an excellent time to plant beans, maize, or sorghum. For root vegetables like cassava, wait 2 more weeks for soil to warm slightly. Start seedbeds for tomatoes and peppers now — they\'ll be ready for transplant in 3-4 weeks.',
    adviceRw: 'Hashingiwe ku mimerere y\'ubutaka (pH 6.2, potasiyumu nziza), ibi ni igihe cyiza cyo gutera ibishyimbo, ibigori, cyangwa amasaka. Ku bihingwa by\'imizi nka manyioki, tegereza ibyumweru 2.',
    gradient: 'linear-gradient(135deg, hsl(145 60% 12%), hsl(145 40% 6%))',
    border: 'hsl(145 60% 40% / 0.4)', accent: 'hsl(var(--emerald))', tag: 'Planning'
  },
  {
    icon: Gauge, title: 'Fertilizer Application Guide', titleRw: 'Amabwiriza y\'Ifumbire',
    advice: 'Your fertilizer blend (NPK 20-10-10) is 91% compatible with current soil. Organic content at 42% is below ideal 55%. Mix with compost at 3:1 ratio. Apply in the morning when soil is moist for best absorption. Avoid fertilizing before heavy rain — nutrients will wash away and pollute waterways.',
    adviceRw: 'Ifumbire yawe (NPK 20-10-10) ihuje 91% n\'ubutaka. Ibintu bya kamere kuri 42% ni munsi ya 55% ikwiye. Vanga na compost kuri 3:1. Shyiraho mu gitondo iyo ubutaka bufite ubuhehere.',
    gradient: 'linear-gradient(135deg, hsl(270 50% 15%), hsl(270 30% 8%))',
    border: 'hsl(270 50% 45% / 0.4)', accent: 'hsl(270 50% 60%)', tag: 'Fertilizer'
  },
  {
    icon: CloudRain, title: 'Weather-Smart Farming', titleRw: 'Ubuhinzi Bwenge bw\'Ikirere',
    advice: 'Heavy rainfall expected in 2 days. Prepare drainage channels in low-lying fields. Delay any fertilizer application until after the rain passes. Harvest any mature crops before the rain to prevent post-harvest losses. Mulching now will protect topsoil from erosion during downpours.',
    adviceRw: 'Imvura nyinshi iteganijwe mu minsi 2. Tegura imiyoboro y\'amazi mu mirima. Tegereza gushyira ifumbire nyuma y\'imvura. Sarura ibihingwa byeze mbere y\'imvura.',
    gradient: 'linear-gradient(135deg, hsl(210 60% 15%), hsl(210 40% 8%))',
    border: 'hsl(210 60% 45% / 0.4)', accent: 'hsl(210 60% 55%)', tag: 'Weather'
  },
  {
    icon: ShieldCheck, title: 'Soil Health Long-term Plan', titleRw: 'Ingamba z\'Ubuzima bw\'Ubutaka',
    advice: 'Your soil health is trending positively (+6% this month). To maintain this trajectory: rotate crops every season (legumes after cereals to fix nitrogen naturally), add green manure cover crops during fallow periods, and minimize tillage to preserve soil structure and microbial communities.',
    adviceRw: 'Ubuzima bw\'ubutaka bwawe burimo bwiyongera (+6% uku kwezi). Kugira ngo ukomeze: hindura ibihingwa buri gihembwe, ongeraho ibimera bitwikira, kandi ugabanye guhinga kugira ngo uburinganire bw\'ubutaka bukomeze.',
    gradient: 'linear-gradient(135deg, hsl(145 50% 12%), hsl(160 40% 6%))',
    border: 'hsl(160 50% 40% / 0.4)', accent: 'hsl(160 50% 50%)', tag: 'Long-term'
  },
];

const statusMeta: Record<string, { color: string; label: string; border: string }> = {
  optimal: { color: 'hsl(var(--emerald))', label: 'Optimal', border: 'hsl(var(--emerald) / 0.5)' },
  good: { color: 'hsl(var(--emerald))', label: 'Good', border: 'hsl(var(--emerald) / 0.4)' },
  safe: { color: 'hsl(var(--emerald))', label: 'Safe', border: 'hsl(var(--emerald) / 0.4)' },
  moderate: { color: 'hsl(var(--warning))', label: 'Caution', border: 'hsl(var(--warning) / 0.4)' },
  low: { color: 'hsl(var(--alert))', label: 'Low', border: 'hsl(var(--alert) / 0.4)' },
  critical: { color: 'hsl(var(--alert))', label: 'Critical', border: 'hsl(var(--alert) / 0.5)' },
};

const plantScanResults = [
  { status: 'Healthy', color: 'hsl(var(--emerald))', icon: '🌿', advice: 'Plant looks healthy! Continue adequate sunlight and moisture.', adviceRw: 'Igihingwa kirasa neza! Komeza urumuri n\'amazi.' },
  { status: 'Nutrient Deficiency', color: 'hsl(var(--warning))', icon: '🍂', advice: 'Possible nutrient deficiency. Add organic compost. pH should be 6.0-7.0.', adviceRw: 'Hashobora kuba intungamubiri nke. Ongeraho compost.' },
  { status: 'Pest Damage', color: 'hsl(var(--alert))', icon: '🐛', advice: 'Signs of pest activity. Try neem oil or companion planting.', adviceRw: "Ibimenyetso by'ibyonnyi. Koresha amavuta ya neem." },
];

const farmingTimeline = [
  { day: 0, label: 'Soil Prep', labelRw: 'Gutegura Ubutaka', status: 'done', icon: '🌍' },
  { day: 7, label: 'Planting', labelRw: 'Gutera', status: 'done', icon: '🌱' },
  { day: 21, label: 'First Growth', labelRw: 'Gukura kwa 1', status: 'done', icon: '🌿' },
  { day: 35, label: 'Fertilizing', labelRw: 'Ifumbire', status: 'current', icon: '🧬' },
  { day: 50, label: 'Flowering', labelRw: 'Gutuza', status: 'upcoming', icon: '🌸' },
  { day: 75, label: 'Harvest', labelRw: 'Gusarura', status: 'upcoming', icon: '🌾' },
];

function Sparkline({ data, color, height = 24 }: { data: number[]; color: string; height?: number }) {
  const min = Math.min(...data); const max = Math.max(...data); const range = max - min || 1;
  const w = 80;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${height - ((v - min) / range) * (height - 4)}`).join(' ');
  return <svg width={w} height={height} className="opacity-60"><polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function IoTDevices() {
  const { language } = useApp();
  const isRw = language === 'rw';
  const [devices, setDevices] = useState(initialDevices);
  const [selectedChamber, setSelectedChamber] = useState('AGR-001');
  const [isSimulation, setIsSimulation] = useState(false);
  const [controlStates, setControlStates] = useState<Record<string, Record<string, boolean>>>(() => {
    const init: Record<string, Record<string, boolean>> = {};
    initialDevices.forEach(d => { init[d.id] = {}; d.controls.forEach(c => { init[d.id][c.id] = c.enabled; }); });
    return init;
  });
  const [runningTest, setRunningTest] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<typeof plantScanResults[0] | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev.map(d => {
        if (d.status === 'offline' && !isSimulation) return d;
        const newReadings = { ...d.readings };
        Object.keys(newReadings).forEach(key => {
          const r = { ...newReadings[key] };
          r.value = jitter(r.value, (r.max - r.min) * 0.02);
          r.value = Math.max(r.min, Math.min(r.max, r.value));
          r.history = [...r.history.slice(1), r.value];
          newReadings[key] = r;
        });
        return { ...d, readings: newReadings, lastSync: 'Just now' };
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, [isSimulation]);

  const toggleControl = (did: string, cid: string) => setControlStates(p => ({ ...p, [did]: { ...p[did], [cid]: !p[did][cid] } }));

  const runNewTest = useCallback((did: string) => {
    setRunningTest(did);
    setTimeout(() => {
      setDevices(prev => prev.map(d => {
        if (d.id !== did) return d;
        const nr = { ...d.readings };
        Object.keys(nr).forEach(k => { const r = { ...nr[k] }; r.value = Math.max(r.min, Math.min(r.max, jitter(r.value, (r.max - r.min) * 0.05))); r.history = [...r.history.slice(1), r.value]; nr[k] = r; });
        return { ...d, readings: nr, lastSync: 'Just now' };
      }));
      setRunningTest(null);
    }, 3000);
  }, []);

  const startScanner = async () => { setShowScanner(true); setScanResult(null); try { const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }); streamRef.current = s; if (videoRef.current) videoRef.current.srcObject = s; } catch {} };
  const handleScan = () => { setScanning(true); setTimeout(() => { setScanResult(plantScanResults[Math.floor(Math.random() * plantScanResults.length)]); setScanning(false); streamRef.current?.getTracks().forEach(t => t.stop()); }, 2500); };
  const closeScanner = () => { setShowScanner(false); setScanResult(null); streamRef.current?.getTracks().forEach(t => t.stop()); };

  const sel = devices.find(d => d.id === selectedChamber)!;
  const overallHealth = Math.round(devices.reduce((s, d) => { const v = Object.values(d.readings); return s + v.reduce((a, r) => a + (r.value / r.max) * 100, 0) / v.length; }, 0) / devices.length);
  const heroColor = overallHealth >= 70 ? 'hsl(var(--emerald))' : overallHealth >= 45 ? 'hsl(var(--warning))' : 'hsl(var(--alert))';

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Leaf className="w-6 h-6" style={{ color: 'hsl(var(--emerald))' }} />
              {isRw ? 'AgriPio Igenzura' : 'AgriPio Monitor'}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isRw ? 'Sisitemu y\'ubwoko 2 — Ubutaka · Ifumbire' : '2-Chamber smart testing — Soil · Fertilizer'}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setIsSimulation(!isSimulation)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: isSimulation ? 'hsl(var(--sky) / 0.15)' : 'hsl(var(--secondary))', color: isSimulation ? 'hsl(var(--sky))' : 'hsl(var(--muted-foreground))', border: `1px solid ${isSimulation ? 'hsl(var(--sky) / 0.4)' : 'hsl(var(--border))'}` }}>
              <Radio className="w-3.5 h-3.5" /> {isSimulation ? (isRw ? 'Cyiyerekana' : 'Virtual ON') : (isRw ? 'Nyacyo' : 'Physical')}
            </button>
            <button onClick={startScanner} className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
              style={{ background: 'hsl(var(--emerald) / 0.12)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }}>
              <Camera className="w-3.5 h-3.5" /> {isRw ? 'Suzuma' : 'Scan Plant'}
            </button>
          </div>
        </div>

        {/* HEALTH HERO */}
        <div className="rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6"
          style={{ background: 'linear-gradient(135deg, hsl(145 30% 8%), hsl(0 0% 5%))', border: `1px solid ${heroColor}25`, boxShadow: `0 0 60px ${heroColor}08` }}>
          <div className="relative flex-shrink-0">
            <div className="w-28 h-28 rounded-3xl flex items-center justify-center"
              style={{ background: `${heroColor}12`, border: `2px solid ${heroColor}40`, boxShadow: `0 0 40px ${heroColor}15` }}>
              <span className="text-3xl font-bold" style={{ color: heroColor }}>{overallHealth}</span>
              <span className="absolute bottom-2 text-[10px] font-semibold" style={{ color: heroColor }}>/100</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse" style={{ background: heroColor, boxShadow: `0 0 12px ${heroColor}` }} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg font-bold">{isRw ? 'Ubuzima Rusange bw\'Imirima' : 'Overall Farm Health'}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {overallHealth >= 70 ? (isRw ? 'Imirima iri mu buzima bwiza.' : 'Farm is performing well. Follow AI advice below for optimization.') : (isRw ? 'Ibintu bimwe bisaba kwitabwaho.' : 'Some areas need attention. Check AI recommendations below.')}
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><Activity className="w-3 h-3" style={{ color: heroColor }} /> {isRw ? 'Buri sec 10' : 'Every 10s'}</span>
              <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> {devices.filter(d => d.status === 'online').length}/{devices.length} online</span>
              {isSimulation && <span className="px-2 py-0.5 rounded-full" style={{ background: 'hsl(var(--sky) / 0.1)', color: 'hsl(var(--sky))' }}>🔮 Virtual</span>}
            </div>
          </div>
        </div>

        {/* 2 DEVICE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {devices.map(device => {
            const isActive = selectedChamber === device.id;
            const online = device.status === 'online' || isSimulation;
            const avg = Math.round(Object.values(device.readings).reduce((s, r) => s + (r.value / r.max) * 100, 0) / Object.keys(device.readings).length);
            const cc = avg >= 70 ? 'hsl(var(--emerald))' : avg >= 45 ? 'hsl(var(--warning))' : 'hsl(var(--alert))';
            return (
              <div key={device.id} onClick={() => setSelectedChamber(device.id)}
                className="rounded-2xl p-5 cursor-pointer transition-all duration-300"
                style={{
                  background: isActive ? 'linear-gradient(135deg, hsl(145 20% 8%), hsl(0 0% 6%))' : 'hsl(var(--card))',
                  border: isActive ? `2px solid ${cc}` : '1px solid hsl(var(--border))',
                  boxShadow: isActive ? `0 8px 32px ${cc}15` : 'var(--shadow-card)',
                }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: `${cc}15`, border: `1px solid ${cc}30` }}>
                      {device.chamberIcon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{isRw ? device.nameRw : device.name}</h3>
                      <p className="text-[11px] text-muted-foreground">{device.id} • {device.lastSync}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{ background: online ? 'hsl(var(--emerald) / 0.15)' : 'hsl(var(--alert) / 0.15)', color: online ? 'hsl(var(--emerald))' : 'hsl(var(--alert))' }}>
                      {online ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />} {online ? 'LIVE' : 'OFFLINE'}
                    </div>
                    <span className="text-[10px] flex items-center gap-1" style={{ color: device.battery < 20 ? 'hsl(var(--alert))' : 'hsl(var(--muted-foreground))' }}>
                      <BatteryMedium className="w-3 h-3" /> {device.battery}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{isRw ? device.descRw : device.description}</p>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                    style={{ background: `${cc}15`, color: cc, border: `1px solid ${cc}30` }}>{avg}</div>
                  <span className="text-[10px] text-muted-foreground">{isRw ? 'Amanota rusange' : 'Overall Score'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* SELECTED DEVICE RESULTS */}
        <div className="space-y-4" key={sel.id}>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold flex items-center gap-2 flex-1">
              <span className="text-xl">{sel.chamberIcon}</span> {isRw ? sel.nameRw : sel.name} — {isRw ? 'Ibisubizo' : 'Results'}
            </h2>
            <button onClick={() => runNewTest(sel.id)} disabled={runningTest === sel.id}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
              style={{ background: 'hsl(var(--emerald) / 0.12)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }}>
              {runningTest === sel.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              {runningTest === sel.id ? (isRw ? 'Birimo...' : 'Testing...') : (isRw ? 'Isuzumwa Rishya' : 'Run Test')}
            </button>
            <button onClick={() => setDevices(p => p.map(d => d.id === sel.id ? { ...d, lastSync: 'Just now' } : d))}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium"
              style={{ background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}>
              <RefreshCw className="w-3 h-3" /> {isRw ? 'Kuvugurura' : 'Refresh'}
            </button>
          </div>

          {/* Sensor cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(sel.readings).map(([key, r]) => {
              const m = statusMeta[r.status] || statusMeta.moderate;
              return (
                <div key={key} className="rounded-2xl p-4 transition-all hover:scale-[1.02]"
                  style={{ background: 'hsl(var(--card))', border: `1.5px solid ${m.border}` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{r.icon}</span>
                      <span className="text-[11px] text-muted-foreground font-medium">{isRw ? r.labelRw : r.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
                      <span className="text-[9px] font-bold uppercase" style={{ color: m.color }}>{m.label}</span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl font-bold" style={{ color: m.color }}>{r.value}</span>
                    <span className="text-xs text-muted-foreground">{r.unit}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden mb-2" style={{ background: 'hsl(var(--muted))' }}>
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((r.value / r.max) * 100, 100)}%`, background: m.color }} />
                  </div>
                  <Sparkline data={r.history} color={m.color} />
                  <p className="text-[10px] text-muted-foreground mt-1.5">{isRw ? r.descRw : r.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="rounded-2xl p-5" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
              {isRw ? 'Igenamiterere' : 'Device Controls'}
            </h3>
            <div className="space-y-2.5">
              {sel.controls.map(ctrl => {
                const en = controlStates[sel.id]?.[ctrl.id] ?? ctrl.enabled;
                return (
                  <div key={ctrl.id} className="flex items-center justify-between p-3.5 rounded-xl"
                    style={{ background: 'hsl(var(--secondary))', border: `1px solid ${en ? 'hsl(var(--emerald) / 0.25)' : 'hsl(var(--border))'}` }}>
                    <div className="flex items-center gap-3">
                      {en ? <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(var(--emerald))' }} /> : <Shield className="w-4 h-4 flex-shrink-0 text-muted-foreground" />}
                      <div>
                        <div className="text-sm font-medium">{isRw ? ctrl.labelRw : ctrl.label}</div>
                        <p className="text-[11px] text-muted-foreground">{isRw ? ctrl.descRw : ctrl.desc}</p>
                      </div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); toggleControl(sel.id, ctrl.id); }}
                      className="w-11 h-6 rounded-full flex items-center transition-all px-0.5 flex-shrink-0"
                      style={{ background: en ? 'hsl(var(--emerald))' : 'hsl(0 0% 25%)', justifyContent: en ? 'flex-end' : 'flex-start' }}>
                      <div className="w-5 h-5 rounded-full shadow-sm" style={{ background: 'white' }} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI ADVICE SECTION — 8 rich cards */}
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5" style={{ color: 'hsl(var(--emerald))' }} />
            {isRw ? 'Inama za AI — Byihariye ku Mirima Yawe' : 'AI Smart Advice — Personalized for Your Farm'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiAdviceCards.map((card, i) => (
              <div key={i} className="rounded-2xl p-5 transition-all hover:scale-[1.01]"
                style={{ background: card.gradient, border: `1px solid ${card.border}` }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${card.accent}20`, border: `1px solid ${card.accent}40` }}>
                    <card.icon className="w-5 h-5" style={{ color: card.accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-sm font-semibold">{isRw ? card.titleRw : card.title}</h4>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full"
                        style={{ background: `${card.accent}20`, color: card.accent }}>{card.tag}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">{isRw ? card.adviceRw : card.advice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FARMING TIMELINE */}
        <div className="rounded-2xl p-5" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
            {isRw ? 'Inzira y\'Ubuhinzi' : 'AI-Guided Farming Timeline'}
          </h3>
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {farmingTimeline.map((step, i) => {
              const isDone = step.status === 'done'; const isCurrent = step.status === 'current';
              const sc = isDone ? 'hsl(var(--emerald))' : isCurrent ? 'hsl(var(--warning))' : 'hsl(0 0% 25%)';
              return (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                      style={{ background: `${sc}20`, border: `1.5px solid ${sc}`, boxShadow: isCurrent ? `0 0 16px ${sc}40` : 'none' }}>
                      {step.icon}
                    </div>
                    <span className="text-[10px] font-medium text-center" style={{ color: isDone || isCurrent ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))' }}>
                      {isRw ? step.labelRw : step.label}
                    </span>
                    <span className="text-[9px] text-muted-foreground">{isRw ? `Umunsi ${step.day}` : `Day ${step.day}`}</span>
                  </div>
                  {i < farmingTimeline.length - 1 && <div className="w-8 h-0.5 rounded-full mx-0.5" style={{ background: isDone ? 'hsl(var(--emerald))' : 'hsl(var(--muted))' }} />}
                </div>
              );
            })}
          </div>
        </div>

        <IPWatermark />
      </div>

      {/* Plant Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" style={{ background: 'hsl(0 0% 0% / 0.9)', backdropFilter: 'blur(12px)' }}>
          <div className="w-full max-w-lg animate-slide-up">
            <div className="rounded-2xl overflow-hidden" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--emerald) / 0.3)' }}>
              <div className="flex items-center justify-between px-5 py-3" style={{ background: 'hsl(var(--emerald) / 0.1)' }}>
                <h3 className="font-semibold flex items-center gap-2"><Camera className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} /> 🌿 {isRw ? 'Isuzuma' : 'Plant Scanner'}</h3>
                <button onClick={closeScanner} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--secondary))' }}><X className="w-4 h-4" /></button>
              </div>
              <div className="relative bg-black aspect-video">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                {!scanResult && <div className="absolute inset-0 flex items-center justify-center"><div className="w-48 h-48 border-2 rounded-2xl" style={{ borderColor: 'hsl(var(--emerald) / 0.6)' }} /></div>}
                {scanning && <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'hsl(0 0% 0% / 0.5)' }}><Loader2 className="w-8 h-8 animate-spin" style={{ color: 'hsl(var(--emerald))' }} /></div>}
              </div>
              {scanResult ? (
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: scanResult.color + '15', border: `1px solid ${scanResult.color}30` }}>
                    <span className="text-3xl">{scanResult.icon}</span>
                    <div><h4 className="font-semibold" style={{ color: scanResult.color }}>{scanResult.status}</h4><p className="text-xs text-muted-foreground mt-1">{isRw ? scanResult.adviceRw : scanResult.advice}</p></div>
                  </div>
                  <button onClick={closeScanner} className="btn-emerald w-full">{isRw ? 'Funga' : 'Close'}</button>
                </div>
              ) : (
                <div className="p-5">
                  <p className="text-xs text-muted-foreground mb-4 text-center">{isRw ? 'Erekana igihingwa maze ukande "Suzuma"' : 'Point camera at plant and tap "Scan"'}</p>
                  <button onClick={handleScan} disabled={scanning} className="btn-emerald w-full flex items-center justify-center gap-2"><Eye className="w-4 h-4" /> {isRw ? 'Suzuma' : 'Scan'}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
