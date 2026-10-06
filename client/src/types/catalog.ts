import { ProductStatus } from './enums'; //[cite: 1, 2]

export interface Language {
  id: string; // 'vi' | 'en'
  name: string;
  isDefault: boolean;
}

export interface CategoryTranslation {
  id: number;
  categoryId: number;
  languageId: string;
  name: string;
  description?: string | null;
}

export interface Category {
  id: number;
  defaultName: string;
  iconUrl?: string | null;
  isVisible: boolean;
  parentId?: number | null;
  parent?: Category | null;
  children?: Category[];
  translations?: CategoryTranslation[];
}

export interface Brand {
  id: number;
  defaultName: string;
  logoUrl?: string | null;
  translations?: Array<{
    languageId: string;
    name: string;
    description?: string | null;
  }>;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Attribute {
  id: number;
  name: string; // Ví dụ: "Màu sắc", "Size"
  values?: AttributeValue[];
}

export interface AttributeValue {
  id: number;
  attributeId: number;
  value: string; // Ví dụ: "Đỏ", "XL"
  attribute?: Attribute;
}

export interface ProductVariant {
  id: number;
  productId: number;
  sku: string;
  stockQuantity: number;
  originalPrice: number | string;
  sellingPrice: number | string;
  weightGram: number;
  imageUrl?: string | null;
  attributeValues: Array<{
    id: number;
    value: string;
    attribute: {
      id: number;
      name: string;
    };
  }>;
  flashSaleItems?: Array<{
    flashSalePrice: number | string;
    promoQuantity: number;
    soldQuantity: number;
    campaign: {
      isActive: boolean;
      startTime: string;
      endTime: string;
    };
  }>;
}

export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  displayOrder: number;
}

export interface ProductTranslation {
  id: number;
  productId: number;
  languageId: string;
  name: string;
  shortDesc?: string | null;
  detailDesc?: string | null;
}

export interface Product {
  id: number;
  defaultName: string;
  thumbnailUrl?: string | null;
  status: ProductStatus; //[cite: 1, 2]
  categoryId: number;
  brandId?: number | null;
  category?: Category;
  brand?: Brand | null;
  images?: ProductImage[];
  variants?: ProductVariant[];
  translations?: ProductTranslation[];
  tags?: Tag[];
  createdAt: string;
}

// Payload đồng bộ Ma trận Biến thể (Pessimistic Sync)
export interface SyncVariantsPayload {
  productId: number;
  attributes: Array<{
    name: string;
    options: string[];
  }>;
  variants: Array<{
    id?: number | null;
    sku: string;
    originalPrice: number;
    sellingPrice: number;
    stockQuantity: number;
    weightGram: number;
    imageUrl?: string | null;
    attributeValues: Array<{
      attributeName: string;
      value: string;
    }>;
  }>;
}