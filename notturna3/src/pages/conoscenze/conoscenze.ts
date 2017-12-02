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

	rituali: number;

  constructor(public navCtrl: NavController, private auth: AuthService, public navParams: NavParams , private barcodeScanner: BarcodeScanner) {
    
    this.myskill=this.auth.getUserSKILLInfo();
	this.scheda=this.auth.getUserPGInfo();
	this.myuser=this.auth.getUserInfo();
    
    //console.log("myskill");
    //console.log(this.myskill);
		
		this.rituali=0;
		
		for (var i = 0; i < this.myskill.length; i++) {
  			if ( this.myskill[i].tipologia==11)  {
    		 	this.rituali=1;
    			break;
  			}
		}

  // this.rituali= this.myskill.export.filter(function(elem) {
  //  return elem.tipologia===11 ;
  // }).length;

		
		//console.log ( this.rituali);
    
  }

	openbarcode() {
		
		this.barcodeScanner.scan( {"showTorchButton": true} ).then((barcodeData) => {
			// Success! Barcode data is here
			console.log(barcodeData.text);
			
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
