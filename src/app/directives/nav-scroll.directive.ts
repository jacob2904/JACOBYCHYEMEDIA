import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Toggles the `scrolled` class on the host header once the page
 * has scrolled past 30px, giving the nav its solid background.
 */
@Directive({ selector: '[appNavScroll]' })
export class NavScrollDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly onScroll = () => {
    if (window.scrollY > 30) this.el.nativeElement.classList.add('scrolled');
    else this.el.nativeElement.classList.remove('scrolled');
  };

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }
}
