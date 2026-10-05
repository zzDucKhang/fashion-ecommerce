'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  ShoppingBag,
  TrendingUp,
  PackageCheck,
  ArrowUpRight,
  Shield,
  Layers,
  Clock,
} from 'lucide-react';
import { adminApi } from '@/modules/admin/api';
import { DashboardCard } from '@/modules/admin/components/dashboard-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

export default function AdminDashboardPage() {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: () => adminApi.getDashboardStats(),
  });

  const stats = statsData?.data;

  const mockRecentOrders = [
    { id: 'ORD-8921', customer: 'Hoàng Minh Tuấn', items: 'Áo sơ mi Oxford (Trắng) x1', total: '450.000 ₫', status: 'CONFIRMED', time: '10 phút trước' },
    { id: 'ORD-8920', customer: 'Lê Thuỳ Dung', items: 'Quần tây Pleated Trousers x1', total: '790.000 ₫', status: 'PROCESSING', time: '35 phút trước' },
    { id: 'ORD-8919', customer: 'Phạm Thanh Sơn', items: 'Blazer Oversized Knit x1, Khăn lụa x1', total: '1.650.000 ₫', status: 'DELIVERED', time: '2 giờ trước' },
    { id: 'ORD-8918', customer: 'Trần Bảo Ngọc', items: 'Váy Linen Midi Dress x1', total: '920.000 ₫', status: 'PENDING_PAYMENT', time: '4 giờ trước' },
    { id: 'ORD-8917', customer: 'Đỗ Quốc Anh', items: 'Áo thun Pima Cotton x2', total: '580.000 ₫', status: 'SHIPPED', time: '5 giờ trước' },
  ];

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <Badge variant="success">Hoàn thành</Badge>;
      case 'CONFIRMED':
      case 'PROCESSING':
        return <Badge variant="lime">Đang xử lý</Badge>;
      case 'SHIPPED':
        return <Badge variant="secondary">Đang giao</Badge>;
      case 'PENDING_PAYMENT':
        return <Badge variant="warning">Chờ thanh toán</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">TỔNG QUAN HỆ THỐNG</span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#1D1F20] tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Theo dõi các chỉ số tăng trưởng, đơn hàng và hoạt động người dùng trong thời gian thực.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/admin/users">
            <Button variant="outline" className="rounded-xl border-[#EAE6DF] text-xs h-10">
              <Users className="size-4 mr-2" /> Quản lý Users
            </Button>
          </Link>
          <Link href="/admin/roles">
            <Button className="rounded-xl bg-[#1D1F20] text-white text-xs h-10">
              <Shield className="size-4 mr-2" /> Phân quyền Roles
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard
          title="Tổng doanh thu"
          value={isLoading ? '...' : `${(stats?.totalRevenue || 0).toLocaleString('vi-VN')} ₫`}
          icon={TrendingUp}
          change="+18.4%"
          trend="up"
          description="so với tháng trước"
        />
        <DashboardCard
          title="Tổng đơn hàng"
          value={isLoading ? '...' : (stats?.totalOrders || 0).toLocaleString('vi-VN')}
          icon={PackageCheck}
          change="+8.2%"
          trend="up"
          description="tỷ lệ hoàn tất 96%"
        />
        <DashboardCard
          title="Người dùng đăng ký"
          value={isLoading ? '...' : (stats?.totalUsers || 0).toLocaleString('vi-VN')}
          icon={Users}
          change="+12.5%"
          trend="up"
          description={`+${stats?.newUsersThisMonth || 0} trong tháng này`}
        />
        <DashboardCard
          title="Sản phẩm đang bán"
          value={isLoading ? '...' : (stats?.totalProducts || 0).toLocaleString('vi-VN')}
          icon={ShoppingBag}
          change="+4 mới"
          trend="neutral"
          description="12 danh mục hiện hữu"
        />
      </div>

      {/* Quick shortcuts & Status view */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE6DF]">
            <h3 className="text-sm font-semibold text-neutral-900">
              Phím tắt nhanh
            </h3>
            <span className="text-[10px] text-neutral-400">Điều hướng</span>
          </div>

          <div className="space-y-2">
            <Link
              href="/admin/users"
              className="flex items-center justify-between p-3 rounded-xl border border-[#EAE6DF] hover:bg-neutral-50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700">
                  <Users className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">Danh sách người dùng</p>
                  <p className="text-[10px] text-neutral-400">Xem, khóa hoặc cập nhật tài khoản</p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-neutral-400 group-hover:text-neutral-900 transition" />
            </Link>

            <Link
              href="/admin/roles"
              className="flex items-center justify-between p-3 rounded-xl border border-[#EAE6DF] hover:bg-neutral-50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700">
                  <Shield className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">Quản lý vai trò & quyền</p>
                  <p className="text-[10px] text-neutral-400">Thiết lập RBAC Admin, Staff, Customer</p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-neutral-400 group-hover:text-neutral-900 transition" />
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3 rounded-xl border border-[#EAE6DF] hover:bg-neutral-50 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 text-neutral-700">
                  <Layers className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-800">Quản lý sản phẩm</p>
                  <p className="text-[10px] text-neutral-400">Kho hàng, thuộc tính và biến thể</p>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-neutral-400 group-hover:text-neutral-900 transition" />
            </Link>
          </div>
        </div>

        {/* Recent orders table */}
        <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE6DF]">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">
                Đơn hàng gần đây
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Các giao dịch vừa phát sinh trên hệ thống
              </p>
            </div>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="text-xs text-neutral-600 hover:text-neutral-900">
                Xem tất cả đơn →
              </Button>
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#EAE6DF]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thời gian</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRecentOrders.map((ord) => (
                  <TableRow key={ord.id}>
                    <TableCell className="font-semibold text-neutral-900 text-xs">
                      {ord.id}
                    </TableCell>
                    <TableCell className="text-xs">
                      <p className="font-medium text-neutral-800">{ord.customer}</p>
                      <p className="text-[11px] text-neutral-400 truncate max-w-[160px]">{ord.items}</p>
                    </TableCell>
                    <TableCell className="font-medium text-xs text-neutral-900">
                      {ord.total}
                    </TableCell>
                    <TableCell>{getOrderStatusBadge(ord.status)}</TableCell>
                    <TableCell className="text-right text-xs text-neutral-400">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" />
                        {ord.time}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

