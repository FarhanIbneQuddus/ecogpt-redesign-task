import { MessageCircle } from 'lucide-react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  onClick?: () => void;
}

export function Logo({ size = 32, showText = true, onClick }: LogoProps) {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer select-none"
      onClick={onClick}
    >
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white shadow-lg shadow-brand-500/30"
        style={{ width: size, height: size }}
      >
        <MessageCircle style={{ width: size * 0.55, height: size * 0.55 }} strokeWidth={2.5} />
      </div>
      {showText && (
        <span className="text-lg font-bold tracking-tight" style={{ fontSize: size * 0.56 }}>
          Echo<span className="gradient-text">GPT</span>
        </span>
      )}
    </div>
  );
}
