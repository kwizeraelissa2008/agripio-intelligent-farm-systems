import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Mic, MicOff, X, Volume2 } from 'lucide-react';

interface VoiceAssistantProps {
  onClose: () => void;
}

const responses: Record<string, string> = {
  weather: "Current weather in your region: 24°C, partly cloudy. Tomorrow: 22°C with 60% chance of rain. Recommend checking irrigation schedule.",
  crop: "Based on your soil data (pH 6.2, nitrogen 45mg/kg), I recommend maize or beans this season. Planting in 2 weeks is optimal.",
  market: "Maize prices are up 18% in Kigali market. Tomatoes high demand. Best time to sell stored produce.",
  disease: "No disease alerts for your registered crops today. Monitor for late blight due to upcoming humidity. Use camera to scan leaves.",
  default: "I'm your Agripio AI assistant. Ask me about weather, crops, market prices, or disease detection. How can I help your farm today?",
};

export default function VoiceAssistant({ onClose }: VoiceAssistantProps) {
  const { t, language } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    // Simulate voice recognition
    setTimeout(() => {
      const queries = ['What is the weather today?', 'Which crop should I plant?', 'What are current market prices?'];
      const q = queries[Math.floor(Math.random() * queries.length)];
      setTranscript(q);
      setIsListening(false);
      handleResponse(q);
    }, 2000);
  };

  const handleResponse = (query: string) => {
    const key = query.toLowerCase().includes('weather') ? 'weather' 
      : query.toLowerCase().includes('crop') ? 'crop'
      : query.toLowerCase().includes('market') ? 'market'
      : query.toLowerCase().includes('disease') ? 'disease'
      : 'default';
    const ans = responses[key];
    setResponse(ans);
    setIsSpeaking(true);
    setHistory(prev => [...prev, { q: query, a: ans }]);
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ background: 'hsl(0 0% 0% / 0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-md glass-card p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--gradient-emerald)' }}>
              <Mic className="w-5 h-5" style={{ color: 'hsl(0 0% 4%)' }} />
            </div>
            <div>
              <div className="font-semibold">{t('voiceAssistant')}</div>
              <div className="text-xs text-muted-foreground">AI-Powered • {language === 'en' ? 'English' : 'Kinyarwanda'}</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Voice ring */}
        <div className="flex flex-col items-center py-6">
          <button onClick={startListening} disabled={isListening}
            className="relative w-24 h-24 rounded-full flex items-center justify-center transition-all"
            style={{ background: isListening ? 'var(--gradient-emerald)' : 'hsl(145 100% 39% / 0.15)', border: '2px solid hsl(145 100% 39% / 0.5)' }}>
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'hsl(145 100% 39% / 0.2)' }} />
                <div className="absolute -inset-3 rounded-full animate-pulse border" style={{ borderColor: 'hsl(145 100% 39% / 0.3)' }} />
              </>
            )}
            {isListening 
              ? <MicOff className="w-8 h-8" style={{ color: 'hsl(0 0% 4%)' }} />
              : <Mic className="w-8 h-8" style={{ color: 'hsl(145 100% 39%)' }} />
            }
          </button>
          <p className="text-sm text-muted-foreground mt-4">
            {isListening ? t('listening') : t('speakNow')}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Tap microphone to speak</p>
        </div>

        {/* Transcript */}
        {transcript && (
          <div className="mb-3 p-3 rounded-xl text-sm" style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)' }}>
            <span className="text-muted-foreground text-xs block mb-1">You said:</span>
            <span>{transcript}</span>
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="p-4 rounded-xl text-sm" style={{ background: 'hsl(145 100% 39% / 0.08)', border: '1px solid hsl(145 100% 39% / 0.2)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-3.5 h-3.5" style={{ color: 'hsl(145 100% 39%)' }} />
              <span className="text-xs font-medium" style={{ color: 'hsl(145 100% 39%)' }}>
                {isSpeaking ? 'Speaking...' : 'Agripio AI'}
              </span>
            </div>
            <span className="leading-relaxed">{response}</span>
          </div>
        )}

        {/* Quick commands */}
        <div className="mt-4">
          <p className="text-xs text-muted-foreground mb-2">Quick commands:</p>
          <div className="flex flex-wrap gap-2">
            {["Today's weather", "Best crops", "Market prices", "Disease check"].map(cmd => (
              <button key={cmd} onClick={() => handleResponse(cmd)}
                className="tag emerald cursor-pointer hover:opacity-80 transition-opacity">
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
