import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';


export class Utente {
	nomepg: string;
	id: number;

	constructor(nomepg: string, id: number) {
		this.nomepg = nomepg;
		this.id = id;
	}

}

/**
 * Generated class for the DiableriePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diablerie',
  templateUrl: 'diablerie.html',
})
export class DiableriePage {


  listautenti: Utente[];
  diablerista = '';
  vittima = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public http: Http) {

    var url = 'http://www.roma-by-night.it/ionicPHP/utenti.php';

		var mialista = [];

		this.http.get(url)
		.map(data => data.json())
		.map((res) => {
			if (res != null) {
				for (let i = 0; i < res.length; i++) {
					let item = res[i];
					let newutente = new Utente(item.nomepg, item.idutente);
					mialista.push(newutente);
				}
			}
			return mialista;
		})
		.subscribe(	allFeeds => {
			this.listautenti = allFeeds;
		});

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DiableriePage');
  }

  effettuadiablerie() {
    let alert = this.alertCtrl.create({
    title: 'Conferma',
    message: 'Confermi la Diablerie?',
    buttons: [
      {
        text: 'NO',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      },
      {
        text: 'SI',
        handler: () => {
          var url = 'http://www.roma-by-night.it/ionicPHP/diablerie.php?diabl=' + this.diablerista + '&vittima=' + this.vittima;

          this.http.get(url)
          .subscribe(	res => {
      			let alert = this.alertCtrl.create({
		            title: 'Diablerie terminata',
		            buttons: ['OK']
		          });
		          alert.present();
      		});

        }
      }
    ]
  });
  alert.present();
  }

}
