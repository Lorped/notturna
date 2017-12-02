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
	
	userid: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
	  
	this.barcode = this.navParams.get("parentPage").oggetto;
	this.userid = this.navParams.get("parentPage").myuser['userid'];
	
	
	var url = 'http://www.roma-by-night.it/ionicPHP/barcode.php?id='+this.userid+'&barcode='+this.barcode;
	
	this.http.get(url)
		.map(data => data.json())
		.subscribe( data => {
			this.nomeoggetto=data[0];
			this.descrizione=data[1];
//			console.log(this.descrizione);	
		});		  
	  
  
  }
  


  ionViewDidLoad() {
//	console.log('ionViewDidLoad OggettoPage');
  }

}
