import { Plus, Search, MessageSquare, Trash2, Folder } from 'lucide-react';
import { useState } from 'react';
import { Conversation } from '@/data/chatData';

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  open: boolean;
  onClose: () => void;
}

export function ChatSidebar({ conversations, activeId, onSelect, onNew, onDelete, open, onClose }: ChatSidebarProps) {
  const [search, setSearch] = useState('');

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-[var(--border)] bg-[var(--bg-secondary)] transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <span className="text-sm font-semibold text-[var(--text)]">Conversations</span>
        </div>

        {/* New chat button */}
        <div className="px-3">
          <button
            onClick={onNew}
            className="flex w-full items-center gap-2 rounded-xl bg-brand-600 px-3 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-600/20 transition-all hover:bg-brand-700 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chats..."
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] py-2 pl-9 pr-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-brand-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-2 pb-4">
          {filtered.length === 0 ? (
            <div className="px-3 py-8 text-center">
              <MessageSquare className="mx-auto h-8 w-8 text-[var(--text-muted)] opacity-50" />
              <p className="mt-2 text-sm text-[var(--text-muted)]">No conversations yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((conv) => (
                <div
                  key={conv.id}
                  role="button"
                  tabIndex={0}
                  className={`group flex items-center gap-2 rounded-lg px-3 py-2.5 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                    conv.id === activeId
                      ? 'bg-[var(--bg-tertiary)]'
                      : 'hover:bg-[var(--bg-tertiary)]/50'
                  }`}
                  onClick={() => onSelect(conv.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(conv.id); } }}
                >
                  <MessageSquare className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                  <div className="flex-1 overflow-hidden">
                    <div className="truncate text-sm font-medium text-[var(--text)]">{conv.title}</div>
                    <div className="truncate text-xs text-[var(--text-muted)]">
                      {conv.messages.length} messages
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(conv.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Delete conversation"
                  >
                    <Trash2 className="h-4 w-4 text-[var(--text-muted)] hover:text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border)] p-3">
          <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-[var(--text-muted)]">
            <Folder className="h-4 w-4" />
            <span>{conversations.length} conversations</span>
          </div>
        </div>
      </aside>
    </>
  );
}
