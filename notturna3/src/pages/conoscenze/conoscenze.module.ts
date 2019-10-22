import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConoscenzePage } from './conoscenze';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ConoscenzePage,
  ],
  imports: [
    IonicPageModule.forChild(ConoscenzePage),
    PipesModule,
  ],
})
export class ConoscenzePageModule {}
