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
import { BabyProfileModal } from './components/BabyProfileModal';
import { IMAGES } from './assets/images';

import type {
  TimelineLog,
  DiaperInventory,
  FormulaInventory,
  TemperatureState,
  PhotoDiaryItem,
  NotificationItem,
  BabyProfile
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

  // 1. Baby Profiles & Twin Management State
  const [babies, setBabies] = useState<BabyProfile[]>([
    {
      id: 'baby-1',
      name: '콩심이',
      birthDate: '2026-05-25',
      babyDays: 110,
      gender: 'girl',
      weight: '6.5kg',
      photoUrl: IMAGES.kongsim,
      diaperBrand: '하기스 네이처메이드 3단계',
      formulaBrand: '앱솔루트 명작 1단계',
      isTwin: false,
      notes: '스스로 360도 뒤집기 성공! 저자극 쿨링 케어 진행 중',
    },
    {
      id: 'baby-2',
      name: '콩순이',
      birthDate: '2026-05-25',
      babyDays: 110,
      gender: 'girl',
      weight: '6.2kg',
      photoUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80',
      diaperBrand: '하기스 네이처메이드 3단계',
      formulaBrand: '앱솔루트 명작 1단계',
      isTwin: true,
      notes: '둘째 쌍둥이 아기 💕 터미타임 5분 버티기 신기록달성',
    },
  ]);

  const [activeBabyId, setActiveBabyId] = useState<string>('baby-1');
  const activeBaby = babies.find((b) => b.id === activeBabyId) || babies[0];

  const handleSelectActiveBaby = (id: string) => {
    setActiveBabyId(id);
    const selected = babies.find((b) => b.id === id);
    if (selected) {
      showToast(`👶 활성 아기가 [${selected.name}] (으)로 전환되었습니다!`);
    }
  };

  const handleUpdateBabyProfile = (updatedBaby: BabyProfile) => {
    setBabies((prev) => prev.map((b) => (b.id === updatedBaby.id ? updatedBaby : b)));
    showToast(`✨ [${updatedBaby.name}] 아기 프로필 정보가 정상 수정되었습니다!`);
  };

  const handleAddBaby = (newBaby: BabyProfile) => {
    setBabies((prev) => [...prev, newBaby]);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}
    showToast(`🎉 새 쌍둥이 아기 [${newBaby.name}] 프로필이 추가되었습니다!`);
  };

  // 2. Diaper Inventory State (Starts low at 18)
  const [diaperInventory, setDiaperInventory] = useState<DiaperInventory>({
    brandName: activeBaby.diaperBrand,
    currentCount: 18,
    maxCount: 60,
    couponClaimed: false,
  });

  // 3. Formula Inventory State (Starts low at 2 cans)
  const [formulaInventory, setFormulaInventory] = useState<FormulaInventory>({
    brandName: activeBaby.formulaBrand,
    currentCount: 2,
    maxCount: 8,
    couponClaimed: false,
  });

  // 4. Temperature State (38.2°C Fever Alert Active)
  const [tempState, setTempState] = useState<TemperatureState>({
    currentTemp: 38.2,
    isHighFever: true,
    antipyreticTimer: 14400,
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
      message: '기저귀 18매, 분유 2캔 남았습니다. 맘큐 10% 전용 할인 쿠폰을 받아 바로 리필하세요.',
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
  ]);

  // 6. Parenting Timeline Logs
  const [logs, setLogs] = useState<TimelineLog[]>([
    {
      id: '1',
      type: 'temperature',
      time: '10:30',
      title: '38.2°C',
      detail: '접종열 의심 (해열제 3.5ml 투여 완료, 4h 타이머 발동)',
      badge: '경고 🚨',
    },
    {
      id: '2',
      type: 'sleep',
      time: '10:00',
      title: '낮잠 1시간 10분',
      detail: '스위트드림 백색소음 입면',
    },
    {
      id: '3',
      type: 'diaper',
      time: '09:15',
      title: '기저귀 소변 교체',
      detail: `${activeBaby.diaperBrand} 소변 교체 (잔여 18매)`,
      diaperType: 'pee',
    },
    {
      id: '4',
      type: 'formula',
      time: '08:30',
      title: '분유 수유 160ml',
      detail: `${activeBaby.formulaBrand} 완분`,
    },
  ]);

  // 7. Photo Diaries for Active Baby
  const [diaries, setDiaries] = useState<PhotoDiaryItem[]>([
    {
      id: 'init-1',
      babyDays: activeBaby.babyDays,
      date: '2026.09.01',
      imageUrl: IMAGES.kongsim,
      moodEmoji: '👶',
      title: `오늘 처음으로 ${activeBaby.name} 혼자 뒤집기 성공!`,
      content: `오늘 아침 ${activeBaby.name}이가 끙차 소리를 내며 온몸에 힘을 주더니, 드디어 혼자 힘으로 완전히 360도 뒤집기에 성공했다! 뒤집고 나서 스스로가 대견했는지 눈을 동그랗게 뜨고 환하게 웃는데 정말 감동이었다.`,
      likesCount: 12,
      isLiked: true,
    },
    {
      id: 'init-2',
      babyDays: activeBaby.babyDays - 1,
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
      babyDays: activeBaby.babyDays - 2,
      date: '2026.08.30',
      imageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80',
      moodEmoji: '🥳',
      title: '소리 내어 깔깔깔 장난친 날',
      content: `가족들이 간지럼을 태워주자 처음으로 깔깔 소리 내어 크게 웃었다. 집안 전체가 ${activeBaby.name} 웃음소리로 가득 차서 행복했던 하루.`,
      likesCount: 15,
      isLiked: false,
    },
    {
      id: 'init-4',
      babyDays: activeBaby.babyDays - 3,
      date: '2026.08.29',
      imageUrl: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80',
      moodEmoji: '🛁',
      title: '시원한 쿨링 입욕 목욕 타임',
      content: '따뜻한 미온수에 하이드로 바스 입욕제를 넣고 목욕시켰더니 물장구를 치며 신이 났다. 목욕 후 분유 180ml 싹 비우고 꿀잠 입면!',
      likesCount: 6,
      isLiked: false,
    },
  ]);

  // Modal States
  const [isBabyProfileModalOpen, setIsBabyProfileModalOpen] = useState(false);
  const [isTempModalOpen, setIsTempModalOpen] = useState(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [isAiScanModalOpen, setIsAiScanModalOpen] = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedLogForEdit, setSelectedLogForEdit] = useState<TimelineLog | null>(null);

  // Log Actions
  const handleAddLog = (newLog: TimelineLog) => {
    setLogs([{ ...newLog, babyId: activeBaby.id }, ...logs]);
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
        showToast('⚠️ 기저귀 잔여량이 15매 이하입니다! 맘큐 쿠폰을 받아보세요.');
      }
      return { ...prev, currentCount: nextCount };
    });
  };

  const handleClaimDiaperCoupon = () => {
    setDiaperInventory((prev) => ({ ...prev, couponClaimed: true }));
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}
    showToast('🎉 하기스 기저귀 10% 맘큐 리필 할인 쿠폰이 발급되었습니다!');
  };

  const handleClaimFormulaCoupon = () => {
    setFormulaInventory((prev) => ({ ...prev, couponClaimed: true }));
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}
    showToast('🎉 앱솔루트 명작 분유 15% 맘큐 전용 쿠폰이 발급되었습니다!');
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
      title: `${temp.toFixed(1)}°C`,
      detail: isFever ? '경고 뱃지 발동 및 해열제 타이머 세팅' : '정상 체온 범위',
      badge: isFever ? '경고 🚨' : undefined,
    });

    if (isFever) {
      showToast('🚨 38.0°C 이상 고열 감지! 건강 관리 탭에서 맘큐 큐레이션을 확인해보세요.');
    } else {
      showToast(`✅ 체온 ${temp.toFixed(1)}°C 기록이 완료되었습니다.`);
    }
  };

  const handleRefillDiaperBarcode = (refillCount: number) => {
    setDiaperInventory((prev) => ({ ...prev, currentCount: refillCount }));
    showToast('🎉 정품 바코드 인증 완료! 기저귀 60매 충전 & 맘큐 1,000P 적립 완료');
  };

  const handleAddDiary = (newItem: PhotoDiaryItem) => {
    setDiaries([{ ...newItem, babyId: activeBaby.id }, ...diaries]);
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
    showToast(`🛒 [${productName}] 맘큐(momQ) 자사몰 결제 페이지로 연결됩니다.`);
  };

  return (
    <MobileFrame
      activeTab={activeTab}
      onChangeTab={setActiveTab}
      onOpenNotificationModal={() => setIsNotificationModalOpen(true)}
      activeBaby={activeBaby}
      onOpenBabyProfileModal={() => setIsBabyProfileModalOpen(true)}
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

      {/* Tab 1: 육아 기록 */}
      {activeTab === 'home' && (
        <HomeTab
          logs={logs}
          onAddLog={handleAddLog}
          diaperInventory={diaperInventory}
          formulaInventory={formulaInventory}
          onDecrementDiaper={handleDecrementDiaper}
          tempState={tempState}
          onOpenTempModal={() => setIsTempModalOpen(true)}
          onOpenInventoryModal={() => setIsInventoryModalOpen(true)}
          onSelectLogForEdit={setSelectedLogForEdit}
          activeBaby={activeBaby}
        />
      )}

      {/* Tab 2: 건강 관리 */}
      {activeTab === 'care' && (
        <CareShopTab
          tempState={tempState}
          onOpenAiScan={() => setIsAiScanModalOpen(true)}
          onOpenBarcodeModal={() => setIsBarcodeModalOpen(true)}
          onSelectProduct={handleSelectProduct}
          activeBaby={activeBaby}
        />
      )}

      {/* Tab 3: 포토일기 */}
      {activeTab === 'diary' && (
        <DiaryTab
          diaries={diaries}
          onOpenDiaryModal={() => setIsDiaryModalOpen(true)}
          babyDays={activeBaby.babyDays}
          onToggleLike={handleToggleLike}
          onSelectProduct={handleSelectProduct}
          activeBaby={activeBaby}
        />
      )}

      {/* Baby Profile View/Edit & Twin Switcher Modal */}
      <BabyProfileModal
        isOpen={isBabyProfileModalOpen}
        onClose={() => setIsBabyProfileModalOpen(false)}
        babies={babies}
        activeBabyId={activeBabyId}
        onSelectActiveBaby={handleSelectActiveBaby}
        onUpdateBabyProfile={handleUpdateBabyProfile}
        onAddBaby={handleAddBaby}
      />

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
        babyDays={activeBaby.babyDays}
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
