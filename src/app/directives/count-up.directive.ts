import {
  AfterViewInit, Directive, ElementRef, Input, OnDestroy, inject,
} from '@angular/core';

/**
 * Animated count-up. Runs once when the element scrolls into view.
 * Usage: <span [appCountUp]="48584" [countSuffix]="'K'" [countDecimals]="1"></span>
 */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective implements AfterViewInit, OnDestroy {
  @Input('appCountUp') target = 0;
  @Input() countSuffix = '';
  @Input() countDecimals = 0;
  @Input() countDuration = 1500;

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;
  private done = false;

  ngAfterViewInit(): void {
    this.el.nativeElement.textContent = this.format(0);
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.done) {
            this.done = true;
            this.run();
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private run(): void {
    const node = this.el.nativeElement;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / this.countDuration, 1);
      // easeOutExpo
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      node.textContent = this.format(this.target * e);
      if (p < 1) requestAnimationFrame(step);
      else node.textContent = this.format(this.target);
    };
    requestAnimationFrame(step);
  }

  private format(n: number): string {
    const s = this.countDecimals > 0
      ? n.toFixed(this.countDecimals)
      : Math.round(n).toLocaleString('en-US');
    return s + this.countSuffix;
  }
}
