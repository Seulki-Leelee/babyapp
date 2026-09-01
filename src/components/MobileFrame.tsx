import React, { useState } from 'react';
import { Home, Heart, BookOpen, Bell, Sparkles, ShieldCheck, ChevronLeft } from 'lucide-react';

interface MobileFrameProps {
  activeTab: 'home' | 'care' | 'diary';
  onChangeTab: (tab: 'home' | 'care' | 'diary') => void;
  children: React.ReactNode;
  diaperAlertCount?: number;
  feverAlertActive?: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  activeTab,
  onChangeTab,
  children,
  feverAlertActive = false,
}) => {
  return (
    <div className="w-full max-w-[430px] min-h-screen bg-cream-100 flex flex-col relative shadow-2xl overflow-hidden border-x border-cream-300/40 font-sans my-0 mx-auto">
      {/* Simulated Mobile Status Bar (iOS style) */}
      <div className="w-full bg-cream-100/90 backdrop-blur-md px-5 pt-3 pb-1 flex justify-between items-center text-[11px] font-bold text-gray-700 select-none z-30 sticky top-0">
        <span>09:41</span>
        <div className="w-20 h-4 bg-black rounded-full mx-auto my-0"></div>
        <div className="flex items-center gap-1.5 text-xs">
          <span>5G</span>
          <div className="w-5 h-2.5 border border-gray-700 rounded-sm p-0.5 flex items-center">
            <div className="h-full w-3/4 bg-gray-700 rounded-2xs"></div>
          </div>
        </div>
      </div>

      {/* Top App Header Bar */}
      <header className="bg-cream-100/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-cream-200/80 z-20 sticky top-7">
        <div className="flex items-center gap-2">
          <img
            src="/kongsim.jpg"
            alt="콩심이 프로필"
            className="w-9 h-9 rounded-full object-cover border-2 border-coral-300 shadow-sm shrink-0"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-sm text-gray-900 tracking-tight">
                콩심이네
              </h1>
              <span className="bg-coral-100 text-coral-600 font-extrabold text-[10px] px-2 py-0.2 rounded-full">
                D+110일
              </span>
            </div>
            <p className="text-[10px] text-gray-500">하기스네이처메이드 3단계 • 분유 완분 케어</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {feverAlertActive && (
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
          )}
          <button className="w-8 h-8 rounded-full bg-white border border-cream-200 text-gray-600 flex items-center justify-center relative hover:bg-cream-50 shadow-sm">
            <Bell className="w-4 h-4" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-coral-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 pt-4 overflow-y-auto no-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-cream-200 px-6 py-2 flex justify-around items-center z-40 shadow-lg">
        {/* Tab 1: Home */}
        <button
          onClick={() => onChangeTab('home')}
          className={`flex flex-col items-center py-1 transition-all ${activeTab === 'home'
            ? 'text-coral-500 scale-105 font-bold'
            : 'text-gray-400 hover:text-gray-600'
            }`}
        >
          <div className="relative">
            <Home className="w-5 h-5" />
            {activeTab === 'home' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-coral-500 rounded-full"></span>
            )}
          </div>
          <span className="text-[11px] mt-1 font-semibold">🏠 홈</span>
        </button>

        {/* Tab 2: Care & Shop */}
        <button
          onClick={() => onChangeTab('care')}
          className={`flex flex-col items-center py-1 transition-all ${activeTab === 'care'
            ? 'text-coral-500 scale-105 font-bold'
            : 'text-gray-400 hover:text-gray-600'
            }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {feverAlertActive && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            )}
            {activeTab === 'care' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-coral-500 rounded-full"></span>
            )}
          </div>
          <span className="text-[11px] mt-1 font-semibold">💖 스마트 케어&샵</span>
        </button>

        {/* Tab 3: Diary */}
        <button
          onClick={() => onChangeTab('diary')}
          className={`flex flex-col items-center py-1 transition-all ${activeTab === 'diary'
            ? 'text-coral-500 scale-105 font-bold'
            : 'text-gray-400 hover:text-gray-600'
            }`}
        >
          <div className="relative">
            <BookOpen className="w-5 h-5" />
            {activeTab === 'diary' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-coral-500 rounded-full"></span>
            )}
          </div>
          <span className="text-[11px] mt-1 font-semibold">📖 포토일기</span>
        </button>
      </nav>
    </div>
  );
};
