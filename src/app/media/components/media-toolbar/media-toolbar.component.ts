import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { MediaType, SortDir } from '../../media.model';

@Component({
  selector: 'app-media-toolbar',
  templateUrl: './media-toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaToolbarComponent {
  @Input() selectedMediaType: MediaType = MediaType.All;
  @Input() sortDir: SortDir = SortDir.Desc;

  @Output() changeMediaType = new EventEmitter<MediaType>();
  @Output() changeSortDir = new EventEmitter<SortDir>();
  @Output() clear = new EventEmitter<void>();

  mediaTypeOptions = Object.entries(MediaType)
    .filter(([label]) => isNaN(+label))
    .map(([label, value]) => ({
      label,
      value,
    }));

  get isSortDesc(): boolean {
    return this.sortDir === SortDir.Desc;
  }

  onClear() {
    this.clear.emit();
  }

  onChangeSortDir() {
    const newSortDir =
      this.sortDir === SortDir.Desc ? SortDir.Asc : SortDir.Desc;

    this.changeSortDir.emit(newSortDir);
  }

  onChangeMediaType(mediaType: string) {
    this.changeMediaType.emit(+mediaType);
  }
}
