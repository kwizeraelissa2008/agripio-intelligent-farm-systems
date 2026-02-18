import { useApp, FarmerMode } from '@/contexts/AppContext';
import { Brain, Wrench, TrendingUp, Factory } from 'lucide-react';

const modes: { id: FarmerMode; icon: any; emoji: string; label: string; desc: string; color: string }[] = [
  { id: 'smart', icon: Brain, emoji: '🤖', label: 'AI Smart Mode', desc: 'Full AI automation', color: 'hsl(145 100% 39%)' },
  { id: 'manual', icon: Wrench, emoji: '🔧', label: 'Manual Mode', desc: 'Manual control', color: 'hsl(200 90% 50%)' },
  { id: 'market', icon: TrendingUp, emoji: '📊', label: 'Market Focus', desc: 'Price & demand', color: 'hsl(43 96% 56%)' },
  { id: 'production', icon: Factory, emoji: '⚙️', label: 'Production', desc: 'Yield focus', color: 'hsl(20 30% 50%)' },
];

export default function ModeSwitch() {
  const { farmerMode, setFarmerMode } = useApp();
  return (
    <div className="flex items-center gap-2 p-1 rounded-xl" style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 13%)' }}>
      {modes.map(m => {
        const active = farmerMode === m.id;
        return (
          <button key={m.id} onClick={() => setFarmerMode(m.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium"
            style={active ? { background: m.color + '20', color: m.color, border: `1px solid ${m.color}40` } : { color: 'hsl(120 10% 55%)', border: '1px solid transparent' }}
            title={m.desc}>
            <span className="text-base">{m.emoji}</span>
            <span className="hidden md:inline">{m.label}</span>
          </button>
        );
      })}
    </div>
  );
}
