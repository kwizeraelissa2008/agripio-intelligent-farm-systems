/**
 * Daily IP Lesson Popup
 * Appears once per day, blocks dashboard until countdown ends
 * Pulls from ipDailyLessons.ts, supports EN & Kinyarwanda
 * © 2026 AgriPio — All rights reserved.
 */
import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { getTodaysLesson, hasSeenTodaysLesson, markLessonSeen } from '@/lib/ipDailyLessons';
import { BookOpen, Clock, X } from 'lucide-react';

export default function IPLessonModal() {
  const { language } = useApp();
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const lesson = getTodaysLesson();

  useEffect(() => {
    if (!hasSeenTodaysLesson()) {
      setVisible(true);
      setCountdown(lesson.durationSeconds);
    }
  }, []);

  useEffect(() => {
    if (!visible || countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, visible]);

  const dismiss = () => {
    markLessonSeen();
    setVisible(false);
  };

  if (!visible) return null;

  const title = language === 'rw' ? lesson.titleRw : lesson.titleEn;
  const body = language === 'rw' ? lesson.bodyRw : lesson.bodyEn;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'hsl(0 0% 0% / 0.85)', backdropFilter: 'blur(12px)' }}>
      <div className="w-full max-w-lg animate-slide-up">
        {/* Header badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            style={{ background: 'hsl(var(--emerald) / 0.15)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.3)' }}>
            <BookOpen className="w-3.5 h-3.5" />
            {language === 'rw' ? 'Isomo rya Buri Munsi rya IP' : 'Daily IP Lesson'}
          </div>
        </div>

        <div className="glass-card p-8" style={{ border: '1px solid hsl(var(--emerald) / 0.3)', boxShadow: 'var(--shadow-emerald-strong)' }}>
          {/* Icon + Category */}
          <div className="text-center mb-5">
            <span className="text-5xl block mb-3">{lesson.icon}</span>
            <span className="tag emerald text-xs uppercase">{lesson.category.replace('-', ' ')}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-center mb-4" style={{ color: 'hsl(var(--foreground))' }}>
            {title}
          </h2>

          {/* Body */}
          <p className="text-sm leading-relaxed text-center mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {body}
          </p>

          {/* IP Awareness Label */}
          <div className="text-center mb-6 px-4 py-2 rounded-xl" style={{ background: 'hsl(var(--emerald) / 0.05)', border: '1px solid hsl(var(--emerald) / 0.15)' }}>
            <p className="text-xs" style={{ color: 'hsl(var(--emerald))' }}>
              © AgriPio 2026 — {language === 'rw' ? 'Rinda ibitekerezo byawe. Ubuhinzi bw\'Ubwenge.' : 'Protect your innovations. Intelligent Agriculture.'}
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={dismiss}
            disabled={countdown > 0}
            className="w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
            style={countdown > 0
              ? { background: 'hsl(0 0% 12%)', color: 'hsl(var(--muted-foreground))', cursor: 'not-allowed' }
              : { background: 'var(--gradient-emerald)', color: 'hsl(var(--primary-foreground))', boxShadow: 'var(--shadow-emerald)' }
            }>
            {countdown > 0 ? (
              <>
                <Clock className="w-4 h-4" />
                {language === 'rw' ? `Tegereza ${countdown}s...` : `Wait ${countdown}s...`}
              </>
            ) : (
              language === 'rw' ? '✓ Nabimenye — Komeza' : '✓ Got It — Continue to Dashboard'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
