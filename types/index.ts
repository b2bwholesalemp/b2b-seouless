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

// ---- Maker API types ----

export type ApiKeyStatus = "active" | "revoked";

export interface ApiKey {
  id: string;
  label: string;
  keyPrefix: string; // visible portion, e.g. "nxs_live_…8f2a"
  scopes: string[];
  createdAt: string;
  lastUsedAt: string | null;
  status: ApiKeyStatus;
}

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  category: string;
}

export interface ApiUsageStat {
  label: string;
  value: string;
  change: string;
}

// ---- Platform stack types ----

export interface PlatformIntegration {
  name: string;
  category: string;
  status: "connected" | "available";
  description: string;
  icon: string; // lucide icon name
  tier: "Starter" | "Pro" | "Enterprise";
}
