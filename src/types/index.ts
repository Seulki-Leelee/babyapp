export type LogType = 'feeding' | 'formula' | 'breastfeeding' | 'diaper' | 'sleep' | 'bath' | 'medication' | 'temperature';

export type DiaperType = 'pee' | 'poop' | 'both';

export type CaregiverType = '엄마' | '아빠' | '할머니' | '육아도우미';

export interface TimelineLog {
  id: string;
  type: LogType;
  time: string;
  title: string;
  detail: string;
  value?: string | number;
  iconBg?: string;
  badge?: string;
  diaperType?: DiaperType;
}

export interface DiaperInventory {
  brandName: string;
  currentCount: number;
  maxCount: number;
  couponClaimed: boolean;
}

export interface FormulaInventory {
  brandName: string;
  currentCount: number;
  maxCount: number;
  couponClaimed: boolean;
}

export interface CoParentingStatus {
  activeParent: CaregiverType;
  elapsedText: string;
  lastFeedingTime: string;
}

export interface TemperatureState {
  currentTemp: number;
  isHighFever: boolean; // >= 38.0
  antipyreticTimer: number; // in seconds
  antipyreticGivenAt?: string;
}

export interface NotificationItem {
  id: string;
  type: 'fever' | 'inventory' | 'vaccine' | 'baton';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export interface PhotoDiaryItem {
  id: string;
  babyDays: number;
  date: string;
  imageUrl: string;
  moodEmoji: string;
  title: string;
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
