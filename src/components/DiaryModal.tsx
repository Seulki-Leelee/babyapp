import React, { useState } from 'react';
import { Camera, X, Check, Calendar as CalendarIcon, Upload, Image as ImageIcon } from 'lucide-react';
import type { PhotoDiaryItem } from '../types';
import { QMongAvatar } from './QMongAvatar';

interface DiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDiary: (newItem: PhotoDiaryItem) => void;
  babyDays: number;
}

export const DiaryModal: React.FC<DiaryModalProps> = ({
  isOpen,
  onClose,
  onAddDiary,
  babyDays,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedDateVal, setSelectedDateVal] = useState('2026-09-11');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moodEmoji, setMoodEmoji] = useState('👶');

  if (!isOpen) return null;

  // Handle Photo File Upload via File Reader
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    // Use uploaded photo dataUrl, or default fallback if none chosen
    const finalPhoto = selectedPhoto || 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80';

    // Format selectedDateVal (YYYY-MM-DD -> YYYY.MM.DD)
    const dateFormatted = selectedDateVal.replace(/-/g, '.');

    // Calculate baby days relative to today (D+110)
    const parts = selectedDateVal.split('-').map(Number);
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    const baseD = new Date(2026, 8, 11);
    const diffDays = Math.floor((d.getTime() - baseD.getTime()) / (1000 * 60 * 60 * 24));
    const calculatedDays = babyDays + diffDays;

    const newItem: PhotoDiaryItem = {
      id: Date.now().toString(),
      babyDays: Math.max(1, calculatedDays),
      date: dateFormatted,
      imageUrl: finalPhoto,
      moodEmoji,
      title: title.trim() || '오늘 아기와 찍은 소중한 기억 📸',
      content: content.trim(),
      likesCount: 1,
      isLiked: false,
    };

    onAddDiary(newItem);
    setTitle('');
    setContent('');
    setSelectedPhoto(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 pb-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <QMongAvatar size="md" mood="camera" />
            <div>
              <h3 className="font-extrabold text-base text-gray-900">오늘의 포토 육아일기</h3>
              <p className="text-xs text-gray-500">내 기기의 사진을 직접 업로드하여 일기 작성</p>
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
          {/* 1. Direct Image File Upload Box (Item 5 Requirement) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-coral-500" />
                아기 사진 파일 업로드
              </span>
              <span className="text-[10px] text-coral-600 font-bold">내 앨범에서 직접 선택</span>
            </label>

            <input
              id="diary-photo-upload-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {selectedPhoto ? (
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border-2 border-coral-400 shadow-md group">
                <img
                  src={selectedPhoto}
                  alt="업로드한 아기 사진 미리보기"
                  className="w-full h-full object-cover"
                />
                <label
                  htmlFor="diary-photo-upload-input"
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity"
                >
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-xs font-extrabold">다른 사진으로 변경하기</span>
                </label>
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  업로드 완료 ✅
                </span>
              </div>
            ) : (
              <label
                htmlFor="diary-photo-upload-input"
                className="w-full h-36 rounded-2xl border-2 border-dashed border-coral-300 bg-cream-50/80 hover:bg-coral-50 flex flex-col items-center justify-center p-4 cursor-pointer transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-coral-100 text-coral-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="text-xs font-extrabold text-gray-800">
                  📷 내 기기에서 아기 사진 파일 업로드하기
                </span>
                <span className="text-[10px] text-gray-400 mt-1">
                  터치하여 스마트폰 또는 PC 사진 앨범 열기
                </span>
              </label>
            )}
          </div>

          {/* 2. Date Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
              <CalendarIcon className="w-3.5 h-3.5 text-coral-500" />
              일기 날짜 선택 (과거 날짜 작성 가능)
            </label>
            <input
              type="date"
              value={selectedDateVal}
              max="2026-12-31"
              onChange={(e) => setSelectedDateVal(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 text-xs font-extrabold text-gray-900 focus:ring-2 focus:ring-coral-400 focus:outline-none bg-cream-50"
              required
            />
          </div>

          {/* 3. Mood Emoji Picker */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
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

          {/* 4. Title Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
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

          {/* 5. Content Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
              <span>일기 본문 내용</span>
              <span className="text-[10px] text-gray-400">{content.length} / 500자</span>
            </label>
            <textarea
              rows={3}
              maxLength={500}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="아기의 예쁜 모습, 놀이, 감동적인 순간을 적어보세요..."
              className="w-full p-3 rounded-xl border border-gray-300 text-xs leading-relaxed text-gray-900 focus:ring-2 focus:ring-coral-400 focus:outline-none bg-cream-50/40"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-coral-500 text-white font-extrabold text-xs shadow-md hover:bg-coral-600 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            포토 일기 등록하기
          </button>
        </form>
      </div>
    </div>
  );
};
