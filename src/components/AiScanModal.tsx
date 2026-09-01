import React, { useState } from 'react';
import { Sparkles, Upload, CheckCircle2, ShoppingBag, X, RefreshCw, Activity, ArrowRight } from 'lucide-react';
import type { AiDiagnosisResult } from '../types';

interface AiScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (productName: string) => void;
}

export const AiScanModal: React.FC<AiScanModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [scanType, setScanType] = useState<'stool' | 'skin'>('stool');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AiDiagnosisResult | null>(null);

  if (!isOpen) return null;

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      if (scanType === 'stool') {
        setResult({
          scanType: 'stool',
          statusTitle: '정상 황금변 (장 건강 양호)',
          statusBadge: '정상 (장 건강 95점)',
          healthScore: 95,
          description: '변의 색상과 묽기가 매우 건강한 상태입니다. 현재 분유/이유식 밸런스가 뛰어나며, 장내 유익균 유지를 위해 유산균 케어를 지속해주세요.',
          recommendedProduct: {
            name: '황금변 유지 생유산균 포드롭스 (30일분)',
            subtitle: '영유아 특화 100억 CFU 덴마크 생유산균',
            discount: 'D2C 자사몰 전용 1+1 기획전',
            originalPrice: '48,000원',
            salePrice: '24,000원',
            imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
          },
        });
      } else {
        setResult({
          scanType: 'skin',
          statusTitle: '경미한 침독 및 진정 필요',
          statusBadge: '주의 (수분케어 필요)',
          healthScore: 78,
          description: '볼과 턱 주변에 가벼운 건조성 발진 흔적이 감지되었습니다. 저자극 쿨링 수딩밤과 보습 크림 덧발라주기를 추천합니다.',
          recommendedProduct: {
            name: '열감 진정 시카 쿨링 수딩밤 50ml',
            subtitle: '접종열 & 기저귀 자극 즉각 쿨링 패치 겸용',
            discount: '체온 연동 15% 긴급 할인',
            originalPrice: '28,000원',
            salePrice: '23,800원',
            imageUrl: 'https://images.unsplash.com/photo-1608248597260-9994c653229b?auto=format&fit=crop&w=400&q=80',
          },
        });
      }
    }, 2500);
  };

  const handleReset = () => {
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">AI 아기 건강 진단</h3>
              <p className="text-xs text-gray-500">대변 / 피부 이미지 분석 & 맞춤 케어 추천</p>
            </div>
          </div>
          <button
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selectors */}
        {!result && !isAnalyzing && (
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl mb-4">
            <button
              onClick={() => setScanType('stool')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                scanType === 'stool'
                  ? 'bg-white text-coral-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              💩 대변 상태 분석
            </button>
            <button
              onClick={() => setScanType('skin')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                scanType === 'skin'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              👶 피부 발진/진정 분석
            </button>
          </div>
        )}

        {/* Main Content Area */}
        {!result && !isAnalyzing && (
          <div className="space-y-4 mb-5">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-cream-50 hover:border-coral-400 transition-colors">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-3 shadow-sm text-2xl">
                {scanType === 'stool' ? '💩' : '👶'}
              </div>
              <p className="font-bold text-sm text-gray-800">
                {scanType === 'stool' ? '아기 대변 사진 샘플 업로드' : '피부 자극 부위 사진 샘플 업로드'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                스마트폰 카메라로 촬영된 사진을 AI가<br />색상/질감 딥러닝 알고리즘으로 분석합니다.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-coral-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md">
                <Upload className="w-4 h-4" />
                샘플 이미지 선택됨 (자동 준비 완료)
              </div>
            </div>
          </div>
        )}

        {/* Loading Spinner / Scanning Animation */}
        {isAnalyzing && (
          <div className="py-12 text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-coral-200 animate-ping"></div>
              <div className="w-16 h-16 rounded-full bg-coral-500 text-white flex items-center justify-center shadow-lg">
                <Activity className="w-8 h-8 animate-spin" />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">
                AI 딥러닝 헬스케어 엔진 분석 중...
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                영유아 소아과 임상 데이터 기반 매칭 중 (88,000건 학습)
              </p>
            </div>
          </div>
        )}

        {/* Diagnosis Result Card */}
        {result && (
          <div className="space-y-4 animate-scale-pop">
            {/* Status Card */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-emerald-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                  {result.statusBadge}
                </span>
                <span className="text-xs text-emerald-700 font-semibold">
                  분석 신뢰도 98.4%
                </span>
              </div>
              <h4 className="font-extrabold text-base text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                {result.statusTitle}
              </h4>
              <p className="text-xs text-emerald-800 mt-2 leading-relaxed bg-white/70 p-3 rounded-xl border border-emerald-100">
                {result.description}
              </p>
            </div>

            {/* CRM Commerce Recommendation Banner */}
            <div className="bg-gradient-to-r from-coral-50 to-amber-50 border border-coral-200 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold bg-coral-500 text-white px-2 py-0.5 rounded-md">
                  💡 CRM 1:1 맞춤 추천 기획전
                </span>
                <span className="text-[11px] font-bold text-coral-600">
                  {result.recommendedProduct.discount}
                </span>
              </div>
              <div className="flex gap-3 items-center mt-2">
                <img
                  src={result.recommendedProduct.imageUrl}
                  alt={result.recommendedProduct.name}
                  className="w-16 h-16 rounded-xl object-cover border border-coral-200 shrink-0 shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-xs text-gray-900 truncate">
                    {result.recommendedProduct.name}
                  </h5>
                  <p className="text-[11px] text-gray-500 truncate">
                    {result.recommendedProduct.subtitle}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-extrabold text-coral-600">
                      {result.recommendedProduct.salePrice}
                    </span>
                    <span className="text-[11px] text-gray-400 line-through">
                      {result.recommendedProduct.originalPrice}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onSelectProduct) onSelectProduct(result.recommendedProduct.name);
                  onClose();
                }}
                className="w-full mt-3 py-2.5 rounded-xl bg-coral-500 text-white text-xs font-bold shadow-md hover:bg-coral-600 flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                기획전 구경하고 혜택받기
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Submit / Action Buttons */}
        {!result && !isAnalyzing && (
          <button
            onClick={handleStartAnalysis}
            className="w-full py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-base shadow-float hover:bg-indigo-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            AI 건강 분석 시작하기
          </button>
        )}

        {result && (
          <button
            onClick={handleReset}
            className="w-full mt-3 py-2.5 rounded-xl border border-gray-300 text-gray-600 font-bold text-xs hover:bg-gray-50"
          >
            다른 사진 분석하기
          </button>
        )}
      </div>
    </div>
  );
};
