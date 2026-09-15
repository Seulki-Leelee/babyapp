import React, { useState } from 'react';
import {
  X,
  Check,
  Camera,
  Plus,
  Users,
  UserCheck,
  Edit2,
  Heart,
  Baby,
  Calendar,
  Weight
} from 'lucide-react';
import type { BabyProfile } from '../types';
import { QMongAvatar } from './QMongAvatar';

interface BabyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  babies: BabyProfile[];
  activeBabyId: string;
  onSelectActiveBaby: (id: string) => void;
  onUpdateBabyProfile: (updatedBaby: BabyProfile) => void;
  onAddBaby: (newBaby: BabyProfile) => void;
}

export const BabyProfileModal: React.FC<BabyProfileModalProps> = ({
  isOpen,
  onClose,
  babies,
  activeBabyId,
  onSelectActiveBaby,
  onUpdateBabyProfile,
  onAddBaby,
}) => {
  const activeBaby = babies.find((b) => b.id === activeBabyId) || babies[0];

  const [modalTab, setModalTab] = useState<'edit' | 'switch'>('switch');
  const [showAddForm, setShowAddForm] = useState(false);

  // Edit form states
  const [name, setName] = useState(activeBaby?.name || '');
  const [birthDate, setBirthDate] = useState(activeBaby?.birthDate || '2026-05-25');
  const [gender, setGender] = useState<'boy' | 'girl'>(activeBaby?.gender || 'girl');
  const [weight, setWeight] = useState(activeBaby?.weight || '6.5kg');
  const [photoUrl, setPhotoUrl] = useState(activeBaby?.photoUrl || '');
  const [diaperBrand, setDiaperBrand] = useState(activeBaby?.diaperBrand || '하기스 네이처메이드 3단계');
  const [formulaBrand, setFormulaBrand] = useState(activeBaby?.formulaBrand || '앱솔루트 명작 1단계');
  const [notes, setNotes] = useState(activeBaby?.notes || '뒤집기 성공! 밤잠 8시간 통잠 타임라인 진행 중');

  // Add Twin Form states
  const [newName, setNewName] = useState('');
  const [newGender, setNewGender] = useState<'boy' | 'girl'>('girl');
  const [newIsTwin, setNewIsTwin] = useState(true);

  // Reset tab to 'switch' when modal opens, and keep edit state synced
  React.useEffect(() => {
    if (isOpen) {
      setModalTab('switch');
      setShowAddForm(false);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (activeBaby) {
      setName(activeBaby.name);
      setBirthDate(activeBaby.birthDate);
      setGender(activeBaby.gender);
      setWeight(activeBaby.weight);
      setPhotoUrl(activeBaby.photoUrl);
      setDiaperBrand(activeBaby.diaperBrand);
      setFormulaBrand(activeBaby.formulaBrand);
      setNotes(activeBaby.notes || '');
    }
  }, [activeBabyId, activeBaby]);

  if (!isOpen || !activeBaby) return null;

  // Handle Photo File Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate D-day
  const calculateBabyDays = (bDateStr: string) => {
    try {
      const parts = bDateStr.split('-').map(Number);
      if (parts.length === 3) {
        const birth = new Date(parts[0], parts[1] - 1, parts[2]);
        const today = new Date(2026, 8, 11); // Current app date 2026.09.11
        const diffTime = today.getTime() - birth.getTime();
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(1, days);
      }
    } catch (e) {}
    return activeBaby.babyDays;
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BabyProfile = {
      ...activeBaby,
      name,
      birthDate,
      babyDays: calculateBabyDays(birthDate),
      gender,
      weight,
      photoUrl,
      diaperBrand,
      formulaBrand,
      notes,
    };
    onUpdateBabyProfile(updated);
    onClose();
  };

  const handleAddNewTwin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const created: BabyProfile = {
      id: Date.now().toString(),
      name: newName.trim(),
      birthDate: activeBaby.birthDate, // Twin shares birthdate by default
      babyDays: activeBaby.babyDays,
      gender: newGender,
      weight: '6.2kg',
      photoUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80',
      diaperBrand: activeBaby.diaperBrand,
      formulaBrand: activeBaby.formulaBrand,
      isTwin: newIsTwin,
      notes: '쌍둥이 아기 프로필 추가 등록됨 💕',
    };

    onAddBaby(created);
    onSelectActiveBaby(created.id);
    setShowAddForm(false);
    setNewName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl transition-all animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cream-200 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <QMongAvatar size="md" mood="happy" />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base text-gray-900">아기 프로필 & 쌍둥이 관리</h3>
                <span className="bg-coral-100 text-coral-600 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                  맘큐 케어
                </span>
              </div>
              <p className="text-[11px] text-gray-500">큐몽이가 아기 정보를 소중하게 관리해 드려요!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex bg-cream-100 p-1 rounded-xl mb-4 border border-cream-200">
          <button
            onClick={() => setModalTab('switch')}
            className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              modalTab === 'switch'
                ? 'bg-white text-coral-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            아이 선택 (쌍둥이 {babies.length}명)
          </button>

          <button
            onClick={() => {
              setModalTab('edit');
              setShowAddForm(false);
            }}
            className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              modalTab === 'edit'
                ? 'bg-white text-coral-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Edit2 className="w-3.5 h-3.5" />
            프로필 확인 & 수정
          </button>
        </div>

        {/* TAB 1: Profile Edit */}
        {modalTab === 'edit' && (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            {/* Photo Avatar Change */}
            <div className="flex flex-col items-center justify-center my-2">
              <div className="relative w-20 h-20 rounded-full border-4 border-coral-200 shadow-md overflow-hidden bg-white group">
                <img
                  src={photoUrl}
                  alt={name}
                  className="w-full h-full object-cover"
                />
                <label
                  htmlFor="baby-photo-input"
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-opacity"
                >
                  <Camera className="w-5 h-5 mb-0.5" />
                  <span className="text-[9px] font-bold">사진 변경</span>
                </label>
              </div>
              <input
                id="baby-photo-input"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <label
                htmlFor="baby-photo-input"
                className="mt-2 text-[11px] font-extrabold text-coral-600 bg-coral-50 px-3 py-1 rounded-full border border-coral-200 hover:bg-coral-100 cursor-pointer flex items-center gap-1"
              >
                <Camera className="w-3.5 h-3.5" />
                기기에서 아기 사진 사진 업로드
              </label>
            </div>

            {/* Baby Name & D-day */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  아기 닉네임 / 이름
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-extrabold text-gray-900 focus:ring-2 focus:ring-coral-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  성별 선택
                </label>
                <div className="flex bg-cream-50 p-0.5 rounded-xl border border-gray-300">
                  <button
                    type="button"
                    onClick={() => setGender('girl')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      gender === 'girl'
                        ? 'bg-pink-500 text-white shadow-2xs'
                        : 'text-gray-500 hover:bg-cream-100'
                    }`}
                  >
                    👧 공주님
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('boy')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      gender === 'boy'
                        ? 'bg-blue-500 text-white shadow-2xs'
                        : 'text-gray-500 hover:bg-cream-100'
                    }`}
                  >
                    👦 왕자님
                  </button>
                </div>
              </div>
            </div>

            {/* Birth Date & Weight */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-coral-500" />
                  생년월일 (D+{calculateBabyDays(birthDate)}일)
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-coral-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                  <Weight className="w-3.5 h-3.5 text-coral-500" />
                  현재 몸무게
                </label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="예: 6.5kg"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-coral-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Diaper & Formula Brand */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                사용 중인 기저귀 및 분유 브랜드
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={diaperBrand}
                  onChange={(e) => setDiaperBrand(e.target.value)}
                  placeholder="기저귀 브랜드 (예: 하기스 네이처메이드 3단계)"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-coral-400 focus:outline-none"
                />
                <input
                  type="text"
                  value={formulaBrand}
                  onChange={(e) => setFormulaBrand(e.target.value)}
                  placeholder="분유 브랜드 (예: 앱솔루트 명작 1단계)"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-coral-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                아기 특이사항 & 메모
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="예: 접종 후 체온 관찰 필요, 분유 160ml 수유 중"
                className="w-full p-2.5 rounded-xl border border-gray-300 text-xs font-medium text-gray-900 focus:ring-2 focus:ring-coral-400 focus:outline-none bg-cream-50/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-coral-500 text-white font-extrabold text-xs shadow-md hover:bg-coral-600 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              아기 프로필 저장하기
            </button>
          </form>
        )}

        {/* TAB 2: Baby Switcher & Twin Management */}
        {modalTab === 'switch' && (
          <div className="space-y-4">
            {/* Q-Mong Guidance Banner */}
            <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 flex items-center gap-3">
              <QMongAvatar size="md" mood="cheer" />
              <div>
                <h4 className="font-extrabold text-xs text-amber-900">
                  쌍둥이 & 다둥이 아기 선택하기
                </h4>
                <p className="text-[10px] text-amber-700 mt-0.5">
                  선택한 아이에 따라 육아 기록 타임라인과 포토일기가 함께 전환됩니다.
                </p>
              </div>
            </div>

            {/* Babies List */}
            <div className="space-y-2.5">
              {babies.map((baby) => {
                const isSelected = baby.id === activeBabyId;
                return (
                  <div
                    key={baby.id}
                    onClick={() => onSelectActiveBaby(baby.id)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-coral-500 bg-coral-50/50 shadow-sm'
                        : 'border-cream-200 bg-white hover:border-coral-200 hover:bg-cream-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-cream-300 shadow-2xs shrink-0 bg-white">
                        <img
                          src={baby.photoUrl}
                          alt={baby.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-gray-900">{baby.name}</h4>
                          <span className="bg-coral-100 text-coral-600 font-extrabold text-[10px] px-2 py-0.2 rounded-full">
                            D+{baby.babyDays}일
                          </span>
                          {baby.isTwin && (
                            <span className="bg-amber-100 text-amber-700 font-extrabold text-[10px] px-1.5 py-0.2 rounded-md">
                              쌍둥이 💕
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          {baby.gender === 'girl' ? '공주님 👧' : '왕자님 👦'} • {baby.weight} • {baby.diaperBrand}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isSelected ? (
                        <span className="w-7 h-7 rounded-full bg-coral-500 text-white flex items-center justify-center shadow-xs">
                          <UserCheck className="w-4 h-4 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="w-7 h-7 rounded-full bg-cream-100 border border-cream-300 text-gray-400 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Twin / Sibling Button */}
            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-coral-300 text-coral-600 font-extrabold text-xs hover:bg-coral-50 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />+ 새 아기 (쌍둥이/다둥이) 추가 등록하기
              </button>
            ) : (
              <form onSubmit={handleAddNewTwin} className="bg-cream-50 p-4 rounded-2xl border border-cream-300 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs text-gray-900 flex items-center gap-1.5">
                    <Baby className="w-4 h-4 text-coral-500" />
                    새 쌍둥이 아기 추가
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    취소
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    아기 이름 (닉네임)
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="예: 콩순이 (둘째 쌍둥이)"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-extrabold text-gray-900 focus:ring-2 focus:ring-coral-400 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">성별</label>
                    <select
                      value={newGender}
                      onChange={(e) => setNewGender(e.target.value as 'boy' | 'girl')}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold"
                    >
                      <option value="girl">👧 공주님</option>
                      <option value="boy">👦 왕자님</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-gray-300 w-full cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newIsTwin}
                        onChange={(e) => setNewIsTwin(e.target.checked)}
                        className="accent-coral-500 rounded"
                      />
                      <span className="text-xs font-bold text-gray-700">쌍둥이 뱃지</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-coral-500 text-white font-extrabold text-xs shadow-md hover:bg-coral-600 active:scale-95 transition-all"
                >
                  새 쌍둥이 아기 추가하기
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
