/**
 * AgriGuide — Interactive AI Farming Mentor Chat
 * Conversational AI that guides farmers from idea to harvest plan
 * © 2026 AgriPio — All rights reserved.
 */
import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { 
  Send, Leaf, Sparkles, Download, RotateCcw, 
  Target, Calendar, Droplets, AlertTriangle, TrendingUp, CheckCircle,
  MessageCircle, Bot, User, Lightbulb, Shield
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'plan' | 'tip' | 'ip-alert';
}

interface FarmPlan {
  crop: string;
  plantingDate: string;
  irrigationSchedule: string;
  fertilizerPlan: string;
  pestRisk: string;
  expectedYield: string;
  estimatedRevenue: string;
  profitabilityScore: number;
  marketStrategy: string;
  ipTip: string;
}

const quickPrompts = [
  { emoji: '🌽', label: 'Best crop for my soil', prompt: 'What is the best crop to plant for soil with pH 6.2 and moderate nitrogen in Kigali region?' },
  { emoji: '💧', label: 'Irrigation help', prompt: 'How should I set up an irrigation schedule for 2 hectares of maize during dry season?' },
  { emoji: '💰', label: 'Market prices', prompt: 'What are the current best-selling crops in Rwanda and their market prices?' },
  { emoji: '🛡️', label: 'Protect my idea', prompt: 'I invented a new composting method. How can I protect it as intellectual property?' },
  { emoji: '🌱', label: 'Full farm plan', prompt: 'Help me create a complete farming plan for 3 hectares in Musanze with budget of RWF 800,000' },
  { emoji: '🐛', label: 'Pest prevention', prompt: 'What organic pest prevention methods work best for tomatoes in Rwanda?' },
];

