import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MediaItem } from '../../media.model';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaListComponent {
  @Input() mediaItems: MediaItem[] = [];
}
