import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonaggioPage } from './personaggio';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PersonaggioPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonaggioPage),
    PipesModule,
  ],
})
export class PersonaggioPageModule {}
