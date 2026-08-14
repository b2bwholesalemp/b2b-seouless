import React from 'react';
import { ProductCatalogItem, OrderItem } from '../types';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

export interface CartItem extends OrderItem {
  product: ProductCatalogItem;
  variantName: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.unitPriceUSD, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#262626] border-l border-[#2F2F2F] p-6 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#2F2F2F]">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-6 h-6 text-[#9E7FFF]" />
                <h2 className="text-xl font-extrabold text-white">Wholesale Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-[#171717] border border-[#2F2F2F] text-white hover:bg-[#2f2f2f] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="mt-6 space-y-4 max-h-[55vh] overflow-y-auto pr-2">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-[#A3A3A3] mx-auto mb-4 opacity-40" />
                  <p className="text-sm font-bold text-white mb-1">Your cart is empty</p>
                  <p className="text-xs text-[#A3A3A3]">Add wholesale SKUs from the marketplace to begin.</p>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#171717] border border-[#2F2F2F] flex items-center justify-between gap-4">
                    <img src={item.product.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.product.name}</h4>
                      <p className="text-xs text-[#A3A3A3] mt-0.5">Variant: {item.variantName}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-[#38bdf8] font-bold">{item.quantity} units × ${item.unitPriceUSD}</span>
                        <span className="text-xs font-extrabold text-white">${(item.quantity * item.unitPriceUSD).toLocaleString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="p-2 text-[#A3A3A3] hover:text-error transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="pt-6 border-t border-[#2F2F2F]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-[#A3A3A3] uppercase tracking-wider">Total Wholesale Amount</span>
                <span className="text-2xl font-extrabold text-white">${totalAmount.toLocaleString()}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#9E7FFF] to-[#38bdf8] text-white font-bold text-base shadow-glow hover:opacity-90 transition-all flex items-center justify-center space-x-2"
              >
                <span>Proceed to Smart Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center space-x-1.5 mt-3 text-[10px] text-[#A3A3A3]">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                <span>Protected by Stripe Escrow & Agentic Verification</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
