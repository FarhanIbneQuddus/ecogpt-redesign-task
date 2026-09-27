import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Sparkles, Brain, Gem, Flame, Wind, Search } from 'lucide-react';
import { aiModels } from '@/data/content';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  selectedModelId: string;
}

const iconMap: Record<string, typeof Sparkles> = {
  sparkles: Sparkles,
  brain: Brain,
  gem: Gem,
  flame: Flame,
  wind: Wind,
  search: Search,
};

const promptSuggestions = [
  'Explain quantum computing simply',
  'Write a Python function to sort a list',
  'Create a marketing tagline for a coffee brand',
  'Summarize the benefits of exercise',
];

export function ChatInput({ onSend, disabled, selectedModelId }: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const model = aiModels.find((m) => m.id === selectedModelId) ?? aiModels[0];
  const Icon = iconMap[model.logo] ?? Sparkles;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-[var(--border)] bg-[var(--bg)] p-4">
      {/* Prompt suggestions */}
      <div className="mb-3 flex flex-wrap gap-2">
        {promptSuggestions.map((s) => (
          <button
            key={s}
            onClick={() => setText(s)}
            disabled={disabled}
            className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-secondary)] transition-all hover:border-brand-300 hover:text-[var(--text)] disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="flex items-end gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-2 transition-all focus-within:border-brand-400 focus-within:shadow-lg focus-within:shadow-brand-500/5">
        <button className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" aria-label="Attach file">
          <Paperclip className="h-4 w-4" />
        </button>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${model.name}...`}
          rows={1}
          disabled={disabled}
          className="flex-1 resize-none bg-transparent py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none disabled:opacity-50 scrollbar-thin"
        />

        <button className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" aria-label="Voice input">
          <Mic className="h-4 w-4" />
        </button>

        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white transition-all hover:bg-brand-700 active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

      {/* Model indicator */}
      <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-[var(--text-muted)]">
        <Icon className="h-3 w-3" style={{ color: model.color }} />
        <span>Powered by {model.name}</span>
      </div>
    </div>
  );
}
