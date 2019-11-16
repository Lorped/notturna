import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService, User } from '../../providers/auth-service/auth-service';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';


/**
 * Generated class for the ConoscenzePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conoscenze',
  templateUrl: 'conoscenze.html',
})
export class ConoscenzePage {

  myskill: Array<any>;
  scheda: Array<any>;

  myuser: User;

  oggetto: string;

  rituali:	number;

  forza:	number;
  rissa:	number;
  mischia:	number;
  lancio:	number;
  tiro:		number;
  fuoco:	number;
  Bfuoco:	number;
  potenza:	number;
  artigli:	number;

  fomipot2 = 0;
  foripot2 = 0;
  folapot2 = 0;
  treti2 = 0;
  trefuoco2 = 0;

  titolo = '';

  constructor(public navCtrl: NavController, private auth: AuthService, public navParams: NavParams , private barcodeScanner: BarcodeScanner) {

  this.myskill=this.auth.getUserSKILLInfo();
	this.scheda=this.auth.getUserPGInfo();
	this.myuser=this.auth.getUserInfo();

//console.log(this.myuser);

  if (this.myuser.type == 'V') {
    this.titolo = 'Discipline e Taumaturgie';
  } else {
    switch ( this.scheda['idstatus']) {
      case '1' : {
        this.titolo = 'Equip. Potenziato';
        break;
      }
      case '2' : {
        this.titolo = 'Reliquie';
        break;
      }
      case '3' : {
        this.titolo = 'Elisir';
        break;
      }
    }
  }

  // console.log("myskill");
  // console.log(this.myskill);

	this.rituali=0;

	for (var j = 0; j < this.myskill.length; j++) {
  	if ( this.myskill[j].tipologia==11)  {
    	this.rituali=1;
    	break;
  	}
	}


	this.rissa=0;
	this.mischia=0;
	this.lancio=0;
	this.tiro=0;
	this.fuoco=0;
	this.potenza=0;
	this.artigli=0;

	for (var i = 0; i < this.myskill.length; i++) {
  	if ( this.myskill[i].nomeskill=="Rissa")  {
    	this.rissa=this.myskill[i].livello;
  	}
 		if ( this.myskill[i].nomeskill=="Mischia")  {
    	this.mischia=this.myskill[i].livello;
  	}
  	if ( this.myskill[i].nomeskill=="Armi da lancio")  {
    	this.lancio=this.myskill[i].livello;
  	}
  	if ( this.myskill[i].nomeskill=="Armi da tiro")  {
    	this.tiro=this.myskill[i].livello;
  	}
  	if ( this.myskill[i].nomeskill=="Armi da fuoco")  {
    	this.fuoco=this.myskill[i].livello;
  	}
  	if ( this.myskill[i].nomeskill=="Potenza")  {
    	this.potenza=this.myskill[i].livello;
  	}
  	if ( this.myskill[i].nomeskill=="Proteide")  {
    	if (this.myskill[i].livello >1 ) this.artigli=1;
  	}
	}


	this.forza = this.scheda['forza'];
  this.fomipot2 = Math.ceil((this.forza + this.mischia + this.potenza)/2);
  this.foripot2 = Math.ceil((this.forza + this.rissa + this.potenza)/2);
  this.folapot2 = Math.ceil((this.forza + this.lancio + this.potenza)/2);
  this.treti2 = Math.ceil((3 + this.tiro )/2);

  this.trefuoco2 = Math.ceil((3 + this.fuoco)/2);

  // this.rituali= this.myskill.export.filter(function(elem) {
  //  return elem.tipologia===11 ;
  // }).length;


		//console.log ( this.rituali);

  }

	openbarcode() {

		this.barcodeScanner.scan( {"showTorchButton": true} ).then((barcodeData) => {
			// Success! Barcode data is here
			//console.log(barcodeData.text);

			this.oggetto=barcodeData.text;
			this.navCtrl.push('OggettoPage', { "parentPage": this });

		}, (err) => {
				// An error occurred
		});

	}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ConoscenzePage');
  }

}
