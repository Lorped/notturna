import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the OggettoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-oggetto',
  templateUrl: 'oggetto.html',
})
export class OggettoPage {

	barcode: string;

	nomeoggetto: string;
	descrizione: string;

	oggetto: Array<any>;

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

		this.barcode = this.navParams.get("parentPage").oggetto;

    if ( this.barcode.length > 12 ) {
      let newbarcode = this.barcode.substr(-12);
      this.barcode = newbarcode;
    }

		var url = 'http://www.roma-by-night.it/ionicPHP/barcode2.php?barcode='+this.barcode;

		this.http.get(url)
		.map(data => data.json())
		.subscribe( data => {
			this.oggetto=data;
			this.nomeoggetto=data[0].desc;
			this.descrizione=data[1].desc;
			// console.log(this.descrizione);
		});


	}


	ionViewDidLoad() {
	// console.log('ionViewDidLoad OggettoPage');
	}

}
