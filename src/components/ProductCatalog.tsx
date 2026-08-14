import React, { useState } from 'react';
import { ProductCatalogItem, UserProfile } from '../types';
import { Search, Filter, ShoppingBag, Eye, ShieldCheck, Sparkles, Plus, Check } from 'lucide-react';

interface ProductCatalogProps {
  products: ProductCatalogItem[];
  currentUser: UserProfile;
  onAddToCart: (product: ProductCatalogItem, variantId: string, quantity: number) => void;
  onSelectProduct: (product: ProductCatalogItem) => void;
  onOpenCreateProduct: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  currentUser,
  onAddToCart,
  onSelectProduct,
  onOpenCreateProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleQuickAdd = (product: ProductCatalogItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultVariant = product.variants[0];
    if (defaultVariant) {
      onAddToCart(product, defaultVariant.id, product.moq || 10);
      setAddedIds((prev) => ({ ...prev, [product.id]: true }));
      setTimeout(() => {
        setAddedIds((prev) => ({ ...prev, [product.id]: false }));
      }, 1500);
    }
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center space-x-2 text-[#9E7FFF] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Curated Wholesale Catalog</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Discover High-Margin SKUs
          </h2>
        </div>

        {currentUser.role === 'brand_admin' && (
          <button
            onClick={onOpenCreateProduct}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#9E7FFF] to-[#38bdf8] text-white font-bold text-sm shadow-lg hover:scale-105 transition-all flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>List New Product SKU</span>
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
        {/* Search input */}
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3A3A3]" />
          <input
            type="text"
            placeholder="Search luxury apparel, techwear, silk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#262626] border border-[#2F2F2F] rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#9E7FFF] transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#9E7FFF] text-white shadow-lg shadow-[#9E7FFF]/20'
                  : 'bg-[#262626] border border-[#2F2F2F] text-[#A3A3A3] hover:text-white hover:border-[#2f2f2f]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className="bg-[#262626] border border-[#2F2F2F] rounded-3xl overflow-hidden group hover:border-[#9E7FFF]/50 hover:shadow-2xl hover:shadow-[#9E7FFF]/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative h-72 overflow-hidden bg-[#1f1f1f]">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-[#171717]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#2F2F2F] text-xs font-bold text-[#9E7FFF]">
                {product.category}
              </div>
              <div className="absolute top-4 right-4 bg-[#171717]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#2F2F2F] text-xs font-bold text-white flex items-center space-x-1">
                <span>MOQ: {product.moq}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#9E7FFF] transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-[#A3A3A3] line-clamp-2 mb-4 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div>
                {/* Pricing info */}
                <div className="flex items-center justify-between mb-4 pt-4 border-t border-[#2F2F2F]">
                  <div>
                    <span className="text-[10px] uppercase text-[#A3A3A3] block">Wholesale</span>
                    <span className="text-xl font-extrabold text-white">${product.wholesalePriceUSD}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-[#A3A3A3] block">Est. Retail</span>
                    <span className="text-sm font-bold text-[#38bdf8]">${product.retailPriceUSD}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#171717] border border-[#2F2F2F] text-xs font-bold text-white hover:bg-[#2f2f2f] transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Eye className="w-4 h-4 text-[#A3A3A3]" />
                    <span>View Details</span>
                  </button>

                  {currentUser.role === 'retailer_buyer' && (
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                        addedIds[product.id]
                          ? 'bg-success text-white'
                          : 'bg-[#9E7FFF] text-white hover:opacity-90 shadow-lg shadow-[#9E7FFF]/25'
                      }`}
                    >
                      {addedIds[product.id] ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Quick Order</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
