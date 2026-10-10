'use client';

import { useEffect, useState } from 'react';
import { Clock, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountdownProps {
  targetTime: string | Date;
  startTime?: string | Date;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  onEnd?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isEnded: boolean;
  isUpcoming: boolean;
}

function calculateTimeRemaining(target: string | Date, start?: string | Date): TimeRemaining {
  const now = new Date().getTime();
  const startTime = start ? new Date(start).getTime() : 0;
  const targetTime = new Date(target).getTime();

  if (start && now < startTime) {
    const diff = startTime - now;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isEnded: false,
      isUpcoming: true,
    };
  }

  const diff = targetTime - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isEnded: true,
      isUpcoming: false,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isEnded: false,
    isUpcoming: false,
  };
}

export function FlashSaleCountdown({
  targetTime,
  startTime,
  className,
  size = 'md',
  showLabels = true,
  onEnd,
}: CountdownProps) {
  const [time, setTime] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetTime, startTime)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const nextTime = calculateTimeRemaining(targetTime, startTime);
      setTime(nextTime);

      if (nextTime.isEnded) {
        clearInterval(timer);
        onEnd?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime, startTime, onEnd]);

  if (time.isEnded) {
    return (
      <div className={cn('inline-flex items-center gap-1.5 font-semibold text-muted-foreground', className)}>
        <Clock className="size-4" />
        <span>Chiến dịch đã kết thúc</span>
      </div>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  const sizeClasses = {
    sm: {
      box: 'px-1.5 py-0.5 text-xs font-mono font-bold rounded',
      colon: 'text-xs font-bold mx-0.5',
      label: 'text-[9px] uppercase tracking-wider',
    },
    md: {
      box: 'px-2.5 py-1 text-sm font-mono font-extrabold rounded-md',
      colon: 'text-sm font-bold mx-1',
      label: 'text-[10px] uppercase tracking-wider',
    },
    lg: {
      box: 'px-3.5 py-1.5 text-lg font-mono font-black rounded-lg',
      colon: 'text-base font-bold mx-1.5',
      label: 'text-xs uppercase tracking-wider',
    },
  }[size];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center text-red-500 font-bold animate-pulse">
        <Flame className={cn(size === 'lg' ? 'size-5' : size === 'sm' ? 'size-3.5' : 'size-4')} />
        <span className="text-xs uppercase ml-1 tracking-wider">
          {time.isUpcoming ? 'Bắt đầu sau' : 'Kết thúc sau'}
        </span>
      </div>

      <div className="flex items-center">
        {time.days > 0 && (
          <>
            <div className="flex flex-col items-center">
              <span className={cn('bg-zinc-900 !text-white [&_*]:!text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm', sizeClasses.box)}>
                {pad(time.days)}
              </span>
              {showLabels && <span className={cn('mt-0.5 text-zinc-500', sizeClasses.label)}>ngày</span>}
            </div>
            <span className={cn('text-zinc-400', sizeClasses.colon)}>:</span>
          </>
        )}

        <div className="flex flex-col items-center">
          <span className={cn('bg-zinc-900 !text-white [&_*]:!text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm', sizeClasses.box)}>
            {pad(time.hours)}
          </span>
          {showLabels && <span className={cn('mt-0.5 text-zinc-500', sizeClasses.label)}>giờ</span>}
        </div>

        <span className={cn('text-zinc-400', sizeClasses.colon)}>:</span>

        <div className="flex flex-col items-center">
          <span className={cn('bg-zinc-900 !text-white [&_*]:!text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm', sizeClasses.box)}>
            {pad(time.minutes)}
          </span>
          {showLabels && <span className={cn('mt-0.5 text-zinc-500', sizeClasses.label)}>phút</span>}
        </div>

        <span className={cn('text-zinc-400', sizeClasses.colon)}>:</span>

        <div className="flex flex-col items-center">
          <span className={cn('bg-red-600 !text-white [&_*]:!text-white shadow-sm shadow-red-500/20', sizeClasses.box)}>
            {pad(time.seconds)}
          </span>
          {showLabels && <span className={cn('mt-0.5 text-red-500 font-semibold', sizeClasses.label)}>giây</span>}
        </div>
      </div>
    </div>
  );
}
