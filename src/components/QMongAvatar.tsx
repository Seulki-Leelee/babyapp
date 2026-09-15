import React from 'react';
import { IMAGES } from '../assets/images';

interface QMongAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'cheer' | 'doctor' | 'camera';
  variant?: 'qmong1' | 'qmong2' | 'qmong3' | 'qmong4';
  className?: string;
}

export const QMongAvatar: React.FC<QMongAvatarProps> = ({
  size = 'md',
  mood = 'happy',
  variant,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  }[size];

  const moodBadges = {
    happy: '💛',
    cheer: '👏',
    doctor: '🩺',
    camera: '📸',
  }[mood];

  // Pick Q-Mong Image variant
  let imageSrc = IMAGES.qmong1;
  if (variant === 'qmong1' || mood === 'happy') imageSrc = IMAGES.qmong1;
  if (variant === 'qmong2' || mood === 'cheer') imageSrc = IMAGES.qmong2;
  if (variant === 'qmong3' || mood === 'doctor') imageSrc = IMAGES.qmong3;
  if (variant === 'qmong4' || mood === 'camera') imageSrc = IMAGES.qmong4;

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}>
      {/* Soft Glow Background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-200 via-coral-200 to-amber-100 opacity-70 blur-[1px]" />

      {/* Main Avatar Circular Frame with transparent background blend */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-b from-amber-50 to-orange-100 border-2 border-amber-300 shadow-sm flex items-center justify-center overflow-hidden p-0.5 group">
        <img
          src={imageSrc}
          alt="맘큐 캐릭터 큐몽이"
          className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-200"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Mini Mood Badge Indicator */}
      <span className="absolute -bottom-0.5 -right-0.5 text-[10px] bg-white rounded-full p-0.2 shadow-2xs leading-none border border-amber-200">
        {moodBadges}
      </span>
    </div>
  );
};
