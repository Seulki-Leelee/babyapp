import React from 'react';
import { Home, Heart, BookOpen, Bell, ChevronDown } from 'lucide-react';
import { YuhanKimberlyLogo } from './YuhanKimberlyLogo';
import { MomQLogo } from './MomQLogo';
import type { BabyProfile } from '../types';

interface MobileFrameProps {
  activeTab: 'home' | 'care' | 'diary';
  onChangeTab: (tab: 'home' | 'care' | 'diary') => void;
  children: React.ReactNode;
  onOpenNotificationModal?: () => void;
  activeBaby: BabyProfile;
  onOpenBabyProfileModal: () => void;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  activeTab,
  onChangeTab,
  children,
  onOpenNotificationModal,
  activeBaby,
  onOpenBabyProfileModal,
}) => {
  return (
    <div className="w-full max-w-[430px] min-h-screen bg-cream-100 flex flex-col relative shadow-2xl overflow-hidden border-x border-cream-300/40 font-sans my-0 mx-auto">
      {/* Simulated Mobile Status Bar (iOS style) */}
      <div className="w-full bg-cream-100/95 backdrop-blur-md px-5 pt-3 pb-1 flex justify-between items-center text-[11px] font-bold text-gray-700 select-none z-30 sticky top-0">
        <span>09:41</span>
        <div className="w-20 h-4 bg-black rounded-full mx-auto my-0"></div>
        <div className="flex items-center gap-1.5 text-xs">
          <span>5G</span>
          <div className="w-5 h-2.5 border border-gray-700 rounded-sm p-0.5 flex items-center">
            <div className="h-full w-3/4 bg-gray-700 rounded-2xs"></div>
          </div>
        </div>
      </div>

      {/* Corporate Branding Row 1: Yuhan-Kimberly (Left) & MomQ (Right) */}
      <div className="bg-white/95 backdrop-blur-md px-4 py-2 flex items-center justify-between border-b border-cream-200 z-20 sticky top-7">
        {/* Left: Yuhan-Kimberly Logo */}
        <YuhanKimberlyLogo />

        {/* Right: MomQ Logo + Notification Bell */}
        <div className="flex items-center gap-2">
          <MomQLogo />

          <button
            onClick={onOpenNotificationModal}
            className="w-8 h-8 rounded-full bg-cream-50 border border-cream-200 text-gray-600 flex items-center justify-center relative hover:bg-cream-100 shadow-2xs active:scale-95 transition-transform"
            title="알림 모달 열기"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>

      {/* Baby Profile Interactive Header Bar (Clickable for Profile View/Edit & Twin Switch) */}
      <div
        onClick={onOpenBabyProfileModal}
        className="bg-gradient-to-r from-cream-100 via-amber-50/50 to-cream-50 px-4 py-2.5 flex items-center justify-between border-b border-cream-200 cursor-pointer hover:bg-cream-200/50 transition-colors z-10 select-none group"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-coral-400 shadow-sm shrink-0 bg-white group-hover:scale-105 transition-transform">
            <img
              src={activeBaby.photoUrl}
              alt={activeBaby.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-sm text-gray-900 tracking-tight flex items-center gap-1 group-hover:text-coral-600 transition-colors">
                {activeBaby.name}네
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-coral-500 transition-colors" />
              </h1>
              <span className="bg-coral-100 text-coral-600 font-extrabold text-[10px] px-2 py-0.2 rounded-full border border-coral-200">
                D+{activeBaby.babyDays}일
              </span>
              {activeBaby.isTwin && (
                <span className="bg-amber-100 text-amber-700 font-extrabold text-[10px] px-1.5 py-0.2 rounded-md">
                  쌍둥이
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-500 truncate max-w-[240px]">
              {activeBaby.diaperBrand} • {activeBaby.formulaBrand}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-extrabold text-coral-600 bg-white px-2 py-1 rounded-lg border border-coral-200 shadow-2xs group-hover:bg-coral-50 transition-colors shrink-0">
          프로필/쌍둥이 ▾
        </span>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 px-4 pt-3 overflow-y-auto no-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-md border-t border-cream-200 px-6 py-2 flex justify-around items-center z-40 shadow-lg">
        {/* Tab 1: 육아 기록 */}
        <button
          onClick={() => onChangeTab('home')}
          className={`flex flex-col items-center py-1 transition-all ${
            activeTab === 'home'
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
          <span className="text-[11px] mt-1 font-semibold">육아 기록</span>
        </button>

        {/* Tab 2: 건강 관리 */}
        <button
          onClick={() => onChangeTab('care')}
          className={`flex flex-col items-center py-1 transition-all ${
            activeTab === 'care'
              ? 'text-coral-500 scale-105 font-bold'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {activeTab === 'care' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-coral-500 rounded-full"></span>
            )}
          </div>
          <span className="text-[11px] mt-1 font-semibold">건강 관리</span>
        </button>

        {/* Tab 3: 포토일기 */}
        <button
          onClick={() => onChangeTab('diary')}
          className={`flex flex-col items-center py-1 transition-all ${
            activeTab === 'diary'
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
          <span className="text-[11px] mt-1 font-semibold">포토일기</span>
        </button>
      </nav>
    </div>
  );
};
