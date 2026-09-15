import React, { useState } from 'react';
import {
  Sparkles,
  QrCode,
  Syringe,
  BellRing,
  CheckCircle2,
  HeartPulse,
  ShoppingBag
} from 'lucide-react';
import type { TemperatureState, BabyProfile } from '../types';
import { QMongAvatar } from './QMongAvatar';

interface CareShopTabProps {
  tempState: TemperatureState;
  onOpenAiScan: () => void;
  onOpenBarcodeModal: () => void;
  onSelectProduct: (productName: string) => void;
  activeBaby?: BabyProfile;
}

export const CareShopTab: React.FC<CareShopTabProps> = ({
  tempState,
  onOpenAiScan,
  onOpenBarcodeModal,
  onSelectProduct,
  activeBaby,
}) => {
  const [alarm1Set, setAlarm1Set] = useState(true);

  return (
    <div className="space-y-4 pb-20">
      {/* 1. Header Banner with Q-Mong doctor mascot (qmong3) */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-coral-500 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <span className="bg-white/20 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-0.5 rounded-full border border-white/30">
              맘큐 맞춤 케어 🩺
            </span>
            <h2 className="font-black text-lg text-white mt-1">
              {activeBaby ? activeBaby.name : '아기'} 맞춤 건강 관리
            </h2>
            <p className="text-xs text-white/90 mt-0.5 leading-tight">
              큐몽이가 아기 체온, 예방접종, 대변/피부 상태를<br />
              관찰해 드려요!
            </p>
          </div>

          <QMongAvatar size="xl" mood="doctor" variant="qmong3" className="drop-shadow-lg" />
        </div>
      </div>

      {/* 2. [기저귀 패키지 바코드 정품 등록] 배너 */}
      <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-soft relative overflow-hidden">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                정품 리필 +1,000P
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

      {/* 3. [AI 아기 대변 & 피부 사진 진단] 배너 */}
      <div className="bg-white rounded-2xl p-4 border border-indigo-200 shadow-soft relative overflow-hidden">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <QMongAvatar size="md" mood="doctor" variant="qmong3" />
            <div>
              <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                큐몽이 AI 헬스케어 Solution
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

      {/* 4. [예방 접종 & 검진 D-day 알림] 배너 */}
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
                <h5 className="font-bold text-xs text-gray-900">DTaP & 폴리오 1차 접종 완료</h5>
                <p className="text-[10px] text-emerald-700">생후 2개월 연령 권장 접종 완료됨</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 접종 완료
            </span>
          </div>
        </div>
      </div>

      {/* 5. 맘큐 공식 추천 헬스케어 구비품 */}
      <div className="bg-white rounded-2xl p-4 border border-cream-200 shadow-soft space-y-3">
        <h4 className="font-extrabold text-xs text-gray-900 flex items-center gap-1.5">
          <ShoppingBag className="w-4 h-4 text-coral-500" />
          맘큐 추천 건강 관리 육아용품
        </h4>
        <div className="grid grid-cols-2 gap-2.5">
          <div
            onClick={() => onSelectProduct('하기스 네이처메이드 물티슈 캡형 64매')}
            className="p-3 rounded-xl bg-cream-50 border border-cream-200 hover:border-coral-300 transition-all cursor-pointer"
          >
            <span className="text-[10px] font-bold text-coral-600 bg-coral-50 px-2 py-0.5 rounded">맘큐 10% 쿠폰</span>
            <h5 className="font-bold text-xs text-gray-900 mt-1">하기스 네이처메이드 물티슈</h5>
            <p className="text-[10px] text-gray-500 mt-0.5">저자극 쿨링 수분 케어</p>
          </div>

          <div
            onClick={() => onSelectProduct('그린핑거 베이비 로션')}
            className="p-3 rounded-xl bg-cream-50 border border-cream-200 hover:border-coral-300 transition-all cursor-pointer"
          >
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">피부 진정 케어</span>
            <h5 className="font-bold text-xs text-gray-900 mt-1">그린핑거 베이비 로션</h5>
            <p className="text-[10px] text-gray-500 mt-0.5">고보습 진정 모이스처</p>
          </div>
        </div>
      </div>
    </div>
  );
};
