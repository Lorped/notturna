import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { AuthService, User } from '../../providers/auth-service/auth-service';


/**
 * Generated class for the ModificanotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificanote',
  templateUrl: 'modificanote.html',
})
export class ModificanotePage {
	
	myuser: User;

	annotazioni: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, public http: Http ) {
	  this.myuser=this.auth.getUserInfo() ;
	  this.annotazioni=this.myuser.fulldata['note'];
  }

	modifica () {
		var url = 'http://www.roma-by-night.it/ionicPHP/modificanote.php';
		var mypost = JSON.stringify({idutente: this.myuser.userid, note: this.annotazioni });
		
		let headers = new Headers();
		
		headers.append('Content-Type', 'application/json'); 
		
		this.http.post(url, mypost, headers)
    		.subscribe(res =>  {    
			  
				this.myuser.fulldata['note']=this.annotazioni;
				this.navParams.get("parentPage").reloadnote();
				this.navCtrl.pop();
		  });
	}




  ionViewDidLoad() {
    //console.log('ionViewDidLoad ModificanotePage');
  }

}
