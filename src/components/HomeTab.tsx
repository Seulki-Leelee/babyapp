import React, { useState } from 'react';
import {
  Package,
  Clock,
  Calendar,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Plus
} from 'lucide-react';
import type { TimelineLog, DiaperInventory, FormulaInventory, CoParentingStatus, TemperatureState } from '../types';

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
}

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
}) => {
  const [diaperAnim, setDiaperAnim] = useState(false);

  const handleDiaperClick = () => {
    setDiaperAnim(true);
    onDecrementDiaper();

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    onAddLog({
      id: Date.now().toString(),
      type: 'diaper',
      time: timeStr,
      title: '🧷 기저귀 교체',
      detail: `소변 교체 완료 (잔여 ${diaperInventory.currentCount - 1}매)`,
      iconBg: 'bg-amber-100 text-amber-600',
    });

    setTimeout(() => {
      setDiaperAnim(false);
    }, 400);
  };

  const handleFeedingClick = () => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    onAddLog({
      id: Date.now().toString(),
      type: 'feeding',
      time: timeStr,
      title: '🍼 분유 수유',
      detail: '앱솔루트 명작 150ml 완분',
      iconBg: 'bg-coral-100 text-coral-600',
    });
  };

  const handleSleepClick = () => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    onAddLog({
      id: Date.now().toString(),
      type: 'sleep',
      time: timeStr,
      title: '😴 낮잠 입면',
      detail: '스위트드림 백색소음 45분',
      iconBg: 'bg-indigo-100 text-indigo-600',
    });
  };

  const isLowInventory = diaperInventory.currentCount <= 20 || formulaInventory.currentCount <= 3;

  return (
    <div className="space-y-4 pb-20">
      {/* 1. Co-Parenting Baton Touch Header */}
      <div className="bg-gradient-to-r from-cream-100 to-amber-50 rounded-2xl p-3.5 border border-cream-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-coral-500 text-white flex items-center justify-center font-extrabold text-base shadow-sm shrink-0">
            {coParenting.activeParent === '엄마' ? '👩' : '👨'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-extrabold text-coral-600 bg-coral-100 px-2 py-0.2 rounded-full">
                공동육아 교대
              </span>
              <span className="text-[10px] text-gray-400 font-medium">{coParenting.elapsedText}</span>
            </div>
            <h3 className="font-extrabold text-xs text-gray-900 mt-0.5">
              {coParenting.activeParent} ➔ {coParenting.partnerName} 육아 진행 중
            </h3>
          </div>
        </div>

        <button
          onClick={onToggleParent}
          className="px-2.5 py-1.5 rounded-xl bg-white border border-coral-200 text-coral-600 font-bold text-xs shadow-sm hover:bg-coral-50 shrink-0 flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" />
          교대
        </button>
      </div>

      {/* 2. Low Inventory Notification Banner (Appears when Diaper/Formula is Low) */}
      {isLowInventory && (
        <button
          onClick={onOpenInventoryModal}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-3.5 shadow-md flex items-center justify-between text-left active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="bg-white text-amber-700 text-[10px] font-black px-2 py-0.2 rounded-full">
                  재고 알림
                </span>
                <span className="text-[11px] text-amber-100 font-bold">소진 임박</span>
              </div>
              <p className="text-xs font-bold text-white mt-0.5">
                기저귀 {diaperInventory.currentCount}매, 분유 {formulaInventory.currentCount}캔 남아있습니다.
              </p>
            </div>
          </div>
          <div className="flex items-center text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg shrink-0">
            리필하기 <ChevronRight className="w-4 h-4 ml-0.5" />
          </div>
        </button>
      )}

      {/* High Fever Alert Top Banner (Only if Fever >= 38.0°C) */}
      {tempState.isHighFever && (
        <div className="bg-red-500 text-white rounded-2xl p-3.5 shadow-float animate-pulse-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-white shrink-0" />
            <div>
              <h4 className="font-extrabold text-xs">🚨 고열 주의 ({tempState.currentTemp}°C)</h4>
              <p className="text-[11px] text-red-100 mt-0.5">
                해열제 타이머 작동 중 (스마트 케어&샵 탭 긴급 큐레이션 노출)
              </p>
            </div>
          </div>
          <button
            onClick={onOpenTempModal}
            className="text-[11px] font-bold bg-white text-red-600 px-2.5 py-1 rounded-xl shrink-0"
          >
            체온 수정
          </button>
        </div>
      )}

      {/* 3. Daily Quick Logging Bar (매일 바로 쓰는 원터치 버튼) */}
      <div className="bg-white rounded-2xl p-3.5 border border-cream-200 shadow-soft">
        <div className="flex justify-between items-center mb-2.5">
          <h4 className="font-extrabold text-xs text-gray-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-coral-500" />
            매일 쓰는 원터치 기록
          </h4>
          <span className="text-[10px] text-gray-400">클릭 즉시 기록</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {/* 🍼 수유 */}
          <button
            onClick={handleFeedingClick}
            className="flex flex-col items-center group active:scale-95 transition-transform"
          >
            <div className="w-13 h-13 rounded-2xl bg-coral-100 text-coral-600 flex items-center justify-center text-xl shadow-sm border border-coral-200 w-full py-2.5">
              🍼
            </div>
            <span className="text-xs font-bold text-gray-800 mt-1">수유</span>
          </button>

          {/* 🧷 기저귀 (Instant Decrement Animation) */}
          <button
            onClick={handleDiaperClick}
            className="flex flex-col items-center group active:scale-95 transition-transform"
          >
            <div className={`w-13 h-13 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl shadow-sm border border-amber-200 w-full py-2.5 relative ${diaperAnim ? 'animate-ping' : ''}`}>
              🧷
            </div>
            <span className="text-xs font-bold text-gray-800 mt-1">기저귀</span>
          </button>

          {/* 😴 수면 */}
          <button
            onClick={handleSleepClick}
            className="flex flex-col items-center group active:scale-95 transition-transform"
          >
            <div className="w-13 h-13 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl shadow-sm border border-indigo-200 w-full py-2.5">
              😴
            </div>
            <span className="text-xs font-bold text-gray-800 mt-1">수면</span>
          </button>

          {/* 🌡️ 체온 / 기타 */}
          <button
            onClick={onOpenTempModal}
            className="flex flex-col items-center group active:scale-95 transition-transform"
          >
            <div className="w-13 h-13 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center text-xl shadow-sm border border-red-200 w-full py-2.5">
              🌡️
            </div>
            <span className="text-xs font-bold text-gray-800 mt-1">체온</span>
          </button>
        </div>
      </div>

      {/* 4. Main Spotlight: Chronological Parenting Timeline (매일 보는 메인 타임라인) */}
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
              <p className="text-[10px] text-gray-400">시간순 육아 기록 자동 축적</p>
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
              className="flex items-start gap-3 p-3 rounded-xl bg-cream-50/60 border border-cream-200/80 hover:bg-cream-100 transition-colors"
            >
              <span className="text-xs font-bold text-gray-400 mt-0.5 min-w-[42px]">
                {log.time}
              </span>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-base font-bold shrink-0 ${
                  log.iconBg || 'bg-gray-100 text-gray-600'
                }`}
              >
                {log.type === 'feeding'
                  ? '🍼'
                  : log.type === 'diaper'
                  ? '🧷'
                  : log.type === 'sleep'
                  ? '😴'
                  : '🌡️'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-xs text-gray-900">{log.title}</h5>
                  {log.badge && (
                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.2 rounded">
                      {log.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-600 mt-0.5">{log.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
