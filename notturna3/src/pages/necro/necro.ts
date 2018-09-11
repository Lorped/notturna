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
  selector: 'page-necro',
  templateUrl: 'necro.html',
})
export class NecroPage {
  myuser: User;
  necro: Array<any>;

  PScorrenti: number;
  PSvuoti: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private http: Http,  private alertCtrl: AlertController) {
    this.myuser=this.auth.getUserInfo();
//  console.log(this.myuser);
    this.PScorrenti=this.myuser.fulldata['PScorrenti'];
    this.PSvuoti=this.myuser.fulldata['psvuoti'];
    this.necro=this.myuser.necro;
//console.log( "corrrenti=" + this.PScorrenti);
//console.log(this.necro);
  }

  ionViewDidLoad() {
  }

  gonecro(livellopot: number, pot: string, pot2: string) {
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
