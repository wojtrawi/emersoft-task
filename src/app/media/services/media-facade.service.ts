import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';

import { MediaItem, MediaType, SortDir } from '../media.model';
import { MediaService } from './media.service';

@Injectable({
  providedIn: 'root',
})
export class MediaFacadeService {
  private mediaItems$ = this.mediaService.getMediaItems().pipe(shareReplay(1));
  private searchQuerySubject = new BehaviorSubject('');
  private mediaTypeSubject = new BehaviorSubject(MediaType.All);
  private sortDirSubject = new BehaviorSubject(SortDir.Desc);

  readonly searchQuery$ = this.searchQuerySubject.asObservable();
  readonly mediaType$ = this.mediaTypeSubject.asObservable();
  readonly sortDir$ = this.sortDirSubject.asObservable();

  readonly mediaItemsVM$ = combineLatest([
    this.searchQuery$,
    this.mediaType$,
    this.sortDir$,
  ]).pipe(
    debounceTime(300),
    distinctUntilChanged((prev, next) =>
      prev.every((item, i) => item === next[i]),
    ),
    switchMap(([searchQuery, mediaType, sortDir]) =>
      this.mediaItems$.pipe(
        map(mediaItems =>
          this.filterMediaItems(mediaItems, searchQuery, mediaType),
        ),
        map(filteredMediaItems =>
          this.sortMediaItems(filteredMediaItems, sortDir),
        ),
      ),
    ),
  );

  constructor(private mediaService: MediaService) {}

  changeSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }

  changeMediaType(mediaType: MediaType) {
    this.mediaTypeSubject.next(mediaType);
  }

  changeSortDir(sortDir: SortDir) {
    this.sortDirSubject.next(sortDir);
  }

  clear() {
    this.searchQuerySubject.next('');
    this.mediaTypeSubject.next(MediaType.All);
    this.sortDirSubject.next(SortDir.Desc);
  }

  private filterMediaItems(
    mediaItems: MediaItem[],
    searchQuery: string,
    mediaType: MediaType,
  ): MediaItem[] {
    const normalizedSearchQuery = searchQuery.toLowerCase();

    return mediaItems.filter(
      ({ title, type }) =>
        title.toLowerCase().includes(normalizedSearchQuery) &&
        (mediaType === MediaType.All || type === mediaType),
    );
  }

  private sortMediaItems(
    mediaItems: MediaItem[],
    sortDir: SortDir,
  ): MediaItem[] {
    const multiplier = sortDir === SortDir.Asc ? 1 : -1;

    return mediaItems.sort((a, b) => (a.title > b.title ? 1 : -1) * multiplier);
  }
}
