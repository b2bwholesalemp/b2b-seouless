import React, { useState } from 'react';
import { X, Sparkles, Rocket, BookOpen, ShieldCheck, ArrowRight, Check } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    icon: Sparkles,
    title: 'Welcome to NexusAI',
    description: 'Your autonomous B2B commerce and agentic AI ecosystem. This quick tour covers the essentials.',
    color: 'text-[#9E7FFF]',
  },
  {
    icon: Rocket,
    title: 'Explore the Dashboard',
    description: 'Monitor wholesale volume, active agents, and real-time inventory across all your warehouses from one immersive dashboard.',
    color: 'text-[#38bdf8]',
  },
  {
    icon: BookOpen,
    title: 'B2B Catalog & Orders',
    description: 'Browse the catalog, manage SKUs with variants, and submit wholesale orders with escrow-protected checkout powered by Stripe.',
    color: 'text-[#f472b6]',
  },
  {
    icon: ShieldCheck,
    title: 'Maker API & Platform Stack',
    description: 'Generate API keys to build integrations, trigger autonomous agent workflows, and connect premium infrastructure like Supabase, Shopify, and Vercel.',
    color: 'text-emerald-400',
  },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      onClose();
      setCurrentStep(0);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-[#262626] border border-[#2F2F2F] rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1c1c1c] to-[#171717] px-6 py-8 border-b border-[#2F2F2F]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#9E7FFF]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
          <button
            onClick={() => { onClose(); setCurrentStep(0); }}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#262626] border border-[#2F2F2F] text-white hover:bg-[#2f2f2f] transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9E7FFF]/20 to-[#38bdf8]/20 border border-[#9E7FFF]/30 flex items-center justify-center">
              <Icon className={`w-6 h-6 ${step.color}`} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">{step.title}</h2>
              <p className="text-xs text-[#9E7FFF] font-bold">Step {currentStep + 1} of {steps.length}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-sm text-[#A3A3A3] leading-relaxed mb-6">{step.description}</p>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentStep ? 'w-8 bg-[#9E7FFF]' : i < currentStep ? 'w-4 bg-[#9E7FFF]/40' : 'w-4 bg-[#2F2F2F]'
                }`}
              />
            ))}
          </div>

          {/* Quick links */}
          {isLast && (
            <div className="space-y-2 mb-6">
              {['Dashboard overview', 'B2B Catalog', 'Agentic Hub', 'API Access'].map((link) => (
                <div key={link} className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{link}</span>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => { onClose(); setCurrentStep(0); }}
              className="text-xs font-bold text-[#A3A3A3] hover:text-white transition-all"
            >
              Skip tour
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#9E7FFF] to-[#805ad5] text-white font-bold text-sm shadow-lg shadow-[#9E7FFF]/30 hover:shadow-[#9E7FFF]/50 transition-all flex items-center gap-2"
            >
              <span>{isLast ? 'Get Started' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
