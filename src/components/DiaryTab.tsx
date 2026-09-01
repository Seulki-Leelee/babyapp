import React, { useState } from 'react';
import { Camera, Heart, Sparkles, Calendar, Share2, Award, ShoppingBag, Plus } from 'lucide-react';
import type { PhotoDiaryItem } from '../types';

interface DiaryTabProps {
  diaries: PhotoDiaryItem[];
  onOpenDiaryModal: () => void;
  babyDays?: number;
  onToggleLike: (id: string) => void;
  onSelectProduct: (productName: string) => void;
}

export const DiaryTab: React.FC<DiaryTabProps> = ({
  diaries,
  onOpenDiaryModal,
  babyDays = 120,
  onToggleLike,
  onSelectProduct,
}) => {
  return (
    <div className="space-y-4 pb-20">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-coral-500 via-rose-400 to-amber-400 rounded-2xl p-5 text-white shadow-float relative overflow-hidden">
        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              성장 모먼트 앨범
            </span>
            <h2 className="font-black text-2xl text-white mt-2 tracking-tight">
              우리 아기 +{babyDays}일째 👶
            </h2>
            <p className="text-xs text-white/90 mt-1">
              매일의 반짝이는 육아 기억을 감성 폴라로이드로 소장하세요.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/30">
            📸
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenDiaryModal}
          className="w-full mt-4 py-3 rounded-xl bg-white text-coral-600 font-extrabold text-sm shadow-md hover:bg-cream-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          오늘의 사진과 일기 작성하기
        </button>
      </div>

      {/* 2. Polaroid Style Feed List */}
      <div className="space-y-5">
        {diaries.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-4 border border-cream-200 shadow-soft space-y-3 transition-transform animate-scale-pop"
          >
            {/* Top Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.moodEmoji}</span>
                <div>
                  <h4 className="font-extrabold text-xs text-gray-900">
                    김로아 (D+{item.babyDays})
                  </h4>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {item.date}
                  </span>
                </div>
              </div>
              <span className="bg-coral-50 text-coral-600 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-coral-100">
                ⭐ 뒤집기 성공 매직 모먼트
              </span>
            </div>

            {/* Polaroid Frame */}
            <div className="bg-cream-50 rounded-2xl p-3 border border-cream-200 shadow-inner space-y-3">
              <div className="relative rounded-xl overflow-hidden aspect-square border border-gray-200/60 shadow-sm bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt="육아 일기 사진"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  D+{item.babyDays}일
                </div>
              </div>

              {/* Diary Text */}
              <div className="px-1 py-1">
                <p className="font-extrabold text-sm text-gray-800 leading-relaxed font-sans">
                  "{item.content}"
                </p>
              </div>
            </div>

            {/* Bottom Interactions */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleLike(item.id)}
                  className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                    item.isLiked
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      item.isLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-400'
                    }`}
                  />
                  {item.likesCount}
                </button>
                <button className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800">
                  <Share2 className="w-3.5 h-3.5" />
                  공유하기
                </button>
              </div>

              <span className="text-[11px] text-coral-500 font-bold bg-coral-50 px-2.5 py-1 rounded-full">
                💌 칭찬 스티커 획득
              </span>
            </div>

            {/* D2C Keepsake Product Curation Banner */}
            {item.crmProduct && (
              <div className="mt-2 bg-gradient-to-r from-amber-50 to-cream-100 rounded-2xl p-3 border border-amber-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    🎁
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-700">
                      {item.crmProduct.title}
                    </span>
                    <h5 className="font-bold text-xs text-gray-900">
                      {item.crmProduct.productName}
                    </h5>
                    <p className="text-[10px] text-coral-600 font-extrabold">
                      {item.crmProduct.discountText} ({item.crmProduct.price})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectProduct(item.crmProduct!.productName)}
                  className="px-2.5 py-1.5 rounded-lg bg-coral-500 text-white font-extrabold text-[11px] shadow-sm hover:bg-coral-600 shrink-0"
                >
                  액자 제작
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
