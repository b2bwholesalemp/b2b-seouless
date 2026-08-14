import React from 'react';
import { Sparkles, ShoppingBag, ShieldCheck, Cpu, Bell, User, LogOut } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentUser: UserProfile;
  onSwitchUser: (user: UserProfile) => void;
  allUsers: UserProfile[];
  cartCount: number;
  onOpenCart: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onSwitchUser,
  allUsers,
  cartCount,
  onOpenCart,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#171717]/85 border-b border-[#2F2F2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('explore')}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#9E7FFF] via-[#38bdf8] to-[#f472b6] p-[2px] shadow-glow flex items-center justify-center">
            <div className="w-full h-full bg-[#171717] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#9E7FFF] animate-pulse" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-[#9E7FFF] bg-clip-text text-transparent">
              AuraSync AI
            </span>
            <span className="block text-xs text-[#A3A3A3] font-medium tracking-widest uppercase">
              Agentic Ecosystem
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1 bg-[#262626]/80 p-1.5 rounded-full border border-[#2F2F2F]">
          <button
            onClick={() => setActiveTab('explore')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'explore'
                ? 'bg-[#9E7FFF] text-white shadow-lg shadow-[#9E7FFF]/25'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('agents')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
              activeTab === 'agents'
                ? 'bg-[#9E7FFF] text-white shadow-lg shadow-[#9E7FFF]/25'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Agents</span>
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === 'dashboard'
                ? 'bg-[#9E7FFF] text-white shadow-lg shadow-[#9E7FFF]/25'
                : 'text-[#A3A3A3] hover:text-white'
            }`}
          >
            Dashboard & Orders
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          {currentUser.role === 'retailer_buyer' && (
            <button
              onClick={onOpenCart}
              className="relative p-3 rounded-2xl bg-[#262626] border border-[#2F2F2F] hover:border-[#9E7FFF] transition-all duration-300 text-white group"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform text-[#9E7FFF]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#f472b6] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#171717] animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* User Switcher Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-3 bg-[#262626] hover:bg-[#2F2F2F] border border-[#2F2F2F] px-4 py-2.5 rounded-2xl transition-all duration-300">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#9E7FFF] to-[#38bdf8] flex items-center justify-center text-white font-bold text-sm">
                {currentUser.companyName.charAt(0)}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-white leading-none">{currentUser.companyName}</p>
                <p className="text-[10px] text-[#A3A3A3] uppercase mt-1 tracking-wider">{currentUser.role.replace('_', ' ')}</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-64 bg-[#262626] border border-[#2F2F2F] rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="px-3 py-2 border-b border-[#2F2F2F] mb-1">
                <p className="text-xs text-[#A3A3A3]">Switch Persona:</p>
              </div>
              {allUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => onSwitchUser(u)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                    u.id === currentUser.id
                      ? 'bg-[#9E7FFF]/20 text-[#9E7FFF] border border-[#9E7FFF]/40'
                      : 'text-[#A3A3A3] hover:bg-[#171717] hover:text-white'
                  }`}
                >
                  <div>
                    <span className="block font-bold text-white">{u.companyName}</span>
                    <span className="text-[10px] text-[#38bdf8] uppercase">{u.role.replace('_', ' ')}</span>
                  </div>
                  {u.id === currentUser.id && <ShieldCheck className="w-4 h-4 text-[#9E7FFF]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
