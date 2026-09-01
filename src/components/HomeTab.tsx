import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  RefreshCw,
  Trash2,
  Edit3
} from 'lucide-react';
import type { TimelineLog, DiaperInventory, FormulaInventory, CoParentingStatus, TemperatureState, CaregiverType } from '../types';
import { CaregiverAvatar } from './CaregiverAvatar';

interface HomeTabProps {
  logs: TimelineLog[];
  onAddLog: (log: TimelineLog) => void;
  diaperInventory: DiaperInventory;
  formulaInventory: FormulaInventory;
  onDecrementDiaper: () => void;
  coParenting: CoParentingStatus;
  onToggleParent: () => void;
  tempState: TemperatureState;
  onOpenTempModal: () => void;
  onOpenInventoryModal: () => void;
  onSelectLogForEdit: (log: TimelineLog) => void;
}

const CAREGIVER_CONFIGS: Record<CaregiverType, { emoji: string; avatarBg: string; badgeStyle: string }> = {
  '엄마': {
    emoji: '👩',
    avatarBg: 'bg-rose-500 text-white shadow-rose-200',
    badgeStyle: 'bg-rose-100 text-rose-600',
  },
  '아빠': {
    emoji: '👨',
    avatarBg: 'bg-indigo-500 text-white shadow-indigo-200',
    badgeStyle: 'bg-indigo-100 text-indigo-600',
  },
  '할머니': {
    emoji: '👵',
    avatarBg: 'bg-amber-500 text-white shadow-amber-200',
    badgeStyle: 'bg-amber-100 text-amber-700',
  },
  '육아도우미': {
    emoji: '👩‍🍼',
    avatarBg: 'bg-emerald-500 text-white shadow-emerald-200',
    badgeStyle: 'bg-emerald-100 text-emerald-700',
  },
};

