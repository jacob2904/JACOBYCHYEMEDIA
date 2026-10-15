import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { MediaKit } from './media-kit';
import { CountUpDirective } from '../../directives/count-up.directive';

describe('MediaKit metric presentation', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', class {
      observe() {}
      unobserve() {}
      disconnect() {}
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  it('renders data-bound percentages, reporting dates and platform scope', async () => {
    await TestBed.configureTestingModule({ imports: [MediaKit] }).compileComponents();
    const fixture = TestBed.createComponent(MediaKit);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    const text = page.textContent?.replace(/\s+/g, ' ') ?? '';
    expect(text).toContain('87.5% of my views');
    expect(text).toContain('Non-followers 87.5%');
    expect(text).toContain('Followers 12.5%');
    expect(text).toContain('Reels — 92%');
    expect(text).toContain('Stories — 8%');
    expect(text).toContain('15 Sep–14 Oct 2026');
    expect(text).toContain('736,369 Instagram + 200,107 Facebook');
    expect(text).toContain('Monday follower activity');
    expect(text).toContain('Pacific Standard Time (PST)');
    expect(text).toContain('unavailable collaboration-reel count is excluded');
    expect(text).not.toMatch(/83\.8%|16\.2%|9\.6%|June 2026/);
    const numbers = fixture.debugElement.queryAll(By.directive(CountUpDirective))
      .map(node => node.injector.get(CountUpDirective));
    expect(numbers.filter(n => n.target === 87.5).every(n => n.countDecimals === 1)).toBe(true);
  });
});
