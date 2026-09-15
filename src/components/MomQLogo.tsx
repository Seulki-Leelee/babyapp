import React from 'react';
import { IMAGES } from '../assets/images';

interface MomQLogoProps {
  className?: string;
}

export const MomQLogo: React.FC<MomQLogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={IMAGES.momqLogo}
        alt="맘큐 momQ"
        className="h-6 w-auto object-contain rounded-lg drop-shadow-2xs"
      />
    </div>
  );
};
