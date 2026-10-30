import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import { CartItem } from '../types/store';
import { calculateCartTotals, formatCurrency, validateDiscountCode } from '../utils/storeLogic';
import { playClickSnap, playHoverTick, playSuccessChime } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  currency: 'EGP' | 'SAR' | 'USD';
  onProceedToCheckout: (appliedCode: string) => void;
  appliedPromoCode: string;
  onApplyPromoCode: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency,
  onProceedToCheckout,
  appliedPromoCode,
  onApplyPromoCode,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState(appliedPromoCode || '');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const totals = calculateCartTotals(items, appliedPromoCode);

  const handleApplyPromo = () => {
    playClickSnap();
    if (!promoInput.trim()) {
      setPromoError('يرجى إدخال كود الخصم');
      return;
    }
    const res = validateDiscountCode(promoInput);
    if (res.valid) {
      onApplyPromoCode(promoInput.trim().toUpperCase());
      setPromoMessage(`${res.description}`);
      setPromoError(null);
      playSuccessChime();
    } else {
      setPromoError('كود الخصم غير صحيح. جرب كود ABDULLAH أو MAMDOUH');
      setPromoMessage(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in"
    >
      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-r border-neutral-800 text-neutral-100 flex flex-col text-right shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
            <button
              onClick={() => {
                playClickSnap();
                onClose();
              }}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
              aria-label="إغلاق سلة المشتريات"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <h2 id="cart-drawer-title" className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <span>سلة المشتريات ({items.length})</span>
              </h2>
            </div>
            {items.length > 0 && (
              <button
                onClick={() => {
                  playClickSnap();
                  onClearCart();
                }}
                className="text-xs text-red-400 hover:text-red-300 cursor-pointer"
                aria-label="إفراغ السلة"
              >
                إفراغ
              </button>
            )}
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {items.length === 0 ? (
              <div className="py-20 text-center text-neutral-400">
                <ShoppingBag className="w-16 h-16 mx-auto text-neutral-700 mb-4" />
                <p className="text-base font-bold text-neutral-200">سلة التسوق فارغة حالياً</p>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                  استكشف أحدث الهواتف الذكية في متجر ممدوح وأضف ما يعجبك بلمسة حريرية.
                </p>
                <button
                  onClick={() => {
                    playClickSnap();
                    onClose();
                  }}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs shadow-md shadow-amber-500/20 cursor-pointer"
                >
                  تصفح المنتجات الآن
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 items-center justify-between"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.nameAr}
                    className="w-16 h-16 object-contain rounded-xl bg-neutral-900 p-1 shrink-0"
                  />

                  <div className="flex-1 min-w-0 pr-1">
                    <h4 className="text-xs font-bold text-white truncate">{item.product.nameAr}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-1">
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-neutral-600"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.nameAr}
                      </span>
                      <span>•</span>
                      <span className="font-mono text-neutral-300">{item.selectedStorage.capacity}</span>
                    </div>
                    <span className="text-xs font-black text-amber-400 mt-1 block">
                      {formatCurrency(item.unitPriceEGP * item.quantity, currency)}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => {
                        playClickSnap();
                        onRemoveItem(item.id);
                      }}
                      className="p-1 text-neutral-500 hover:text-red-400 transition cursor-pointer"
                      title="حذف من السلة"
                      aria-label={`حذف ${item.product.nameAr} من السلة`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center rounded-lg bg-neutral-800 border border-neutral-700 p-0.5">
                      <button
                        onClick={() => {
                          playClickSnap();
                          onUpdateQuantity(item.id, item.quantity - 1);
                        }}
                        className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                        aria-label="تقليل الكمية"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-white font-mono">{item.quantity}</span>
                      <button
                        onClick={() => {
                          playClickSnap();
                          onUpdateQuantity(item.id, item.quantity + 1);
                        }}
                        className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                        aria-label="زيادة الكمية"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Totals */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950/80 space-y-3">
              {/* Promo code box */}
              <div className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="كود الخصم (جرب ABDULLAH)"
                    className="flex-1 bg-neutral-900 text-xs text-white rounded-xl px-3 py-2 border border-neutral-800 focus:outline-none focus:border-amber-500/70 uppercase"
                    aria-label="إدخال كود الخصم"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 cursor-pointer"
                    aria-label="تطبيق كود الخصم"
                  >
                    تطبيق
                  </button>
                </div>
                {promoMessage && (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {promoMessage}
                  </p>
                )}
                {promoError && <p className="text-[11px] text-red-400">{promoError}</p>}
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800/80">
                <div className="flex justify-between">
                  <span className="text-neutral-400">المجموع الفرعي:</span>
                  <span className="font-semibold">{formatCurrency(totals.subtotal, currency)}</span>
                </div>
                {totals.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>الخصم ({totals.discountPercent}%):</span>
                    <span>- {formatCurrency(totals.discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-400">الشحن والتوصيل:</span>
                  <span>{totals.shipping === 0 ? 'مجاني (للطلبات فوق 15,000 ج.م)' : formatCurrency(totals.shipping, currency)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-neutral-800">
                  <span>الإجمالي النهائي:</span>
                  <span className="text-amber-400 font-sans">{formatCurrency(totals.finalTotal, currency)}</span>
                </div>
              </div>

              {/* Checkout button */}
              <button
                onClick={() => {
                  playClickSnap();
                  onProceedToCheckout(appliedPromoCode);
                }}
                onMouseEnter={playHoverTick}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                aria-label="إتمام الطلب التجريبي"
              >
                <span>متابعة إتمام الطلب التجريبي</span>
                <ArrowRight className="w-4 h-4 text-neutral-950" />
              </button>

              <div className="text-center pt-1">
                <span className="text-[10px] text-neutral-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  موقع تجريبي • تم برمجته بواسطة عبد الله لمتجر ممدوح
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
