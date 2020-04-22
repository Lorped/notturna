import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthService, User } from '../../providers/auth-service/auth-service';

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

  ifdomanda = 0 ;
  esito = 0 ;
  nodoppioesito: 0 ;
  esitotext: string;
  domanda: string;
  r1: string;
  r2: string;

	userid: number;

  myuser: User;

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private auth: AuthService) {


		this.barcode = this.navParams.get("parentPage").oggetto;
		this.userid = this.navParams.get("parentPage").myuser['userid'];

    if ( this.barcode.length > 12 ) {
      let newbarcode = this.barcode.substr(-12);
      this.barcode = newbarcode;
    }

		var url = 'https://www.roma-by-night.it/ionicPHP/barcode.php?id='+this.userid+'&barcode='+this.barcode;

		this.http.get(url)
		.map(data => data.json())
		.subscribe( data => {
			this.nomeoggetto=data[0];
			this.descrizione=data[1];
			// console.log(this.descrizione);
      if(typeof data[2].Domanda !='undefined' && data[2].Domanda ) {

        this.nodoppioesito = 0 ;
        this.ifdomanda = 1;
        this.domanda = data[2].Domanda;
        this.r1 = data[2].R1;
        this.r2 = data[2].R2;
         // console.log (this.domanda);
         // console.log (this.r1);
         // console.log (this.r2);
      }

		});
	}

  rispSI () {

    var msg: string;
    this.esito = 1 ;
    this.esitotext = this.r1;

    msg="Ha risposo SI alla domanda \""+this.domanda+"\" relativa all'oggetto "+this.nomeoggetto;
    if (this.nodoppioesito == 0 ) {
      this.comunicaesito(msg);
      this.nodoppioesito = 1;
    }
  }
  rispNO () {
    var msg: string;

    this.esito = 2 ;
    this.esitotext = this.r2;

    msg="Ha risposo NO alla domanda \""+this.domanda+"\" relativa all'oggetto "+this.nomeoggetto;
    if (this.nodoppioesito == 0 ) {
      this.comunicaesito(msg);
      this.nodoppioesito = 1;
    }
  }


  comunicaesito(messaggio:string){

    this.myuser=this.auth.getUserInfo();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var link = 'https://www.roma-by-night.it/ionicPHP/msgtomaster.php';
    var mypost = JSON.stringify({idutente: this.myuser['userid'] , messaggio: messaggio});

    // console.log(messaggio);
    this.http.post(link, mypost, {headers})
    .subscribe();
  }

	ionViewDidLoad() {
		//	console.log('ionViewDidLoad OggettoPage');
	}

}
