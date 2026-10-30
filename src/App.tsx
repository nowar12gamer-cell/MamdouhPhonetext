import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_PRODUCTS } from './data/mockProducts';
import { CartItem, FilterState, Product, ProductColor, StorageOption } from './types/store';
import { filterProducts } from './utils/storeLogic';
import { getAudioMuted, setAudioMuted, playClickSnap, playHoverTick, playSuccessChime } from './utils/audio';

import { LoaderScreen } from './components/LoaderScreen';
import { DemoNoticeModal } from './components/DemoNoticeModal';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CatalogSection } from './components/CatalogSection';
import { PhoneCustomizerSection } from './components/PhoneCustomizerSection';
import { ComparisonModal } from './components/ComparisonModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

export default function App() {
  // Check autostart query param
  const isAutostart = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('autostart') === '1';

  const [isLoading, setIsLoading] = useState(!isAutostart);
  const [showDemoNotice, setShowDemoNotice] = useState(false);
  const [isAudioMuted, setIsAudioMutedState] = useState(false);
  const [currency, setCurrency] = useState<'EGP' | 'SAR' | 'USD'>('EGP');

  // Products & Filtering
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    brand: 'All',
    category: 'All',
    minPrice: 0,
    maxPrice: 200000,
    sortBy: 'featured',
    onlyInStock: false,
  });

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState('');

  // Comparison State
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Quick View State
  const [selectedProductForQuickView, setSelectedProductForQuickView] = useState<Product | null>(null);

  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Toast / notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsAudioMutedState(getAudioMuted());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Called when the entry loading progress bar completes
  const handleLoaderFinish = () => {
    setIsLoading(false);
    // As explicitly requested by the user:
    // "في أول ما يخلص شريط التحميل بتاع الدخول. مكتوب فيه تجريبي، الموقع ده تجريبي. وتكتب تم صنع هذا الموقع بواسطة عبد الله."
    setShowDemoNotice(true);
  };

  const handleToggleAudio = () => {
    const next = !isAudioMuted;
    setIsAudioMutedState(next);
    setAudioMuted(next);
    showToast(next ? 'تم كتم الصوت التفاعلي' : 'تم تفعيل الصوت التفاعلي الحريري');
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    color: ProductColor,
    storage: StorageOption,
    quantity: number = 1
  ) => {
    const unitPrice = product.priceEGP + storage.priceDiffEGP;
    const cartItemId = `${product.id}-${color.name}-${storage.capacity}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            product,
            selectedColor: color,
            selectedStorage: storage,
            quantity,
            unitPriceEGP: unitPrice,
          },
        ];
      }
    });

    showToast(`تمت إضافة ${product.nameAr} (${color.nameAr}) إلى السلة`);
  };

  const handleUpdateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Toggle comparison handler
  const handleToggleCompare = (product: Product) => {
    setComparedProductIds((prev) => {
      if (prev.includes(product.id)) {
        showToast(`تمت إزالة ${product.nameAr} من المقارنة`);
        return prev.filter((id) => id !== product.id);
      } else {
        if (prev.length >= 3) {
          showToast('يمكنك مقارنة حتى 3 هواتف فقط معاً');
          return prev;
        }
        showToast(`تمت إضافة ${product.nameAr} للمقارنة`);
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFromCompare = (productId: string) => {
    setComparedProductIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleClearCompare = () => {
    setComparedProductIds([]);
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters);
  }, [products, filters]);

  // Featured flagship for Hero section
  const featuredProduct = products[0];

  // Products currently in comparison modal
  const comparedProducts = useMemo(() => {
    return products.filter((p) => comparedProductIds.includes(p.id));
  }, [products, comparedProductIds]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-['Cairo',sans-serif]">
      {/* 1. Cinematic Entry Loading Screen */}
      {isLoading && <LoaderScreen onFinish={handleLoaderFinish} />}

      {/* 2. Post-load Demo & Abdullah Credit Notice Modal */}
      <DemoNoticeModal
        isOpen={showDemoNotice}
        onClose={() => setShowDemoNotice(false)}
        onApplyAbdullahCode={() => {
          setAppliedPromoCode('ABDULLAH');
          showToast('تم تفعيل كود خصم عبد الله (15% VIP)');
        }}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-neutral-900 border border-amber-500/40 text-amber-200 text-xs font-semibold shadow-2xl shadow-amber-500/10 animate-in slide-in-from-bottom duration-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        searchQuery={filters.search}
        onSearchChange={(q) => setFilters({ ...filters, search: q })}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        comparisonCount={comparedProductIds.length}
        onOpenComparison={() => setIsComparisonOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        onOpenDemoNotice={() => setShowDemoNotice(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          featuredProduct={featuredProduct}
          currency={currency}
          onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
          onQuickView={(p) => setSelectedProductForQuickView(p)}
          onToggleCompare={handleToggleCompare}
          isCompared={comparedProductIds.includes(featuredProduct.id)}
        />

        {/* Catalog Section */}
        <CatalogSection
          products={products}
          filteredProducts={filteredProducts}
          filters={filters}
          onFilterChange={setFilters}
          currency={currency}
          onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
          onQuickView={(p) => setSelectedProductForQuickView(p)}
          onToggleCompare={handleToggleCompare}
          comparedProductIds={comparedProductIds}
        />

        {/* Phone Customizer & Tactile Haptic Studio */}
        <PhoneCustomizerSection
          product={featuredProduct}
          currency={currency}
          onAddToCart={(p, c, s) => handleAddToCart(p, c, s, 1)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenDemoNotice={() => setShowDemoNotice(true)}
        onReplayLoader={() => {
          setIsLoading(true);
        }}
      />

      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        products={comparedProducts}
        onRemove={handleRemoveFromCompare}
        onClear={handleClearCompare}
        currency={currency}
        onAddToCart={(p) => handleAddToCart(p, p.colors[0], p.storageOptions[0], 1)}
      />

      {/* Product Detail / Quick View Modal */}
      <ProductDetailModal
        product={selectedProductForQuickView}
        isOpen={Boolean(selectedProductForQuickView)}
        onClose={() => setSelectedProductForQuickView(null)}
        currency={currency}
        onAddToCart={(p, c, s, q) => handleAddToCart(p, c, s, q)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        currency={currency}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromoCode={appliedPromoCode}
        onApplyPromoCode={setAppliedPromoCode}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        appliedPromoCode={appliedPromoCode}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />
    </div>
  );
}
