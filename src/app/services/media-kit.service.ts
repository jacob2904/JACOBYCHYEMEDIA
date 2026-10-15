import { Injectable, signal } from '@angular/core';
import { MediaKitData } from '../models/media-kit.model';

/**
 * Single source of truth for the media kit content.
 *
 * Verified against Jacob's signed-in Instagram Professional dashboard on
 * 15 October 2026. Activity window: 15 September–14 October 2026 (30 days).
 * Views include crossposted Facebook views; viewers are estimated Meta accounts.
 * Interactions retain Instagram Insights' definition, including boosted content.
 * See docs/metrics-2026-10-15.md for scope and verification. When the backend /
 * database arrives, swap the signal's value for an HTTP call to
 * `environment.apiUrl` — the component and template do not change.
 */
@Injectable({ providedIn: 'root' })
export class MediaKitService {
  private readonly _data = signal<MediaKitData>(MEDIA_KIT);

  /** Reactive, read-only view of the media kit data. */
  readonly data = this._data.asReadonly();
}

const MEDIA_KIT: MediaKitData = {
  handle: '@jacobychye',
  available: 'Available for hotel & destination partnerships',
  heroTitleLead: 'I inspire people to',
  heroTitleAccent: 'explore the outdoors.',
  heroSub:
    'Outdoor, travel & adventure reel creator based in Israel — turning landscapes, ' +
    'hidden destinations and aerial storytelling into content that travels far beyond my following.',
  reportingPeriod: '15 Sep–14 Oct 2026',
  heroFoot: 'Instagram Professional insights · 15 Sep–14 Oct 2026 · verified 15 Oct 2026',
  heroStats: [
    { value: 52440, label: 'Instagram followers' },
    { value: 936.5, suffix: 'K', decimals: 1, label: 'Views · Instagram + Facebook' },
    { value: 465, suffix: 'K', label: 'Estimated viewers · Meta accounts' },
    { value: 83.1, suffix: 'K', decimals: 1, label: 'Content interactions' },
  ],

  glanceStats: [
    { value: 52440, name: 'Instagram followers', note: 'Reported 15 Oct 2026; follower counts may be delayed' },
    { value: 936476, name: 'Total views · 30 days', note: '736,369 Instagram + 200,107 Facebook views' },
    { value: 465013, name: 'Viewers', note: 'Estimated Meta accounts that viewed content at least once' },
    { value: 83120, name: 'Content interactions', note: 'Instagram Insights; includes interactions on boosted content' },
    { value: 46387, name: 'Accounts engaged', note: 'Accounts that interacted with content, including ads' },
    { value: 7029, name: 'Profile visits', note: '7,107 profile actions, including 78 external link taps' },
  ],

  nonFollowerPct: { value: 87.5, suffix: '%', decimals: 1 },
  viewers: { value: 465, suffix: 'K' },
  reachDesc:
    '465,013 estimated Meta accounts viewed content at least once during the reporting period. ' +
    'Views count plays or displays and can include repeat views.',
  donutSegments: [
    { label: 'Reels', pct: 92, offset: 0, swatch: 'teal' },
    { label: 'Stories', pct: 8, offset: 92, swatch: 'gold' },
    { label: 'Posts', pct: 0, offset: 100, swatch: 'dim' },
  ],
  donutCenterValue: '92%',
  donutCenterLabel: 'Reels',

  reels: [
    { label: 'Reel 01', val: 509, max: 509, value: 509, suffix: 'K' },
    { label: 'Reel 02', val: 31.9, max: 509, value: 31.9, suffix: 'K', decimals: 1 },
    { label: 'Reel 03', val: 21, max: 509, value: 21, suffix: 'K' },
    { label: 'Reel 04', val: 8.1, max: 509, value: 8.1, suffix: 'K', decimals: 1 },
    { label: 'Reel 05', val: 5.3, max: 509, value: 5.3, suffix: 'K', decimals: 1 },
  ],
  reelsCaptionPct: '99.4%',

  engagement: [
    {
      value: 46387, accent: 'teal',
      label: 'Accounts engaged',
      note: 'Accounts that interacted with content, including ads. Estimated by Instagram Insights.',
    },
    {
      value: 83120, accent: 'none',
      label: 'Content interactions · 30 days',
      note: 'Likes, saves, comments, shares and replies, including interactions on boosted content.',
    },
    {
      value: 72.5, suffix: '%', decimals: 1, accent: 'gold',
      label: 'Interactions from non-followers',
      note: 'Share of content interactions reported by Instagram Insights for this period.',
    },
  ],

  timeBars: [
    { val: 14182, max: 20012, x: '12a' },
    { val: 15711, max: 20012, x: '3a' },
    { val: 16850, max: 20012, x: '6a' },
    { val: 20012, max: 20012, x: '9a', peak: true },
    { val: 17174, max: 20012, x: '12p' },
    { val: 6769, max: 20012, x: '3p' },
    { val: 6100, max: 20012, x: '6p' },
    { val: 14303, max: 20012, x: '9p' },
  ],
  peakTime: '9:00 AM PST',

  pillars: [
    { icon: '⛰️', title: 'Outdoor & Nature', desc: 'Lakes, canyons, rivers and hidden landscapes shot to feel like a place you have to visit.' },
    { icon: '✈️', title: 'Travel & Destinations', desc: 'Destination storytelling that turns a location into a must-add-to-the-list moment.' },
    { icon: '🚁', title: 'Aerial & Drone', desc: 'Cinematic FPV and aerial reels that showcase scale and beauty no ground shot can.' },
    { icon: '🥾', title: 'Adventure & Action', desc: 'Hiking, water and movement — energetic edits built for retention and shares.' },
    { icon: '🍃', title: 'Lifestyle & Food', desc: 'The human side of travel: stays, meals and experiences that make a place feel real.' },
  ],

  whyCards: [
    { value: 465, suffix: 'K', title: 'Content discovery', desc: '465,013 estimated Meta-account viewers in the verified 30-day reporting period.' },
    { value: 87.5, suffix: '%', decimals: 1, title: 'Views beyond my followers', desc: '87.5% of views came from non-followers, as reported by Instagram Insights.' },
    { value: 46.4, suffix: 'K', decimals: 1, title: 'An audience that engages', desc: '46,387 accounts interacted with content during the reporting period, including ads.' },
    { value: 92, suffix: '%', title: 'Reels-first distribution', desc: 'Reels accounted for 92% of views. Total views: 736,369 on Instagram and 200,107 on Facebook.' },
  ],
  deliverables: [
    { icon: '🎬', text: 'Destination reels — 1–3 cinematic edits featuring your property & surroundings' },
    { icon: '📱', text: 'Real-time story sequences during the stay (booking links, swipe-ups, location tags)' },
    { icon: '🚁', text: 'Aerial & drone showcase of the property and its setting' },
    { icon: '🖼️', text: 'Licensed photo & video content for your own channels and website' },
    { icon: '🤝', text: 'Ongoing ambassador partnership for seasonal campaigns' },
  ],

  contact: {
    email: 'hhyuikobi@gmail.com',
    instagram: '@jacobychye',
    instagramUrl: 'https://instagram.com/jacobychye',
  },
  metricsNote: 'Instagram Professional insights · 15 Sep–14 Oct 2026 · verified 15 Oct 2026',
};
