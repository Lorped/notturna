import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BackgroundPage } from './background';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    BackgroundPage,
  ],
  imports: [
    IonicPageModule.forChild(BackgroundPage),
    PipesModule,
  ],
})
export class BackgroundPageModule {}
