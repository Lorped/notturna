import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonaggioPage } from './personaggio';

@NgModule({
  declarations: [
    PersonaggioPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonaggioPage),
  ],
})
export class PersonaggioPageModule {}
