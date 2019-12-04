import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MediaModule } from './media/media.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, MediaModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
