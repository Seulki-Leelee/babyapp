export type LogType = 'feeding' | 'diaper' | 'sleep' | 'temperature';

export interface TimelineLog {
  id: string;
  type: LogType;
  time: string;
  title: string;
  detail: string;
  value?: string | number;
  iconBg?: string;
  badge?: string;
}

export interface DiaperInventory {
  brandName: string;
  currentCount: number;
  maxCount: number;
  couponClaimed: boolean;
}

export interface FormulaInventory {
  brandName: string;
  currentCount: number; // e.g. 2 cans left
  maxCount: number; // 8 cans box
  couponClaimed: boolean;
}

export interface CoParentingStatus {
  activeParent: '엄마' | '아빠';
  partnerName: '아빠' | '엄마';
  elapsedText: string;
  lastFeedingTime: string;
}

export interface TemperatureState {
  currentTemp: number;
  isHighFever: boolean; // >= 38.0
  antipyreticTimer: number; // in seconds (e.g. 4 hours left)
  antipyreticGivenAt?: string;
}

export interface PhotoDiaryItem {
  id: string;
  babyDays: number;
  date: string;
  imageUrl: string;
  moodEmoji: string;
  content: string;
  likesCount: number;
  isLiked?: boolean;
  crmProduct?: {
    title: string;
    productName: string;
    discountText: string;
    price: string;
    tag: string;
  };
}

export interface AiDiagnosisResult {
  scanType: 'stool' | 'skin';
  statusTitle: string;
  statusBadge: string;
  healthScore: number;
  description: string;
  recommendedProduct: {
    name: string;
    subtitle: string;
    discount: string;
    originalPrice: string;
    salePrice: string;
    imageUrl: string;
  };
}
