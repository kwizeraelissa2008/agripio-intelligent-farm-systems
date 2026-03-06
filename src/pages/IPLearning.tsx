/**
 * IP Learning Center — Lessons, Video, Quizzes, Certificate
 * © 2026 AgriPio Team
 */
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useApp } from '@/contexts/AppContext';
import { 
  BookOpen, ChevronRight, CheckCircle, Play,
  Award, ArrowLeft, HelpCircle, Trophy, Download,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuizQuestion {
  question: string; options: string[]; correct: number;
}

interface Lesson {
  id: string; title: string; category: string; content: string; example: string;
  keyPoints: string[]; quiz: QuizQuestion[];
}

const lessons: Lesson[] = [
  {
    id: 'intro', title: 'What is Intellectual Property?', category: 'Basics',
    content: `Intellectual Property (IP) refers to creations of the mind — inventions, designs, brand names, artistic works, and trade secrets.\n\nIn agriculture, IP protects innovations that improve farming and food production.\n\nThere are four main types:\n• Patents — Protect inventions (20 years)\n• Copyrights — Protect creative works (automatic)\n• Trademarks — Protect brand names (renewable)\n• Trade Secrets — Protect confidential info (forever if kept secret)`,
    example: `🌱 A farmer develops organic pest control → PATENT\nBrand name "GreenGuard" → TRADEMARK\nThe exact formula → TRADE SECRET`,
    keyPoints: ['IP protects creations of the mind', 'Four types: Patents, Copyrights, Trademarks, Trade Secrets', 'IP encourages innovation in agriculture'],
    quiz: [
      { question: 'What does IP stand for?', options: ['Internet Protocol', 'Intellectual Property', 'International Patent', 'Innovation Protection'], correct: 1 },
      { question: 'How many main types of IP are there?', options: ['2', '3', '4', '6'], correct: 2 },
    ],
  },
  {
    id: 'patents', title: 'Patents in Agriculture', category: 'Patents',
    content: `A patent gives an inventor exclusive rights for 20 years.\n\nIn agriculture, patents protect:\n• New plant varieties and hybrid seeds\n• Farm equipment and IoT sensors\n• New pest control processes\n• AI farming algorithms\n\nTo qualify:\n1. Must be Novel (new)\n2. Must be Non-obvious\n3. Must be Useful`,
    example: `🔬 AgriPio Patent:\n"Smart Soil Testing System"\n✅ Novel — No existing device like it\n✅ Non-obvious — Requires innovative engineering\n✅ Useful — Directly improves farming`,
    keyPoints: ['Patents last 20 years', 'Must be novel, non-obvious, useful', 'Covers inventions and processes'],
    quiz: [
      { question: 'How long does a patent last?', options: ['10 years', '15 years', '20 years', 'Forever'], correct: 2 },
      { question: 'Which is NOT required for a patent?', options: ['Novel', 'Non-obvious', 'Expensive', 'Useful'], correct: 2 },
    ],
  },
  {
    id: 'copyrights', title: 'Copyright for AgriTech', category: 'Copyright',
    content: `Copyright automatically protects original creative works.\n\nIn AgriTech, it covers:\n• Software code and apps\n• Databases and soil maps\n• Farming guides and publications\n• UI/UX designs\n• Training videos\n\nKey facts:\n• Protection is automatic — no registration needed\n• Lasts for creator's lifetime + 50-70 years\n• Protects the expression, not the idea`,
    example: `©️ AgriPio's app design and code are automatically copyrighted.\nCopyright © 2026 AgriPio Team`,
    keyPoints: ['Automatic protection', 'Covers software, designs, publications', 'Lasts lifetime + 50-70 years'],
    quiz: [
      { question: 'Is registration required for copyright?', options: ['Yes, always', 'No, it\'s automatic', 'Only for software', 'Only for books'], correct: 1 },
    ],
  },
  {
    id: 'trademarks', title: 'Agricultural Trademarks', category: 'Trademarks',
    content: `A trademark identifies products or services.\n\nBenefits:\n• Build trust with consumers\n• Stand out from competitors\n• Branded products sell 30% higher!\n• Prevent copycats\n\nTypes:\n• Brand names — "AgriPio"\n• Logos — Visual symbols\n• Slogans — Catchy phrases\n• Geographic Indicators — "Nyungwe Forest Honey"`,
    example: `™️ Imagine trademarking "Kayonza Gold Pineapples"\n→ Prevent others from using your name\n→ Build customer loyalty\n→ Command premium prices`,
    keyPoints: ['Renewable every 10 years', 'Branded products cost 30% more', 'Includes names, logos, slogans'],
    quiz: [
      { question: 'By how much can branding increase value?', options: ['10%', '20%', '30%', '50%'], correct: 2 },
    ],
  },
  {
    id: 'trade-secrets', title: 'Trade Secrets in Farming', category: 'Trade Secrets',
    content: `Trade secrets are confidential business information.\n\nUnlike patents:\n• Never expire — protected as long as secret\n• No registration needed\n• No public disclosure\n• Lost if revealed\n\nExamples:\n• Proprietary fertilizer formulas\n• Unique growing techniques\n• Pricing algorithms\n• AI model weights`,
    example: `🤫 AgriPio's market algorithm analyzes 12+ variables.\nThe exact logic is NEVER published.\nUnlike a patent (20 years), this lasts FOREVER.`,
    keyPoints: ['No expiration', 'No registration', 'Lost if disclosed', 'Covers formulas and algorithms'],
    quiz: [
      { question: 'Do trade secrets expire?', options: ['Yes, 20 years', 'Yes, 50 years', 'No, forever if kept secret', 'Depends'], correct: 2 },
    ],
  },
  {
    id: 'protecting', title: 'Protecting Your Farm IP', category: 'Protection',
    content: `Every farmer has IP worth protecting!\n\nStep 1: Identify your innovations\nStep 2: Categorize (patent, copyright, trademark, trade secret)\nStep 3: Document everything with dates\nStep 4: Seek help from Rwanda's RDB IP division\nStep 5: Monitor and enforce\n\nARIPO can protect across 22 African countries! 🌍`,
    example: `📋 Farmer Jane's IP Portfolio:\n🔒 Patent: Humidity control system\n©️ Copyright: Mushroom growing guide\n™️ Trademark: "Ruhango Royal Mushrooms"\n🤫 Trade Secret: Substrate formula\n→ Makes her business worth 3x more!`,
    keyPoints: ['Identify → Categorize → Protect → Document → Enforce', 'Start with free protections', 'IP increases farm value 2-3x'],
    quiz: [
      { question: 'Which IP protection is free and automatic?', options: ['Patent', 'Copyright', 'Trademark', 'All of them'], correct: 1 },
      { question: 'What should you do FIRST?', options: ['Hire a lawyer', 'Identify your IP', 'Register a patent', 'Sue competitors'], correct: 1 },
    ],
  },
];

export default function IPLearning() {
  const { language } = useApp();
  const isRw = language === 'rw';
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
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
    if (!completedLessons.includes(lesson.id)) setCompletedLessons(prev => [...prev, lesson.id]);
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
      setShowQuiz(false); setQuizAnswers({}); setQuizSubmitted(false);
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    if (quizScore >= Math.ceil(lesson.quiz.length * 0.6) && !completedLessons.includes(lesson.id)) {
      setCompletedLessons(prev => [...prev, lesson.id]);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-5 animate-fade-in pb-24">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="w-8 h-8 rounded-lg flex items-center justify-center bg-secondary border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">📚 IP for Agriculture</h1>
            <p className="text-xs text-muted-foreground">Learn to protect your farming innovations</p>
          </div>
        </div>

        {/* Progress */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold" style={{ color: 'hsl(var(--emerald))' }}>{completedLessons.length}/{lessons.length}</span>
              {allCompleted && (
                <button onClick={() => setShowCertificate(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                  style={{ background: 'hsl(var(--gold) / 0.15)', color: 'hsl(var(--gold))', border: '1px solid hsl(var(--gold) / 0.3)' }}>
                  <Trophy className="w-3.5 h-3.5" /> Certificate
                </button>
              )}
            </div>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden bg-secondary">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, hsl(var(--emerald)), hsl(145 60% 30%))' }} />
          </div>
        </div>

        {/* Video Placeholder */}
        <div className="glass-card overflow-hidden" style={{ border: '1px solid hsl(var(--emerald) / 0.3)' }}>
          <div className="aspect-video flex flex-col items-center justify-center bg-secondary">
            <Play className="w-12 h-12 mb-2 text-muted-foreground" />
            <p className="text-sm font-medium">📹 IP Lesson Video</p>
            <p className="text-xs text-muted-foreground mt-1">Video content coming soon from AgriPio team</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Sidebar */}
          <div className="glass-card p-4 lg:col-span-1">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} /> Lessons
            </h3>
            <div className="space-y-1">
              {lessons.map((l, i) => (
                <button key={l.id} onClick={() => { setCurrentLesson(i); setShowQuiz(false); setQuizAnswers({}); setQuizSubmitted(false); }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2"
                  style={currentLesson === i
                    ? { background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))' }
                    : {}}>
                  {completedLessons.includes(l.id)
                    ? <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(var(--emerald))' }} />
                    : <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold bg-secondary">{i + 1}</span>
                  }
                  <span className="truncate text-xs">{l.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-4">
            <div className="rounded-xl overflow-hidden">
              <div className="px-5 py-2.5" style={{ background: 'hsl(var(--emerald))' }}>
                <span className="text-xs font-bold uppercase text-white">{lesson.category}</span>
              </div>
              <div className="px-5 py-4 bg-secondary">
                <h2 className="text-lg font-bold">{lesson.title}</h2>
              </div>
            </div>

            <div className="glass-card p-5">
              {lesson.content.split('\n\n').map((para, i) => (
                <div key={i} className="mb-3">
                  {para.split('\n').map((line, j) => (
                    <p key={j} className="text-sm text-muted-foreground leading-relaxed mb-1">{line}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* Example */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid hsl(var(--emerald) / 0.3)' }}>
              <div className="px-4 py-2 flex items-center gap-2" style={{ background: 'hsl(var(--emerald) / 0.1)' }}>
                <Star className="w-4 h-4" style={{ color: 'hsl(var(--emerald))' }} />
                <span className="text-sm font-semibold" style={{ color: 'hsl(var(--emerald))' }}>Example</span>
              </div>
              <div className="p-4 bg-secondary">
                {lesson.example.split('\n').map((line, i) => (
                  <p key={i} className="text-sm text-muted-foreground mb-0.5">{line || '\u00A0'}</p>
                ))}
              </div>
            </div>

            {/* Key Points */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-semibold mb-2">📝 Key Points</h3>
              {lesson.keyPoints.map((kp, i) => (
                <div key={i} className="flex items-start gap-2 mb-1">
                  <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--emerald))' }} />
                  <span className="text-xs text-muted-foreground">{kp}</span>
                </div>
              ))}
            </div>

            {/* Quiz */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid hsl(270 60% 60% / 0.3)' }}>
              <button onClick={() => setShowQuiz(!showQuiz)} className="w-full px-4 py-3 flex items-center justify-between" style={{ background: 'hsl(270 60% 60% / 0.1)' }}>
                <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'hsl(270 60% 60%)' }}>
                  <HelpCircle className="w-4 h-4" /> 📝 Quiz
                </span>
                <ChevronRight className="w-4 h-4" style={{ color: 'hsl(270 60% 60%)', transform: showQuiz ? 'rotate(90deg)' : 'none' }} />
              </button>
              {showQuiz && (
                <div className="p-4 space-y-4 bg-secondary">
                  {lesson.quiz.map((q, qi) => (
                    <div key={qi} className="p-3 rounded-xl bg-background border border-border">
                      <p className="text-sm font-medium mb-2">{qi + 1}. {q.question}</p>
                      <div className="space-y-1.5">
                        {q.options.map((opt, oi) => {
                          const selected = quizAnswers[qi] === oi;
                          const isCorrect = quizSubmitted && oi === q.correct;
                          const isWrong = quizSubmitted && selected && oi !== q.correct;
                          return (
                            <button key={oi} onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                              className="w-full text-left px-3 py-2 rounded-lg text-xs transition-all"
                              style={{
                                background: isCorrect ? 'hsl(var(--emerald) / 0.15)' : isWrong ? 'hsl(var(--alert) / 0.15)' : selected ? 'hsl(270 60% 60% / 0.15)' : 'hsl(var(--secondary))',
                                border: `1px solid ${isCorrect ? 'hsl(var(--emerald) / 0.4)' : isWrong ? 'hsl(var(--alert) / 0.4)' : selected ? 'hsl(270 60% 60% / 0.4)' : 'hsl(var(--border))'}`,
                                color: isCorrect ? 'hsl(var(--emerald))' : isWrong ? 'hsl(var(--alert))' : undefined,
                              }}>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  {!quizSubmitted ? (
                    <button onClick={handleQuizSubmit} disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                      className="w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-40"
                      style={{ background: 'hsl(270 60% 60% / 0.15)', color: 'hsl(270 60% 60%)', border: '1px solid hsl(270 60% 60% / 0.3)' }}>
                      Submit Quiz
                    </button>
                  ) : (
                    <div className="text-center p-3 rounded-xl"
                      style={{ background: quizPassed ? 'hsl(var(--emerald) / 0.1)' : 'hsl(var(--alert) / 0.1)' }}>
                      <p className="text-sm font-bold" style={{ color: quizPassed ? 'hsl(var(--emerald))' : 'hsl(var(--alert))' }}>
                        {quizPassed ? `✅ Passed! ${quizScore}/${lesson.quiz.length}` : `❌ Try again. ${quizScore}/${lesson.quiz.length}`}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Next button */}
            <div className="flex gap-3">
              {currentLesson > 0 && (
                <button onClick={() => { setCurrentLesson(prev => prev - 1); setShowQuiz(false); setQuizAnswers({}); setQuizSubmitted(false); }}
                  className="px-4 py-3 rounded-xl text-sm font-medium bg-secondary border border-border">
                  ← Previous
                </button>
              )}
              <button onClick={markComplete}
                className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, hsl(var(--emerald)), hsl(145 60% 30%))' }}>
                {currentLesson < lessons.length - 1 ? 'Next Lesson →' : '✅ Complete Course'}
              </button>
            </div>
          </div>
        </div>

        {/* Certificate Modal */}
        {showCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowCertificate(false)}>
            <div className="w-full max-w-lg rounded-2xl p-8 text-center animate-scale-in" onClick={e => e.stopPropagation()}
              style={{ background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)))', border: '2px solid hsl(var(--gold) / 0.4)' }}>
              <Award className="w-16 h-16 mx-auto mb-4" style={{ color: 'hsl(var(--gold))' }} />
              <h2 className="text-2xl font-bold mb-1">🎉 Certificate of Completion</h2>
              <p className="text-muted-foreground text-sm mb-4">IP for Agriculture — AgriPio Learning Center</p>
              <div className="text-xl font-bold mb-4" style={{ color: 'hsl(var(--emerald))' }}>
                {/* user name would go here */}
                Outstanding Achievement!
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                Completed all {lessons.length} lessons on Intellectual Property in Agriculture.
                <br />Issued by IP Club — Ecole Des Sciences Byimana
              </p>
              <p className="text-xs text-muted-foreground">© 2026 AgriPio Team</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
