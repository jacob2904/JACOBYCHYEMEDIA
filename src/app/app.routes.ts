import { Routes } from '@angular/router';
import { MediaKit } from './components/media-kit/media-kit';

export const routes: Routes = [
  { path: '', component: MediaKit, title: 'Jacob Ychye — Creator Media Kit' },
  // Future follower features mount here, e.g.:
  // { path: 'community', loadComponent: () => import('./components/community/community').then(m => m.Community) },
  { path: '**', redirectTo: '' },
];
