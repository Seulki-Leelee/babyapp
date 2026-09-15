import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Trash2,
  Edit3,
  Filter,
  Lightbulb
} from 'lucide-react';
import type { TimelineLog, DiaperInventory, FormulaInventory, TemperatureState, LogCategoryFilter, BabyProfile } from '../types';
import { QMongAvatar } from './QMongAvatar';

interface HomeTabProps {
  logs: TimelineLog[];
  onAddLog: (log: TimelineLog) => void;
  diaperInventory: DiaperInventory;
  formulaInventory: FormulaInventory;
  onDecrementDiaper: () => void;
  tempState: TemperatureState;
  onOpenTempModal: () => void;
  onOpenInventoryModal: () => void;
  onSelectLogForEdit: (log: TimelineLog) => void;
  activeBaby: BabyProfile;
}

// Category Configuration with distinctive color themes
const CATEGORIES: {
  id: LogCategoryFilter;
  label: string;
  emoji: string;
  cardBg: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  iconBg: string;
}[] = [
  {
    id: 'all',
    label: '전체',
    emoji: '✨',
    cardBg: 'bg-cream-50/80',
    borderColor: 'border-cream-200',
    badgeBg: 'bg-gray-100',
    badgeText: 'text-gray-700',
    iconBg: 'bg-gray-100 text-gray-700',
  },
  {
    id: 'formula',
    label: '분유',
    emoji: '🍼',
    cardBg: 'bg-[#FFF4F0]',
    borderColor: 'border-[#FFC4B0]',
    badgeBg: 'bg-[#FFE2D6]',
    badgeText: 'text-[#D94E28]',
    iconBg: 'bg-[#FF7E67] text-white',
  },
  {
    id: 'breastfeeding',
    label: '모유',
    emoji: '🤱',
    cardBg: 'bg-[#FFF0F5]',
    borderColor: 'border-[#FFB6C1]',
    badgeBg: 'bg-[#FFE4E1]',
    badgeText: 'text-[#C71585]',
    iconBg: 'bg-[#FF6B8B] text-white',
  },
  {
    id: 'diaper',
    label: '기저귀',
    emoji: '🧷',
    cardBg: 'bg-[#FFFBEB]',
    borderColor: 'border-[#FDE68A]',
    badgeBg: 'bg-[#FEF3C7]',
    badgeText: 'text-[#B45309]',
    iconBg: 'bg-[#F59E0B] text-white',
  },
  {
    id: 'sleep',
    label: '수면',
    emoji: '😴',
    cardBg: 'bg-[#EEF2FF]',
    borderColor: 'border-[#C7D2FE]',
    badgeBg: 'bg-[#E0E7FF]',
    badgeText: 'text-[#4338CA]',
    iconBg: 'bg-[#6366F1] text-white',
  },
  {
    id: 'bath',
    label: '목욕',
    emoji: '🛁',
    cardBg: 'bg-[#ECFEFF]',
    borderColor: 'border-[#A5F3FC]',
    badgeBg: 'bg-[#CFFAFE]',
    badgeText: 'text-[#0891B2]',
    iconBg: 'bg-[#06B6D4] text-white',
  },
  {
    id: 'temperature',
    label: '체온/건강',
    emoji: '🌡️',
    cardBg: 'bg-[#FEF2F2]',
    borderColor: 'border-[#FECACA]',
    badgeBg: 'bg-[#FEE2E2]',
    badgeText: 'text-[#DC2626]',
    iconBg: 'bg-[#EF4444] text-white',
  },
];

