/**
 * AgriPio IoT Smart Devices — Unified 3-Chamber Interface
 * Senior IoT/UI/UX redesign: Health Hero, real-time cards, virtual simulation,
 * AI advice, heatmaps, farming timeline, plant scanner
 * © 2026 AgriPio — All rights reserved.
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import IPWatermark from '@/components/IPWatermark';
import { useApp } from '@/contexts/AppContext';
import {
  Cpu, Wifi, WifiOff, Thermometer, Droplets, Sun, Wind,
  Shield, Clock, AlertTriangle, CheckCircle, Settings, Camera,
  Leaf, Zap, Eye, X, Loader2, RefreshCw, Play, Activity,
  BarChart3, TrendingUp, BatteryMedium, Radio, Gauge
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

/* ── Utility: simulate real-time jitter ── */
const jitter = (base: number, range: number) =>
  +(base + (Math.random() - 0.5) * range).toFixed(1);

/* ── Device data model ── */
interface SensorReading {
  value: number;
  unit: string;
  status: 'optimal' | 'good' | 'moderate' | 'low' | 'critical' | 'safe';
  label: string;
  labelRw: string;
  desc: string;
  descRw: string;
  icon: string;
  min: number;
  max: number;
  history: number[];
}

interface DeviceControl {
  id: string;
  label: string;
  labelRw: string;
  desc: string;
  descRw: string;
  enabled: boolean;
}

interface Device {
  id: string;
  name: string;
  nameRw: string;
  description: string;
  descRw: string;
  image: string;
  chamber: 'soil' | 'crop' | 'fertilizer';
  chamberColor: string;
  chamberIcon: string;
  status: 'online' | 'offline';
  battery: number;
  lastSync: string;
  readings: Record<string, SensorReading>;
  aiAdvice: string;
  aiAdviceRw: string;
  controls: DeviceControl[];
}

const buildHistory = (base: number, range: number, len = 12) =>
  Array.from({ length: len }, () => jitter(base, range));

