import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Cpu, Wifi, WifiOff, Power, Thermometer, Droplets, Sun, Wind, Zap, Shield, Clock, AlertTriangle, CheckCircle, Settings } from 'lucide-react';

const devices = [
  {
    id: 'AGR-001',
    name: 'Soil Chamber Sensor',
    description: 'Monitors soil pH, moisture, temperature, and NPK levels in real-time. Essential for precision agriculture decisions.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
    status: 'online' as const,
    battery: 87,
    lastSync: '2 min ago',
    results: {
      ph: { value: 6.2, status: 'optimal', desc: 'Slightly acidic — ideal for most crops' },
      moisture: { value: 68, status: 'good', desc: '68% saturation — adequate hydration' },
      temperature: { value: 24, status: 'optimal', desc: '24°C — perfect growing temperature' },
      nitrogen: { value: 45, status: 'low', desc: '45 mg/kg — below recommended level' },
      phosphorus: { value: 32, status: 'moderate', desc: '32 mg/kg — acceptable range' },
      potassium: { value: 180, status: 'good', desc: '180 mg/kg — sufficient supply' },
    },
    aiAdvice: 'Your soil is slightly nitrogen-deficient. Apply 40kg/ha of urea within the next 5 days. The pH of 6.2 is excellent for maize and beans. Moisture levels are adequate — no additional watering needed this week. Consider adding compost to boost organic matter and long-term fertility.',
    controls: [
      { id: 'data_logging', label: 'Data Logging', desc: 'Record sensor data every 15 minutes', enabled: true },
      { id: 'alerts', label: 'Smart Alerts', desc: 'Get notified when values go out of range', enabled: true },
      { id: 'sleep_mode', label: 'Power Save Mode', desc: 'Reduce sampling frequency to save battery', enabled: false },
    ],
  },
  {
    id: 'AGR-002',
    name: 'Crop Health Monitor',
    description: 'Analyzes crop health scores, nutrient deficiency indices, and growth patterns using environmental sensors.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop',
    status: 'online' as const,
    battery: 62,
    lastSync: '5 min ago',
    results: {
      healthScore: { value: 82, status: 'good', desc: '82/100 — crops are thriving' },
      growthRate: { value: 3.2, status: 'optimal', desc: '3.2 cm/day — above average growth' },
      leafColor: { value: 88, status: 'good', desc: '88% green index — healthy chlorophyll' },
      stressLevel: { value: 15, status: 'low', desc: '15% stress — minimal environmental pressure' },
      deficiencyIndex: { value: 22, status: 'moderate', desc: '22/100 — minor nutrient gaps detected' },
      pestRisk: { value: 8, status: 'low', desc: '8% — very low pest probability' },
    },
    aiAdvice: 'Crops are in excellent health with an 82/100 score. The minor nutrient deficiency (index 22) suggests applying a foliar spray with micronutrients (zinc + boron) within 3 days. Growth rate of 3.2cm/day is 15% above seasonal average. Monitor leaf edges for early signs of potassium deficiency. No pest treatment needed at this time.',
    controls: [
      { id: 'daily_scan', label: 'Daily Health Scan', desc: 'Automated crop health assessment each morning', enabled: true },
      { id: 'growth_tracking', label: 'Growth Tracking', desc: 'Track plant height and canopy development', enabled: true },
      { id: 'night_mode', label: 'Night Monitoring', desc: 'Enable infrared sensors for nighttime data', enabled: false },
    ],
  },
  {
    id: 'AGR-003',
    name: 'Fertilizer Analyzer',
    description: 'Tests fertilizer compatibility, concentration safety, and nutrient release rates for optimal application.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    status: 'offline' as const,
    battery: 12,
    lastSync: '3h ago',
    results: {
      compatibility: { value: 91, status: 'good', desc: '91% compatible with current soil type' },
      concentration: { value: 78, status: 'safe', desc: 'Safe concentration — no burn risk' },
      releaseRate: { value: 65, status: 'moderate', desc: '65% — medium-speed nutrient release' },
      npkBalance: { value: 85, status: 'good', desc: 'NPK ratio 20-10-10 — well balanced' },
      organicContent: { value: 42, status: 'moderate', desc: '42% organic matter — could improve' },
      effectiveness: { value: 88, status: 'good', desc: '88% predicted effectiveness score' },
    },
    aiAdvice: 'The current fertilizer blend (NPK 20-10-10) is 91% compatible with your soil profile. However, organic content at 42% is below ideal. Consider mixing with compost at a 3:1 ratio to enhance microbial activity. ⚠️ Device battery is critically low at 12% — charge immediately to avoid data loss. The medium release rate suggests applying 2 weeks before planting for best absorption.',
    controls: [
      { id: 'auto_test', label: 'Auto Testing', desc: 'Automatically test new fertilizer batches', enabled: false },
      { id: 'mixing_guide', label: 'Mixing Recommendations', desc: 'AI-generated mixing ratios for your soil', enabled: true },
      { id: 'safety_check', label: 'Safety Monitoring', desc: 'Alert if concentration exceeds safe limits', enabled: true },
    ],
  },
];

