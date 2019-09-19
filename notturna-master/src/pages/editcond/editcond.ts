import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Oggetto, FullOggetto, Con, Condizione } from '../global';
import { Http } from '@angular/http';

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

  newcondA: number;
  newcondD: number;
  newcondP: number;
  newcondS: number;

  condD: Array<any>;
  condP: Array<any>;
  condS: Array<any>;


  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.condizione = this.navParams.get("condizione");
    this.caricacond ();
    console.log(this.condizione);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EditcondPage');
  }

  caricacond () {
    var url = 'http://www.roma-by-night.it/ionicPHP/listpoteridiscipline.php';

		this.http.get(url)
      .map(data => data.json())
    	.subscribe(res =>  {
        console.log(res);
        this.condD = res[0].discipline;
        this.condP = res[0].poteri;
        this.condS = res[0].skill;
        console.log (this.condP);
        console.log (this.condD);
      });
  }

}
