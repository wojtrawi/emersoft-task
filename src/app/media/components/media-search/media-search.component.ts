import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-media-search',
  templateUrl: './media-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaSearchComponent {
  @Input() searchQuery = '';
  @Output() search = new EventEmitter<string>();

  onInput(query: string) {
    this.search.emit(query);
  }
}
