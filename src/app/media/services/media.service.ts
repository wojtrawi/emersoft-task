import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MediaItem } from '../media.model';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(private http: HttpClient) {}

  getMediaItems(): Observable<MediaItem[]> {
    return this.http.get<{ data: MediaItem[] }>('assets/mock-media.json').pipe(
      map(({ data }) => data),
      catchError(err => {
        console.error(err);

        return of([]);
      }),
    );
  }
}
