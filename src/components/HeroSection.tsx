import React, { useState } from 'react';
import {
  Sparkles,
  Shield,
  Truck,
  RotateCcw,
  Zap,
  Check,
  Eye,
  GitCompare,
  ShoppingCart,
} from 'lucide-react';
import { Product, ProductColor, StorageOption } from '../types/store';
import { formatCurrency } from '../utils/storeLogic';
import { playClickSnap, playHoverTick, playSuccessChime } from '../utils/audio';

interface HeroSectionProps {
  featuredProduct: Product;
  currency: 'EGP' | 'SAR' | 'USD';
  onAddToCart: (product: Product, color: ProductColor, storage: StorageOption) => void;
  onQuickView: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredProduct,
  currency,
  onAddToCart,
  onQuickView,
  onToggleCompare,
  isCompared,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(featuredProduct.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption>(
    featuredProduct.storageOptions[0]
  );
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const currentPrice = featuredProduct.priceEGP + selectedStorage.priceDiffEGP;

  // Handle 3D tactile tilt effect on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Max 15 degrees tilt
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pb-16 border-b border-neutral-800/80">
      {/* Background radial gradient lights */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Right column (Text & Highlights in Arabic RTL) */}
          <div className="lg:col-span-6 space-y-6 text-right">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>قمة الفخامة واللمسة الحريرية في متجر ممدوح</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              أحدث وأقوى الهواتف <br />
              <span className="text-gradient-gold">بلمسة حريرية لا تُنسى</span>
            </h1>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              اختر هاتفك الرائد القادم من متجر <strong className="text-amber-400">ممدوح</strong>. أجهزة أصلية 100%
              مغلفة بضمان معتمد لمدة عامين، مع تجربة استعراض ثلاثية الأبعاد وصوتيات تفاعلية تمنحك إحساس الهاتف بين يديك.
            </p>

            {/* Quick Guarantees Grid */}
            <div className="grid grid-cols-3 gap-3 py-2 border-y border-neutral-800/80">
              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col items-center text-center">
                <Shield className="w-5 h-5 text-amber-400 mb-1" />
                <span className="text-xs font-bold text-neutral-200">ضمان ممدوح</span>
                <span className="text-[10px] text-neutral-400">24 شهراً معتمداً</span>
              </div>
              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col items-center text-center">
                <Truck className="w-5 h-5 text-cyan-400 mb-1" />
                <span className="text-xs font-bold text-neutral-200">شحن فوري</span>
                <span className="text-[10px] text-neutral-400">توصيل سريع وبأمان</span>
              </div>
              <div className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col items-center text-center">
                <RotateCcw className="w-5 h-5 text-emerald-400 mb-1" />
                <span className="text-xs font-bold text-neutral-200">استبدال 14 يوم</span>
                <span className="text-[10px] text-neutral-400">راحة بال تامة</span>
              </div>
            </div>

            {/* Mini Specs chips */}
            <div className="flex flex-wrap gap-2 text-xs text-neutral-300">
              <span className="px-3 py-1 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                شريحة A18 Pro الخارقة
              </span>
              <span className="px-3 py-1 rounded-xl bg-neutral-900/80 border border-neutral-800">
                شاشة 6.9 بوصة ProMotion
              </span>
              <span className="px-3 py-1 rounded-xl bg-neutral-900/80 border border-neutral-800">
                هيكل تيتانيوم مصقول
              </span>
            </div>
          </div>

          {/* Left column (Interactive 3D phone showcase card) */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              onMouseEnter={() => {
                setIsHovered(true);
                playHoverTick();
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${
                  isHovered ? 1.02 : 1
                }, ${isHovered ? 1.02 : 1}, 1)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
              }}
              className="relative w-full max-w-md rounded-3xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/50 p-6 shadow-2xl shadow-neutral-950 transition-colors select-none group"
            >
              {/* Dynamic specular light reflection */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none opacity-40 transition-opacity"
                style={{
                  background: `radial-gradient(circle at ${50 + tilt.y * 3}% ${
                    50 - tilt.x * 3
                  }%, rgba(245, 158, 11, 0.25) 0%, transparent 60%)`,
                }}
              />

              {/* Top tag & Quick Actions */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-neutral-950 shadow-xs shadow-amber-500/30">
                  {featuredProduct.badge || 'الأكثر فخامة'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      playClickSnap();
                      onToggleCompare(featuredProduct);
                    }}
                    onMouseEnter={playHoverTick}
                    className={`p-2 rounded-xl border text-xs transition cursor-pointer ${
                      isCompared
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-neutral-800/80 border-neutral-700 text-neutral-300 hover:text-white'
                    }`}
                    title={isCompared ? 'إزالة من المقارنة' : 'إضافة للمقارنة'}
                    aria-label="مقارنة هذا الجهاز"
                  >
                    <GitCompare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      playClickSnap();
                      onQuickView(featuredProduct);
                    }}
                    onMouseEnter={playHoverTick}
                    className="p-2 rounded-xl bg-neutral-800/80 border border-neutral-700 text-neutral-300 hover:text-white text-xs transition cursor-pointer"
                    title="معاينة المواصفات الكاملة"
                    aria-label="معاينة المواصفات الكاملة للجهاز"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Visual */}
              <div className="relative h-64 sm:h-72 w-full flex items-center justify-center my-2 overflow-hidden rounded-2xl bg-neutral-950/50">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.nameAr}
                  className="max-h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Touch / Hover hint */}
                <span className="absolute bottom-2 bg-neutral-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-amber-300/90 border border-neutral-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  حرّك الفأرة أو المس لاستشعار التصميم
                </span>
              </div>

              {/* Title & Price */}
              <div className="text-right mt-4 relative z-10">
                <div className="flex items-baseline justify-between mb-1">
                  <div className="text-left">
                    <span className="text-2xl font-black text-amber-400">
                      {formatCurrency(currentPrice, currency)}
                    </span>
                    {featuredProduct.originalPriceEGP && (
                      <span className="text-xs text-neutral-500 line-through mr-2 font-mono">
                        {formatCurrency(
                          featuredProduct.originalPriceEGP + selectedStorage.priceDiffEGP,
                          currency
                        )}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">{featuredProduct.nameAr}</h3>
                    <p className="text-xs text-neutral-400">{featuredProduct.name}</p>
                  </div>
                </div>

                {/* Color Swatch Picker */}
                <div className="mt-4 pt-3 border-t border-neutral-800/80">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-neutral-400">اللون المختار:</span>
                    <span className="text-neutral-200 font-semibold">{selectedColor.nameAr}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {featuredProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedColor(c);
                          playHoverTick();
                        }}
                        onMouseEnter={playHoverTick}
                        className={`h-7 w-7 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${
                          selectedColor.name === c.name
                            ? 'ring-2 ring-amber-400 scale-110'
                            : 'hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.nameAr}
                        aria-label={`اختيار لون ${c.nameAr}`}
                      >
                        {selectedColor.name === c.name && (
                          <Check className="w-3.5 h-3.5 text-neutral-900 drop-shadow-md stroke-[3]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage Selector */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-neutral-400">السعة التخزينية:</span>
                    <span className="text-neutral-200 font-semibold">{selectedStorage.capacity}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {featuredProduct.storageOptions.map((st) => (
                      <button
                        key={st.capacity}
                        onClick={() => {
                          setSelectedStorage(st);
                          playHoverTick();
                        }}
                        onMouseEnter={playHoverTick}
                        className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                          selectedStorage.capacity === st.capacity
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-neutral-800/60 border-neutral-700/60 text-neutral-400 hover:text-neutral-200'
                        }`}
                        aria-label={`سعة ${st.capacity}`}
                      >
                        {st.capacity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add To Cart CTA Button */}
                <button
                  onClick={() => {
                    playSuccessChime();
                    onAddToCart(featuredProduct, selectedColor, selectedStorage);
                  }}
                  onMouseEnter={playHoverTick}
                  className="w-full mt-5 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 transition duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  aria-label={`إضافة ${featuredProduct.nameAr} إلى السلة التجريبية`}
                >
                  <ShoppingCart className="w-4.5 h-4.5 text-neutral-950" />
                  <span>أضف للطلب التجريبي الآن</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
