import React, { useState } from 'react';
import {
  Smartphone,
  Search,
  ShoppingCart,
  GitCompare,
  Volume2,
  VolumeX,
  Code2,
  AlertTriangle,
  Sparkles,
  PhoneCall,
} from 'lucide-react';
import { playClickSnap, playHoverTick } from '../utils/audio';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currency: 'EGP' | 'SAR' | 'USD';
  onCurrencyChange: (c: 'EGP' | 'SAR' | 'USD') => void;
  cartCount: number;
  onOpenCart: () => void;
  comparisonCount: number;
  onOpenComparison: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onOpenDemoNotice: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  currency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
  comparisonCount,
  onOpenComparison,
  isAudioMuted,
  onToggleAudio,
  onOpenDemoNotice,
}) => {
  const [topBannerVisible, setTopBannerVisible] = useState(true);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-neutral-950/85 border-b border-neutral-800/80 transition-all">
      {/* Top Demo & Creator announcement bar */}
      {topBannerVisible && (
        <div className="bg-gradient-to-r from-amber-950/90 via-amber-900/60 to-neutral-950 px-4 py-1.5 text-xs text-amber-200 border-b border-amber-600/30 flex items-center justify-between">
          <div className="container mx-auto flex items-center justify-between">
            <button
              onClick={() => {
                playClickSnap();
                onOpenDemoNotice();
              }}
              onMouseEnter={playHoverTick}
              className="flex items-center gap-2 hover:underline text-right cursor-pointer"
              aria-label="فتح تفاصيل التنبيه التجريبي"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <strong className="text-amber-300 font-bold">تجريبي، الموقع ده تجريبي</strong>
              <span className="hidden sm:inline text-neutral-400">|</span>
              <span className="font-medium text-amber-100 flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-amber-400 inline" />
                تم صنع هذا الموقع بواسطة عبد الله
              </span>
            </button>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-amber-300/80">
                <Sparkles className="w-3 h-3 text-amber-400" />
                متجر ممدوح للموبايلات
              </span>
              <button
                onClick={() => setTopBannerVisible(false)}
                className="text-amber-400/70 hover:text-amber-200 text-xs px-1 cursor-pointer"
                aria-label="إخفاء شريط التنبيه"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main navigation header */}
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              playClickSnap();
            }}
            onMouseEnter={playHoverTick}
            className="flex items-center gap-3 group"
            aria-label="الصفحة الرئيسية لمتجر ممدوح للموبايلات"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-amber-500/40 shadow-lg shadow-amber-500/10 group-hover:border-amber-400 transition-all duration-300 group-hover:scale-105">
              <Smartphone className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
              <div className="absolute inset-0 rounded-2xl bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xs" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                مَمدوح <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">MOBILE</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-wide">
                للهواتف الذكية الأصلية • لمسة حريرية
              </span>
            </div>
          </a>

          {/* Developer Abdullah credit badge */}
          <button
            onClick={() => {
              playClickSnap();
              onOpenDemoNotice();
            }}
            onMouseEnter={playHoverTick}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-xs text-neutral-300 transition cursor-pointer"
            aria-label="معلومات مطور الموقع عبد الله"
            title="انقر لعرض تفاصيل الموقع التجريبي والمطور"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>بواسطة:</span>
            <span className="text-amber-400 font-semibold">عبد الله</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="order-3 sm:order-2 w-full sm:w-72 md:w-96 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث عن آيفون 16، سامسونج S25، شاومي..."
            className="w-full bg-neutral-900/90 text-sm text-neutral-100 placeholder-neutral-500 rounded-xl pr-10 pl-4 py-2 border border-neutral-800 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/50 transition-all"
            aria-label="البحث عن الهواتف والمنتجات"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              aria-label="مسح البحث"
            >
              مسح
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="order-2 sm:order-3 flex items-center gap-2">
          {/* Audio Haptic Feedback Toggle */}
          <button
            onClick={() => {
              onToggleAudio();
              playClickSnap();
            }}
            onMouseEnter={playHoverTick}
            className={`p-2 rounded-xl border transition cursor-pointer flex items-center gap-1 text-xs ${
              !isAudioMuted
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-xs shadow-amber-500/20'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
            }`}
            title={!isAudioMuted ? 'الصوتيات التفاعلية مفعلة' : 'الصوتيات مكتومة'}
            aria-label={!isAudioMuted ? 'كتم الصوت التفاعلي' : 'تفعيل الصوت التفاعلي'}
          >
            {!isAudioMuted ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline font-mono text-[10px]">لمس صوتي</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden md:inline font-mono text-[10px]">صامت</span>
              </>
            )}
          </button>

          {/* Currency Selector */}
          <div className="flex items-center rounded-xl bg-neutral-900 border border-neutral-800 p-0.5 text-xs">
            {(['EGP', 'SAR', 'USD'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => {
                  playClickSnap();
                  onCurrencyChange(curr);
                }}
                className={`px-2 py-1 rounded-lg transition font-medium cursor-pointer ${
                  currency === curr
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                aria-label={`تغيير العملة إلى ${curr}`}
              >
                {curr === 'EGP' ? 'ج.م' : curr === 'SAR' ? 'ر.س' : '$'}
              </button>
            ))}
          </div>

          {/* Comparison Modal Button */}
          <button
            onClick={() => {
              playClickSnap();
              onOpenComparison();
            }}
            onMouseEnter={playHoverTick}
            className="relative p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-white transition cursor-pointer"
            aria-label={`مقارنة الهواتف (${comparisonCount} محدد)`}
            title="مقارنة الهواتف"
          >
            <GitCompare className="w-4 h-4" />
            {comparisonCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-neutral-950">
                {comparisonCount}
              </span>
            )}
          </button>

          {/* Cart Drawer Button */}
          <button
            onClick={() => {
              playClickSnap();
              onOpenCart();
            }}
            onMouseEnter={playHoverTick}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs shadow-md shadow-amber-500/20 transition cursor-pointer"
            aria-label={`سلة المشتريات (${cartCount} منتجات)`}
          >
            <ShoppingCart className="w-4 h-4 text-neutral-950" />
            <span className="hidden md:inline">السلة</span>
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-950 text-amber-400 px-1 text-[11px] font-extrabold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