const aiResponses: Record<string, { content: string; type?: ChatMessage['type'] }> = {
  'crop': {
    content: `🌱 Great question, Farmer! Based on **pH 6.2** and **moderate nitrogen** in Kigali:\n\n**Top 3 Recommendations:**\n1. 🌽 **Maize** — 89% soil compatibility, high market demand (+18% price trend)\n2. 🫘 **Beans** — Excellent nitrogen fixation, great rotation crop\n3. 🥑 **Avocado (long-term)** — Premium export prices, Hass variety thriving at your altitude\n\n**Pro Tip:** Maize + Beans intercropping increases yield by 25%! 📈\n\n💡 **IP Insight:** If you develop a unique intercropping pattern, document it — that's a potential trade secret! 🛡️\n\nWant me to create a full plan for any of these? Just say which! 😊`
  },
  'irrigation': {
    content: `💧 Here's your **Smart Irrigation Schedule** for 2ha of maize:\n\n**Phase 1 — Germination (Week 1-2):**\n• Water every 2 days, 20mm per session\n• Morning irrigation (6-8 AM) to reduce evaporation\n\n**Phase 2 — Vegetative (Week 3-8):**\n• Water every 3 days, 25mm per session\n• Monitor soil moisture — target 60-70%\n\n**Phase 3 — Tasseling (Week 9-12):**\n• Critical! Water every 2 days, 30mm\n• This phase determines yield size 🎯\n\n**Phase 4 — Maturation (Week 13+):**\n• Reduce to every 5 days\n• Stop 2 weeks before harvest\n\n**Estimated Water:** ~450,000 liters total\n**Cost Saving Tip:** Drip irrigation saves 40% water vs flood! 💡\n\nShall I help you design a low-cost drip system? That could be patentable! 🚀`
  },
  'market': {
    content: `📊 **Rwanda Market Intelligence — Live Update:**\n\n| Crop | Price | Trend | Demand |\n|------|-------|-------|--------|\n| 🌽 Maize | RWF 350/kg | ↑ +18% | 🔥 High |\n| 🍅 Tomatoes | RWF 900/kg | ↑ +5% | 🔥 Very High |\n| 🥑 Avocado | RWF 450/kg | ↑ +12% | 📈 Growing |\n| 🫘 Beans | RWF 1,100/kg | ↓ -3% | ➡️ Medium |\n| 🥔 Potatoes | RWF 180/kg | ↑ +2% | 📈 High |\n\n**Best Opportunity:** Tomatoes — restaurants in Kigali paying premium prices for consistent organic supply! 🏪\n\n**Pro Move:** Brand your produce (e.g., "Musanze Fresh Tomatoes" ™) — branded products sell 30% higher! 🛡️\n\nWant me to help you create a marketplace listing? 🛒`
  },
  'protect': {
    content: `🛡️ **Excellent thinking, Innovator!** Protecting your composting method is smart! Here's how:\n\n**Option 1 — Trade Secret (FREE, Immediate)**\n✅ Keep the formula confidential\n✅ Document everything with dates\n✅ Share only under NDA agreements\n⚠️ Lost if someone discovers it independently\n\n**Option 2 — Patent (Strongest, 20 years)**\n✅ Exclusive rights to your method\n✅ Can license it to others for income\n💰 Cost: ~$500-2000 via Rwanda Development Board (RDB)\n📋 Requirements: Must be novel, non-obvious, useful\n\n**My Recommendation:** Start with Trade Secret (free!), then file a patent when you have budget. Document EVERYTHING:\n• 📝 Write the exact process with dates\n• 📸 Take photos/videos of results\n• 🧪 Record test data\n\n**ARIPO Registration** can protect across 22 African countries! 🌍\n\nWant me to help draft your invention disclosure document? 📄`,
    type: 'ip-alert'
  },
  'plan': {
    content: `🎯 **Your Complete Farm Plan — Musanze, 3ha, RWF 800,000**\n\nI've analyzed soil data, weather patterns, market demand, and your budget. Here's your optimized plan:\n\n---\n\n📋 **CROP:** Maize (Main) + Beans (Intercrop)\n📅 **PLANTING:** March 5, 2026 (Optimal window — 2 weeks ahead)\n💧 **IRRIGATION:** Every 3 days, 25mm/session — drip recommended\n🧪 **FERTILIZER:** Week 1: 40kg/ha DAP → Week 4: 30kg/ha Urea → Week 8: 20kg/ha KSO4\n⚠️ **PEST RISK:** Moderate — Late blight (35%), Stem borer (20%)\n📊 **EXPECTED YIELD:** 12,600 kg (4.2 tons/ha)\n💰 **REVENUE:** RWF 4,410,000\n📈 **PROFIT SCORE:** 82/100\n🏪 **STRATEGY:** Sell 60% bulk in June, hold 40% for August premium\n\n---\n\n🛡️ **IP Protection Tips:**\n• Your unique intercropping ratio? **Trade secret!**\n• Brand as "Musanze Premium Maize" ™\n• Document your yields — builds investment portfolio\n\n🎉 **You're innovating like a pro!** Want me to track this plan day-by-day? I'll remind you when actions are due! 🚀`,
    type: 'plan'
  },
  'pest': {
    content: `🐛 **Organic Pest Prevention for Tomatoes in Rwanda:**\n\n**Top 5 Methods (Chemical-Free!):**\n\n1. 🌿 **Neem Oil Spray** — Mix 5ml neem oil + 1L water + drop of soap\n   • Apply every 7 days\n   • Effective against: aphids, whiteflies, mites\n\n2. 🧄 **Garlic-Chili Spray** — Blend 10 garlic cloves + 5 chili peppers + 2L water\n   • Strain and spray every 5 days\n   • Natural insect repellent\n\n3. 🌻 **Companion Planting** — Plant marigolds around tomatoes\n   • Repels nematodes and some insects\n   • Beautiful AND functional! 🌼\n\n4. 🪤 **Yellow Sticky Traps** — Hang at plant height\n   • Catches whiteflies and thrips\n   • Check and replace weekly\n\n5. 🐞 **Beneficial Insects** — Encourage ladybugs\n   • They eat 50+ aphids per day!\n   • Plant dill or fennel nearby to attract them\n\n**Prevention Calendar:**\n• Week 1-2: Apply neem oil preventively\n• Week 3+: Monitor daily, spray garlic mix if pests spotted\n• Monthly: Rotate methods to prevent resistance\n\n💡 **IP Tip:** If you develop an effective organic formula, that's a potential patentable innovation! Document your recipe! 🛡️`
  },
  'default': {
    content: `👋 Hello, Farmer! I'm **AgriGuide**, your AI farming mentor! 🌱\n\nI'm here to help you:\n• 🌾 Plan your farming season\n• 💧 Optimize irrigation & soil health\n• 📊 Find the best market prices\n• 🛡️ Protect your agricultural innovations (IP)\n• 🐛 Prevent pests organically\n• 💰 Maximize your farm profits\n\nTell me about your farm — what's your dream crop? What challenges are you facing? I'll create a personalized plan just for you! 😊\n\n**Try asking me:**\n• "What should I plant this season?"\n• "Create a farming plan for 2 hectares"\n• "How do I protect my farming innovation?"\n\nLet's grow something amazing together! 🚀`
  }
};

