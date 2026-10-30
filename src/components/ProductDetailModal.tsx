import React, { useState } from 'react';
import {
  X,
  Check,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  PhoneCall,
  MessageCircle,
  Plus,
  Minus,
} from 'lucide-react';
import { Product, ProductColor, StorageOption } from '../types/store';
import { formatCurrency } from '../utils/storeLogic';
import { playClickSnap, playHoverTick, playSuccessChime } from '../utils/audio';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  currency: 'EGP' | 'SAR' | 'USD';
  onAddToCart: (
    product: Product,
    color: ProductColor,
    storage: StorageOption,
    quantity: number
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  currency,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption>(product.storageOptions[0]);
  const [quantity, setQuantity] = useState(1);

  const price = product.priceEGP + selectedStorage.priceDiffEGP;
  const totalPrice = price * quantity;

  const handleAdd = () => {
    playSuccessChime();
    onAddToCart(product, selectedColor, selectedStorage, quantity);
    onClose();
  };

  const handleWhatsAppOrder = () => {
    playClickSnap();
    const msg = encodeURIComponent(
      `مرحباً متجر ممدوح للموبايلات، أود الاستفسار وطلب الهاتف التالي:\n- الجهاز: ${product.nameAr} (${product.name})\n- اللون: ${selectedColor.nameAr}\n- السعة: ${selectedStorage.capacity}\n- الكمية: ${quantity}\n- السعر الإجمالي: ${formatCurrency(totalPrice, currency)}\n(تم الإرسال من موقع متجر ممدوح التجريبي المبرمج بواسطة عبد الله)`
    );
    // WhatsApp link with simulated hotline
    window.open(`https://wa.me/201000000000?text=${msg}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col text-right">
        {/* Close button */}
        <button
          onClick={() => {
            playClickSnap();
            onClose();
          }}
          className="absolute top-4 left-4 z-10 p-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
          aria-label="إغلاق تفاصيل المنتج"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable container */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Image side */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full h-72 sm:h-80 rounded-2xl bg-neutral-950/60 p-4 flex items-center justify-center border border-neutral-800/80">
                <img
                  src={product.image}
                  alt={product.nameAr}
                  className="max-h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                />
                {product.badge && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-neutral-950 shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Guarantees mini pills */}
              <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center">
                <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span>ضمان ممدوح سنتين</span>
                </div>
                <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-300">
                  <Truck className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span>شحن سريع ومؤمن</span>
                </div>
                <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-300">
                  <RotateCcw className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <span>استرجاع 14 يوم</span>
                </div>
              </div>
            </div>

            {/* Info side */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  {product.brand} • متجر ممدوح
                </span>
                <h2 id="product-detail-title" className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {product.nameAr}
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">{product.name}</p>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-amber-400 font-sans">
                    {formatCurrency(totalPrice, currency)}
                  </span>
                  {product.originalPriceEGP && (
                    <span className="text-sm text-neutral-500 line-through">
                      {formatCurrency(
                        (product.originalPriceEGP + selectedStorage.priceDiffEGP) * quantity,
                        currency
                      )}
                    </span>
                  )}
                  {quantity > 1 && (
                    <span className="text-xs text-neutral-400">
                      ({formatCurrency(price, currency)} للقطعة)
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {product.descriptionAr}
              </p>

              {/* Color options */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-neutral-400">اختر اللون:</span>
                  <span className="text-white font-semibold">{selectedColor.nameAr}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColor(c);
                        playHoverTick();
                      }}
                      className={`h-8 w-8 rounded-full transition-transform cursor-pointer relative flex items-center justify-center ${
                        selectedColor.name === c.name
                          ? 'ring-2 ring-amber-400 scale-110'
                          : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.nameAr}
                      aria-label={`اختيار لون ${c.nameAr}`}
                    >
                      {selectedColor.name === c.name && (
                        <Check className="w-4 h-4 text-neutral-900 stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage options */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-neutral-400">اختر السعة التخزينية:</span>
                  <span className="text-white font-semibold">{selectedStorage.capacity}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {product.storageOptions.map((st) => (
                    <button
                      key={st.capacity}
                      onClick={() => {
                        setSelectedStorage(st);
                        playHoverTick();
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                        selectedStorage.capacity === st.capacity
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-xs'
                          : 'bg-neutral-800/80 border-neutral-700 text-neutral-400 hover:text-white'
                      }`}
                      aria-label={`سعة ${st.capacity}`}
                    >
                      {st.capacity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-neutral-400">الكمية المطلوبة:</span>
                <div className="flex items-center rounded-xl bg-neutral-800 border border-neutral-700 p-1">
                  <button
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                        playClickSnap();
                      }
                    }}
                    disabled={quantity <= 1}
                    className="p-1 rounded-lg text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    aria-label="تقليل الكمية"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 font-bold text-sm text-white font-mono">{quantity}</span>
                  <button
                    onClick={() => {
                      if (quantity < 10) {
                        setQuantity(quantity + 1);
                        playClickSnap();
                      }
                    }}
                    disabled={quantity >= 10}
                    className="p-1 rounded-lg text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer"
                    aria-label="زيادة الكمية"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="space-y-2.5 pt-4 border-t border-neutral-800">
                <button
                  onClick={handleAdd}
                  onMouseEnter={playHoverTick}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  aria-label="إضافة المنتج للسلة"
                >
                  <ShoppingCart className="w-4.5 h-4.5 text-neutral-950" />
                  <span>إضافة للسلة ({formatCurrency(totalPrice, currency)})</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                  aria-label="طلب عبر واتساب ممدوح"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>طلب مباشر عبر واتساب ممدوح</span>
                </button>
              </div>

              {/* Key specs details */}
              <div className="pt-4 border-t border-neutral-800">
                <h4 className="text-xs font-bold text-neutral-300 mb-2">المواصفات التقنية للهاتف:</h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800/80">
                    <span className="text-neutral-500 block">الشاشة:</span>
                    <span className="text-neutral-200">{product.specs.screen}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800/80">
                    <span className="text-neutral-500 block">المعالج:</span>
                    <span className="text-amber-400 font-semibold">{product.specs.processor}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800/80">
                    <span className="text-neutral-500 block">الكاميرا:</span>
                    <span className="text-neutral-200">{product.specs.camera}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800/80">
                    <span className="text-neutral-500 block">البطارية:</span>
                    <span className="text-neutral-200">{product.specs.battery}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
