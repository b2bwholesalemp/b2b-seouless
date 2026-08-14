import { ProductCatalogItem, Order, UserProfile, AgentTask } from '../../types';

export const mockUserProfiles: UserProfile[] = [
  {
    id: 'usr_1',
    email: 'admin@nexusbrands.com',
    role: 'brand_admin',
    companyName: 'Luxe Atelier Global',
    createdAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'usr_2',
    email: 'buyer@nordstrom-retail.com',
    role: 'retailer_buyer',
    companyName: 'Nordic & Co. Luxury Department Stores',
    createdAt: '2025-01-15T14:30:00Z',
  },
  {
    id: 'usr_3',
    email: 'sysadmin@nexus-ecosystem.io',
    role: 'platform_admin',
    companyName: 'Nexus OS Inc.',
    createdAt: '2025-01-01T00:00:00Z',
  }
];

export const mockProducts: ProductCatalogItem[] = [
  {
    id: 'prod_1',
    brandId: 'brand_1',
    name: 'Aether Cashmere Oversized Turtleneck',
    category: 'Apparel & Knitwear',
    description: 'Sustainably sourced Inner Mongolian Grade-A cashmere knit with seamless 12-gauge construction. Unrivaled softness and thermal regulation.',
    wholesalePriceUSD: 145.00,
    retailPriceUSD: 395.00,
    moq: 24,
    images: [
      'https://images.pexels.com/photos/6311652/pexels-photo-6311652.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6311647/pexels-photo-6311647.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    variants: [
      { id: 'v_1', size: 'S', color: 'Obsidian Black', sku: 'AETH-CSH-BLK-S', inventoryCount: 140, wholesalePriceUSD: 145.00 },
      { id: 'v_2', size: 'M', color: 'Obsidian Black', sku: 'AETH-CSH-BLK-M', inventoryCount: 220, wholesalePriceUSD: 145.00 },
      { id: 'v_3', size: 'L', color: 'Obsidian Black', sku: 'AETH-CSH-BLK-L', inventoryCount: 95, wholesalePriceUSD: 145.00 },
      { id: 'v_4', size: 'S', color: 'Echru Cream', sku: 'AETH-CSH-CRM-S', inventoryCount: 80, wholesalePriceUSD: 145.00 },
      { id: 'v_5', size: 'M', color: 'Ecru Cream', sku: 'AETH-CSH-CRM-M', inventoryCount: 180, wholesalePriceUSD: 145.00 },
    ],
    createdAt: '2025-02-01T08:00:00Z',
  },
  {
    id: 'prod_2',
    brandId: 'brand_1',
    name: 'Chronos Minimalist Titanium Chronograph',
    category: 'Horology & Accessories',
    description: 'Aerospace-grade titanium case with Swiss automatic movement, sapphire crystal antireflective glass, and interchangeable quick-release leather straps.',
    wholesalePriceUSD: 420.00,
    retailPriceUSD: 1150.00,
    moq: 10,
    images: [
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    variants: [
      { id: 'v_201', size: 'One Size', color: 'Titanium Slate', sku: 'CHR-TIT-SLT-OS', inventoryCount: 65, wholesalePriceUSD: 420.00 },
      { id: 'v_202', size: 'One Size', color: 'Midnight Gold', sku: 'CHR-TIT-GLD-OS', inventoryCount: 40, wholesalePriceUSD: 420.00 }
    ],
    createdAt: '2025-02-05T09:15:00Z',
  },
  {
    id: 'prod_3',
    brandId: 'brand_2',
    name: 'Vanguard Botanical Organic Serum Complex',
    category: 'Beauty & Skincare',
    description: 'Clinically proven bio-retinol and cold-pressed marula oil cellular regeneration serum. Cruelty-free, vegan certified in recyclable UV-violet glass bottles.',
    wholesalePriceUSD: 38.00,
    retailPriceUSD: 98.00,
    moq: 50,
    images: [
      'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    variants: [
      { id: 'v_301', size: '50ml', color: 'Standard', sku: 'VNG-SER-50-STD', inventoryCount: 500, wholesalePriceUSD: 38.00 },
      { id: 'v_302', size: '100ml Refill', color: 'Standard', sku: 'VNG-SER-100-REF', inventoryCount: 320, wholesalePriceUSD: 64.00 }
    ],
    createdAt: '2025-02-10T11:20:00Z',
  },
  {
    id: 'prod_4',
    brandId: 'brand_3',
    name: 'Nova Ergonomic Artisan Leather Briefcase',
    category: 'Leather Goods & Travel',
    description: 'Full-grain vegetable-tanned Italian calfskin with brushed brass hardware, padded 16-inch laptop compartment, and luggage pass-through strap.',
    wholesalePriceUSD: 280.00,
    retailPriceUSD: 690.00,
    moq: 15,
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    variants: [
      { id: 'v_401', size: 'Standard', color: 'Cognac Brown', sku: 'NOV-BAG-CGN-STD', inventoryCount: 90, wholesalePriceUSD: 280.00 },
      { id: 'v_402', size: 'Standard', color: 'Carbon Black', sku: 'NOV-BAG-BLK-STD', inventoryCount: 110, wholesalePriceUSD: 280.00 }
    ],
    createdAt: '2025-02-12T14:00:00Z',
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ord_9801',
    buyerId: 'usr_2',
    brandId: 'brand_1',
    status: 'paid',
    totalAmountUSD: 6525.00,
    items: [
      { productId: 'prod_1', variantId: 'v_1', quantity: 25, unitPriceUSD: 145.00 },
      { productId: 'prod_1', variantId: 'v_2', quantity: 20, unitPriceUSD: 145.00 }
    ],
    createdAt: '2025-02-20T10:30:00Z'
  },
  {
    id: 'ord_9802',
    buyerId: 'usr_2',
    brandId: 'brand_1',
    status: 'approved',
    totalAmountUSD: 4200.00,
    items: [
      { productId: 'prod_2', variantId: 'v_201', quantity: 10, unitPriceUSD: 420.00 }
    ],
    createdAt: '2025-02-22T16:45:00Z'
  },
  {
    id: 'ord_9803',
    buyerId: 'usr_2',
    brandId: 'brand_2',
    status: 'submitted',
    totalAmountUSD: 3800.00,
    items: [
      { productId: 'prod_3', variantId: 'v_301', quantity: 100, unitPriceUSD: 38.00 }
    ],
    createdAt: '2025-02-24T09:10:00Z'
  }
];

export const mockAgentTasks: AgentTask[] = [
  {
    id: 'task_1',
    title: 'Automated SKU Inventory Sync with Shopify & NuORDER',
    status: 'success',
    output: 'Synced 1,240 SKUs across 4 warehouses. 0 discrepancies found.'
  },
  {
    id: 'task_2',
    title: 'AI Wholesale Buyer Demand Forecasting & Re-order Alerts',
    status: 'running',
    output: 'Analyzing 90-day sell-through velocity for Nordic & Co... 74% complete.'
  },
  {
    id: 'task_3',
    title: 'Automated Line Sheet & PDF Catalog Generator',
    status: 'success',
    output: 'Generated 4 high-res PDF line sheets with localized pricing (USD, EUR, GBP).'
  }
];
