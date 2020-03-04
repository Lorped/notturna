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
  selector: 'page-personaggio',
  templateUrl: 'personaggio.html',
})
export class PersonaggioPage {


	scheda: Array<any>;
  myskill: Array<any>;
  myuser: User;

  pf = 0 ;
  rp = 0 ;

	//psvuoti: number;

	constructor( private auth: AuthService , private app: App , private http: Http ) {

		this.scheda=this.auth.getUserPGInfo();
    this.myskill=this.auth.getUserSKILLInfo();
    this.myuser=this.auth.getUserInfo();

    // console.log ( this.myuser );
    this.scheda['forza']=Number(this.scheda['forza']);
    this.scheda['destrezza']=Number(this.scheda['destrezza']);
    this.scheda['attutimento']=Number(this.scheda['attutimento']);
    this.scheda['carisma']=Number(this.scheda['carisma']);
    this.scheda['persuasione']=Number(this.scheda['persuasione']);
    this.scheda['saggezza']=Number(this.scheda['saggezza']);
    this.scheda['prontezza']=Number(this.scheda['prontezza']);
    this.scheda['intelligenza']=Number(this.scheda['intelligenza']);
    this.scheda['percezione']=Number(this.scheda['percezione']);

    this.scheda['PScorrenti']=Number(this.scheda['PScorrenti']);
    this.scheda['psvuoti']=Number(this.scheda['psvuoti']);

    this.scheda['fdv']=Number(this.scheda['fdv']);

    this.scheda['fama1']=Number(this.scheda['fama1']);
    this.scheda['fama2']=Number(this.scheda['fama2']);
    this.scheda['fama3']=Number(this.scheda['fama3']);


    // this.scheda['rd']=Math.floor((1*this.scheda['carisma']+1*this.scheda['intelligenza']+1*this.scheda['prontezza']+1*this.scheda['percezione']+1*this.scheda['fdv'])/5);
    this.scheda['rd']=Math.floor((this.scheda['carisma']+this.scheda['intelligenza']+this.scheda['prontezza']+this.scheda['percezione']+this.scheda['fdv'])/5);

    // this.pf = ( 3 + 1*this.scheda['attutimento'])*2;
    this.pf = ( 3 + this.scheda['attutimento'])*2;

    this.rp = Math.floor ( this.scheda['attutimento'] / 2 ) ;

    for (let i = 0 ; i< this.myskill.length ; i++) {
      this.myskill[i].livello = Number (this.myskill[i].livello);

      if ( this.myskill[i].nomeskill == 'Schivare' ) {
        this.pf +=  this.myskill[i].livello;
      }
      if ( this.myskill[i].nomeskill == 'Robustezza' ) {
        this.pf +=  this.myskill[i].livello;

        this.rp = Math.floor ( ( this.scheda['attutimento'] + this.myskill[i].livello ) / 2 ) ;

        // vedo se ha poteri attivi
        for (let j = 0 ; j< this.myuser.poteri.length ; j++) {
          if (this.myuser.poteri[j].iddisciplina == 12) {
            for (let k = 0 ; k< this.myuser.poteri[j].poteri.length ; k++) {
              // console.log(this.myuser.poteri[j].poteri[k]);
              if (this.myuser.poteri[j].poteri[k].nomepotere=='Resilienza') this.pf += 5 + this.myskill[i].livello;
              if (this.myuser.poteri[j].poteri[k].nomepotere=='Sconfiggere le Debolezze') this.pf += 5 ; //perchè +5 da liv.1
            }
          }
        }


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
		var link = 'https://www.roma-by-night.it/ionicPHP/getps.php?id='+this.scheda['idutente'];
		this.http.get(link)
		.map(res => res.json())
      	.subscribe(res =>  {
			this.scheda['PScorrenti'] = Number ( res['PScorrenti'] );
			this.scheda['psvuoti'] = Number (res['psvuoti'] );
     	 });

    link = 'https://www.roma-by-night.it/ionicPHP/getfdv.php?id='+this.scheda['idutente'];
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
