import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
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
 * Generated class for the DadiPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-rubrica',
	templateUrl: 'rubrica.html',
})
export class RubricaPage {

	rubrica: RubricaItem[];	
	myuser: User;

	constructor(public navCtrl: NavController, public navParams: NavParams,  private http: Http , private auth: AuthService) {		
		this.myuser=this.auth.getUserInfo();
	}


	loadRubrica() {
    	var url = 'http://www.roma-by-night.it/ionicPHP/rubrica.php?id='+this.myuser['userid'];

		var miarubrica = [];
		
		this.http.get(url)
		.map(data => data.json())
    	.map((res) => {
      		if (res != null) {    

      			for (let i = 0; i < res.length; i++) {
        			let item = res[i];
        			let newRubricaItem = new RubricaItem(item.contatto, item.cell, item.email, item.note);
        			miarubrica.push(newRubricaItem);
      			}						      	
			}
			return miarubrica;
    	})
		.subscribe(	allFeeds => {
        	this.rubrica = allFeeds;
    	});  	
	}


	add() {
		this.navCtrl.push('AddcontattoPage', { "parentPage": this });
		//this.navCtrl.push('AddcontattoPage'); 
	}

	
	ionViewDidLoad() {
		this.loadRubrica();
  	}


}
