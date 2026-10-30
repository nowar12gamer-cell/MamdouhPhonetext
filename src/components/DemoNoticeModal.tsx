import React from 'react';
import { AlertCircle, CheckCircle, Code2, Sparkles, X, Heart } from 'lucide-react';
import { playClickSnap, playSuccessChime } from '../utils/audio';

interface DemoNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyAbdullahCode?: () => void;
}

export const DemoNoticeModal: React.FC<DemoNoticeModalProps> = ({
  isOpen,
  onClose,
  onApplyAbdullahCode,
}) => {
  if (!isOpen) return null;

  const handleEnter = () => {
    playClickSnap();
    onClose();
  };

  const handleApplyGift = () => {
    playSuccessChime();
    if (onApplyAbdullahCode) {
      onApplyAbdullahCode();
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-notice-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-neutral-900 border border-amber-500/40 p-6 sm:p-8 shadow-2xl shadow-amber-500/20 text-right">
        {/* Decorative ambient glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close icon button */}
        <button
          onClick={handleEnter}
          className="absolute top-4 left-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-800/80 hover:bg-neutral-800 transition cursor-pointer"
          aria-label="إغلاق التنبيه والدخول للمتجر"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Badge */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <AlertCircle className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Sparkles className="w-3.5 h-3.5" />
              تنبيه مهم للزوار
            </span>
            <p className="text-xs text-neutral-400 mt-1">متجر ممدوح للموبايلات الفاخرة</p>
          </div>
        </div>

        {/* Main text mandated by user */}
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-600/30">
            <h2 id="demo-notice-title" className="text-xl sm:text-2xl font-bold text-amber-200 mb-2">
              تجريبي، الموقع ده تجريبي
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              نلفت انتباهكم الكريمة أن هذا الموقع الإلكتروني هو{' '}
              <strong className="text-white font-semibold">موقع تجريبي</strong> تم بناؤه بأعلى معايير التصميم
              والتفاعل الحريري لعرض هواتف متجر ممدوح الذكية.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-800/70 border border-neutral-700/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-medium">بصمة المطور</p>
                <h3 className="text-lg font-bold text-gradient-gold">
                  تم صنع هذا الموقع بواسطة عبد الله
                </h3>
              </div>
            </div>
            <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed pr-2 border-r-2 border-amber-500/40">
              تمت البرمجة والتصميم خصيصاً لمتجر ممدوح مع ميزات تفاعلية متطورة، ولمسة حريرية ملموسة،
              ومحاكي صوتي tactile، ومقارنة هواتف فورية وسلة تسوق ذكية.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleApplyGift}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
            aria-label="تفعيل كود عبد الله ودخول المتجر"
          >
            <CheckCircle className="w-4 h-4 text-neutral-950" />
            <span>تفعيل كود عبد الله (15% خصم)</span>
          </button>

          <button
            onClick={handleEnter}
            className="w-full sm:w-auto py-3 px-5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-sm transition cursor-pointer border border-neutral-700 hover:border-neutral-600"
            aria-label="استكشاف متجر ممدوح"
          >
            استكشاف المتجر الآن
          </button>
        </div>

        {/* Footer note */}
        <div className="mt-4 text-center">
          <p className="text-[11px] text-neutral-500 flex items-center justify-center gap-1.5">
            <span>صُنع بشغف وإتقان</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            <span>بواسطة عبد الله لصالح متجر ممدوح</span>
          </p>
        </div>
      </div>
    </div>
  );
};
