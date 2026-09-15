import React from 'react';
import { IMAGES } from '../assets/images';

interface YuhanKimberlyLogoProps {
  className?: string;
}

export const YuhanKimberlyLogo: React.FC<YuhanKimberlyLogoProps> = ({ className = 'h-5' }) => {
  return (
    <div className="flex items-center select-none">
      <img
        src={IMAGES.ykLogo}
        alt="유한킴벌리"
        className={`object-contain max-h-5 w-auto filter drop-shadow-2xs ${className}`}
      />
    </div>
  );
};
