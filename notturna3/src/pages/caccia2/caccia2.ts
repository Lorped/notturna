import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { AuthService, User } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the CacciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-caccia2',
  templateUrl: 'caccia2.html',
})
export class Caccia2Page {

  maxTime: any = 600;  /* 10 minuti */
  minuti: any = 10 ;
  secondi: any = '00';
  hidevalue = false ;
  timer: any;


  myuser: User;
  myskill: Array<any>;
  animalita = false;
  gregge = 0 ;
  recuperati = 0 ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http , private auth: AuthService ) {
  }

  ionViewDidLoad() {
    this.myuser=this.auth.getUserInfo();
    this.myskill=this.auth.getUserSKILLInfo();
    //console.log(this.myskill);

    this.myuser.fulldata['PScorrenti'] = 1*this.myuser.fulldata['PScorrenti'] + 3;
    if ( this.myuser.fulldata['PScorrenti'] > this.myuser.fulldata['setetot'] ) {
      this.myuser.fulldata['PScorrenti'] = 1*this.myuser.fulldata['setetot'] ;
    }
    this.myuser.fulldata['psvuoti'] = 1*this.myuser.fulldata['setetot'] - 1*this.myuser.fulldata['PScorrenti'];



    var link = 'http://www.roma-by-night.it/ionicPHP/caccia.php?id=' + this.myuser['userid']+  '&recuperati=3&anim=1' ;

    this.http.get(link)
    .subscribe( res => {
      this.navParams.get("parentPage").loadDadi();
      this.navParams.get("parentPage").loadpscorrenti();
      this.navCtrl.pop();
    });
  



  }





  msgfine(){


    this.myuser.fulldata['PScorrenti'] = 1*this.myuser.fulldata['PScorrenti'] + this.recuperati;

    if ( this.myuser.fulldata['PScorrenti'] > this.myuser.fulldata['ps'] ) {

      this.myuser.fulldata['PScorrenti'] = 1*this.myuser.fulldata['ps'] ;
    }
    this.myuser.fulldata['psvuoti'] = 1*this.myuser.fulldata['ps'] - 1*this.myuser.fulldata['PScorrenti'];

//console.log(this.myuser.fulldata);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var link = 'http://www.roma-by-night.it/ionicPHP/msgtomaster.php';
    var mypost = JSON.stringify({idutente: this.myuser['userid'] , messaggio: 'ha terminato la caccia'});

    this.http.post(link, mypost, {headers})
    .subscribe( res => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var link = 'http://www.roma-by-night.it/ionicPHP/caccia.php?id=' + this.myuser['userid']+  '&recuperati=' + this.recuperati + '&anim=' + this.animalita ;

      this.http.get(link)
      .subscribe( res => {
        this.navParams.get("parentPage").loadDadi();
      });

    } );

  }


}
