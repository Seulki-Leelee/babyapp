import React, { useState } from 'react';
import {
  Sparkles,
  QrCode,
  ShieldAlert,
  ShoppingBag,
  Syringe,
  BellRing,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import type { TemperatureState } from '../types';

interface CareShopTabProps {
  tempState: TemperatureState;
  onOpenAiScan: () => void;
  onOpenBarcodeModal: () => void;
  onSelectProduct: (productName: string) => void;
}

export const CareShopTab: React.FC<CareShopTabProps> = ({
  tempState,
  onOpenAiScan,
  onOpenBarcodeModal,
  onSelectProduct,
}) => {
  const [alarm1Set, setAlarm1Set] = useState(true);

  return (
    <div className="space-y-4 pb-20">
      {/* 1. [기저귀 패키지 바코드 정품 등록] 배너 (통일된 디자인 규격) */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-soft relative overflow-hidden">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                D2C CRM 정품 리필 +1,000P
              </span>
              <h3 className="font-extrabold text-sm text-gray-900 mt-0.5">
                기저귀 패키지 바코드 정품 등록
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed mt-1">
          기저귀 패키지의 바코드를 스캔하면 정품 인증 포인트가 적립되고 홈 화면의 잔여 기저귀 60매가 자동 리필됩니다.
        </p>

        <button
          onClick={onOpenBarcodeModal}
          className="w-full mt-3 py-2.5 rounded-xl bg-amber-500 text-white font-extrabold text-xs shadow-md hover:bg-amber-600 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <QrCode className="w-4 h-4" />
          바코드 스캔으로 기저귀 리필하기
        </button>
      </div>

      {/* 2. [AI 아기 대변 & 피부 사진 진단] 배너 (통일된 디자인 규격) */}
      <div className="bg-white rounded-2xl p-4 border border-indigo-200 shadow-soft relative overflow-hidden">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                AI 헬스케어 진단 솔루션
              </span>
              <h3 className="font-extrabold text-sm text-gray-900 mt-0.5">
                AI 아기 대변 & 피부 사진 진단
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed mt-1">
          대변/피부 사진 업로드 시 소아과 빅데이터를 기반으로 장 건강 상태와 피부 민감도를 즉시 분석하고 맞춤 솔루션을 안내합니다.
        </p>

        <button
          onClick={onOpenAiScan}
          className="w-full mt-3 py-2.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs shadow-md hover:bg-indigo-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          대변/피부 사진 업로드 진단 시작
        </button>
      </div>

      {/* 3. [예방 접종 & 검진 D-day 알림] 배너 (통일된 디자인 규격) */}
      <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-soft space-y-3">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-coral-100 text-coral-600 flex items-center justify-center font-bold shrink-0">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-coral-600 bg-coral-50 px-2 py-0.5 rounded-full border border-coral-200">
                생후 4개월 예방접종 일정
              </span>
              <h3 className="font-extrabold text-sm text-gray-900 mt-0.5">
                예방 접종 & 검진 D-day 알림
              </h3>
            </div>
          </div>
        </div>

        {/* 2 Rows */}
        <div className="space-y-2 pt-1">
          <div className="p-2.5 rounded-xl bg-cream-50 border border-cream-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-coral-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shrink-0">
                D-3
              </span>
              <div>
                <h5 className="font-bold text-xs text-gray-900">폐구균 2차 예방접종 예정</h5>
                <p className="text-[10px] text-gray-500">2026.09.04 예정 (생후 4개월 권장)</p>
              </div>
            </div>
            <button
              onClick={() => setAlarm1Set(!alarm1Set)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                alarm1Set
                  ? 'bg-coral-100 text-coral-600 border border-coral-200'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <BellRing className="w-3 h-3" />
              {alarm1Set ? '알림 켜짐' : '알림 꺼짐'}
            </button>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shrink-0">
                완료
              </span>
              <div>
                <h5 className="font-bold text-xs text-gray-900">dtap & 폴리오 1차 접종 완료</h5>
                <p className="text-[10px] text-emerald-700">생후 2개월 연령 권장 접종 완료됨</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 접종 완료
            </span>
          </div>
        </div>
      </div>

      {/* 4. 제일 아래: [광고들] */}
      <div className="space-y-3">
        {/* Compact Emergency Care Banner */}
        <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-xl p-3 text-white shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="bg-white text-red-600 text-[9px] font-extrabold px-2 py-0.2 rounded-full">
                🚨 체온 연동 케어
              </span>
              <h4 className="font-bold text-xs text-white mt-0.5">
                접종열 & 고열 진정 긴급 케어 세트 (15% 할인)
              </h4>
            </div>
          </div>
          <button
            onClick={() => onSelectProduct('접종열 & 고열 진정 케어 세트')}
            className="px-3 py-1.5 rounded-lg bg-white text-red-600 font-extrabold text-[11px] shadow-2xs hover:bg-red-50 shrink-0"
          >
            보기 ➔
          </button>
        </div>

        {/* Compact Product Ads (Diaper & Wipes) */}
        <div className="bg-white rounded-2xl p-3.5 border border-cream-200 shadow-soft">
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-gray-100">
            <h4 className="font-extrabold text-xs text-gray-900">
              콩심이네 추천 필수용품 리필
            </h4>
            <span className="text-[10px] text-coral-500 font-bold">자사몰 혜택</span>
          </div>

          <div className="space-y-2.5">
            {/* Product 1: 2025 하기스 네이처메이드 3단계 공용 150매 (밴드형) X 2 (총 300매) */}
            <div className="flex gap-3 items-center p-2 rounded-xl border border-gray-100 hover:border-amber-200 transition-colors bg-amber-50/30">
              <img
                src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=200&q=80"
                alt="기저귀 300매"
                className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-extrabold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                  기저귀 특가
                </span>
                <h5 className="font-bold text-xs text-gray-900 truncate mt-0.5">
                  2025 하기스 네이처메이드 3단계 공용 150매 (밴드형) X 2 (총 300매)
                </h5>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xs font-black text-coral-500">89,000원</span>
                  <span className="text-[10px] text-gray-400 line-through">105,000원</span>
                </div>
              </div>
              <button
                onClick={() => onSelectProduct('2025 하기스 네이처메이드 3단계 300매')}
                className="p-2 rounded-lg bg-coral-50 text-coral-600 font-bold text-xs hover:bg-coral-100 shrink-0"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>

            {/* Product 2: NEW 하기스 내츄럴케어플러스 물티슈 72매*10입 */}
            <div className="flex gap-3 items-center p-2 rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors bg-emerald-50/30">
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80"
                alt="물티슈 10입"
                className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                  물티슈 신상품
                </span>
                <h5 className="font-bold text-xs text-gray-900 truncate mt-0.5">
                  NEW 하기스 내츄럴케어플러스 물티슈 72매*10입
                </h5>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-xs font-black text-coral-500">21,900원</span>
                  <span className="text-[10px] text-gray-400 line-through">26,000원</span>
                </div>
              </div>
              <button
                onClick={() => onSelectProduct('NEW 하기스 내츄럴케어플러스 물티슈 10입')}
                className="p-2 rounded-lg bg-coral-50 text-coral-600 font-bold text-xs hover:bg-coral-100 shrink-0"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
