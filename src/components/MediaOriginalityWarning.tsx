/**
 * Media Originality Warning Modal
 * Appears when users upload media — warns about IP and reposting
 * © 2026 AgriPio — All rights reserved.
 */
import { AlertTriangle, ShieldCheck, Camera, X } from 'lucide-react';

interface MediaOriginalityWarningProps {
  language: 'en' | 'rw';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function MediaOriginalityWarning({ language, onConfirm, onCancel }: MediaOriginalityWarningProps) {
  const isRw = language === 'rw';

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" style={{ background: 'hsl(0 0% 0% / 0.8)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md animate-slide-up">
        <div className="glass-card p-6" style={{ border: '1px solid hsl(var(--warning) / 0.4)' }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'hsl(var(--warning) / 0.15)' }}>
                <ShieldCheck className="w-5 h-5" style={{ color: 'hsl(var(--warning))' }} />
              </div>
              <h3 className="font-bold">{isRw ? 'Uburyo bwo Gukoresha Ibikoresho' : 'Media Originality Check'}</h3>
            </div>
            <button onClick={onCancel} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(0 0% 12%)' }}>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Warning content */}
          <div className="space-y-3 mb-5">
            <div className="p-3 rounded-xl flex items-start gap-3" style={{ background: 'hsl(var(--alert) / 0.08)', border: '1px solid hsl(var(--alert) / 0.2)' }}>
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--alert))' }} />
              <p className="text-xs" style={{ color: 'hsl(var(--alert))' }}>
                {isRw
                  ? 'Gukoresha amafoto, videwo, cyangwa ibindi bya bandi nk\'ibyawe binyuranyije n\'amategeko y\'uburenganzira bw\'umwanditsi kandi bishobora guhagarika konti yawe.'
                  : 'Uploading photos, videos, or content that belongs to others and claiming it as yours violates copyright law and may result in account suspension.'}
              </p>
            </div>

            {[
              { icon: '📸', text: isRw ? 'Amafoto agomba kuba ayawe bwite' : 'Photos must be taken by you personally' },
              { icon: '🎥', text: isRw ? 'Videwo zigomba kuba izawe bwite' : 'Videos must be recorded by you personally' },
              { icon: '🚫', text: isRw ? 'Ntukoreshwe amafoto yo kuri interineti' : 'Do not use images downloaded from the internet' },
              { icon: '🤖', text: isRw ? 'Ibiva muri AI bigomba kuvugwa' : 'AI-generated content must be disclosed' },
            ].map((rule, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span>{rule.icon}</span>
                <span className="text-muted-foreground text-xs">{rule.text}</span>
              </div>
            ))}
          </div>

          {/* IP Label */}
          <div className="text-center py-2 mb-4 rounded-lg" style={{ background: 'hsl(var(--emerald) / 0.05)', border: '1px solid hsl(var(--emerald) / 0.15)' }}>
            <p className="text-xs" style={{ color: 'hsl(var(--emerald))' }}>
              © AgriPio 2026 — {isRw ? 'Ibintu Byawe Bwite Gusa.' : 'Original Content Only.'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 py-3 rounded-xl text-sm font-medium"
              style={{ background: 'hsl(0 0% 10%)', border: '1px solid hsl(0 0% 15%)', color: 'hsl(var(--muted-foreground))' }}>
              {isRw ? 'Reka' : 'Cancel'}
            </button>
            <button onClick={onConfirm} className="flex-1 py-3 rounded-xl text-sm font-semibold"
              style={{ background: 'var(--gradient-emerald)', color: 'hsl(var(--primary-foreground))' }}>
              {isRw ? '✓ Ni Ibyanjye Bwite' : '✓ This is My Original Content'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
