import React, { useState } from 'react';
import { X, Copy, Check, Code2, Webhook, Shield, Terminal } from 'lucide-react';
import { ApiKey } from '../../types';

interface MakerAPIModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey?: ApiKey | null;
}

const endpoints = [
  { method: 'GET',  path: '/api/products',          description: 'List all catalog products with variants and inventory' },
  { method: 'POST', path: '/api/orders',            description: 'Submit a new wholesale order' },
  { method: 'POST', path: '/api/agents/forecast',   description: 'Trigger an AI demand-forecasting agent workflow' },
];

const curlExample = `curl -X GET https://api.nexusai.io/api/products \\
  -H "Authorization: Bearer nxs_live_your_key_here" \\
  -H "Content-Type: application/json"`;

export const MakerAPIModal: React.FC<MakerAPIModalProps> = ({ isOpen, onClose, apiKey }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(curlExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#262626] border border-[#2F2F2F] rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-[#2F2F2F] bg-[#262626]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#9E7FFF]/20 to-[#38bdf8]/20 border border-[#9E7FFF]/30 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-[#9E7FFF]" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">Maker API</h2>
              <p className="text-xs text-[#A3A3A3]">
                {apiKey ? `Key: ${apiKey.label}` : 'Programmatic access to the NexusAI platform'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-[#171717] border border-[#2F2F2F] text-white hover:bg-[#2f2f2f] transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Endpoints */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Webhook className="w-4 h-4 text-[#38bdf8]" />
              <h3 className="text-sm font-bold text-white">Example Endpoints</h3>
            </div>
            <div className="space-y-2">
              {endpoints.map((ep) => (
                <div key={ep.path} className="p-4 rounded-2xl bg-[#1f1f1f] border border-[#2F2F2F] flex items-center gap-3">
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg font-mono w-16 text-center flex-shrink-0 ${
                    ep.method === 'GET'  ? 'bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30' :
                    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {ep.method}
                  </span>
                  <div className="min-w-0">
                    <code className="text-sm font-mono text-white block">{ep.path}</code>
                    <span className="text-xs text-[#A3A3A3]">{ep.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Curl Example with Copy Button */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#9E7FFF]" />
              <h3 className="text-sm font-bold text-white">Quick Start — curl Example</h3>
            </div>
            <div className="rounded-2xl bg-[#171717] border border-[#2F2F2F] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#2F2F2F]">
                <span className="text-xs font-mono text-[#A3A3A3]">bash</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#9E7FFF]/10 border border-[#9E7FFF]/30 text-[#9E7FFF] hover:bg-[#9E7FFF]/20 transition-all text-xs font-bold"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-[#A3A3A3] overflow-x-auto leading-relaxed">
{curlExample}
              </pre>
            </div>
          </div>

          {/* Base URL & Auth */}
          <div className="rounded-2xl bg-[#171717] border border-[#2F2F2F] p-4 space-y-2 text-xs text-[#A3A3A3]">
            <div><span className="text-white font-bold">Base URL:</span> <code className="text-[#9E7FFF] font-mono">https://api.nexusai.io</code></div>
            <div><span className="text-white font-bold">Auth:</span> Bearer token in <code className="text-[#38bdf8] font-mono">Authorization</code> header</div>
            <div><span className="text-white font-bold">Format:</span> JSON request / response</div>
          </div>

          {/* Security note */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Never expose your API key in client-side code or public repositories. Use environment variables in production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
