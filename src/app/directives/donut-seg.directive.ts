import {
  AfterViewInit, Directive, ElementRef, Input, OnDestroy, inject,
} from '@angular/core';

/**
 * Animates a single donut ring segment (an SVG <circle r="52">).
 * Grows the stroke dash to represent `pct`, positioned at `offset`.
 * Usage: <circle class="donut-seg" appDonutSeg [pct]="83.8" [segOffset]="0" />
 */
@Directive({ selector: '[appDonutSeg]' })
export class DonutSegDirective implements AfterViewInit, OnDestroy {
  @Input() pct = 0;
  @Input() segOffset = 0;

  private static readonly R = 52;
  private static readonly C = 2 * Math.PI * DonutSegDirective.R;

  private readonly el = inject<ElementRef<SVGCircleElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    const C = DonutSegDirective.C;
    node.style.strokeDashoffset = `${-((this.segOffset / 100) * C)}`;
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const dash = (this.pct / 100) * C;
            requestAnimationFrame(() =>
              requestAnimationFrame(() => {
                node.style.strokeDasharray = `${dash} ${C - dash}`;
              }),
            );
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
