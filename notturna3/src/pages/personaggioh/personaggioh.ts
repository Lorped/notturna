import { Component } from '@angular/core';
import { App, IonicPage } from 'ionic-angular';
import { AuthService, User } from '../../providers/auth-service/auth-service';
import { Http } from '@angular/http';



/**
 * Generated class for the PersonaggioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personaggioh',
  templateUrl: 'personaggioh.html',
})
export class PersonaggiohPage {


	scheda: Array<any>;
  myskill: Array<any>;
  myuser: User;

  pf = 0 ;
  status = '';

	//psvuoti: number;

	constructor( private auth: AuthService , private app: App , private http: Http ) {

		this.scheda=this.auth.getUserPGInfo();
    this.myskill=this.auth.getUserSKILLInfo();
    this.myuser=this.auth.getUserInfo();

    //console.log ( this.myuser );

    this.scheda['forza']=Number(this.scheda['forza']);
    this.scheda['destrezza']=Number(this.scheda['destrezza']);
    this.scheda['attutimento']=Number(this.scheda['attutimento']);
    this.scheda['carisma']=Number(this.scheda['carisma']);
    this.scheda['persuasione']=Number(this.scheda['persuasione']);
    this.scheda['saggezza']=Number(this.scheda['saggezza']);
    this.scheda['prontezza']=Number(this.scheda['prontezza']);
    this.scheda['intelligenza']=Number(this.scheda['intelligenza']);
    this.scheda['percezione']=Number(this.scheda['percezione']);


    this.scheda['fdv']=Number(this.scheda['fdv']);

    switch ( this.scheda['idstatus']) {
      case '1' : {
        this.status = this.scheda['lvl1'];
        break;
      }
      case '2' : {
        this.status = this.scheda['lvl2'];
        break;
      }
      case '3' : {
        this.status = this.scheda['lvl3'];
        break;
      }
    }


    // this.scheda['rd']=Math.floor((1*this.scheda['carisma']+1*this.scheda['intelligenza']+1*this.scheda['prontezza']+1*this.scheda['percezione']+1*this.scheda['fdv'])/5);
    this.scheda['rd']=Math.floor((this.scheda['carisma']+this.scheda['intelligenza']+this.scheda['prontezza']+this.scheda['percezione']+this.scheda['fdv'])/5);

    // this.pf = ( 3 + 1*this.scheda['attutimento'])*2;
    this.pf = ( 3 + this.scheda['attutimento'])*2;


    for (let i = 0 ; i< this.myskill.length ; i++) {
      this.myskill[i].livello = Number (this.myskill[i].livello);

      if ( this.myskill[i].nomeskill == 'Schivare' ) {
        this.pf +=  this.myskill[i].livello;
      }

      if ( this.myskill[i].nomeskill == 'Ferita Permanente' ) {
        this.pf -=  3;
      }
      if ( this.myskill[i].nomeskill == 'Nove Vite' ) {
        this.pf +=  10;
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


    var link = 'https://www.roma-by-night.it/ionicPHP/getfdv.php?id='+this.scheda['idutente'];
    this.http.get(link)
    .map(res => res.json())
        .subscribe(res =>  {
      this.scheda['fdvmax'] = Number (res['fdvmax'] );
      this.scheda['fdv'] = Number (res['fdv'] );
      this.scheda['rd'] = Math.floor((this.scheda['carisma']+this.scheda['intelligenza']+this.scheda['prontezza']+this.scheda['percezione']+this.scheda['fdv'])/5);
       });
  }

	ionViewDidLoad() {
		//console.log('ionViewDidLoad PersonaggioPage');
	}

}
