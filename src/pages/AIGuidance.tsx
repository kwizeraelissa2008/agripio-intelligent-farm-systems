/**
 * AgriGuide — Interactive AI Farming Mentor with IP Rights & Project Creation
 * © 2026 AgriPio — All rights reserved.
 */
import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import {
  Send, Sparkles, RotateCcw,
  Target, Bot, User, Shield, FolderOpen, Plus, ChevronRight, CheckCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'plan' | 'tip' | 'ip-alert' | 'project';
}

interface Project {
  id: string;
  title: string;
  description: string;
  ipType: string;
  progress: number;
  createdAt: Date;
}

const quickPrompts = [
  { emoji: '🌽', label: 'Best crop for my soil', prompt: 'What is the best crop to plant for soil with pH 6.2 and moderate nitrogen in Kigali region?' },
  { emoji: '💧', label: 'Irrigation help', prompt: 'How should I set up an irrigation schedule for 2 hectares of maize during dry season?' },
  { emoji: '🛡️', label: 'Protect my idea', prompt: 'I invented a new composting method. How can I protect it as intellectual property?' },
  { emoji: '🌱', label: 'Full farm plan', prompt: 'Help me create a complete farming plan for 3 hectares in Musanze with budget of RWF 800,000' },
  { emoji: '🐛', label: 'Pest prevention', prompt: 'What organic pest prevention methods work best for tomatoes in Rwanda?' },
  { emoji: '💡', label: 'Create a project', prompt: 'I want to create a new agricultural project. Help me define it and protect it with IP rights!' },
];

