import React, { useEffect, useState } from 'react';
import { Smartphone, Sparkles, ShieldCheck } from 'lucide-react';
import { playClickSnap } from '../utils/audio';

interface LoaderScreenProps {
  onFinish: () => void;
}

export const LoaderScreen: React.FC<LoaderScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('تهيئة تجربة التصفح الحريرية...');

  useEffect(() => {
    // Check if autostart is requested
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      onFinish();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          playClickSnap();
          setTimeout(() => {
            onFinish();
          }, 350);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next > 30 && next < 60) {
          setStatusText('تحميل أحدث هواتف آبل وسامسونج وشاومي...');
        } else if (next >= 60 && next < 90) {
          setStatusText('تفعيل اللمسة الحريرية ومحاكي الصوتيات...');
        } else if (next >= 90) {
          setStatusText('اكتمل التحميل! أهلاً بك في متجر ممدوح...');
        }
        return next > 100 ? 100 : next;
      });
    }, 60);

    const fallbackTimeout = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
    };
  }, [onFinish]);

  return (
    <div
      role="region"
      aria-label="شاشة التحميل"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 px-4 text-center select-none overflow-hidden"
    >
      {/* Ambient luxury lighting */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main emblem */}
      <div className="relative mb-8">
        <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-amber-500/30 shadow-2xl shadow-amber-500/10">
          <Smartphone className="w-12 h-12 text-amber-400 animate-pulse" />
          <div className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
          </div>
        </div>
      </div>

      {/* Brand Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
        متجر <span className="text-gradient-gold">ممدوح</span> للموبايلات
      </h1>
      <p className="text-sm sm:text-base text-neutral-400 max-w-md mb-8 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400 inline" />
        <span>تصميم حريري فائق • أرقى الهواتف الذكية الأصلية</span>
      </p>

      {/* Progress Bar Container */}
      <div className="w-full max-w-md bg-neutral-900/90 rounded-2xl p-4 border border-neutral-800 shadow-2xl">
        <div className="flex justify-between items-center text-xs text-neutral-400 mb-2 font-mono">
          <span className="text-neutral-300 font-sans">{statusText}</span>
          <span className="text-amber-400 font-bold">{progress}%</span>
        </div>

        {/* The visual progress bar requested by user */}
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="شريط تحميل متجر ممدوح"
          className="w-full h-3 bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-neutral-800 relative"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(245,158,11,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Small guarantee text */}
        <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            ضمان ممدوح المعتمد سنتين
          </span>
          <span>نسخة العرض التجريبية</span>
        </div>
      </div>

      {/* Skip button for user accessibility */}
      <button
        onClick={() => {
          playClickSnap();
          onFinish();
        }}
        className="mt-6 text-xs text-neutral-500 hover:text-neutral-300 underline underline-offset-4 transition cursor-pointer"
        aria-label="تخطي شريط التحميل والدخول فوراً"
      >
        تخطي التحميل والدخول المباشر
      </button>
    </div>
  );
};
