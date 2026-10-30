import React, { useState } from 'react';
import {
  Sparkles,
  Camera,
  Check,
  ShoppingCart,
  Sliders,
  Volume2,
  ShieldCheck,
  Palette,
  RotateCw,
} from 'lucide-react';
import { Product, ProductColor, StorageOption } from '../types/store';
import { formatCurrency } from '../utils/storeLogic';
import { playClickSnap, playHoverTick, playSuccessChime } from '../utils/audio';

interface PhoneCustomizerSectionProps {
  product: Product;
  currency: 'EGP' | 'SAR' | 'USD';
  onAddToCart: (product: Product, color: ProductColor, storage: StorageOption) => void;
}

export const PhoneCustomizerSection: React.FC<PhoneCustomizerSectionProps> = ({
  product,
  currency,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption>(product.storageOptions[0]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [cameraButtonFeedback, setCameraButtonFeedback] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const price = product.priceEGP + selectedStorage.priceDiffEGP;

  const handleSimulateCameraControl = () => {
    playClickSnap();
    setCameraButtonFeedback(true);
    setZoomLevel((prev) => (prev >= 5 ? 1 : prev + 1));
    setTimeout(() => setCameraButtonFeedback(false), 300);
  };

  return (
    <section className="py-14 bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-neutral-950 border-y border-neutral-800/80 text-right select-none">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold mb-3 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تجربة تفاعلية حريرية في متجر ممدوح</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
            استوديو تخصيص الهاتف واللمس الحريري
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            جرّب لمس الهاتف، وتدوير الزوايا، وتغيير ألوان التيتانيوم ومحاكاة زر التحكم الجديد بالكاميرا.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Interactive Phone Stage */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-md h-80 sm:h-96 rounded-3xl bg-neutral-950/80 border border-neutral-800 p-6 flex items-center justify-center overflow-hidden shadow-2xl group">
              {/* Dynamic glow corresponding to selected color */}
              <div
                className="absolute inset-0 opacity-20 blur-3xl transition-colors duration-500"
                style={{ backgroundColor: selectedColor.hex }}
              />

              {/* The Phone Image with Interactive Rotation */}
              <div
                style={{
                  transform: `rotate(${rotationAngle}deg) scale(${1 + (zoomLevel - 1) * 0.05})`,
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="relative z-10 flex items-center justify-center h-full"
              >
                <img
                  src={product.image}
                  alt={product.nameAr}
                  className="max-h-64 sm:max-h-72 object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
                />
              </div>

              {/* Camera zoom overlay indicator */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs text-amber-300 border border-neutral-700">
                <Camera className="w-3.5 h-3.5" />
                <span>تقريب بصري {zoomLevel}x</span>
              </div>

              {/* 360 Rotation Control Bar */}
              <div className="absolute bottom-4 inset-x-6 z-20 flex items-center justify-between bg-neutral-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-neutral-800 text-xs">
                <span className="text-neutral-400 text-[11px] flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                  زاوية العرض:
                </span>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={rotationAngle}
                  onChange={(e) => {
                    setRotationAngle(Number(e.target.value));
                    playHoverTick();
                  }}
                  className="w-36 accent-amber-500 cursor-pointer"
                  aria-label="تدوير زاوية الهاتف"
                />
                <span className="font-mono text-amber-400 text-xs">{rotationAngle}°</span>
              </div>
            </div>

            {/* Camera Control Haptic Button Simulator */}
            <div className="mt-4 w-full max-w-md p-3.5 rounded-2xl bg-neutral-900/70 border border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">زر Camera Control الحريري</span>
                <span className="text-[10px] text-neutral-400">انقر لتجربة الضغط التكتيكي والصوتي</span>
              </div>

              <button
                onClick={handleSimulateCameraControl}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  cameraButtonFeedback
                    ? 'bg-amber-400 text-neutral-950 scale-95 shadow-md shadow-amber-400/50'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/30'
                }`}
                aria-label="تجربة نقرة زر الكاميرا"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>اضغط للالتقاط</span>
              </button>
            </div>
          </div>

          {/* Controls & Selection Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-xl space-y-5">
              <div>
                <span className="text-xs font-semibold text-amber-400">تخصيص متجر ممدوح</span>
                <h3 className="text-xl font-bold text-white mt-1">{product.nameAr}</h3>
                <span className="text-2xl font-black text-amber-400 font-sans block mt-2">
                  {formatCurrency(price, currency)}
                </span>
              </div>

              {/* Colors */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-neutral-400 flex items-center gap-1">
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                    خامة ولون التيتانيوم:
                  </span>
                  <span className="text-white font-bold">{selectedColor.nameAr}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColor(c);
                        playClickSnap();
                      }}
                      onMouseEnter={playHoverTick}
                      className={`h-9 w-9 rounded-full transition-all cursor-pointer relative flex items-center justify-center ${
                        selectedColor.name === c.name
                          ? 'ring-2 ring-amber-400 scale-110 shadow-lg'
                          : 'opacity-70 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.nameAr}
                      aria-label={`تحديد لون ${c.nameAr}`}
                    >
                      {selectedColor.name === c.name && (
                        <Check className="w-4 h-4 text-neutral-900 stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-neutral-400 flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                    سعة التخزين:
                  </span>
                  <span className="text-white font-bold">{selectedStorage.capacity}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {product.storageOptions.map((st) => (
                    <button
                      key={st.capacity}
                      onClick={() => {
                        setSelectedStorage(st);
                        playClickSnap();
                      }}
                      onMouseEnter={playHoverTick}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        selectedStorage.capacity === st.capacity
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-xs'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                      aria-label={`سعة ${st.capacity}`}
                    >
                      {st.capacity}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  playSuccessChime();
                  onAddToCart(product, selectedColor, selectedStorage);
                }}
                onMouseEnter={playHoverTick}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-black text-sm shadow-xl shadow-amber-500/25 transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                aria-label="إضافة الهاتف المخصص للسلة"
              >
                <ShoppingCart className="w-4.5 h-4.5 text-neutral-950" />
                <span>إضافة هذا التخصيص للسلة التجريبية</span>
              </button>

              <div className="pt-2 text-center border-t border-neutral-800/80">
                <span className="text-[11px] text-neutral-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  يشمل ضمان ممدوح الذهبي سنتين مع شحن مجاني
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
