import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService, User } from '../../providers/auth-service/auth-service';

export class RubricaItem {
	contatto: string;
	cell: number;
	email: number;
	note: string;
 
	constructor(contatto: string, cell: number, email: number, note: string) {
		this.contatto = contatto;
		this.cell = cell;
		this.email = email;
		this.note = note;
	}
}


/**
 * Generated class for the AddcontattoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcontatto',
  templateUrl: 'addcontatto.html',
})
export class AddcontattoPage {
	myuser: User;
	
	nuovoContatto= new RubricaItem('',0,0,'');

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthService, public http: Http ) {
	  this.myuser=this.auth.getUserInfo();
  }

	add () {
		var url = 'http://www.roma-by-night.it/ionicPHP/addrubrica.php';
		var mypost = JSON.stringify({idutente: this.myuser.userid, contatto: this.nuovoContatto.contatto, cell: this.nuovoContatto.cell, email: this.nuovoContatto.email, note: this.nuovoContatto.note });
		
		let headers = new Headers();
		
		headers.append('Content-Type', 'application/json'); 
		
		this.http.post(url, mypost, headers)
    		.subscribe(res =>  {    
			  
				this.navParams.get("parentPage").loadRubrica();
				this.navCtrl.pop();
		  });
	}


  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddcontattoPage');
  }

}
