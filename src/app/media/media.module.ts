import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { components } from './components';
import { MediaListPageComponent } from './media-list-page/media-list-page.component';

@NgModule({
  declarations: [MediaListPageComponent, ...components],
  imports: [CommonModule],
  exports: [MediaListPageComponent],
})
export class MediaModule {}
