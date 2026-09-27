export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  modelId?: string;
  modelName?: string;
  modelColor?: string;
  modelLogo?: string;
  timestamp: number;
  streaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  modelId: string;
  createdAt: number;
  updatedAt: number;
}

export const newConversation = (modelId: string): Conversation => ({
  id: crypto.randomUUID(),
  title: 'New Chat',
  messages: [],
  modelId,
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

// Simulated AI response generator
const responses: Record<string, string[]> = {
  default: [
    "That's a great question! Let me break it down for you. The key thing to understand is that this concept has multiple layers — each building on the previous one. First, consider the foundational principles, then how they interact in practice, and finally the real-world implications.",
    "I can definitely help with that. Here's my take: the most effective approach combines careful planning with iterative execution. You'll want to start by defining your goals clearly, then work backwards to identify the steps needed. This ensures every action has purpose and direction.",
    "Absolutely! This is one of those topics where context matters a lot. Depending on your specific situation, I'd recommend focusing on three core areas: clarity of purpose, consistency in execution, and continuous improvement. Let me explain each in detail...",
  ],
  code: [
    "Here's a clean solution using modern best practices:\n\n```typescript\nconst process = async (items: Item[]) => {\n  const results = await Promise.all(\n    items.map(async (item) => {\n      const processed = await transform(item);\n      return { ...item, processed };\n    })\n  );\n  return results.filter(Boolean);\n};\n```\n\nThis approach uses `Promise.all` for concurrent processing and filters out any null results. Let me know if you need me to explain any part!",
    "Great question about code! The pattern you're looking for is a combination of a factory function with a strategy pattern. Here's how I'd structure it:\n\n```typescript\ninterface Strategy {\n  execute(data: unknown): Promise<Result>;\n}\n\nclass Processor {\n  constructor(private strategy: Strategy) {}\n  async run(data: unknown) {\n    return this.strategy.execute(data);\n  }\n}\n```\n\nThis gives you flexibility to swap strategies at runtime.",
  ],
  creative: [
    "What a wonderful creative prompt! Here's what comes to mind: imagine a world where the boundaries between digital and physical spaces dissolve completely. Colors become sounds, textures become memories, and every surface tells a story. The narrative could follow a protagonist who discovers this blending of realities...",
    "I love this direction! Let me craft something for you. The piece begins with a stark contrast — silence against the expectation of noise. Then, slowly, layers build: first a whisper, then a rhythm, then a full symphony of ideas. The twist? It was never sound at all, but the visual rhythm of light through leaves...",
  ],
};

export function generateResponse(prompt: string, modelId: string): string {
  const lower = prompt.toLowerCase();
  let category = 'default';
  if (lower.includes('code') || lower.includes('function') || lower.includes('program') || lower.includes('script') || lower.includes('bug')) {
    category = 'code';
  } else if (lower.includes('write') || lower.includes('story') || lower.includes('creative') || lower.includes('poem') || lower.includes('imagine')) {
    category = 'creative';
  }
  const pool = responses[category] ?? responses.default;
  // Use modelId as a seed to vary which response is picked per model
  const seed = modelId.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const idx = (seed + Math.floor(Math.random() * pool.length)) % pool.length;
  return pool[idx];
}
