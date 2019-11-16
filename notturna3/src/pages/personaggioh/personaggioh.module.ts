import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonaggiohPage } from './personaggioh';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PersonaggiohPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonaggiohPage),
    PipesModule,
  ],
})
export class personaggiohPageModule {}
