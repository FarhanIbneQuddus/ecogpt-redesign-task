import { Sparkles, Brain, Gem, Flame, Wind, Search, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { ChatMessage } from '@/data/chatData';

const iconMap: Record<string, typeof Sparkles> = {
  sparkles: Sparkles,
  brain: Brain,
  gem: Gem,
  flame: Flame,
  wind: Wind,
  search: Search,
};

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';
  const Icon = message.modelLogo ? iconMap[message.modelLogo] ?? Sparkles : Sparkles;

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple markdown-like rendering for code blocks
  const renderContent = (content: string) => {
    const parts = content.split(/```(\w*)\n?/);
    if (parts.length === 1) return <p className="whitespace-pre-wrap">{content}</p>;

    const elements: React.ReactNode[] = [];
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        if (parts[i].trim()) {
          elements.push(<p key={i} className="whitespace-pre-wrap">{parts[i]}</p>);
        }
      } else {
        // Code block - next element is the code
        const code = parts[i + 1] ?? '';
        elements.push(
          <pre key={i} className="my-3 overflow-x-auto rounded-lg bg-[var(--bg-tertiary)] p-3 text-xs scrollbar-thin">
            <code className="font-mono">{code.replace(/\n$/, '')}</code>
          </pre>
        );
        i++; // Skip the code content
      }
    }
    return elements;
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
        style={
          isUser
            ? { background: 'linear-gradient(135deg, #2f86f6, #06b6d4)' }
            : { backgroundColor: message.modelColor ?? '#2f86f6' }
        }
      >
        {isUser ? 'You' : <Icon className="h-4 w-4" />}
      </div>

      {/* Message content */}
      <div className={`group flex max-w-[80%] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && message.modelName && (
          <span className="mb-1 text-xs font-medium text-[var(--text-muted)]">{message.modelName}</span>
        )}
        <div
          className={`relative rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'rounded-br-sm bg-brand-600 text-white'
              : 'rounded-bl-sm bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
          }`}
        >
          {renderContent(message.content)}
          {message.streaming && (
            <span className="ml-1 inline-block h-3 w-1.5 animate-blink bg-current align-middle" />
          )}
        </div>

        {/* Actions */}
        {!isUser && !message.streaming && (
          <button
            onClick={handleCopy}
            className="mt-1.5 flex items-center gap-1 text-xs text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100 hover:text-[var(--text)]"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" /> Copy
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
