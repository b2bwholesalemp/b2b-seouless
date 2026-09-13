import { ProductCatalogItem, Order, UserProfile, AgentTask, ApiKey, ApiEndpoint, ApiUsageStat, PlatformIntegration } from '../../types';

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

// ---- Maker API mock data ----

export const mockApiKeys: ApiKey[] = [
  {
    id: 'key_1',
    label: 'Production — Main Storefront',
    keyPrefix: 'nxs_live_…8f2a',
    scopes: ['catalog:read', 'orders:write', 'agents:read'],
    createdAt: '2025-01-12T09:00:00Z',
    lastUsedAt: '2025-02-25T14:22:00Z',
    status: 'active',
  },
  {
    id: 'key_2',
    label: 'Staging — Integration Tests',
    keyPrefix: 'nxs_test_…3c1d',
    scopes: ['catalog:read', 'orders:read'],
    createdAt: '2025-01-20T12:00:00Z',
    lastUsedAt: '2025-02-18T08:05:00Z',
    status: 'active',
  },
  {
    id: 'key_3',
    label: 'Legacy Sync (deprecated)',
    keyPrefix: 'nxs_live_…a01f',
    scopes: ['catalog:read'],
    createdAt: '2024-11-05T10:00:00Z',
    lastUsedAt: null,
    status: 'revoked',
  },
];

export const mockApiEndpoints: ApiEndpoint[] = [
  { method: 'GET',  path: '/v1/products',            description: 'List all catalog products with variants and inventory',  category: 'Catalog' },
  { method: 'POST', path: '/v1/products',            description: 'Create a new product in the B2B catalog',                  category: 'Catalog' },
  { method: 'GET',  path: '/v1/products/:id',         description: 'Retrieve a single product with full variant details',     category: 'Catalog' },
  { method: 'POST', path: '/v1/orders',              description: 'Submit a new wholesale order',                             category: 'Orders' },
  { method: 'GET',  path: '/v1/orders',              description: 'List orders with optional status filter',                   category: 'Orders' },
  { method: 'PUT',  path: '/v1/orders/:id/approve',  description: 'Approve a submitted order (brand admin only)',             category: 'Orders' },
  { method: 'POST', path: '/v1/agents/run',          description: 'Trigger an autonomous agent workflow',                    category: 'Agents' },
  { method: 'GET',  path: '/v1/agents/:id/status',   description: 'Poll the status and output of a running agent task',       category: 'Agents' },
  { method: 'GET',  path: '/v1/analytics/velocity',   description: 'Wholesale velocity and demand-forecast time series',      category: 'Analytics' },
];

export const mockApiUsage: ApiUsageStat[] = [
  { label: 'Requests this month', value: '142,308', change: '+18.2% vs last month' },
  { label: 'Avg. response time',   value: '84 ms',   change: 'p99 latency under 200 ms' },
  { label: 'Rate limit (Pro)',     value: '1,000/min', change: 'Upgrade for 10,000/min' },
];

// ---- Platform stack mock data ----

export const mockPlatformStack: PlatformIntegration[] = [
  { name: 'Supabase',    category: 'Database & Auth',     status: 'connected', description: 'Postgres, Row-Level Security, and auth provider for NexusAI.',         icon: 'Database', tier: 'Pro' },
  { name: 'Stripe',      category: 'Payments',            status: 'connected', description: 'Escrow-protected B2B payments and automated settlement.',              icon: 'CreditCard', tier: 'Pro' },
  { name: 'Shopify',     category: 'E-commerce Sync',     status: 'connected', description: 'Bi-directional SKU and inventory synchronization.',                    icon: 'ShoppingBag', tier: 'Pro' },
  { name: 'Vercel',      category: 'Edge Deployment',     status: 'connected', description: 'Global edge network for the NexusAI storefront and APIs.',            icon: 'Globe', tier: 'Enterprise' },
  { name: 'Gemini AI',   category: 'Agent Inference',     status: 'connected', description: 'Gemini 2.5 Pro powering demand forecasting and autonomous agents.',     icon: 'Cpu', tier: 'Enterprise' },
  { name: 'Twilio',      category: 'Notifications',       status: 'available', description: 'SMS and WhatsApp alerts for order status and agent events.',           icon: 'Bell', tier: 'Starter' },
  { name: 'Algolia',     category: 'Search',              status: 'available', description: 'Instant, typo-tolerant product search across the catalog.',             icon: 'Search', tier: 'Pro' },
  { name: 'Sentry',      category: 'Monitoring',         status: 'available', description: 'Real-time error tracking and performance monitoring.',                  icon: 'ShieldCheck', tier: 'Starter' },
];
