import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Cpu, Plus, Wifi, WifiOff, Activity, RefreshCw } from 'lucide-react';

const mockDevices = [
  { id: 'AGR-001', name: 'Field A Sensor', field: 'North Field', status: 'online', lastSync: '2 min ago', battery: 87, ph: 6.2, nitrogen: 45, moisture: 68 },
  { id: 'AGR-002', name: 'Field B Sensor', field: 'East Field', status: 'online', lastSync: '5 min ago', battery: 62, ph: 5.8, nitrogen: 38, moisture: 55 },
  { id: 'AGR-003', name: 'Field C Sensor', field: 'South Field', status: 'offline', lastSync: '3h ago', battery: 12, ph: 6.5, nitrogen: 52, moisture: 72 },
];

export default function IoTDevices() {
  const [virtualMode, setVirtualMode] = useState(false);
  const [virtualData, setVirtualData] = useState({ ph: '6.2', nitrogen: '45', phosphorus: '32', moisture: '68' });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">IoT Devices</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Real-time soil sensor network management</p>
          </div>
          <button className="btn-emerald flex items-center gap-2"><Plus className="w-4 h-4" /> Add Device</button>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-3">
          <button onClick={() => setVirtualMode(false)} className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={!virtualMode ? { background: 'hsl(145 100% 39%)', color: 'hsl(0 0% 4%)' } : { background: 'hsl(0 0% 10%)', color: 'hsl(120 10% 55%)', border: '1px solid hsl(0 0% 15%)' }}>
            📡 Physical Devices
          </button>
          <button onClick={() => setVirtualMode(true)} className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={virtualMode ? { background: 'hsl(200 90% 50%)', color: 'hsl(0 0% 4%)' } : { background: 'hsl(0 0% 10%)', color: 'hsl(120 10% 55%)', border: '1px solid hsl(0 0% 15%)' }}>
            🧪 Virtual Simulation Mode
          </button>
        </div>

        {virtualMode ? (
          <div className="glass-card p-6" style={{ border: '1px solid hsl(200 90% 50% / 0.3)' }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🧪</span>
              <div>
                <h2 className="font-semibold">Virtual Simulation Mode</h2>
                <p className="text-xs text-muted-foreground">No physical device? Enter soil data manually for AI analysis.</p>
              </div>
              <span className="tag ml-auto" style={{ background: 'hsl(200 90% 50% / 0.15)', color: 'hsl(200 90% 50%)' }}>SIMULATED</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(virtualData).map(([key, value]) => (
                <div key={key}>
                  <label className="text-xs text-muted-foreground mb-1.5 block capitalize">{key === 'ph' ? 'Soil pH' : key}</label>
                  <input value={value} onChange={e => setVirtualData(p => ({ ...p, [key]: e.target.value }))} type="number"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)', color: 'hsl(120 20% 96%)' }} />
                </div>
              ))}
            </div>
            <button className="btn-emerald mt-4 w-full">🤖 Run AI Analysis on Virtual Data</button>
          </div>
        ) : (
          <div className="space-y-4">
            {mockDevices.map(device => (
              <div key={device.id} className="glass-card p-5" style={{ border: device.status === 'offline' ? '1px solid hsl(0 100% 66% / 0.2)' : '1px solid hsl(145 100% 39% / 0.15)' }}>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: device.status === 'online' ? 'hsl(145 100% 39% / 0.1)' : 'hsl(0 100% 66% / 0.1)' }}>
                      {device.status === 'online' ? <Wifi className="w-6 h-6" style={{ color: 'hsl(145 100% 39%)' }} /> : <WifiOff className="w-6 h-6" style={{ color: 'hsl(0 100% 66%)' }} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{device.name}</h3>
                        <span className="status-dot" style={{ background: device.status === 'online' ? 'hsl(145 100% 39%)' : 'hsl(0 100% 66%)' }} />
                      </div>
                      <p className="text-xs text-muted-foreground">{device.id} • {device.field} • Sync: {device.lastSync}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: 'pH', value: device.ph },
                      { label: 'N (mg/kg)', value: device.nitrogen },
                      { label: 'Moisture %', value: device.moisture },
                      { label: 'Battery', value: `${device.battery}%` },
                    ].map(m => (
                      <div key={m.label} className="text-center p-2 rounded-lg" style={{ background: 'hsl(0 0% 8%)' }}>
                        <div className="text-xs text-muted-foreground">{m.label}</div>
                        <div className="font-bold text-sm" style={{ color: m.label === 'Battery' && device.battery < 20 ? 'hsl(0 100% 66%)' : 'hsl(145 100% 39%)' }}>{m.value}</div>
                      </div>
                    ))}
                  </div>
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-all"><RefreshCw className="w-4 h-4 text-muted-foreground" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
