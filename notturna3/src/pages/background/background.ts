import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the BackgroundPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-background',
  templateUrl: 'background.html',
})
export class BackgroundPage {
  
  myskill: Array<any>;
  fulldata: Array<any>;
  note: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService) {
    this.myskill=this.auth.getUserSKILLInfo();
	this.fulldata=this.auth.getUserPGInfo();
	  this.note=this.nl2br(this.fulldata['note']);
  }

 modifica(){
	 this.navCtrl.push('ModificanotePage', { "parentPage": this });
 }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad BackgroundPage');
  }

 	nl2br (str) {
	// Some latest browsers when str is null return and unexpected null value
		if (typeof str === 'undefined' || str === null) {
    		return '';
		}
  	// Adjust comment to avoid issue on locutus.io display
  		var breakTag =  '<br>'   ; 
  		return (str + '')
    		.replace(/(\r\n|\n\r|\r|\n)/g, breakTag + '$1')
	}

	reloadnote(){
		 this.note=this.nl2br(this.fulldata['note']);
	}
 
 //filterItemsLOTzero(){
 //   return this.myskill.filter(x => x.tipologia == 8).filter(x => x.livello <0);
 //}
 
}
