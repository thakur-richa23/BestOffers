import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Categoryitems } from './categoryitems';

@NgModule({
  declarations: [
    Categoryitems,
  ],
  imports: [
    IonicPageModule.forChild(Categoryitems),
  ],
  exports: [
    Categoryitems
  ]
})
export class CategoryitemsModule {}
