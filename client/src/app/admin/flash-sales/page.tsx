'use client';

import { useEffect, useState } from 'react';
import {
  Flame,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Layers,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  RefreshCcw,
  AlertCircle,
  Eye,
  X,
  Sparkles,
} from 'lucide-react';
import {
  FlashSaleCampaign,
  FlashSaleItem,
  FlashSaleItemPayload,
  CreateFlashSaleInput,
  UpdateFlashSaleInput,
} from '@/types/inventory-sale';
import { flashSaleApi } from '@/api/flash-sale.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';

export default function AdminFlashSalesPage() {
  const [campaigns, setCampaigns] = useState<FlashSaleCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<FlashSaleCampaign | null>(null);
  const [detailCampaign, setDetailCampaign] = useState<FlashSaleCampaign | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState<{
    name: string;
    bannerUrl: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
    items: FlashSaleItemPayload[];
  }>({
    name: '',
    bannerUrl: '',
    startTime: '',
    endTime: '',
    isActive: true,
    items: [{ variantId: 1, flashSalePrice: 100000, promoQuantity: 10 }],
  });

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await flashSaleApi.getCampaigns({
        page,
        limit: 10,
        isActive: activeFilter === 'all' ? undefined : activeFilter === 'active',
      });
      setCampaigns(res.data || []);
      setTotalItems(res.totalItems || 0);
    } catch (err: any) {
      console.error('Lỗi khi tải danh sách Flash Sale:', err);
      setErrorMessage(err?.response?.data?.message || 'Không thể kết nối đến máy chủ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    Promise.resolve().then(() => {
      fetchCampaigns();
    });
  }, [page, activeFilter]);

  const handleOpenCreate = () => {
    setEditingCampaign(null);
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const toInputString = (d: Date) => d.toISOString().slice(0, 16);

    setFormData({
      name: 'Chiến Dịch Flash Sale Hot ' + (campaigns.length + 1),
      bannerUrl: '',
      startTime: toInputString(now),
      endTime: toInputString(tomorrow),
      isActive: true,
      items: [{ variantId: 1, flashSalePrice: 150000, promoQuantity: 20 }],
    });
    setErrorMessage(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (campaign: FlashSaleCampaign) => {
    setEditingCampaign(campaign);
    const toInputString = (str: string) => {
      try {
        return new Date(str).toISOString().slice(0, 16);
      } catch {
        return '';
      }
    };

    setFormData({
      name: campaign.name,
      bannerUrl: campaign.bannerUrl || '',
      startTime: toInputString(campaign.startTime),
      endTime: toInputString(campaign.endTime),
      isActive: campaign.isActive,
      items:
        campaign.items && campaign.items.length > 0
          ? campaign.items.map((i) => ({
              variantId: i.variantId,
              flashSalePrice: Number(i.flashSalePrice),
              promoQuantity: i.promoQuantity,
            }))
          : [{ variantId: 1, flashSalePrice: 100000, promoQuantity: 10 }],
    });
    setErrorMessage(null);
    setIsFormOpen(true);
  };

  const handleAddItemRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { variantId: prev.items.length + 1, flashSalePrice: 100000, promoQuantity: 10 }],
    }));
  };

  const handleRemoveItemRow = (index: number) => {
    if (formData.items.length <= 1) {
      setErrorMessage('Chiến dịch Flash Sale phải có ít nhất 1 sản phẩm');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (index: number, field: keyof FlashSaleItemPayload, value: number) => {
    setFormData((prev) => {
      const updated = [...prev.items];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, items: updated };
    });
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('Tên chiến dịch không được để trống');
      return;
    }
    if (!formData.startTime || !formData.endTime) {
      setErrorMessage('Vui lòng chọn thời gian bắt đầu và kết thúc');
      return;
    }
    if (new Date(formData.startTime) >= new Date(formData.endTime)) {
      setErrorMessage('Thời gian kết thúc phải sau thời gian bắt đầu');
      return;
    }

    // Check duplicate variants
    const variantIds = formData.items.map((i) => i.variantId);
    if (new Set(variantIds).size !== variantIds.length) {
      setErrorMessage('Không được có sản phẩm trùng nhau trong chiến dịch');
      return;
    }

    setSubmitting(true);

    try {
      if (editingCampaign) {
        const payload: UpdateFlashSaleInput = {
          name: formData.name,
          bannerUrl: formData.bannerUrl || undefined,
          startTime: new Date(formData.startTime).toISOString(),
          endTime: new Date(formData.endTime).toISOString(),
          isActive: formData.isActive,
          items: formData.items,
        };
        await flashSaleApi.updateCampaign(editingCampaign.id, payload);
        setSuccessMessage('Cập nhật chiến dịch Flash Sale thành công!');
      } else {
        const payload: CreateFlashSaleInput = {
          name: formData.name,
          bannerUrl: formData.bannerUrl || undefined,
          startTime: new Date(formData.startTime).toISOString(),
          endTime: new Date(formData.endTime).toISOString(),
          isActive: formData.isActive,
          items: formData.items,
        };
        await flashSaleApi.createCampaign(payload);
        setSuccessMessage('Tạo chiến dịch Flash Sale thành công!');
      }

      setIsFormOpen(false);
      fetchCampaigns();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Submit error:', err);
      setErrorMessage(
        err?.response?.data?.message || err?.message || 'Có lỗi xảy ra khi lưu chiến dịch'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    setSubmitting(true);
    try {
      await flashSaleApi.deleteCampaign(id);
      setSuccessMessage('Xóa chiến dịch thành công!');
      setDeleteConfirmId(null);
      fetchCampaigns();
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || 'Xóa chiến dịch thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  const getCampaignStatus = (c: FlashSaleCampaign) => {
    if (!c.isActive) {
      return { label: 'Đã tắt', color: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' };
    }
    const now = new Date().getTime();
    const start = new Date(c.startTime).getTime();
    const end = new Date(c.endTime).getTime();

    if (now < start) {
      return { label: 'Sắp diễn ra', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' };
    }
    if (now > end) {
      return { label: 'Đã kết thúc', color: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400' };
    }
    return { label: 'Đang diễn ra', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' };
  };

  const filteredCampaigns = campaigns.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatVND = (num: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);

  const formatDateTime = (str: string) => {
    try {
      return new Date(str).toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return str;
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
            <Flame className="size-5 fill-red-600 text-red-600 animate-pulse" />
            <span>MODULE INVENTORY SALE</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mt-1">
            Quản Lý Flash Sale
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Tạo và cấu hình các chiến dịch giảm giá theo khung giờ chớp nhoáng
          </p>
        </div>

        <Button onClick={handleOpenCreate} className="bg-red-600 hover:bg-red-700 text-white font-bold gap-2 shadow-lg shadow-red-600/20">
          <Plus className="size-4" />
          Tạo chiến dịch mới
        </Button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm font-semibold text-emerald-800 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="size-5 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-semibold text-red-800 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300">
          <AlertCircle className="size-5 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Tổng chiến dịch</span>
            <Layers className="size-5 text-red-600" />
          </div>
          <div className="mt-3 text-3xl font-black text-zinc-900 dark:text-zinc-100">
            {totalItems}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Đang hoạt động</span>
            <Sparkles className="size-5 text-emerald-600" />
          </div>
          <div className="mt-3 text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {campaigns.filter((c) => c.isActive).length}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Tổng SP Sale</span>
            <Flame className="size-5 text-amber-500" />
          </div>
          <div className="mt-3 text-3xl font-black text-zinc-900 dark:text-zinc-100">
            {campaigns.reduce((acc, c) => acc + (c.items?.length || 0), 0)}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-xs font-bold uppercase tracking-wider">Số lượng đã bán</span>
            <CheckCircle2 className="size-5 text-indigo-600" />
          </div>
          <div className="mt-3 text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {campaigns.reduce(
              (acc, c) => acc + (c.items?.reduce((iAcc, item) => iAcc + (item.soldQuantity || 0), 0) || 0),
              0
            )}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 shadow-xs dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <Input
            placeholder="Tìm theo tên chiến dịch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeFilter === 'all' ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-zinc-100' : 'text-zinc-500'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeFilter === 'active' ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-zinc-100' : 'text-zinc-500'
              }`}
            >
              Hoạt động
            </button>
            <button
              onClick={() => setActiveFilter('inactive')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                activeFilter === 'inactive' ? 'bg-white text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-zinc-100' : 'text-zinc-500'
              }`}
            >
              Đã tắt
            </button>
          </div>

          <Button onClick={fetchCampaigns} variant="outline" size="sm" className="gap-1.5">
            <RefreshCcw className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Campaign Table */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Tên chiến dịch</th>
                <th className="px-6 py-4">Thời gian</th>
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    Đang tải dữ liệu chiến dịch Flash Sale...
                  </td>
                </tr>
              ) : filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    Chưa có chiến dịch Flash Sale nào.
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((c) => {
                  const status = getCampaignStatus(c);
                  return (
                    <tr key={c.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-zinc-400">#{c.id}</td>
                      <td className="px-6 py-4 font-bold text-zinc-900 dark:text-zinc-100">
                        {c.name}
                      </td>
                      <td className="px-6 py-4 text-xs text-zinc-500">
                        <div className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
                          <Calendar className="size-3.5 text-zinc-400" />
                          <span>{formatDateTime(c.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-zinc-400">
                          <Clock className="size-3.5" />
                          <span>đến {formatDateTime(c.endTime)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                          <Flame className="size-3 text-red-500" />
                          {c.items?.length || 0} biến thể
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${status.color}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            onClick={() => setDetailCampaign(c)}
                            variant="ghost"
                            size="icon-sm"
                            title="Xem chi tiết"
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button
                            onClick={() => handleOpenEdit(c)}
                            variant="ghost"
                            size="icon-sm"
                            title="Sửa chiến dịch"
                          >
                            <Pencil className="size-4 text-amber-600" />
                          </Button>
                          <Button
                            onClick={() => setDeleteConfirmId(c.id)}
                            variant="ghost"
                            size="icon-sm"
                            title="Xóa chiến dịch"
                          >
                            <Trash2 className="size-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal (Create / Edit) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 md:p-8 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between border-b pb-4 dark:border-zinc-800">
              <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Flame className="size-5 text-red-600" />
                {editingCampaign ? 'Chỉnh Sửa Flash Sale' : 'Tạo Chiến Dịch Flash Sale'}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="mt-6 space-y-6">
              {errorMessage && (
                <div className="rounded-xl bg-red-50 p-3.5 text-xs font-semibold text-red-700 border border-red-200 dark:bg-red-950/50 dark:border-red-800 dark:text-red-300">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                    Tên chiến dịch *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="VD: Flash Sale Giờ Vàng 12h-14h"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                    Thời gian bắt đầu *
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                    Thời gian kết thúc *
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                    Banner URL (Tùy chọn)
                  </label>
                  <Input
                    value={formData.bannerUrl}
                    onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                    placeholder="https://example.com/banner.jpg"
                  />
                </div>

                <div className="sm:col-span-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="size-4 rounded border-zinc-300 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Kích hoạt chiến dịch ngay lập tức
                  </label>
                </div>
              </div>

              {/* Items Builder */}
              <div className="border-t pt-6 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    Danh sách sản phẩm tham gia sale
                  </h3>
                  <Button
                    type="button"
                    onClick={handleAddItemRow}
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs font-bold"
                  >
                    <Plus className="size-3.5" /> Thêm sản phẩm
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-12 gap-3 items-center rounded-xl bg-zinc-50 p-3 border border-zinc-200 dark:bg-zinc-800/50 dark:border-zinc-700"
                    >
                      <div className="col-span-3">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                          Variant ID *
                        </label>
                        <Input
                          type="number"
                          value={item.variantId}
                          onChange={(e) => handleItemChange(idx, 'variantId', Number(e.target.value))}
                          min={1}
                          required
                        />
                      </div>
                      <div className="col-span-4">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                          Giá Flash Sale (VNĐ) *
                        </label>
                        <Input
                          type="number"
                          value={item.flashSalePrice}
                          onChange={(e) => handleItemChange(idx, 'flashSalePrice', Number(e.target.value))}
                          min={1}
                          required
                        />
                      </div>
                      <div className="col-span-4">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                          Số lượng KM *
                        </label>
                        <Input
                          type="number"
                          value={item.promoQuantity}
                          onChange={(e) => handleItemChange(idx, 'promoQuantity', Number(e.target.value))}
                          min={1}
                          required
                        />
                      </div>
                      <div className="col-span-1 flex justify-end pt-4">
                        <Button
                          type="button"
                          onClick={() => handleRemoveItemRow(idx)}
                          variant="ghost"
                          size="icon-xs"
                          className="text-red-500 hover:bg-red-50"
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 border-t pt-6 dark:border-zinc-800">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Hủy bỏ
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold"
                >
                  {submitting ? 'Đang lưu...' : editingCampaign ? 'Cập nhật chiến dịch' : 'Tạo mới chiến dịch'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 md:p-8 shadow-2xl dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b pb-4 dark:border-zinc-800">
              <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Flame className="size-5 text-red-600" />
                Chi tiết chiến dịch: {detailCampaign.name}
              </h2>
              <button
                onClick={() => setDetailCampaign(null)}
                className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
                <div>
                  <span className="text-xs text-zinc-500 block">Thời gian bắt đầu</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    {formatDateTime(detailCampaign.startTime)}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500 block">Thời gian kết thúc</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    {formatDateTime(detailCampaign.endTime)}
                  </span>
                </div>
              </div>

              <h4 className="font-bold uppercase text-xs tracking-wider text-zinc-500 pt-2">
                Danh sách sản phẩm trong sale ({detailCampaign.items?.length || 0})
              </h4>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {detailCampaign.items?.map((item) => (
                  <div
                    key={item.id || item.variantId}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
                  >
                    <div>
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">
                        {item.variant?.product?.defaultName || `Biến thể #${item.variantId}`}
                      </div>
                      <div className="text-xs text-zinc-500 font-mono">SKU: {item.variant?.sku || item.variantId}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-red-600">{formatVND(Number(item.flashSalePrice))}</div>
                      <div className="text-xs text-zinc-500">
                        Đã bán {item.soldQuantity}/{item.promoQuantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end border-t pt-4 dark:border-zinc-800">
              <Button onClick={() => setDetailCampaign(null)} variant="outline">
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Xác nhận xóa chiến dịch</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Bạn có chắc chắn muốn xóa chiến dịch Flash Sale này không? Thao tác này không thể hoàn tác.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                Hủy
              </Button>
              <Button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={submitting}
                className="bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                {submitting ? 'Đang xóa...' : 'Xóa chiến dịch'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
