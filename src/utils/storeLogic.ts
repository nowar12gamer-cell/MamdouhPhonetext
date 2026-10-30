import { CartItem, FilterState, Product } from '../types/store';

export interface CartCalculationResult {
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  shipping: number;
  finalTotal: number;
}

export function calculateCartTotals(
  items: CartItem[],
  discountCode?: string
): CartCalculationResult {
  const subtotal = items.reduce((acc, item) => acc + item.unitPriceEGP * item.quantity, 0);

  let discountPercent = 0;
  if (discountCode) {
    const cleanCode = discountCode.trim().toUpperCase();
    if (cleanCode === 'MAMDOUH') {
      discountPercent = 10;
    } else if (cleanCode === 'ABDULLAH') {
      discountPercent = 15;
    } else if (cleanCode === 'DEMO') {
      discountPercent = 20;
    }
  }

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const taxable = subtotal - discountAmount;
  // Free shipping for orders over 15,000 EGP, otherwise 150 EGP
  const shipping = items.length === 0 ? 0 : taxable > 15000 ? 0 : 150;
  const finalTotal = taxable + shipping;

  return {
    subtotal,
    discountPercent,
    discountAmount,
    shipping,
    finalTotal: Math.max(0, finalTotal),
  };
}

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((p) => {
    // Search query match (name, nameAr, brand, category)
    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.trim().toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.nameAr.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.specs.processor.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Brand filter
    if (filters.brand && filters.brand !== 'All') {
      if (p.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
    }

    // Category filter
    if (filters.category && filters.category !== 'All') {
      if (p.category.toLowerCase() !== filters.category.toLowerCase()) return false;
    }

    // Price range
    if (p.priceEGP < filters.minPrice || p.priceEGP > filters.maxPrice) {
      return false;
    }

    // Only in-stock filter
    if (filters.onlyInStock && !p.inStock) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc':
        return a.priceEGP - b.priceEGP;
      case 'price-desc':
        return b.priceEGP - a.priceEGP;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'featured':
      default:
        return (b.isBestseller ? 2 : b.isNew ? 1 : 0) - (a.isBestseller ? 2 : a.isNew ? 1 : 0);
    }
  });
}

export function formatCurrency(
  amountEGP: number,
  currency: 'EGP' | 'SAR' | 'USD' = 'EGP'
): string {
  if (currency === 'USD') {
    // Approx rate 1 USD = 50 EGP
    const usd = (amountEGP / 50).toFixed(0);
    return `$${Number(usd).toLocaleString()}`;
  }
  if (currency === 'SAR') {
    // Approx rate 1 SAR = 13.3 EGP
    const sar = (amountEGP / 13.3).toFixed(0);
    return `${Number(sar).toLocaleString()} ر.س`;
  }
  return `${amountEGP.toLocaleString('ar-EG')} ج.م`;
}

export function validateDiscountCode(code: string): { valid: boolean; percent: number; description: string } {
  const c = code.trim().toUpperCase();
  if (c === 'ABDULLAH') {
    return { valid: true, percent: 15, description: 'كود المطور عبد الله - خصم 15% VIP' };
  }
  if (c === 'MAMDOUH') {
    return { valid: true, percent: 10, description: 'كود متجر ممدوح - خصم 10%' };
  }
  if (c === 'DEMO') {
    return { valid: true, percent: 20, description: 'كود تجريبي - خصم 20%' };
  }
  return { valid: false, percent: 0, description: 'كود غير صالح' };
}
