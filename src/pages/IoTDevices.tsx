/**
 * IoT Smart Devices — 3-Chamber system with Plant Camera Scanner
 * Includes: Soil, Crop, Fertilizer chambers + Plant scanning + AI advice
 * Controls: Data Logging, Smart Alerts (NO irrigation)
 * © 2026 AgriPio — All rights reserved.
 */
import { useState, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import IPWatermark from '@/components/IPWatermark';
import { useApp } from '@/contexts/AppContext';
import { 
  Cpu, Wifi, WifiOff, Thermometer, Droplets, Sun, Wind, 
  Shield, Clock, AlertTriangle, CheckCircle, Settings, Camera,
  Leaf, Zap, Eye, X, Loader2
} from 'lucide-react';

const devices = [
  {
    id: 'AGR-001', name: 'Soil Chamber Sensor',
    nameRw: 'Senseur y\'Ubutaka',
    description: 'Monitors soil pH, moisture, temperature, and NPK levels in real-time. Essential for precision agriculture decisions.',
    descRw: 'Igenzura pH y\'ubutaka, ubuhehere, ubushyuhe, n\'ibipimo bya NPK mu gihe nyacyo.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
    status: 'online' as const, battery: 87, lastSync: '2 min ago',
    results: {
      ph: { value: 6.2, status: 'optimal', desc: 'Slightly acidic — ideal for most crops', descRw: 'Bitose gato — byiza ku bihingwa byinshi' },
      moisture: { value: 68, status: 'good', desc: '68% saturation — adequate hydration', descRw: '68% — ubuhehere buhagije' },
      temperature: { value: 24, status: 'optimal', desc: '24°C — perfect growing temperature', descRw: '24°C — ubushyuhe bwiza bwo gukura' },
      nitrogen: { value: 45, status: 'low', desc: '45 mg/kg — below recommended level', descRw: '45 mg/kg — munsi y\'urwego rusabwa' },
      phosphorus: { value: 32, status: 'moderate', desc: '32 mg/kg — acceptable range', descRw: '32 mg/kg — urwego rwemewe' },
      potassium: { value: 180, status: 'good', desc: '180 mg/kg — sufficient supply', descRw: '180 mg/kg — ibihagije' },
    },
    aiAdvice: 'Your soil is slightly nitrogen-deficient. Apply 40kg/ha of urea within the next 5 days. The pH of 6.2 is excellent for maize and beans. Moisture levels are adequate — no additional watering needed this week. Consider adding compost to boost organic matter.',
    aiAdviceRw: 'Ubutaka bwawe bufite azote nke. Shyiraho 40kg/ha ya urea mu minsi 5 iri imbere. pH ya 6.2 ni nziza ku ibigori n\'ibishyimbo. Ubuhehere buhagije — nta mazi yiyongera asabwa iki cyumweru.',
    controls: [
      { id: 'data_logging', label: 'Data Logging', labelRw: 'Kubika Amakuru', desc: 'Record sensor data every 15 minutes', descRw: 'Andika amakuru ya senseur buri minota 15', enabled: true },
      { id: 'alerts', label: 'Smart Alerts', labelRw: 'Ubutumwa Bwenge', desc: 'Get notified when values go out of range', descRw: 'Menyeshwa iyo ibipimo byavuye mu rwego', enabled: true },
      { id: 'sleep_mode', label: 'Power Save Mode', labelRw: 'Gukiza Ingufu', desc: 'Reduce sampling to save battery', descRw: 'Gabanya isuzumwa kugira ngo ubike bateri', enabled: false },
    ],
  },
  {
    id: 'AGR-002', name: 'Crop Health Monitor',
    nameRw: 'Igenzura ry\'Ubuzima bw\'Ibihingwa',
    description: 'Analyzes crop health scores, nutrient deficiency indices, and growth patterns using environmental sensors.',
    descRw: 'Isesengura amanota y\'ubuzima bw\'ibihingwa, ibipimo by\'intungamubiri, n\'uburyo byo gukura.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop',
    status: 'online' as const, battery: 62, lastSync: '5 min ago',
    results: {
      healthScore: { value: 82, status: 'good', desc: '82/100 — crops are thriving', descRw: '82/100 — ibihingwa birimo bikura neza' },
      growthRate: { value: 3.2, status: 'optimal', desc: '3.2 cm/day — above average', descRw: '3.2 cm/umunsi — hejuru y\'umubare' },
      leafColor: { value: 88, status: 'good', desc: '88% green index — healthy', descRw: '88% — ibimera byiza' },
      stressLevel: { value: 15, status: 'low', desc: '15% stress — minimal', descRw: '15% — gahoro gahoro' },
      deficiencyIndex: { value: 22, status: 'moderate', desc: '22/100 — minor gaps', descRw: '22/100 — ibice bike' },
      pestRisk: { value: 8, status: 'low', desc: '8% — very low risk', descRw: '8% — ibyago bike cyane' },
    },
    aiAdvice: 'Crops are in excellent health (82/100). Minor nutrient deficiency (index 22) — apply foliar spray with zinc + boron within 3 days. Growth rate 3.2cm/day is 15% above seasonal average. No pest treatment needed.',
    aiAdviceRw: 'Ibihingwa bifite ubuzima bwiza (82/100). Intungamubiri nke (22) — shyiraho imiti ifite zinc na boron mu minsi 3. Gukura 3.2cm/umunsi ni hejuru 15% y\'umubare w\'igihe.',
    controls: [
      { id: 'daily_scan', label: 'Daily Health Scan', labelRw: 'Igenzura rya Buri Munsi', desc: 'Automated assessment each morning', descRw: 'Igenzura bwikora buri gitondo', enabled: true },
      { id: 'growth_tracking', label: 'Growth Tracking', labelRw: 'Gukurikirana Gukura', desc: 'Track height and canopy', descRw: 'Kurikirana uburebure n\'ibisigazwa', enabled: true },
      { id: 'night_mode', label: 'Night Monitoring', labelRw: 'Igenzura ry\'Ijoro', desc: 'Enable infrared for nighttime', descRw: 'Gufungura infrarouge ku ijoro', enabled: false },
    ],
  },
  {
    id: 'AGR-003', name: 'Fertilizer Analyzer',
    nameRw: 'Isesengura ry\'Ifumbire',
    description: 'Tests fertilizer compatibility, concentration safety, and nutrient release rates for optimal application.',
    descRw: 'Isuzuma ibihuje by\'ifumbire, umutekano w\'ibipimo, n\'uburyo bwo gutanga intungamubiri.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    status: 'offline' as const, battery: 12, lastSync: '3h ago',
    results: {
      compatibility: { value: 91, status: 'good', desc: '91% compatible with soil', descRw: '91% bihuje n\'ubutaka' },
      concentration: { value: 78, status: 'safe', desc: 'Safe concentration', descRw: 'Ibipimo bikomeye' },
      releaseRate: { value: 65, status: 'moderate', desc: '65% — medium release', descRw: '65% — kuguruka kw\'hagati' },
      npkBalance: { value: 85, status: 'good', desc: 'NPK 20-10-10 balanced', descRw: 'NPK 20-10-10 bihagije' },
      organicContent: { value: 42, status: 'moderate', desc: '42% organic matter', descRw: '42% ibintu bya kamere' },
      effectiveness: { value: 88, status: 'good', desc: '88% effectiveness', descRw: '88% imikorere' },
    },
    aiAdvice: 'Fertilizer blend (NPK 20-10-10) is 91% compatible with your soil. Organic content at 42% is below ideal — mix with compost at 3:1 ratio. ⚠️ Battery critically low at 12% — charge immediately.',
    aiAdviceRw: 'Ifumbire (NPK 20-10-10) ihuje 91% n\'ubutaka bwawe. Ibintu bya kamere kuri 42% — vanga na compost ku igipimo cya 3:1. ⚠️ Bateri iri hasi cyane kuri 12% — siga vuba.',
    controls: [
      { id: 'auto_test', label: 'Auto Testing', labelRw: 'Isuzumwa Bwikora', desc: 'Auto test new batches', descRw: 'Isuzuma bwikora ibicuruzwa bishya', enabled: false },
      { id: 'mixing_guide', label: 'Mixing Guide', labelRw: 'Amabwiriza yo Kuvanga', desc: 'AI mixing ratios for soil', descRw: 'AI itanga igipimo cyo kuvanga', enabled: true },
      { id: 'safety_check', label: 'Safety Monitor', labelRw: 'Igenzura ry\'Umutekano', desc: 'Alert if concentration too high', descRw: 'Menyesha niba ibipimo byinshi', enabled: true },
    ],
  },
];

const statusColors: Record<string, string> = {
  optimal: 'hsl(var(--emerald))', good: 'hsl(var(--emerald))', moderate: 'hsl(var(--warning))', low: 'hsl(var(--alert))', safe: 'hsl(var(--emerald))',
};

// Plant scanner results (safe general advice only)
const plantScanResults = [
  { status: 'Healthy', color: 'hsl(var(--emerald))', icon: '🌿', advice: 'Your plant looks healthy! Continue providing adequate sunlight and water. Maintain consistent soil moisture levels.', adviceRw: 'Igihingwa cyawe kirasa neza! Komeza gutanga urumuri n\'amazi ahagije. Komeza ubuhehere bw\'ubutaka.' },
  { status: 'Nutrient Deficiency', color: 'hsl(var(--warning))', icon: '🍂', advice: 'Possible nutrient deficiency detected. Consider adding organic compost or balanced fertilizer. Ensure soil pH is between 6.0-7.0.', adviceRw: 'Hashobora kuba hari intungamubiri nke. Tekereza kongeraho compost cyangwa ifumbire ihagije.' },
  { status: 'Pest Damage', color: 'hsl(var(--alert))', icon: '🐛', advice: 'Signs of pest activity observed. Inspect leaves closely for insects. Consider natural pest deterrents like neem oil or companion planting.', adviceRw: 'Ibimenyetso by\'ibyonnyi byagaragaye. Suzuma amababi. Tekereza gukoresha amavuta ya neem.' },
];

export default function IoTDevices() {
  const { language } = useApp();
  const isRw = language === 'rw';
  const [expandedDevice, setExpandedDevice] = useState<string | null>('AGR-001');
  const [controlStates, setControlStates] = useState<Record<string, Record<string, boolean>>>(() => {
    const initial: Record<string, Record<string, boolean>> = {};
    devices.forEach(d => { initial[d.id] = {}; d.controls.forEach(c => { initial[d.id][c.id] = c.enabled; }); });
    return initial;
  });
  // Plant Scanner State
  const [showScanner, setShowScanner] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<typeof plantScanResults[0] | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const toggleControl = (deviceId: string, controlId: string) => {
    setControlStates(prev => ({ ...prev, [deviceId]: { ...prev[deviceId], [controlId]: !prev[deviceId][controlId] } }));
  };

  const startScanner = async () => {
    setShowScanner(true);
    setScanResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      // Camera not available — still show UI
    }
  };

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      const result = plantScanResults[Math.floor(Math.random() * plantScanResults.length)];
      setScanResult(result);
      setScanning(false);
      // Stop camera
      streamRef.current?.getTracks().forEach(t => t.stop());
    }, 2000);
  };

  const closeScanner = () => {
    setShowScanner(false);
    setScanResult(null);
    streamRef.current?.getTracks().forEach(t => t.stop());
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">🔬 {isRw ? 'Ibikoresho bya IoT' : 'IoT Smart Devices'}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isRw ? 'Sisitemu y\'ubwoko 3 — Genzura ubutaka, ibihingwa, n\'ifumbire' : 'AgriPio\'s 3-chamber smart testing system — monitor soil, crops, and fertilizer'}
            </p>
          </div>
          <button onClick={startScanner} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }}>
            <Camera className="w-4 h-4" /> {isRw ? '🌿 Suzuma Igihingwa' : '🌿 Scan Plant'}
          </button>
        </div>

        {/* 3 Device Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {devices.map(device => (
            <div key={device.id} className="glass-card overflow-hidden cursor-pointer transition-all"
              style={{ border: expandedDevice === device.id ? `2px solid ${device.status === 'online' ? 'hsl(var(--emerald))' : 'hsl(var(--alert))'}` : '1px solid hsl(0 0% 13%)' }}
              onClick={() => setExpandedDevice(expandedDevice === device.id ? null : device.id)}>
              <div className="relative">
                <img src={device.image} alt={device.name} className="w-full h-40 object-cover" />
                <IPWatermark variant="overlay" />
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ background: device.status === 'online' ? 'hsl(var(--emerald) / 0.9)' : 'hsl(var(--alert) / 0.9)', color: 'hsl(0 0% 4%)' }}>
                  {device.status === 'online' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  {device.status.toUpperCase()}
                </div>
                <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-mono" style={{ background: 'hsl(0 0% 0% / 0.7)', color: 'hsl(var(--emerald))' }}>
                  {device.id}
                </div>
                <div className="absolute bottom-8 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                  style={{ background: 'hsl(0 0% 0% / 0.7)', color: device.battery < 20 ? 'hsl(var(--alert))' : 'hsl(var(--emerald))' }}>
                  🔋 {device.battery}%
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-base">{isRw ? device.nameRw : device.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{isRw ? device.descRw : device.description}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> {isRw ? 'Guhuza guheruka' : 'Last sync'}: {device.lastSync}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded */}
        {expandedDevice && (() => {
          const device = devices.find(d => d.id === expandedDevice)!;
          return (
            <div className="space-y-4 animate-slide-up">
              <div className="glass-card p-5">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  📊 {isRw ? 'Ibisubizo' : 'Test Results'} — {isRw ? device.nameRw : device.name}
                  <span className="tag emerald text-xs ml-auto">{isRw ? 'AMAKURU MAZIMA' : 'LIVE DATA'}</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(device.results).map(([key, r]) => (
                    <div key={key} className="p-3 rounded-xl" style={{ background: 'hsl(0 0% 6%)', border: '1px solid hsl(0 0% 12%)' }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="w-2 h-2 rounded-full" style={{ background: statusColors[r.status] || 'hsl(var(--muted-foreground))' }} />
                      </div>
                      <div className="text-xl font-bold" style={{ color: statusColors[r.status] || 'hsl(var(--foreground))' }}>
                        {r.value}{typeof r.value === 'number' && r.value > 100 ? '' : key === 'ph' ? '' : key.includes('temp') ? '°C' : '%'}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{isRw ? r.descRw : r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5" style={{ border: '1px solid hsl(var(--emerald) / 0.3)', background: 'hsl(145 40% 5% / 0.7)' }}>
                <h2 className="font-semibold mb-3 flex items-center gap-2"><span className="text-lg">🤖</span> {isRw ? 'Isesengura n\'Inama za AI' : 'AI Analysis & Advice'}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(120 20% 85%)' }}>{isRw ? device.aiAdviceRw : device.aiAdvice}</p>
                <div className="flex gap-2 mt-4">
                  <span className="tag emerald">{isRw ? 'Byihariye' : 'Personalized'}</span>
                  <span className="tag emerald">{isRw ? 'Byavuguruwe' : 'Updated live'}</span>
                  {device.battery < 20 && <span className="tag alert">⚠️ {isRw ? 'Bateri nke' : 'Low Battery'}</span>}
                </div>
              </div>

              <div className="glass-card p-5">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
                  {isRw ? 'Igenamiterere ry\'Ikigereranyo' : 'Device Controls & Permissions'}
                </h2>
                <div className="space-y-3">
                  {device.controls.map(ctrl => {
                    const enabled = controlStates[device.id]?.[ctrl.id] ?? ctrl.enabled;
                    return (
                      <div key={ctrl.id} className="flex items-center justify-between p-4 rounded-xl"
                        style={{ background: 'hsl(0 0% 6%)', border: `1px solid ${enabled ? 'hsl(var(--emerald) / 0.3)' : 'hsl(0 0% 12%)'}` }}>
                        <div>
                          <div className="text-sm font-medium flex items-center gap-2">
                            {enabled ? <CheckCircle className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} /> : <Shield className="w-4 h-4 text-muted-foreground" />}
                            {isRw ? ctrl.labelRw : ctrl.label}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{isRw ? ctrl.descRw : ctrl.desc}</p>
                        </div>
                        <button onClick={e => { e.stopPropagation(); toggleControl(device.id, ctrl.id); }}
                          className="w-12 h-6 rounded-full flex items-center transition-all px-0.5"
                          style={{ background: enabled ? 'hsl(var(--emerald))' : 'hsl(0 0% 25%)', justifyContent: enabled ? 'flex-end' : 'flex-start' }}>
                          <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        <IPWatermark />
      </div>

      {/* Plant Scanner Modal */}
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

              {/* Camera */}
              <div className="relative bg-black aspect-video">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                {!scanResult && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 rounded-2xl" style={{ borderColor: 'hsl(var(--emerald) / 0.6)', boxShadow: '0 0 30px hsl(var(--emerald) / 0.2)' }} />
                  </div>
                )}
                {scanning && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'hsl(0 0% 0% / 0.5)' }}>
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'hsl(var(--emerald))' }} />
                      <span className="text-sm font-medium" style={{ color: 'hsl(var(--emerald))' }}>
                        {isRw ? 'Birimo gusuzuma...' : 'Analyzing plant...'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Result */}
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
                    ℹ️ {isRw ? 'Ibi ni inama rusange. Ku bundi bufasha, baza umujyanama w\'ubuhinzi.' : 'These are general recommendations. For specific treatment, consult an agricultural advisor.'}
                  </div>
                  <button onClick={closeScanner} className="btn-emerald w-full">{isRw ? 'Funga' : 'Close'}</button>
                </div>
              ) : (
                <div className="p-5">
                  <p className="text-xs text-muted-foreground mb-4 text-center">
                    {isRw ? 'Erekana igihingwa mu kibanza cy\'urumuri maze ukande "Suzuma"' : 'Point your camera at the plant and tap "Scan" to analyze'}
                  </p>
                  <button onClick={handleScan} disabled={scanning} className="btn-emerald w-full flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" /> {isRw ? 'Suzuma Igihingwa' : 'Scan Plant'}
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
