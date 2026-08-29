"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, AlertCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  isError?: boolean;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Halo! Saya asisten AI Nurul. Tanyakan apa saja tentang profil, keahlian, atau proyek-proyek yang telah saya kerjakan!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessageText = inputValue.trim();
    setInputValue("");
    setIsLoading(true);

    // Create user message object
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content: userMessageText,
    };

    // Add user message to history
    setMessages((prev) => [...prev, userMessage]);

    // Build payload for backend
    const apiEndpoint =
      process.env.NEXT_PUBLIC_CHATBOT_API_URL || "http://localhost:8000/api/chat";

    // Convert message history to format expected by backend
    const chatHistory = messages
      .filter((msg) => !msg.isError)
      .map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessageText,
          history: chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung dengan server chatbot.");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: "assistant",
        content: data.reply,
        sources: data.sources || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: "assistant",
        content: "Maaf, terjadi kendala koneksi ke server AI. Pastikan server backend Anda sudah menyala.",
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[calc(100vh-8rem)] rounded-2xl glass-card border border-slate-200/60 shadow-2xl flex flex-col overflow-hidden mb-4 relative"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-white/70 border-b border-slate-200/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-indigo to-sky-400 flex items-center justify-center text-slate-900 shadow-sm relative">
                  <Bot className="w-5.5 h-5.5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    Nurul's AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-brand-indigo animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono">Selalu Online (RAG)</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages List Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-brand-indigo text-slate-950 rounded-tr-none font-medium"
                        : msg.isError
                        ? "bg-rose-50 border border-rose-100 text-rose-800 rounded-tl-none flex gap-2 items-start"
                        : "bg-white/95 border border-slate-200/50 text-slate-700 rounded-tl-none"
                    }`}
                  >
                    {msg.isError && <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
                    <div>
                      <p className="whitespace-pre-line">{msg.content}</p>

                      {/* Display retrieved RAG sources if any */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5 items-center">
                          <span className="text-[9px] text-slate-400 font-mono">Sumber:</span>
                          {msg.sources.map((src, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded bg-slate-100 text-[8px] text-slate-500 border border-slate-200/60 font-mono"
                            >
                              {src}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Loader */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/95 border border-slate-200/50 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-indigo/80 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-brand-indigo/80 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-brand-indigo/80 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar Form */}
            <form
              onSubmit={handleSend}
              className="px-4 py-3 bg-white/70 border-t border-slate-200/50 flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tanyakan sesuatu tentang Nurul..."
                className="flex-1 bg-white border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-indigo/60 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 rounded-xl bg-brand-indigo text-slate-950 hover:bg-brand-indigo/90 disabled:opacity-50 disabled:hover:bg-brand-indigo transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-brand-indigo text-slate-900 shadow-xl shadow-brand-indigo/35 flex items-center justify-center hover:bg-brand-indigo/90 cursor-pointer relative"
        aria-label="Toggle chat widget"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              {/* Highlight dot to encourage engagement */}
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 border-2 border-brand-indigo animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-500 border-2 border-brand-indigo" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
