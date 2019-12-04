import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MediaType, SortDir } from '../media.model';
import { MediaFacadeService } from '../services';

@Component({
  selector: 'app-media-list-page',
  templateUrl: './media-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaListPageComponent {
  readonly mediaItemsVM$ = this.mediaFacadeService.mediaItemsVM$;
  readonly searchQuery$ = this.mediaFacadeService.searchQuery$;
  readonly mediaType$ = this.mediaFacadeService.mediaType$;
  readonly sortDir$ = this.mediaFacadeService.sortDir$;

  constructor(private mediaFacadeService: MediaFacadeService) {}

  onSearch(query: string) {
    this.mediaFacadeService.changeSearchQuery(query);
  }

  onChangeMediaType(mediaType: MediaType) {
    this.mediaFacadeService.changeMediaType(mediaType);
  }

  onChangeSortDir(sortDir: SortDir) {
    this.mediaFacadeService.changeSortDir(sortDir);
  }

  onClear() {
    this.mediaFacadeService.clear();
  }
}
