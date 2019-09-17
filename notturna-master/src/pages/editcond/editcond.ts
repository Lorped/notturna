import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Oggetto, FullOggetto, Con, Condizione } from '../global';

/**
 * Generated class for the EditcondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editcond',
  templateUrl: 'editcond.html',
})
export class EditcondPage {

  condizione: Condizione;

  condA: Array<string> = ['Forza', 'Destrezza', 'Attutimento',
    'Carisma', 'Persuasione', 'Saggezza',
    'Percezione', 'Intelligenza', 'Prontezza'] ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.condizione = this.navParams.get("condizione");
    console.log(this.condizione);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EditcondPage');
  }

}
