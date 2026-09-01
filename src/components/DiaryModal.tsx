import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles, Check, X } from 'lucide-react';
import type { PhotoDiaryItem } from '../types';

interface DiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDiary: (item: PhotoDiaryItem) => void;
  babyDays?: number;
}

const SAMPLE_BABY_PHOTOS = [
  'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
];

export const DiaryModal: React.FC<DiaryModalProps> = ({
  isOpen,
  onClose,
  onAddDiary,
  babyDays = 120,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>(SAMPLE_BABY_PHOTOS[0]);
  const [moodEmoji, setMoodEmoji] = useState<string>('👶');
  const [content, setContent] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newItem: PhotoDiaryItem = {
      id: Date.now().toString(),
      babyDays: babyDays,
      date: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      imageUrl: selectedPhoto,
      moodEmoji: moodEmoji,
      content: content.trim(),
      likesCount: 1,
      isLiked: true,
      crmProduct: {
        title: '📸 첫 뒤집기 성장 기념 굿즈',
        productName: '아기 성장 아크릴 포토액자 1+1 커스텀',
        discountText: 'D2C 다이어리 작성 20% 특별 쿠폰',
        price: '15,200원',
        tag: '추억 소장 큐레이션',
      },
    };

    onAddDiary(newItem);
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transition-all animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-coral-100 flex items-center justify-center text-coral-600">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">오늘의 포토 육아일기</h3>
              <p className="text-xs text-gray-500">우리 아기 +{babyDays}일째 순간 기록</p>
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
          {/* Photo Preview & Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              사진 선택 및 프리뷰
            </label>
            <div className="relative rounded-2xl overflow-hidden h-48 border border-gray-200 shadow-inner bg-gray-100">
              <img
                src={selectedPhoto}
                alt="아기 사진 프리뷰"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white font-medium flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                미리보기
              </div>
            </div>

            {/* Thumbnail Pickers */}
            <div className="flex gap-2 mt-2">
              {SAMPLE_BABY_PHOTOS.map((photo, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPhoto(photo)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedPhoto === photo
                      ? 'border-coral-500 scale-105 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo} alt="Sample" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Mood Emoji Picker */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              오늘의 기분 이모지
            </label>
            <div className="flex justify-between bg-cream-50 p-2 rounded-2xl border border-cream-200">
              {['👶', '😄', '😴', '🥺', '🥳', '🍼'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setMoodEmoji(emoji)}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                    moodEmoji === emoji
                      ? 'bg-white shadow-md scale-110 border border-coral-200'
                      : 'hover:bg-white/60'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Text Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              오늘의 한 줄 일기
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="예: 오늘 처음으로 뒤집기 성공했어요! 👶"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-coral-400"
              maxLength={60}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-coral-500 text-white font-bold text-base shadow-float hover:bg-coral-600 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            폴라로이드 일기 등록하기
          </button>
        </form>
      </div>
    </div>
  );
};