export const HomeTab: React.FC<HomeTabProps> = ({
  logs,
  onAddLog,
  diaperInventory,
  formulaInventory,
  onDecrementDiaper,
  coParenting,
  onToggleParent,
  tempState,
  onOpenTempModal,
  onOpenInventoryModal,
  onSelectLogForEdit,
}) => {
  const [diaperAnim, setDiaperAnim] = useState(false);

  const getCurrentTimeStr = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  // 1. 🍼 분유 수유
  const handleFormulaClick = () => {
    onAddLog({
      id: Date.now().toString(),
      type: 'formula',
      time: getCurrentTimeStr(),
      title: '분유 수유 160ml',
      detail: '앱솔루트 명작 1단계 (완분)',
      iconBg: 'bg-coral-100 text-coral-600',
    });
  };

  // 2. 🤱 모유 수유
  const handleBreastfeedingClick = () => {
    onAddLog({
      id: Date.now().toString(),
      type: 'breastfeeding',
      time: getCurrentTimeStr(),
      title: '모유 수유 (양쪽 15분)',
      detail: '직유 양쪽 수유 15분',
      iconBg: 'bg-pink-100 text-pink-600',
    });
  };

  // 3. 🧷 기저귀 교체 (즉시 -1매 차감)
  const handleDiaperClick = () => {
    setDiaperAnim(true);
    onDecrementDiaper();

    onAddLog({
      id: Date.now().toString(),
      type: 'diaper',
      time: getCurrentTimeStr(),
      title: '기저귀 소변 교체',
      detail: `하기스 3단계 교체 (잔여 ${diaperInventory.currentCount - 1}매)`,
      diaperType: 'pee',
      iconBg: 'bg-amber-100 text-amber-600',
    });

    setTimeout(() => {
      setDiaperAnim(false);
    }, 400);
  };

  // 4. 😴 수면
  const handleSleepClick = () => {
    onAddLog({
      id: Date.now().toString(),
      type: 'sleep',
      time: getCurrentTimeStr(),
      title: '낮잠 입면 (1시간)',
      detail: '백색소음 입면 수면 1시간',
      iconBg: 'bg-indigo-100 text-indigo-600',
    });
  };

  // 5. 🛁 목욕
  const handleBathClick = () => {
    onAddLog({
      id: Date.now().toString(),
      type: 'bath',
      time: getCurrentTimeStr(),
      title: '아기 목욕 (쿨링 바스)',
      detail: '저자극 쿨링 바스 케어 완료',
      iconBg: 'bg-cyan-100 text-cyan-600',
    });
  };

  // 6. 💊 투약
  const handleMedicationClick = () => {
    onAddLog({
      id: Date.now().toString(),
      type: 'medication',
      time: getCurrentTimeStr(),
      title: '해열제 투약 3.5ml',
      detail: '아세트아미노펜 4시간 타이머 발동',
      iconBg: 'bg-purple-100 text-purple-600',
      badge: '투약 기록',
    });
  };

  const currentCaregiver = CAREGIVER_CONFIGS[coParenting.activeParent] || CAREGIVER_CONFIGS['엄마'];

  return (
    <div className="space-y-4 pb-20">
      {/* 1. Co-Parenting Caregiver Shift Header */}
      <div className="bg-gradient-to-r from-cream-100 via-amber-50/40 to-cream-50 rounded-2xl p-3.5 border border-cream-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CaregiverAvatar type={coParenting.activeParent} size="md" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full transition-colors ${currentCaregiver.badgeStyle}`}>
                공동육아 바통터치
              </span>
              <span className="text-[10px] text-gray-400 font-medium">{coParenting.elapsedText}</span>
            </div>
            <h3 className="font-extrabold text-sm text-gray-900 mt-1">
              {coParenting.activeParent} 육아 진행 중
            </h3>
          </div>
        </div>

        <button
          onClick={onToggleParent}
          className="px-3.5 py-2 rounded-xl bg-white border border-cream-300 text-gray-700 font-bold text-xs shadow-sm hover:bg-cream-50 shrink-0 flex items-center gap-1.5 active:scale-95 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5 text-coral-500" />
          교대
        </button>
      </div>

      {/* 2. Horizontal Drag/Scrollable Quick Record Bar */}
      <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-soft space-y-3">
        <div className="flex justify-between items-center px-0.5">
          <h4 className="font-extrabold text-xs text-gray-900 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-coral-500" />
            매일 쓰는 원터치 기록
          </h4>
          <span className="text-[11px] text-coral-500 font-bold flex items-center gap-0.5 bg-coral-50 px-2 py-0.5 rounded-full border border-coral-100">
            옆으로 스와이프 ➔
          </span>
        </div>

        {/* Large Bold Swipable Icon Container */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1 px-0.5 -mx-1">
          {/* 🍼 분유 */}
          <button
            onClick={handleFormulaClick}
            className="flex flex-col items-center shrink-0 min-w-[72px] group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-2xl bg-coral-100 text-coral-600 flex items-center justify-center text-3xl shadow-sm border border-coral-200">
              🍼
            </div>
            <span className="text-xs font-black text-gray-800 mt-1.5">분유</span>
          </button>

          {/* 🤱 모유 */}
          <button
            onClick={handleBreastfeedingClick}
            className="flex flex-col items-center shrink-0 min-w-[72px] group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-3xl shadow-sm border border-pink-200">
              🤱
            </div>
            <span className="text-xs font-black text-gray-800 mt-1.5">모유</span>
          </button>

          {/* 🧷 기저귀 (Instant Decrement Animation) */}
          <button
            onClick={handleDiaperClick}
            className="flex flex-col items-center shrink-0 min-w-[72px] group active:scale-95 transition-transform"
          >
            <div className={`w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl shadow-sm border border-amber-200 relative ${diaperAnim ? 'animate-ping' : ''}`}>
              🧷
            </div>
            <span className="text-xs font-black text-gray-800 mt-1.5">기저귀</span>
          </button>

          {/* 😴 수면 */}
          <button
            onClick={handleSleepClick}
            className="flex flex-col items-center shrink-0 min-w-[72px] group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl shadow-sm border border-indigo-200">
              😴
            </div>
            <span className="text-xs font-black text-gray-800 mt-1.5">수면</span>
          </button>

          {/* 🛁 목욕 */}
          <button
            onClick={handleBathClick}
            className="flex flex-col items-center shrink-0 min-w-[72px] group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center text-3xl shadow-sm border border-cyan-200">
              🛁
            </div>
            <span className="text-xs font-black text-gray-800 mt-1.5">목욕</span>
          </button>

          {/* 🌡️ 체온 */}
          <button
            onClick={onOpenTempModal}
            className="flex flex-col items-center shrink-0 min-w-[72px] group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center text-3xl shadow-sm border border-red-200">
              🌡️
            </div>
            <span className="text-xs font-black text-gray-800 mt-1.5">체온</span>
          </button>

          {/* 💊 투약 */}
          <button
            onClick={handleMedicationClick}
            className="flex flex-col items-center shrink-0 min-w-[72px] group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-3xl shadow-sm border border-purple-200">
              💊
            </div>
            <span className="text-xs font-black text-gray-800 mt-1.5">투약</span>
          </button>
        </div>
      </div>

      {/* 3. Main Spotlight: Chronological Parenting Timeline (Clean titles without duplicated text emojis) */}
      <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-soft space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-coral-100 text-coral-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-gray-900">
                오늘의 육아 타임라인
              </h4>
              <p className="text-[10px] text-gray-400">클릭하여 시간/상세 수정 및 삭제</p>
            </div>
          </div>
          <span className="bg-cream-100 text-gray-600 text-xs font-extrabold px-2.5 py-1 rounded-full">
            총 {logs.length}건
          </span>
        </div>

        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              onClick={() => onSelectLogForEdit(log)}
              className="flex items-center justify-between p-3 rounded-xl bg-cream-50/70 border border-cream-200/80 hover:bg-cream-100 hover:border-coral-300 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <span className="text-xs font-bold text-gray-400 mt-0.5 min-w-[42px]">
                  {log.time}
                </span>
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-base font-bold shrink-0 ${
                    log.iconBg || 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {log.type === 'formula' || log.type === 'feeding'
                    ? '🍼'
                    : log.type === 'breastfeeding'
                    ? '🤱'
                    : log.type === 'diaper'
                    ? '🧷'
                    : log.type === 'sleep'
                    ? '😴'
                    : log.type === 'bath'
                    ? '🛁'
                    : log.type === 'medication'
                    ? '💊'
                    : '🌡️'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-xs text-gray-900 group-hover:text-coral-600 transition-colors">
                      {log.title}
                    </h5>
                    {log.badge && (
                      <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.2 rounded">
                        {log.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-600 mt-0.5 truncate">{log.detail}</p>
                </div>
              </div>

              {/* Right Action Icons (Edit & Trash) */}
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <span className="p-1.5 rounded-lg text-gray-400 group-hover:text-coral-500 hover:bg-white transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectLogForEdit(log);
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="삭제하기"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
