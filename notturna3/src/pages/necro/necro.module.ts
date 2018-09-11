import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NecroPage } from './necro';

@NgModule({
  declarations: [
    NecroPage,
  ],
  imports: [
    IonicPageModule.forChild(NecroPage),
  ],
})
export class NecroPageModule {}
