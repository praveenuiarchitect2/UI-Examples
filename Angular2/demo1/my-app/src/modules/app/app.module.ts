import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NewComponent} from './../newcomp/newcomp.component';
import {NewComponent1} from './../newcomp1/newcomp.component';

@NgModule({
  declarations: [
    AppComponent,
    NewComponent,
    NewComponent1
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
