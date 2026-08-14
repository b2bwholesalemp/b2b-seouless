export type UserRole = "brand_admin" | "retailer_buyer" | "platform_admin";

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  companyName: string;
  createdAt: string;
}

export interface SKUVariant {
  id: string;
  size: string;
  color: string;
  sku: string;
  inventoryCount: number;
  wholesalePriceUSD: number;
}

export interface ProductCatalogItem {
  id: string;
  brandId: string;
  name: string;
  category: string;
  description: string;
  wholesalePriceUSD: number;
  retailPriceUSD: number;
  moq: number; // Minimum Order Quantity
  images: string[];
  variants: SKUVariant[];
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  variantId: string;
  quantity: number;
  unitPriceUSD: number;
}

export interface Order {
  id: string;
  buyerId: string;
  brandId: string;
  status: "draft" | "submitted" | "approved" | "paid" | "shipped";
  totalAmountUSD: number;
  items: OrderItem[];
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AgentTask {
  id: string;
  title: string;
  status: "idle" | "running" | "success" | "error";
  output?: string;
}