const aiResponses: Record<string, { content: string; type?: ChatMessage['type'] }> = {
  'crop': {
    content: `🌱 Great question, Farmer! Based on **pH 6.2** and **moderate nitrogen** in Kigali:\n\n**Top 3 Recommendations:**\n1. 🌽 **Maize** — 89% soil compatibility, high market demand (+18%)\n2. 🫘 **Beans** — Excellent nitrogen fixation, great rotation crop\n3. 🥑 **Avocado (long-term)** — Premium export prices\n\n**Pro Tip:** Maize + Beans intercropping increases yield by 25%! 📈\n\n💡 **IP Insight:** If you develop a unique intercropping pattern, document it — that's a potential trade secret! 🛡️\n\n🗂️ **Want to turn this into a tracked project?** Just say "Create project" and I'll help you set it up with IP protection! 😊`
  },
  'irrigation': {
    content: `💧 Here's your **Smart Irrigation Schedule** for 2ha of maize:\n\n**Phase 1 — Germination (Week 1-2):**\n• Water every 2 days, 20mm per session\n\n**Phase 2 — Vegetative (Week 3-8):**\n• Water every 3 days, 25mm per session\n\n**Phase 3 — Tasseling (Week 9-12):**\n• Critical! Water every 2 days, 30mm\n\n**Phase 4 — Maturation (Week 13+):**\n• Reduce to every 5 days\n\n**Cost Saving Tip:** Drip irrigation saves 40% water vs flood! 💡\n\n🛡️ **IP Rights:** If you design a custom drip system, you could **patent** the design! ARIPO protects across 22 African countries. Tell me about your project — let's innovate! 😊`
  },
  'protect': {
    content: `🛡️ **Excellent thinking, Innovator!** Protecting your composting method is smart! Here's how:\n\n**Option 1 — Trade Secret (FREE, Immediate)**\n✅ Keep the formula confidential\n✅ Document everything with dates\n⚠️ Lost if someone discovers it independently\n\n**Option 2 — Patent (Strongest, 20 years)**\n✅ Exclusive rights to your method\n💰 Cost: ~$500-2000 via Rwanda Development Board (RDB)\n\n**My Recommendation:** Start with Trade Secret (free!), then file a patent when you have budget.\n\n📋 **Document EVERYTHING:**\n• 📝 Write the exact process with dates\n• 📸 Take photos/videos of results\n• 🧪 Record test data\n\n**ARIPO Registration** can protect across 22 African countries! 🌍\n\n💡 Want me to **create a project** for this innovation? I'll track your IP protection journey! 🚀`,
    type: 'ip-alert'
  },
  'plan': {
    content: `🎯 **Your Complete Farm Plan — Musanze, 3ha, RWF 800,000**\n\n📋 **CROP:** Maize (Main) + Beans (Intercrop)\n📅 **PLANTING:** March 5, 2026\n💧 **IRRIGATION:** Every 3 days, 25mm/session — drip recommended\n🧪 **FERTILIZER:** Week 1: 40kg/ha DAP → Week 4: 30kg/ha Urea\n⚠️ **PEST RISK:** Moderate — Late blight (35%)\n📊 **EXPECTED YIELD:** 12,600 kg\n💰 **REVENUE:** RWF 4,410,000\n📈 **PROFIT SCORE:** 82/100\n\n🛡️ **IP Protection Tips:**\n• Your unique intercropping ratio? **Trade secret!**\n• Brand as "Musanze Premium Maize" ™ — branded sells 30% more!\n• Document your yields — builds investment portfolio\n\n🎉 **You're innovating like a pro!** I've saved this as a project — check My Projects tab! 🚀`,
    type: 'plan'
  },
  'pest': {
    content: `🐛 **Organic Pest Prevention for Tomatoes:**\n\n1. 🌿 **Neem Oil Spray** — 5ml neem + 1L water + soap drop, every 7 days\n2. 🧄 **Garlic-Chili Spray** — 10 garlic + 5 chili + 2L water, every 5 days\n3. 🌻 **Companion Planting** — Marigolds around tomatoes\n4. 🪤 **Yellow Sticky Traps** — Check weekly\n5. 🐞 **Beneficial Insects** — Ladybugs eat 50+ aphids/day!\n\n💡 **IP Tip:** If you develop an effective organic formula, that's a **patentable innovation!** Document your recipe! 🛡️\n\nTell me about your project — let's protect your ideas! 😊`
  },
  'project': {
    content: `🗂️ **Let's Create Your Agricultural Project!** 🌱\n\nGreat decision — every innovation deserves to be tracked and protected! Here's what we'll do:\n\n**Step 1:** Tell me your project idea (e.g., "Smart drip irrigation for hillside farms")\n**Step 2:** I'll help you define the scope, timeline, and budget\n**Step 3:** We'll identify IP rights:\n   • 🔒 **Patent** — for inventions and processes\n   • ™️ **Trademark** — for your brand name\n   • ©️ **Copyright** — for guides and content\n   • 🤫 **Trade Secret** — for formulas and methods\n**Step 4:** I'll create a tracked project card with IP protection plan\n\n**Your IP rights matter!** Every farming innovation you create is valuable. Let's protect it together! 🛡️\n\n🚀 What's your project idea? Describe it and I'll help you build a protected plan!`,
    type: 'project'
  },
  'default': {
    content: `👋 Hello, Farmer! I'm **AgriGuide**, your AI farming mentor! 🌱\n\nI'm here to help you:\n• 🌾 Plan your farming season\n• 💧 Optimize irrigation & soil health\n• 🛡️ **Protect your agricultural innovations (IP)**\n• 🗂️ **Create & track projects with IP rights**\n• 🐛 Prevent pests organically\n• 💰 Maximize your farm profits\n\n**Tell me about your project — let's innovate!** 😊\n\n🛡️ *Remember: Every farming idea you create is worth protecting with IP rights!*`
  }
};

function getAIResponse(input: string): { content: string; type?: ChatMessage['type'] } {
  const lower = input.toLowerCase();
  if (lower.includes('project') || lower.includes('create') || lower.includes('build') || lower.includes('make')) return aiResponses.project;
  if (lower.includes('crop') || lower.includes('plant') || lower.includes('soil') || lower.includes('best')) return aiResponses.crop;
  if (lower.includes('irrigation') || lower.includes('water') || lower.includes('drip')) return aiResponses.irrigation;
  if (lower.includes('protect') || lower.includes('patent') || lower.includes('ip') || lower.includes('intellectual') || lower.includes('idea') || lower.includes('invent')) return aiResponses.protect;
  if (lower.includes('plan') || lower.includes('hectare') || lower.includes('budget') || lower.includes('full') || lower.includes('complete')) return aiResponses.plan;
  if (lower.includes('pest') || lower.includes('disease') || lower.includes('organic') || lower.includes('bug')) return aiResponses.pest;
  return aiResponses.default;
}

