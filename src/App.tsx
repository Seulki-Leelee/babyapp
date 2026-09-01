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
import { NotificationModal } from './components/NotificationModal';
import { LogDetailModal } from './components/LogDetailModal';

import type {
  TimelineLog,
  DiaperInventory,
  FormulaInventory,
  CoParentingStatus,
  TemperatureState,
  PhotoDiaryItem,
  CaregiverType,
  NotificationItem
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
    brandName: '하기스 네이처메이드 3단계',
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

  // 4. Co-Parenting Caregiver Status
  const [coParenting, setCoParenting] = useState<CoParentingStatus>({
    activeParent: '엄마',
    elapsedText: '마지막 수유 후 1시간 경과',
    lastFeedingTime: '10:30',
  });

  // 5. Mock Notifications List for Bell Icon Modal
  const [notifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      type: 'fever',
      title: '🚨 고열 주의 알림 (38.2°C)',
      message: '접종열 의심 체온이 감지되었습니다. 4시간 간격 해열제 투약 타이머가 작동 중입니다.',
      time: '10분 전',
      isRead: false,
    },
    {
      id: 'n2',
      type: 'inventory',
      title: '⚠️ 기저귀 & 분유 소진 임박',
      message: '기저귀 18매, 분유 2캔 남았습니다. 10% 전용 할인 쿠폰을 받아 바로 리필하세요.',
      time: '30분 전',
      isRead: false,
    },
    {
      id: 'n3',
      type: 'vaccine',
      title: '💉 접종 D-3 폐구균 2차',
      message: '폐구균 2차 예방접종 예정일 3일 전입니다. 접종 후 체온 모니터링을 준비하세요.',
      time: '오늘 09:00',
      isRead: true,
    },
    {
      id: 'n4',
      type: 'baton',
      title: '👩‍🍼 공동육아 교대 알림',
      message: '엄마 ➔ 아빠 육아 바통터치가 완료되었습니다.',
      time: '1시간 전',
      isRead: true,
    },
  ]);

  // 6. Parenting Timeline Logs
  const [logs, setLogs] = useState<TimelineLog[]>([
    {
      id: '1',
      type: 'temperature',
      time: '10:30',
      title: '체온 38.2°C 측정',
      detail: '접종열 의심 (해열제 3.5ml 투여 완료, 4h 타이머 발동)',
      badge: '고열 경고 🚨',
      iconBg: 'bg-red-100 text-red-600',
    },
    {
      id: '2',
      type: 'sleep',
      time: '10:00',
      title: '낮잠 1시간 10분',
      detail: '스위트드림 백색소음 입면',
      iconBg: 'bg-indigo-100 text-indigo-600',
    },
    {
      id: '3',
      type: 'diaper',
      time: '09:15',
      title: '기저귀 소변 교체',
      detail: '하기스 3단계 소변 교체 (잔여 18매)',
      diaperType: 'pee',
      iconBg: 'bg-amber-100 text-amber-600',
    },
    {
      id: '4',
      type: 'formula',
      time: '08:30',
      title: '분유 수유 160ml',
      detail: '앱솔루트 명작 완분',
      iconBg: 'bg-coral-100 text-coral-600',
    },
  ]);

  // 7. Photo Diaries for Today and Past 5 Days (과거 5일간의 포토일기 데이터)
  const [diaries, setDiaries] = useState<PhotoDiaryItem[]>([
    {
      id: 'init-1',
      babyDays: 110,
      date: '2026.09.01',
      imageUrl: '/kongsim.jpg',
      moodEmoji: '👶',
      title: '오늘 처음으로 스스로 뒤집기 성공!',
      content: '오늘 아침 콩심이가 끙차 소리를 내며 온몸에 힘을 주더니, 드디어 혼자 힘으로 완전히 360도 뒤집기에 성공했다! 뒤집고 나서 스스로가 대견했는지 눈을 동그랗게 뜨고 환하게 웃는데 정말 감동이었다.',
      likesCount: 12,
      isLiked: true,
    },
    {
      id: 'init-2',
      babyDays: 109,
      date: '2026.08.31',
      imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80',
      moodEmoji: '🥰',
      title: '터미타임 5분 버티기 신기록달성',
      content: '엎드려서 고개 높이 들기 연습 5분 돌파! 안전 거울에 비친 자기 얼굴을 보며 아구아구 옹알이하는 모습이 너무 귀여웠다.',
      likesCount: 8,
      isLiked: true,
    },
    {
      id: 'init-3',
      babyDays: 108,
      date: '2026.08.30',
      imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80',
      moodEmoji: '🥳',
      title: '소리 내어 깔깔깔 장난친 날',
      content: '아빠가 간지럼을 태워주자 처음으로 깔깔 소리 내어 크게 웃었다. 집안 전체가 콩심이 웃음소리로 가득 차서 온 가족이 행복했던 하루.',
      likesCount: 15,
      isLiked: false,
    },
    {
      id: 'init-4',
      babyDays: 107,
      date: '2026.08.29',
      imageUrl: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80',
      moodEmoji: '🛁',
      title: '시원한 쿨링 입욕 목욕 타임',
      content: '따뜻한 미온수에 하이드로 바스 입욕제를 넣고 목욕시켰더니 물장구를 치며 신이 났다. 목욕 후 분유 180ml 싹 비우고 꿀잠 입면!',
      likesCount: 6,
      isLiked: false,
    },
    {
      id: 'init-5',
      babyDays: 106,
      date: '2026.08.28',
      imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
      moodEmoji: '🔔',
      title: '손목 딸랑이 신체 인지 성공',
      content: '오른쪽 손목에 폭신한 딸랑이를 차주었더니 팔을 찰랑찰랑 흔들 때마다 나는 소리에 신기해서 한참을 흔들어 대며 즐거워했다.',
      likesCount: 10,
      isLiked: true,
    },
    {
      id: 'init-6',
      babyDays: 105,
      date: '2026.08.27',
      imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
      moodEmoji: '👼',
      title: '예방접종 후 쿨링 케어 & 단잠',
      content: '소아과에서 접종받고 와서 살짝 미열이 났지만 쿨링 패치 붙여주고 잘 케어해 주니 밤새 단잠 자고 열도 쏙 내려갔다. 기특한 콩심이!',
      likesCount: 9,
      isLiked: false,
    },
  ]);

  // Modal States
  const [isTempModalOpen, setIsTempModalOpen] = useState(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [isAiScanModalOpen, setIsAiScanModalOpen] = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedLogForEdit, setSelectedLogForEdit] = useState<TimelineLog | null>(null);

  // Actions
  const handleAddLog = (newLog: TimelineLog) => {
    setLogs([newLog, ...logs]);
  };

  const handleUpdateLog = (updatedLog: TimelineLog) => {
    setLogs((prev) => prev.map((l) => (l.id === updatedLog.id ? updatedLog : l)));
    showToast('✏️ 육아 기록 정보가 수정되었습니다!');
  };

  const handleDeleteLog = (logId: string) => {
    setLogs((prev) => prev.filter((l) => l.id !== logId));
    showToast('🗑️ 육아 타임라인 기록이 삭제되었습니다.');
  };

  const handleDecrementDiaper = () => {
    setDiaperInventory((prev) => {
      const nextCount = Math.max(0, prev.currentCount - 1);
      if (nextCount <= 15) {
        showToast('⚠️ 기저귀 잔여량이 15매 이하입니다! 알림을 통해 쿠폰을 받아보세요.');
      }
      return { ...prev, currentCount: nextCount };
    });
  };

  const handleClaimDiaperCoupon = () => {
    setDiaperInventory((prev) => ({ ...prev, couponClaimed: true }));
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}
    showToast('🎉 하기스 기저귀 10% 리필 할인 쿠폰이 발급되었습니다!');
  };

  const handleClaimFormulaCoupon = () => {
    setFormulaInventory((prev) => ({ ...prev, couponClaimed: true }));
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}
    showToast('🎉 앱솔루트 명작 분유 15% 정기배송 전용 쿠폰이 발급되었습니다!');
  };

  const CAREGIVER_CYCLE: CaregiverType[] = ['엄마', '아빠', '할머니', '육아도우미'];

  const handleToggleParent = () => {
    setCoParenting((prev) => {
      const currentIndex = CAREGIVER_CYCLE.indexOf(prev.activeParent);
      const nextIndex = (currentIndex + 1) % CAREGIVER_CYCLE.length;
      const nextCaregiver = CAREGIVER_CYCLE[nextIndex];
      showToast(`👨‍👩‍👧 공동육아 교대 완료! [${nextCaregiver}] 육아 상태로 교체되었습니다.`);
      return {
        ...prev,
        activeParent: nextCaregiver,
        elapsedText: '방금 육아 교대 완료됨',
      };
    });
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
      title: `체온 ${temp.toFixed(1)}°C 측정`,
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
      onOpenNotificationModal={() => setIsNotificationModalOpen(true)}
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
          onSelectLogForEdit={setSelectedLogForEdit}
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
          babyDays={110}
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
        babyDays={110}
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

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications}
        onOpenTempModal={() => setIsTempModalOpen(true)}
        onOpenInventoryModal={() => setIsInventoryModalOpen(true)}
      />

      <LogDetailModal
        log={selectedLogForEdit}
        isOpen={!!selectedLogForEdit}
        onClose={() => setSelectedLogForEdit(null)}
        onUpdateLog={handleUpdateLog}
        onDeleteLog={handleDeleteLog}
      />
    </MobileFrame>
  );
};

export default App;
