import React, { useState } from 'react';
import { X, Key, Copy, Check, Code2, Webhook, Shield, ExternalLink } from 'lucide-react';
import { ApiKey } from '../../types';

interface MakerAPIModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey?: ApiKey | null;
}

export const MakerAPIModal: React.FC<MakerAPIModalProps> = ({ isOpen, onClose, apiKey }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(apiKey?.keyPrefix ?? '');
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
              <h2 className="text-lg font-extrabold text-white">Maker API Access</h2>
              <p className="text-xs text-[#A3A3A3]">
                {apiKey ? `Key: ${apiKey.label}` : 'Generate and manage API keys'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-[#171717] border border-[#2F2F2F] text-white hover:bg-[#2f2f2f] transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {apiKey && (
            <>
              {/* Key display */}
              <div className="rounded-2xl bg-[#171717] border border-[#2F2F2F] p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#A3A3A3] uppercase tracking-wider">
                  <Key className="w-4 h-4 text-[#9E7FFF]" />
                  Your API Key
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm font-mono text-[#9E7FFF] bg-[#1f1f1f] px-4 py-3 rounded-xl border border-[#2F2F2F]">
                    {apiKey.keyPrefix}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="p-3 rounded-xl bg-[#9E7FFF]/10 border border-[#9E7FFF]/30 text-[#9E7FFF] hover:bg-[#9E7FFF]/20 transition-all"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-[#A3A3A3]">
                  ⚠ Copy this key now. For security, the full key is only shown once at creation time.
                </p>
              </div>

              {/* Scopes */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3">Scopes & Permissions</h3>
                <div className="flex flex-wrap gap-2">
                  {apiKey.scopes.map(scope => (
                    <span key={scope} className="text-xs font-mono text-[#38bdf8] bg-[#38bdf8]/10 px-3 py-1.5 rounded-lg border border-[#38bdf8]/20">
                      {scope}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick start snippet */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3">Quick Start Example</h3>
                <div className="rounded-2xl bg-[#171717] border border-[#2F2F2F] overflow-hidden">
                  <pre className="p-4 text-xs font-mono text-[#A3A3A3] overflow-x-auto leading-relaxed">
{`curl -X GET https://api.nexusai.io/v1/products \\
  -H "Authorization: Bearer ${apiKey.keyPrefix}"`}
                  </pre>
                </div>
              </div>
            </>
          )}

          {/* API overview (always shown) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Webhook className="w-4 h-4 text-[#38bdf8]" />
              <h3 className="text-sm font-bold text-white">Base URL & Auth</h3>
            </div>
            <div className="rounded-2xl bg-[#171717] border border-[#2F2F2F] p-4 space-y-2 text-xs text-[#A3A3A3]">
              <div><span className="text-white font-bold">Base URL:</span> <code className="text-[#9E7FFF] font-mono">https://api.nexusai.io/v1</code></div>
              <div><span className="text-white font-bold">Auth:</span> Bearer token in <code className="text-[#38bdf8] font-mono">Authorization</code> header</div>
              <div><span className="text-white font-bold">Format:</span> JSON request/response bodies</div>
              <div><span className="text-white font-bold">Rate limit:</span> 1,000 req/min (Pro tier)</div>
            </div>
          </div>

          {/* Security note */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#A3A3A3] leading-relaxed">
              Never expose your API key in client-side code or public repositories. Use environment variables
              or a secrets manager in production deployments.
            </p>
          </div>

          {/* Docs link */}
          <button
            onClick={() => window.open('#', '_self')}
            className="w-full py-3.5 rounded-2xl bg-[#1f1f1f] hover:bg-[#333] border border-[#2F2F2F] text-sm font-bold text-white transition-all flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4 text-[#9E7FFF]" />
            <span>View Full API Documentation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
