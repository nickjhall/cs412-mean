import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import { DataViewComponent } from './data-view/data-view.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    DataViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
