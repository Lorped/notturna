import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedProvider, FeedItem } from '../../providers/feed/feed';
import { Http, Headers } from '@angular/http';
import { AuthService, User } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the DadiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dadi',
  templateUrl: 'dadi.html',
})
export class DadiPage {

	tiridado: FeedItem[];
	myuser: User;
	fdv:	number;
	PScorrenti: number;
  psvuoti: number;
  telepatia = false;

  skills: Array<any>;
  poteri: Array<any>;

  cura = 0 ;

	constructor(public navCtrl: NavController, public navParams: NavParams, private feedProvider: FeedProvider , private http: Http , private auth: AuthService) {

		this.myuser=this.auth.getUserInfo();
		this.fdv=this.myuser.fulldata['fdv'];
		this.PScorrenti=this.myuser.fulldata['PScorrenti'];
    this.psvuoti=this.myuser.fulldata['psvuoti'];

    this.skills=this.myuser.skill;
    this.poteri=this.myuser.poteri;
//console.log(this.myuser);

    this.cura = this.myuser.fulldata['rigen'];

		this.loadDadi();
	}

	loadDadi() {
    	this.feedProvider.getDadi(this.myuser['userid']).subscribe(
      	allFeeds => {
        	this.tiridado = allFeeds;
      	});
  	}

	doRefresh(refresher) {
		this.loadDadi();
	  	refresher.complete();
  	}

	ionViewDidLoad() {

  	}

	tiraildado(){

		let headers = new Headers();
    	headers.append('Content-Type', 'application/json');
    	var link = 'http://www.roma-by-night.it/ionicPHP/lanciadado.php';
   		var mypost = JSON.stringify({userid: this.myuser['userid'] });

   		this.http.post(link, mypost, {headers})
      	.subscribe(res =>  {
			setTimeout( this.loadDadi() , 1000);
     	 });

	}

	usafdv(){
		let headers = new Headers();
    	headers.append('Content-Type', 'application/json');
    	var link = 'http://www.roma-by-night.it/ionicPHP/usofdv.php';
   		var mypost = JSON.stringify({userid: this.myuser['userid'] });

   		this.http.post(link, mypost, {headers})
      	.subscribe(res =>  {
			setTimeout( this.loadDadi() , 1000);
     	 });
		this.fdv=this.fdv-1;
		this.myuser.fulldata['fdv']=this.fdv;
    this.myuser.fulldata['rd']=Math.floor((1*this.fdv+1*this.myuser.fulldata['carisma']+1*this.myuser.fulldata['intelligenza']+1*this.myuser.fulldata['percezione']+1*this.myuser.fulldata['prontezza'])/5);
		this.auth.setUserInfo(this.myuser);
//console.log(this.fdv);
	}

	menops(){


    	var link = 'http://www.roma-by-night.it/ionicPHP/menops2.php?id='+this.myuser['userid']

   		this.http.get(link)
      	.subscribe(res =>  {
			setTimeout( this.loadDadi() , 1000);
     	 });
		this.PScorrenti=this.PScorrenti-1;
    this.psvuoti=this.psvuoti+1;
		this.myuser.fulldata['PScorrenti']=this.PScorrenti;
		this.myuser.fulldata['psvuoti']=1*this.myuser.fulldata['psvuoti']+1;
		this.auth.setUserInfo(this.myuser);
		//personaggio.psvuoti=personaggio.psvuoti-1;
//console.log(this.fdv);
	}

  gocaccia() {
		//console.log (this.tochange.cell);
		//console.log (this.tochange.email);
		this.navCtrl.push('CacciaPage', { "parentPage": this } );
	}

  golegami() {
    //console.log (this.tochange.cell);
    //console.log (this.tochange.email);
    this.navCtrl.push('LegamiPage', { "parentPage": this } );
  }



  gomorte() {
		//console.log (this.tochange.cell);
		//console.log (this.tochange.email);
		this.navCtrl.push('MortePage', { "parentPage": this } );
	}

  godisciplina(disc: number, nomed: string) {
		//console.log (this.tochange.cell);
		//console.log (this.tochange.email);
    if (disc == 98) {
      this.navCtrl.push('TaumPage', { "parentPage": this  } );
    } else if (disc == 99) {
      this.navCtrl.push('NecroPage', { "parentPage": this  } );
    } else {
      this.navCtrl.push('PoteriPage', { "parentPage": this ,  "aDisciplina": disc , "nomed": nomed} );
  	}
	}

  loadpscorrenti() {

    this.PScorrenti=this.myuser.fulldata['PScorrenti'];
    this.psvuoti=this.myuser.fulldata['psvuoti'];
    //console.log('here dadi'+this.PScorrenti);
  }
}
