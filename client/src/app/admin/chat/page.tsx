'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Circle, Search, Send, User, X } from 'lucide-react';
import { useAuth } from '@/components/providers/auth-provider';
import { useSocket } from '@/components/providers/socket-provider';
import { chatApi } from '@/modules/loyalty-engage/api';
import type { ChatMessage, ChatSession } from '@/types/loyalty-engage';

function appendMessage(messages: ChatMessage[], message: ChatMessage) {
  if (messages.some((existing) => existing.id === message.id)) return messages;
  return [...messages, message].sort(
    (left, right) => new Date(left.sendDate).getTime() - new Date(right.sendDate).getTime()
  );
}

function formatTime(value?: string) {
  if (!value) return '';
  return new Date(value).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
  });
}

export default function AdminChatPage() {
  const { user } = useAuth();
  const { socket, isConnected } = useSocket();
  const [conversations, setConversations] = useState<ChatSession[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedChatId) ?? null;
  const filteredConversations = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return conversations;
    return conversations.filter((conversation) =>
      conversation.user?.fullName.toLocaleLowerCase().includes(query)
    );
  }, [conversations, search]);

  const loadConversations = useCallback(async () => {
    setLoadingConversations(true);
    try {
      const response = await chatApi.getConversations();
      setConversations(response.data);
      setSelectedChatId((current) => {
        if (current && response.data.some((conversation) => conversation.id === current)) return current;
        return response.data[0]?.id ?? null;
      });
      setError(null);
    } catch (cause) {
      console.error('Không thể tải danh sách hội thoại:', cause);
      setError('Không thể tải danh sách hội thoại.');
    } finally {
      setLoadingConversations(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadConversations);
  }, [loadConversations]);

  useEffect(() => {
    if (!socket) return;

    const joinShop = () => socket.emit('join_shop');
    const handleNewMessage = (message: ChatMessage) => {
      const conversation = conversations.find((item) => item.id === message.chatId);
      if (!conversation) {
        void loadConversations();
        return;
      }
      setConversations((current) => [
        { ...conversation, messages: [message] },
        ...current.filter((item) => item.id !== message.chatId),
      ]);

      if (message.chatId === selectedChatId) {
        setMessages((current) => appendMessage(current, message));
        if (message.senderId !== user?.id) {
          void chatApi.markAsRead(message.chatId).catch((cause: unknown) => {
            console.error('Không thể đánh dấu tin nhắn đã đọc:', cause);
          });
        }
      }
    };

    socket.on('connect', joinShop);
    socket.on('new_message', handleNewMessage);
    if (socket.connected) joinShop();

    return () => {
      socket.off('connect', joinShop);
      socket.off('new_message', handleNewMessage);
    };
  }, [socket, selectedChatId, user?.id, loadConversations, conversations]);

  useEffect(() => {
    if (selectedChatId === null) {
      return;
    }

    let cancelled = false;
    void Promise.resolve()
      .then(() => {
        if (!cancelled) setLoadingMessages(true);
        return chatApi.getHistory(selectedChatId);
      })
      .then(async (response) => {
        if (!cancelled) {
          setMessages(response.data);
          await chatApi.markAsRead(selectedChatId);
        }
      })
      .catch((cause: unknown) => {
        console.error('Không thể tải lịch sử hội thoại:', cause);
        if (!cancelled) setError('Không thể tải tin nhắn cuộc trò chuyện này.');
      })
      .finally(() => {
        if (!cancelled) setLoadingMessages(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedChatId]);

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || selectedChatId === null || sending || selectedConversation?.status === 'CLOSED') return;

    setSending(true);
    try {
      const response = await chatApi.sendMessage(selectedChatId, content);
      setMessages((current) => appendMessage(current, response.data));
      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === selectedChatId
            ? { ...conversation, messages: [response.data] }
            : conversation
        )
      );
      setInput('');
      setError(null);
    } catch (cause) {
      console.error('Không thể gửi phản hồi:', cause);
      setError('Gửi tin nhắn thất bại. Vui lòng thử lại.');
    } finally {
      setSending(false);
    }
  };

  const handleClose = async () => {
    if (selectedChatId === null) return;
    try {
      await chatApi.closeConversation(selectedChatId);
      await loadConversations();
      setMessages([]);
    } catch (cause) {
      console.error('Không thể đóng cuộc trò chuyện:', cause);
      setError('Không thể đóng cuộc trò chuyện.');
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="mb-4 shrink-0">
        <span className="eyebrow mb-1 block">CSKH</span>
        <h1 className="font-display text-3xl tracking-tight text-[#1D1F20] sm:text-4xl">
          Hỗ trợ Trực tuyến
        </h1>
      </div>

      {error && (
        <p role="alert" className="mb-3 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-[#EAE6DF] bg-white shadow-xs">
        <aside className="flex w-72 shrink-0 flex-col border-r border-[#EAE6DF] bg-neutral-50/30 sm:w-80">
          <div className="border-b border-[#EAE6DF] p-4">
            <label className="relative block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                name="conversationSearch"
                aria-label="Tìm kiếm hội thoại"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tìm kiếm hội thoại..."
                className="h-10 w-full rounded-xl border border-[#EAE6DF] bg-white pl-9 pr-3 text-sm outline-none focus:border-neutral-900"
              />
            </label>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loadingConversations ? (
              <p className="p-5 text-center text-sm text-neutral-500">Đang tải hội thoại...</p>
            ) : filteredConversations.length === 0 ? (
              <p className="p-5 text-center text-sm text-neutral-500">Chưa có hội thoại nào.</p>
            ) : (
              filteredConversations.map((conversation) => {
                const lastMessage = conversation.messages?.[0];
                const unread =
                  !!lastMessage && !lastMessage.isRead && lastMessage.senderId !== user?.id;
                return (
                  <button
                    type="button"
                    key={conversation.id}
                    onClick={() => setSelectedChatId(conversation.id)}
                    className={`flex w-full items-start gap-3 border-b border-[#EAE6DF]/60 border-l-4 p-4 text-left transition hover:bg-white ${selectedChatId === conversation.id
                        ? 'border-l-[#1D1F20] bg-white'
                        : 'border-l-transparent'
                      }`}
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-600">
                      <User size={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="mb-1 flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold text-neutral-900">
                          {conversation.user?.fullName || `Khách hàng #${conversation.userId}`}
                        </span>
                        <span className="shrink-0 text-[10px] text-neutral-400">
                          {formatTime(lastMessage?.sendDate || conversation.updatedAt)}
                        </span>
                      </span>
                      <span className="block truncate text-xs text-neutral-500">
                        {lastMessage?.content || 'Chưa có tin nhắn'}
                      </span>
                    </span>
                    {unread && <span className="mt-1 size-2 shrink-0 rounded-full bg-rose-500" />}
                  </button>
                );
              })
            )}
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col bg-[#FBF9F4]/50">
          {selectedConversation ? (
            <>
              <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-[#EAE6DF] bg-white px-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-600">
                    <User size={20} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-neutral-900">
                      {selectedConversation.user?.fullName || `Khách hàng #${selectedConversation.userId}`}
                    </h2>
                    <p className="flex items-center gap-1 text-xs text-neutral-500">
                      <Circle className={`size-2 fill-current ${isConnected ? 'text-emerald-500' : 'text-neutral-400'}`} />
                      {selectedConversation.status === 'CLOSED'
                        ? 'Đã kết thúc'
                        : isConnected
                          ? 'Đang hoạt động'
                          : 'Đang kết nối lại'}
                    </p>
                  </div>
                </div>
                {selectedConversation.status !== 'CLOSED' && (
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Đóng cuộc trò chuyện"
                    title="Đóng cuộc trò chuyện"
                    className="rounded-lg p-2 text-neutral-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </header>

              <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
                {loadingMessages ? (
                  <p className="pt-10 text-center text-sm text-neutral-500">Đang tải tin nhắn...</p>
                ) : messages.length === 0 ? (
                  <p className="pt-10 text-center text-sm text-neutral-500">Chưa có tin nhắn.</p>
                ) : (
                  messages.map((message) => {
                    const isMe = message.senderId === user?.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-xs ${isMe
                              ? 'rounded-br-sm bg-[#1D1F20] text-white'
                              : 'rounded-bl-sm border border-[#EAE6DF] bg-white text-neutral-800'
                            }`}
                        >
                          <p className="whitespace-pre-wrap break-words">{message.content}</p>
                          <time className={`mt-1 block text-[10px] ${isMe ? 'text-white/60' : 'text-neutral-400'}`}>
                            {formatTime(message.sendDate)}
                          </time>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <form onSubmit={handleSend} className="flex shrink-0 items-center gap-2 border-t border-[#EAE6DF] bg-white p-4">
                <input
                  type="text"
                  name="message"
                  aria-label="Nội dung phản hồi"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder={
                    selectedConversation.status === 'CLOSED'
                      ? 'Cuộc trò chuyện đã kết thúc'
                      : 'Nhập phản hồi của bạn...'
                  }
                  maxLength={5000}
                  disabled={sending || selectedConversation.status === 'CLOSED'}
                  className="h-11 min-w-0 flex-1 rounded-xl border border-[#EAE6DF] bg-[#FBF9F4] px-4 text-sm outline-none transition focus:border-neutral-900 disabled:opacity-60"
                />
                <button
                  type="submit"
                  aria-label="Gửi phản hồi"
                  disabled={!input.trim() || sending || selectedConversation.status === 'CLOSED'}
                  className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[#1D1F20] px-4 font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Gửi <Send size={16} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-neutral-500">
              Chọn một cuộc trò chuyện để xem tin nhắn.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
