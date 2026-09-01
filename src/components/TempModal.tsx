import React, { useState } from 'react';
import { Thermometer, AlertTriangle, Clock, Check, X, ShieldAlert } from 'lucide-react';

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
  initialTemp = 38.2,
}) => {
  const [temp, setTemp] = useState<number>(initialTemp);

  if (!isOpen) return null;

  const isFever = temp >= 38.0;

  const handleSave = () => {
    onSave(temp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-fadeIn">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">아기 체온 측정</h3>
              <p className="text-xs text-gray-500">실시간 체온 및 열 케어 기록</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Temperature Quick Selector */}
        <div className="bg-cream-50 rounded-2xl p-5 border border-cream-200 mb-5 text-center">
          <div className="text-xs font-semibold text-warmgray-500 uppercase tracking-wider mb-1">
            측정 체온 (°C)
          </div>
          <div className="flex items-center justify-center gap-4 my-2">
            <button
              onClick={() => setTemp(prev => Number((prev - 0.1).toFixed(1)))}
              className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm text-xl font-bold text-gray-700 active:scale-95 transition-transform"
            >
              -
            </button>
            <span
              className={`text-4xl font-extrabold tracking-tight ${
                isFever ? 'text-red-500 animate-pulse' : 'text-emerald-600'
              }`}
            >
              {temp.toFixed(1)}°C
            </span>
            <button
              onClick={() => setTemp(prev => Number((prev + 0.1).toFixed(1)))}
              className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm text-xl font-bold text-gray-700 active:scale-95 transition-transform"
            >
              +
            </button>
          </div>

          {/* Quick preset buttons */}
          <div className="flex justify-center gap-2 mt-4">
            {[36.5, 37.2, 38.2, 38.8].map((t) => (
              <button
                key={t}
                onClick={() => setTemp(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  temp === t
                    ? 'bg-coral-500 text-white shadow-sm font-bold'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {t}°C
              </button>
            ))}
          </div>
        </div>

        {/* Warning Badge & Guidance */}
        {isFever ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-red-600">🚨 38.0°C 이상 고열 발생!</span>
                  <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    긴급 관리
                  </span>
                </div>
                <p className="text-xs text-red-700 mt-1 leading-relaxed">
                  • 4시간 간격 해열제 교차 투여 타이머가 자동 활성화됩니다.<br />
                  • 스마트 케어&샵 탭에서 <strong>열감 진정 쿨링패치 큐레이션</strong>을 확인하세요.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 mb-5 flex items-center gap-2 text-xs text-emerald-800 font-medium">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            정상 미열 범위입니다. 충분한 수분 섭취를 권장합니다.
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 rounded-2xl bg-coral-500 text-white font-bold text-base shadow-float hover:bg-coral-600 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          측정 기록 저장하기
        </button>
      </div>
    </div>
  );
};
