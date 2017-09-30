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
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private feedProvider: FeedProvider , private http: Http , private auth: AuthService) {
		
		this.myuser=this.auth.getUserInfo();
		this.loadDadi();
	}

	loadDadi() {
    	this.feedProvider.getDadi().subscribe(
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
		 
   		this.http.post(link, mypost, headers)
      	.subscribe(res =>  {     
			setTimeout( this.loadDadi() , 1000); 
     	 });
	}

}
