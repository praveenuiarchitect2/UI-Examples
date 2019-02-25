import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {NewComponent} from './../newcomp/newcomp.component';
import {NewComponent1} from './../newcomp1/newcomp1.component';
import {AppRoutingModule} from './app-routing.module'
import {newModule} from './../newmodule/newcomp1.component';

@NgModule({
  declarations: [
    AppComponent,
    NewComponent,
    NewComponent1,
    newModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