const initialDevices: Device[] = [
  {
    id: 'AGR-001', name: 'Soil Chamber Sensor', nameRw: "Senseur y'Ubutaka",
    description: 'Monitors soil pH, moisture, temperature, and NPK levels in real-time.',
    descRw: "Igenzura pH y'ubutaka, ubuhehere, ubushyuhe, n'ibipimo bya NPK.",
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
    chamber: 'soil', chamberColor: 'var(--emerald)', chamberIcon: '🌍',
    status: 'online', battery: 87, lastSync: '2 min ago',
    readings: {
      ph: { value: 6.2, unit: 'pH', status: 'optimal', label: 'Soil pH', labelRw: 'pH y\'Ubutaka', desc: 'Slightly acidic — ideal for most crops', descRw: 'Bitose gato — byiza ku bihingwa byinshi', icon: '⚗️', min: 0, max: 14, history: buildHistory(6.2, 0.4) },
      moisture: { value: 68, unit: '%', status: 'good', label: 'Moisture', labelRw: 'Ubuhehere', desc: '68% saturation — adequate hydration', descRw: '68% — ubuhehere buhagije', icon: '💧', min: 0, max: 100, history: buildHistory(68, 10) },
      temperature: { value: 24, unit: '°C', status: 'optimal', label: 'Temperature', labelRw: 'Ubushyuhe', desc: '24°C — perfect growing temperature', descRw: '24°C — ubushyuhe bwiza', icon: '🌡️', min: 0, max: 50, history: buildHistory(24, 3) },
      nitrogen: { value: 45, unit: 'mg/kg', status: 'low', label: 'Nitrogen (N)', labelRw: 'Azote (N)', desc: '45 mg/kg — below recommended', descRw: "45 mg/kg — munsi y'urwego rusabwa", icon: '🧪', min: 0, max: 200, history: buildHistory(45, 8) },
      phosphorus: { value: 32, unit: 'mg/kg', status: 'moderate', label: 'Phosphorus (P)', labelRw: 'Fosifore (P)', desc: '32 mg/kg — acceptable range', descRw: "32 mg/kg — urwego rwemewe", icon: '🔬', min: 0, max: 100, history: buildHistory(32, 6) },
      potassium: { value: 180, unit: 'mg/kg', status: 'good', label: 'Potassium (K)', labelRw: 'Potasiyumu (K)', desc: '180 mg/kg — sufficient supply', descRw: '180 mg/kg — ibihagije', icon: '⚡', min: 0, max: 300, history: buildHistory(180, 15) },
    },
    aiAdvice: 'Your soil is slightly nitrogen-deficient (45 mg/kg vs. recommended 60+). Apply 40kg/ha of organic compost within 5 days. pH 6.2 is excellent for maize and beans. Moisture at 68% is adequate — no additional watering needed this week. Consider adding mulch to retain moisture during dry spells.',
    aiAdviceRw: "Ubutaka bwawe bufite azote nke (45 mg/kg). Shyiraho 40kg/ha ya compost mu minsi 5. pH ya 6.2 ni nziza ku ibigori n'ibishyimbo. Ubuhehere kuri 68% buhagije — nta mazi yiyongera asabwa iki cyumweru.",
    controls: [
      { id: 'data_logging', label: 'Data Logging', labelRw: 'Kubika Amakuru', desc: 'Record every 15 min', descRw: 'Andika buri minota 15', enabled: true },
      { id: 'alerts', label: 'Smart Alerts', labelRw: 'Ubutumwa Bwenge', desc: 'Out-of-range notifications', descRw: 'Menyeshwa ibipimo byavuye', enabled: true },
      { id: 'sleep_mode', label: 'Power Save', labelRw: 'Gukiza Ingufu', desc: 'Reduce sampling frequency', descRw: 'Gabanya isuzumwa', enabled: false },
    ],
  },
  {
    id: 'AGR-002', name: 'Crop Health Monitor', nameRw: "Igenzura ry'Ubuzima bw'Ibihingwa",
    description: 'Analyzes crop health scores, nutrient deficiency, and growth patterns.',
    descRw: "Isesengura ubuzima bw'ibihingwa, intungamubiri, n'uburyo bwo gukura.",
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop',
    chamber: 'crop', chamberColor: 'var(--emerald-accent)', chamberIcon: '🌿',
    status: 'online', battery: 62, lastSync: '5 min ago',
    readings: {
      healthScore: { value: 82, unit: '/100', status: 'good', label: 'Health Score', labelRw: 'Amanota y\'Ubuzima', desc: 'Crops are thriving', descRw: 'Ibihingwa birimo bikura neza', icon: '💚', min: 0, max: 100, history: buildHistory(82, 5) },
      growthRate: { value: 3.2, unit: 'cm/day', status: 'optimal', label: 'Growth Rate', labelRw: 'Urwego rwo Gukura', desc: '15% above average', descRw: 'Hejuru 15%', icon: '📈', min: 0, max: 8, history: buildHistory(3.2, 0.6) },
      leafColor: { value: 88, unit: '%', status: 'good', label: 'Leaf Green Index', labelRw: 'Ibara ry\'Ibabi', desc: 'Healthy chlorophyll', descRw: 'Ibimera byiza', icon: '🍃', min: 0, max: 100, history: buildHistory(88, 4) },
      stressLevel: { value: 15, unit: '%', status: 'good', label: 'Stress Level', labelRw: 'Urwego rw\'Ihangayika', desc: 'Minimal stress', descRw: 'Gahoro gahoro', icon: '🛡️', min: 0, max: 100, history: buildHistory(15, 5) },
      deficiency: { value: 22, unit: '/100', status: 'moderate', label: 'Deficiency Index', labelRw: 'Intungamubiri Nke', desc: 'Minor nutrient gaps', descRw: 'Ibice bike', icon: '🔎', min: 0, max: 100, history: buildHistory(22, 4) },
      pestRisk: { value: 8, unit: '%', status: 'optimal', label: 'Pest Risk', labelRw: 'Ibyago by\'Ibyonnyi', desc: 'Very low risk', descRw: 'Ibyago bike cyane', icon: '🐛', min: 0, max: 100, history: buildHistory(8, 3) },
    },
    aiAdvice: 'Crops are in excellent health (82/100). Minor nutrient deficiency (index 22) — apply foliar spray with zinc + boron within 3 days. Growth rate of 3.2cm/day is 15% above seasonal average. No pest treatment needed at this time.',
    aiAdviceRw: "Ibihingwa bifite ubuzima bwiza (82/100). Intungamubiri nke (22) — shyiraho imiti ifite zinc na boron mu minsi 3. Gukura 3.2cm/umunsi ni hejuru 15%.",
    controls: [
      { id: 'daily_scan', label: 'Daily Scan', labelRw: 'Igenzura rya Buri Munsi', desc: 'Auto assessment each morning', descRw: 'Igenzura bwikora buri gitondo', enabled: true },
      { id: 'growth_tracking', label: 'Growth Tracking', labelRw: 'Gukurikirana Gukura', desc: 'Track height & canopy', descRw: 'Kurikirana uburebure', enabled: true },
      { id: 'night_mode', label: 'Night Mode', labelRw: 'Ijoro', desc: 'Infrared monitoring', descRw: 'Igenzura infrarouge', enabled: false },
    ],
  },
  {
    id: 'AGR-003', name: 'Fertilizer Analyzer', nameRw: "Isesengura ry'Ifumbire",
    description: 'Tests fertilizer compatibility, concentration safety, and nutrient release rates.',
    descRw: "Isuzuma ibihuje by'ifumbire, umutekano w'ibipimo, n'uburyo bwo gutanga intungamubiri.",
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    chamber: 'fertilizer', chamberColor: 'var(--gold)', chamberIcon: '🧬',
    status: 'offline', battery: 12, lastSync: '3h ago',
    readings: {
      compatibility: { value: 91, unit: '%', status: 'good', label: 'Soil Compatibility', labelRw: 'Guhuje n\'Ubutaka', desc: '91% compatible', descRw: "91% bihuje n'ubutaka", icon: '✅', min: 0, max: 100, history: buildHistory(91, 3) },
      concentration: { value: 78, unit: '%', status: 'safe', label: 'Concentration', labelRw: 'Ibipimo', desc: 'Safe concentration level', descRw: 'Ibipimo bikomeye', icon: '🧫', min: 0, max: 100, history: buildHistory(78, 5) },
      releaseRate: { value: 65, unit: '%', status: 'moderate', label: 'Release Rate', labelRw: 'Igipimo cyo Gutanga', desc: 'Medium-slow release', descRw: '65% — hagati', icon: '⏱️', min: 0, max: 100, history: buildHistory(65, 8) },
      npkBalance: { value: 85, unit: '/100', status: 'good', label: 'NPK Balance', labelRw: 'NPK Ihagije', desc: 'NPK 20-10-10 balanced', descRw: 'NPK 20-10-10 bihagije', icon: '⚖️', min: 0, max: 100, history: buildHistory(85, 4) },
      organicContent: { value: 42, unit: '%', status: 'moderate', label: 'Organic Content', labelRw: 'Ibintu bya Kamere', desc: '42% organic matter', descRw: '42% kamere', icon: '🌱', min: 0, max: 100, history: buildHistory(42, 6) },
      effectiveness: { value: 88, unit: '%', status: 'good', label: 'Effectiveness', labelRw: 'Imikorere', desc: '88% effective', descRw: '88% imikorere', icon: '🎯', min: 0, max: 100, history: buildHistory(88, 4) },
    },
    aiAdvice: 'Fertilizer blend (NPK 20-10-10) is 91% compatible with your soil. Organic content at 42% is below ideal — mix with compost at 3:1 ratio for better results. ⚠️ Battery critically low at 12% — please charge the device immediately to avoid data loss.',
    aiAdviceRw: "Ifumbire (NPK 20-10-10) ihuje 91% n'ubutaka bwawe. Ibintu bya kamere kuri 42% — vanga na compost 3:1. ⚠️ Bateri iri hasi cyane kuri 12% — siga vuba.",
    controls: [
      { id: 'auto_test', label: 'Auto Testing', labelRw: 'Isuzumwa Bwikora', desc: 'Test new batches automatically', descRw: 'Isuzuma bwikora', enabled: false },
      { id: 'mixing_guide', label: 'Mixing Guide', labelRw: 'Kuvanga', desc: 'AI-optimized mixing ratios', descRw: 'AI itanga igipimo', enabled: true },
      { id: 'safety_check', label: 'Safety Monitor', labelRw: 'Umutekano', desc: 'Alert if concentration is high', descRw: 'Menyesha niba ibipimo byinshi', enabled: true },
    ],
  },
];

