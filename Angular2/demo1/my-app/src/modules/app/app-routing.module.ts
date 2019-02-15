import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {NewComponent} from './../newcomp/newcomp.component';
import {NewComponent1} from './../newcomp1/newcomp1.component';

const routes: Routes = [
  { path: 'new', component: NewComponent },
  { path: 'new1', component: NewComponent1 },
  { path: '**', component: NewComponent1 }
];


@NgModule({
  imports: [RouterModule.forRoot(routes,  { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
