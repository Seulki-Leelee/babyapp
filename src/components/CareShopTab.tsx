import React from 'react';
import {
  Sparkles,
  QrCode,
  ShieldAlert,
  ShoppingBag,
  Heart,
  ChevronRight,
  Gift,
  Award,
  Zap
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
  return (
    <div className="space-y-4 pb-20">
      {/* 1. Temperature-tailored Emergency Care Banner (Appears when temp >= 38.0°C) */}
      {tempState.isHighFever ? (
        <div className="bg-gradient-to-br from-red-500 via-rose-500 to-coral-600 rounded-2xl p-4 text-white shadow-float animate-pulse-border">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-white text-red-600 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              🚨 체온 연동 긴급 큐레이션 ({tempState.currentTemp}°C)
            </span>
            <span className="text-[11px] font-bold bg-black/20 px-2 py-0.5 rounded-lg">
              15% 즉시할인
            </span>
          </div>

          <h3 className="font-extrabold text-base leading-snug">
            접종열 & 고열 진정 긴급 케어 세트
          </h3>
          <p className="text-xs text-red-100 mt-1">
            소아과 전문의 자문: 쿨링 패치 부착 + 수딩밤 열감 보습케어 키트
          </p>

          <div className="mt-3 bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center justify-between border border-white/20">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1608248597260-9994c653229b?auto=format&fit=crop&w=300&q=80"
                alt="쿨링패치"
                className="w-12 h-12 rounded-lg object-cover border border-white/40 shadow-sm"
              />
              <div>
                <h4 className="font-bold text-xs">열감 진정 쿨링패치(10매) + 하이드로 수딩밤</h4>
                <p className="text-[11px] text-red-100 line-through">28,000원</p>
                <p className="text-sm font-extrabold text-white">23,800원 (최저가 혜택)</p>
              </div>
            </div>
            <button
              onClick={() => onSelectProduct('열감 진정 쿨링패치 + 수딩밤 세트')}
              className="px-3 py-2 rounded-xl bg-white text-red-600 font-extrabold text-xs shadow-md hover:bg-red-50 shrink-0"
            >
              긴급 구매
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-base">
              💚
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                정상 체온 수호 케어
              </span>
              <h4 className="font-extrabold text-xs text-emerald-950 mt-1">
                현재 체온 36.5°C 아주 건강해요!
              </h4>
            </div>
          </div>
          <span className="text-xs text-emerald-600 font-bold">건강 모니터링 중</span>
        </div>
      )}

      {/* 2. AI Photo Diagnosis Banner */}
      <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-soft relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-50 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                AI 헬스케어 솔루션
              </span>
              <h3 className="font-extrabold text-sm text-gray-900 mt-0.5">
                AI 아기 대변 & 피부 사진 진단
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
          대변/피부 사진 업로드 시 소아과 데이터를 기반으로 황금변 장 건강 상태와 피부 민감도를 즉시 분석하고 맞춤 유산균/케어 상품을 큐레이션합니다.
        </p>

        <button
          onClick={onOpenAiScan}
          className="w-full mt-3 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md hover:bg-indigo-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          대변/피부 사진 업로드 시뮬레이션 시작
        </button>
      </div>

      {/* 3. Diaper Barcode Registration Popup Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 text-white shadow-soft flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="bg-white text-amber-600 text-[10px] font-black px-2 py-0.2 rounded-full uppercase">
                D2C CRM 포인트
              </span>
              <span className="text-[11px] text-amber-100">+1,000P 적립</span>
            </div>
            <h4 className="font-extrabold text-sm text-white mt-0.5">
              기저귀 패키지 바코드 정품 등록
            </h4>
            <p className="text-[11px] text-amber-100">
              스캔 즉시 홈 잔여 기저귀 60매 자동 리필
            </p>
          </div>
        </div>

        <button
          onClick={onOpenBarcodeModal}
          className="px-3.5 py-2 rounded-xl bg-white text-amber-600 font-extrabold text-xs shadow-md hover:bg-amber-50 active:scale-95 shrink-0"
        >
          바코드 스캔
        </button>
      </div>

      {/* 4. Age-Tailored D2C Commerce Curation Cards */}
      <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-soft">
        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
          <div>
            <span className="text-[10px] font-bold text-coral-500 uppercase tracking-wide">
              라이프사이클 맞춤 추천
            </span>
            <h4 className="font-extrabold text-sm text-gray-900">
              생후 4개월 (120일) 추천 기획전
            </h4>
          </div>
          <span className="text-[11px] text-coral-500 font-bold flex items-center gap-0.5">
            전체보기 <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="space-y-3">
          {/* Card 1: Probiotics */}
          <div className="flex gap-3 items-center p-2.5 rounded-xl border border-gray-100 hover:border-coral-200 transition-colors">
            <img
              src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80"
              alt="황금변 유산균"
              className="w-16 h-16 rounded-xl object-cover border border-gray-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                AI 추천 1위
              </span>
              <h5 className="font-bold text-xs text-gray-900 truncate mt-0.5">
                황금변 유지 덴마크 100억 생유산균 (30일분)
              </h5>
              <p className="text-[11px] text-gray-400">장 건강 밸런스 유지 / 분유 유산균</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xs font-extrabold text-coral-500">24,000원</span>
                <span className="text-[10px] text-gray-400 line-through">48,000원 (1+1)</span>
              </div>
            </div>
            <button
              onClick={() => onSelectProduct('황금변 유지 생유산균')}
              className="p-2 rounded-lg bg-coral-50 text-coral-600 font-bold text-xs hover:bg-coral-100 shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Soft Diaper Refill */}
          <div className="flex gap-3 items-center p-2.5 rounded-xl border border-gray-100 hover:border-coral-200 transition-colors">
            <img
              src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=200&q=80"
              alt="기저귀"
              className="w-16 h-16 rounded-xl object-cover border border-gray-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded">
                정기구독 10%
              </span>
              <h5 className="font-bold text-xs text-gray-900 truncate mt-0.5">
                순둥이 보송기저귀 2단계 밴드형 (60매x3팩)
              </h5>
              <p className="text-[11px] text-gray-400">자연 유래 흡수체 / 발진 제로</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xs font-extrabold text-coral-500">38,500원</span>
                <span className="text-[10px] text-gray-400 line-through">45,000원</span>
              </div>
            </div>
            <button
              onClick={() => onSelectProduct('순둥이 보송기저귀 2단계 3팩')}
              className="p-2 rounded-lg bg-coral-50 text-coral-600 font-bold text-xs hover:bg-coral-100 shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
