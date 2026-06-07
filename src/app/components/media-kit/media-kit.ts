import { Component, inject } from '@angular/core';
import { MediaKitService } from '../../services/media-kit.service';
import { CountUpDirective } from '../../directives/count-up.directive';
import { RevealDirective } from '../../directives/reveal.directive';
import { BarFillDirective } from '../../directives/bar-fill.directive';
import { DonutSegDirective } from '../../directives/donut-seg.directive';
import { NavScrollDirective } from '../../directives/nav-scroll.directive';

@Component({
  selector: 'app-media-kit',
  imports: [
    CountUpDirective,
    RevealDirective,
    BarFillDirective,
    DonutSegDirective,
    NavScrollDirective,
  ],
  templateUrl: './media-kit.html',
})
export class MediaKit {
  /** All content comes from the service — swap to an API later, template unchanged. */
  protected readonly kit = inject(MediaKitService).data;

  /** Stagger helper for grid reveals (mirrors the original 6-item rhythm). */
  protected stagger(i: number): number {
    return (i % 6) * 0.08;
  }
}
