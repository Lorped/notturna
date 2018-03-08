import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendmessaggioPage } from './sendmessaggio';

@NgModule({
  declarations: [
    SendmessaggioPage,
  ],
  imports: [
    IonicPageModule.forChild(SendmessaggioPage),
  ],
})
export class SendmessaggioPageModule {}
