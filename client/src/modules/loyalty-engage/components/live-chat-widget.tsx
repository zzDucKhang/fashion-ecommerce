"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  Minimize2,
} from "lucide-react";
import { useChatSocket } from "../hooks/useChatSocket";

export interface LiveChatWidgetProps {
  userId?: number;
  userName?: string;
  serverUrl?: string;
}

export function LiveChatWidget({
  userId,
  userName = "Khách hàng",
  serverUrl,
}: LiveChatWidgetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { isConnected, messages, sendMessage } = useChatSocket({
    userId,
    serverUrl,
    autoConnect: true,
  });

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(inputText.trim());
    setInputText("");
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {isOpen && (
        <div className="mb-4 w-96 max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-7rem)] bg-[#FFFFFF] border border-[#EAE6DF] rounded-2xl shadow-[0_5px_20px_rgba(29,31,32,.08)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          <header className="p-4 bg-[#FFFFFF] border-b border-[#EAE6DF] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#1D1F20] !text-white [&_*]:!text-white flex items-center justify-center font-bold text-sm">
                  CS
                </div>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                    isConnected ? "bg-[#84EA53]" : "bg-[#dc2626]"
                  }`}
                  title={isConnected ? "Đã kết nối" : "Mất kết nối"}
                />
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#1D1F20] flex items-center gap-1.5">
                  Chăm sóc khách hàng
                  <ShieldCheck size={14} className="text-[#84EA53]" />
                </h4>
                <p className="text-xs text-[#74736e]">
                  {isConnected ? (
                    <span className="flex items-center gap-1 text-[#16a34a] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84EA53] animate-pulse" />
                      Trực tuyến (Phản hồi tức thì)
                    </span>
                  ) : (
                    "Đang kết nối lại..."
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-[#74736e] hover:bg-[#FBF9F4] hover:text-[#1D1F20] transition cursor-pointer"
                aria-label="Thu nhỏ chat"
              >
                <Minimize2 size={16} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-[#74736e] hover:bg-[#FBF9F4] hover:text-[#1D1F20] transition cursor-pointer"
                aria-label="Đóng chat"
              >
                <X size={18} />
              </button>
            </div>
          </header>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FBF9F4]/40">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#1D1F20] !text-white [&_*]:!text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                CS
              </div>
              <div className="bg-[#FFFFFF] border border-[#EAE6DF] text-[#1D1F20] text-xs leading-relaxed p-3.5 rounded-2xl rounded-tl-sm shadow-xs max-w-[85%] space-y-1">
                <p className="font-semibold text-xs text-[#1D1F20]">
                  Xin chào {userName}! 👋
                </p>
                <p className="text-[#74736e]">
                  Cảm ơn bạn đã ghé thăm. Chúng tôi có thể hỗ trợ gì cho bạn hôm nay?
                </p>
              </div>
            </div>

            {messages.length === 0 && (
              <div className="space-y-1.5 pt-2 pl-9">
                <p className="text-[11px] font-bold text-[#74736e] uppercase tracking-wider">
                  Câu hỏi phổ biến
                </p>
                <div className="flex flex-col gap-1.5">
                  {[
                    "Tư vấn bảng size chuẩn?",
                    "Kiểm tra tình trạng đơn hàng?",
                    "Mã giảm giá hôm nay có gì?",
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleQuickQuestion(preset)}
                      className="text-left text-xs bg-[#FFFFFF] border border-[#EAE6DF] hover:border-[#84EA53] text-[#1D1F20] px-3 py-2 rounded-xl transition cursor-pointer flex items-center justify-between group shadow-2xs"
                    >
                      <span>{preset}</span>
                      <Sparkles size={12} className="text-[#84EA53] opacity-0 group-hover:opacity-100 transition" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={msg.id || index}
                className={`flex items-start gap-2 ${
                  msg.isSelf ? "justify-end" : "justify-start"
                }`}
              >
                {!msg.isSelf && (
                  <div className="w-7 h-7 rounded-full bg-[#1D1F20] !text-white [&_*]:!text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                    CS
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 text-xs leading-relaxed rounded-2xl shadow-2xs ${
                    msg.isSelf
                      ? "bg-[#1D1F20] !text-white [&_*]:!text-white rounded-tr-sm"
                      : "bg-[#FFFFFF] border border-[#EAE6DF] text-[#1D1F20] rounded-tl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  {msg.createdAt && (
                    <span
                      className={`text-[9px] mt-1 block ${
                        msg.isSelf ? "text-[#EAE6DF]/70 text-right" : "text-[#74736e]"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <footer className="p-3 bg-[#FFFFFF] border-t border-[#EAE6DF]">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 bg-[#FBF9F4] border border-[#EAE6DF] rounded-xl px-3.5 py-2.5 text-xs text-[#1D1F20] placeholder-[#74736e]/60 focus:border-[#84EA53] outline-none transition"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-[#84EA53] text-[#1D1F20] hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shrink-0"
                aria-label="Gửi tin nhắn"
              >
                <Send size={15} />
              </button>
            </form>
          </footer>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#84EA53] text-[#1D1F20] shadow-[0_5px_20px_rgba(29,31,32,.08)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label={isOpen ? "Đóng hộp thoại chat" : "Mở hộp thoại chat"}
      >
        {isOpen ? (
          <X size={24} className="transition-transform group-hover:rotate-90 duration-200" />
        ) : (
          <>
            <MessageCircle size={24} />
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D1F20] opacity-40" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#1D1F20] border-2 border-white" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
