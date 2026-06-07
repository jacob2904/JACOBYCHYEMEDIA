import {
  AfterViewInit, Directive, ElementRef, Input, OnDestroy, inject,
} from '@angular/core';

/**
 * Fills a bar to (val / max) when scrolled into view.
 * orientation 'h' sets width (horizontal bars / split bars),
 * 'v' sets height (vertical time-of-day bars).
 * Usage: <div class="bar-fill" appBarFill [barVal]="77" [barMax]="115"></div>
 */
@Directive({ selector: '[appBarFill]' })
export class BarFillDirective implements AfterViewInit, OnDestroy {
  @Input() barVal = 0;
  @Input() barMax = 1;
  @Input() orientation: 'h' | 'v' = 'h';

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const pct = (this.barVal / this.barMax) * 100;
            requestAnimationFrame(() => {
              if (this.orientation === 'v') {
                this.el.nativeElement.style.height = `${pct}%`;
              } else {
                this.el.nativeElement.style.width = `${pct}%`;
              }
            });
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
}
