import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService, User } from '../../providers/auth-service/auth-service';

import { InAppBrowser } from '@ionic-native/in-app-browser';

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
  notemaster: string;
  rifugio: string;

  link: string;
  titolo: string;
  myuser: User;

	constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService , private iab: InAppBrowser) {
		this.myskill=this.auth.getUserSKILLInfo();
		this.fulldata=this.auth.getUserPGInfo();
    this.myuser=this.auth.getUserInfo();
		this.rifugio=this.fulldata['rifugio'];

    if (this.myuser.type == 'V') {
      this.titolo = 'Rifugio';
    } else {
      this.titolo = 'SafeHouse';
    }


    if (this.myuser.type == 'H') {
      for (var j = 0; j < this.myskill.length; j++) {
        if ( this.myskill[j].nomeskill=="Seguaci")  {
          this.myskill[j].nomeskill="Collaboratori";
        }
        if ( this.myskill[j].nomeskill=="Rifugio")  {
          this.myskill[j].nomeskill="SafeHouse";
        }
      }
    }

    this.note=this.nl2br(this.fulldata['note']);
    this.notemaster=this.nl2br(this.fulldata['notemaster']);

		// console.log(this.fulldata['idclan']);
		switch (this.fulldata['idclan']) {

			case "1":   //  Toreador
				this.link = "https://drive.google.com/file/d/0BwbyMyT-GT-UZ2pKb0RzRlZoaVU/view";
			break;
			case "2":   //  Ventrue
				this.link = "https://drive.google.com/file/d/0BwbyMyT-GT-UTTRodGZXdzdCVXM/view";
			break;
			case "3":		// Nosferatu
				this.link = "https://drive.google.com/file/d/0BwbyMyT-GT-UUDNmT3llNjZ3UXM/view";
			break;
			case "4":		// Brujah
				this.link = "https://drive.google.com/file/d/0BwbyMyT-GT-UNFZURFpYR2pfNVk/view";
			break;
			case "5":		// Gangrel
				this.link = "https://drive.google.com/file/d/0BwbyMyT-GT-UcFRxVFRkNnRLb28/view";
			break;
			case "6":		// Malkavian
				this.link = "https://drive.google.com/file/d/0BwbyMyT-GT-UZ2dRSW1VOGFWNDQ/view";
			break;
			case "7":		// Tremere
				this.link = "https://drive.google.com/file/d/0BwbyMyT-GT-US3d3OEpnbV9Ccjg/view";
			break;
			case "8":		// Lasombra
				this.link = "https://drive.google.com/file/d/1veEpi_TDGZz-xIFbO1PeVfHrprrDISWF/view";
			break;
			case "9":		// Tzimisce
				this.link = "https://drive.google.com/file/d/1AyN-Ofnhw-m5LQcNMFEHYOnLclb-3N_0/view";
			break;
			case "10":	// Assamiti
				this.link = "https://drive.google.com/file/d/0BwbyMyT-GT-ULXpGWkxLNWZhaDg/view";
			break;
			case "11":	// Giovanni
				this.link = "https://drive.google.com/file/d/0BwbyMyT-GT-UYTVUZFlNeEo2N0k/view";
			break;
			case "12":	// Ravnos
				this.link = "https://drive.google.com/file/d/0BwbyMyT-GT-UVTF3QWJ2TzNXZk0/view";
			break;
			case "13":	// Setiti
				this.link = "https://drive.google.com/file/d/0BwbyMyT-GT-UOUo0dll2NjRDOHc/view";
			break;
      case "14":		// Cappadoci
			   this.link = "https://drive.google.com/file/d/1WqSxecMNGQ0ayh6MLGM-FHCP1LaL0khZ/view";
		  break;
			case "20":	// vili
				this.link = "https://drive.google.com/file/d/0BwbyMyT-GT-UOWhsMExKd2YzTVU/view";
			break;
		}
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
    this.notemaster=this.nl2br(this.fulldata['notemaster']);
	}

	openUrl() {

		//const browser = this.iab.create(this.link);
		this.iab.create(this.link,'_system');

	}

  openUrl2() {

    const link = 'https://drive.google.com/file/d/0BwbyMyT-GT-UZFBwNmp4SHZ6SFk/view';
		//const browser = this.iab.create(this.link);
		this.iab.create(link,'_system');

	}

  openUrl3() {

    const link = 'https://drive.google.com/file/d/1RoDz3IopLmZtTK_7zDms7ClkcBlZdI31/view';
		//const browser = this.iab.create(this.link);
		this.iab.create(link,'_system');

	}

  openUrlDT() {

    //console.log (this.myuser);
    var link = this.fulldata['urldt'];
		//const browser = this.iab.create(this.link);
		this.iab.create(link,'_system');

	}

	 //filterItemsLOTzero(){
	 //   return this.myskill.filter(x => x.tipologia == 8).filter(x => x.livello <0);
	 //}

}
