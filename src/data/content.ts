export interface AIModel {
  id: string;
  name: string;
  provider: string;
  logo: string;
  color: string;
  bgColor: string;
  description: string;
  contextWindow: string;
  tags: string[];
}

export const aiModels: AIModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    logo: 'sparkles',
    color: '#10a37f',
    bgColor: '#10a37f15',
    description: 'OpenAI\'s most advanced multimodal model with real-time vision and audio.',
    contextWindow: '128K context',
    tags: ['Multimodal', 'Fast', 'Reasoning'],
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    logo: 'brain',
    color: '#d97757',
    bgColor: '#d9775715',
    description: 'Best-in-class reasoning, coding, and long-context comprehension.',
    contextWindow: '200K context',
    tags: ['Reasoning', 'Coding', 'Long-context'],
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    logo: 'gem',
    color: '#4285f4',
    bgColor: '#4285f415',
    description: 'Google DeepMind\'s model with massive 2M token context window.',
    contextWindow: '2M context',
    tags: ['Vision', 'Long-context', 'Multimodal'],
  },
  {
    id: 'llama-3-1-70b',
    name: 'Llama 3.1 70B',
    provider: 'Meta',
    logo: 'flame',
    color: '#0866ff',
    bgColor: '#0866ff15',
    description: 'Open-source powerhouse with strong general-purpose capabilities.',
    contextWindow: '128K context',
    tags: ['Open-source', 'Fast', 'General'],
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral',
    logo: 'wind',
    color: '#ff7000',
    bgColor: '#ff700015',
    description: 'European frontier model optimized for efficiency and multilingual tasks.',
    contextWindow: '128K context',
    tags: ['Efficient', 'Multilingual', 'Fast'],
  },
  {
    id: 'perplexity',
    name: 'Perplexity Pro',
    provider: 'Perplexity',
    logo: 'search',
    color: '#20b8cd',
    bgColor: '#20b8cd15',
    description: 'Search-grounded AI with real-time web access and citations.',
    contextWindow: '128K context',
    tags: ['Search', 'Citations', 'Real-time'],
  },
];

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: 'layers',
    title: 'Multi-Model Chat',
    description: 'Switch between 6+ AI models in a single conversation. Compare responses side-by-side without losing context.',
  },
  {
    icon: 'git-compare',
    title: 'Side-by-Side Compare',
    description: 'Ask the same question to multiple models and see answers displayed simultaneously for instant comparison.',
  },
  {
    icon: 'chrome',
    title: 'Browser Sidebar',
    description: 'Chat with AI while browsing any webpage. The sidebar stays with you across the entire web.',
  },
  {
    icon: 'message-square',
    title: 'Conversation History',
    description: 'Every conversation is saved automatically. Search, resume, or organize chats into folders.',
  },
  {
    icon: 'sparkles',
    title: 'Prompt Library',
    description: 'Curated prompt templates for writing, coding, research, and more. One-click to insert and go.',
  },
  {
    icon: 'shield',
    title: 'Privacy First',
    description: 'Your conversations are encrypted and never used for training. You\'re in full control of your data.',
  },
];

export interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Get started with essential AI models.',
    features: [
      'Access to 2 AI models',
      '30 messages per day',
      'Conversation history (7 days)',
      'Basic prompt library',
      'Browser extension',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 12,
    period: 'month',
    description: 'Unlock all models and advanced features.',
    features: [
      'All 6+ AI models',
      'Unlimited messages',
      'Unlimited conversation history',
      'Side-by-side comparison',
      'Full prompt library',
      'Priority response speed',
      'Export conversations',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    name: 'Team',
    price: 29,
    period: 'user/month',
    description: 'Built for teams that build together.',
    features: [
      'Everything in Pro',
      'Shared prompt library',
      'Team conversation folders',
      'Admin dashboard',
      'SSO & SAML',
      'Usage analytics',
      'Priority support',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'What is EchoGPT?',
    answer: 'EchoGPT is a multi-AI chat platform that lets you interact with multiple AI models—like GPT-4o, Claude 3.5, and Gemini—in a single, unified interface. You can compare responses, switch models mid-conversation, and access AI from any browser tab via our Chrome extension.',
  },
  {
    question: 'Which AI models are supported?',
    answer: 'EchoGPT supports GPT-4o and GPT-4o mini from OpenAI, Claude 3.5 Sonnet from Anthropic, Gemini 1.5 Pro from Google, Llama 3.1 from Meta, Mistral Large, and Perplexity Pro. We\'re continuously adding new models as they become available.',
  },
  {
    question: 'How does the Chrome extension work?',
    answer: 'The EchoGPT Chrome extension adds a sidebar to any webpage. Click the extension icon or use the keyboard shortcut to open the panel, then chat with AI while you browse. You can highlight text on any page and ask AI about it instantly.',
  },
  {
    question: 'Is my data private and secure?',
    answer: 'Yes. All conversations are encrypted in transit and at rest. We never use your data to train AI models, and you can delete your conversation history at any time. Pro and Team plans include additional enterprise-grade security features.',
  },
  {
    question: 'Can I compare responses from different models?',
    answer: 'Absolutely. Side-by-side comparison is one of EchoGPT\'s core features. Ask a question once, select multiple models, and view their responses simultaneously. This is available on Pro and Team plans.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel at any time from your account settings. Your subscription remains active until the end of your billing cycle, and you keep access to all paid features until then.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 14-day money-back guarantee on all Pro plans. If you\'re not satisfied, contact our support team for a full refund—no questions asked.',
  },
  {
    question: 'Is there a free tier?',
    answer: 'Yes! Our Free plan gives you access to 2 AI models with 30 messages per day, plus the browser extension. It\'s free forever—no credit card required.',
  },
];

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Product Designer',
    avatar: 'SC',
    content: 'EchoGPT completely changed how I work. Being able to compare Claude and GPT-4o responses side-by-side helps me pick the best output every single time. The browser extension is a game-changer for research.',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Senior Developer',
    avatar: 'MR',
    content: 'The sidebar extension means I never have to leave my workflow. I highlight code, ask for a review, and get instant feedback from the model of my choice. It\'s become indispensable.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Content Strategist',
    avatar: 'PS',
    content: 'I manage a team of writers and EchoGPT\'s prompt library has standardized our AI usage. The Team plan\'s shared folders keep everyone on the same page. Worth every penny.',
    rating: 5,
  },
  {
    name: 'James O\'Brien',
    role: 'Research Analyst',
    avatar: 'JO',
    content: 'Having Gemini\'s 2M context window alongside GPT-4o for cross-checking is incredible. I can upload entire research papers and get summaries from multiple models in seconds.',
    rating: 5,
  },
  {
    name: 'Yuki Tanaka',
    role: 'Startup Founder',
    avatar: 'YT',
    content: 'We replaced three separate AI subscriptions with EchoGPT. The unified interface saves time, and the comparison feature means we always get the best answer. Brilliant product.',
    rating: 5,
  },
  {
    name: 'Elena Volkova',
    role: 'Marketing Lead',
    avatar: 'EV',
    content: 'The prompt library alone is worth it. We\'ve built a collection of marketing prompts that our whole team uses. The UI is clean, fast, and the dark mode is gorgeous.',
    rating: 5,
  },
];