function getAIResponse(input: string): { content: string; type?: ChatMessage['type'] } {
  const lower = input.toLowerCase();
  if (lower.includes('crop') || lower.includes('plant') || lower.includes('soil') || lower.includes('best')) return aiResponses.crop;
  if (lower.includes('irrigation') || lower.includes('water') || lower.includes('drip')) return aiResponses.irrigation;
  if (lower.includes('market') || lower.includes('price') || lower.includes('sell')) return aiResponses.market;
  if (lower.includes('protect') || lower.includes('patent') || lower.includes('ip') || lower.includes('intellectual') || lower.includes('idea') || lower.includes('invent')) return aiResponses.protect;
  if (lower.includes('plan') || lower.includes('hectare') || lower.includes('budget') || lower.includes('full') || lower.includes('complete')) return aiResponses.plan;
  if (lower.includes('pest') || lower.includes('disease') || lower.includes('organic') || lower.includes('bug') || lower.includes('insect')) return aiResponses.pest;
  return aiResponses.default;
}

export default function AIGuidance() {
  const { t, language, user } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: `👋 Hello${user?.name ? `, ${user.name.split(' ')[0]}` : ''}! I'm **AgriGuide**, your AI farming mentor! 🌱\n\nTell me about your farm — what's your dream crop? What challenges do you face? I'll create a personalized plan! 😊\n\nOr tap a quick prompt below to get started! 🚀`,
      timestamp: new Date(),
      type: 'text',
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        type: response.type || 'text',
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);

      // Confetti for plan generation
      if (response.type === 'plan') {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#00c853', '#69f0ae', '#ffd700'] });
      }
    }, 1500 + Math.random() * 1000);
  };

  const resetChat = () => {
    setMessages([{
      id: '0',
      role: 'assistant',
      content: `👋 Fresh start! Tell me about your farm — I'm ready to help! 🌱`,
      timestamp: new Date(),
    }]);
  };

  const renderMessage = (msg: ChatMessage) => {
    const isUser = msg.role === 'user';
    return (
      <div key={msg.id} className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in`}>
        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
          style={isUser 
            ? { background: 'hsl(var(--emerald) / 0.2)', color: 'hsl(var(--emerald))' }
            : { background: 'var(--gradient-emerald)', color: 'hsl(var(--primary-foreground))' }}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
        <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? 'rounded-tr-md' : 'rounded-tl-md'}`}
          style={isUser
            ? { background: 'hsl(var(--emerald) / 0.15)', border: '1px solid hsl(var(--emerald) / 0.25)' }
            : msg.type === 'ip-alert'
            ? { background: 'hsl(var(--gold) / 0.08)', border: '1px solid hsl(var(--gold) / 0.25)' }
            : msg.type === 'plan'
            ? { background: 'hsl(var(--emerald) / 0.06)', border: '1px solid hsl(var(--emerald) / 0.2)' }
            : { background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
          {msg.type === 'ip-alert' && (
            <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold" style={{ color: 'hsl(var(--gold))' }}>
              <Shield className="w-3.5 h-3.5" /> IP Protection Advice
            </div>
          )}
          {msg.type === 'plan' && (
            <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold" style={{ color: 'hsl(var(--emerald))' }}>
              <Target className="w-3.5 h-3.5" /> AI Farm Plan Generated 🎉
            </div>
          )}
          <div className="whitespace-pre-wrap">
            {msg.content.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <div key={i} className="font-bold my-1">{line.replace(/\*\*/g, '')}</div>;
              }
              const boldProcessed = line.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
              return <div key={i} dangerouslySetInnerHTML={{ __html: boldProcessed }} />;
            })}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-emerald)' }}>
              <Sparkles className="w-5 h-5" style={{ color: 'hsl(var(--primary-foreground))' }} />
            </div>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                Chat with AgriGuide 🌟
              </h1>
              <p className="text-xs text-muted-foreground">Your AI farming mentor — ask anything! 🌱</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={resetChat} className="p-2 rounded-lg transition-all hover:bg-secondary" title="New chat">
              <RotateCcw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-1">
          {messages.map(renderMessage)}
          
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: 'var(--gradient-emerald)', color: 'hsl(var(--primary-foreground))' }}>
                <Bot className="w-4 h-4" />
              </div>
              <div className="rounded-2xl rounded-tl-md px-4 py-3" style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="mb-3">
            <p className="text-xs text-muted-foreground mb-2">✨ Quick start:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map(qp => (
                <button key={qp.label} onClick={() => sendMessage(qp.prompt)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:scale-105"
                  style={{ background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}>
                  <span>{qp.emoji}</span> {qp.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <input ref={inputRef} value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder={language === 'en' ? "Ask AgriGuide anything... 🌱" : "Baza AgriGuide ikintu icyo ari cyo cyose... 🌱"}
              className="w-full px-4 py-3.5 pr-12 rounded-2xl text-sm outline-none"
              style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
              disabled={isTyping}
            />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
              style={{ background: 'var(--gradient-emerald)', color: 'hsl(var(--primary-foreground))' }}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-muted-foreground mt-2">
          🛡️ AgriGuide prioritizes IP protection in all advice • © 2026 AgriPio
        </p>
      </div>
    </DashboardLayout>
  );
}
