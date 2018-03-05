import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { RubricaItem } from '../rubrica/rubrica'

/**
 * Generated class for the ChangecontattoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changecontatto',
  templateUrl: 'changecontatto.html',
})
export class ChangecontattoPage {
	
	oldContatto: RubricaItem;
	hasCell = {
		checked: true
	};
	
	hasEmail = {
		checked: true
	};
	
	hasHome = {
		checked: true
	};

	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
		this.oldContatto=this.navParams.get("parentPage").tochange;
		//console.log(this.oldContatto.email);
		//console.log(this.oldContatto.cell);
		if (this.oldContatto.cell==0) {this.hasCell.checked=false;}
		if (this.oldContatto.email==0) {this.hasEmail.checked=false;}
		if (this.oldContatto.home==0) {this.hasHome.checked=false;}
	}

	change(){
		//console.log ("Modifica "+this.oldContatto);
		var url = 'http://www.roma-by-night.it/ionicPHP/changerubrica.php';
		
		this.oldContatto.cell=0;
		this.oldContatto.email=0;
		this.oldContatto.home=0;
		if (this.hasCell.checked == true ) this.oldContatto.cell=1 ; 
		if (this.hasEmail.checked == true ) this.oldContatto.email=1 ; 
		if (this.hasHome.checked == true ) this.oldContatto.home=1 ; 
		var mypost = JSON.stringify({idrubrica: this.oldContatto.idrubrica, contatto: this.oldContatto.contatto, cell: this.oldContatto.cell, email: this.oldContatto.email,  home: this.oldContatto.home, note: this.oldContatto.note });
		
		let headers = new Headers();
		
		headers.append('Content-Type', 'application/json'); 
		
		this.http.post(url, mypost, {headers})
    		.subscribe(res =>  {    
			  
				this.navParams.get("parentPage").loadRubrica();
				this.navCtrl.pop();
		  });

	};

	ionViewDidLoad() {
		//console.log('ionViewDidLoad ChangecontattoPage');
	}

}
