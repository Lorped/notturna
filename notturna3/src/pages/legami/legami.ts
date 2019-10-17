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

export class Legame {
	nomepg: string = '';
	livello: number = 0;
  dataultima: string = '';
}

/**
 * Generated class for the LegamiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-legami',
  templateUrl: 'legami.html',
})
export class LegamiPage {

  listautenti: Utente[];
  pgscelto: number;
  selected: string;

  myuser: User;

  listalegami: Legame[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private auth: AuthService) {
    this.myuser=this.auth.getUserInfo();
    //console.log(this.myuser);
    this.loadUtenti(this.myuser.userid);

    var url = 'https://www.roma-by-night.it/ionicPHP/getlegami.php?id='+this.myuser.userid;
    this.http.get(url)
    .map(res => res.json())
    .subscribe(res =>  {

        this.listalegami = res.target;
        //console.log (this.listalegami);
    });
  }

  ionViewDidLoad() {



  }

  loadUtenti(a: string) {
		var url = 'https://www.roma-by-night.it/ionicPHP/utenti.php?excl='+a;

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
    var url = 'https://www.roma-by-night.it/ionicPHP/legami.php';
    var mypost = JSON.stringify({target: this.myuser.userid , domitor: this.pgscelto });

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    this.http.post(url, mypost, {headers})
    .subscribe(res =>  {
        this.navParams.get("parentPage").loadDadi();
        this.navCtrl.pop();
    });

    //console.log(mypost);
  }

}
