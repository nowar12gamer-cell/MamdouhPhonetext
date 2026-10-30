import React from 'react';
import {
  Smartphone,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Heart,
  Code2,
  Phone,
  MapPin,
  Clock,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';
import { playClickSnap, playHoverTick } from '../utils/audio';

interface FooterProps {
  onOpenDemoNotice: () => void;
  onReplayLoader: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemoNotice, onReplayLoader }) => {
  return (
    <footer className="relative bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-right pt-12 pb-8 overflow-hidden select-none">
      {/* Subtle ambient light */}
      <div className="absolute bottom-0 right-1/3 w-96 h-48 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4">
        {/* Highlighted Banner for Demo & Abdullah Credit */}
        <div className="mb-12 p-6 rounded-3xl bg-gradient-to-r from-neutral-900 via-amber-950/20 to-neutral-900 border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Code2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  إشعار تجريبي
                </span>
                <span className="text-xs text-neutral-400 font-mono">نسخة العرض 2025</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                تجريبي، الموقع ده تجريبي • <span className="text-gradient-gold">تم صنع هذا الموقع بواسطة عبد الله</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                تم تصميم وتطوير متجر ممدوح للموبايلات مع تجربة لمس حريرية، ومحاكاة صوتية تفاعلية، ومقارنة هواتف احترافية.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={() => {
                playClickSnap();
                onOpenDemoNotice();
              }}
              onMouseEnter={playHoverTick}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs shadow-md shadow-amber-500/20 transition cursor-pointer"
              aria-label="عرض تفاصيل التنبيه والمطور"
            >
              عرض تفاصيل الإشعار
            </button>
            <button
              onClick={() => {
                playClickSnap();
                onReplayLoader();
              }}
              onMouseEnter={playHoverTick}
              className="px-3.5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-medium border border-neutral-700 transition cursor-pointer flex items-center gap-1.5"
              title="إعادة تشغيل شريط التحميل الترحيبي"
              aria-label="إعادة شاشة التحميل"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>إعادة التحميل</span>
            </button>
          </div>
        </div>

        {/* 4 columns store info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-amber-500/40">
                <Smartphone className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white">متجر ممدوح</span>
                <span className="block text-[10px] text-amber-400 font-medium">MAMDOUH PHONES</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              وجهتكم الأولى في مصر والعالم العربي لأحدث الهواتف الذكية الأصلية. نجمع بين الأسعار التنافسية واللمسة الفاخرة المريحة لعملائنا الكرام.
            </p>
            <div className="pt-2 text-xs text-neutral-300 space-y-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono">الخط الساخن: 19800 (ممدوح فون)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>يومياً من 10 صباحاً حتى 11 مساءً</span>
              </div>
            </div>
          </div>

          {/* Col 2: Famous Categories */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>أقسام الهواتف في ممدوح</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="hover:text-amber-400 transition cursor-pointer">سلسلة آبل آيفون 16 و16 برو ماكس</li>
              <li className="hover:text-amber-400 transition cursor-pointer">سامسونج جالكسي S25 الترا و Z Fold 6</li>
              <li className="hover:text-amber-400 transition cursor-pointer">شاومي 15 ألترا بكاميرات لايكا الألمانية</li>
              <li className="hover:text-amber-400 transition cursor-pointer">جوجل بكسل 9 برو XL بنظام الذكاء الاصطناعي</li>
              <li className="hover:text-amber-400 transition cursor-pointer">إكسسوارات وسماعات وساعات ألترا أصلية</li>
            </ul>
          </div>

          {/* Col 3: Branches */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>فروع متجر ممدوح</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <strong className="text-white block">فرع المهندسين (الرئيسي):</strong>
                <span className="text-neutral-400">شارع جامعة الدول العربية، أمام نادي الصيد</span>
              </li>
              <li>
                <strong className="text-white block">فرع مدينة نصر:</strong>
                <span className="text-neutral-400">شارع عباس العقاد، بجوار سيتي ستارز</span>
              </li>
              <li>
                <strong className="text-white block">فرع التجمع الخامس:</strong>
                <span className="text-neutral-400">الداون تاون مول، مبنى S2</span>
              </li>
              <li>
                <strong className="text-white block">فرع الإسكندرية:</strong>
                <span className="text-neutral-400">طريق الكورنيش، لوران</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Guarantees */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ضمانات متجر ممدوح</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="font-bold text-neutral-200 block mb-0.5">ضمان ممدوح الذهبي 24 شهر</span>
                <span className="text-neutral-400 text-[11px]">ضمان صيانة شامل مع قطع غيار أصلية 100%.</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="font-bold text-neutral-200 block mb-0.5">حق استبدال خلال 14 يوماً</span>
                <span className="text-neutral-400 text-[11px]">في حالة وجود أي عيب مصنعي أو استبدال بلون آخر.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Abdullah credit signature */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} متجر ممدوح للموبايلات. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-amber-500/30 text-amber-300">
            <span>تم صنع هذا الموقع بواسطة</span>
            <strong className="text-white font-bold">عبد الله</strong>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
