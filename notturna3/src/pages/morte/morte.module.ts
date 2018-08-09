import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MortePage } from './morte';

@NgModule({
  declarations: [
    MortePage,
  ],
  imports: [
    IonicPageModule.forChild(MortePage),
  ],
})
export class MortePageModule {}
