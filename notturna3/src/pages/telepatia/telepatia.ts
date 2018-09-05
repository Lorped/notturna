import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { AuthService, User } from '../../providers/auth-service/auth-service';

export class Utente {
	nomepg: string;
	id: number;

	constructor(nomepg: string, id: number) {
		this.nomepg = nomepg;
		this.id = id;
	}

}

/**
 * Generated class for the TelepatiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-telepatia',
  templateUrl: 'telepatia.html',
})
export class TelepatiaPage {

  listautenti: Utente[];
  pgscelto: number;
  selected: string;

  myuser: User;
  messaggio: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private auth: AuthService) {
    this.myuser=this.auth.getUserInfo();
    //console.log(this.myuser);
    this.loadUtenti(this.myuser.userid);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TelepatiaPage');
  }

  loadUtenti(a: string) {
		var url = 'http://www.roma-by-night.it/ionicPHP/utenti.php?excl='+a;

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

  invia () {
		var url = 'http://www.roma-by-night.it/ionicPHP/inviamessaggioutente.php';
		var mypost = JSON.stringify({idutente: this.myuser.userid , destinatario: this.pgscelto, messaggio: this.messaggio });

		let headers = new Headers();

		headers.append('Content-Type', 'application/json');

		this.http.post(url, mypost, {headers})
		.subscribe(res =>  {
        //this.navParams.get("parentPage").loadDadi();
				this.myuser.fulldata['psvuoti'] = 1*this.myuser.fulldata['psvuoti']+1;
				this.myuser.fulldata['PScorrenti'] = 1*this.myuser.fulldata['PScorrenti']-1;
				this.navCtrl.pop();
		});

		//console.log(mypost);
	}


}
