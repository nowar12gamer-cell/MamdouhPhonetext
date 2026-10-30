export interface ProductColor {
  name: string;
  nameAr: string;
  hex: string;
  imageUrl?: string;
}

export interface StorageOption {
  capacity: string;
  priceDiffEGP: number; // difference from base price
}

export interface ProductSpecs {
  screen: string;
  processor: string;
  camera: string;
  battery: string;
  os: string;
  ram: string;
  charging: string;
  weight: string;
}

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  brand: 'Apple' | 'Samsung' | 'Xiaomi' | 'Google' | 'Honor' | 'Accessories';
  category: 'Flagship' | 'Foldable' | 'Midrange' | 'Accessories';
  priceEGP: number;
  originalPriceEGP?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  badge?: string;
  image: string;
  colors: ProductColor[];
  storageOptions: StorageOption[];
  specs: ProductSpecs;
  descriptionAr: string;
  featuresAr: string[];
}

export interface CartItem {
  id: string; // product id + color + storage
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedStorage: StorageOption;
  quantity: number;
  unitPriceEGP: number;
}

export interface FilterState {
  search: string;
  brand: string; // 'All' or specific
  category: string; // 'All' or specific
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  onlyInStock: boolean;
}
