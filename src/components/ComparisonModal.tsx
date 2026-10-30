import React from 'react';
import { X, GitCompare, ShoppingCart, Trash2, CheckCircle2 } from 'lucide-react';
import { Product } from '../types/store';
import { formatCurrency } from '../utils/storeLogic';
import { playClickSnap, playHoverTick, playSuccessChime } from '../utils/audio';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemove: (productId: string) => void;
  onClear: () => void;
  currency: 'EGP' | 'SAR' | 'USD';
  onAddToCart: (product: Product) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  products,
  onRemove,
  onClear,
  currency,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
    >
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col text-right">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
          <button
            onClick={() => {
              playClickSnap();
              onClose();
            }}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
            aria-label="إغلاق نافذة المقارنة"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div>
              <h2 id="comparison-title" className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-amber-400" />
                <span>مقارنة الهواتف الذكية في متجر ممدوح</span>
              </h2>
              <p className="text-xs text-neutral-400">قارن بين أحدث الأجهزة لاختيار الهاتف الأنسب لك</p>
            </div>
          </div>

          {products.length > 0 && (
            <button
              onClick={() => {
                playClickSnap();
                onClear();
              }}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
              aria-label="مسح جميع الهواتف من المقارنة"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">مسح الكل</span>
            </button>
          )}
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {products.length === 0 ? (
            <div className="py-16 text-center text-neutral-400">
              <GitCompare className="w-12 h-12 mx-auto text-neutral-600 mb-3" />
              <p className="text-base font-semibold text-neutral-200">لم تقم بإضافة أي هاتف للمقارنة بعد</p>
              <p className="text-xs text-neutral-500 mt-1 max-w-md mx-auto">
                اضغط على أيقونة المقارنة في أي كارت هاتف لإضافته هنا ومقارنة الشاشة والمعالج والكاميرات والبطارية جنباً إلى جنب.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="p-3 text-right text-xs font-semibold text-neutral-400 w-36">
                      المواصفات
                    </th>
                    {products.map((p) => (
                      <th key={p.id} className="p-3 text-center align-top min-w-[200px]">
                        <div className="relative flex flex-col items-center">
                          <button
                            onClick={() => {
                              playClickSnap();
                              onRemove(p.id);
                            }}
                            className="absolute -top-1 -right-1 p-1 rounded-full bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition"
                            title="إزالة من المقارنة"
                            aria-label={`إزالة ${p.nameAr} من المقارنة`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <img
                            src={p.image}
                            alt={p.nameAr}
                            className="h-28 object-contain mb-2 filter drop-shadow-md"
                          />
                          <span className="font-bold text-white text-sm line-clamp-1">{p.nameAr}</span>
                          <span className="text-amber-400 font-extrabold text-sm mt-1">
                            {formatCurrency(p.priceEGP, currency)}
                          </span>
                          <button
                            onClick={() => {
                              playSuccessChime();
                              onAddToCart(p);
                            }}
                            onMouseEnter={playHoverTick}
                            className="mt-2.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
                            aria-label={`شراء ${p.nameAr}`}
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>أضف للسلة</span>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-xs">
                  <tr>
                    <td className="p-3 font-semibold text-neutral-400 bg-neutral-950/40">الشاشة</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 text-center text-neutral-200">
                        {p.specs.screen}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-400 bg-neutral-950/40">المعالج</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 text-center text-amber-300 font-semibold">
                        {p.specs.processor}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-400 bg-neutral-950/40">الكاميرات</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 text-center text-neutral-200">
                        {p.specs.camera}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-400 bg-neutral-950/40">البطارية والتحمل</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 text-center text-neutral-200">
                        {p.specs.battery}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-400 bg-neutral-950/40">الرام والذاكرة</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 text-center text-neutral-200">
                        {p.specs.ram}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-400 bg-neutral-950/40">الشحن والمنافذ</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 text-center text-neutral-200">
                        {p.specs.charging}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-400 bg-neutral-950/40">نظام التشغيل</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 text-center text-neutral-200">
                        {p.specs.os}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-neutral-400 bg-neutral-950/40">الضمان المعتمد</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 text-center text-emerald-400 font-semibold">
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          ضمان ممدوح سنتين
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
