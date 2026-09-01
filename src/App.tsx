import React, { useState } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { HomeTab } from './components/HomeTab';
import { CareShopTab } from './components/CareShopTab';
import { DiaryTab } from './components/DiaryTab';
import { TempModal } from './components/TempModal';
import { BarcodeModal } from './components/BarcodeModal';
import { AiScanModal } from './components/AiScanModal';
import { DiaryModal } from './components/DiaryModal';
import { InventoryModal } from './components/InventoryModal';

import type {
  TimelineLog,
  DiaperInventory,
  FormulaInventory,
  CoParentingStatus,
  TemperatureState,
  PhotoDiaryItem
} from './types';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'care' | 'diary'>('home');

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // 1. Diaper Inventory State (Starts low at 18)
  const [diaperInventory, setDiaperInventory] = useState<DiaperInventory>({
    brandName: '순둥이 기저귀 2단계',
    currentCount: 18,
    maxCount: 60,
    couponClaimed: false,
  });

  // 2. Formula Inventory State (Starts low at 2 cans)
  const [formulaInventory, setFormulaInventory] = useState<FormulaInventory>({
    brandName: '앱솔루트 명작 1단계 (800g)',
    currentCount: 2,
    maxCount: 8,
    couponClaimed: false,
  });

  // 3. Temperature State (38.2°C Fever Alert Active)
  const [tempState, setTempState] = useState<TemperatureState>({
    currentTemp: 38.2,
    isHighFever: true,
    antipyreticTimer: 14400,
  });

  // 4. Co-Parenting Status
  const [coParenting, setCoParenting] = useState<CoParentingStatus>({
    activeParent: '엄마',
    partnerName: '아빠',
    elapsedText: '마지막 수유 후 1시간 경과',
    lastFeedingTime: '10:30',
  });

  // 5. Parenting Timeline Logs (4 Initial Items)
  const [logs, setLogs] = useState<TimelineLog[]>([
    {
      id: '1',
      type: 'temperature',
      time: '10:30',
      title: '🌡️ 체온 38.2°C 측정',
      detail: '접종열 의심 (해열제 3.5ml 투여 완료, 4h 타이머 발동)',
      badge: '고열 경고 🚨',
      iconBg: 'bg-red-100 text-red-600',
    },
    {
      id: '2',
      type: 'sleep',
      time: '10:00',
      title: '😴 낮잠 1시간 10분',
      detail: '스위트드림 백색소음 입면',
      iconBg: 'bg-indigo-100 text-indigo-600',
    },
    {
      id: '3',
      type: 'diaper',
      time: '09:15',
      title: '🧷 기저귀 소변 교체',
      detail: '순둥이 2단계 교체 (잔여 18매)',
      iconBg: 'bg-amber-100 text-amber-600',
    },
    {
      id: '4',
      type: 'feeding',
      time: '08:30',
      title: '🍼 분유 수유 140ml',
      detail: '앱솔루트 명작 완분',
      iconBg: 'bg-coral-100 text-coral-600',
    },
  ]);

  // 6. Photo Diary (1 Preloaded Item)
  const [diaries, setDiaries] = useState<PhotoDiaryItem[]>([
    {
      id: 'init-1',
      babyDays: 120,
      date: '2026.09.01',
      imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80',
      moodEmoji: '👶',
      content: '오늘 처음으로 뒤집기 성공했어요! 👶',
      likesCount: 12,
      isLiked: true,
      crmProduct: {
        title: '📸 첫 뒤집기 성장 기념 굿즈',
        productName: '아기 성장 아크릴 포토액자 1+1 커스텀',
        discountText: 'D2C 작성 20% 특별 쿠폰',
        price: '15,200원',
        tag: '추억 소장 큐레이션',
      },
    },
  ]);

  // Modal States
  const [isTempModalOpen, setIsTempModalOpen] = useState(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [isAiScanModalOpen, setIsAiScanModalOpen] = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);

  // Actions
  const handleAddLog = (newLog: TimelineLog) => {
    setLogs([newLog, ...logs]);
  };

  const handleDecrementDiaper = () => {
    setDiaperInventory((prev) => {
      const nextCount = Math.max(0, prev.currentCount - 1);
      if (nextCount <= 15) {
        showToast('⚠️ 기저귀 잔여량이 15매 이하입니다! 알림 배너를 클릭해 10% 쿠폰으로 리필하세요.');
      }
      return { ...prev, currentCount: nextCount };
    });
  };

  const handleClaimDiaperCoupon = () => {
    setDiaperInventory((prev) => ({ ...prev, couponClaimed: true }));
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}
    showToast('🎉 순둥이 기저귀 10% 리필 할인 쿠폰이 발급되었습니다!');
  };

  const handleClaimFormulaCoupon = () => {
    setFormulaInventory((prev) => ({ ...prev, couponClaimed: true }));
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}
    showToast('🎉 앱솔루트 명작 분유 15% 정기배송 전용 쿠폰이 발급되었습니다!');
  };

  const handleToggleParent = () => {
    setCoParenting((prev) => ({
      ...prev,
      activeParent: prev.activeParent === '엄마' ? '아빠' : '엄마',
      partnerName: prev.activeParent === '엄마' ? '엄마' : '아빠',
      elapsedText: '방금 육아 교대 완료됨',
    }));
    showToast(`👨‍👩‍👧 공동육아 바통터치! [${coParenting.activeParent === '엄마' ? '아빠' : '엄마'}]가 육아를 교대받았습니다.`);
  };

  const handleSaveTemp = (temp: number) => {
    const isFever = temp >= 38.0;
    setTempState({
      currentTemp: temp,
      isHighFever: isFever,
      antipyreticTimer: isFever ? 14400 : 0,
    });

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    handleAddLog({
      id: Date.now().toString(),
      type: 'temperature',
      time: timeStr,
      title: `🌡️ 체온 ${temp.toFixed(1)}°C 측정`,
      detail: isFever ? '고열 경고 뱃지 발동 및 해열제 타이머 세팅' : '정상 체온 범위',
      badge: isFever ? '고열 경고 🚨' : undefined,
      iconBg: isFever ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600',
    });

    if (isFever) {
      showToast('🚨 38.0°C 이상 고열 감지! 스마트 케어&샵 탭에 긴급 큐레이션이 배치되었습니다.');
    } else {
      showToast(`✅ 체온 ${temp.toFixed(1)}°C 기록이 완료되었습니다.`);
    }
  };

  const handleRefillDiaperBarcode = (refillCount: number) => {
    setDiaperInventory((prev) => ({ ...prev, currentCount: refillCount }));
    showToast('🎉 정품 바코드 인증 완료! 기저귀 60매 충전 & 1,000P 적립 완료');
  };

  const handleAddDiary = (newItem: PhotoDiaryItem) => {
    setDiaries([newItem, ...diaries]);
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
    showToast('📖 오늘의 포토 육아일기가 정상 등록되었습니다!');
  };

  const handleToggleLike = (id: string) => {
    setDiaries((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextLiked = !item.isLiked;
          return {
            ...item,
            isLiked: nextLiked,
            likesCount: nextLiked ? item.likesCount + 1 : item.likesCount - 1,
          };
        }
        return item;
      })
    );
  };

  const handleSelectProduct = (productName: string) => {
    showToast(`🛒 [${productName}] 자사몰 결제 페이지로 연결됩니다 (D2C CRM 연동)`);
  };

  return (
    <MobileFrame
      activeTab={activeTab}
      onChangeTab={setActiveTab}
      feverAlertActive={tempState.isHighFever}
    >
      {/* Toast Banner Overlay */}
      {toastMessage && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[390px] bg-gray-900/90 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-float backdrop-blur-md border border-white/20 animate-slide-up flex items-center justify-between">
          <span className="flex-1 mr-2">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Tab Renderers */}
      {activeTab === 'home' && (
        <HomeTab
          logs={logs}
          onAddLog={handleAddLog}
          diaperInventory={diaperInventory}
          formulaInventory={formulaInventory}
          onDecrementDiaper={handleDecrementDiaper}
          coParenting={coParenting}
          onToggleParent={handleToggleParent}
          tempState={tempState}
          onOpenTempModal={() => setIsTempModalOpen(true)}
          onOpenInventoryModal={() => setIsInventoryModalOpen(true)}
        />
      )}

      {activeTab === 'care' && (
        <CareShopTab
          tempState={tempState}
          onOpenAiScan={() => setIsAiScanModalOpen(true)}
          onOpenBarcodeModal={() => setIsBarcodeModalOpen(true)}
          onSelectProduct={handleSelectProduct}
        />
      )}

      {activeTab === 'diary' && (
        <DiaryTab
          diaries={diaries}
          onOpenDiaryModal={() => setIsDiaryModalOpen(true)}
          babyDays={120}
          onToggleLike={handleToggleLike}
          onSelectProduct={handleSelectProduct}
        />
      )}

      {/* Interactive Modals */}
      <TempModal
        isOpen={isTempModalOpen}
        onClose={() => setIsTempModalOpen(false)}
        onSave={handleSaveTemp}
        initialTemp={tempState.currentTemp}
      />

      <BarcodeModal
        isOpen={isBarcodeModalOpen}
        onClose={() => setIsBarcodeModalOpen(false)}
        onScanSuccess={handleRefillDiaperBarcode}
      />

      <AiScanModal
        isOpen={isAiScanModalOpen}
        onClose={() => setIsAiScanModalOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      <DiaryModal
        isOpen={isDiaryModalOpen}
        onClose={() => setIsDiaryModalOpen(false)}
        onAddDiary={handleAddDiary}
        babyDays={120}
      />

      <InventoryModal
        isOpen={isInventoryModalOpen}
        onClose={() => setIsInventoryModalOpen(false)}
        diaperInventory={diaperInventory}
        formulaInventory={formulaInventory}
        onClaimDiaperCoupon={handleClaimDiaperCoupon}
        onClaimFormulaCoupon={handleClaimFormulaCoupon}
        onOpenBarcodeModal={() => setIsBarcodeModalOpen(true)}
        onOrderProduct={handleSelectProduct}
      />
    </MobileFrame>
  );
};

export default App;
