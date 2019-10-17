import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Condizione } from '../global';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the EditcondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editcond',
  templateUrl: 'editcond.html',
})
export class EditcondPage {

  condizione: Condizione;

  condA: Array<string> = ['Forza', 'Destrezza', 'Attutimento',
    'Carisma', 'Persuasione', 'Saggezza',
    'Percezione', 'Intelligenza', 'Prontezza'] ;

  condD: Array<any>;
  condP: Array<any>;
  condS: Array<any>;

  newcond: number;





  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.condizione = this.navParams.get("condizione");
    this.caricacond ();
    // console.log(this.condizione);
    this.newcond = Number(this.condizione.con.tabcond);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EditcondPage');
  }

  caricacond () {
    var url = 'https://www.roma-by-night.it/ionicPHP/listpoteridiscipline.php';

		this.http.get(url)
      .map(data => data.json())
    	.subscribe(res =>  {
        // console.log(res);
        this.condD = res[0].discipline;
        this.condP = res[0].poteri;
        this.condS = res[0].skill;
        // console.log (this.condS);
        // console.log (this.condD);
      });
  }

  modifica() {

    this.condizione.con.tabcond = this.newcond.toString();
    // console.log ("tabcond " + this.newcond);
    // console.log ("valcond " + this.condizione.con.valcond);
    // console.log ("newdescr " + this.condizione.con.descrX);
    // console.log ("cc " + this.condizione.cc);



    switch (this.condizione.con.tipocond) {
      case 'A': {
        this.condizione.cc = this.condA[this.newcond-1];
        break;
      }
      case 'P': {
        this.condizione.cc = this.condP.find(x=>x.idpotere == this.newcond).nomepotere;
        break;
      }
      case 'D': {
        this.condizione.cc = this.condD.find(x=>x.iddisciplina == this.newcond).nomedisc;
        break;
      }
      case 'S': {
        this.condizione.cc = this.condS.find(x=>x.idskill == this.newcond).nomeskill;
        break;
      }
    };

    // console.log ("cc " + this.condizione.cc);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var link = 'https://www.roma-by-night.it/ionicPHP/changecond.php';
    var mypost = JSON.stringify({idcondizione: this.condizione.con.idcondizione, tabcond: this.newcond , valcond: this.condizione.con.valcond, descrX: this.condizione.con.descrX });

    this.http.post(link, mypost, {headers} )
    .subscribe(res =>  {

      alert("Condizione modificata");

      // console.log (this.condizione);

			//save if required
    });

  }

}
