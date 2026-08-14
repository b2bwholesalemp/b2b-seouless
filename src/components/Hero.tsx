import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, TrendingUp, Globe } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenAgents: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenAgents }) => {
  return (
    <div className="relative overflow-hidden py-24 lg:py-32 bg-gradient-to-b from-[#171717] via-[#1c1924] to-[#171717]">
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9E7FFF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#38bdf8]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#262626]/90 border border-[#2F2F2F] px-4 py-2 rounded-full mb-8 shadow-lg backdrop-blur-md animate-fade-in">
            <Sparkles className="w-4 h-4 text-[#9E7FFF]" />
            <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">
              Next-Gen Autonomous Agentic SaaS Ecosystem
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            Where Autonomous AI <br />
            <span className="bg-gradient-to-r from-[#9E7FFF] via-[#38bdf8] to-[#f472b6] bg-clip-text text-transparent">
              Powers Global Commerce
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#A3A3A3] mb-12 font-normal leading-relaxed max-w-3xl mx-auto">
            Experience the future of B2B wholesale and brand scaling. Autonomous agents forecast trends, optimize inventory, negotiate smart contracts, and execute transactions in real-time.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#9E7FFF] to-[#38bdf8] text-white font-bold text-base shadow-glow hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 group"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onOpenAgents}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#262626] border border-[#2F2F2F] text-white font-bold text-base hover:border-[#9E7FFF] hover:bg-[#2f2f2f] transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <Zap className="w-5 h-5 text-[#38bdf8]" />
              <span>Launch AI Workflows</span>
            </button>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-16 border-t border-[#2F2F2F]">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-white mb-1">$450M+</p>
              <p className="text-xs text-[#A3A3A3] uppercase tracking-wider">Processed Volume</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-[#9E7FFF] mb-1">99.9%</p>
              <p className="text-xs text-[#A3A3A3] uppercase tracking-wider">Agent Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-[#38bdf8] mb-1">2,400+</p>
              <p className="text-xs text-[#A3A3A3] uppercase tracking-wider">Global Brands</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-[#f472b6] mb-1">0.4s</p>
              <p className="text-xs text-[#A3A3A3] uppercase tracking-wider">Smart Settlement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
