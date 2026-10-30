import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  Eye,
  GitCompare,
  ShoppingCart,
  Zap,
  Camera,
  Battery,
  Cpu,
} from 'lucide-react';
import { Product, ProductColor, StorageOption } from '../types/store';
import { formatCurrency } from '../utils/storeLogic';
import { playClickSnap, playHoverTick, playSuccessChime } from '../utils/audio';

interface ProductCardProps {
  product: Product;
  currency: 'EGP' | 'SAR' | 'USD';
  onAddToCart: (product: Product, color: ProductColor, storage: StorageOption) => void;
  onQuickView: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onAddToCart,
  onQuickView,
  onToggleCompare,
  isCompared,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption>(product.storageOptions[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [addedRecently, setAddedRecently] = useState(false);

  const price = product.priceEGP + selectedStorage.priceDiffEGP;

  const handleAdd = () => {
    playSuccessChime();
    onAddToCart(product, selectedColor, selectedStorage);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1500);
  };

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        playHoverTick();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-3xl bg-neutral-900/70 border border-neutral-800 hover:border-amber-500/50 p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 text-right overflow-hidden select-none hover:-translate-y-1"
    >
      {/* Specular shimmer top highlight */}
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top row: Badge & Actions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          {product.badge ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {product.badge}
            </span>
          ) : (
            <span className="text-[11px] text-neutral-400 font-mono">
              {product.brand}
            </span>
          )}

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                playClickSnap();
                onToggleCompare(product);
              }}
              onMouseEnter={playHoverTick}
              className={`p-1.5 rounded-xl border text-xs transition cursor-pointer ${
                isCompared
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                  : 'bg-neutral-800/80 border-neutral-700/80 text-neutral-400 hover:text-white'
              }`}
              title={isCompared ? 'إلغاء المقارنة' : 'أضف لمقارنة الهواتف'}
              aria-label={`مقارنة ${product.nameAr}`}
            >
              <GitCompare className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                playClickSnap();
                onQuickView(product);
              }}
              onMouseEnter={playHoverTick}
              className="p-1.5 rounded-xl bg-neutral-800/80 border border-neutral-700/80 text-neutral-400 hover:text-white text-xs transition cursor-pointer"
              title="معاينة المواصفات السريعة"
              aria-label={`معاينة سريعة لـ ${product.nameAr}`}
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div
          onClick={() => {
            playClickSnap();
            onQuickView(product);
          }}
          className="relative h-48 w-full flex items-center justify-center rounded-2xl bg-neutral-950/40 p-3 mb-4 overflow-hidden cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.nameAr}
            className="max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.isNew && (
            <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-500 text-neutral-950 text-[10px] font-extrabold">
              جديد 2025
            </span>
          )}
        </div>

        {/* Title & Brand */}
        <h3
          onClick={() => {
            playClickSnap();
            onQuickView(product);
          }}
          className="text-base font-bold text-white hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
        >
          {product.nameAr}
        </h3>
        <p className="text-xs text-neutral-400 font-sans mb-3 line-clamp-1">{product.name}</p>

        {/* Specs highlights */}
        <div className="grid grid-cols-2 gap-1.5 mb-4 text-[11px] text-neutral-300">
          <div className="flex items-center gap-1 bg-neutral-950/50 px-2 py-1 rounded-lg border border-neutral-800/60 truncate">
            <Cpu className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">{product.specs.processor.split(' ')[0]} {product.specs.processor.split(' ')[1] || ''}</span>
          </div>
          <div className="flex items-center gap-1 bg-neutral-950/50 px-2 py-1 rounded-lg border border-neutral-800/60 truncate">
            <Battery className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">{product.specs.battery.split(' ')[0]} mAh</span>
          </div>
        </div>

        {/* Colors & Storage row */}
        <div className="space-y-2 mb-4 pt-2 border-t border-neutral-800/70">
          {/* Colors */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-neutral-400">اللون:</span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c);
                    playHoverTick();
                  }}
                  className={`h-4.5 w-4.5 rounded-full transition-transform cursor-pointer relative ${
                    selectedColor.name === c.name
                      ? 'ring-2 ring-amber-400 scale-110'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.nameAr}
                  aria-label={`اختيار لون ${c.nameAr}`}
                />
              ))}
            </div>
          </div>

          {/* Storage pills */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-neutral-400">السعة:</span>
            <div className="flex items-center gap-1">
              {product.storageOptions.map((st) => (
                <button
                  key={st.capacity}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStorage(st);
                    playHoverTick();
                  }}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition cursor-pointer border ${
                    selectedStorage.capacity === st.capacity
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                      : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-neutral-200'
                  }`}
                  aria-label={`اختيار سعة ${st.capacity}`}
                >
                  {st.capacity}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: Price & Add to Cart button */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <div className="text-left">
            <span className="text-lg font-black text-amber-400 font-sans">
              {formatCurrency(price, currency)}
            </span>
            {product.originalPriceEGP && (
              <span className="block text-[10px] text-neutral-500 line-through">
                {formatCurrency(product.originalPriceEGP + selectedStorage.priceDiffEGP, currency)}
              </span>
            )}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">متوفر فوري ✓</span>
        </div>

        <button
          onClick={handleAdd}
          onMouseEnter={playHoverTick}
          className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-md ${
            addedRecently
              ? 'bg-emerald-500 text-neutral-950 shadow-emerald-500/20'
              : 'bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 hover:shadow-amber-500/20 border border-neutral-700 hover:border-amber-500'
          }`}
          aria-label={`إضافة ${product.nameAr} إلى السلة`}
        >
          {addedRecently ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>تمت الإضافة بنجاح!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>إضافة للسلة</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
