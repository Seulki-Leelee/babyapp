import React, { useState } from 'react';
import { Camera, Plus, Heart, Share2, Baby, Gamepad2, Calendar as CalendarIcon, ChevronRight, X, BookOpen, ChevronLeft } from 'lucide-react';
import type { PhotoDiaryItem } from '../types';

interface DiaryTabProps {
  diaries: PhotoDiaryItem[];
  onOpenDiaryModal: () => void;
  babyDays: number;
  onToggleLike: (id: string) => void;
  onSelectProduct: (productName: string) => void;
}

export const DiaryTab: React.FC<DiaryTabProps> = ({
  diaries,
  onOpenDiaryModal,
  babyDays,
  onToggleLike,
  onSelectProduct,
}) => {
  // Base selected date (Default to 2026.09.01)
  const [selectedDate, setSelectedDate] = useState<string>('2026.09.01');
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  // Month navigation state for Calendar Modal (default to Year 2026, Month 9 - 1 = 8)
  const [calendarYear, setCalendarYear] = useState<number>(2026);
  const [calendarMonth, setCalendarMonth] = useState<number>(8); // 0-indexed: 8 = September

  // Active diary modal readers
  const [selectedDiaryForRead, setSelectedDiaryForRead] = useState<PhotoDiaryItem | null>(null);
  const [activeGuideModal, setActiveGuideModal] = useState<'behavior' | 'play' | null>(null);

  // Generate 11-day date window (selectedDate ± 5 days)
  const generate11DayWindow = (centerDateStr: string) => {
    const dates: { dateStr: string; dayLabel: string; dDay: number }[] = [];
    const parts = centerDateStr.split('.').map(Number);
    const year = parts[0] || 2026;
    const month = (parts[1] || 9) - 1;
    const day = parts[2] || 1;

    const base = new Date(year, month, day);

    for (let offset = -5; offset <= 5; offset++) {
      const d = new Date(base);
      d.setDate(base.getDate() + offset);

      const yyyy = d.getFullYear();
      const mm = (d.getMonth() + 1).toString().padStart(2, '0');
      const dd = d.getDate().toString().padStart(2, '0');
      const formatted = `${yyyy}.${mm}.${dd}`;

      // Calculate relative baby days (110 on 2026.09.01)
      const diffDays = Math.floor((d.getTime() - new Date(2026, 8, 1).getTime()) / (1000 * 60 * 60 * 24));
      const calculatedBabyDays = 110 + diffDays;

      dates.push({
        dateStr: formatted,
        dayLabel: offset === 0 ? '선택일' : `${mm}.${dd}`,
        dDay: calculatedBabyDays,
      });
    }

    return dates;
  };

  const dateWindow = generate11DayWindow(selectedDate);

  // Find diary for currently selected date or closest diary
  const matchedDiary = diaries.find((d) => d.date === selectedDate) || diaries[0];

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarYear(calendarYear - 1);
      setCalendarMonth(11);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarYear(calendarYear + 1);
      setCalendarMonth(0);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  // Generate monthly calendar grid
  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
    const totalDays = new Date(year, month + 1, 0).getDate();
    return { firstDay, totalDays };
  };

  const { firstDay, totalDays } = getDaysInMonth(calendarYear, calendarMonth);

  return (
    <div className="space-y-4 pb-20">
      {/* 1. Compact Header Banner */}
      <div className="bg-gradient-to-r from-coral-500 via-rose-500 to-amber-500 rounded-2xl p-3.5 text-white shadow-soft flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-base border border-white/30 shrink-0">
            📸
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-extrabold text-sm text-white tracking-tight">
                콩심이 포토일기 (+{babyDays}일)
              </h2>
            </div>
            <p className="text-[10px] text-white/90">우리 아이의 오늘을 기록해 보세요.</p>
          </div>
        </div>

        <button
          onClick={onOpenDiaryModal}
          className="px-3 py-2 rounded-xl bg-white text-coral-600 font-extrabold text-xs shadow-md hover:bg-cream-50 active:scale-95 transition-all flex items-center gap-1 shrink-0"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          일기 쓰기
        </button>
      </div>

      {/* 2. Interactive Calendar Date Selector ([앞뒤 5일 스와이프] 텍스트 삭제) */}
      <div className="bg-white rounded-2xl p-3 border border-cream-200 shadow-soft space-y-2.5">
        <div className="flex items-center justify-between px-1">
          {/* Calendar Icon Button -> Click to open Monthly Calendar Modal */}
          <button
            onClick={() => setIsCalendarModalOpen(true)}
            className="flex items-center gap-2 group active:scale-95 transition-transform"
            title="달력 선택 팝업 열기"
          >
            <div className="w-7 h-7 rounded-lg bg-coral-100 text-coral-600 flex items-center justify-center font-bold shadow-2xs group-hover:bg-coral-500 group-hover:text-white transition-colors">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <span className="text-xs font-black text-gray-900 group-hover:text-coral-600 transition-colors">
              {selectedDate} (달력 선택)
            </span>
          </button>
        </div>

        {/* 11-Day Window Date Bar (±5 days around selected date) */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {dateWindow.map((item) => (
            <button
              key={item.dateStr}
              onClick={() => setSelectedDate(item.dateStr)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold shrink-0 border transition-all ${
                selectedDate === item.dateStr
                  ? 'bg-coral-500 text-white border-coral-500 shadow-sm scale-105'
                  : 'bg-cream-50 text-gray-700 border-cream-200 hover:bg-cream-100'
              }`}
            >
              <div>{item.dateStr.slice(5)}</div>
              <div className="text-[9px] opacity-80">D+{item.dDay}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Photo Diary Card Display for Selected Date */}
      <div className="space-y-2">
        {matchedDiary ? (
          <div
            onClick={() => setSelectedDiaryForRead(matchedDiary)}
            className="bg-white rounded-3xl p-4 border border-coral-300 ring-2 ring-coral-100 shadow-soft space-y-3 cursor-pointer group hover:border-coral-400 transition-all"
          >
            {/* Top Title */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{matchedDiary.moodEmoji}</span>
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900 group-hover:text-coral-600 transition-colors">
                    {matchedDiary.title || '콩심이의 성장 이야기'}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {matchedDiary.date} (D+{matchedDiary.babyDays}) 작성
                  </span>
                </div>
              </div>
              <span className="bg-coral-50 text-coral-600 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-coral-100">
                ⭐ 성장 매직 모먼트
              </span>
            </div>

            {/* Photo Thumbnail + Preview */}
            <div className="bg-cream-50 rounded-2xl p-3 border border-cream-200 flex items-center gap-3">
              <div className="relative rounded-xl overflow-hidden w-20 h-20 border border-cream-300 shadow-2xs bg-white shrink-0 flex items-center justify-center p-0.5">
                <img
                  src={matchedDiary.imageUrl}
                  alt="육아 일기 사진"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-coral-500 bg-coral-50 px-2 py-0.5 rounded-full border border-coral-100">
                  D+{matchedDiary.babyDays}일 사진
                </span>
                <h5 className="font-extrabold text-xs text-gray-900 mt-1 line-clamp-1">
                  "{matchedDiary.title || matchedDiary.content.substring(0, 15)}"
                </h5>
                <p className="text-[11px] text-coral-600 font-bold mt-1 flex items-center gap-0.5">
                  📖 긴 일기 전체보기 ➔
                </p>
              </div>
            </div>

            {/* Bottom Actions (하트 옆에 공유하기 아이콘 연동) */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLike(matchedDiary.id);
                }}
                className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                  matchedDiary.isLiked
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    matchedDiary.isLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-400'
                  }`}
                />
                {matchedDiary.likesCount}
              </button>

              {/* Share Button right next to Heart Like */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  alert('🔗 일기 링크가 복사되었습니다!');
                }}
                className="flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-full bg-cream-50 text-gray-600 border border-cream-200 hover:bg-cream-100 transition-all active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5 text-gray-500" />
                <span>공유하기</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-cream-100 text-coral-500 flex items-center justify-center mx-auto text-2xl">
              ✏️
            </div>
            <h4 className="font-extrabold text-sm text-gray-900">
              {selectedDate} 일기가 아직 작성되지 않았습니다.
            </h4>
            <p className="text-xs text-gray-500">
              이 날의 소중한 순간과 추억을 포토 일기로 기록해 보세요!
            </p>
            <button
              onClick={onOpenDiaryModal}
              className="px-4 py-2.5 rounded-xl bg-coral-500 text-white font-extrabold text-xs shadow-md hover:bg-coral-600"
            >
              + 이 날짜에 일기 쓰기
            </button>
          </div>
        )}
      </div>

      {/* 4. Bottom Milestone Guide */}
      <div className="bg-gradient-to-br from-indigo-50 via-cream-100 to-amber-50 rounded-3xl p-4 border border-indigo-200/80 shadow-soft space-y-3">
        <div className="flex items-center gap-2 border-b border-indigo-100 pb-2">
          <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            💡
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-gray-900">
              생후 110일 콩심이 발달 & 추천 놀이
            </h4>
          </div>
        </div>

        {/* Behavior Card */}
        <div
          onClick={() => setActiveGuideModal('behavior')}
          className="bg-white/90 p-3 rounded-xl border border-indigo-200 flex items-start gap-2 text-xs cursor-pointer hover:bg-indigo-50/60 transition-colors"
        >
          <span className="text-base shrink-0">🔄</span>
          <div className="flex-1 min-w-0">
            <strong className="text-gray-900 font-extrabold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Baby className="w-3.5 h-3.5 text-indigo-600" /> 110일 발달 행동: 뒤집기 시도
              </span>
              <span className="text-[10px] text-indigo-600 font-bold">자세히 ➔</span>
            </strong>
            <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">
              목과 어깨 힘이 세져 엎드렸을 때 고개를 90도로 높이 들고 뒤집기를 맹연습합니다.
            </p>
          </div>
        </div>

        {/* Play Card */}
        <div
          onClick={() => setActiveGuideModal('play')}
          className="bg-amber-50/90 p-3 rounded-xl border border-amber-200 flex items-start gap-2 text-xs cursor-pointer hover:bg-amber-100/60 transition-colors"
        >
          <span className="text-base shrink-0">🪞</span>
          <div className="flex-1 min-w-0">
            <strong className="text-amber-950 font-extrabold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Gamepad2 className="w-3.5 h-3.5 text-amber-600" /> 추천 놀이: 터미타임 거울 놀이
              </span>
              <span className="text-[10px] text-amber-700 font-bold">자세히 ➔</span>
            </strong>
            <p className="text-[11px] text-amber-900/90 mt-0.5 leading-snug">
              엎드려 있을 때 거울을 보여주면 자기 얼굴을 보며 목과 상체 근육이 쑥쑥 발달합니다.
            </p>
          </div>
        </div>
      </div>

      {/* FULL MONTHLY CALENDAR PICKER MODAL */}
      {isCalendarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all animate-slide-up space-y-4">
            <div className="flex items-center justify-between border-b border-cream-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-coral-100 text-coral-600 flex items-center justify-center font-bold">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-gray-900">월별 육아일기 날짜 선택</h3>
                  <p className="text-xs text-gray-500">원하시는 연/월로 변경하여 탐색하세요</p>
                </div>
              </div>
              <button
                onClick={() => setIsCalendarModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Monthly Controls */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-cream-100 px-4 py-2.5 rounded-2xl border border-cream-200">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-xl bg-white text-gray-700 hover:bg-cream-200 border border-cream-300 font-bold active:scale-95 transition-transform"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="font-extrabold text-sm text-gray-900">
                  📅 {calendarYear}년 {calendarMonth + 1}월
                </div>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-xl bg-white text-gray-700 hover:bg-cream-200 border border-cream-300 font-bold active:scale-95 transition-transform"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-400 py-1">
                <span className="text-red-500">일</span>
                <span>월</span>
                <span>화</span>
                <span>수</span>
                <span>목</span>
                <span>금</span>
                <span className="text-blue-500">토</span>
              </div>

              {/* Day Grid */}
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {Array.from({ length: firstDay }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="p-2.5"></div>
                ))}

                {Array.from({ length: totalDays }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const mm = (calendarMonth + 1).toString().padStart(2, '0');
                  const dd = dayNum.toString().padStart(2, '0');
                  const dateStr = `${calendarYear}.${mm}.${dd}`;

                  const isSelected = selectedDate === dateStr;
                  const hasDiary = diaries.some((di) => di.date === dateStr);

                  return (
                    <button
                      key={dateStr}
                      type="button"
                      onClick={() => {
                        setSelectedDate(dateStr);
                        setIsCalendarModalOpen(false);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-black transition-all relative ${
                        isSelected
                          ? 'bg-coral-500 text-white shadow-md scale-105 ring-2 ring-coral-300'
                          : hasDiary
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold'
                          : 'bg-gray-50 text-gray-700 hover:bg-cream-100'
                      }`}
                    >
                      <span>{dayNum}</span>
                      {hasDiary && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-coral-500 rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCalendarModalOpen(false)}
              className="w-full py-3 rounded-2xl bg-gray-900 text-white font-extrabold text-sm hover:bg-gray-800"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* FULL LONG TEXT READER MODAL */}
      {selectedDiaryForRead && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all animate-slide-up max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-cream-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedDiaryForRead.moodEmoji}</span>
                <div>
                  <h3 className="font-black text-base text-gray-900">
                    {selectedDiaryForRead.title || '콩심이 포토 일기'}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {selectedDiaryForRead.date} (D+{selectedDiaryForRead.babyDays}) 작성
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedDiaryForRead(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Photo inside Modal */}
            <div className="relative rounded-2xl overflow-hidden h-48 border border-cream-200 bg-cream-50 flex items-center justify-center p-1 shadow-inner">
              <img
                src={selectedDiaryForRead.imageUrl}
                alt="일기 사진"
                className="max-h-full max-w-full object-contain rounded-xl"
              />
            </div>

            {/* Title Section */}
            <div className="bg-coral-50 p-3 rounded-xl border border-coral-200">
              <span className="text-[10px] font-bold text-coral-600 uppercase">일기 제목</span>
              <h4 className="font-extrabold text-sm text-gray-900 mt-0.5">
                "{selectedDiaryForRead.title || '오늘 처음으로 뒤집기 성공!'}"
              </h4>
            </div>

            {/* Full Long Text Paragraph Section */}
            <div className="bg-cream-50/80 p-4 rounded-2xl border border-cream-200">
              <span className="text-[10px] font-bold text-gray-400 uppercase">일기 본문 내용</span>
              <p className="font-extrabold text-xs text-gray-900 leading-relaxed font-sans whitespace-pre-line mt-1">
                {selectedDiaryForRead.content}
              </p>
            </div>

            <button
              onClick={() => setSelectedDiaryForRead(null)}
              className="w-full py-3 rounded-2xl bg-coral-500 text-white font-extrabold text-sm hover:bg-coral-600"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* DETAILED GUIDANCE MODAL */}
      {activeGuideModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all animate-slide-up space-y-4">
            <div className="flex items-center justify-between border-b border-cream-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeGuideModal === 'behavior' ? '🔄' : '🪞'}</span>
                <div>
                  <h3 className="font-black text-base text-gray-900">
                    {activeGuideModal === 'behavior' ? '110일 발달 행동 상세 케어' : '터미타임 거울 놀이 상세 가이드'}
                  </h3>
                  <span className="text-xs text-gray-400">소아과 전문의 추천 발달 팁</span>
                </div>
              </div>
              <button
                onClick={() => setActiveGuideModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {activeGuideModal === 'behavior' ? (
              <div className="space-y-3 text-xs text-gray-700 leading-relaxed bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200">
                <h4 className="font-extrabold text-sm text-indigo-950">🔄 뒤집기 시도 핵심 포인트</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-gray-800">
                  <li><strong>상체 근육 강화</strong>: 110일 무렵 아기는 등과 목 근육이 발달하여 시야를 넓히기 위해 고개를 들고 뒤집기를 맹연습합니다.</li>
                  <li><strong>낙상 안전 주의</strong>: 침대나 소파 위에서는 순식간에 뒤집어 떨어질 수 있으므로 반드시 바닥 매트 위에서 놀아주세요.</li>
                  <li><strong>질식 방지 매트</strong>: 폭신한 이불보다는 탄탄한 놀이 매트가 호흡에 안전합니다.</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-gray-700 leading-relaxed bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                <h4 className="font-extrabold text-sm text-amber-950">🪞 터미타임 거울 놀이 가이드</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-amber-950">
                  <li><strong>안전 아기 거울 세팅</strong>: 깨지지 않는 아크릴 안전 거울을 아기 시선에서 20~30cm 앞에 대각선으로 세워주세요.</li>
                  <li><strong>신체 자아 인지</strong>: 거울 속에 비친 자신의 얼굴과 움직임을 관찰하며 자기 인지력이 향상됩니다.</li>
                  <li><strong>권장 시간</strong>: 하루 2~3회, 식후 30분 뒤 3분~5분씩 즐겁게 진행해 주세요.</li>
                </ul>
              </div>
            )}

            <button
              onClick={() => setActiveGuideModal(null)}
              className="w-full py-3 rounded-2xl bg-gray-900 text-white font-extrabold text-sm hover:bg-gray-800"
            >
              확인 완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
