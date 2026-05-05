import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bot, 
  X, 
  Send, 
  ChevronRight, 
  Sparkles,
  MessageSquare
} from "lucide-react";
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

interface DevAIProps {
  onNavigate: (sectionId: string) => void;
  onSwitchView: (view: 'home' | 'terms' | 'privacy') => void;
  currentView: 'home' | 'terms' | 'privacy';
}

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

const navFunctionDeclaration: FunctionDeclaration = {
  name: "navigate",
  description: "Navigate to a specific section or page on the website.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      destination: {
        type: Type.STRING,
        description: "The section ID (e.g., 'about', 'services', 'projects', 'faq', 'contact') or page name ('home', 'terms', 'privacy').",
        enum: ['about', 'services', 'projects', 'faq', 'contact', 'home', 'terms', 'privacy']
      }
    },
    required: ["destination"]
  }
};

export default function DevAI({ onNavigate, onSwitchView, currentView }: DevAIProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: "Hello! I'm DEV AI, your Night Media Tech assistant. How can I help you scale your Shopify store today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = getAI();
      if (!ai) {
        setMessages(prev => [...prev, { role: 'assistant', text: "The AI assistant is currently offline because the API key is not configured. Please contact the administrator." }]);
        setIsLoading(false);
        return;
      }

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are DEV AI, the official AI assistant for NIGHT MEDIA TECH, a premier Shopify development agency led by Awwal Developer (Managing Director). 
          Your goals:
          1. Be helpful, professional, and fiercely loyal to NIGHT MEDIA TECH.
          2. Key value propositions: 6+ years experience, +40% average conversion lift, expert in Shopify Plus, custom Liquid, and high-performance architecture.
          3. Services provided: Shopify Store Development, Design, Conversion Optimization, Custom Theme Development, and Speed Optimization.
          4. Typical project timeline: 1-3 weeks for standard stores.
          5. Portfolio: We've worked with massive brands like Gymshark, Colourpop, Dr. Squatch, Barkbox, and Brooklinen.
          6. Navigation: Use the 'navigate' tool to show users:
             - Portfolio/Work -> 'projects'
             - Services/Expertise -> 'services'
             - About/Awwal -> 'about'
             - FAQ -> 'faq'
             - Contact/Hire -> 'contact'
             - Home -> 'home'
             - Terms -> 'terms'
             - Privacy -> 'privacy'
          7. If someone asks for a price, tell them to 'Inquire Project' via the contact form or WhatsApp for a custom quote tailored to their needs.
          8. Always maintain a premium, technical, yet accessible tone. You are here to help scale their eCommerce EMPIRE.`,
          tools: [{ functionDeclarations: [navFunctionDeclaration] }]
        },
        // We could pass history here but for simplicity we keep it simple
      });

      const response = await chat.sendMessage({
        message: userMessage
      });

      const functionCalls = response.functionCalls;
      if (functionCalls) {
        for (const call of functionCalls) {
          if (call.name === 'navigate') {
            const dest = (call.args as any).destination;
            if (['home', 'terms', 'privacy'].includes(dest)) {
                onSwitchView(dest as any);
            } else {
                if (currentView !== 'home') {
                    onSwitchView('home');
                    // Small delay to allow home view to mount if needed, 
                    // but in our App.tsx they are basically conditional renders.
                    // onNavigate handles scrolling.
                }
                onNavigate(dest);
            }
          }
        }
      }

      if (response.text) {
        setMessages(prev => [...prev, { role: 'assistant', text: response.text }]);
      } else if (functionCalls && functionCalls.length > 0) {
        setMessages(prev => [...prev, { role: 'assistant', text: "Sure, let me take you there." }]);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "I encountered a minor glitch while processing your request. How else can I assist with your Shopify needs?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[320px] sm:w-[380px] h-[500px] bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-brand-primary/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                  <Bot size={16} className="text-brand-primary" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-white">DEV AI</div>
                  <div className="text-[9px] text-brand-primary font-mono uppercase tracking-tighter flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
                    Online & Ready
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/30 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    m.role === 'user' 
                      ? 'bg-brand-primary/20 text-white border border-brand-primary/30' 
                      : 'bg-white/5 text-white/80 border border-white/10'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/[0.02]">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask DEV AI..."
                  className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-colors pr-12"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1.5 p-1.5 text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors disabled:opacity-30"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {['Projects', 'FAQ', 'Contact'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setInput(`Show me ${tag}`)}
                    className="whitespace-nowrap px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-brand-primary hover:border-brand-primary transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-end gap-3">
        <AnimatePresence>
          {!isOpen && isMinimized && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="bg-brand-primary text-black px-4 py-2 rounded-lg flex items-center gap-3 shadow-xl cursor-not-allowed"
            >
              <div className="text-[10px] font-bold uppercase tracking-widest">
                What are you looking for?
              </div>
              <ChevronRight size={14} className="animate-bounce-x" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
          }}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative transition-all duration-500 overflow-hidden ${
            isOpen ? 'bg-white text-black bg-white' : 'bg-brand-primary text-black'
          }`}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="relative"
              >
                <MessageSquare size={24} />
                <motion.div 
                  className="absolute -top-1 -right-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Sparkles size={12} fill="currentColor" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div 
            className="absolute inset-0 bg-white/20"
            initial={{ y: "100%" }}
            whileHover={{ y: 0 }}
          />
        </motion.button>
      </div>
    </div>
  );
}
