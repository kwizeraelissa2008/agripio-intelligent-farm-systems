import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden relative"
      style={{ background: 'linear-gradient(145deg, hsl(145 30% 95%), hsl(145 20% 88%), hsl(145 15% 92%))' }}>
      
      {/* Soft glow orb */}
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(145 80% 45% / 0.12) 0%, transparent 70%)' }} />

      {/* Logo + Name */}
      <div className="flex items-center gap-4 mb-6 animate-fade-in">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: 'linear-gradient(135deg, hsl(145 80% 40%), hsl(145 60% 30%))' }}>
          <Leaf className="w-7 h-7 text-white" />
        </div>
      </div>

      <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-center animate-slide-up"
        style={{ 
          color: 'hsl(145 60% 30%)',
          textShadow: '0 0 60px hsl(145 80% 45% / 0.25), 0 0 120px hsl(145 80% 45% / 0.1)',
        }}>
        Agripio
      </h1>

      <p className="text-base mt-4 text-center animate-fade-in font-medium max-w-sm px-4"
        style={{ color: 'hsl(145 30% 35%)', animationDelay: '0.3s' }}>
        From Soil to Market — Smart Farming Starts Here 🌱
      </p>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-3 mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <button onClick={() => navigate(isAuthenticated ? '/dashboard' : '/onboarding')}
          className="px-10 py-4 rounded-2xl text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
          style={{ 
            background: 'linear-gradient(135deg, hsl(145 80% 40%), hsl(145 60% 30%))',
            boxShadow: '0 8px 32px hsl(145 80% 40% / 0.3)',
          }}>
          🌱 Get Started
        </button>

        <button onClick={() => navigate('/onboarding')}
          className="px-8 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95"
          style={{ 
            color: 'hsl(145 50% 30%)',
            border: '2px solid hsl(145 50% 40% / 0.3)',
            background: 'hsl(145 50% 40% / 0.05)',
          }}>
          Login
        </button>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs font-medium" style={{ color: 'hsl(145 30% 45%)' }}>
          © 2026 AgriPio Team
        </p>
      </div>
    </div>
  );
}
