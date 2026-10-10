"use client";

import React, { useState, useEffect } from "react";
import {
  Tag,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Coins,
  Sparkles,
} from "lucide-react";
import { validateVoucher, type VoucherValidationData } from "../api";

export interface VoucherInputProps {
  orderTotal: number;
  onValidate: (result: VoucherValidationData) => void;
  onRemove?: () => void;
}

export function VoucherInput({
  orderTotal,
  onValidate,
  onRemove,
}: VoucherInputProps) {
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [appliedVoucher, setAppliedVoucher] = useState<VoucherValidationData | null>(null);

  // 1. Tránh gọi setState đồng bộ trong Effect bằng timer bất đồng bộ có cleanup
  useEffect(() => {
    if (appliedVoucher) {
      const minRequired = Number(appliedVoucher.voucher.minOrderValue);
      if (orderTotal < minRequired) {
        const timer = setTimeout(() => {
          setAppliedVoucher(null);
          setCode("");
          setErrorMessage(
            `Đơn hàng không còn đủ điều kiện tối thiểu (${minRequired.toLocaleString("vi-VN")}₫) để dùng mã này.`
          );
          onRemove?.();
        }, 0);

        return () => clearTimeout(timer);
      }
    }
  }, [orderTotal, appliedVoucher, onRemove]);

  const handleApply = async (e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    const cleanCode = code.trim().toUpperCase();

    if (!cleanCode) {
      setErrorMessage("Vui lòng nhập mã giảm giá");
      return;
    }

    if (orderTotal <= 0) {
      setErrorMessage("Giá trị đơn hàng phải lớn hơn 0 để áp dụng voucher");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await validateVoucher(cleanCode, orderTotal);

      if (response && response.data) {
        setAppliedVoucher(response.data);
        setErrorMessage(null);
        onValidate(response.data);
      } else {
        throw new Error("Không nhận được dữ liệu phản hồi từ máy chủ");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Mã voucher không hợp lệ hoặc đã hết hạn";
      setErrorMessage(msg);
      setAppliedVoucher(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Hỗ trợ bấm phím Enter khi nhập voucher mà không cần dùng thẻ <form>
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApply(e);
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setCode("");
    setErrorMessage(null);
    onRemove?.();
  };

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#EAE6DF] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Tag size={18} className="text-[#1D1F20]" />
        <h4 className="text-base font-bold text-[#1D1F20]">Mã khuyến mãi / Voucher</h4>
      </div>

      {appliedVoucher ? (
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#84EA53]/15 border border-[#84EA53]/40 transition">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#16a34a] shrink-0" />
              <span className="font-bold text-sm text-[#1D1F20] tracking-wide">
                {appliedVoucher.code}
              </span>
              <span className="text-[11px] font-semibold bg-[#1D1F20] !text-white [&_*]:!text-white px-2 py-0.5 rounded-full">
                Đã áp dụng
              </span>
            </div>
            <p className="text-xs text-[#16a34a] font-semibold pl-6">
              Giảm -{appliedVoucher.discountAmount.toLocaleString("vi-VN")}₫ vào tổng đơn
            </p>
          </div>

          <button
            type="button"
            onClick={handleRemoveVoucher}
            className="p-1.5 rounded-lg text-[#74736e] hover:text-[#dc2626] hover:bg-white/80 transition cursor-pointer"
            aria-label="Xóa mã giảm giá"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        // 2. Đổi <form> thành <div> để tránh lỗi form lồng trong form
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={code}
              disabled={isLoading}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                if (errorMessage) setErrorMessage(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Nhập mã voucher (VD: FASHION50)"
              className="flex-1 rounded-xl border border-[#EAE6DF] bg-[#FBF9F4] px-4 py-2.5 text-sm text-[#1D1F20] uppercase placeholder:normal-case placeholder-[#74736e]/60 focus:border-[#84EA53] outline-none transition disabled:opacity-50"
            />
            <button
              type="button"
              onClick={handleApply}
              disabled={isLoading || !code.trim()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D1F20] !text-white [&_*]:!text-white font-semibold text-sm hover:bg-black active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Kiểm tra...</span>
                </>
              ) : (
                <span>Áp dụng</span>
              )}
            </button>
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 text-xs text-[#dc2626] font-medium pt-1">
              <AlertCircle size={14} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export interface PointRedeemSliderProps {
  maxPoints: number;
  orderTotal: number;
  onRedeem: (points: number) => void;
}

export function PointRedeemSlider({
  maxPoints,
  orderTotal,
  onRedeem,
}: PointRedeemSliderProps) {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);

  const usableMaxPoints = Math.max(0, Math.min(maxPoints, Math.floor(orderTotal)));

  // Xử lý setState an toàn không gây cascading render trong effect
  useEffect(() => {
    if (isEnabled && points > usableMaxPoints) {
      const timer = setTimeout(() => {
        setPoints(usableMaxPoints);
        onRedeem(usableMaxPoints);
      }, 0);
      return () => clearTimeout(timer);
    }
    if (usableMaxPoints <= 0 && isEnabled) {
      const timer = setTimeout(() => {
        setIsEnabled(false);
        setPoints(0);
        onRedeem(0);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [usableMaxPoints, isEnabled, points, onRedeem]);

  const handleToggle = () => {
    const nextState = !isEnabled;
    setIsEnabled(nextState);

    if (nextState) {
      const initialPoints = usableMaxPoints;
      setPoints(initialPoints);
      onRedeem(initialPoints);
    } else {
      setPoints(0);
      onRedeem(0);
    }
  };

  const handleSliderChange = (newVal: number) => {
    const clamped = Math.max(0, Math.min(newVal, usableMaxPoints));
    setPoints(clamped);
    onRedeem(clamped);
  };

  const handlePreset = (fraction: number) => {
    const calculated = Math.round(usableMaxPoints * fraction);
    handleSliderChange(calculated);
  };

  if (maxPoints <= 0) {
    return null;
  }

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#EAE6DF] rounded-2xl p-5 sm:p-6 space-y-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#84EA53]/20 border border-[#84EA53]/40 flex items-center justify-center text-[#1D1F20]">
            <Coins size={18} />
          </div>
          <div>
            <h4 className="text-base font-bold text-[#1D1F20]">Dùng điểm tích lũy</h4>
            <p className="text-xs text-[#74736e]">
              Bạn có{" "}
              <strong className="text-[#1D1F20]">
                {maxPoints.toLocaleString("vi-VN")} điểm
              </strong>{" "}
              (1 điểm = 1₫)
            </p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isEnabled}
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isEnabled ? "bg-[#84EA53]" : "bg-[#EAE6DF]"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
              isEnabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {isEnabled && (
        <div className="space-y-4 pt-2 border-t border-[#EAE6DF] animate-fadeIn">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FBF9F4] border border-[#EAE6DF]">
            <span className="text-xs font-semibold text-[#74736e]">
              Số tiền giảm giá:
            </span>
            <div className="flex items-center gap-1.5 text-sm font-bold text-[#16a34a]">
              <Sparkles size={14} className="text-[#84EA53]" />
              <span>-{points.toLocaleString("vi-VN")}₫</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[#74736e] font-medium">
              <span>0 điểm</span>
              <span className="text-[#1D1F20] font-bold">
                {points.toLocaleString("vi-VN")} / {usableMaxPoints.toLocaleString("vi-VN")} điểm
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={usableMaxPoints}
              step={100}
              value={points}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full h-2 bg-[#EAE6DF] rounded-lg appearance-none cursor-pointer accent-[#84EA53] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            {[
              { label: "25%", frac: 0.25 },
              { label: "50%", frac: 0.5 },
              { label: "75%", frac: 0.75 },
              { label: "Tối đa", frac: 1 },
            ].map(({ label, frac }) => (
              <button
                key={label}
                type="button"
                onClick={() => handlePreset(frac)}
                className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-[#FBF9F4] border border-[#EAE6DF] text-[#1D1F20] hover:border-[#84EA53] hover:bg-[#84EA53]/10 transition cursor-pointer"
              >
                {label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handleSliderChange(0)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-transparent text-[#74736e] hover:text-[#dc2626] transition cursor-pointer"
            >
              Đặt lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
}