import React from 'react';
import { Package, Ticket, QrCode, X, ShoppingBag, AlertTriangle, CheckCircle } from 'lucide-react';
import type { DiaperInventory, FormulaInventory } from '../types';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  diaperInventory: DiaperInventory;
  formulaInventory: FormulaInventory;
  onClaimDiaperCoupon: () => void;
  onClaimFormulaCoupon: () => void;
  onOpenBarcodeModal: () => void;
  onOrderProduct: (productName: string) => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  diaperInventory,
  formulaInventory,
  onClaimDiaperCoupon,
  onClaimFormulaCoupon,
  onOpenBarcodeModal,
  onOrderProduct,
}) => {
  if (!isOpen) return null;

  const isDiaperLow = diaperInventory.currentCount <= 20;
  const isFormulaLow = formulaInventory.currentCount <= 3;

  const diaperPercent = Math.min(100, Math.max(0, (diaperInventory.currentCount / diaperInventory.maxCount) * 100));
  const formulaPercent = Math.min(100, Math.max(0, (formulaInventory.currentCount / formulaInventory.maxCount) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all animate-slide-up max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-gray-900">육아 필수재 통합 인벤토리</h3>
              <p className="text-xs text-gray-500">기저귀 & 분유 실시간 수량 추적 및 리필 혜택</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Section 1: Diaper Inventory */}
          <div className="bg-cream-50 rounded-2xl p-4 border border-cream-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧷</span>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">기저귀 재고</span>
                  <h4 className="font-extrabold text-sm text-gray-900">
                    {diaperInventory.brandName}
                  </h4>
                </div>
              </div>
              {isDiaperLow && (
                <span className="bg-red-100 text-red-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> 소진 임박
                </span>
              )}
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs text-gray-500">잔여 수량</span>
                <span className="text-sm font-extrabold text-gray-900">
                  <strong className="text-coral-500 text-base">{diaperInventory.currentCount}</strong> / {diaperInventory.maxCount}매
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isDiaperLow ? 'bg-coral-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${diaperPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex gap-2">
              <button
                onClick={onClaimDiaperCoupon}
                disabled={diaperInventory.couponClaimed}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  diaperInventory.couponClaimed
                    ? 'bg-gray-200 text-gray-500'
                    : 'bg-coral-500 text-white shadow-sm hover:bg-coral-600'
                }`}
              >
                <Ticket className="w-3.5 h-3.5" />
                {diaperInventory.couponClaimed ? '10% 쿠폰 보유중' : '10% 쿠폰받기'}
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenBarcodeModal();
                }}
                className="flex-1 py-2 rounded-xl border border-amber-300 bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-100 flex items-center justify-center gap-1"
              >
                <QrCode className="w-3.5 h-3.5" />
                바코드 스캔 충전
              </button>
            </div>
          </div>

          {/* Section 2: Formula Inventory */}
          <div className="bg-cream-50 rounded-2xl p-4 border border-cream-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍼</span>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">분유 재고</span>
                  <h4 className="font-extrabold text-sm text-gray-900">
                    {formulaInventory.brandName}
                  </h4>
                </div>
              </div>
              {isFormulaLow && (
                <span className="bg-red-100 text-red-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> 소진 임박
                </span>
              )}
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs text-gray-500">잔여 수량</span>
                <span className="text-sm font-extrabold text-gray-900">
                  <strong className="text-coral-500 text-base">{formulaInventory.currentCount}</strong> / {formulaInventory.maxCount}캔
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isFormulaLow ? 'bg-coral-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${formulaPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex gap-2">
              <button
                onClick={onClaimFormulaCoupon}
                disabled={formulaInventory.couponClaimed}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  formulaInventory.couponClaimed
                    ? 'bg-gray-200 text-gray-500'
                    : 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700'
                }`}
              >
                <Ticket className="w-3.5 h-3.5" />
                {formulaInventory.couponClaimed ? '15% 쿠폰 보유중' : '15% 정기배송 쿠폰'}
              </button>
              <button
                onClick={() => {
                  onOrderProduct(formulaInventory.brandName);
                  onClose();
                }}
                className="flex-1 py-2 rounded-xl bg-coral-500 text-white font-bold text-xs hover:bg-coral-600 shadow-sm flex items-center justify-center gap-1"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                1초 원클릭 재주문
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-3 rounded-2xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
