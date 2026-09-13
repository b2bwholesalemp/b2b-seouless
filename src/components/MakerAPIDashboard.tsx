import React, { useState } from 'react';
import { Key, Plus, Copy, Trash2, Activity, Code2, Webhook, Shield, ChevronRight } from 'lucide-react';
import { ApiKey, ApiEndpoint, ApiUsageStat } from '../../types';
import { mockApiKeys, mockApiEndpoints, mockApiUsage } from '../data/mockData';

interface MakerAPIDashboardProps {
  onOpenModal: (key?: ApiKey) => void;
}

export const MakerAPIDashboard: React.FC<MakerAPIDashboardProps> = ({ onOpenModal }) => {
  const [keys, setKeys] = useState<ApiKey[]>(mockApiKeys);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (key: ApiKey) => {
    navigator.clipboard?.writeText(key.keyPrefix);
    setCopiedId(key.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRevoke = (keyId: string) => {
    setKeys(keys.map(k => k.id === keyId ? { ...k, status: 'revoked' as const } : k));
  };

  const handleCreate = () => {
    const newKey: ApiKey = {
      id: `key_${Date.now()}`,
      label: 'New API Key',
      keyPrefix: `nxs_live_…${Math.random().toString(16).slice(2, 6)}`,
      scopes: ['catalog:read'],
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
      status: 'active',
    };
    setKeys([newKey, ...keys]);
    onOpenModal(newKey);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#262626] via-[#1c1c1c] to-[#171717] border border-[#2F2F2F] p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#9E7FFF]/15 via-[#38bdf8]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E7FFF]/10 border border-[#9E7FFF]/30 text-[#9E7FFF] text-xs font-bold mb-6">
            <Code2 className="w-4 h-4" />
            <span>Maker API — Developer Platform</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Build on the <span className="bg-gradient-to-r from-[#9E7FFF] via-[#38bdf8] to-white bg-clip-text text-transparent">NexusAI API</span>
          </h1>
          <p className="text-[#A3A3A3] text-base md:text-lg mb-8 leading-relaxed">
            Programmatically manage your B2B catalog, submit wholesale orders, and trigger autonomous agent workflows. REST endpoints with API-key authentication.
          </p>
          <button
            onClick={handleCreate}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#9E7FFF] to-[#805ad5] text-white font-bold text-sm shadow-lg shadow-[#9E7FFF]/30 hover:shadow-[#9E7FFF]/50 hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Generate New API Key</span>
          </button>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {mockApiUsage.map((stat: ApiUsageStat, i) => (
          <div key={i} className="rounded-3xl bg-[#262626]/70 backdrop-blur-xl border border-[#2F2F2F] p-6 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#A3A3A3] uppercase tracking-wider">
              <Activity className="w-4 h-4 text-[#38bdf8]" />
              {stat.label}
            </div>
            <div className="text-2xl font-extrabold text-white">{stat.value}</div>
            <div className="text-xs text-emerald-400 font-semibold">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* API Keys Table */}
      <div className="rounded-3xl bg-[#262626]/70 backdrop-blur-xl border border-[#2F2F2F] p-6 md:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-[#9E7FFF]" />
            <h2 className="text-xl font-extrabold text-white">API Keys</h2>
          </div>
          <span className="text-xs text-[#A3A3A3]">{keys.filter(k => k.status === 'active').length} active</span>
        </div>

        <div className="space-y-3">
          {keys.map((key) => (
            <div
              key={key.id}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                key.status === 'active'
                  ? 'bg-[#1f1f1f] border-[#2F2F2F] hover:border-[#9E7FFF]/30'
                  : 'bg-[#1f1f1f]/50 border-[#2F2F2F] opacity-60'
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-bold text-white truncate">{key.label}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    key.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/10 text-red-400 border border-red-500/30'
                  }`}>
                    {key.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-[#9E7FFF] font-mono bg-[#171717] px-2.5 py-1 rounded-lg border border-[#2F2F2F]">{key.keyPrefix}</code>
                  <button onClick={() => handleCopy(key)} className="p-1.5 rounded-lg hover:bg-[#333] text-[#A3A3A3] hover:text-white transition-all">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {copiedId === key.id && <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {key.scopes.map(scope => (
                    <span key={scope} className="text-[10px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded-md border border-[#38bdf8]/20">{scope}</span>
                  ))}
                </div>
                <p className="text-[10px] text-[#A3A3A3] mt-2">
                  Created {new Date(key.createdAt).toLocaleDateString()}
                  {key.lastUsedAt ? ` · Last used ${new Date(key.lastUsedAt).toLocaleDateString()}` : ' · Never used'}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => onOpenModal(key)}
                  className="p-2.5 rounded-xl bg-[#262626] border border-[#2F2F2F] text-[#A3A3A3] hover:text-white hover:border-[#9E7FFF]/40 transition-all"
                  title="View details"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                {key.status === 'active' && (
                  <button
                    onClick={() => handleRevoke(key.id)}
                    className="p-2.5 rounded-xl bg-[#262626] border border-[#2F2F2F] text-[#A3A3A3] hover:text-red-400 hover:border-red-500/40 transition-all"
                    title="Revoke key"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Endpoints Reference */}
      <div className="rounded-3xl bg-[#262626]/70 backdrop-blur-xl border border-[#2F2F2F] p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Webhook className="w-5 h-5 text-[#9E7FFF]" />
          <h2 className="text-xl font-extrabold text-white">API Endpoints</h2>
        </div>

        <div className="space-y-2">
          {mockApiEndpoints.map((ep: ApiEndpoint, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#1f1f1f] border border-[#2F2F2F] flex items-center gap-4 hover:border-[#9E7FFF]/20 transition-all">
              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg font-mono w-16 text-center ${
                ep.method === 'GET'    ? 'bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30' :
                ep.method === 'POST'   ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                ep.method === 'PUT'    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                                         'bg-red-500/10 text-red-400 border border-red-500/30'
              }`}>
                {ep.method}
              </span>
              <code className="text-sm font-mono text-white flex-shrink-0">{ep.path}</code>
              <span className="text-xs text-[#A3A3A3] hidden md:block">{ep.description}</span>
              <span className="ml-auto text-[10px] font-bold text-[#9E7FFF] bg-[#9E7FFF]/10 px-2 py-0.5 rounded-full border border-[#9E7FFF]/20 flex-shrink-0">{ep.category}</span>
            </div>
          ))}
        </div>

        {/* Code Example */}
        <div className="mt-6 rounded-2xl bg-[#171717] border border-[#2F2F2F] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2F2F2F]">
            <Shield className="w-4 h-4 text-[#9E7FFF]" />
            <span className="text-xs font-bold text-white">Quick Start — Submit a Wholesale Order</span>
          </div>
          <pre className="p-4 text-xs font-mono text-[#A3A3A3] overflow-x-auto leading-relaxed">
{`curl -X POST https://api.nexusai.io/v1/orders \\
  -H "Authorization: Bearer nxs_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "items": [
      { "productId": "prod_1", "variantId": "v_2", "quantity": 50 }
    ]
  }'`}
          </pre>
        </div>
      </div>
    </div>
  );
};
