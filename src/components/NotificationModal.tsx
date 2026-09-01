import React from 'react';
import { Bell, ShieldAlert, Package, Calendar, RefreshCw, X, CheckCheck } from 'lucide-react';
import type { NotificationItem } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onOpenTempModal: () => void;
  onOpenInventoryModal: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onOpenTempModal,
  onOpenInventoryModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all animate-slide-up max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-coral-100 text-coral-600 flex items-center justify-center font-bold">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-gray-900">최근 알림 내역</h3>
              <p className="text-xs text-gray-500">육아 케어 및 스마트 알림 목록</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                item.type === 'fever'
                  ? 'bg-red-50/70 border-red-200'
                  : item.type === 'inventory'
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-cream-50 border-cream-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      item.type === 'fever'
                        ? 'bg-red-500 text-white'
                        : item.type === 'inventory'
                        ? 'bg-amber-500 text-white'
                        : item.type === 'vaccine'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-coral-500 text-white'
                    }`}
                  >
                    {item.type === 'fever' ? (
                      <ShieldAlert className="w-4 h-4" />
                    ) : item.type === 'inventory' ? (
                      <Package className="w-4 h-4" />
                    ) : item.type === 'vaccine' ? (
                      <Calendar className="w-4 h-4" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-gray-900">{item.title}</h4>
                    <span className="text-[10px] text-gray-400">{item.time}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-2 leading-relaxed">{item.message}</p>

              {/* Action Link inside Notification */}
              {item.type === 'fever' && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenTempModal();
                  }}
                  className="mt-2 text-[11px] font-bold text-red-600 bg-white px-2.5 py-1 rounded-lg border border-red-200 shadow-2xs hover:bg-red-50"
                >
                  체온 측정 / 해열제 타이머 ➔
                </button>
              )}

              {item.type === 'inventory' && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenInventoryModal();
                  }}
                  className="mt-2 text-[11px] font-bold text-amber-700 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs hover:bg-amber-50"
                >
                  인벤토리 리필 & 쿠폰받기 ➔
                </button>
              )}
            </div>
          ))}
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
