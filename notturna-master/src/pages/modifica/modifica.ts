import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the ModificaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modifica',
  templateUrl: 'modifica.html',
})
export class ModificaPage {

  barcode: string;

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.barcode = this.navParams.get("parentPage").barcode;

    console.log(this.barcode);

    var url = 'http://www.roma-by-night.it/ionicPHP/barcode3.php?barcode='+this.barcode;

		this.http.get(url)
		.map(data => data.json())
		.subscribe( data => {

			console.log(data);
		});

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ModificaPage');
  }

}
