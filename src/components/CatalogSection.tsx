import React from 'react';
import {
  SlidersHorizontal,
  Sparkles,
  Smartphone,
  X,
  Filter,
  Check,
} from 'lucide-react';
import { FilterState, Product, ProductColor, StorageOption } from '../types/store';
import { ProductCard } from './ProductCard';
import { playClickSnap, playHoverTick } from '../utils/audio';

interface CatalogSectionProps {
  products: Product[];
  filteredProducts: Product[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  currency: 'EGP' | 'SAR' | 'USD';
  onAddToCart: (product: Product, color: ProductColor, storage: StorageOption) => void;
  onQuickView: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  comparedProductIds: string[];
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  filteredProducts,
  filters,
  onFilterChange,
  currency,
  onAddToCart,
  onQuickView,
  onToggleCompare,
  comparedProductIds,
}) => {
  const brands = [
    { id: 'All', label: 'جميع الهواتف' },
    { id: 'Apple', label: 'آبل (Apple)' },
    { id: 'Samsung', label: 'سامسونج (Samsung)' },
    { id: 'Xiaomi', label: 'شاومي (Xiaomi)' },
    { id: 'Google', label: 'جوجل (Google)' },
    { id: 'Accessories', label: 'إكسسوارات وساعات' },
  ];

  const sortOptions = [
    { id: 'featured', label: 'الأكثر تميزاً في ممدوح' },
    { id: 'price-asc', label: 'السعر: من الأقل للأعلى' },
    { id: 'price-desc', label: 'السعر: من الأعلى للأقل' },
    { id: 'rating', label: 'الأعلى تقييماً' },
    { id: 'newest', label: 'أحدث الإصدارات' },
  ] as const;

  const handleBrandSelect = (brandId: string) => {
    playClickSnap();
    onFilterChange({ ...filters, brand: brandId });
  };

  const handleSortSelect = (sortBy: FilterState['sortBy']) => {
    playClickSnap();
    onFilterChange({ ...filters, sortBy });
  };

  const resetFilters = () => {
    playClickSnap();
    onFilterChange({
      search: '',
      brand: 'All',
      category: 'All',
      minPrice: 0,
      maxPrice: 200000,
      sortBy: 'featured',
      onlyInStock: false,
    });
  };

  return (
    <section id="catalog-section" className="py-12 bg-neutral-950/60 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-800 text-right gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 justify-end md:justify-start">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                تشكيلة 2025
              </span>
              <span className="text-xs text-neutral-400">هواتف أصلية بضمان ممدوح</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              كتالوج الهواتف الذكية والإكسسوارات
            </h2>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <span className="text-xs text-neutral-400">
              عرض <strong className="text-amber-400 font-mono">{filteredProducts.length}</strong> من أصل {products.length} منتج
            </span>

            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortSelect(e.target.value as FilterState['sortBy'])}
              className="bg-neutral-900 text-xs text-neutral-200 border border-neutral-800 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer"
              aria-label="ترتيب الهواتف"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-neutral-900 text-neutral-200">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Brand Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => handleBrandSelect(b.id)}
              onMouseEnter={playHoverTick}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                filters.brand === b.id
                  ? 'bg-amber-500 text-neutral-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white border-neutral-800 hover:border-neutral-700'
              }`}
              aria-label={`تصفية حسب ${b.label}`}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Active search or filter tags */}
        {(filters.search || filters.brand !== 'All') && (
          <div className="flex items-center gap-2 mb-6 flex-wrap text-xs">
            <span className="text-neutral-400">التصفيات الحالية:</span>
            {filters.search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-white">
                بحث: &quot;{filters.search}&quot;
                <button
                  onClick={() => onFilterChange({ ...filters, search: '' })}
                  className="text-neutral-400 hover:text-white"
                  aria-label="إلغاء البحث"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {filters.brand !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-300">
                الماركة: {filters.brand}
                <button
                  onClick={() => onFilterChange({ ...filters, brand: 'All' })}
                  className="text-neutral-400 hover:text-white"
                  aria-label="إلغاء تصفية الماركة"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-amber-400 hover:text-amber-300 underline underline-offset-4 mr-2 cursor-pointer"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-neutral-900/40 border border-neutral-800/80 p-8">
            <Smartphone className="w-16 h-16 mx-auto text-neutral-600 mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">لم نجد هواتف تطابق بحثك</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-6">
              جرب تغيير كلمة البحث أو اختيار علامة تجارية أخرى من متجر ممدوح.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs shadow-md shadow-amber-500/20 cursor-pointer"
            >
              عرض جميع الهواتف
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onToggleCompare={onToggleCompare}
                isCompared={comparedProductIds.includes(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
