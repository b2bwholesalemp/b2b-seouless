import React, { useState } from 'react';
import { ProductCatalogItem, UserProfile } from '../types';
import { X, Plus, Sparkles, Check } from 'lucide-react';

interface CreateProductModalProps {
  currentUser: UserProfile;
  onClose: () => void;
  onProductCreated: (product: ProductCatalogItem) => void;
}

export const CreateProductModal: React.FC<CreateProductModalProps> = ({
  currentUser,
  onClose,
  onProductCreated,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Outerwear');
  const [description, setDescription] = useState('');
  const [wholesalePriceUSD, setWholesalePriceUSD] = useState(150);
  const [retailPriceUSD, setRetailPriceUSD] = useState(400);
  const [moq, setMoq] = useState(10);
  const [imageUrl, setImageUrl] = useState('https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: ProductCatalogItem = {
      id: `prod_${Date.now()}`,
      brandId: currentUser.id,
      name,
      category,
      description,
      wholesalePriceUSD: Number(wholesalePriceUSD),
      retailPriceUSD: Number(retailPriceUSD),
      moq: Number(moq),
      images: [imageUrl],
      variants: [
        { id: `v_${Date.now()}_1`, size: 'S', color: 'Obsidian Black', sku: `${name.substring(0,3).toUpperCase()}-BLK-S`, inventoryCount: 500, wholesalePriceUSD: Number(wholesalePriceUSD) },
        { id: `v_${Date.now()}_2`, size: 'M', color: 'Obsidian Black', sku: `${name.substring(0,3).toUpperCase()}-BLK-M`, inventoryCount: 800, wholesalePriceUSD: Number(wholesalePriceUSD) },
      ],
      createdAt: new Date().toISOString(),
    };
    onProductCreated(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#262626] border border-[#2F2F2F] rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#171717] border border-[#2F2F2F] text-white hover:bg-[#2f2f2f] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#9E7FFF] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Brand Administration</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-6">List New SKU in Marketplace</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Cybernetic Silk Bomber Jacket"
              className="w-full bg-[#171717] border border-[#2F2F2F] rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#9E7FFF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#171717] border border-[#2F2F2F] rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#9E7FFF]"
              >
                <option value="Outerwear">Outerwear</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Knitwear">Knitwear</option>
                <option value="Dresses & Skirts">Dresses & Skirts</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">Minimum Order Quantity (MOQ)</label>
              <input
                type="number"
                required
                min={1}
                value={moq}
                onChange={(e) => setMoq(Number(e.target.value))}
                className="w-full bg-[#171717] border border-[#2F2F2F] rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#9E7FFF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">Wholesale Price (USD)</label>
              <input
                type="number"
                required
                value={wholesalePriceUSD}
                onChange={(e) => setWholesalePriceUSD(Number(e.target.value))}
                className="w-full bg-[#171717] border border-[#2F2F2F] rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#9E7FFF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">Retail Target Price (USD)</label>
              <input
                type="number"
                required
                value={retailPriceUSD}
                onChange={(e) => setRetailPriceUSD(Number(e.target.value))}
                className="w-full bg-[#171717] border border-[#2F2F2F] rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#9E7FFF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">Product Image URL (Pexels)</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#171717] border border-[#2F2F2F] rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#9E7FFF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">Description</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe materials, craftsmanship, and trend highlights..."
              className="w-full bg-[#171717] border border-[#2F2F2F] rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#9E7FFF]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#9E7FFF] to-[#38bdf8] text-white font-bold text-sm shadow-glow hover:opacity-90 transition-all flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Publish SKU to Marketplace</span>
          </button>
        </form>
      </div>
    </div>
  );
};