/* ── Status color mapping ── */
const statusMeta: Record<string, { color: string; label: string; border: string }> = {
  optimal: { color: 'hsl(var(--emerald))', label: 'Optimal', border: 'hsl(var(--emerald) / 0.5)' },
  good: { color: 'hsl(var(--emerald))', label: 'Good', border: 'hsl(var(--emerald) / 0.4)' },
  safe: { color: 'hsl(var(--emerald))', label: 'Safe', border: 'hsl(var(--emerald) / 0.4)' },
  moderate: { color: 'hsl(var(--warning))', label: 'Caution', border: 'hsl(var(--warning) / 0.4)' },
  low: { color: 'hsl(var(--alert))', label: 'Low', border: 'hsl(var(--alert) / 0.4)' },
  critical: { color: 'hsl(var(--alert))', label: 'Critical', border: 'hsl(var(--alert) / 0.5)' },
};

/* ── Plant scanner results ── */
const plantScanResults = [
  { status: 'Healthy', color: 'hsl(var(--emerald))', icon: '🌿', advice: 'Your plant looks healthy! Continue providing adequate sunlight and consistent moisture.', adviceRw: 'Igihingwa cyawe kirasa neza! Komeza gutanga urumuri n\'amazi ahagije.' },
  { status: 'Nutrient Deficiency', color: 'hsl(var(--warning))', icon: '🍂', advice: 'Possible nutrient deficiency detected. Consider adding organic compost. Ensure soil pH is 6.0-7.0.', adviceRw: 'Hashobora kuba hari intungamubiri nke. Tekereza kongeraho compost.' },
  { status: 'Pest Damage', color: 'hsl(var(--alert))', icon: '🐛', advice: 'Signs of pest activity. Inspect leaves closely. Consider natural deterrents like neem oil or companion planting.', adviceRw: "Ibimenyetso by'ibyonnyi. Suzuma amababi. Tekereza gukoresha amavuta ya neem." },
];

