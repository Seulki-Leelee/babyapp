import React, { useState } from 'react';
import { Camera, Sparkles, X, Check, Calendar as CalendarIcon } from 'lucide-react';
import type { PhotoDiaryItem } from '../types';

interface DiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDiary: (newItem: PhotoDiaryItem) => void;
  babyDays: number;
}

const PRESET_PHOTOS = [
  {
    url: '/kongsim.jpg',
    label: '콩심이 뒤집기',
  },
  {
    url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80',
    label: '방긋 미소',
  },
  {
    url: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80',
    label: '쿨쿨 수면',
  },
  {
    url: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80',
    label: '목욕 시간',
  },
];

export const DiaryModal: React.FC<DiaryModalProps> = ({
  isOpen,
  onClose,
  onAddDiary,
  babyDays,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState(PRESET_PHOTOS[0].url);
  const [selectedDateVal, setSelectedDateVal] = useState('2026-09-01');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moodEmoji, setMoodEmoji] = useState('👶');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    // Format selectedDateVal (YYYY-MM-DD -> YYYY.MM.DD)
    const dateFormatted = selectedDateVal.replace(/-/g, '.');

    // Calculate baby days relative to 2026.09.01 (D+110)
    const parts = selectedDateVal.split('-').map(Number);
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    const baseD = new Date(2026, 8, 1);
    const diffDays = Math.floor((d.getTime() - baseD.getTime()) / (1000 * 60 * 60 * 24));
    const calculatedDays = 110 + diffDays;

    const newItem: PhotoDiaryItem = {
      id: Date.now().toString(),
      babyDays: calculatedDays,
      date: dateFormatted,
      imageUrl: selectedPhoto,
      moodEmoji,
      title: title.trim() || '오늘 처음으로 혼자 뒤집기 성공!',
      content: content.trim(),
      likesCount: 1,
      isLiked: false,
    };

    onAddDiary(newItem);
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 pb-3.5 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-coral-100 flex items-center justify-center text-coral-600 font-bold">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-gray-900">오늘의 포토 육아일기</h3>
              <p className="text-xs text-gray-500">오늘 및 과거 날짜 선택하여 일기 작성</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Date Selector (기본 오늘, 과거 날짜 선택 가능) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5 text-coral-500" />
              일기 날짜 선택 (과거 일기 작성 가능)
            </label>
            <input
              type="date"
              value={selectedDateVal}
              max="2026-12-31"
              onChange={(e) => setSelectedDateVal(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-extrabold text-gray-900 focus:ring-2 focus:ring-coral-400 focus:outline-none bg-cream-50"
              required
            />
          </div>

          {/* Photo Preview & Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              사진 선택
            </label>
            <div className="relative rounded-xl overflow-hidden w-20 h-20 mx-auto border border-cream-300 shadow-inner bg-white flex items-center justify-center p-0.5 my-2">
              <img
                src={selectedPhoto}
                alt="아기 사진 미리보기"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Photo Pickers */}
            <div className="grid grid-cols-4 gap-2 mt-2">
              {PRESET_PHOTOS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPhoto(p.url)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                    selectedPhoto === p.url
                      ? 'border-coral-500 ring-2 ring-coral-200 scale-105'
                      : 'border-cream-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={p.url}
                    alt={p.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Mood Emoji Picker */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              오늘의 감정 기분
            </label>
            <div className="flex justify-around bg-cream-50 p-2 rounded-2xl border border-cream-200">
              {['👶', '🥰', '😴', '🥳', '👼', '💖'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setMoodEmoji(emoji)}
                  className={`w-9 h-9 rounded-xl text-xl flex items-center justify-center transition-all ${
                    moodEmoji === emoji
                      ? 'bg-white shadow-sm border border-coral-200 scale-110'
                      : 'hover:bg-cream-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Separate Title Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              일기 제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 오늘 처음으로 혼자 뒤집기 성공!"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-coral-400 focus:outline-none"
              required
            />
          </div>

          {/* Separate Content Textarea Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center justify-between">
              <span>일기 본문 내용</span>
              <span className="text-[10px] text-gray-400">{content.length} / 500자</span>
            </label>
            <textarea
              rows={4}
              maxLength={500}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘 콩심이의 놀이, 행동, 감동적인 육아 기억을 넉넉하게 적어주세요..."
              className="w-full p-3 rounded-xl border border-gray-300 text-xs leading-relaxed text-gray-900 focus:ring-2 focus:ring-coral-400 focus:outline-none bg-cream-50/40"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-coral-500 text-white font-extrabold text-sm shadow-md hover:bg-coral-600 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            포토 일기 등록하기
          </button>
        </form>
      </div>
    </div>
  );
};
