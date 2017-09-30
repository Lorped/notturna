import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the TabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  personaggioRoot = 'PersonaggioPage'
  conoscenzeRoot = 'ConoscenzePage'
  backgroundRoot = 'BackgroundPage'
  rubricaRoot = 'RubricaPage'
  dadiRoot = 'DadiPage'

  constructor(public navCtrl: NavController) {}

}
