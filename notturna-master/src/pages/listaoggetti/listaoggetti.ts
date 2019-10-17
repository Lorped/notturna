import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { Oggetto } from '../global';

/**
 * Generated class for the ListaoggettiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listaoggetti',
  templateUrl: 'listaoggetti.html',
})
export class ListaoggettiPage {



	listaoggetti: Array<Oggetto> = [];
  oggetto: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

		this.loadoggetti();

	}

  modifica(x: Oggetto) {
    this.oggetto = x.barcode;
    console.log(x);
    this.navCtrl.push('ModificaPage', { "parentPage": this });
  }
	ionViewDidLoad() {
	// console.log('ionViewDidLoad ListaoggettiPage');
	}

  loadoggetti () {
    var url = 'https://www.roma-by-night.it/ionicPHP/listaoggetti.php';

		this.http.get(url)
		.map(data => data.json())
		.subscribe( data => {
			this.listaoggetti = data;
			console.log(this.listaoggetti);
		});
  }

}
