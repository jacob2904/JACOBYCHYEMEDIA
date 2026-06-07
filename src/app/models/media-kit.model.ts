/**
 * Typed model for the media kit.
 * All figures here are REAL Instagram Professional insights (trailing 30 days).
 * Keep this the single source of truth — future DB-backed features should
 * hydrate these same interfaces.
 */

export interface AnimatedNumber {
  /** Raw numeric value used for the count-up animation. */
  value: number;
  /** Optional suffix appended after the number, e.g. "K", "%", "×". */
  suffix?: string;
  /** Decimal places to display (default 0). */
  decimals?: number;
}

export interface HeroStat extends AnimatedNumber {
  label: string;
}

export interface GlanceStat extends AnimatedNumber {
  name: string;
  note: string;
}

export interface DonutSegment {
  label: string;
  /** Percentage of the donut, 0–100. */
  pct: number;
  /** Cumulative offset percentage where this segment starts. */
  offset: number;
  swatch: 'teal' | 'gold' | 'dim';
}

export interface BarItem extends AnimatedNumber {
  label: string;
  /** Numeric value used for bar length. */
  val: number;
  /** Max value across the set (defines 100% width). */
  max: number;
}

export interface TimeBar {
  val: number;
  max: number;
  x: string;
  peak?: boolean;
}

export interface EngagementCard extends AnimatedNumber {
  label: string;
  note: string;
  accent?: 'teal' | 'gold' | 'none';
}

export interface Pillar {
  icon: string;
  title: string;
  desc: string;
}

export interface WhyCard extends AnimatedNumber {
  title: string;
  desc: string;
}

export interface DeliverItem {
  icon: string;
  text: string;
}

export interface ContactInfo {
  email: string;
  instagram: string;
  instagramUrl: string;
}

export interface MediaKitData {
  handle: string;
  available: string;
  heroTitleLead: string;
  heroTitleAccent: string;
  heroSub: string;
  heroFoot: string;
  heroStats: HeroStat[];

  glanceStats: GlanceStat[];

  nonFollowerPct: AnimatedNumber;
  reachMultiple: AnimatedNumber;
  reachDesc: string;
  donutSegments: DonutSegment[];
  donutCenterValue: string;
  donutCenterLabel: string;

  reels: BarItem[];
  reelsCaptionPct: string;

  engagement: EngagementCard[];

  timeBars: TimeBar[];
  peakTime: string;

  pillars: Pillar[];

  whyCards: WhyCard[];
  deliverables: DeliverItem[];

  contact: ContactInfo;
  metricsNote: string;
}
