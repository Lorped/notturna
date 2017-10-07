import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private app: App) {
  }

  loadUtenti() {
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

  godadi(){
    this.navCtrl.push('DadiPage', { "parentPage": this });
  }

  vedischeda(){
    if ( this.pgscelto ) {
      this.navCtrl.push('PersonaggioPage', { "RequestID": this.pgscelto });
    }
    
  }

	ionViewDidLoad() {
    	this.loadUtenti();
	}
  
  public logoutx() { 
    this.app.getRootNav().setRoot('LoginPage');
  }
}
