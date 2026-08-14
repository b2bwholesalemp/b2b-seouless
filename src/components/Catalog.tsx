import React, { useState } from 'react';
import { Search, Filter, ShoppingBag, Plus, Eye, Sparkles, Check, DollarSign } from 'lucide-react';
import { ProductCatalogItem, UserProfile } from '../../types';

interface CatalogProps {
  products: ProductCatalogItem[];
  currentUser: UserProfile;
  onOpenOrderModal: (product: ProductCatalogItem) => void;
  onAddNewProduct: (product: ProductCatalogItem) => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  products,
  currentUser,
  onOpenOrderModal,
  onAddNewProduct
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New product form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Apparel & Knitwear');
  const [newDesc, setNewDesc] = useState('');
  const [newWholesale, setNewWholesale] = useState(100);
  const [newRetail, setNewRetail] = useState(250);
  const [newMoq, setNewMoq] = useState(12);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: ProductCatalogItem = {
      id: `prod_${Date.now()}`,
      brandId: currentUser.id,
      name: newName,
      category: newCategory,
      description: newDesc,
      wholesalePriceUSD: Number(newWholesale),
      retailPriceUSD: Number(newRetail),
      moq: Number(newMoq),
      images: [
        'https://images.pexels.com/photos/6311652/pexels-photo-6311652.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      variants: [
        { id: `v_${Date.now()}_1`, size: 'Standard', color: 'Default', sku: `SKU-${Math.floor(Math.random()*90000+10000)}`, inventoryCount: 100, wholesalePriceUSD: Number(newWholesale) }
      ],
      createdAt: new Date().toISOString()
    };
    onAddNewProduct(newProd);
    setShowCreateModal(false);
    setNewName('');
    setNewDesc('');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#262626]/70 backdrop-blur-xl border border-[#2F2F2F] p-8 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[#9E7FFF] text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4" />
            <span>AI-Optimized Wholesale Line Sheet</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Global B2B Product Catalog</h1>
          <p className="text-xs md:text-sm text-[#A3A3A3] mt-1">
            Browse verified luxury goods, MOQ minimums, and tiered wholesale pricing.
          </p>
        </div>

        {currentUser.role === 'brand_admin' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#9E7FFF] to-[#805ad5] text-white font-bold text-xs shadow-lg shadow-[#9E7FFF]/30 hover:shadow-[#9E7FFF]/50 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product SKU</span>
          </button>
        )}
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-[#A3A3A3]" />
          <input
            type="text"
            placeholder="Search products by title, SKU, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#262626] border border-[#2F2F2F] rounded-2xl py-3 pl-12 pr-4 text-sm text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#9E7FFF] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#9E7FFF] text-white shadow-lg shadow-[#9E7FFF]/30'
                  : 'bg-[#262626] text-[#A3A3A3] hover:text-white border border-[#2F2F2F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="rounded-3xl bg-[#262626]/70 backdrop-blur-xl border border-[#2F2F2F] overflow-hidden flex flex-col justify-between hover:border-[#9E7FFF]/40 transition-all shadow-xl group">
            <div>
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-[#1f1f1f]">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#171717]/80 backdrop-blur-md text-[10px] font-extrabold text-[#9E7FFF] border border-[#9E7FFF]/30 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-[#171717]/80 backdrop-blur-md text-[10px] font-extrabold text-emerald-400 border border-emerald-500/30">
                    MOQ: {product.moq} units
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-extrabold text-white line-clamp-1">{product.name}</h3>
                <p className="text-xs text-[#A3A3A3] line-clamp-2 leading-relaxed">{product.description}</p>

                {/* Pricing Box */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#2F2F2F]">
                  <div>
                    <span className="text-[10px] text-[#A3A3A3] font-bold uppercase">Wholesale Price</span>
                    <p className="text-lg font-extrabold text-white">${product.wholesalePriceUSD.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#A3A3A3] font-bold uppercase">MSRP Retail</span>
                    <p className="text-lg font-extrabold text-[#38bdf8]">${product.retailPriceUSD.toFixed(2)}</p>
                  </div>
                </div>

                {/* Variants preview */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.variants.map((v) => (
                    <span key={v.id} className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-[#1f1f1f] border border-[#2F2F2F] text-[#A3A3A3]">
                      {v.color} / {v.size} ({v.inventoryCount} left)
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 pt-0">
              <button
                onClick={() => onOpenOrderModal(product)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#9E7FFF] to-[#805ad5] text-white font-bold text-xs shadow-lg shadow-[#9E7FFF]/20 hover:shadow-[#9E7FFF]/40 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Create Wholesale Order</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Product Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#262626] border border-[#2F2F2F] rounded-3xl max-w-lg w-full p-8 shadow-2xl relative">
            <h2 className="text-xl font-extrabold text-white mb-2">Add New Catalog Product</h2>
            <p className="text-xs text-[#A3A3A3] mb-6">List a new luxury item for global retailers and buyers.</p>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#A3A3A3] uppercase">Product Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Silk Charmeuse Evening Gown"
                  className="w-full mt-1 bg-[#1f1f1f] border border-[#2F2F2F] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#9E7FFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#A3A3A3] uppercase">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full mt-1 bg-[#1f1f1f] border border-[#2F2F2F] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#9E7FFF]"
                  >
                    <option value="Apparel & Knitwear">Apparel & Knitwear</option>
                    <option value="Horology & Accessories">Horology & Accessories</option>
                    <option value="Beauty & Skincare">Beauty & Skincare</option>
                    <option value="Leather Goods & Travel">Leather Goods & Travel</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#A3A3A3] uppercase">MOQ (Units)</label>
                  <input
                    type="number"
                    required
                    value={newMoq}
                    onChange={(e) => setNewMoq(Number(e.target.value))}
                    className="w-full mt-1 bg-[#1f1f1f] border border-[#2F2F2F] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#9E7FFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#A3A3A3] uppercase">Wholesale ($)</label>
                  <input
                    type="number"
                    required
                    value={newWholesale}
                    onChange={(e) => setNewWholesale(Number(e.target.value))}
                    className="w-full mt-1 bg-[#1f1f1f] border border-[#2F2F2F] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#9E7FFF]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#A3A3A3] uppercase">Retail MSRP ($)</label>
                  <input
                    type="number"
                    required
                    value={newRetail}
                    onChange={(e) => setNewRetail(Number(e.target.value))}
                    className="w-full mt-1 bg-[#1f1f1f] border border-[#2F2F2F] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#9E7FFF]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#A3A3A3] uppercase">Description</label>
                <textarea
                  required
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe materials, sizing, and production specs..."
                  className="w-full mt-1 bg-[#1f1f1f] border border-[#2F2F2F] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#9E7FFF]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#1f1f1f] text-xs font-bold text-[#A3A3A3] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9E7FFF] to-[#805ad5] text-xs font-bold text-white shadow-lg shadow-[#9E7FFF]/30"
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
