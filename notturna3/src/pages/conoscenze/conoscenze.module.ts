import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConoscenzePage } from './conoscenze';

@NgModule({
  declarations: [
    ConoscenzePage,
  ],
  imports: [
    IonicPageModule.forChild(ConoscenzePage),
  ],
})
export class ConoscenzePageModule {}
