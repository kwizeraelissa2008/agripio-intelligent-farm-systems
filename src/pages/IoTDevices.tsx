/**
 * AgriPio IoT — Bluetooth, Camera Plant Scan, Arduino Data Flow
 * © 2026 AgriPio Team
 */
import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import {
  Bluetooth, Camera, Cpu, Wifi, WifiOff, Loader2, RefreshCw,
  Leaf, X, Activity, CheckCircle, Droplets
} from 'lucide-react';

const plantScanResults = [
  { status: 'Healthy', color: 'hsl(var(--emerald))', icon: '🌿', advice: 'Plant looks healthy! Keep watering consistently. 💧' },
  { status: 'Nutrient Deficiency', color: 'hsl(var(--warning))', icon: '🍂', advice: 'Possible nutrient deficiency. Add organic compost. pH should be 6.0-7.0.' },
  { status: 'Pest Damage', color: 'hsl(var(--alert))', icon: '🐛', advice: 'Signs of pest activity. Try neem oil spray or companion planting with marigolds.' },
];

const jitter = (base: number, range: number) => +(base + (Math.random() - 0.5) * range).toFixed(1);

export default function IoTDevices() {
  const { language } = useApp();
  const isRw = language === 'rw';

  // Bluetooth
  const [btStatus, setBtStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [btDevice, setBtDevice] = useState<string | null>(null);

  // Camera scanner
  const [showScanner, setShowScanner] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<typeof plantScanResults[0] | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Arduino data
  const [arduinoConnected, setArduinoConnected] = useState(false);
  const [moisture, setMoisture] = useState(68);
  const [ph, setPh] = useState(6.2);
  const [moistureHistory, setMoistureHistory] = useState<number[]>(() => Array.from({ length: 20 }, () => jitter(68, 8)));
  const [phHistory, setPhHistory] = useState<number[]>(() => Array.from({ length: 20 }, () => jitter(6.2, 0.4)));

  // Live data simulation when Arduino connected
  useEffect(() => {
    if (!arduinoConnected) return;
    const interval = setInterval(() => {
      const newM = Math.max(0, Math.min(100, jitter(moisture, 4)));
      const newP = Math.max(0, Math.min(14, jitter(ph, 0.3)));
      setMoisture(newM);
      setPh(newP);
      setMoistureHistory(prev => [...prev.slice(1), newM]);
      setPhHistory(prev => [...prev.slice(1), newP]);
    }, 3000);
    return () => clearInterval(interval);
  }, [arduinoConnected, moisture, ph]);

  const connectBluetooth = async () => {
    setBtStatus('connecting');
    // Simulate BT pairing
    setTimeout(() => {
      setBtStatus('connected');
      setBtDevice('AgriPio-Sensor-001');
    }, 2500);
  };

  const startScanner = async () => {
    setShowScanner(true);
    setScanResult(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = s;
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch {}
  };

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanResult(plantScanResults[Math.floor(Math.random() * plantScanResults.length)]);
      setScanning(false);
      streamRef.current?.getTracks().forEach(t => t.stop());
    }, 2500);
  };

  const closeScanner = () => {
    setShowScanner(false);
    setScanResult(null);
    streamRef.current?.getTracks().forEach(t => t.stop());
  };

  function Sparkline({ data, color, height = 40 }: { data: number[]; color: string; height?: number }) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const w = 200;
    const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${height - ((v - min) / range) * (height - 4)}`).join(' ');
    return (
      <svg width="100%" viewBox={`0 0 ${w} ${height}`} className="mt-2">
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-5 animate-fade-in pb-24">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Cpu className="w-5 h-5" style={{ color: 'hsl(var(--emerald))' }} />
            {isRw ? 'Ikoranabuhanga rya IoT' : 'IoT Devices'}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isRw ? 'Huza, suzuma, kandi ukurikirane' : 'Connect, scan, and monitor your farm'}
          </p>
        </div>

        {/* Bluetooth Connection */}
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Bluetooth className="w-4 h-4" style={{ color: 'hsl(var(--sky))' }} />
            {isRw ? 'Bluetooth' : 'Bluetooth Connection'}
          </h2>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${btStatus === 'connected' ? 'animate-pulse' : ''}`}
              style={{
                background: btStatus === 'connected' ? 'hsl(var(--emerald) / 0.15)' : btStatus === 'connecting' ? 'hsl(var(--sky) / 0.15)' : 'hsl(var(--secondary))',
                border: `2px solid ${btStatus === 'connected' ? 'hsl(var(--emerald) / 0.4)' : btStatus === 'connecting' ? 'hsl(var(--sky) / 0.4)' : 'hsl(var(--border))'}`,
                boxShadow: btStatus === 'connected' ? '0 0 20px hsl(var(--emerald) / 0.2)' : 'none',
              }}>
              <Bluetooth className="w-7 h-7" style={{ color: btStatus === 'connected' ? 'hsl(var(--emerald))' : btStatus === 'connecting' ? 'hsl(var(--sky))' : 'hsl(var(--muted-foreground))' }} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">
                {btStatus === 'connected' ? `✅ ${btDevice}` : btStatus === 'connecting' ? '🔄 Pairing...' : 'No device paired'}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {btStatus === 'connected' ? 'Receiving sensor data via Bluetooth' : 'Tap to pair with AgriPio sensor'}
              </p>
            </div>
            {btStatus !== 'connected' && (
              <button onClick={connectBluetooth} disabled={btStatus === 'connecting'}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                style={{ background: 'hsl(var(--sky) / 0.15)', color: 'hsl(var(--sky))', border: '1px solid hsl(var(--sky) / 0.3)' }}>
                {btStatus === 'connecting' ? <Loader2 className="w-4 h-4 animate-spin" /> : (isRw ? 'Huza' : 'Pair')}
              </button>
            )}
          </div>
        </div>

        {/* Camera: Plant Scanner */}
        <div className="glass-card p-5">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Camera className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
            {isRw ? 'Suzuma Igihingwa' : 'Plant Health Scanner'}
          </h2>
          <p className="text-xs text-muted-foreground mb-3">
            {isRw ? 'Fata ifoto y\'igihingwa cyawe, AI izagisuzuma.' : 'Take a photo of your plant and AI will analyze its health.'}
          </p>
          
          {!showScanner ? (
            <button onClick={startScanner}
              className="w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              style={{ background: 'hsl(var(--emerald) / 0.12)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }}>
              <Camera className="w-5 h-5" /> {isRw ? '📸 Fungura Kamera' : '📸 Open Camera'}
            </button>
          ) : (
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
                {!scanResult && <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />}
                {scanning && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
                    <Loader2 className="w-10 h-10 animate-spin" style={{ color: 'hsl(var(--emerald))' }} />
                    <p className="text-sm mt-2 text-white">{isRw ? 'AI irimo gusuzuma...' : 'AI analyzing plant...'}</p>
                  </div>
                )}
                {scanResult && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                    style={{ background: 'hsl(var(--card) / 0.95)' }}>
                    <span className="text-5xl mb-3">{scanResult.icon}</span>
                    <h3 className="text-lg font-bold mb-2" style={{ color: scanResult.color }}>{scanResult.status}</h3>
                    <p className="text-sm text-muted-foreground">{scanResult.advice}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {!scanResult && !scanning && (
                  <button onClick={handleScan}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold"
                    style={{ background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }}>
                    🔍 {isRw ? 'Suzuma' : 'Analyze'}
                  </button>
                )}
                <button onClick={closeScanner}
                  className="px-4 py-3 rounded-xl text-sm font-medium bg-secondary border border-border">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Arduino Data Flow */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4" style={{ color: 'hsl(var(--gold))' }} />
              {isRw ? 'Arduino Data' : 'Arduino Data Flow'}
            </h2>
            <button onClick={() => setArduinoConnected(!arduinoConnected)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
              style={{ 
                background: arduinoConnected ? 'hsl(var(--emerald) / 0.15)' : 'hsl(var(--secondary))',
                color: arduinoConnected ? 'hsl(var(--emerald))' : 'hsl(var(--muted-foreground))',
                border: `1px solid ${arduinoConnected ? 'hsl(var(--emerald) / 0.3)' : 'hsl(var(--border))'}`,
              }}>
              {arduinoConnected ? <><CheckCircle className="w-3.5 h-3.5" /> Synced</> : <><RefreshCw className="w-3.5 h-3.5" /> Sync</>}
            </button>
          </div>

          {!arduinoConnected ? (
            <div className="text-center py-8">
              <Cpu className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{isRw ? 'Kanda Sync kugira ngo uhuze Arduino' : 'Tap Sync to connect your Arduino device'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Moisture */}
              <div className="p-4 rounded-xl bg-secondary border border-border">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4" style={{ color: 'hsl(var(--sky))' }} />
                    <span className="text-sm font-medium">{isRw ? 'Ubuhehere' : 'Moisture'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold">{moisture}</span>
                    <span className="text-xs text-muted-foreground">%</span>
                    <Wifi className="w-3 h-3 ml-1" style={{ color: 'hsl(var(--emerald))' }} />
                  </div>
                </div>
                <Sparkline data={moistureHistory} color="hsl(200 80% 55%)" />
              </div>

              {/* pH */}
              <div className="p-4 rounded-xl bg-secondary border border-border">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
                    <span className="text-sm font-medium">pH Level</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold">{ph}</span>
                    <span className="text-xs text-muted-foreground">pH</span>
                    <Wifi className="w-3 h-3 ml-1" style={{ color: 'hsl(var(--emerald))' }} />
                  </div>
                </div>
                <Sparkline data={phHistory} color="hsl(145 80% 45%)" />
              </div>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="text-center pt-2">
          <p className="text-xs font-medium" style={{ color: 'hsl(var(--emerald))' }}>© 2026 AgriPio Team</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
