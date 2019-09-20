import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { FullOggetto, Condizione } from '../global';

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

  myoggetto = new FullOggetto;


  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    // this.barcode = this.navParams.get("parentPage").barcode;
    this.barcode = this.navParams.get("parentPage").oggetto;

    if ( this.barcode.length > 12 ) {
      let newbarcode = this.barcode.substr(-12);
      this.barcode = newbarcode;
    }

    this.loadoggetto();


  }

  loadoggetto() {
    var url = 'http://www.roma-by-night.it/ionicPHP/barcode3.php?barcode='+this.barcode;

		this.http.get(url)
		.map(data => data.json())
		.subscribe( data => {

			//console.log(data);

      this.myoggetto=data;
		});
  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad ModificaPage');
  }

  delete (x: Condizione) {
    // console.log(x);
    var url = 'http://www.roma-by-night.it/ionicPHP/delcond.php?idcondizione='+x.con.idcondizione;

		this.http.get(url)
		.map(data => data.json())
		.subscribe( data => {

			this.loadoggetto();

		});
  }

  modifica() {
    var url = 'http://www.roma-by-night.it/ionicPHP/changeogg.php';

		var mypost = JSON.stringify({idoggetto: this.myoggetto.oggetto.idoggetto,  nomeoggetto: this.myoggetto.oggetto.nomeoggetto, descrizione: this.myoggetto.oggetto.descrizione });

		let headers = new Headers();

		headers.append('Content-Type', 'application/json');

		this.http.post(url, mypost, {headers})
    		.subscribe(res =>  {

        alert("Oggetto modificato");
				this.loadoggetto();
		  });
  }

  edit(x: Condizione) {
    this.navCtrl.push('EditcondPage', { "condizione": x });
  }

}
