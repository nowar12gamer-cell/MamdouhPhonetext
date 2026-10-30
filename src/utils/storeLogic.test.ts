import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCartTotals, filterProducts, formatCurrency, validateDiscountCode } from './storeLogic';
import { CartItem, FilterState, Product } from '../types/store';

const mockProduct: Product = {
  id: 'iphone-16-pro-max',
  name: 'iPhone 16 Pro Max',
  nameAr: 'آيفون 16 برو ماكس',
  brand: 'Apple',
  category: 'Flagship',
  priceEGP: 75000,
  rating: 4.9,
  reviewsCount: 120,
  inStock: true,
  isNew: true,
  isBestseller: true,
  image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
  colors: [
    { name: 'Desert Titanium', nameAr: 'تيتانيوم صحراوي', hex: '#c5b59e' },
  ],
  storageOptions: [
    { capacity: '256GB', priceDiffEGP: 0 },
    { capacity: '512GB', priceDiffEGP: 8000 },
  ],
  specs: {
    screen: '6.9" Super Retina XDR OLED',
    processor: 'Apple A18 Pro',
    camera: '48MP + 48MP + 12MP (5x optical zoom)',
    battery: '4685 mAh',
    os: 'iOS 18',
    ram: '8GB',
    charging: 'MagSafe 25W',
    weight: '227g',
  },
  descriptionAr: 'أقوى هاتف من آبل بإطار التيتانيوم الأنيق',
  featuresAr: ['زر التحكم بالكاميرا الجديد', 'شريحة A18 Pro الخارقة'],
};

const mockSamsung: Product = {
  id: 'samsung-s25-ultra',
  name: 'Samsung Galaxy S25 Ultra',
  nameAr: 'سامسونج جالكسي S25 الترا',
  brand: 'Samsung',
  category: 'Flagship',
  priceEGP: 72000,
  rating: 4.8,
  reviewsCount: 95,
  inStock: false,
  isNew: true,
  image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80',
  colors: [{ name: 'Titanium Silver', nameAr: 'فضي تيتانيوم', hex: '#e2e8f0' }],
  storageOptions: [{ capacity: '512GB', priceDiffEGP: 0 }],
  specs: {
    screen: '6.9" Dynamic AMOLED 2X 120Hz',
    processor: 'Snapdragon 8 Elite',
    camera: '200MP + 50MP + 50MP + 10MP',
    battery: '5000 mAh',
    os: 'Android 15 (One UI 7)',
    ram: '12GB',
    charging: '45W Super Fast Charging',
    weight: '219g',
  },
  descriptionAr: 'قمة الذكاء الاصطناعي مع قلم S-Pen وشريحة Snapdragon 8 Elite',
  featuresAr: ['Galaxy AI', 'قلم S-Pen مدمج'],
};

test('Cart totals calculation without discount', () => {
  const item: CartItem = {
    id: 'item-1',
    productId: mockProduct.id,
    product: mockProduct,
    selectedColor: mockProduct.colors[0],
    selectedStorage: mockProduct.storageOptions[0],
    quantity: 1,
    unitPriceEGP: 75000,
  };

  const totals = calculateCartTotals([item]);
  assert.equal(totals.subtotal, 75000);
  assert.equal(totals.discountPercent, 0);
  assert.equal(totals.discountAmount, 0);
  assert.equal(totals.shipping, 0); // over 15000 threshold
  assert.equal(totals.finalTotal, 75000);
});

test('Cart totals calculation with ABDULLAH discount code', () => {
  const item: CartItem = {
    id: 'item-1',
    productId: mockProduct.id,
    product: mockProduct,
    selectedColor: mockProduct.colors[0],
    selectedStorage: mockProduct.storageOptions[0],
    quantity: 1,
    unitPriceEGP: 100000,
  };

  const totals = calculateCartTotals([item], 'ABDULLAH');
  assert.equal(totals.subtotal, 100000);
  assert.equal(totals.discountPercent, 15);
  assert.equal(totals.discountAmount, 15000);
  assert.equal(totals.finalTotal, 85000);
});

test('Discount code validation', () => {
  const abdullah = validateDiscountCode('abdullah');
  assert.equal(abdullah.valid, true);
  assert.equal(abdullah.percent, 15);

  const mamdouh = validateDiscountCode('MAMDOUH');
  assert.equal(mamdouh.valid, true);
  assert.equal(mamdouh.percent, 10);

  const invalid = validateDiscountCode('UNKNOWN');
  assert.equal(invalid.valid, false);
});

test('Product filtering by brand and stock status', () => {
  const products = [mockProduct, mockSamsung];

  const defaultFilters: FilterState = {
    search: '',
    brand: 'Apple',
    category: 'All',
    minPrice: 0,
    maxPrice: 200000,
    sortBy: 'featured',
    onlyInStock: false,
  };

  const appleOnly = filterProducts(products, defaultFilters);
  assert.equal(appleOnly.length, 1);
  assert.equal(appleOnly[0].id, 'iphone-16-pro-max');

  const stockOnly = filterProducts(products, { ...defaultFilters, brand: 'All', onlyInStock: true });
  assert.equal(stockOnly.length, 1);
  assert.equal(stockOnly[0].id, 'iphone-16-pro-max');
});

test('Currency formatting handles EGP, USD, and SAR', () => {
  assert.ok(formatCurrency(50000, 'EGP').includes('ج.م'));
  assert.equal(formatCurrency(50000, 'USD'), '$1,000');
  assert.ok(formatCurrency(50000, 'SAR').includes('ر.س'));
});
