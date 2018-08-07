import { Component } from '@angular/core';
import { App, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Http } from '@angular/http';



/**
 * Generated class for the PersonaggioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personaggio',
  templateUrl: 'personaggio.html',
})
export class PersonaggioPage {


	scheda: Array<any>;
  myskill: Array<any>;

  pf = 0 ;
	//psvuoti: number;

	constructor( private auth: AuthService , private app: App , private http: Http ) {

		this.scheda=this.auth.getUserPGInfo();
    this.myskill=this.auth.getUserSKILLInfo();

    this.pf = ( 3 + 1*this.scheda['attutimento'])*2;
    // console.log ( this.scheda );

    for (let i = 0 ; i< this.myskill.length ; i++) {
      if ( this.myskill[i].nomeskill == 'Schivare' ) {
        this.pf +=  1*this.myskill[i].livello;
      }
      if ( this.myskill[i].nomeskill == 'Robustezza' ) {
        this.pf +=  1*this.myskill[i].livello;
      }
    }
    //console.log ( this.currentUser );
    //console.log ( 'PF =' + this.pf );

	}

	public logoutx() {
		//this.nav.setRoot('LoginPage');
		this.app.getRootNav().setRoot('LoginPage');
	}

	doRefresh(refresher) {
		this.loadPS();
	  	refresher.complete();
  	}

  	loadPS() {
		var link = 'http://www.roma-by-night.it/ionicPHP/getps.php?id='+this.scheda['idutente'];
		this.http.get(link)
		.map(res => res.json())
      	.subscribe(res =>  {
			this.scheda['PScorrenti']=res['PScorrenti'];
			this.scheda['psvuoti']=res['psvuoti'];
     	 });
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad PersonaggioPage');
	}

}