export const HomeTab: React.FC<HomeTabProps> = ({
  logs,
  onAddLog,
  diaperInventory,
  formulaInventory,
  onDecrementDiaper,
  tempState,
  onOpenTempModal,
  onOpenInventoryModal,
  onSelectLogForEdit,
  activeBaby,
}) => {
  const [diaperAnim, setDiaperAnim] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<LogCategoryFilter>('all');

  const getCurrentTimeStr = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  // Quick Action Handlers
  const handleFormulaClick = () => {
    onAddLog({
      id: Date.now().toString(),
      type: 'formula',
      time: getCurrentTimeStr(),
      title: '분유 수유 160ml',
      detail: `${activeBaby.formulaBrand} (완분)`,
    });
  };

  const handleBreastfeedingClick = () => {
    onAddLog({
      id: Date.now().toString(),
      type: 'breastfeeding',
      time: getCurrentTimeStr(),
      title: '모유 수유 (양쪽 15분)',
      detail: '직유 양쪽 수유 15분 완료',
    });
  };

  const handleDiaperClick = () => {
    setDiaperAnim(true);
    onDecrementDiaper();

    onAddLog({
      id: Date.now().toString(),
      type: 'diaper',
      time: getCurrentTimeStr(),
      title: '기저귀 소변 교체',
      detail: `${activeBaby.diaperBrand} 교체 (잔여 ${diaperInventory.currentCount - 1}매)`,
      diaperType: 'pee',
    });

    setTimeout(() => {
      setDiaperAnim(false);
    }, 400);
  };

  const handleSleepClick = () => {
    onAddLog({
      id: Date.now().toString(),
      type: 'sleep',
      time: getCurrentTimeStr(),
      title: '낮잠 입면 (1시간)',
      detail: '백색소음 입면 수면 1시간',
    });
  };

  const handleBathClick = () => {
    onAddLog({
      id: Date.now().toString(),
      type: 'bath',
      time: getCurrentTimeStr(),
      title: '아기 목욕 (쿨링 바스)',
      detail: '저자극 쿨링 바스 케어 완료',
    });
  };

  const handleMedicationClick = () => {
    onAddLog({
      id: Date.now().toString(),
      type: 'medication',
      time: getCurrentTimeStr(),
      title: '해열제 투약 3.5ml',
      detail: '아세트아미노펜 4시간 타이머 발동',
      badge: '투약 기록',
    });
  };

  // Helper to determine category style of each log item
  const getLogStyle = (logType: string) => {
    if (logType === 'formula' || logType === 'feeding') return CATEGORIES[1];
    if (logType === 'breastfeeding') return CATEGORIES[2];
    if (logType === 'diaper') return CATEGORIES[3];
    if (logType === 'sleep') return CATEGORIES[4];
    if (logType === 'bath') return CATEGORIES[5];
    if (logType === 'temperature' || logType === 'medication') return CATEGORIES[6];
    return CATEGORIES[0];
  };

  // Filter logs by selected category
  const filteredLogs = logs.filter((log) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'formula') return log.type === 'formula' || log.type === 'feeding';
    if (selectedCategory === 'breastfeeding') return log.type === 'breastfeeding';
    if (selectedCategory === 'diaper') return log.type === 'diaper';
    if (selectedCategory === 'sleep') return log.type === 'sleep';
    if (selectedCategory === 'bath') return log.type === 'bath';
    if (selectedCategory === 'temperature') return log.type === 'temperature' || log.type === 'medication';
    return true;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* 1. Q-Mong Mascot Welcome Banner (qmong2 cheer variant) */}
      <div className="bg-gradient-to-r from-amber-100/80 via-orange-50 to-cream-100 rounded-2xl p-3.5 border border-amber-200 shadow-sm flex items-center justify-between relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10">
          <QMongAvatar size="lg" mood="cheer" variant="qmong2" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="bg-coral-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full">
                큐몽이 응원 💛
              </span>
              <span className="text-[10px] text-gray-500 font-bold">{activeBaby.name} D+{activeBaby.babyDays}일</span>
            </div>
            <h3 className="font-extrabold text-sm text-gray-900 mt-1">
              "오늘도 {activeBaby.name}의 건강한 성장을 큐몽이가 함께해요!"
            </h3>
            <p className="text-[11px] text-gray-600 mt-0.5">
              기저귀 {diaperInventory.currentCount}매 잔여 • 체온 {tempState.currentTemp.toFixed(1)}°C
            </p>
          </div>
        </div>
      </div>

      {/* 2. One-Touch Quick Record Bar */}
      <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-soft space-y-3">
        <div className="flex justify-between items-center px-0.5">
          <h4 className="font-extrabold text-xs text-gray-900 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-coral-500" />
            원터치 육아 기록 추가
          </h4>
          <span className="text-[10px] text-gray-400">버튼을 터치하면 기록 완료</span>
        </div>

        {/* Category Record Buttons */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1 px-0.5 -mx-1">
          {/* 🍼 분유 */}
          <button
            onClick={handleFormulaClick}
            className="flex flex-col items-center shrink-0 min-w-[68px] group active:scale-95 transition-transform"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#FFF4F0] text-[#D94E28] flex items-center justify-center text-2xl shadow-2xs border border-[#FFC4B0]">
              🍼
            </div>
            <span className="text-xs font-black text-gray-800 mt-1.5">분유</span>
          </button>

          {/* 🤱 모유 */}
          <button
            onClick={handleBreastfeedingClick}
            className="flex flex-col items-center shrink-0 min-w-[68px] group active:scale-95 transition-transform"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#FFF0F5] text-[#C71585] flex items-center justify-center text-2xl shadow-2xs border border-[#FFB6C1]">
              🤱
            </div>
            <span className="text-xs font-black text-gray-800 mt-1.5">모유</span>
          </button>

          {/* 🧷 기저귀 */}
          <button
            onClick={handleDiaperClick}
            className="flex flex-col items-center shrink-0 min-w-[68px] group active:scale-95 transition-transform"
          >
            <div className={`w-13 h-13 rounded-2xl bg-[#FFFBEB] text-[#B45309] flex items-center justify-center text-2xl shadow-2xs border border-[#FDE68A] relative ${diaperAnim ? 'animate-ping' : ''}`}>
              🧷
            </div>
            <span className="text-xs font-black text-gray-800 mt-1.5">기저귀</span>
          </button>

          {/* 😴 수면 */}
          <button
            onClick={handleSleepClick}
            className="flex flex-col items-center shrink-0 min-w-[68px] group active:scale-95 transition-transform"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center text-2xl shadow-2xs border border-[#C7D2FE]">
              😴
            </div>
            <span className="text-xs font-black text-gray-800 mt-1.5">수면</span>
          </button>

          {/* 🛁 목욕 */}
          <button
            onClick={handleBathClick}
            className="flex flex-col items-center shrink-0 min-w-[68px] group active:scale-95 transition-transform"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#ECFEFF] text-[#0891B2] flex items-center justify-center text-2xl shadow-2xs border border-[#A5F3FC]">
              🛁
            </div>
            <span className="text-xs font-black text-gray-800 mt-1.5">목욕</span>
          </button>

          {/* 🌡️ 체온 */}
          <button
            onClick={onOpenTempModal}
            className="flex flex-col items-center shrink-0 min-w-[68px] group active:scale-95 transition-transform"
          >
            <div className="w-13 h-13 rounded-2xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center text-2xl shadow-2xs border border-[#FECACA]">
              🌡️
            </div>
            <span className="text-xs font-black text-gray-800 mt-1.5">체온</span>
          </button>

          {/* 💊 투약 */}
          <button
            onClick={handleMedicationClick}
            className="flex flex-col items-center shrink-0 min-w-[68px] group active:scale-95 transition-transform"
          >
            <div className="w-13 h-13 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl shadow-2xs border border-purple-200">
              💊
            </div>
            <span className="text-xs font-black text-gray-800 mt-1.5">투약</span>
          </button>
        </div>
      </div>

      {/* 3. Category Filter Chips */}
      <div className="bg-white rounded-2xl p-3.5 border border-cream-200 shadow-soft space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <h4 className="font-extrabold text-xs text-gray-900 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-coral-500" />
            항목별 필터링 보기
          </h4>
          <span className="text-[10px] font-extrabold text-gray-500 bg-cream-100 px-2 py-0.5 rounded-full">
            {filteredLogs.length}건 표시 중
          </span>
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all'
              ? logs.length
              : logs.filter((l) => {
                  if (cat.id === 'formula') return l.type === 'formula' || l.type === 'feeding';
                  if (cat.id === 'breastfeeding') return l.type === 'breastfeeding';
                  if (cat.id === 'diaper') return l.type === 'diaper';
                  if (cat.id === 'sleep') return l.type === 'sleep';
                  if (cat.id === 'bath') return l.type === 'bath';
                  if (cat.id === 'temperature') return l.type === 'temperature' || l.type === 'medication';
                  return false;
                }).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold shrink-0 border transition-all flex items-center gap-1 ${
                  isSelected
                    ? `${cat.iconBg} border-transparent shadow-xs scale-105`
                    : 'bg-cream-50 text-gray-600 border-cream-200 hover:bg-cream-100'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.1 rounded-full ${isSelected ? 'bg-white/30 text-white' : 'bg-cream-200 text-gray-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Chronological Parenting Timeline */}
      <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-soft space-y-3">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-coral-100 text-coral-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-gray-900">
                {activeBaby.name}의 육아 기록 타임라인
              </h4>
              <p className="text-[10px] text-gray-400">카드를 눌러 기록 편집 및 삭제</p>
            </div>
          </div>
        </div>

        {/* Timeline Item Cards */}
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center bg-cream-50 rounded-2xl border border-dashed border-cream-300">
            <QMongAvatar size="lg" mood="happy" variant="qmong1" className="mx-auto mb-2" />
            <p className="text-xs font-bold text-gray-500">
              선택한 카테고리의 육아 기록이 없습니다.
            </p>
            <p className="text-[10px] text-gray-400 mt-1">상단 원터치 버튼으로 기록을 추가해보세요!</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredLogs.map((log) => {
              const style = getLogStyle(log.type);
              return (
                <div
                  key={log.id}
                  onClick={() => onSelectLogForEdit(log)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border ${style.cardBg} ${style.borderColor} hover:shadow-sm transition-all cursor-pointer group relative overflow-hidden`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-xs font-bold text-gray-500 mt-1 min-w-[40px]">
                      {log.time}
                    </span>

                    {/* Category Specific Icon Pill */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 shadow-2xs ${style.iconBg}`}
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
                      <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
                        <h5 className="font-extrabold text-xs text-gray-900 group-hover:text-coral-600 transition-colors shrink-0">
                          {log.title}
                        </h5>
                        <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full shrink-0 ${style.badgeBg} ${style.badgeText}`}>
                          {style.label}
                        </span>
                        {log.badge && (
                          <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded shadow-2xs shrink-0">
                            {log.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-600 mt-0.5 truncate">{log.detail}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0 ml-2">
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
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Q-Mong Tip Box (qmong1 variant) */}
      <div className="bg-gradient-to-r from-cream-100 to-amber-50 rounded-2xl p-3.5 border border-cream-300 flex items-start gap-3">
        <QMongAvatar size="md" mood="happy" variant="qmong1" className="mt-0.5" />
        <div>
          <div className="flex items-center gap-1 text-amber-700 font-extrabold text-xs">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            큐몽이의 육아 성장 꿀팁
          </div>
          <p className="text-[11px] text-gray-700 mt-1 leading-relaxed">
            생후 4개월 차 아기는 밤 수유 간격을 천천히 늘려가고 수면 루틴을 일정하게 잡아주면 통잠 습관 형성에 큰 도움이 돼요!
          </p>
        </div>
      </div>
    </div>
  );
};