/* ── Farming Timeline ── */
const farmingTimeline = [
  { day: 0, label: 'Soil Prep', labelRw: 'Gutegura Ubutaka', status: 'done', icon: '🌍' },
  { day: 7, label: 'Planting', labelRw: 'Gutera', status: 'done', icon: '🌱' },
  { day: 21, label: 'First Growth', labelRw: 'Gukura kwa 1', status: 'done', icon: '🌿' },
  { day: 35, label: 'Fertilizing', labelRw: 'Ifumbire', status: 'current', icon: '🧬' },
  { day: 50, label: 'Flowering', labelRw: 'Gutuza', status: 'upcoming', icon: '🌸' },
  { day: 75, label: 'Harvest', labelRw: 'Gusarura', status: 'upcoming', icon: '🌾' },
];

/* ── Mini Sparkline Component ── */
function Sparkline({ data, color, height = 28 }: { data: number[]; color: string; height?: number }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 100;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${height - ((v - min) / range) * (height - 4)}`).join(' ');
  return (
    <svg width={w} height={height} className="opacity-70">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Heatmap Bar ── */
function HeatmapBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(0 0% 15%)' }}>
      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */
export default function IoTDevices() {
  const { language } = useApp();
  const isRw = language === 'rw';

  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [selectedChamber, setSelectedChamber] = useState<string>('AGR-001');
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
  const [tick, setTick] = useState(0);

  /* Real-time data simulation — updates every 10 seconds */
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
      setTick(t => t + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, [isSimulation]);

  const toggleControl = (deviceId: string, controlId: string) => {
    setControlStates(prev => ({ ...prev, [deviceId]: { ...prev[deviceId], [controlId]: !prev[deviceId][controlId] } }));
  };

  const runNewTest = useCallback((deviceId: string) => {
    setRunningTest(deviceId);
    setTimeout(() => {
      setDevices(prev => prev.map(d => {
        if (d.id !== deviceId) return d;
        const newReadings = { ...d.readings };
        Object.keys(newReadings).forEach(key => {
          const r = { ...newReadings[key] };
          r.value = jitter(r.value, (r.max - r.min) * 0.05);
          r.value = Math.max(r.min, Math.min(r.max, r.value));
          r.history = [...r.history.slice(1), r.value];
          newReadings[key] = r;
        });
        return { ...d, readings: newReadings, lastSync: 'Just now' };
      }));
      setRunningTest(null);
    }, 3000);
  }, []);

  const startScanner = async () => {
    setShowScanner(true); setScanResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch { /* Camera unavailable */ }
  };

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanResult(plantScanResults[Math.floor(Math.random() * plantScanResults.length)]);
      setScanning(false);
      streamRef.current?.getTracks().forEach(t => t.stop());
    }, 2500);
  };

  const closeScanner = () => { setShowScanner(false); setScanResult(null); streamRef.current?.getTracks().forEach(t => t.stop()); };

  const selectedDevice = devices.find(d => d.id === selectedChamber)!;

  /* ── Overall Health Hero Score ── */
  const overallHealth = Math.round(
    devices.reduce((sum, d) => {
      const vals = Object.values(d.readings);
      const avg = vals.reduce((s, r) => s + (r.value / r.max) * 100, 0) / vals.length;
      return sum + avg;
    }, 0) / devices.length
  );
  const heroColor = overallHealth >= 70 ? 'hsl(var(--emerald))' : overallHealth >= 45 ? 'hsl(var(--warning))' : 'hsl(var(--alert))';

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">

        {/* ══ HEADER ══ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Leaf className="w-6 h-6" style={{ color: 'hsl(var(--emerald))' }} />
              {isRw ? 'AgriPio Igenzura' : 'AgriPio Monitor'}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isRw ? 'Sisitemu imwe y\'ubwoko 3 — Ubutaka · Ibihingwa · Ifumbire' : 'Unified 3-chamber system — Soil · Crop · Fertilizer'}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Virtual Device Toggle */}
            <button onClick={() => setIsSimulation(!isSimulation)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: isSimulation ? 'hsl(var(--sky) / 0.15)' : 'hsl(0 0% 10%)',
                color: isSimulation ? 'hsl(var(--sky))' : 'hsl(var(--muted-foreground))',
                border: `1px solid ${isSimulation ? 'hsl(var(--sky) / 0.4)' : 'hsl(0 0% 15%)'}`
              }}>
              <Radio className="w-3.5 h-3.5" />
              {isSimulation ? (isRw ? 'Igikoresho Cyiyerekana' : 'Virtual Device ON') : (isRw ? 'Igikoresho Nyacyo' : 'Physical Device')}
            </button>
            {/* Scan Plant */}
            <button onClick={startScanner}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
              style={{ background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }}>
              <Camera className="w-3.5 h-3.5" /> {isRw ? 'Suzuma Igihingwa' : 'Scan Plant'}
            </button>
          </div>
        </div>

        {/* ══ HEALTH HERO ══ */}
        <div className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6"
          style={{ border: `1px solid ${heroColor}30` }}>
          {/* Geometric health indicator */}
          <div className="relative flex-shrink-0">
            <div className="w-28 h-28 rounded-3xl flex items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, ${heroColor}20, ${heroColor}05)`,
                border: `2px solid ${heroColor}50`,
                boxShadow: `0 0 40px ${heroColor}20`,
              }}>
              <span className="text-3xl font-bold" style={{ color: heroColor }}>{overallHealth}</span>
              <span className="absolute bottom-2 text-[10px] font-semibold" style={{ color: heroColor }}>/ 100</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse" style={{ background: heroColor, boxShadow: `0 0 12px ${heroColor}` }} />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg font-bold">{isRw ? 'Ubuzima Rusange bw\'Imirima' : 'Overall Farm Health'}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {overallHealth >= 70
                ? (isRw ? 'Imirima yawe iri mu buzima bwiza. Komeza uburyo bwawe bwo gukora.' : 'Your farm is performing well. Continue your current practices for optimal yield.')
                : overallHealth >= 45
                  ? (isRw ? 'Ibintu bimwe bisaba kwitabwaho. Reba inama za AI hasi.' : 'Some areas need attention. Check AI recommendations below.')
                  : (isRw ? 'Ubuzima bw\'imirima ni bubi. Kora ibintu byihutirwa.' : 'Farm health is critical. Take immediate action on flagged issues.')}
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><Activity className="w-3 h-3" style={{ color: heroColor }} /> {isRw ? 'Ibyuka buri sec 10' : 'Updates every 10s'}</span>
              <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> {devices.filter(d => d.status === 'online').length}/{devices.length} {isRw ? 'online' : 'online'}</span>
              {isSimulation && <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ background: 'hsl(var(--sky) / 0.12)', color: 'hsl(var(--sky))' }}>🔮 {isRw ? 'Igikoresho Cyiyerekana' : 'Virtual Simulation'}</span>}
            </div>
          </div>
        </div>

        {/* ══ 3 CHAMBER CARDS (device selector) ══ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {devices.map(device => {
            const isActive = selectedChamber === device.id;
            const online = device.status === 'online' || isSimulation;
            const avgHealth = Math.round(Object.values(device.readings).reduce((s, r) => s + (r.value / r.max) * 100, 0) / Object.keys(device.readings).length);
            const cardColor = avgHealth >= 70 ? 'hsl(var(--emerald))' : avgHealth >= 45 ? 'hsl(var(--warning))' : 'hsl(var(--alert))';

            return (
              <div key={device.id}
                className="glass-card overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  border: isActive ? `2px solid ${cardColor}` : '1px solid hsl(0 0% 13%)',
                  transform: isActive ? 'scale(1.01)' : 'scale(1)',
                }}
                onClick={() => setSelectedChamber(device.id)}>

                {/* Image + status overlays */}
                <div className="relative h-36 overflow-hidden">
                  <img src={`${device.image}&t=${tick}`} alt={device.name} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, hsl(0 0% 4%), transparent 60%)' }} />
                  <IPWatermark variant="overlay" />

                  {/* Status pill */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold"
                    style={{ background: online ? 'hsl(var(--emerald) / 0.9)' : 'hsl(var(--alert) / 0.85)', color: 'hsl(0 0% 4%)' }}>
                    {online ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                    {online ? 'LIVE' : 'OFFLINE'}
                  </div>

                  {/* Chamber badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-mono"
                    style={{ background: 'hsl(0 0% 0% / 0.7)', color: cardColor }}>
                    {device.chamberIcon} {device.id}
                  </div>

                  {/* Battery */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]"
                    style={{ background: 'hsl(0 0% 0% / 0.7)', color: device.battery < 20 ? 'hsl(var(--alert))' : 'hsl(var(--emerald))' }}>
                    <BatteryMedium className="w-3 h-3" /> {device.battery}%
                  </div>

                  {/* Health ring */}
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
                    style={{ background: `${cardColor}20`, border: `1.5px solid ${cardColor}60`, color: cardColor }}>
                    {avgHealth}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm">{isRw ? device.nameRw : device.name}</h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{isRw ? device.descRw : device.description}</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <Clock className="w-3 h-3" /> {device.lastSync}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ══ SELECTED DEVICE DETAILS ══ */}
        <div className="space-y-4 animate-slide-up" key={selectedDevice.id}>

          {/* ── Action Bar ── */}
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold flex items-center gap-2 flex-1">
              <span className="text-xl">{selectedDevice.chamberIcon}</span>
              {isRw ? selectedDevice.nameRw : selectedDevice.name}
            </h2>
            <button
              onClick={() => runNewTest(selectedDevice.id)}
              disabled={runningTest === selectedDevice.id}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: 'hsl(var(--emerald) / 0.12)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }}>
              {runningTest === selectedDevice.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              {runningTest === selectedDevice.id ? (isRw ? 'Birimo...' : 'Testing...') : (isRw ? 'Isuzumwa Rishya' : 'Run New Test')}
            </button>
            <button
              onClick={() => { setDevices(prev => prev.map(d => d.id === selectedDevice.id ? { ...d, lastSync: 'Just now' } : d)); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium"
              style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)' }}>
              <RefreshCw className="w-3 h-3" /> {isRw ? 'Kuvugurura' : 'Refresh'}
            </button>
          </div>

          {/* ── SENSOR READING CARDS (2x3 quadrant) ── */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(selectedDevice.readings).map(([key, r]) => {
              const meta = statusMeta[r.status] || statusMeta.moderate;
              return (
                <div key={key} className="p-4 rounded-2xl transition-all hover:scale-[1.02]"
                  style={{
                    background: 'hsl(0 0% 6%)',
                    border: `1.5px solid ${meta.border}`,
                    boxShadow: `inset 0 1px 0 ${meta.border}`,
                  }}>
                  {/* Top row: icon + label + status dot */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{r.icon}</span>
                      <span className="text-[11px] text-muted-foreground font-medium">{isRw ? r.labelRw : r.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: meta.color, boxShadow: `0 0 6px ${meta.color}` }} />
                      <span className="text-[9px] font-bold uppercase" style={{ color: meta.color }}>{meta.label}</span>
                    </div>
                  </div>

                  {/* Value */}
                  <div className="flex items-baseline gap-1 mb-1.5">
                    <span className="text-2xl font-bold" style={{ color: meta.color }}>{r.value}</span>
                    <span className="text-xs text-muted-foreground">{r.unit}</span>
                  </div>

                  {/* Heatmap bar */}
                  <HeatmapBar value={r.value} max={r.max} color={meta.color} />

                  {/* Sparkline trend */}
                  <div className="mt-2">
                    <Sparkline data={r.history} color={meta.color} height={24} />
                  </div>

                  {/* Description */}
                  <p className="text-[10px] text-muted-foreground mt-1.5 leading-snug">{isRw ? r.descRw : r.desc}</p>
                </div>
              );
            })}
          </div>

          {/* ── AI ANALYSIS & ADVICE ── */}
          <div className="glass-card p-5 space-y-3"
            style={{ border: '1px solid hsl(var(--emerald) / 0.3)', background: 'hsl(145 30% 5% / 0.7)' }}>
            <h3 className="font-semibold flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                style={{ background: 'hsl(var(--emerald) / 0.15)' }}>🤖</span>
              {isRw ? 'Isesengura n\'Inama za AI' : 'AI Analysis & Advice'}
              <span className="tag emerald ml-auto text-[10px]">{isRw ? 'BYIHARIYE' : 'PERSONALIZED'}</span>
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'hsl(120 20% 85%)' }}>
              {isRw ? selectedDevice.aiAdviceRw : selectedDevice.aiAdvice}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="tag emerald">{isRw ? 'Amakuru mazima' : 'Live data'}</span>
              <span className="tag emerald">{isRw ? 'Buri sec 10' : 'Every 10s'}</span>
              {selectedDevice.battery < 20 && <span className="tag alert">⚠️ {isRw ? 'Bateri nke' : 'Low Battery'}</span>}
              {isSimulation && <span className="tag sky">🔮 {isRw ? 'Igikoresho cyiyerekana' : 'Simulated'}</span>}
            </div>
          </div>

          {/* ── DEVICE CONTROLS & PERMISSIONS ── */}
          <div className="glass-card p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
              {isRw ? 'Igenamiterere ry\'Ikigereranyo' : 'Device Controls & Permissions'}
            </h3>
            <div className="space-y-2.5">
              {selectedDevice.controls.map(ctrl => {
                const enabled = controlStates[selectedDevice.id]?.[ctrl.id] ?? ctrl.enabled;
                return (
                  <div key={ctrl.id} className="flex items-center justify-between p-3.5 rounded-xl transition-all"
                    style={{ background: 'hsl(0 0% 6%)', border: `1px solid ${enabled ? 'hsl(var(--emerald) / 0.25)' : 'hsl(0 0% 12%)'}` }}>
                    <div className="flex items-center gap-3">
                      {enabled
                        ? <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(var(--emerald))' }} />
                        : <Shield className="w-4 h-4 flex-shrink-0 text-muted-foreground" />}
                      <div>
                        <div className="text-sm font-medium">{isRw ? ctrl.labelRw : ctrl.label}</div>
                        <p className="text-[11px] text-muted-foreground">{isRw ? ctrl.descRw : ctrl.desc}</p>
                      </div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); toggleControl(selectedDevice.id, ctrl.id); }}
                      className="w-11 h-6 rounded-full flex items-center transition-all px-0.5 flex-shrink-0"
                      style={{ background: enabled ? 'hsl(var(--emerald))' : 'hsl(0 0% 25%)', justifyContent: enabled ? 'flex-end' : 'flex-start' }}>
                      <div className="w-5 h-5 rounded-full shadow-sm" style={{ background: 'white' }} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══ FARMING TIMELINE ══ */}
        <div className="glass-card p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
            {isRw ? 'Inzira y\'Ubuhinzi — AI Guided' : 'AI-Guided Farming Timeline'}
          </h3>
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {farmingTimeline.map((step, i) => {
              const isDone = step.status === 'done';
              const isCurrent = step.status === 'current';
              const stepColor = isDone ? 'hsl(var(--emerald))' : isCurrent ? 'hsl(var(--warning))' : 'hsl(0 0% 25%)';
              return (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all"
                      style={{
                        background: `${stepColor}20`,
                        border: `1.5px solid ${stepColor}`,
                        boxShadow: isCurrent ? `0 0 16px ${stepColor}40` : 'none',
                      }}>
                      {step.icon}
                    </div>
                    <span className="text-[10px] font-medium text-center" style={{ color: isDone || isCurrent ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))' }}>
                      {isRw ? step.labelRw : step.label}
                    </span>
                    <span className="text-[9px] text-muted-foreground">{isRw ? `Umunsi ${step.day}` : `Day ${step.day}`}</span>
                  </div>
                  {i < farmingTimeline.length - 1 && (
                    <div className="w-8 h-0.5 rounded-full mx-0.5" style={{ background: isDone ? 'hsl(var(--emerald))' : 'hsl(0 0% 18%)' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <IPWatermark />
      </div>

      {/* ══ PLANT SCANNER MODAL ══ */}
      {showScanner && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" style={{ background: 'hsl(0 0% 0% / 0.9)', backdropFilter: 'blur(12px)' }}>
          <div className="w-full max-w-lg animate-slide-up">
            <div className="glass-card overflow-hidden" style={{ border: '1px solid hsl(var(--emerald) / 0.3)' }}>
              <div className="flex items-center justify-between px-5 py-3" style={{ background: 'hsl(var(--emerald) / 0.1)' }}>
                <h3 className="font-semibold flex items-center gap-2">
                  <Camera className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
                  🌿 {isRw ? 'Isuzuma ry\'Igihingwa' : 'Plant Health Scanner'}
                </h3>
                <button onClick={closeScanner} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'hsl(0 0% 12%)' }}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="relative bg-black aspect-video">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                {!scanResult && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 rounded-2xl" style={{ borderColor: 'hsl(var(--emerald) / 0.6)', boxShadow: '0 0 30px hsl(var(--emerald) / 0.2)' }} />
                  </div>
                )}
                {scanning && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'hsl(0 0% 0% / 0.5)' }}>
                    <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'hsl(var(--emerald))' }} />
                    <span className="text-sm font-medium ml-3" style={{ color: 'hsl(var(--emerald))' }}>{isRw ? 'Birimo gusuzuma...' : 'Analyzing...'}</span>
                  </div>
                )}
              </div>
              {scanResult ? (
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: scanResult.color + '15', border: `1px solid ${scanResult.color}30` }}>
                    <span className="text-3xl">{scanResult.icon}</span>
                    <div>
                      <h4 className="font-semibold" style={{ color: scanResult.color }}>{scanResult.status}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{isRw ? scanResult.adviceRw : scanResult.advice}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg text-xs" style={{ background: 'hsl(var(--sky) / 0.08)', border: '1px solid hsl(var(--sky) / 0.2)', color: 'hsl(var(--sky))' }}>
                    ℹ️ {isRw ? 'Ibi ni inama rusange. Baza umujyanama.' : 'General recommendations only. Consult an agricultural advisor for treatment.'}
                  </div>
                  <button onClick={closeScanner} className="btn-emerald w-full">{isRw ? 'Funga' : 'Close'}</button>
                </div>
              ) : (
                <div className="p-5">
                  <p className="text-xs text-muted-foreground mb-4 text-center">
                    {isRw ? 'Erekana igihingwa maze ukande "Suzuma"' : 'Point your camera at the plant and tap "Scan"'}
                  </p>
                  <button onClick={handleScan} disabled={scanning} className="btn-emerald w-full flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" /> {isRw ? 'Suzuma' : 'Scan Plant'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
