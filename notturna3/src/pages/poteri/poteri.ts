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

  PScorrenti: number;
  PSvuoti: number;
  CacciaAnimalita = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private http: Http) {

    this.myuser=this.auth.getUserInfo();
    this.PScorrenti=this.myuser.fulldata['PScorrenti'];
    this.PSvuoti=this.myuser.fulldata['psvuoti']
    this.poteri=this.myuser.poteri;

    let tt = new Date ( this.myuser.fulldata['lastcaccia'] );
    let tn = new Date ( );

    let diff = tn.getTime() - tt.getTime();

    if ( diff / (60*1000) > 60 ) {
      this.CacciaAnimalita = 1 ;
    }


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
    } else if (pot =="Richiamo" && livellopot==3)  {  //non è il richiamo di Ascendente 4
       //this.navCtrl.push('Caccia2Page', { "parentPage": this } );
       this.cacciaanim();
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
        this.navParams.get("parentPage").loadpscorrenti();
        if (this.myuser.fulldata['PScorrenti']==0) {
          this.navCtrl.pop();
        }
      });
    }
  }

  cacciaanim() {
    this.myuser.fulldata['PScorrenti'] = 1*this.myuser.fulldata['PScorrenti'] + 3;
    if ( this.myuser.fulldata['PScorrenti'] > this.myuser.fulldata['setetot'] ) {
      this.myuser.fulldata['PScorrenti'] = 1*this.myuser.fulldata['setetot'] ;
    }
    this.myuser.fulldata['psvuoti'] = 1*this.myuser.fulldata['setetot'] - 1*this.myuser.fulldata['PScorrenti'];

    var link = 'http://www.roma-by-night.it/ionicPHP/caccia.php?id=' + this.myuser['userid']+  '&recuperati=3&anim=1' ;

    this.http.get(link)
    .map(res => res.json())
    .subscribe( res => {
      this.myuser.fulldata['lastcaccia'] = res.last;
      //console.log(this.myuser);
      this.navParams.get("parentPage").loadDadi();
      this.navParams.get("parentPage").loadpscorrenti();
      this.navCtrl.pop();
    });


  }
}
