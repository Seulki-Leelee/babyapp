import React, { useState, useEffect } from 'react';
import { Clock, Trash2, Check, X, AlertTriangle, Plus, Minus } from 'lucide-react';
import type { TimelineLog, DiaperType } from '../types';

interface LogDetailModalProps {
  log: TimelineLog | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateLog: (updatedLog: TimelineLog) => void;
  onDeleteLog: (logId: string) => void;
}

export const LogDetailModal: React.FC<LogDetailModalProps> = ({
  log,
  isOpen,
  onClose,
  onUpdateLog,
  onDeleteLog,
}) => {
  const [time, setTime] = useState('');
  const [diaperType, setDiaperType] = useState<DiaperType>('pee');
  const [formulaAmount, setFormulaAmount] = useState('160ml');
  const [breastSide, setBreastSide] = useState<'left' | 'right' | 'both'>('both');
  const [breastTime, setBreastTime] = useState('15분');
  const [sleepDuration, setSleepDuration] = useState('1시간');
  const [tempValue, setTempValue] = useState(36.5);
  const [medType, setMedType] = useState('해열제 (아세트아미노펜)');
  const [bathType, setBathType] = useState('저자극 쿨링 바스');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (log) {
      setTime(log.time || '10:30');
      setDiaperType(log.diaperType || 'pee');
      setShowDeleteConfirm(false);

      if (log.type === 'temperature') {
        const match = log.title.match(/\d+\.\d+/);
        if (match) setTempValue(parseFloat(match[0]));
      }

      if (log.detail.includes('ml')) {
        const match = log.detail.match(/\d+ml/);
        if (match) setFormulaAmount(match[0]);
      }
    }
  }, [log]);

  if (!isOpen || !log) return null;

  const handleTempIncrement = () => {
    setTempValue((prev) => Math.min(42.0, parseFloat((prev + 0.1).toFixed(1))));
  };

  const handleTempDecrement = () => {
    setTempValue((prev) => Math.max(35.0, parseFloat((prev - 0.1).toFixed(1))));
  };

  const getTempAdvice = (val: number) => {
    if (val < 37.5) {
      return {
        badge: '정상 체온 (36.0~37.4°C)',
        badgeStyle: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        cardStyle: 'bg-emerald-50/80 border-emerald-200',
        icon: '💚',
        advice: '아기 체온이 아주 양호합니다. 평소처럼 쾌적한 실내 온도(22~24°C)와 습도를 유지해 주세요.',
      };
    } else if (val >= 37.5 && val <= 37.9) {
      return {
        badge: '미열 감지 (37.5~37.9°C)',
        badgeStyle: 'bg-amber-100 text-amber-800 border-amber-300',
        cardStyle: 'bg-amber-50/80 border-amber-200',
        icon: '💛',
        advice: '옷을 가볍고 얇은 순면으로 갈아입히고 실내를 시원하게(20~22°C) 합니다. 물을 자주 조금씩 먹여 수분을 보충하고 30분 뒤 체온을 다시 측정해 주세요.',
      };
    } else if (val >= 38.0 && val <= 38.4) {
      return {
        badge: '발열 (38.0~38.4°C)',
        badgeStyle: 'bg-orange-100 text-orange-800 border-orange-300',
        cardStyle: 'bg-orange-50/80 border-orange-200',
        icon: '🧡',
        advice: '아기 체중에 맞는 정량의 해열제(아세트아미노펜 등)를 복용합니다. 4시간 투약 타이머를 작동하고 미온수 타월로 몸을 가볍게 닦아주세요.',
      };
    } else {
      return {
        badge: '고열 경고 (38.5°C 이상)',
        badgeStyle: 'bg-red-100 text-red-700 border-red-300',
        cardStyle: 'bg-red-50/80 border-red-200',
        icon: '🔴',
        advice: '해열제 교차 투약(2시간 간격)을 검토하고, 아기가 처지거나 교차 투약 후에도 39°C 이상 지속 시 소아과 진료 또는 응급실 방문을 권장합니다.',
      };
    }
  };

  const adviceInfo = getTempAdvice(tempValue);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedTitle = log.title;
    let updatedDetail = log.detail;
    let badge = log.badge;
    let iconBg = log.iconBg;

    if (log.type === 'diaper') {
      if (diaperType === 'pee') {
        updatedTitle = '기저귀 소변 교체';
        updatedDetail = '소변 교체 완료 (하기스 3단계)';
      } else if (diaperType === 'poop') {
        updatedTitle = '기저귀 대변 교체';
        updatedDetail = '대변 교체 & 하이드로 엉덩이 세정';
      } else {
        updatedTitle = '기저귀 소변+대변 교체';
        updatedDetail = '소변 및 대변 동시 교체 완료';
      }
    } else if (log.type === 'formula' || log.type === 'feeding') {
      updatedTitle = `분유 수유 ${formulaAmount}`;
      updatedDetail = `앱솔루트 명작 1단계 (${formulaAmount})`;
    } else if (log.type === 'breastfeeding') {
      const sideText = breastSide === 'left' ? '왼쪽' : breastSide === 'right' ? '오른쪽' : '양쪽';
      updatedTitle = `모유 수유 (${sideText} ${breastTime})`;
      updatedDetail = `직유 ${sideText} 수유 ${breastTime}`;
    } else if (log.type === 'sleep') {
      updatedTitle = `낮잠 (${sleepDuration})`;
      updatedDetail = `백색소음 입면 수면 ${sleepDuration}`;
    } else if (log.type === 'temperature') {
      const isFever = tempValue >= 38.0;
      updatedTitle = `${tempValue.toFixed(1)}°C`;
      updatedDetail = isFever ? '경고 뱃지 발동 및 해열제 타이머' : '정상 체온 범위';
      badge = isFever ? '경고 🚨' : undefined;
      iconBg = isFever ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600';
    } else if (log.type === 'medication') {
      updatedTitle = `${medType}`;
      updatedDetail = `${medType} 투약 완료 (4시간 타이머)`;
    } else if (log.type === 'bath') {
      updatedTitle = `아기 목욕 (${bathType})`;
      updatedDetail = `${bathType} 케어 완료`;
    }

    onUpdateLog({
      ...log,
      time,
      title: updatedTitle,
      detail: updatedDetail,
      badge,
      iconBg,
      diaperType: log.type === 'diaper' ? diaperType : undefined,
    });
    onClose();
  };

  const ConfirmDeleteDialog = () => (
    <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-5 text-center animate-scale-pop space-y-3">
      <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center mx-auto shadow-md">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="font-extrabold text-base text-red-950">삭제하시겠습니까?</h4>
      <p className="text-xs text-red-800">
        선택하신 <strong>[{log.title}]</strong> 기록이 타임라인에서 영구 삭제됩니다.
      </p>

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={() => setShowDeleteConfirm(false)}
          className="flex-1 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-bold text-xs hover:bg-gray-50"
        >
          취소
        </button>
        <button
          type="button"
          onClick={() => {
            onDeleteLog(log.id);
            onClose();
          }}
          className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs shadow-md hover:bg-red-700 active:scale-95"
        >
          삭제
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 pb-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-coral-100 text-coral-600 flex items-center justify-center font-bold text-xl">
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
            <h3 className="font-extrabold text-lg text-gray-900">{log.title}</h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Delete Confirm Overlay */}
        {showDeleteConfirm ? (
          <ConfirmDeleteDialog />
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            {/* 1. Time Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-coral-500" />
                기록 시간 조정 (1분 단위)
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base font-extrabold text-gray-900 bg-cream-50 focus:ring-2 focus:ring-coral-400 focus:outline-none"
                required
              />
            </div>

            {/* 2. Type-Specific Custom Option Selectors */}

            {/* 🌡️ 체온 (0.1°C Stepper & Pediatric Advice Box) */}
            {log.type === 'temperature' && (
              <div className="space-y-3">
                <div className="bg-cream-50 rounded-2xl p-4 border border-cream-200 text-center space-y-3">
                  <span className={`inline-block text-xs font-extrabold px-3 py-1 rounded-full border ${adviceInfo.badgeStyle}`}>
                    {adviceInfo.badge}
                  </span>

                  <div className="flex items-center justify-center gap-4 py-1">
                    <button
                      type="button"
                      onClick={handleTempDecrement}
                      className="w-11 h-11 rounded-2xl bg-white border border-gray-300 text-gray-800 text-xl font-black shadow-sm hover:bg-cream-100 active:scale-95 flex items-center justify-center shrink-0"
                    >
                      <Minus className="w-5 h-5 stroke-[3]" />
                    </button>

                    <div className="min-w-[110px]">
                      <span className="font-black text-3xl text-gray-900 tracking-tight">
                        {tempValue.toFixed(1)}
                      </span>
                      <span className="font-extrabold text-lg text-gray-500 ml-1">°C</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleTempIncrement}
                      className="w-11 h-11 rounded-2xl bg-white border border-gray-300 text-gray-800 text-xl font-black shadow-sm hover:bg-cream-100 active:scale-95 flex items-center justify-center shrink-0"
                    >
                      <Plus className="w-5 h-5 stroke-[3]" />
                    </button>
                  </div>
                </div>

                {/* Pediatric Advice Box */}
                <div className={`p-3.5 rounded-2xl border transition-all space-y-1 ${adviceInfo.cardStyle}`}>
                  <div className="flex items-center gap-1.5 font-extrabold text-xs text-gray-900">
                    <span className="text-sm">{adviceInfo.icon}</span>
                    <span>체온별 육아 권장 조언</span>
                  </div>
                  <p className="text-xs text-gray-800 leading-relaxed font-medium">
                    {adviceInfo.advice}
                  </p>
                </div>
              </div>
            )}

            {/* 🍼 분유 수유량 선택 */}
            {(log.type === 'formula' || log.type === 'feeding') && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  🍼 분유량 선택 (ml)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['100ml', '120ml', '140ml', '160ml', '180ml', '200ml'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setFormulaAmount(amt)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        formulaAmount === amt
                          ? 'bg-coral-500 text-white border-coral-500 shadow-sm'
                          : 'bg-cream-50 text-gray-700 border-gray-200 hover:bg-cream-100'
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 🤱 모유 수유 방향 & 시간 선택 */}
            {log.type === 'breastfeeding' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    🤱 모유 수유 방향 선택
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setBreastSide('left')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        breastSide === 'left'
                          ? 'bg-pink-500 text-white border-pink-500 shadow-sm'
                          : 'bg-cream-50 text-gray-700 border-gray-200 hover:bg-cream-100'
                      }`}
                    >
                      👈 왼쪽
                    </button>
                    <button
                      type="button"
                      onClick={() => setBreastSide('right')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        breastSide === 'right'
                          ? 'bg-pink-500 text-white border-pink-500 shadow-sm'
                          : 'bg-cream-50 text-gray-700 border-gray-200 hover:bg-cream-100'
                      }`}
                    >
                      👉 오른쪽
                    </button>
                    <button
                      type="button"
                      onClick={() => setBreastSide('both')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        breastSide === 'both'
                          ? 'bg-pink-600 text-white border-pink-600 shadow-sm'
                          : 'bg-cream-50 text-gray-700 border-gray-200 hover:bg-cream-100'
                      }`}
                    >
                      👐 양쪽
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    수유 시간 선택
                  </label>
                  <div className="flex gap-2">
                    {['10분', '15분', '20분', '25분'].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setBreastTime(dur)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                          breastTime === dur
                            ? 'bg-rose-500 text-white border-rose-500'
                            : 'bg-cream-50 text-gray-700 border-gray-200'
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 🧷 기저귀 종류 선택 (소변/대변/소변+대변) */}
            {log.type === 'diaper' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  🧷 기저귀 종류 선택
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDiaperType('pee')}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      diaperType === 'pee'
                        ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                        : 'bg-cream-50 text-gray-700 border-gray-200 hover:bg-cream-100'
                    }`}
                  >
                    💦 소변
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiaperType('poop')}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      diaperType === 'poop'
                        ? 'bg-amber-700 text-white border-amber-700 shadow-sm'
                        : 'bg-cream-50 text-gray-700 border-gray-200 hover:bg-cream-100'
                    }`}
                  >
                    💩 대변
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiaperType('both')}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      diaperType === 'both'
                        ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                        : 'bg-cream-50 text-gray-700 border-gray-200 hover:bg-cream-100'
                    }`}
                  >
                    💦💩 소변+대변
                  </button>
                </div>
              </div>
            )}

            {/* 😴 수면 시간 선택 */}
            {log.type === 'sleep' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  😴 수면 시간 선택
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['30분', '45분', '1시간', '1시간 30분', '2시간', '3시간'].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setSleepDuration(dur)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        sleepDuration === dur
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'bg-cream-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 💊 투약 종류 선택 */}
            {log.type === 'medication' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  💊 투약 종류 선택
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['해열제 (아세트아미노펜)', '해열제 (덱시부프로펜)', '피부 시카 연고', '100억 생유산균'].map((med) => (
                    <button
                      key={med}
                      type="button"
                      onClick={() => setMedType(med)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border text-left truncate ${
                        medType === med
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                          : 'bg-cream-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {med}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 🛁 목욕 종류 선택 */}
            {log.type === 'bath' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  🛁 목욕 케어 종류 선택
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['저자극 쿨링 바스', '거품 입욕 케어', '미온수 타올 헹굼'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBathType(b)}
                      className={`py-2.5 px-1 rounded-xl text-[11px] font-bold transition-all border text-center ${
                        bathType === b
                          ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                          : 'bg-cream-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Buttons: Delete & Submit */}
            <div className="pt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="py-3 px-4 rounded-2xl border border-red-200 text-red-600 bg-red-50 font-bold text-xs hover:bg-red-100 flex items-center justify-center gap-1 active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                삭제
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-coral-500 text-white font-bold text-sm shadow-md hover:bg-coral-600 active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                수정 완료
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
