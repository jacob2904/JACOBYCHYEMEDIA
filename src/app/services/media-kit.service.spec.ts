import { TestBed } from '@angular/core/testing';
import { MediaKitService } from './media-kit.service';

describe('MediaKitService verified snapshot', () => {
  const kit = () => TestBed.inject(MediaKitService).data();

  it('publishes the verified date and exact account metrics', () => {
    const data = kit();
    expect(data.reportingPeriod).toBe('15 Sep–14 Oct 2026');
    expect(data.metricsNote).toContain('verified 15 Oct 2026');
    expect(data.glanceStats.map(s => s.value)).toEqual([52440, 936476, 465013, 83120, 46387, 7029]);
    expect(data.glanceStats[1].value).toBe(736369 + 200107);
    expect(data.glanceStats[1].note).toContain('Instagram + 200,107 Facebook');
  });

  it('keeps current metric definitions instead of an unsupported rate or ratio', () => {
    const data = kit();
    expect(data.heroStats[0].value).toBe(52440);
    expect(data.heroStats[1].label).toContain('Instagram + Facebook');
    expect(data.heroStats[2].label).toContain('Meta accounts');
    expect(data.reachDesc).toContain('estimated Meta accounts');
    expect(JSON.stringify(data)).not.toMatch(/engagement rate|follower base|7\.2×|June 2026/);
  });

  it('keeps format and non-follower percentages consistent', () => {
    const data = kit();
    expect(data.nonFollowerPct).toEqual({ value: 87.5, suffix: '%', decimals: 1 });
    expect(data.donutSegments.map(s => s.pct)).toEqual([92, 8, 0]);
    expect(data.donutSegments.reduce((total, s) => total + s.pct, 0)).toBe(100);
    expect(data.donutSegments.map(s => s.offset)).toEqual([0, 92, 100]);
    expect(data.donutCenterValue).toBe('92%');
    expect(data.reelsCaptionPct).toBe('99.4%');
    expect(data.engagement[2].value).toBe(72.5);
  });

  it('preserves rounded reel values and excludes unavailable counts', () => {
    const reels = kit().reels;
    expect(reels.map(r => r.value)).toEqual([509, 31.9, 21, 8.1, 5.3]);
    expect(reels.every(r => r.max === 509 && r.val === r.value && r.suffix === 'K')).toBe(true);
  });

  it('uses the verified Monday activity and labels the PST peak', () => {
    const data = kit();
    expect(data.timeBars.map(t => t.val)).toEqual([14182, 15711, 16850, 20012, 17174, 6769, 6100, 14303]);
    expect(data.timeBars.filter(t => t.peak).map(t => t.x)).toEqual(['9a']);
    expect(data.timeBars.every(t => t.max === 20012)).toBe(true);
    expect(data.peakTime).toBe('9:00 AM PST');
  });
});
