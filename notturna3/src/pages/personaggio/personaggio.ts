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
    //console.log ( this.scheda );
    this.scheda['rd']=Math.floor((1*this.scheda['carisma']+1*this.scheda['intelligenza']+1*this.scheda['prontezza']+1*this.scheda['percezione']+1*this.scheda['fdv'])/5);


    this.pf = ( 3 + 1*this.scheda['attutimento'])*2;


    for (let i = 0 ; i< this.myskill.length ; i++) {
      if ( this.myskill[i].nomeskill == 'Schivare' ) {
        this.pf +=  1*this.myskill[i].livello;
      }
      if ( this.myskill[i].nomeskill == 'Robustezza' ) {
        this.pf +=  1*this.myskill[i].livello;
      }
      if ( this.myskill[i].nomeskill == 'Ferita Permanente' ) {
        this.pf -=  3;
      }
    }
    //console.log ( this.myskill );
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
		var link = 'https://www.roma-by-night.it/ionicPHP/getps.php?id='+this.scheda['idutente'];
		this.http.get(link)
		.map(res => res.json())
      	.subscribe(res =>  {
			this.scheda['PScorrenti']=res['PScorrenti'];
			this.scheda['psvuoti']=res['psvuoti'];
     	 });

    link = 'https://www.roma-by-night.it/ionicPHP/getfdv.php?id='+this.scheda['idutente'];
    this.http.get(link)
    .map(res => res.json())
        .subscribe(res =>  {
      this.scheda['fdvmax']=res['fdvmax'];
      this.scheda['fdv']=res['fdv'];
      this.scheda['rd']=Math.floor((1*this.scheda['carisma']+1*this.scheda['intelligenza']+1*this.scheda['prontezza']+1*this.scheda['percezione']+1*this.scheda['fdv'])/5);
       });
  }

	ionViewDidLoad() {
		//console.log('ionViewDidLoad PersonaggioPage');
	}

}
