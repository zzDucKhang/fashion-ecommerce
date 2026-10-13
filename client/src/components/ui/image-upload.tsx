'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { UploadCloud, X, Loader2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/api/client';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  folder?: 'avatars' | 'products' | 'reviews' | 'chats' | 'general';
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  folder = 'general',
  className,
  placeholder = 'Chọn tệp hình ảnh từ máy tính hoặc kéo thả vào đây',
  disabled = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng chỉ chọn tệp hình ảnh (JPEG, PNG, WebP, GIF)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Dung lượng tệp không được vượt quá 10MB');
      return;
    }

    setIsUploading(true);
    try {
      // Đọc file sang Base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      const base64Data = await base64Promise;

      const response = await apiClient.post('/common/upload', {
        fileName: file.name,
        fileType: file.type,
        base64: base64Data,
        folder,
      });

      const uploadedUrl = response.data?.data?.url;
      if (uploadedUrl) {
        onChange?.(uploadedUrl);
        toast.success('Tải ảnh lên thành công!');
      } else {
        toast.error('Không nhận được URL ảnh từ máy chủ');
      }
    } catch (err: any) {
      console.error('Lỗi khi tải ảnh:', err);
      const msg = err?.response?.data?.message || err?.message || 'Tải ảnh lên thất bại';
      toast.error(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void handleFileUpload(file);
    }
    // Reset input để có thể chọn lại cùng một file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleManualUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = manualUrl.trim();
    if (!trimmed) return;
    try {
      new URL(trimmed);
      onChange?.(trimmed);
      setManualUrl('');
      setShowUrlInput(false);
      toast.success('Đã áp dụng liên kết ảnh');
    } catch {
      toast.error('URL không hợp lệ. Vui lòng nhập URL dạng https://...');
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled || isUploading}
        onChange={onFileChange}
      />

      {value ? (
        <div className="relative group overflow-hidden rounded-2xl border border-[#EAE6DF] bg-neutral-50 p-2 max-w-sm">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
            <Image
              src={value}
              alt="Uploaded preview"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 384px"
              unoptimized={value.startsWith('http://localhost')}
            />
          </div>

          <div className="mt-2 flex items-center justify-between px-1">
            <span className="truncate text-xs text-neutral-500 max-w-[240px] font-mono">
              {value}
            </span>
            <button
              type="button"
              disabled={disabled || isUploading}
              onClick={() => onChange?.('')}
              className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 transition"
            >
              <X size={14} /> Xóa ảnh
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) void handleFileUpload(file);
          }}
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
          className={cn(
            'flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition',
            isDragging
              ? 'border-neutral-900 bg-neutral-100/70 scale-[0.99]'
              : 'border-[#EAE6DF] bg-[#FBF9F4] hover:bg-neutral-50 hover:border-neutral-400',
            (disabled || isUploading) && 'opacity-60 cursor-not-allowed'
          )}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 size={32} className="animate-spin text-neutral-800" />
              <p className="text-xs font-semibold text-neutral-600">Đang tải ảnh lên hệ thống...</p>
            </div>
          ) : (
            <>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-white shadow-xs border border-[#EAE6DF] text-neutral-700">
                <UploadCloud size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">{placeholder}</p>
                <p className="mt-1 text-xs text-neutral-500">Hỗ trợ JPG, PNG, WebP (Tối đa 10MB)</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Tùy chọn nhập URL thủ công nếu cần */}
      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-neutral-500 hover:text-neutral-800 transition flex items-center gap-1 underline underline-offset-4"
        >
          <LinkIcon size={12} />
          {showUrlInput ? 'Ẩn nhập URL thủ công' : 'Hoặc dán URL hình ảnh từ internet'}
        </button>
      </div>

      {showUrlInput && (
        <form onSubmit={handleManualUrlSubmit} className="flex gap-2">
          <input
            type="url"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="flex-1 rounded-xl border border-[#EAE6DF] bg-white px-3 py-2 text-xs outline-none focus:border-neutral-900"
          />
          <button
            type="submit"
            className="rounded-xl bg-[#1D1F20] px-4 py-2 text-xs font-medium text-white hover:bg-neutral-800 transition"
          >
            Áp dụng
          </button>
        </form>
      )}
    </div>
  );
}
