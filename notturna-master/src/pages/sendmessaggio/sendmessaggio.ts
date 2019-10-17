import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';





/**
 * Generated class for the SendmessaggioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendmessaggio',
  templateUrl: 'sendmessaggio.html',
})
export class SendmessaggioPage {
	
	public	requestID;
	messaggio: string;
	myrequestID:	string;

	constructor(public navCtrl: NavController, public navParams: NavParams,  public http: Http ) {
		this.myrequestID = navParams.get("RequestID");
		
	}
	  
	  

	invia () {
		var url = 'https://www.roma-by-night.it/ionicPHP/inviamessaggio.php';
		var mypost = JSON.stringify({idutente: -1 , destinatario: this.myrequestID, messaggio: this.messaggio });
		
		let headers = new Headers();
		
		headers.append('Content-Type', 'application/json'); 
		
		this.http.post(url, mypost, {headers})
		.subscribe(res =>  {    
				this.navCtrl.pop();
		});
		
		//console.log(mypost);
	}




	ionViewDidLoad() {
		//console.log('ionViewDidLoad SendmessaggioPage');
	}

}
