export type CarType = 'EV' | 'Petrol' | 'Hybrid';

export interface Car {
  id: string;
  name: string;
  year: number;
  priceRange: string;
  dealerName: string;
  type: CarType;
  image: string;
  isVerified: boolean;
}

export interface ReferralLevel {
  name: string;
  icon: string;
  referrals: string;
  commission: string;
  color: string;
  benefits: string[];
}

export type Page = 'home' | 'browse' | 'import' | 'dealer' | 'referral' | 'contact' | 'admin';
