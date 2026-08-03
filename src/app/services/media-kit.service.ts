import { Injectable, signal } from '@angular/core';
import { MediaKitData } from '../models/media-kit.model';

/**
 * Single source of truth for the media kit content.
 *
 * Today this returns a hard-coded snapshot of Jacob's REAL Instagram
 * Professional insights (trailing 30 days, June 2026). When the backend /
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
  heroFoot: 'Instagram Professional insights · trailing 30 days · June 2026',
  heroStats: [
    { value: 49700, label: 'Followers' },
    { value: 947, suffix: 'K', label: 'Monthly views' },
    { value: 349, suffix: 'K', label: 'Accounts reached' },
    { value: 9.6, suffix: '%', decimals: 1, label: 'Engagement rate' },
  ],

  glanceStats: [
    { value: 49700, name: 'Followers', note: 'Engaged outdoor & travel community' },
    { value: 947127, name: 'Views / month', note: '~31.5K every single day' },
    { value: 349269, name: 'Accounts reached', note: '7.2× my follower base' },
    { value: 70331, name: 'Interactions', note: 'Likes, comments, shares & saves' },
    { value: 33615, name: 'Accounts engaged', note: 'People who acted, not just scrolled' },
    { value: 8730, name: 'Profile visits', note: 'Monthly — strong discovery intent' },
  ],

  nonFollowerPct: { value: 76, suffix: '%' },
  reachMultiple: { value: 7.2, suffix: '×', decimals: 1 },
  reachDesc:
    '349,269 accounts reached against 48,584 followers — every post works far harder ' +
    'than the follower number suggests.',
  donutSegments: [
    { label: 'Reels', pct: 84.3, offset: 0, swatch: 'teal' },
    { label: 'Stories', pct: 15.7, offset: 84.3, swatch: 'gold' },
    { label: 'Posts', pct: 0, offset: 100, swatch: 'dim' },
  ],
  donutCenterValue: '84.3%',
  donutCenterLabel: 'Reels',

  reels: [
    { label: 'Reel 01', val: 126, max: 126, value: 126, suffix: 'K' },
    { label: 'Reel 02', val: 99, max: 126, value: 99, suffix: 'K' },
    { label: 'Reel 03', val: 89.4, max: 126, value: 89.4, suffix: 'K', decimals: 1 },
    { label: 'Reel 04', val: 53.4, max: 126, value: 53.4, suffix: 'K', decimals: 1 },
    { label: 'Reel 05', val: 34.1, max: 126, value: 34.1, suffix: 'K', decimals: 1 },
  ],
  reelsCaptionPct: '97.4%',

  engagement: [
    {
      value: 9.6, suffix: '%', decimals: 1, accent: 'teal',
      label: 'Engagement rate',
      note: '33,615 accounts engaged ÷ 349,269 reached — well above the typical 1–3% benchmark.',
    },
    {
      value: 70331, accent: 'none',
      label: 'Total interactions / month',
      note: 'Likes, comments, saves & shares across all content.',
    },
    {
      value: 65.8, suffix: '%', decimals: 1, accent: 'gold',
      label: 'Interactions from non-followers',
      note: "New audiences don't just watch — they engage and convert.",
    },
  ],

  timeBars: [
    { val: 14848, max: 18570, x: '12a' },
    { val: 16505, max: 18570, x: '3a' },
    { val: 17495, max: 18570, x: '6a' },
    { val: 18570, max: 18570, x: '9a', peak: true },
    { val: 15683, max: 18570, x: '12p' },
    { val: 5426, max: 18570, x: '3p' },
    { val: 5750, max: 18570, x: '6p' },
    { val: 13676, max: 18570, x: '9p' },
  ],
  peakTime: '9:00',

  pillars: [
    { icon: '⛰️', title: 'Outdoor & Nature', desc: 'Lakes, canyons, rivers and hidden landscapes shot to feel like a place you have to visit.' },
    { icon: '✈️', title: 'Travel & Destinations', desc: 'Destination storytelling that turns a location into a must-add-to-the-list moment.' },
    { icon: '🚁', title: 'Aerial & Drone', desc: 'Cinematic FPV and aerial reels that showcase scale and beauty no ground shot can.' },
    { icon: '🥾', title: 'Adventure & Action', desc: 'Hiking, water and movement — energetic edits built for retention and shares.' },
    { icon: '🍃', title: 'Lifestyle & Food', desc: 'The human side of travel: stays, meals and experiences that make a place feel real.' },
  ],

  whyCards: [
    { value: 349, suffix: 'K', title: 'New eyes every month', desc: '349K+ accounts reached monthly puts your property in front of a large, travel-minded audience.' },
    { value: 76, suffix: '%', title: 'Reach beyond my followers', desc: "76% of views are non-followers — you're discovered by potential guests, not just my existing community." },
    { value: 9.6, suffix: '%', decimals: 1, title: 'Engagement that converts', desc: 'A 9.6% engagement rate means saves, shares and DMs — the actions that turn views into bookings.' },
    { value: 947, suffix: 'K', title: 'Reels-first distribution', desc: '947K monthly views on the format Instagram pushes hardest — maximum organic reach for your stay.' },
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
  metricsNote: 'Metrics from Instagram Professional insights · trailing 30 days · June 2026',
};
