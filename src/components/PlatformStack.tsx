import React from 'react';
import { Database, CreditCard, ShoppingBag, Globe, Cpu, Bell, Search, ShieldCheck, Layers, Check } from 'lucide-react';
import { PlatformIntegration } from '../../types';
import { mockPlatformStack } from '../data/mockData';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Database, CreditCard, ShoppingBag, Globe, Cpu, Bell, Search, ShieldCheck,
};

export const PlatformStack: React.FC = () => {
  return (
    <div className="rounded-3xl bg-[#262626]/70 backdrop-blur-xl border border-[#2F2F2F] p-6 md:p-8 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#9E7FFF]" />
          <h2 className="text-xl font-extrabold text-white">Premium Platform Stack</h2>
        </div>
        <span className="text-xs font-bold text-[#9E7FFF] bg-[#9E7FFF]/10 px-3 py-1 rounded-full border border-[#9E7FFF]/20">
          Enterprise Tier
        </span>
      </div>

      <p className="text-xs text-[#A3A3A3] mb-6">
        Enterprise-grade integrations powering the NexusAI ecosystem — connected infrastructure for commerce, payments, AI inference, and global distribution.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockPlatformStack.map((integration: PlatformIntegration) => {
          const Icon = iconMap[integration.icon] ?? Globe;
          return (
            <div
              key={integration.name}
              className={`p-5 rounded-2xl border transition-all ${
                integration.status === 'connected'
                  ? 'bg-[#1f1f1f] border-[#2F2F2F] hover:border-[#9E7FFF]/30'
                  : 'bg-[#1f1f1f]/50 border-[#2F2F2F] opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  integration.status === 'connected'
                    ? 'bg-gradient-to-br from-[#9E7FFF]/20 to-[#38bdf8]/20 border border-[#9E7FFF]/30 text-[#9E7FFF]'
                    : 'bg-[#262626] border border-[#2F2F2F] text-[#A3A3A3]'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                {integration.status === 'connected' ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <Check className="w-3 h-3" />
                    Connected
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-[#A3A3A3]">Available</span>
                )}
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{integration.name}</h3>
              <p className="text-[10px] text-[#A3A3A3] mb-2 leading-relaxed">{integration.description}</p>
              <span className="text-[10px] font-bold text-[#38bdf8]">{integration.tier}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
