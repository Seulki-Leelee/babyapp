import React, { useState, useEffect } from 'react';
import { Thermometer, AlertCircle, Plus, Minus, Check, X, ShieldAlert, HeartHandshake } from 'lucide-react';

interface TempModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (temp: number) => void;
  initialTemp?: number;
}

export const TempModal: React.FC<TempModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTemp = 36.5,
}) => {
  const [temp, setTemp] = useState(initialTemp);

  useEffect(() => {
    setTemp(initialTemp);
  }, [initialTemp, isOpen]);

  if (!isOpen) return null;

  const handleIncrement = () => {
    setTemp((prev) => Math.min(42.0, parseFloat((prev + 0.1).toFixed(1))));
  };

  const handleDecrement = () => {
    setTemp((prev) => Math.max(35.0, parseFloat((prev - 0.1).toFixed(1))));
  };

  // Temperature status and pediatric care advice logic
  const getTempAdvice = (val: number) => {
    if (val < 37.5) {
      return {
        level: 'normal',
        badge: '정상 체온 (36.0~37.4°C)',
        badgeStyle: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        cardStyle: 'bg-emerald-50/80 border-emerald-200',
        icon: '💚',
        advice: '아기 체온이 아주 양호합니다. 평소처럼 쾌적한 실내 온도(22~24°C)와 습도를 유지해 주세요.',
      };
    } else if (val >= 37.5 && val <= 37.9) {
      return {
        level: 'mild',
        badge: '미열 감지 (37.5~37.9°C)',
        badgeStyle: 'bg-amber-100 text-amber-800 border-amber-300',
        cardStyle: 'bg-amber-50/80 border-amber-200',
        icon: '💛',
        advice: '옷을 가볍고 얇은 순면으로 갈아입히고 실내를 시원하게(20~22°C) 합니다. 물을 자주 조금씩 먹여 수분을 보충하고 30분 뒤 체온을 다시 측정해 주세요.',
      };
    } else if (val >= 38.0 && val <= 38.4) {
      return {
        level: 'fever',
        badge: '발열 (38.0~38.4°C)',
        badgeStyle: 'bg-orange-100 text-orange-800 border-orange-300',
        cardStyle: 'bg-orange-50/80 border-orange-200',
        icon: '🧡',
        advice: '아기 체중에 맞는 정량의 해열제(아세트아미노펜 등)를 복용합니다. 4시간 투약 타이머를 작동하고 미온수 타월로 몸을 가볍게 닦아주세요.',
      };
    } else {
      return {
        level: 'high_fever',
        badge: '고열 경고 (38.5°C 이상)',
        badgeStyle: 'bg-red-100 text-red-700 border-red-300',
        cardStyle: 'bg-red-50/80 border-red-200',
        icon: '🔴',
        advice: '해열제 교차 투약(2시간 간격)을 검토하고, 아기가 처지거나 교차 투약 후에도 39°C 이상 지속 시 소아과 진료 또는 응급실 방문을 권장합니다.',
      };
    }
  };

  const adviceInfo = getTempAdvice(temp);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(temp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 pb-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-gray-900">체온 측정 & 맞춤 가이드</h3>
              <p className="text-xs text-gray-500">0.1°C 정밀 측정 및 실시간 대처 조언</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 0.1°C Stepper Counter */}
          <div className="bg-cream-50 rounded-2xl p-4 border border-cream-200 text-center space-y-3">
            <span className={`inline-block text-xs font-extrabold px-3 py-1 rounded-full border ${adviceInfo.badgeStyle}`}>
              {adviceInfo.badge}
            </span>

            {/* Stepper Buttons */}
            <div className="flex items-center justify-center gap-4 py-2">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-12 h-12 rounded-2xl bg-white border border-gray-300 text-gray-800 text-xl font-black shadow-sm hover:bg-cream-100 active:scale-95 flex items-center justify-center shrink-0"
              >
                <Minus className="w-6 h-6 stroke-[3]" />
              </button>

              <div className="min-w-[120px]">
                <span className="font-black text-4xl text-gray-900 tracking-tight">
                  {temp.toFixed(1)}
                </span>
                <span className="font-extrabold text-xl text-gray-500 ml-1">°C</span>
              </div>

              <button
                type="button"
                onClick={handleIncrement}
                className="w-12 h-12 rounded-2xl bg-white border border-gray-300 text-gray-800 text-xl font-black shadow-sm hover:bg-cream-100 active:scale-95 flex items-center justify-center shrink-0"
              >
                <Plus className="w-6 h-6 stroke-[3]" />
              </button>
            </div>

            {/* Preset Buttons */}
            <div className="flex justify-center gap-2 pt-1">
              {[36.5, 37.5, 38.2, 38.8].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTemp(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    temp === t
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {t}°C
                </button>
              ))}
            </div>
          </div>

          {/* Pediatric Care Advice Box */}
          <div className={`p-4 rounded-2xl border transition-all space-y-1.5 ${adviceInfo.cardStyle}`}>
            <div className="flex items-center gap-1.5 font-extrabold text-xs text-gray-900">
              <span className="text-sm">{adviceInfo.icon}</span>
              <span>체온별 육아 권장 조언</span>
            </div>
            <p className="text-xs text-gray-800 leading-relaxed font-medium">
              {adviceInfo.advice}
            </p>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-red-500 text-white font-extrabold text-sm shadow-md hover:bg-red-600 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            체온 {temp.toFixed(1)}°C 기록 저장하기
          </button>
        </form>
      </div>
    </div>
  );
};
