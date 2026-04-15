export interface StatItem {
  label: string;
  value: string;
}

export interface RitualCard {
  frequency: string;
  title: string;
  description: string;
}

export interface TweetCard {
  author: string;
  handle: string;
  avatar: string;
  content: string;
  footer: string;
}

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

export interface CityChapter {
  name: string;
  status: string;
  tone: 'active' | 'coming' | 'soon';
}

export interface PricingPlan {
  name: string;
  tier: string;
  price: string;
  cadence: string;
  description: string;
  highlights: string[];
  badge?: string;
  flavor?: 'primary' | 'success' | 'gold' | 'muted';
  buttonText: string;
}

export interface CommunityChannel {
  title: string;
  selected: boolean;
  tierLabel?: string;
  locked?: boolean;
}

export interface CommunityPost {
  author: string;
  avatar: string;
  role: string;
  membership: 'Community' | 'Prime' | 'Privilege';
  city: string;
  content: string;
  likes: number;
  locked?: boolean;
}

export interface GigOpportunity {
  icon: string;
  title: string;
  meta: string;
  tags: string[];
  tierTag: string;
  actionLabel: string;
  disabled?: boolean;
}

export interface RitualEvent {
  day: string;
  month: string;
  title: string;
  meta: string;
  tags: string[];
  statusTag?: string;
  cta: string;
  highlighted?: boolean;
}

export interface MemberProfile {
  name: string;
  role: string;
  membership: 'Community' | 'Prime' | 'Privilege';
  tags: string[];
  image: string;
  coverGradient: string;
}

export interface BadgeItem {
  icon: string;
  label: string;
  earned: boolean;
}

export interface ActivityItem {
  icon: string;
  description: string;
  points: string;
  tone: 'brand' | 'purple' | 'green' | 'gold';
}

export interface GrowthStage {
  from: string;
  to: string;
  progress: number;
  complete: boolean;
}

export interface ContributionLog {
  icon: string;
  label: string;
  date: string;
}
