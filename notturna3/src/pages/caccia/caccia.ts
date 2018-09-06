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
  selector: 'page-caccia',
  templateUrl: 'caccia.html',
})
export class CacciaPage {

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

    for (let i = 0 ; i< this.myskill.length ; i++) {
      if ( this.myskill[i].nomeskill == 'Animalità' ) {
        if ( this.myskill[i].livello > 0 ) {
          this.animalita = true;
        };
      }
      if ( this.myskill[i].nomeskill == 'Gregge' ) {
        if ( this.myskill[i].livello > 0 ) {
          this.gregge = this.myskill[i].livello;
        };
      }
    }

    // console.log ( this.myuser );
    // console.log ( this.myuser.fulldata['lastcaccia'] );
    let tt = new Date ( this.myuser.fulldata['lastcaccia'] );
    let tn = new Date ( );

    let diff = tn.getTime() - tt.getTime();

    //console.log (tt);
    //console.log (tn);
    //console.log (diff);
    if ( this.animalita == true && diff > 60*60*1000 ) {
      this.maxTime = 180;
      this.minuti = '03';
      this.recuperati = 3 ;
    } else {
      this.animalita = false;
      this.recuperati = 5 ;
      if ( this.gregge > 0 ) {
        this.maxTime = 600 - 60*this.gregge;
        if (this.gregge == 5 ) { this.maxTime -= 60; }
        this.minuti = '0' + this.maxTime/60;
      } else {
        this.maxTime = 600;
        this.minuti = 10;
      }
    };

    if ( 1*this.myuser.fulldata['sete'] - 1*this.myuser.fulldata['PScorrenti'] < this.recuperati ) {
      this.recuperati = 1*this.myuser.fulldata['ps'] - 1*this.myuser.fulldata['PScorrenti'] ;
    }

    /* valori ridotti per test
    this.maxTime = 10
    this.minuti = '00';
    this.secondi = '10';
    */

    this.msginizio();
    this.StartTimer();
  }




  StartTimer(){
    this.timer = setTimeout(x =>
      {
          if(this.maxTime <= 0) { }
          this.maxTime -= 1;
          this.minuti = Math.floor(this.maxTime/60);
          this.secondi = this.maxTime - 60*Math.floor(this.maxTime/60);
          if (this.secondi<10) { this.secondi='0'+this.secondi ;}
          if (this.minuti<10) { this.minuti='0'+this.minuti ;}

          if(this.maxTime > 0) {
            this.hidevalue = false;
            this.StartTimer();
          } else{
            this.hidevalue = true;

            //console.log("FINE");

            this.msgfine();
            this.navParams.get("parentPage").loadDadi();
          }

      }, 1000);

  }

  msginizio(){

    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var link = 'http://www.roma-by-night.it/ionicPHP/msgtomaster.php';
      var mypost = JSON.stringify({idutente: this.myuser['userid'] , messaggio: 'ha iniziato la caccia'});

      this.http.post(link, mypost, {headers})
        .subscribe();

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
