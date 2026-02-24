/**
 * IP Learning Center — W3Schools-style with MCQ Quizzes + Certificate Generator
 * Includes: 6 lessons, quizzes per lesson, progress tracking, certificate
 * Team: KWIZERA Elissa, INEZA Elyon Ivo, INEZA Aliza, ISHIMWE Ornella
 * © 2026 AgriPio — All rights reserved.
 */
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import IPWatermark from '@/components/IPWatermark';
import { useApp } from '@/contexts/AppContext';
import { 
  BookOpen, ChevronRight, ChevronLeft, CheckCircle, Code, Lightbulb, 
  Play, FileText, Award, ArrowLeft, HelpCircle, Trophy, Download,
  Star, AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuizQuestion {
  question: string;
  questionRw: string;
  options: string[];
  optionsRw: string[];
  correct: number;
}

interface Lesson {
  id: string;
  title: string;
  titleRw: string;
  category: string;
  content: string;
  contentRw: string;
  example: string;
  tryIt: string;
  keyPoints: string[];
  quiz: QuizQuestion[];
}

const lessons: Lesson[] = [
  {
    id: 'intro', title: 'What is Intellectual Property?', titleRw: 'Iki ni Iki Intellectual Property?',
    category: 'Basics',
    content: `Intellectual Property (IP) refers to creations of the mind — inventions, designs, brand names, artistic works, and trade secrets. In agriculture, IP protects innovations that improve farming, food production, and sustainability.\n\nIP gives creators exclusive rights to use and benefit from their innovations for a specific period. This encourages investment in research and development.\n\nThere are four main types of IP relevant to agriculture:\n• **Patents** — Protect inventions and new processes\n• **Copyrights** — Protect creative works and software\n• **Trademarks** — Protect brand names and logos\n• **Trade Secrets** — Protect confidential business information`,
    contentRw: `Intellectual Property (IP) bivuga ibiremwa by'ubwenge — igishushanyo, amazina y'ibicuruzwa, imirimo y'ubuhanzi, n'ibanga ry'ubucuruzi. Mu buhinzi, IP irinda ibitekerezo bishya byugarije ubuhinzi, umusaruro w'ibiribwa, no gukomeza ubutaka.\n\nIP itanga uburenganzira bwihariye ku bakoresha kugira ngo babone inyungu mu bihe byagenwe.\n\nHari ubwoko bune bw'IP bifitanye isano n'ubuhinzi:\n• **Patenti** — Zurinda ibitekerezo n'uburyo bushya\n• **Uburenganzira bw'Umwanditsi** — Burinda imirimo y'ubuhanzi na software\n• **Ibimenyetso by'Ubucuruzi** — Birinda amazina n'ibimenyetso\n• **Ibanga ry'Ubucuruzi** — Birinda amakuru y'ibanga`,
    example: `🌱 Agricultural Example:\nA farmer develops a new organic pest control method. This can be protected by a PATENT.\nThe brand name "GreenGuard" is protected by a TRADEMARK.\nThe exact formula is kept as a TRADE SECRET.`,
    tryIt: 'Think about your own farming practice. Can you identify one innovation that could be protected by IP?',
    keyPoints: ['IP protects creations of the mind', 'Four types: Patents, Copyrights, Trademarks, Trade Secrets', 'IP encourages innovation', 'Agricultural IP is critical for food security'],
    quiz: [
      { question: 'What does IP stand for?', questionRw: 'IP bisobanura iki?', options: ['Internet Protocol', 'Intellectual Property', 'International Patent', 'Innovation Protection'], optionsRw: ['Internet Protocol', 'Intellectual Property', 'Patenti y\'Amahanga', 'Kurinda Ibitekerezo'], correct: 1 },
      { question: 'How many main types of IP are there in agriculture?', questionRw: 'Ni ubwoko bungahe bw\'IP mu buhinzi?', options: ['2', '3', '4', '6'], optionsRw: ['2', '3', '4', '6'], correct: 2 },
      { question: 'Which IP type protects brand names?', questionRw: 'Ni ubuhe bwoko bw\'IP burinda amazina y\'ibicuruzwa?', options: ['Patent', 'Copyright', 'Trademark', 'Trade Secret'], optionsRw: ['Patenti', 'Uburenganzira', 'Ikimenyetso', 'Ibanga'], correct: 2 },
    ],
  },
  {
    id: 'patents', title: 'Patents in Agriculture', titleRw: 'Patenti mu Buhinzi',
    category: 'Patents',
    content: `A patent gives an inventor exclusive rights to their invention for 20 years. In agriculture, patents protect:\n\n• **New plant varieties** — Hybrid seeds, drought-resistant crops\n• **Farm equipment** — IoT sensors, irrigation systems\n• **Processes** — New methods of pest control, soil treatment\n• **Biotechnology** — Genetic modifications, bio-fertilizers\n• **Software** — AI farming algorithms\n\nTo qualify, an invention must be:\n1. **Novel** — New and not previously known\n2. **Non-obvious** — Not an obvious improvement\n3. **Useful** — Has practical agricultural application`,
    contentRw: `Patenti itanga uburenganzira bwihariye ku wabumbye ku gitekerezo cye mu myaka 20. Mu buhinzi, patenti zirinda:\n\n• **Ubwoko bushya bw'ibimera** — Imbuto z'umwanya, ibihingwa birwanya amapfa\n• **Ibikoresho by'ubuhinzi** — Senseur za IoT, sisitemu zo gusukira\n• **Uburyo** — Uburyo bushya bwo kurwanya ibyonnyi\n• **Biotekinoloji** — Ihindurwa ry'imitsi, ifumbire ya bio\n\nKugira ngo bibone patenti, igitekerezo kigomba kuba:\n1. **Gishya** — Nticyari kizwi\n2. **Kitasobanutse** — Si iterambere ryumvikana\n3. **Gifite akamaro** — Gifite imikorere y'ubuhinzi`,
    example: `🔬 AgriPio Patent Example:\n"3-Chamber Smart Testing System"\n\nThis novel IoT device has three specialized chambers:\n• Soil Chamber — Tests pH, moisture, NPK\n• Crop Chamber — Analyzes health score\n• Fertilizer Chamber — Checks compatibility\n\n✅ Novel — No existing device combines all 3\n✅ Non-obvious — Requires innovative engineering\n✅ Useful — Directly improves farming`,
    tryIt: 'Describe an agricultural tool you\'ve seen that could be patented. Include: What does it do? Why is it new?',
    keyPoints: ['Patents last 20 years', 'Must be novel, non-obvious, and useful', 'Covers inventions and processes', 'Cannot patent natural discoveries'],
    quiz: [
      { question: 'How long does a patent last?', questionRw: 'Patenti imara igihe kingana iki?', options: ['10 years', '15 years', '20 years', 'Forever'], optionsRw: ['Imyaka 10', 'Imyaka 15', 'Imyaka 20', 'Iteka'], correct: 2 },
      { question: 'Which is NOT a requirement for a patent?', questionRw: 'Iki ni ikihe kitasabwa kuri patenti?', options: ['Novel', 'Non-obvious', 'Expensive', 'Useful'], optionsRw: ['Gishya', 'Kitasobanutse', 'Kihenze', 'Gifite akamaro'], correct: 2 },
    ],
  },
  {
    id: 'copyrights', title: 'Copyright for AgriTech', titleRw: 'Uburenganzira bw\'Umwanditsi mu AgriTech',
    category: 'Copyright',
    content: `Copyright automatically protects original creative works from creation. In AgriTech, it covers:\n\n• **Software code** — Apps, platforms, AI algorithms\n• **Databases** — Crop databases, soil maps\n• **Publications** — Research papers, farming guides\n• **Visual designs** — UI/UX designs, infographics\n• **Educational content** — Training videos, tutorials\n\nKey facts:\n• Protection is **automatic** — no registration required\n• Lasts for **creator's lifetime + 50-70 years**\n• Protects the **expression**, not the idea itself\n• You can license your work while keeping ownership`,
    contentRw: `Uburenganzira bw'umwanditsi burinda mu buryo bwikora imirimo y'ubuhanzi. Mu AgriTech, burinda:\n\n• **Kode ya porogaramu** — Aplikasiyo, urubuga, algorithm\n• **Ububiko bw'amakuru** — Ububiko bw'ibihingwa, amakarita\n• **Ibitabo** — Ubushakashatsi, amabwiriza y'ubuhinzi\n• **Ibishushanyo** — UI/UX, infografike\n• **Ibigisha** — Videwo, amahugurwa\n\nIbintu by'ingenzi:\n• Kurindwa ni **bwikora** — nta kwiyandikisha\n• Bimara **ubuzima bw'umuhanzi + imyaka 50-70**\n• Birinda **uburyo** atari igitekerezo`,
    example: `©️ AgriPio Copyright Example:\n"Signal-First UI Architecture"\n\nOur design system includes:\n• High-Impedance Status Hero\n• 2x2 Quadrant Grid layout\n• Context Mode Switcher\n\nThis is automatically copyrighted.\nCopyright © 2026 AgriPio`,
    tryIt: 'If you created a farming guide, it would automatically be copyrighted. What original agricultural content could you create?',
    keyPoints: ['Automatic protection', 'Covers software, designs, publications', 'Protects expression, not ideas', 'Lasts lifetime + 50-70 years'],
    quiz: [
      { question: 'Is registration required for copyright?', questionRw: 'Kwiyandikisha birasabwa ku burenganzira?', options: ['Yes, always', 'No, it\'s automatic', 'Only for software', 'Only for books'], optionsRw: ['Yego, buri gihe', 'Oya, ni bwikora', 'Software gusa', 'Ibitabo gusa'], correct: 1 },
      { question: 'What does copyright protect?', questionRw: 'Uburenganzira burinda iki?', options: ['Ideas', 'Expression of ideas', 'Physical objects', 'Natural resources'], optionsRw: ['Ibitekerezo', 'Uburyo bw\'ibitekerezo', 'Ibintu byiza', 'Umutungo kamere'], correct: 1 },
    ],
  },
  {
    id: 'trademarks', title: 'Agricultural Trademarks', titleRw: 'Ibimenyetso by\'Ubucuruzi mu Buhinzi',
    category: 'Trademarks',
    content: `A trademark identifies products or services. In agriculture:\n\n• **Build trust** — Consumers know quality\n• **Differentiate** — Stand out from competitors\n• **Add value** — Branded products cost 30% more\n• **Protect reputation** — Prevent copycats\n\nTypes:\n• **Brand names** — "AgriPio"\n• **Logos** — Visual symbols\n• **Slogans** — "Intelligent Agriculture from Soil to Market"\n• **Geographic Indicators** — "Nyungwe Forest Honey"\n• **Certification marks** — "Organic Certified"`,
    contentRw: `Ikimenyetso cy'ubucuruzi kimenyesha ibicuruzwa. Mu buhinzi:\n\n• **Kubaka icyizere** — Abakiriya bamenya ubuziranenge\n• **Gutandukana** — Guhagararira mu bahanganye\n• **Kongeraho agaciro** — Ibicuruzwa bifite izina bicuruza 30% hejuru\n• **Kurinda izina** — Kubuza gukoporora\n\nUbwoko:\n• **Amazina y'ibicuruzwa** — "AgriPio"\n• **Ibimenyetso** — Amashusho\n• **Interuro** — "Ubuhinzi bw'Ubwenge"\n• **Ikimenyetso cy'ahantu** — "Ubuki bwa Nyungwe"`,
    example: `™️ AgriPio Trademark Example:\nBrand: "AgriPio" ™\nTagline: "Intelligent Agriculture from Soil to Market" ™\n\nImagine you grow pineapples in Kayonza.\nBy trademarking "Kayonza Gold Pineapples":\n• Prevent others from using your name\n• Build customer loyalty\n• Command premium prices (up to 30%)`,
    tryIt: 'Create a brand name for a local agricultural product. What makes it unique?',
    keyPoints: ['Identifies and distinguishes products', 'Renewable every 10 years', 'Includes names, logos, slogans', 'Geographic indicators are powerful'],
    quiz: [
      { question: 'How often can trademarks be renewed?', questionRw: 'Ibimenyetso bishobora kongerwa rimwe mu gihe ki?', options: ['5 years', '10 years', '20 years', 'Cannot renew'], optionsRw: ['Imyaka 5', 'Imyaka 10', 'Imyaka 20', 'Ntibongerwa'], correct: 1 },
      { question: 'By how much can branding increase product value?', questionRw: 'Izina ryongera agaciro k\'igicuruzwa angahe?', options: ['10%', '20%', '30%', '50%'], optionsRw: ['10%', '20%', '30%', '50%'], correct: 2 },
    ],
  },
  {
    id: 'trade-secrets', title: 'Trade Secrets in Farming', titleRw: 'Ibanga ry\'Ubucuruzi mu Buhinzi',
    category: 'Trade Secrets',
    content: `Trade secrets are confidential business information. Unlike patents:\n\n• **Never expire** — Protected as long as they remain secret\n• **No registration** — Just keep them confidential\n• **No public disclosure** — The secret stays hidden\n• **Lost if revealed** — Once public, protection ends\n\nAgricultural trade secrets:\n• **Proprietary formulas** — Fertilizer blends\n• **Growing techniques** — Unique cultivation methods\n• **Business strategies** — Pricing algorithms\n• **Customer lists** — Buyer databases\n• **AI/ML models** — Training data, algorithm weights`,
    contentRw: `Ibanga ry'ubucuruzi ni amakuru y'ibanga bifite agaciro. Bitandukanye na patenti:\n\n• **Ntibigira iherezo** — Birindwa igihe cyose bikigumye mu ibanga\n• **Nta kwiyandikisha** — Bigume mu ibanga gusa\n• **Nta kumenyesha** — Ibanga riguma rihishwe\n• **Birasenyuka biramenyekanye** — Ibimenyekanye ntibirindwa\n\nIbanga ry'ubucuruzi mu buhinzi:\n• **Uburyo bwihariye** — Imivange y'ifumbire\n• **Uburyo bwo guhinga** — Uburyo budasanzwe\n• **Ingamba z'ubucuruzi** — Algorithm y'igiciro`,
    example: `🤫 AgriPio Trade Secret Example:\n"Market Optimization Algorithm"\n\nOur algorithm analyzes 12+ variables:\n• Commodity price trends\n• Weather patterns\n• Regional supply-demand\n• Transport costs\n\nThe exact weights are NEVER published.\nUnlike a patent (20 years), this can be protected FOREVER.`,
    tryIt: 'What knowledge do you have that competitors would love to know? Your composting recipe? Supplier contacts?',
    keyPoints: ['No expiration', 'No registration', 'Lost if disclosed', 'Covers formulas, algorithms, strategies'],
    quiz: [
      { question: 'Do trade secrets expire?', questionRw: 'Ibanga ry\'ubucuruzi rirangira?', options: ['Yes, after 20 years', 'Yes, after 50 years', 'No, they last forever if kept secret', 'It depends'], optionsRw: ['Yego, nyuma y\'imyaka 20', 'Yego, nyuma y\'imyaka 50', 'Oya, bimara iteka mu ibanga', 'Biterwa'], correct: 2 },
      { question: 'What happens if a trade secret is publicly revealed?', questionRw: 'Bigenda bite ibanga rimenyekanye?', options: ['It gets stronger', 'Protection ends', 'It becomes a patent', 'Nothing happens'], optionsRw: ['Rikura imbaraga', 'Kurindwa birarangira', 'Riba patenti', 'Ntacyo bibaye'], correct: 1 },
    ],
  },
  {
    id: 'protecting', title: 'Protecting Your Farm IP', titleRw: 'Kurinda IP y\'Ubworozi Bwawe',
    category: 'Protection',
    content: `Every farmer has IP worth protecting:\n\n**Step 1: Identify Your IP**\n• List all innovations, brands, and unique processes\n• Categorize as patent, copyright, trademark, or trade secret\n\n**Step 2: Choose Protection Strategy**\n• Patents for novel inventions (costly but strong)\n• Trademarks for brand identity (moderate cost)\n• Copyright is automatic (free)\n• Trade secrets for competitive advantages (free)\n\n**Step 3: Document Everything**\n• Keep invention notebooks with dates\n• Take photos/videos of innovations\n• Save development history\n\n**Step 4: Seek Help**\n• Rwanda's RDB has an IP division\n• WIPO offers resources\n\n**Step 5: Enforce**\n• Monitor for infringement\n• Use mediation before litigation`,
    contentRw: `Buri muhinzi afite IP igaciro kirinda:\n\n**Intambwe ya 1: Menya IP Yawe**\n• Andika ibitekerezo byose, amazina, n'uburyo bwihariye\n\n**Intambwe ya 2: Hitamo Uburyo bwo Kurinda**\n• Patenti ku bitekerezo bishya\n• Ibimenyetso ku izina ry'igicuruzwa\n• Uburenganzira bw'umwanditsi ni bwikora\n• Ibanga ku myanya y'ubukungu\n\n**Intambwe ya 3: Andika Byose**\n• Bika igitabo cy'ibitekerezo\n• Fata amafoto na videwo\n\n**Intambwe ya 4: Shakisha Ubufasha**\n• RDB y'u Rwanda ifite ishami rya IP\n\n**Intambwe ya 5: Kurikirana**\n• Reba niba hari unyuranya`,
    example: `📋 Farmer Jane's IP Portfolio:\n\n🔒 Patent: Automated humidity control system\n©️ Copyright: Mushroom growing guide\n™️ Trademark: "Ruhango Royal Mushrooms"\n🤫 Trade Secret: Substrate formula\n\nTotal IP value: Makes her business worth 3x more!`,
    tryIt: 'Create a simple IP audit. List one item for each: Patent opportunity, Copyright work, Trademark candidate, Trade Secret.',
    keyPoints: ['Identify → Categorize → Protect → Document → Enforce', 'Start with free protections', 'Document everything with dates', 'IP increases valuation significantly'],
    quiz: [
      { question: 'Which IP protection is free and automatic?', questionRw: 'Ni uruhe rurinda IP ni ubuntu kandi rwikora?', options: ['Patent', 'Copyright', 'Trademark', 'All of them'], optionsRw: ['Patenti', 'Uburenganzira bw\'Umwanditsi', 'Ikimenyetso', 'Byose'], correct: 1 },
      { question: 'By how much can IP increase farm value to investors?', questionRw: 'IP yongera agaciro k\'ubworozi kangahe ku bashoramari?', options: ['1.5x', '2-3x', '5x', '10x'], optionsRw: ['1.5x', '2-3x', '5x', '10x'], correct: 1 },
      { question: 'What should you do FIRST to protect your farm IP?', questionRw: 'Ni iki ugomba gukora MBERE kugira ngo urinde IP yawe?', options: ['Hire a lawyer', 'Identify your IP', 'Register a patent', 'Sue competitors'], optionsRw: ['Shaka umwunganizi', 'Menya IP yawe', 'Andikisha patenti', 'Rega abahanganye'], correct: 1 },
    ],
  },
];

export default function IPLearning() {
  const { language } = useApp();
  const isRw = language === 'rw';
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showTryIt, setShowTryIt] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const lesson = lessons[currentLesson];
  const progress = (completedLessons.length / lessons.length) * 100;
  const allCompleted = completedLessons.length === lessons.length;

  const quizScore = lesson.quiz.reduce((acc, q, i) => acc + (quizAnswers[i] === q.correct ? 1 : 0), 0);
  const quizPassed = quizSubmitted && quizScore >= Math.ceil(lesson.quiz.length * 0.6);

  const markComplete = () => {
    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons(prev => [...prev, lesson.id]);
    }
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
      setShowTryIt(false);
      setShowQuiz(false);
      setQuizAnswers({});
      setQuizSubmitted(false);
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    if (quizScore >= Math.ceil(lesson.quiz.length * 0.6)) {
      if (!completedLessons.includes(lesson.id)) {
        setCompletedLessons(prev => [...prev, lesson.id]);
      }
    }
  };

  const content = isRw ? lesson.contentRw : lesson.content;
  const title = isRw ? lesson.titleRw : lesson.title;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard/settings" className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)' }}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">📚 {isRw ? 'IP mu Buhinzi' : 'IP for Agriculture'}</h1>
            <p className="text-sm text-muted-foreground">{isRw ? 'Kwiga kurinda ibitekerezo byawe — Amahugurwa ahuriweho' : 'Learn to protect your agricultural innovations — Interactive tutorials'}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">{isRw ? 'Aho Ugeze' : 'Your Progress'}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold" style={{ color: 'hsl(var(--emerald))' }}>{completedLessons.length}/{lessons.length}</span>
              {allCompleted && (
                <button onClick={() => setShowCertificate(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background: 'hsl(var(--gold) / 0.15)', color: 'hsl(var(--gold))', border: '1px solid hsl(var(--gold) / 0.3)' }}>
                  <Trophy className="w-3.5 h-3.5" /> {isRw ? 'Icyemezo' : 'Get Certificate'}
                </button>
              )}
            </div>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'hsl(0 0% 12%)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'var(--gradient-emerald)' }} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="glass-card p-4 lg:col-span-1">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} /> {isRw ? 'Amasomo' : 'Lessons'}
            </h3>
            <div className="space-y-1">
              {lessons.map((l, i) => (
                <button key={l.id} onClick={() => { setCurrentLesson(i); setShowTryIt(false); setShowQuiz(false); setQuizAnswers({}); setQuizSubmitted(false); }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2"
                  style={currentLesson === i
                    ? { background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))' }
                    : { color: 'hsl(var(--muted-foreground))' }}>
                  {completedLessons.includes(l.id)
                    ? <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(var(--emerald))' }} />
                    : <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ background: 'hsl(0 0% 15%)' }}>{i + 1}</span>
                  }
                  <span className="truncate">{isRw ? l.titleRw : l.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Header */}
            <div className="rounded-2xl overflow-hidden">
              <div className="px-6 py-3" style={{ background: 'hsl(var(--emerald))' }}>
                <span className="text-xs font-bold uppercase" style={{ color: 'hsl(0 0% 4%)' }}>{lesson.category}</span>
              </div>
              <div className="px-6 py-5" style={{ background: 'hsl(145 30% 8%)' }}>
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="glass-card p-6">
              <div className="prose prose-invert max-w-none">
                {content.split('\n\n').map((para, i) => (
                  <div key={i} className="mb-4">
                    {para.split('\n').map((line, j) => {
                      if (line.startsWith('•') || /^\d\./.test(line)) {
                        return <div key={j} className="text-sm text-muted-foreground ml-4 mb-1">{line.replace(/\*\*(.*?)\*\*/g, '«$1»').split('«').map((part, k) => part.includes('»') ? <strong key={k} className="text-foreground">{part.replace('»', '')}</strong> : part)}</div>;
                      }
                      if (line.startsWith('⚠️')) {
                        return <div key={j} className="text-sm p-3 rounded-lg mt-2" style={{ background: 'hsl(var(--warning) / 0.1)', border: '1px solid hsl(var(--warning) / 0.3)', color: 'hsl(var(--warning))' }}>{line}</div>;
                      }
                      return <p key={j} className="text-sm text-muted-foreground leading-relaxed">{line.replace(/\*\*(.*?)\*\*/g, '«$1»').split('«').map((part, k) => part.includes('»') ? <strong key={k} className="text-foreground">{part.replace('»', '')}</strong> : part)}</p>;
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Example */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid hsl(var(--emerald) / 0.3)' }}>
              <div className="px-5 py-2.5 flex items-center gap-2" style={{ background: 'hsl(var(--emerald) / 0.15)' }}>
                <Code className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
                <span className="text-sm font-semibold" style={{ color: 'hsl(var(--emerald))' }}>{isRw ? 'Urugero' : 'Example'}</span>
              </div>
              <div className="p-5" style={{ background: 'hsl(0 0% 5%)' }}>
                {lesson.example.split('\n').map((line, i) => (
                  <div key={i} className="text-sm mb-0.5" style={{ color: line.startsWith('✅') ? 'hsl(var(--emerald))' : 'hsl(var(--muted-foreground))' }}>
                    {line || '\u00A0'}
                  </div>
                ))}
              </div>
            </div>

            {/* Try It */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid hsl(var(--sky) / 0.3)' }}>
              <button onClick={() => setShowTryIt(!showTryIt)} className="w-full px-5 py-3 flex items-center justify-between" style={{ background: 'hsl(var(--sky) / 0.1)' }}>
                <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'hsl(var(--sky))' }}>
                  <Play className="w-4 h-4" /> {isRw ? 'Gerageza Ubwawe!' : 'Try It Yourself!'}
                </span>
                <ChevronRight className="w-4 h-4 transition-transform" style={{ color: 'hsl(var(--sky))', transform: showTryIt ? 'rotate(90deg)' : 'none' }} />
              </button>
              {showTryIt && (
                <div className="p-5" style={{ background: 'hsl(0 0% 5%)' }}>
                  <p className="text-sm text-muted-foreground mb-4">{lesson.tryIt}</p>
                  <textarea rows={4} placeholder={isRw ? 'Andika igisubizo cyawe hano...' : 'Write your answer here...'}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }} />
                </div>
              )}
            </div>

            {/* Quiz Section */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid hsl(270 60% 60% / 0.3)' }}>
              <button onClick={() => setShowQuiz(!showQuiz)} className="w-full px-5 py-3 flex items-center justify-between" style={{ background: 'hsl(270 60% 60% / 0.1)' }}>
                <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'hsl(270 60% 60%)' }}>
                  <HelpCircle className="w-4 h-4" /> {isRw ? '📝 Ikizamini' : '📝 Quiz — Test Your Knowledge'}
                </span>
                <ChevronRight className="w-4 h-4 transition-transform" style={{ color: 'hsl(270 60% 60%)', transform: showQuiz ? 'rotate(90deg)' : 'none' }} />
              </button>
              {showQuiz && (
                <div className="p-5 space-y-4" style={{ background: 'hsl(0 0% 5%)' }}>
                  {lesson.quiz.map((q, qi) => (
                    <div key={qi} className="p-4 rounded-xl" style={{ background: 'hsl(0 0% 7%)', border: '1px solid hsl(0 0% 12%)' }}>
                      <p className="text-sm font-medium mb-3">{qi + 1}. {isRw ? q.questionRw : q.question}</p>
                      <div className="space-y-2">
                        {(isRw ? q.optionsRw : q.options).map((opt, oi) => {
                          const selected = quizAnswers[qi] === oi;
                          const isCorrect = quizSubmitted && oi === q.correct;
                          const isWrong = quizSubmitted && selected && oi !== q.correct;
                          return (
                            <button key={oi} onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                              className="w-full text-left px-4 py-2.5 rounded-lg text-sm flex items-center gap-3 transition-all"
                              style={{
                                background: isCorrect ? 'hsl(var(--emerald) / 0.15)' : isWrong ? 'hsl(var(--alert) / 0.15)' : selected ? 'hsl(270 60% 60% / 0.15)' : 'hsl(0 0% 10%)',
                                border: `1px solid ${isCorrect ? 'hsl(var(--emerald) / 0.4)' : isWrong ? 'hsl(var(--alert) / 0.4)' : selected ? 'hsl(270 60% 60% / 0.4)' : 'hsl(0 0% 15%)'}`,
                                color: isCorrect ? 'hsl(var(--emerald))' : isWrong ? 'hsl(var(--alert))' : 'hsl(var(--foreground))',
                              }}>
                              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                style={{ background: selected || isCorrect ? 'hsl(var(--emerald) / 0.2)' : 'hsl(0 0% 15%)' }}>
                                {String.fromCharCode(65 + oi)}
                              </span>
                              {opt}
                              {isCorrect && <CheckCircle className="w-4 h-4 ml-auto" />}
                              {isWrong && <AlertTriangle className="w-4 h-4 ml-auto" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {!quizSubmitted ? (
                    <button onClick={handleQuizSubmit}
                      disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                      className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
                      style={Object.keys(quizAnswers).length >= lesson.quiz.length
                        ? { background: 'hsl(270 60% 60%)', color: 'white' }
                        : { background: 'hsl(0 0% 12%)', color: 'hsl(var(--muted-foreground))', opacity: 0.5 }}>
                      {isRw ? 'Ohereza Ibisubizo' : 'Submit Answers'}
                    </button>
                  ) : (
                    <div className="p-4 rounded-xl text-center" style={{
                      background: quizPassed ? 'hsl(var(--emerald) / 0.1)' : 'hsl(var(--alert) / 0.1)',
                      border: `1px solid ${quizPassed ? 'hsl(var(--emerald) / 0.3)' : 'hsl(var(--alert) / 0.3)'}`,
                    }}>
                      <div className="text-2xl mb-1">{quizPassed ? '🎉' : '📚'}</div>
                      <p className="text-sm font-semibold" style={{ color: quizPassed ? 'hsl(var(--emerald))' : 'hsl(var(--alert))' }}>
                        {quizScore}/{lesson.quiz.length} {isRw ? 'Byagenze neza' : 'Correct'}
                        {quizPassed ? (isRw ? ' — Watsinze!' : ' — Passed!') : (isRw ? ' — Subiramo' : ' — Try Again')}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Key Takeaways */}
            <div className="glass-card p-5" style={{ border: '1px solid hsl(var(--gold) / 0.3)' }}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" style={{ color: 'hsl(var(--gold))' }} />
                <span style={{ color: 'hsl(var(--gold))' }}>{isRw ? 'Ingingo Nkuru' : 'Key Takeaways'}</span>
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
              <button onClick={() => { setCurrentLesson(prev => Math.max(0, prev - 1)); setShowTryIt(false); setShowQuiz(false); setQuizAnswers({}); setQuizSubmitted(false); }}
                disabled={currentLesson === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-30"
                style={{ background: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 13%)' }}>
                <ChevronLeft className="w-4 h-4" /> {isRw ? 'Inyuma' : 'Previous'}
              </button>
              <button onClick={markComplete} className="btn-emerald flex items-center gap-2">
                {currentLesson === lessons.length - 1 ? (
                  <><Award className="w-4 h-4" /> {isRw ? 'Rangiza Isomo' : 'Complete Course'}</>
                ) : (
                  <><CheckCircle className="w-4 h-4" /> {isRw ? 'Emeza & Komeza' : 'Mark Complete & Next'}</>
                )}
              </button>
            </div>

            <IPWatermark />
          </div>
        </div>

        {/* Certificate Modal */}
        {showCertificate && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" style={{ background: 'hsl(0 0% 0% / 0.85)', backdropFilter: 'blur(12px)' }}>
            <div className="w-full max-w-xl animate-slide-up">
              <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid hsl(var(--gold) / 0.5)', boxShadow: '0 0 60px hsl(var(--gold) / 0.2)' }}>
                {/* Certificate */}
                <div className="p-8 text-center" style={{ background: 'linear-gradient(135deg, hsl(0 0% 5%), hsl(43 20% 8%))' }}>
                  <div className="text-5xl mb-4">🏆</div>
                  <p className="text-xs uppercase tracking-[0.3em] mb-1" style={{ color: 'hsl(var(--gold))' }}>Certificate of Achievement</p>
                  <h2 className="text-2xl font-bold mb-1" style={{ color: 'hsl(var(--gold))' }}>IP Awareness Certificate</h2>
                  <p className="text-xs text-muted-foreground mb-6">AgriPio Smart Bio-Digital Agricultural Ecosystem</p>
                  
                  <div className="w-20 h-0.5 mx-auto mb-6" style={{ background: 'hsl(var(--gold) / 0.3)' }} />
                  
                  <p className="text-sm text-muted-foreground mb-1">{isRw ? 'Icyi cyemezo cyahawe' : 'This is to certify that'}</p>
                  <p className="text-xl font-bold mb-1" style={{ color: 'hsl(var(--foreground))' }}>AgriPio User</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    {isRw
                      ? 'yarangije neza isomo ryose rya IP mu Buhinzi kuri AgriPio'
                      : 'has successfully completed all IP for Agriculture lessons on AgriPio'}
                  </p>

                  <div className="flex items-center justify-center gap-8 mb-6">
                    <div>
                      <p className="text-xs text-muted-foreground">{isRw ? 'Itariki' : 'Date'}</p>
                      <p className="text-sm font-semibold">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{isRw ? 'Amasomo' : 'Lessons'}</p>
                      <p className="text-sm font-semibold">{lessons.length}/{lessons.length}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">{isRw ? 'Ikipe' : 'Team'}</p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      {['KWIZERA Elissa', 'INEZA Elyon Ivo', 'INEZA Aliza', 'ISHIMWE Ornella'].map(name => (
                        <span key={name} className="text-xs px-2 py-1 rounded-lg" style={{ background: 'hsl(0 0% 10%)', color: 'hsl(var(--muted-foreground))' }}>
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2" style={{ color: 'hsl(var(--emerald))' }}>
                    <Star className="w-4 h-4" />
                    <p className="text-xs font-bold">© 2026 AgriPio — Intelligent Agriculture from Soil to Market</p>
                    <Star className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <button onClick={() => setShowCertificate(false)} className="w-full mt-4 py-3 rounded-xl text-sm font-medium"
                style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)' }}>
                {isRw ? 'Funga' : 'Close'}
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
