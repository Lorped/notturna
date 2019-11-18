import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export class Utente {
	nomepg: string;
	id: number;
	type: string;

	constructor(nomepg: string, id: number, type: string) {
		this.nomepg = nomepg;
		this.id = id;
		this.type = type;
	}

}



/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})
export class HomePage {

	listautenti: Utente[];
	pgscelto: number;
	selected: string;

	oggetto: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private app: App , private barcodeScanner: BarcodeScanner) {
	}

	loadUtenti() {
		var url = 'https://www.roma-by-night.it/ionicPHP/utenti.php?incl=H';

			var mialista = [];

			this.http.get(url)
			.map(data => data.json())
			.map((res) => {
				//console.log(res);
				if (res != null) {
					for (let i = 0; i < res.V.length; i++) {
						let item = res.V[i];
						let newutente = new Utente(item.nomepg, item.idutente, 'V');
						mialista.push(newutente);
					}
					for (let i = 0; i < res.H.length; i++) {
						let item = res.H[i];
						let newutente = new Utente(item.nomepg+' (H)', item.idutente, 'H');
						mialista.push(newutente);
					}
				}
				return mialista;
			})
			.subscribe(	allFeeds => {
				this.listautenti = allFeeds;
			});
	}

	godadi(){
		this.navCtrl.push('DadiPage', { "parentPage": this });
	}

	godiablerie(){
		this.navCtrl.push('DiableriePage', { "parentPage": this });
	}

	golistaoggetti(){
		this.navCtrl.push('ListaoggettiPage', { "parentPage": this });
	}

	vedischeda(){
		if ( this.pgscelto ) {
			for ( let i = 0 ; i < this.listautenti.length; i++) {
				if (this.listautenti[i].id == this.pgscelto) {
					//console.log(this.listautenti[i]);
					if (this.listautenti[i].type == 'V') { this.navCtrl.push('PersonaggioPage', { "RequestID": this.pgscelto }); }
					if (this.listautenti[i].type == 'H') { this.navCtrl.push('PersonaggiohPage', { "RequestID": this.pgscelto }); }
				}
			}
		}
	}

	inviamessaggio(){
		if ( this.pgscelto ) {
			this.navCtrl.push('SendmessaggioPage', { "RequestID": this.pgscelto });
		}
	}

	openbarcode() {

		// this.oggetto="451570519804";
		// this.navCtrl.push('ModificaPage', { "parentPage": this });

		this.barcodeScanner.scan( {"showTorchButton": true} ).then((barcodeData) => {
			// Success! Barcode data is here
			// console.log(barcodeData.text);

			this.oggetto=barcodeData.text;
			this.navCtrl.push('ModificaPage', { "parentPage": this });

		}, (err) => {
				// An error occurred
		});

	}

	ionViewDidLoad() {
    	this.loadUtenti();
	}

	loadoggetti() {
		// Dummy!
	}

	public logoutx() {
		this.app.getRootNav().setRoot('LoginPage');
	}
}
