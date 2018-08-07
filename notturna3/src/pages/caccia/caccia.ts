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

  maxTime: any = 10*60;  /* 10 minuti */
  minuti = 10 ;
  secondi = 0;
  hidevalue = false ;
  timer: any;


  myuser: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http , private auth: AuthService ) {
  }

  ionViewDidLoad() {
    this.myuser=this.auth.getUserInfo();
    console.log(this.myuser);
    this.maxTime=12;
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
            console.log("here");
            this.msgfine();
            this.navParams.get("parentPage").loadDadi();
          }

      }, 1000);

  }

  msginizio(){

    console.log("send inizio");
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var link = 'http://www.roma-by-night.it/ionicPHP/msgtomaster.php';
      var mypost = JSON.stringify({idutente: this.myuser['userid'] , messaggio: 'ha iniziato la caccia'});

      this.http.post(link, mypost, {headers})
        .subscribe();

  }
  msgfine(){

    console.log("send fine");
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var link = 'http://www.roma-by-night.it/ionicPHP/msgtomaster.php';
      var mypost = JSON.stringify({idutente: this.myuser['userid'] , messaggio: 'ha terminato la caccia'});

      this.http.post(link, mypost, {headers})
        .subscribe();

  }


}
