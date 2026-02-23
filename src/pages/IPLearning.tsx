import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { BookOpen, ChevronRight, ChevronLeft, CheckCircle, Code, Lightbulb, Play, FileText, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Lesson {
  id: string;
  title: string;
  category: string;
  content: string;
  example: string;
  tryIt: string;
  keyPoints: string[];
}

const lessons: Lesson[] = [
  {
    id: 'intro',
    title: 'What is Intellectual Property?',
    category: 'Basics',
    content: `Intellectual Property (IP) refers to creations of the mind — inventions, designs, brand names, artistic works, and trade secrets. In agriculture, IP protects innovations that improve farming, food production, and sustainability.

IP gives creators exclusive rights to use and benefit from their innovations for a specific period. This encourages investment in research and development.

There are four main types of IP relevant to agriculture:
• **Patents** — Protect inventions and new processes
• **Copyrights** — Protect creative works and software
• **Trademarks** — Protect brand names and logos
• **Trade Secrets** — Protect confidential business information`,
    example: `🌱 Agricultural Example:
A farmer develops a new organic pest control method using local plants. This invention can be protected by a PATENT.

The farmer's unique brand name "GreenGuard Organic" is protected by a TRADEMARK.

The exact formula and mixing ratios are kept as a TRADE SECRET.`,
    tryIt: 'Think about your own farming practice. Can you identify one innovation that could be protected by IP? It could be a unique growing technique, a special seed variety, or a processing method.',
    keyPoints: ['IP protects creations of the mind', 'Four types: Patents, Copyrights, Trademarks, Trade Secrets', 'IP encourages innovation by rewarding creators', 'Agricultural IP is critical for food security'],
  },
  {
    id: 'patents',
    title: 'Patents in Agriculture',
    category: 'Patents',
    content: `A patent gives an inventor the exclusive right to make, use, and sell their invention for typically 20 years. In agriculture, patents protect:

• **New plant varieties** — Hybrid seeds, drought-resistant crops
• **Farm equipment** — IoT sensors, irrigation systems, drones
• **Processes** — New methods of pest control, soil treatment
• **Biotechnology** — Genetic modifications, bio-fertilizers
• **Software** — AI farming algorithms, precision agriculture tools

To qualify for a patent, an invention must be:
1. **Novel** — It must be new and not previously known
2. **Non-obvious** — It can't be an obvious improvement
3. **Useful** — It must have practical agricultural application

⚠️ Important: You cannot patent naturally occurring plants or traditional farming knowledge that is already public.`,
    example: `🔬 AgriPio Patent Example:
"3-Chamber Smart Testing System"

This is a novel IoT device with three specialized chambers:
• Soil Chamber — Tests pH, moisture, NPK, salinity
• Crop Chamber — Analyzes health score, nutrient deficiency
• Fertilizer Chamber — Checks compatibility, concentration safety

Why it's patentable:
✅ Novel — No existing device combines all 3 chambers
✅ Non-obvious — The integration requires innovative engineering
✅ Useful — Directly improves farming decisions`,
    tryIt: 'Write a simple description of an agricultural tool or process you\'ve seen that could be patented. Include: What does it do? Why is it new? How is it useful?',
    keyPoints: ['Patents last 20 years', 'Must be novel, non-obvious, and useful', 'Covers inventions, processes, and equipment', 'Cannot patent natural discoveries'],
  },
  {
    id: 'copyrights',
    title: 'Copyright for AgriTech',
    category: 'Copyright',
    content: `Copyright automatically protects original creative works from the moment they are created. In agriculture and AgriTech, copyright covers:

• **Software code** — Mobile apps, web platforms, AI algorithms
• **Databases** — Crop databases, soil maps, price datasets
• **Publications** — Research papers, farming guides, manuals
• **Visual designs** — UI/UX designs, infographics, logos
• **Educational content** — Training videos, tutorials, courses

Key facts about copyright:
• Protection is **automatic** — no registration required (but registration helps in disputes)
• Lasts for the **creator's lifetime + 50-70 years** (varies by country)
• Protects the **expression** of an idea, not the idea itself
• You can license your work to others while keeping ownership`,
    example: `©️ AgriPio Copyright Example:
"Signal-First UI Architecture"

Our dashboard design system includes:
• High-Impedance Status Hero (central health gauge)
• 2x2 Quadrant Grid layout
• Context Mode Switcher
• Glassmorphic dark theme with emerald accents

This unique visual design is automatically copyrighted.

Copyright © 2026 AgriPio — All rights reserved.`,
    tryIt: 'If you created a farming guide or training video, it would automatically be copyrighted. Think about what original agricultural content you could create that would be valuable to other farmers.',
    keyPoints: ['Automatic protection — no registration needed', 'Covers software, designs, publications', 'Protects expression, not ideas', 'Lasts lifetime + 50-70 years'],
  },
  {
    id: 'trademarks',
    title: 'Agricultural Trademarks',
    category: 'Trademarks',
    content: `A trademark is a recognizable sign, name, or symbol that identifies products or services. In agriculture, trademarks help:

• **Build trust** — Consumers know they're buying quality
• **Differentiate** — Stand out from competitors
• **Add value** — Branded products command higher prices
• **Protect reputation** — Prevent others from using your name

Types of agricultural trademarks:
• **Brand names** — "AgriPio", "Rwanda Premium Coffee"
• **Logos** — Visual symbols representing your brand
• **Slogans** — "Intelligent Agriculture from Soil to Market"
• **Geographic Indicators** — "Nyungwe Forest Honey"
• **Certification marks** — "Organic Certified", "Fair Trade"

Registration process:
1. Search for existing trademarks
2. File an application with your national IP office
3. Examination period (3-12 months)
4. Publication for opposition
5. Registration (renewable every 10 years)`,
    example: `™️ AgriPio Trademark Example:
Brand: "AgriPio" ™
Tagline: "Intelligent Agriculture from Soil to Market" ™

🏷️ Why this matters for farmers:
Imagine you grow the best pineapples in Kayonza. 
By trademarking "Kayonza Gold Pineapples", you:
• Prevent others from using your name
• Build customer loyalty
• Command premium prices (up to 30% more)
• Create an asset you can sell or license`,
    tryIt: 'Create a brand name for a local agricultural product from your area. Think about what makes it unique — is it the location, the quality, the method of production?',
    keyPoints: ['Identifies and distinguishes products', 'Renewable every 10 years indefinitely', 'Includes names, logos, slogans', 'Geographic indicators are powerful in agriculture'],
  },
  {
    id: 'trade-secrets',
    title: 'Trade Secrets in Farming',
    category: 'Trade Secrets',
    content: `Trade secrets are confidential business information that gives a competitive advantage. Unlike patents, trade secrets:

• **Never expire** — Protected as long as they remain secret
• **No registration needed** — Just keep them confidential
• **No public disclosure** — The secret stays hidden
• **Lost if revealed** — Once public, protection ends

Agricultural trade secrets include:
• **Proprietary formulas** — Special fertilizer blends, compost recipes
• **Growing techniques** — Unique cultivation methods
• **Business strategies** — Pricing algorithms, supplier relationships
• **Customer lists** — Buyer databases, supply chain contacts
• **AI/ML models** — Training data, algorithm weights

How to protect trade secrets:
1. Limit access to trusted employees only
2. Use Non-Disclosure Agreements (NDAs)
3. Mark documents as "Confidential"
4. Implement physical and digital security
5. Train staff on confidentiality obligations`,
    example: `🤫 AgriPio Trade Secret Example:
"Market Optimization Algorithm"

Our algorithm analyzes 12+ variables including:
• Commodity price trends
• Weather patterns
• Regional supply-demand dynamics
• Transport costs
• Quality degradation rates
• Seasonality factors

The exact weights and calculations are NEVER published.
This gives AgriPio a competitive advantage that no competitor can copy.

Unlike a patent (20 years), this trade secret can be protected FOREVER.`,
    tryIt: 'Think about knowledge you have that competitors would love to know. Maybe it\'s your secret composting recipe, your best supplier contacts, or your timing strategy for selling crops at peak prices.',
    keyPoints: ['No expiration — lasts forever if kept secret', 'No registration required', 'Lost permanently if disclosed', 'Covers formulas, algorithms, strategies'],
  },
  {
    id: 'protecting',
    title: 'Protecting Your Farm IP',
    category: 'Protection',
    content: `Every farmer and agricultural business has intellectual property worth protecting. Here's a practical guide:

**Step 1: Identify Your IP**
• List all innovations, brands, and unique processes
• Categorize each as patent, copyright, trademark, or trade secret

**Step 2: Choose Protection Strategy**
• Patents for truly novel inventions (costly but strong)
• Trademarks for brand identity (moderate cost, long-lasting)
• Copyright is automatic (free but document creation dates)
• Trade secrets for competitive advantages (free but requires discipline)

**Step 3: Document Everything**
• Keep invention notebooks with dates
• Take photos/videos of innovations
• Save drafts and development history
• Use timestamps (blockchain or certified mail)

**Step 4: Seek Help When Needed**
• National IP offices offer free consultations
• Agricultural extension services can guide you
• Rwanda's RDB has an IP division
• WIPO offers resources for developing countries

**Step 5: Enforce Your Rights**
• Monitor for infringement
• Send cease-and-desist letters
• Use mediation before litigation
• Join IP support networks`,
    example: `📋 Practical Example: Farmer Jane's IP Portfolio

Jane grows organic mushrooms in Ruhango:

🔒 Patent: Her automated humidity control system
©️ Copyright: Her mushroom growing guide (sold online)
™️ Trademark: "Ruhango Royal Mushrooms"
🤫 Trade Secret: Her substrate formula (sawdust + coffee grounds + secret ingredient)

Total IP value: This portfolio makes Jane's business worth 3x more to investors!`,
    tryIt: 'Create a simple IP audit for your farm or agricultural project. List at least one item for each category: Patent opportunity, Copyright work, Trademark candidate, Trade Secret.',
    keyPoints: ['Identify → Categorize → Protect → Document → Enforce', 'Start with free protections (copyright, trade secrets)', 'Document everything with dates', 'IP increases business valuation significantly'],
  },
];

export default function IPLearning() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showTryIt, setShowTryIt] = useState(false);

  const lesson = lessons[currentLesson];
  const progress = (completedLessons.length / lessons.length) * 100;

  const markComplete = () => {
    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons(prev => [...prev, lesson.id]);
    }
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
      setShowTryIt(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard/settings" className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)' }}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">📚 IP for Agriculture</h1>
            <p className="text-sm text-muted-foreground">Learn how to protect your agricultural innovations — interactive W3Schools-style tutorials</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Your Progress</span>
            <span className="text-sm font-bold" style={{ color: 'hsl(var(--emerald))' }}>{completedLessons.length}/{lessons.length} Lessons</span>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'hsl(0 0% 12%)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'var(--gradient-emerald)' }} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Lesson List */}
          <div className="glass-card p-4 lg:col-span-1">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} /> Lessons
            </h3>
            <div className="space-y-1">
              {lessons.map((l, i) => (
                <button key={l.id} onClick={() => { setCurrentLesson(i); setShowTryIt(false); }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2"
                  style={currentLesson === i
                    ? { background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))' }
                    : { color: 'hsl(var(--muted-foreground))' }}>
                  {completedLessons.includes(l.id)
                    ? <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(var(--emerald))' }} />
                    : <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ background: 'hsl(0 0% 15%)', color: 'hsl(var(--muted-foreground))' }}>{i + 1}</span>
                  }
                  <span className="truncate">{l.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Category + Title (W3Schools-style header) */}
            <div className="rounded-2xl overflow-hidden">
              <div className="px-6 py-3" style={{ background: 'hsl(var(--emerald))' }}>
                <span className="text-xs font-bold uppercase" style={{ color: 'hsl(0 0% 4%)' }}>{lesson.category}</span>
              </div>
              <div className="px-6 py-5" style={{ background: 'hsl(145 30% 8%)' }}>
                <h2 className="text-xl font-bold">{lesson.title}</h2>
              </div>
            </div>

            {/* Lesson Content */}
            <div className="glass-card p-6">
              <div className="prose prose-invert max-w-none">
                {lesson.content.split('\n\n').map((para, i) => (
                  <div key={i} className="mb-4">
                    {para.split('\n').map((line, j) => {
                      if (line.startsWith('•') || line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.')) {
                        return <div key={j} className="text-sm text-muted-foreground ml-4 mb-1">{line.replace(/\*\*(.*?)\*\*/g, '«$1»').split('«').map((part, k) => part.includes('»') ? <strong key={k} className="text-foreground">{part.replace('»', '')}</strong> : part)}</div>;
                      }
                      if (line.startsWith('⚠️')) {
                        return <div key={j} className="text-sm p-3 rounded-lg mt-2 mb-2" style={{ background: 'hsl(var(--warning) / 0.1)', border: '1px solid hsl(var(--warning) / 0.3)', color: 'hsl(var(--warning))' }}>{line}</div>;
                      }
                      return <p key={j} className="text-sm text-muted-foreground leading-relaxed">{line.replace(/\*\*(.*?)\*\*/g, '«$1»').split('«').map((part, k) => part.includes('»') ? <strong key={k} className="text-foreground">{part.replace('»', '')}</strong> : part)}</p>;
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Example Box (W3Schools green-style) */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid hsl(var(--emerald) / 0.3)' }}>
              <div className="px-5 py-2.5 flex items-center gap-2" style={{ background: 'hsl(var(--emerald) / 0.15)' }}>
                <Code className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
                <span className="text-sm font-semibold" style={{ color: 'hsl(var(--emerald))' }}>Example</span>
              </div>
              <div className="p-5" style={{ background: 'hsl(0 0% 5%)' }}>
                {lesson.example.split('\n').map((line, i) => (
                  <div key={i} className={`text-sm ${line.startsWith('✅') || line.startsWith('🏷️') ? 'mb-1' : 'mb-0.5'}`}
                    style={{ color: line.startsWith('✅') ? 'hsl(var(--emerald))' : line.startsWith('🔬') || line.startsWith('©️') || line.startsWith('™️') || line.startsWith('🤫') || line.startsWith('🌱') || line.startsWith('📋') ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))' }}>
                    {line || '\u00A0'}
                  </div>
                ))}
              </div>
            </div>

            {/* Try It Yourself (W3Schools-style) */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid hsl(var(--sky) / 0.3)' }}>
              <button onClick={() => setShowTryIt(!showTryIt)} className="w-full px-5 py-3 flex items-center justify-between"
                style={{ background: 'hsl(var(--sky) / 0.1)' }}>
                <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'hsl(var(--sky))' }}>
                  <Play className="w-4 h-4" /> Try It Yourself!
                </span>
                <ChevronRight className="w-4 h-4 transition-transform" style={{ color: 'hsl(var(--sky))', transform: showTryIt ? 'rotate(90deg)' : 'none' }} />
              </button>
              {showTryIt && (
                <div className="p-5" style={{ background: 'hsl(0 0% 5%)' }}>
                  <p className="text-sm text-muted-foreground mb-4">{lesson.tryIt}</p>
                  <textarea rows={4} placeholder="Write your answer here..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
                </div>
              )}
            </div>

            {/* Key Points */}
            <div className="glass-card p-5" style={{ border: '1px solid hsl(var(--gold) / 0.3)' }}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" style={{ color: 'hsl(var(--gold))' }} />
                <span style={{ color: 'hsl(var(--gold))' }}>Key Takeaways</span>
              </h3>
              <div className="space-y-2">
                {lesson.keyPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--emerald))' }} />
                    <span className="text-sm text-muted-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button onClick={() => { setCurrentLesson(prev => Math.max(0, prev - 1)); setShowTryIt(false); }}
                disabled={currentLesson === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-30"
                style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 13%)', color: 'hsl(var(--muted-foreground))' }}>
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button onClick={markComplete}
                className="btn-emerald flex items-center gap-2">
                {currentLesson === lessons.length - 1 ? (
                  <><Award className="w-4 h-4" /> Complete Course</>
                ) : (
                  <><CheckCircle className="w-4 h-4" /> Mark Complete & Next</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
