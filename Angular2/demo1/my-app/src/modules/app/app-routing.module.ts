import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewComponent} from './../newcomp/newcomp.component';
import {NewComponent1} from './../newcomp1/newcomp.component';

const routes: Routes = [
  { path: 'new', component: NewComponent,
   children: [
      { path: 'new1', component: NewComponent1 }
    ]},
  { path: '', component: NewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
