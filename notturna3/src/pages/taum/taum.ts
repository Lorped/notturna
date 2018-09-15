import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService, User } from '../../providers/auth-service/auth-service';
import { Http, Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the TaumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-taum',
  templateUrl: 'taum.html',
})
export class TaumPage {
  myuser: User;
  taum: Array<any>;

  PScorrenti: number;
  PSvuoti: number;

  FurtoVitae = 0 ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private http: Http, private alertCtrl: AlertController) {
    this.myuser=this.auth.getUserInfo();
//  console.log(this.myuser);
    this.PScorrenti=this.myuser.fulldata['PScorrenti'];
    this.PSvuoti=this.myuser.fulldata['psvuoti'];
    this.taum=this.myuser.taum;
//console.log( "corrrenti=" + this.PScorrenti);
//console.log(this.taum);
    let tt = new Date ( this.myuser.fulldata['lastvitae'] );
    let tn = new Date ( );

    let diff = tn.getTime() - tt.getTime();

    if ( diff / (60*1000) > 60 ) {
      this.FurtoVitae = 1 ;
    }
    //console.log (this.myuser);
  }


  gofurto () {
    this.myuser.fulldata['PScorrenti'] = 1*this.myuser.fulldata['PScorrenti'] + 3;
    if ( this.myuser.fulldata['PScorrenti'] > this.myuser.fulldata['setetot'] ) {
      this.myuser.fulldata['PScorrenti'] = 1*this.myuser.fulldata['setetot'] ;
    }
    this.myuser.fulldata['psvuoti'] = 1*this.myuser.fulldata['setetot'] - 1*this.myuser.fulldata['PScorrenti'];



    var link = 'http://www.roma-by-night.it/ionicPHP/caccia.php?id=' + this.myuser['userid']+  '&recuperati=3&vitae=1' ;

    this.http.get(link)
    .map(res => res.json())
    .subscribe( res => {
      this.myuser.fulldata['PScorrenti'] = 1*this.myuser.fulldata['PScorrenti'] + 3;
      if ( this.myuser.fulldata['PScorrenti'] > this.myuser.fulldata['setetot'] ) {
        this.myuser.fulldata['PScorrenti'] = 1*this.myuser.fulldata['setetot'] ;
      }
      this.myuser.fulldata['psvuoti'] = 1*this.myuser.fulldata['setetot'] - 1*this.myuser.fulldata['PScorrenti'];

      this.myuser.fulldata['lastvitae'] = res.last;
      //console.log(this.myuser);
      this.navParams.get("parentPage").loadDadi();
      this.navParams.get("parentPage").loadpscorrenti();

      this.FurtoVitae = 0;

      let alert = this.alertCtrl.create({
          title: 'Uso Patto della Vitae',
          subTitle: 'Rigenerazione della Vitae',
          buttons: ['OK']
        });
        alert.present();

    });
  }


  ionViewDidLoad() {
  }

  gotaum(livellopot: number, pot: string, pot2: string) {
    //console.log(pot2);
    //console.log(livellopot);

    let headers = new Headers();
  	headers.append('Content-Type', 'application/json');
    var url = 'http://www.roma-by-night.it/ionicPHP/usopotere.php';
  	var mypost = JSON.stringify({idutente: this.myuser.userid , potere: pot, livello: livellopot, aTAUMNECRO: pot2});
    this.http.post(url, mypost, {headers})
    .map(res => res.json())
    .subscribe(res =>  {

      //console.log(res);
      let ps=res.ps;
      //console.log(ps);
      //this.navParams.get("parentPage").loadDadi();
      this.myuser.fulldata['psvuoti'] = 1*this.myuser.fulldata['psvuoti']+ps;
      this.myuser.fulldata['PScorrenti'] = 1*this.myuser.fulldata['PScorrenti']-ps;

//console.log( "corrrenti=" + this.PScorrenti);
      this.navParams.get("parentPage").loadDadi();
      this.navParams.get("parentPage").loadpscorrenti();

      let alert = this.alertCtrl.create({
          title: 'Uso '+pot2,
          subTitle: pot,
          buttons: ['OK']
        });
        alert.present();



      if (this.myuser.fulldata['PScorrenti']==0) {
        this.navCtrl.pop();
      }
    });
  }

}
