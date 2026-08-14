import React, { useState } from 'react';
import { ProductCatalogItem, UserProfile } from '../types';
import { X, ShoppingBag, ShieldCheck, Cpu, Sparkles, Check, ArrowRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductCatalogItem;
  currentUser: UserProfile;
  onClose: () => void;
  onAddToCart: (product: ProductCatalogItem, variantId: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currentUser,
  onClose,
  onAddToCart,
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id || '');
  const [quantity, setQuantity] = useState(product.moq || 10);
  const [added, setAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const handleAddToCart = () => {
    if (selectedVariant) {
      onAddToCart(product, selectedVariant.id, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#262626] border border-[#2F2F2F] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-[#171717]/85 border border-[#2F2F2F] text-white hover:bg-[#171717] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images Gallery */}
          <div className="p-6 bg-[#1f1f1f] flex flex-col justify-between">
            <div className="relative h-96 rounded-2xl overflow-hidden mb-4 border border-[#2F2F2F]">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#9E7FFF]' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-[#9E7FFF] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>{product.category}</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-3">{product.name}</h2>
              <p className="text-xs text-[#A3A3A3] mb-6 leading-relaxed">{product.description}</p>

              {/* Pricing & MOQ */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-[#171717] border border-[#2F2F2F] mb-6">
                <div>
                  <span className="text-[10px] uppercase text-[#A3A3A3] block">Wholesale</span>
                  <span className="text-xl font-extrabold text-white">${product.wholesalePriceUSD}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#A3A3A3] block">Retail Target</span>
                  <span className="text-xl font-extrabold text-[#38bdf8]">${product.retailPriceUSD}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#A3A3A3] block">Min Order (MOQ)</span>
                  <span className="text-xl font-extrabold text-[#f472b6]">{product.moq} units</span>
                </div>
              </div>

              {/* Variant Selectors */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Select Variant (Size & Color):
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedVariantId === variant.id
                          ? 'bg-[#9E7FFF]/20 border-[#9E7FFF] text-white'
                          : 'bg-[#171717] border-[#2F2F2F] text-[#A3A3A3] hover:border-[#2f2f2f]'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-white">{variant.size} - {variant.color}</span>
                        {selectedVariantId === variant.id && <Check className="w-3.5 h-3.5 text-[#9E7FFF]" />}
                      </div>
                      <span className="text-[10px] text-[#A3A3A3] block">Stock: {variant.inventoryCount} available</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Order Quantity (Units):
                </label>
                <input
                  type="number"
                  min={product.moq}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
                  className="w-full bg-[#171717] border border-[#2F2F2F] rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#9E7FFF]"
                />
              </div>
            </div>

            {/* Action */}
            {currentUser.role === 'retailer_buyer' ? (
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-2xl font-bold text-sm shadow-xl transition-all flex items-center justify-center space-x-2 ${
                  added
                    ? 'bg-success text-white'
                    : 'bg-gradient-to-r from-[#9E7FFF] to-[#38bdf8] text-white hover:opacity-90 shadow-glow'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Wholesale Order</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add {quantity} Units to Cart (${(quantity * (selectedVariant?.wholesalePriceUSD || product.wholesalePriceUSD)).toLocaleString()})</span>
                  </>
                )}
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-[#171717] border border-[#2F2F2F] text-center text-xs text-[#A3A3A3]">
                Switch to <span className="text-[#9E7FFF] font-bold">Retailer Buyer</span> persona to place wholesale orders.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
