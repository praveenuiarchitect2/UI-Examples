import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {NewComponent} from './../newcomp/newcomp.component';
import {NewComponent1} from './../newcomp1/newcomp1.component';

@NgModule({
  declarations: [
    AppComponent,
    NewComponent,
    NewComponent1
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( [
        { path: 'new-1', component: NewComponent },
        { path: 'new-2', component: NewComponent1 },
        // { path: '**', component: NewComponent }
        {
          path: '',
          redirectTo: 'new-1',
          pathMatch: 'full'
        },
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
