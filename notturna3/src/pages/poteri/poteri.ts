import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService, User } from '../../providers/auth-service/auth-service';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the PoteriPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-poteri',
  templateUrl: 'poteri.html',
})
export class PoteriPage {

  public		aDisciplina;
  myuser: User;
  poteri: Array<any>;

  aNomedisc = '';
  aPoteri: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private http: Http) {

    this.myuser=this.auth.getUserInfo();
    this.poteri=this.myuser.poteri;

    this.aDisciplina = navParams.get("aDisciplina");
    //console.log(this.poteri.length );
    //console.log(this.poteri );
    //console.log(this.aDisciplina );

    for (let i=0 ; i< this.poteri.length ; i++) {
      if (this.poteri[i].iddisciplina == this.aDisciplina) {
        this.aNomedisc = this.poteri[i].nomedisc;
        this.aPoteri = this.poteri[i].poteri;

        //console.log(this.aPoteri);
      }
    }

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PoteriPage');
  }


  gopotere(pot: string,livellopot: number) {
    //console.log(pot);
    //console.log(livellopot);
    if (pot == "Telepatia") {
      this.navCtrl.push('TelepatiaPage', { "parentPage": this } );
    } else {
      let headers = new Headers();
  		headers.append('Content-Type', 'application/json');
      var url = 'http://www.roma-by-night.it/ionicPHP/usopotere.php';
  		var mypost = JSON.stringify({idutente: this.myuser.userid , potere: pot, livello: livellopot, aDisciplina: this.aDisciplina});
      this.http.post(url, mypost, {headers})
      .map(res => res.json())
      .subscribe(res =>  {

          //console.log(res);
          let ps=res.ps;
          //console.log(ps);
          //this.navParams.get("parentPage").loadDadi();
          this.myuser.fulldata['psvuoti'] = 1*this.myuser.fulldata['psvuoti']+ps;
          this.myuser.fulldata['PScorrenti'] = 1*this.myuser.fulldata['PScorrenti']-ps;

          this.navParams.get("parentPage").loadDadi();
          if (this.myuser.fulldata['PScorrenti']==0) {
            this.navCtrl.pop();
          }

      });

    }

  }

}
