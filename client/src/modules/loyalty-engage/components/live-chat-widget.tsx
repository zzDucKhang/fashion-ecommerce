'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Image as ImageIcon, Loader2, MessageCircle, Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/components/providers/auth-provider';
import { apiClient } from '@/api/client';
import { chatApi } from '@/modules/loyalty-engage/api';
import { useChatSocket } from '@/modules/loyalty-engage/hooks/useChatSocket';
import { useSocket } from '@/components/providers/socket-provider';
import type { ChatMessage } from '@/types/loyalty-engage';

function appendMessage(messages: ChatMessage[], message: ChatMessage) {
  if (messages.some((existing) => existing.id === message.id)) return messages;
  return [...messages, message].sort(
    (left, right) => new Date(left.sendDate).getTime() - new Date(right.sendDate).getTime()
  );
}

function isImageUrl(text: string) {
  if (!text) return false;
  const trimmed = text.trim();
  return (
    /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg)(?:\?.*)?)$/i.test(trimmed) ||
    (trimmed.startsWith('http') && (trimmed.includes('/uploads/') || trimmed.includes('images.unsplash.com')))
  );
}

export function LiveChatWidget() {
  const { user, isAuthenticated } = useAuth();
  const { isConnected } = useSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [chatId, setChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const loadPromiseRef = useRef<Promise<{ chatId: number; messages: ChatMessage[] }> | null>(null);

  useEffect(() => {
    if (!isOpen || !isAuthenticated || chatId !== null) return;

    let cancelled = false;
    if (!loadPromiseRef.current) {
      setLoading(true);
      setError(null);
      loadPromiseRef.current = (async () => {
        const activeResponse = await chatApi.getActiveChat();
        const activeChat = activeResponse.data;
        const historyResponse = await chatApi.getHistory(activeChat.id);
        return { chatId: activeChat.id, messages: historyResponse.data };
      })();
    }

    const loadPromise = loadPromiseRef.current;
    void loadPromise
      .then(({ chatId: loadedChatId, messages: loadedMessages }) => {
        if (cancelled) return;
        setChatId(loadedChatId);
        setMessages(loadedMessages);
        void chatApi.markAsRead(loadedChatId).catch((cause: unknown) => {
          console.error('Không thể đánh dấu tin nhắn đã đọc:', cause);
        });
      })
      .catch((cause: unknown) => {
        console.error('Không thể tải cuộc trò chuyện:', cause);
        if (!cancelled) setError('Không thể tải cuộc trò chuyện. Vui lòng thử lại.');
      })
      .finally(() => {
        if (loadPromiseRef.current === loadPromise) loadPromiseRef.current = null;
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, isAuthenticated, chatId]);

  const handleNewMessage = useCallback((message: ChatMessage) => {
    setMessages((current) => appendMessage(current, message));
    if (isOpen && message.senderId !== user?.id) {
      void chatApi.markAsRead(message.chatId).catch((cause: unknown) => {
        console.error('Không thể đánh dấu tin nhắn đã đọc:', cause);
      });
    }
  }, [isOpen, user?.id]);

  useChatSocket(chatId, handleNewMessage);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || chatId === null || sending) return;

    setSending(true);
    setError(null);
    try {
      const response = await chatApi.sendMessage(chatId, content);
      setMessages((current) => appendMessage(current, response.data));
      setInput('');
    } catch (cause) {
      console.error('Không thể gửi tin nhắn:', cause);
      setError('Gửi tin nhắn thất bại. Vui lòng thử lại.');
    } finally {
      setSending(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || chatId === null) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Kích thước ảnh tối đa là 10MB');
      return;
    }

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        const res = await apiClient.post<any>('/common/upload', {
          fileName: file.name,
          fileType: file.type,
          base64,
        });
        const uploaded = res.data?.data;
        if (uploaded?.url) {
          const response = await chatApi.sendMessage(chatId, uploaded.url);
          setMessages((current) => appendMessage(current, response.data));
          toast.success('Đã gửi ảnh thành công');
        }
      } catch (err: any) {
        toast.error('Không thể gửi ảnh: ' + (err?.response?.data?.message || err?.message));
      } finally {
        setUploadingImage(false);
      }
    };
    reader.onerror = () => {
      setUploadingImage(false);
      toast.error('Lỗi đọc ảnh');
    };
    reader.readAsDataURL(file);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Mở khung chat hỗ trợ"
          className="group relative flex size-14 items-center justify-center rounded-full bg-[#1D1F20] text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-neutral-800"
        >
          <MessageCircle size={24} />
          {isConnected && (
            <span className="absolute right-0 top-0 size-3.5 rounded-full border-2 border-white bg-emerald-500" />
          )}
        </button>
      ) : (
        <section
          aria-label="Hộp thoại chat trực tuyến"
          className="flex h-[min(540px,calc(100dvh-2rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[#EAE6DF] bg-white shadow-2xl"
        >
          <header className="flex items-center justify-between bg-[#1D1F20] px-4 py-3 text-white">
            <div>
              <h2 className="text-sm font-semibold">Trò chuyện với cửa hàng</h2>
              <p className="mt-0.5 text-[11px] text-white/70">
                {isConnected ? 'Đang kết nối' : 'Đang kết nối lại...'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng chat"
              className="rounded-lg p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#FBF9F4] p-4">
            {loading ? (
              <p className="pt-12 text-center text-xs text-neutral-500">Đang tải tin nhắn...</p>
            ) : messages.length === 0 ? (
              <p className="pt-12 text-center text-xs text-neutral-500">
                Xin chào {user?.fullName}. Hãy gửi câu hỏi hoặc ảnh cho shop nhé!
              </p>
            ) : (
              messages.map((message) => {
                const isMe = message.senderId === user?.id;
                const isImage = isImageUrl(message.content);
                return (
                  <div
                    key={message.id}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-2.5 text-sm leading-relaxed ${
                        isMe
                          ? 'rounded-br-sm bg-[#1D1F20] text-white'
                          : 'rounded-bl-sm border border-[#EAE6DF] bg-white text-neutral-800'
                      }`}
                    >
                      {isImage ? (
                        <div className="space-y-1">
                          <img
                            src={message.content.trim()}
                            alt="Ảnh trong chat"
                            className="max-h-48 w-auto rounded-xl object-contain cursor-pointer hover:opacity-95"
                            onClick={() => window.open(message.content.trim(), '_blank')}
                          />
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      )}
                      <time className={`mt-1 block text-[10px] ${isMe ? 'text-white/60' : 'text-neutral-400'}`}>
                        {new Date(message.sendDate).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </time>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {error && <p role="alert" className="px-3 pt-2 text-xs text-red-600">{error}</p>}

          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-[#EAE6DF] p-3">
            <label
              className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#EAE6DF] bg-[#FBF9F4] text-neutral-600 transition hover:bg-neutral-200 disabled:opacity-40"
              title="Gửi ảnh"
            >
              {uploadingImage ? (
                <Loader2 size={18} className="animate-spin text-neutral-700" />
              ) : (
                <ImageIcon size={18} />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={loading || sending || uploadingImage || chatId === null}
                className="hidden"
              />
            </label>

            <input
              type="text"
              name="message"
              aria-label="Nội dung tin nhắn"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Nhập tin nhắn..."
              maxLength={5000}
              disabled={loading || sending || uploadingImage || chatId === null}
              className="h-10 min-w-0 flex-1 rounded-xl border border-[#EAE6DF] bg-[#FBF9F4] px-3 text-sm outline-none transition focus:border-neutral-900 disabled:opacity-60"
            />

            <button
              type="submit"
              aria-label="Gửi tin nhắn"
              disabled={!input.trim() || loading || sending || uploadingImage || chatId === null}
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#1D1F20] text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
