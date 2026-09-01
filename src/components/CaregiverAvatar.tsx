import React from 'react';
import type { CaregiverType } from '../types';

interface CaregiverAvatarProps {
  type: CaregiverType;
  size?: 'sm' | 'md' | 'lg';
}

const CAREGIVER_IMAGES: Record<CaregiverType, { src: string; borderColor: string; shadowColor: string }> = {
  '엄마': {
    src: '/mom.jpg',
    borderColor: 'border-rose-300',
    shadowColor: 'shadow-rose-100',
  },
  '아빠': {
    src: '/dad.jpg',
    borderColor: 'border-indigo-300',
    shadowColor: 'shadow-indigo-100',
  },
  '할머니': {
    src: '/grandma.jpg',
    borderColor: 'border-amber-300',
    shadowColor: 'shadow-amber-100',
  },
  '육아도우미': {
    src: '/assistant.jpg',
    borderColor: 'border-emerald-300',
    shadowColor: 'shadow-emerald-100',
  },
};

export const CaregiverAvatar: React.FC<CaregiverAvatarProps> = ({ type, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-8 h-8 rounded-xl',  // Compact 32px
    lg: 'w-10 h-10 rounded-xl',
  }[size];

  const config = CAREGIVER_IMAGES[type] || CAREGIVER_IMAGES['엄마'];

  return (
    <div className={`${sizeClasses} overflow-hidden border border-cream-300 shadow-2xs bg-white shrink-0 relative transition-all duration-300`}>
      <img
        src={config.src}
        alt={type}
        className="w-full h-full object-cover transform hover:scale-105 transition-transform"
      />
    </div>
  );
};
