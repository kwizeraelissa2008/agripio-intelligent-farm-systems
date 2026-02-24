/**
 * IP Watermark / Copyright Label Component
 * Applied across: Marketplace, News, IoT, AI Advisor illustrations
 * © 2026 AgriPio — All rights reserved.
 */

interface IPWatermarkProps {
  variant?: 'overlay' | 'footer' | 'badge';
  className?: string;
}

export default function IPWatermark({ variant = 'footer', className = '' }: IPWatermarkProps) {
  if (variant === 'overlay') {
    return (
      <div className={`absolute bottom-0 left-0 right-0 py-1.5 px-3 text-center ${className}`}
        style={{ background: 'linear-gradient(transparent, hsl(0 0% 0% / 0.7))', color: 'hsl(0 0% 80%)' }}>
        <p className="text-[9px] font-medium tracking-wider">© AgriPio 2026 — Original Content. Reposting Prohibited.</p>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide ${className}`}
        style={{ background: 'hsl(var(--emerald) / 0.1)', color: 'hsl(var(--emerald))', border: '1px solid hsl(var(--emerald) / 0.2)' }}>
        🛡️ © AgriPio 2026
      </span>
    );
  }

  return (
    <div className={`text-center py-3 ${className}`}>
      <p className="text-xs font-medium" style={{ color: 'hsl(var(--emerald))' }}>
        © 2026 AgriPio — Original Content. Reposting Prohibited.
      </p>
      <p className="text-[10px] text-muted-foreground mt-0.5">Smart Bio-Digital Agricultural Ecosystem</p>
    </div>
  );
}
