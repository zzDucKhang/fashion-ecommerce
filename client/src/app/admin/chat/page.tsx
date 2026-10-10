'use client';

import * as React from 'react';
import { MessageSquare, Search, Send, User, Circle } from 'lucide-react';
import { SearchInput } from '@/components/ui/search-input';

// Mock data cho danh sách người dùng đang nhắn tin
const mockSessions = [
  { id: 1, name: 'Nguyễn Khang', lastMsg: 'Sản phẩm này còn màu đen không shop?', time: '10:45', unread: 2, online: true },
  { id: 2, name: 'Lê Quỳnh', lastMsg: 'Mình muốn hỏi về chính sách đổi trả', time: '09:12', unread: 0, online: false },
  { id: 3, name: 'Trần Nam', lastMsg: 'Đơn hàng của mình bao giờ giao tới?', time: 'Hôm qua', unread: 0, online: true },
];

export default function AdminChatPage() {
  const [activeChat, setActiveChat] = React.useState(mockSessions[0]);
  const [input, setInput] = React.useState('');

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4 shrink-0">
        <span className="eyebrow block mb-1">CSKH</span>
        <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">Hỗ trợ Trực tuyến</h1>
      </div>

      <div className="flex-1 bg-white border border-[#EAE6DF] rounded-2xl shadow-xs overflow-hidden flex">
        {/* Left Sidebar: Chat List */}
        <div className="w-80 border-r border-[#EAE6DF] flex flex-col bg-neutral-50/30">
          <div className="p-4 border-b border-[#EAE6DF]">
            <SearchInput placeholder="Tìm kiếm hội thoại..." className="w-full" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockSessions.map((session) => (
              <div 
                key={session.id}
                onClick={() => setActiveChat(session)}
                className={`p-4 border-b border-[#EAE6DF]/50 cursor-pointer transition hover:bg-white flex items-start gap-3 ${activeChat.id === session.id ? 'bg-white border-l-4 border-l-[#1D1F20]' : 'border-l-4 border-l-transparent'}`}
              >
                <div className="relative shrink-0">
                  <div className="size-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600">
                    <User size={20} />
                  </div>
                  {session.online && <Circle className="size-3 fill-emerald-500 !text-white [&_*]:!text-white absolute bottom-0 right-0" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-semibold text-neutral-900 truncate">{session.name}</h4>
                    <span className="text-[10px] text-neutral-400">{session.time}</span>
                  </div>
                  <p className="text-xs text-neutral-500 truncate">{session.lastMsg}</p>
                </div>
                {session.unread > 0 && (
                  <div className="size-5 rounded-full bg-rose-500 !text-white [&_*]:!text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    {session.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Area: Chat Window */}
        <div className="flex-1 flex flex-col bg-[#FBF9F4]/50">
          {/* Header */}
          <div className="h-16 px-6 border-b border-[#EAE6DF] bg-white flex items-center gap-3 shrink-0">
            <div className="size-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">{activeChat.name}</h3>
              <p className="text-xs text-emerald-600 flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Đang hoạt động
              </p>
            </div>
          </div>

          {/* Messages View */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex justify-center">
              <span className="text-[10px] uppercase font-bold text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full">Hôm nay</span>
            </div>
            <div className="flex gap-3 max-w-[80%]">
              <div className="size-8 rounded-full bg-neutral-200 shrink-0 flex items-center justify-center"><User size={16} /></div>
              <div className="bg-white border border-[#EAE6DF] p-3 rounded-2xl rounded-tl-sm text-sm text-neutral-800 shadow-xs">
                {activeChat.lastMsg}
                <span className="block text-[10px] text-neutral-400 mt-1">{activeChat.time}</span>
              </div>
            </div>
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white border-t border-[#EAE6DF] shrink-0">
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập phản hồi của bạn..." 
                className="flex-1 h-11 px-4 rounded-xl border border-[#EAE6DF] bg-[#FBF9F4] text-sm focus:border-neutral-900 outline-none transition"
              />
              <button 
                disabled={!input.trim()}
                className="h-11 px-5 rounded-xl bg-[#1D1F20] !text-white [&_*]:!text-white hover:bg-neutral-800 disabled:opacity-50 transition flex items-center gap-2 font-medium"
              >
                Gửi <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}