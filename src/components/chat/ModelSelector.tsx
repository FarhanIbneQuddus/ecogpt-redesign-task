import { Sparkles, Brain, Gem, Flame, Wind, Search, Check } from 'lucide-react';
import { aiModels } from '@/data/content';

interface ModelSelectorProps {
  selectedModelId: string;
  onSelect: (id: string) => void;
}

const iconMap: Record<string, typeof Sparkles> = {
  sparkles: Sparkles,
  brain: Brain,
  gem: Gem,
  flame: Flame,
  wind: Wind,
  search: Search,
};

export function ModelSelector({ selectedModelId, onSelect }: ModelSelectorProps) {
  const selected = aiModels.find((m) => m.id === selectedModelId) ?? aiModels[0];
  const SelectedIcon = iconMap[selected.logo] ?? Sparkles;

  return (
    <div className="relative">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 transition-all hover:border-brand-400">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ backgroundColor: selected.bgColor, color: selected.color }}
          >
            <SelectedIcon className="h-4 w-4" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-[var(--text)]">{selected.name}</div>
            <div className="text-xs text-[var(--text-muted)]">{selected.provider}</div>
          </div>
          <div className="block sm:hidden text-sm font-medium text-[var(--text)]">{selected.name.split(' ')[0]}</div>
        </summary>

        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-2 shadow-2xl">
          <div className="px-2 py-1.5 text-xs font-semibold text-[var(--text-muted)]">Select AI Model</div>
          {aiModels.map((model) => {
            const Icon = iconMap[model.logo] ?? Sparkles;
            const isSelected = model.id === selectedModelId;
            return (
              <button
                key={model.id}
                onClick={() => {
                  onSelect(model.id);
                  (document.activeElement as HTMLElement)?.blur();
                }}
                className={`flex w-full items-center gap-3 rounded-lg p-2.5 transition-all hover:bg-[var(--bg-tertiary)] ${
                  isSelected ? 'bg-[var(--bg-tertiary)]' : ''
                }`}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: model.bgColor, color: model.color }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-[var(--text)]">{model.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{model.description.slice(0, 45)}...</div>
                </div>
                {isSelected && <Check className="h-4 w-4 text-brand-500" />}
              </button>
            );
          })}
        </div>
      </details>
    </div>
  );
}