const statusColors = {
  optimal: 'hsl(var(--emerald))',
  good: 'hsl(var(--emerald))',
  moderate: 'hsl(var(--warning))',
  low: 'hsl(var(--alert))',
  safe: 'hsl(var(--emerald))',
};

export default function IoTDevices() {
  const [expandedDevice, setExpandedDevice] = useState<string | null>('AGR-001');
  const [controlStates, setControlStates] = useState<Record<string, Record<string, boolean>>>(() => {
    const initial: Record<string, Record<string, boolean>> = {};
    devices.forEach(d => {
      initial[d.id] = {};
      d.controls.forEach(c => { initial[d.id][c.id] = c.enabled; });
    });
    return initial;
  });

  const toggleControl = (deviceId: string, controlId: string) => {
    setControlStates(prev => ({
      ...prev,
      [deviceId]: { ...prev[deviceId], [controlId]: !prev[deviceId][controlId] },
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold">🔬 IoT Smart Devices</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            AgriPio's 3-chamber smart testing system — monitor soil, crops, and fertilizer in real-time
          </p>
        </div>

        {/* 3 Device Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {devices.map(device => (
            <div
              key={device.id}
              className="glass-card overflow-hidden cursor-pointer transition-all"
              style={{
                border: expandedDevice === device.id
                  ? `2px solid ${device.status === 'online' ? 'hsl(var(--emerald))' : 'hsl(var(--alert))'}`
                  : '1px solid hsl(0 0% 13%)',
              }}
              onClick={() => setExpandedDevice(expandedDevice === device.id ? null : device.id)}
            >
              {/* Device Image */}
              <div className="relative">
                <img src={device.image} alt={device.name} className="w-full h-40 object-cover" />
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: device.status === 'online' ? 'hsl(var(--emerald) / 0.9)' : 'hsl(var(--alert) / 0.9)',
                    color: 'hsl(0 0% 4%)',
                  }}>
                  {device.status === 'online' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  {device.status.toUpperCase()}
                </div>
                <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-mono"
                  style={{ background: 'hsl(0 0% 0% / 0.7)', color: 'hsl(var(--emerald))' }}>
                  {device.id}
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                  style={{
                    background: 'hsl(0 0% 0% / 0.7)',
                    color: device.battery < 20 ? 'hsl(var(--alert))' : 'hsl(var(--emerald))',
                  }}>
                  🔋 {device.battery}%
                </div>
              </div>

              {/* Device Info */}
              <div className="p-4">
                <h3 className="font-semibold text-base">{device.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{device.description}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> Last sync: {device.lastSync}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Device Details */}
        {expandedDevice && (() => {
          const device = devices.find(d => d.id === expandedDevice)!;
          return (
            <div className="space-y-4 animate-slide-up">
              {/* Results Grid */}
              <div className="glass-card p-5">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  📊 Test Results — {device.name}
                  <span className="tag emerald text-xs ml-auto">LIVE DATA</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(device.results).map(([key, r]) => (
                    <div key={key} className="p-3 rounded-xl" style={{ background: 'hsl(0 0% 6%)', border: '1px solid hsl(0 0% 12%)' }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="w-2 h-2 rounded-full" style={{ background: statusColors[r.status as keyof typeof statusColors] || 'hsl(var(--muted-foreground))' }} />
                      </div>
                      <div className="text-xl font-bold" style={{ color: statusColors[r.status as keyof typeof statusColors] || 'hsl(var(--foreground))' }}>
                        {r.value}{typeof r.value === 'number' && r.value > 100 ? '' : key === 'ph' ? '' : key.includes('temp') ? '°C' : '%'}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Advice */}
              <div className="glass-card p-5" style={{ border: '1px solid hsl(var(--emerald) / 0.3)', background: 'hsl(145 40% 5% / 0.7)' }}>
                <h2 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-lg">🤖</span> AI Analysis & Advice
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(120 20% 85%)' }}>
                  {device.aiAdvice}
                </p>
                <div className="flex gap-2 mt-4">
                  <span className="tag emerald">Personalized</span>
                  <span className="tag emerald">Updated live</span>
                  {device.battery < 20 && <span className="tag alert">⚠️ Low Battery</span>}
                </div>
              </div>

              {/* Control Allowances */}
              <div className="glass-card p-5">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
                  Device Controls & Permissions
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
                            {ctrl.label}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{ctrl.desc}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleControl(device.id, ctrl.id); }}
                          className="w-12 h-6 rounded-full flex items-center transition-all px-0.5"
                          style={{
                            background: enabled ? 'hsl(var(--emerald))' : 'hsl(0 0% 25%)',
                            justifyContent: enabled ? 'flex-end' : 'flex-start',
                          }}>
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
      </div>
    </DashboardLayout>
  );
}
