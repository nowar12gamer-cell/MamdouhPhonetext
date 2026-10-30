import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
} from 'lucide-react';
import { CartItem } from '../types/store';
import { calculateCartTotals, formatCurrency } from '../utils/storeLogic';
import { playClickSnap, playSuccessChime } from '../utils/audio';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'EGP' | 'SAR' | 'USD';
  appliedPromoCode: string;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  appliedPromoCode,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const totals = calculateCartTotals(items, appliedPromoCode);

  const [formData, setFormData] = useState({
    name: 'عميل متجر ممدوح التجريبي',
    phone: '01012345678',
    city: 'القاهرة - المهندسين',
    address: 'شارع جامعة الدول العربية، عمارة 15',
    paymentMethod: 'cod', // 'cod' | 'instapay' | 'card'
    notes: 'يرجى الاتصال قبل الوصول للتوصيل الحريري',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied] = useState(false);
  const [submittedTotal, setSubmittedTotal] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessChime();
    const generatedId = 'MAMDOUH-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setSubmittedTotal(totals.finalTotal);
    setIsSubmitted(true);
    onOrderSuccess();
  };

  const handleCopyReceipt = () => {
    playClickSnap();
    const receiptText = `طلب تجريبي من متجر ممدوح للموبايلات\nرقم الطلب: ${orderId}\nالعميل: ${formData.name}\nالهاتف: ${formData.phone}\nالعنوان: ${formData.city} - ${formData.address}\nإجمالي المبلغ: ${formatCurrency(submittedTotal, currency)}\nطريقة الدفع: ${formData.paymentMethod === 'cod' ? 'الدفع عند الاستلام' : 'إنستاباي / كاش'}\nتم صنع هذا الموقع التجريبي بواسطة عبد الله`;
    navigator.clipboard.writeText(receiptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWhatsAppShare = () => {
    playClickSnap();
    const msg = encodeURIComponent(
      `مرحباً متجر ممدوح للموبايلات، تم إرسال طلب تجريبي جديد:\n- رقم الطلب: ${orderId}\n- الاسم: ${formData.name}\n- الهاتف: ${formData.phone}\n- العنوان: ${formData.city}\n- الإجمالي: ${formatCurrency(submittedTotal, currency)}\n- صُنع هذا الموقع بواسطة عبد الله`
    );
    window.open(`https://wa.me/201000000000?text=${msg}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col text-right">
        {/* Close Button */}
        <button
          onClick={() => {
            playClickSnap();
            onClose();
          }}
          className="absolute top-4 left-4 z-10 p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition cursor-pointer"
          aria-label="إغلاق نافذة إتمام الطلب"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          // Order Placed Confirmation View
          <div className="p-6 sm:p-10 text-center overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-9 h-9" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-3">
              طلب تجريبي ناجح 100%
            </span>

            <h2 id="checkout-modal-title" className="text-2xl sm:text-3xl font-black text-white mb-2">
              تهانينا! تم تسجيل طلبك التجريبي بنجاح
            </h2>

            <div className="p-4 my-4 rounded-2xl bg-amber-950/40 border border-amber-600/40 text-right space-y-2">
              <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                تنبيه: تجريبي، الموقع ده تجريبي
              </p>
              <p className="text-xs text-neutral-300 leading-relaxed">
                هذا المتجر مخصص للعرض والمحاكاة التفاعلية لمتجر ممدوح للموبايلات، وقد تم تصميم وتطوير وبرمجة كافة وظائفه بالكامل{' '}
                <strong className="text-white font-bold underline">بواسطة المطور عبد الله</strong>.
              </p>
            </div>

            <div className="bg-neutral-950 rounded-2xl p-4 border border-neutral-800 text-right space-y-2 mb-6 text-xs">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">رقم الطلب التجريبي:</span>
                <span className="font-mono font-bold text-amber-400">{orderId}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">المستلم:</span>
                <span className="font-semibold text-white">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">العنوان:</span>
                <span className="text-neutral-200">{formData.city}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-bold">
                <span className="text-neutral-300">الإجمالي النهائي:</span>
                <span className="text-amber-400 font-sans">{formatCurrency(submittedTotal, currency)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopyReceipt}
                className="flex-1 py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-neutral-700 cursor-pointer"
                aria-label="نسخ بيانات الفاتورة التجريبية"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم النسخ للحافظة!' : 'نسخ الفاتورة'}</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
                aria-label="مشاركة الطلب على واتساب ممدوح"
              >
                <MessageCircle className="w-4 h-4" />
                <span>مشاركة على واتساب ممدوح</span>
              </button>
            </div>

            <button
              onClick={() => {
                playClickSnap();
                onClose();
              }}
              className="mt-4 text-xs text-neutral-400 hover:text-white underline cursor-pointer"
            >
              العودة للتسوق في متجر ممدوح
            </button>
          </div>
        ) : (
          // Checkout Form View
          <div className="p-6 sm:p-8 overflow-y-auto">
            <div className="mb-6">
              <h2 id="checkout-modal-title" className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Truck className="w-6 h-6 text-amber-400" />
                <span>إتمام الطلب التجريبي - متجر ممدوح</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                املأ البيانات لتجربة عملية الشراء الحريرية وسرعة معالجة الطلبات
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customer-name" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    الاسم الكامل *
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-950 text-xs text-white rounded-xl px-3.5 py-2.5 border border-neutral-800 focus:outline-none focus:border-amber-500"
                    placeholder="محمد ممدوح"
                  />
                </div>

                <div>
                  <label htmlFor="customer-phone" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    رقم الهاتف المحمول *
                  </label>
                  <input
                    id="customer-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-950 text-xs text-white rounded-xl px-3.5 py-2.5 border border-neutral-800 focus:outline-none focus:border-amber-500 text-left font-mono"
                    placeholder="01012345678"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="customer-city" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  المدينة والمحافظة *
                </label>
                <input
                  id="customer-city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-neutral-950 text-xs text-white rounded-xl px-3.5 py-2.5 border border-neutral-800 focus:outline-none focus:border-amber-500"
                  placeholder="القاهرة - المعادي"
                />
              </div>

              <div>
                <label htmlFor="customer-address" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  العنوان بالتفصيل *
                </label>
                <input
                  id="customer-address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-neutral-950 text-xs text-white rounded-xl px-3.5 py-2.5 border border-neutral-800 focus:outline-none focus:border-amber-500"
                  placeholder="اسم الشارع، رقم العمارة، رقم الشقة"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">
                  طريقة الدفع المفضلة
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playClickSnap();
                      setFormData({ ...formData, paymentMethod: 'cod' });
                    }}
                    className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                      formData.paymentMethod === 'cod'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Banknote className="w-5 h-5 mb-0.5" />
                    <span className="text-xs font-bold">عند الاستلام</span>
                    <span className="text-[10px] text-neutral-500">معاينة قبل الدفع</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playClickSnap();
                      setFormData({ ...formData, paymentMethod: 'instapay' });
                    }}
                    className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                      formData.paymentMethod === 'instapay'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mb-0.5 text-purple-400" />
                    <span className="text-xs font-bold">إنستاباي / كاش</span>
                    <span className="text-[10px] text-neutral-500">تحويل فوري</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playClickSnap();
                      setFormData({ ...formData, paymentMethod: 'card' });
                    }}
                    className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                      formData.paymentMethod === 'card'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-0.5 text-cyan-400" />
                    <span className="text-xs font-bold">بطاقة بنكية</span>
                    <span className="text-[10px] text-neutral-500">فيزا / ماستركارد</span>
                  </button>
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs space-y-1.5">
                <div className="flex justify-between text-neutral-400">
                  <span>عدد الأجهزة المطلوبة:</span>
                  <span className="text-white font-mono">{items.reduce((a, b) => a + b.quantity, 0)} قطعة</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-white pt-1 border-t border-neutral-800">
                  <span>المبلغ المستحق للدفع:</span>
                  <span className="text-amber-400 font-sans">{formatCurrency(totals.finalTotal, currency)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-neutral-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                aria-label="تأكيد الطلب التجريبي الآن"
              >
                <ShieldCheck className="w-4.5 h-4.5" />
                <span>تأكيد الطلب التجريبي في متجر ممدوح</span>
              </button>

              <p className="text-[11px] text-center text-neutral-500">
                موقع تجريبي • تم تصميمه وصنعه بواسطة عبد الله
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
