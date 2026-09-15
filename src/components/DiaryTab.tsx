import React, { useState } from 'react';
import { Camera, Heart, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PhotoDiaryItem, BabyProfile } from '../types';
import { QMongAvatar } from './QMongAvatar';

interface DiaryTabProps {
  diaries: PhotoDiaryItem[];
  onOpenDiaryModal: () => void;
  babyDays: number;
  onToggleLike: (id: string) => void;
  onSelectProduct: (productName: string) => void;
  activeBaby?: BabyProfile;
}

export const DiaryTab: React.FC<DiaryTabProps> = ({
  diaries,
  onOpenDiaryModal,
  babyDays,
  onToggleLike,
  onSelectProduct,
  activeBaby,
}) => {
  const activeBabyName = activeBaby ? activeBaby.name : '아기';

  // Selected Diary state (defaults to most recent [0])
  const [selectedDiaryId, setSelectedDiaryId] = useState<string | null>(diaries[0]?.id || null);

  // Calendar State (Default September 2026)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 1-indexed

  // Active single diary entry (ONLY 1 entry shown at a time to prevent scrolling!)
  const activeDiary = diaries.find((d) => d.id === selectedDiaryId) || diaries[0];

  // Helper: check if a specific day has a diary entry
  const getDiaryForDay = (day: number) => {
    const dayStr = day.toString().padStart(2, '0');
    const monthStr = currentMonth.toString().padStart(2, '0');
    const dateFormatted = `${currentYear}.${monthStr}.${dayStr}`;
    return diaries.find((d) => d.date === dateFormatted);
  };

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay(); // 0 is Sun

  return (
    <div className="space-y-3 pb-20">
      {/* 1. Header Banner with Q-Mong mascot (qmong4 camera) */}
      <div className="bg-gradient-to-r from-coral-500 via-pink-500 to-amber-400 rounded-2xl p-3.5 text-white shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <span className="bg-white/20 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-0.5 rounded-full border border-white/30">
              성장 추억 앨범 📸
            </span>
            <h2 className="font-black text-base text-white mt-1">
              {activeBabyName}의 포토 육아일기
            </h2>
            <p className="text-[11px] text-white/90 mt-0.5">
              달력에서 날짜를 선택하여 소중한 순간을 감상해보세요!
            </p>
          </div>

          <QMongAvatar size="xl" mood="camera" variant="qmong4" className="drop-shadow-lg" />
        </div>

        <button
          onClick={onOpenDiaryModal}
          className="w-full mt-3 py-2 rounded-xl bg-white text-coral-600 font-extrabold text-xs shadow-md hover:bg-cream-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <Camera className="w-4 h-4 text-coral-500" />
          오늘의 아기 사진 업로드 & 일기 쓰기
        </button>
      </div>

      {/* 2. Interactive Monthly Calendar Widget (Compact Date Selector) */}
      <div className="bg-white rounded-2xl p-3.5 border border-cream-200 shadow-soft space-y-2.5">
        <div className="flex items-center justify-between border-b border-cream-100 pb-2">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-coral-500" />
            <h4 className="font-extrabold text-xs text-gray-900">
              달력으로 예전 일기 선택하기
            </h4>
          </div>

          {/* Month Navigator */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (currentMonth === 1) {
                  setCurrentMonth(12);
                  setCurrentYear((y) => y - 1);
                } else {
                  setCurrentMonth((m) => m - 1);
                }
              }}
              className="p-1 rounded-lg bg-cream-100 hover:bg-cream-200 text-gray-600"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <span className="text-xs font-black text-gray-800">
              {currentYear}년 {currentMonth}월
            </span>

            <button
              onClick={() => {
                if (currentMonth === 12) {
                  setCurrentMonth(1);
                  setCurrentYear((y) => y + 1);
                } else {
                  setCurrentMonth((m) => m + 1);
                }
              }}
              className="p-1 rounded-lg bg-cream-100 hover:bg-cream-200 text-gray-600"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 text-center text-[10px] font-extrabold text-gray-400 py-0.5">
          <span className="text-red-500">일</span>
          <span>월</span>
          <span>화</span>
          <span>수</span>
          <span>목</span>
          <span>금</span>
          <span className="text-blue-500">토</span>
        </div>

        {/* Calendar Grid Days */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const diaryOnDay = getDiaryForDay(dayNum);
            const isSelected = activeDiary && diaryOnDay?.id === activeDiary.id;

            return (
              <button
                key={`day-${dayNum}`}
                onClick={() => {
                  if (diaryOnDay) {
                    setSelectedDiaryId(diaryOnDay.id);
                  } else {
                    onOpenDiaryModal();
                  }
                }}
                className={`h-8 rounded-lg flex flex-col items-center justify-center relative transition-all text-xs font-bold ${
                  isSelected
                    ? 'bg-coral-500 text-white shadow-xs font-black scale-105'
                    : diaryOnDay
                    ? 'bg-coral-50 border border-coral-300 text-coral-700 hover:bg-coral-100 font-extrabold'
                    : 'bg-cream-50/60 text-gray-600 hover:bg-cream-100'
                }`}
              >
                <span className="leading-none">{dayNum}</span>
                {diaryOnDay && (
                  <span className={`text-[7px] leading-none mt-0.5 ${isSelected ? 'text-white' : 'text-coral-500'}`}>
                    📸
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-cream-100">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-coral-400 inline-block" />
            📸 표시는 사진 일기가 있는 날짜입니다.
          </span>
          <span className="text-coral-600 font-bold">날짜 클릭 시 해당 일기 표시</span>
        </div>
      </div>

      {/* 3. ONLY 1 Single Active Photo Diary Card (No thread list, no long scroll!) */}
      {diaries.length === 0 ? (
        <div className="p-6 text-center bg-white rounded-2xl border border-cream-200 shadow-soft">
          <QMongAvatar size="lg" mood="happy" variant="qmong1" className="mx-auto mb-2" />
          <h4 className="font-extrabold text-sm text-gray-800">등록된 포토일기가 없습니다.</h4>
          <p className="text-xs text-gray-500 mt-1">첫 번째 아기 사진을 업로드하고 일기를 적어보세요!</p>
          <button
            onClick={onOpenDiaryModal}
            className="mt-3 px-4 py-2 bg-coral-500 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-coral-600"
          >
            + 포토일기 작성하기
          </button>
        </div>
      ) : activeDiary ? (
        <div className="bg-white rounded-2xl border border-cream-200 shadow-soft overflow-hidden space-y-2.5 p-3.5">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-cream-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{activeDiary.moodEmoji}</span>
              <div>
                <h3 className="font-black text-sm text-gray-900">{activeDiary.title}</h3>
                <span className="text-[10px] text-gray-400 font-bold">
                  {activeDiary.date} • D+{activeDiary.babyDays}일
                </span>
              </div>
            </div>
            <span className="bg-coral-100 text-coral-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-coral-200">
              선택한 포토일기 📖
            </span>
          </div>

          {/* Photo Display */}
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 border border-cream-200">
            <img
              src={activeDiary.imageUrl}
              alt={activeDiary.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Story Text Content */}
          <p className="text-xs text-gray-800 leading-relaxed bg-cream-50/80 p-3 rounded-xl border border-cream-100">
            {activeDiary.content}
          </p>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => onToggleLike(activeDiary.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                activeDiary.isLiked
                  ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs'
                  : 'bg-cream-100 text-gray-500 hover:bg-cream-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${activeDiary.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>좋아요 {activeDiary.likesCount}</span>
            </button>

            <span className="text-[10px] text-gray-400 font-bold">
              {activeBabyName} 성장 앨범
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
