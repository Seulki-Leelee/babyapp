import React, { useState } from 'react';
import { QrCode, Camera, Sparkles, CheckCircle2, X, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BarcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (count: number) => void;
}

export const BarcodeModal: React.FC<BarcodeModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleStartScan = () => {
    setIsScanning(true);
    setScanResult(false);

    // Simulate barcode recognition after 2 seconds
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF6B57', '#528B6D', '#FFB800', '#FFD166'],
        });
      } catch (e) {
        console.error(e);
      }

      onScanSuccess(60);
    }, 2000);
  };

  const handleReset = () => {
    setScanResult(false);
    setIsScanning(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">기저귀 바코드 정품 등록</h3>
              <p className="text-xs text-gray-500">패키지 바코드 스캔 시 60매 자동 충전 & 포인트 적립</p>
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

        {/* Scanner Viewport */}
        {!scanResult ? (
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden h-64 flex flex-col items-center justify-center mb-5 border-2 border-gray-700">
            {isScanning ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Laser animation */}
                <div className="absolute w-4/5 h-0.5 bg-coral-500 shadow-[0_0_15px_#FF6B57] animate-bounce top-1/2 -translate-y-1/2 z-20"></div>
                {/* Camera frame overlay */}
                <div className="w-48 h-48 border-2 border-dashed border-white/60 rounded-xl flex items-center justify-center relative">
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-coral-500"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-coral-500"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-coral-500"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-coral-500"></div>
                  <Camera className="w-8 h-8 text-white/40 animate-pulse" />
                </div>
                <p className="text-white text-xs font-semibold mt-4 bg-black/60 px-3 py-1 rounded-full border border-white/20">
                  바코드를 사각형 영역 안에 맞추어 주세요...
                </p>
              </div>
            ) : (
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 border border-white/20">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <p className="text-white font-bold text-sm">기저귀 패키지 바코드 스캔</p>
                <p className="text-gray-400 text-xs mt-1">
                  구입하신 자사몰 정품 바코드를 인식하면<br />
                  인벤토리가 즉시 충전되고 1,000P가 자동 지급됩니다.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Scan Success Card */
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 mb-5 text-center animate-scale-pop">
            <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              스캔 인증 성공!
            </span>
            <h4 className="font-extrabold text-lg text-emerald-950 mt-2">
              보송보송 기저귀 3단계 60매 충전 완료!
            </h4>
            <div className="mt-3 bg-white/80 rounded-xl p-3 border border-emerald-200 text-xs text-emerald-800 space-y-1">
              <p className="flex items-center justify-between">
                <span>➕ 홈 인벤토리 충전:</span>
                <strong className="text-emerald-700 font-bold">+60매 (총 60/60매)</strong>
              </p>
              <p className="flex items-center justify-between">
                <span>💰 D2C 적립금 혜택:</span>
                <strong className="text-amber-600 font-bold">+1,000P 적립 완료</strong>
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!scanResult ? (
          <button
            onClick={handleStartScan}
            disabled={isScanning}
            className="w-full py-3.5 rounded-2xl bg-amber-500 text-white font-bold text-base shadow-lg hover:bg-amber-600 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                스캔 진행 중...
              </>
            ) : (
              <>
                <Camera className="w-5 h-5" />
                바코드 스캔하기 (시뮬레이션)
              </>
            )}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setScanResult(false)}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50"
            >
              다시 스캔하기
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-coral-500 text-white font-bold text-sm shadow-md hover:bg-coral-600"
            >
              홈 인벤토리 확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
