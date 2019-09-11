import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificaPage } from './modifica';

@NgModule({
  declarations: [
    ModificaPage,
  ],
  imports: [
    IonicPageModule.forChild(ModificaPage),
  ],
})
export class ModificaPageModule {}
