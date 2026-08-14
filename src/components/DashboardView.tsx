import React from 'react';
import { UserProfile, Order, ProductCatalogItem } from '../types';
import { ShieldCheck, Package, DollarSign, TrendingUp, Clock, CheckCircle2, Truck } from 'lucide-react';

interface DashboardViewProps {
  currentUser: UserProfile;
  orders: Order[];
  products: ProductCatalogItem[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentUser,
  orders,
  products,
  onUpdateOrderStatus,
}) => {
  const totalVolume = orders.reduce((sum, o) => sum + o.totalAmountUSD, 0);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center space-x-2 text-[#9E7FFF] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Enterprise Dashboard</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {currentUser.companyName}
          </h2>
        </div>

        <div className="flex items-center space-x-3 bg-[#262626] border border-[#2F2F2F] px-5 py-3 rounded-2xl">
          <span className="w-3 h-3 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Role: {currentUser.role.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="p-6 rounded-3xl bg-[#262626] border border-[#2F2F2F] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase text-[#A3A3A3] font-bold">Total Volume</span>
            <DollarSign className="w-5 h-5 text-[#9E7FFF]" />
          </div>
          <p className="text-3xl font-extrabold text-white">${totalVolume.toLocaleString()}</p>
          <span className="text-[10px] text-success mt-1 block">+18.4% from last month</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#262626] border border-[#2F2F2F] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase text-[#A3A3A3] font-bold">Active Orders</span>
            <Package className="w-5 h-5 text-[#38bdf8]" />
          </div>
          <p className="text-3xl font-extrabold text-white">{orders.length}</p>
          <span className="text-[10px] text-[#38bdf8] mt-1 block">Escrow secured</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#262626] border border-[#2F2F2F] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase text-[#A3A3A3] font-bold">SKUs Cataloged</span>
            <TrendingUp className="w-5 h-5 text-[#f472b6]" />
          </div>
          <p className="text-3xl font-extrabold text-white">{products.length}</p>
          <span className="text-[10px] text-[#f472b6] mt-1 block">Global distribution</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#262626] border border-[#2F2F2F] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase text-[#A3A3A3] font-bold">Agent Uptime</span>
            <ShieldCheck className="w-5 h-5 text-success" />
          </div>
          <p className="text-3xl font-extrabold text-white">99.9%</p>
          <span className="text-[10px] text-success mt-1 block">All systems operational</span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#262626] border border-[#2F2F2F] rounded-3xl p-8 shadow-xl">
        <h3 className="text-xl font-extrabold text-white mb-6">Recent Wholesale Orders & Settlements</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2F2F2F] text-xs uppercase text-[#A3A3A3]">
                <th className="pb-4 font-bold">Order ID</th>
                <th className="pb-4 font-bold">Buyer / Brand</th>
                <th className="pb-4 font-bold">Amount</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold">Date</th>
                <th className="pb-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2F2F2F] text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-[#171717]/50 transition-colors">
                  <td className="py-4 font-mono font-bold text-white">{order.id}</td>
                  <td className="py-4 text-[#A3A3A3]">
                    {order.buyerId === currentUser.id ? 'Self (Buyer)' : 'Nordstrom Retail Group'}
                  </td>
                  <td className="py-4 font-extrabold text-white">${order.totalAmountUSD.toLocaleString()}</td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      order.status === 'approved' ? 'bg-success/20 text-success' :
                      order.status === 'shipped' ? 'bg-[#38bdf8]/20 text-[#38bdf8]' :
                      'bg-[#9E7FFF]/20 text-[#9E7FFF]'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-xs text-[#A3A3A3]">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 text-right">
                    {currentUser.role === 'brand_admin' && order.status === 'submitted' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'approved')}
                        className="px-4 py-2 rounded-xl bg-success text-white text-xs font-bold hover:opacity-90 transition-all"
                      >
                        Approve Order
                      </button>
                    )}
                    {currentUser.role === 'brand_admin' && order.status === 'approved' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'shipped')}
                        className="px-4 py-2 rounded-xl bg-[#38bdf8] text-white text-xs font-bold hover:opacity-90 transition-all"
                      >
                        Mark Shipped
                      </button>
                    )}
                    {order.status === 'shipped' && (
                      <span className="text-xs text-success font-bold flex items-center justify-end space-x-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completed</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