export default function AIGuidance() {
  const { t, language, user } = useApp();
  const [activeTab, setActiveTab] = useState<'chat' | 'projects'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0', role: 'assistant',
      content: `👋 Hello${user?.name ? `, ${user.name.split(' ')[0]}` : ''}! I'm **AgriGuide**, your AI farming mentor! 🌱\n\nTell me about your project — let's innovate and protect your ideas with IP rights! 😊\n\nOr tap a quick prompt below! 🚀`,
      timestamp: new Date(), type: 'text',
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', title: 'Smart Drip Irrigation System', description: 'Low-cost drip system for hillside farms', ipType: '🔒 Patent + ™️ Trademark', progress: 35, createdAt: new Date(Date.now() - 86400000 * 3) },
    { id: '2', title: 'Organic Pest Control Formula', description: 'Neem + garlic based natural pesticide', ipType: '🤫 Trade Secret', progress: 60, createdAt: new Date(Date.now() - 86400000 * 7) },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(text);
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: response.content, timestamp: new Date(), type: response.type || 'text' };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);

      // Auto-create project from plan
      if (response.type === 'plan') {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#00c853', '#69f0ae', '#ffd700'] });
        setProjects(prev => [{ id: Date.now().toString(), title: 'Musanze Farm Plan 2026', description: 'Maize + Beans intercrop, 3ha, RWF 800K budget', ipType: '🤫 Trade Secret + ™️ Trademark', progress: 10, createdAt: new Date() }, ...prev]);
      }
    }, 1500 + Math.random() * 1000);
  };

  const resetChat = () => {
    setMessages([{ id: '0', role: 'assistant', content: `👋 Fresh start! Tell me about your project — I'm ready to help! 🌱`, timestamp: new Date() }]);
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
            : msg.type === 'project'
            ? { background: 'hsl(var(--sky) / 0.08)', border: '1px solid hsl(var(--sky) / 0.25)' }
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
          {msg.type === 'project' && (
            <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold" style={{ color: 'hsl(var(--sky))' }}>
              <FolderOpen className="w-3.5 h-3.5" /> Project Creation
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
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-emerald)' }}>
              <Sparkles className="w-5 h-5" style={{ color: 'hsl(var(--primary-foreground))' }} />
            </div>
            <div>
              <h1 className="text-xl font-bold">{t('chatWithGuide')}</h1>
              <p className="text-xs text-muted-foreground">{t('projectCreation')}</p>
            </div>
          </div>
          <button onClick={resetChat} className="p-2 rounded-lg transition-all hover:bg-secondary" title="New chat">
            <RotateCcw className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Tabs: Chat / My Projects */}
        <div className="flex gap-2 mb-3">
          <button onClick={() => setActiveTab('chat')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={activeTab === 'chat'
              ? { background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }
              : { background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}>
            <Bot className="w-4 h-4" /> Chat
          </button>
          <button onClick={() => setActiveTab('projects')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={activeTab === 'projects'
              ? { background: 'hsl(var(--sky) / 0.15)', color: 'hsl(var(--sky))', border: '1px solid hsl(var(--sky) / 0.3)' }
              : { background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}>
            <FolderOpen className="w-4 h-4" /> {t('myProjects')} ({projects.length})
          </button>
        </div>

        {/* My Projects Tab */}
        {activeTab === 'projects' && (
          <div className="flex-1 overflow-y-auto space-y-3 pb-4">
            <button onClick={() => { setActiveTab('chat'); sendMessage('I want to create a new agricultural project. Help me define it and protect it with IP rights!'); }}
              className="w-full p-4 rounded-xl text-sm font-medium flex items-center gap-3 transition-all hover:scale-[1.01]"
              style={{ background: 'hsl(var(--emerald) / 0.1)', border: '1px dashed hsl(var(--emerald) / 0.4)', color: 'hsl(var(--emerald))' }}>
              <Plus className="w-5 h-5" />
              Create New Project via AI Chat 🌱
            </button>
            {projects.map(p => (
              <div key={p.id} className="glass-card p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-sm">{p.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: 'hsl(var(--gold) / 0.1)', color: 'hsl(var(--gold))' }}>
                    {p.ipType}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex-1 h-2 rounded-full overflow-hidden bg-secondary">
                    <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: 'linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--sky)))' }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: 'hsl(var(--emerald))' }}>{p.progress}%</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <CheckCircle className="w-3 h-3" style={{ color: 'hsl(var(--emerald))' }} />
                  <span className="text-xs text-muted-foreground">IP rights identified • {p.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
            <p className="text-center text-xs text-muted-foreground mt-4">
              🛡️ All projects include IP protection advice • {t('protectIP')}
            </p>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <>
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
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

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

            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <input ref={inputRef} value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                  placeholder={t('chatPlaceholder')}
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
              🛡️ AgriGuide integrates IP rights in all advice • © 2026 AgriPio
            </p>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
