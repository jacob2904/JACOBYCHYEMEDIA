import {
  AfterViewInit, Directive, ElementRef, Input, OnDestroy, inject,
} from '@angular/core';

/**
 * Adds the `in` class when the host scrolls into view (one-shot),
 * driving the CSS reveal transition. Optional stagger delay.
 * Usage: <div class="card reveal" appReveal [revealDelay]="0.08"></div>
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective implements AfterViewInit, OnDestroy {
  /** Stagger delay in seconds applied as transition-delay. */
  @Input() revealDelay = 0;

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (this.revealDelay) {
      this.el.nativeElement.style.transitionDelay = `${this.revealDelay}s`;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
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
