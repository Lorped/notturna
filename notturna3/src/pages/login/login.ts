import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from '../../providers/auth-service/auth-service';

import { Push, PushObject, PushOptions } from '@ionic-native/push';


export class User {
  username: string;
  userid: string;
  fulldata: Array<any>;
  skill: Array<any>;
  poteri: Array<any>;
  taum: Array<any>;
  necro: Array<any>;

  constructor(username: string, userid: string) {
    this.username = username;
    this.userid = userid;
  }
}



/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	username = '';
	userid = '';
	currentUser: User;
	saveme= {
		checked: false
	};

	loading: Loading;
	registerCredentials = { username: '', email: '' , password: '' };

	// constructor(public navCtrl: NavController) {
	constructor(private nav: NavController, private auth: AuthService,  private loadingCtrl: LoadingController, public http: Http, public push: Push) {
		this.registerCredentials.username=window.localStorage.getItem( "notturnauserid" );
		this.registerCredentials.password=window.localStorage.getItem( "notturnapasswd" );
		if (this.registerCredentials.username != '' )  { this.saveme.checked = true; }
	}

	public createAccount() {
		this.nav.push('RegisterPage');
	}

	public login() {

		this.currentUser = new User(this.registerCredentials.username , "0");
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		var link = 'http://www.roma-by-night.it/ionicPHP/login.php';
		var mypost = JSON.stringify({username: this.registerCredentials.username , password: this.registerCredentials.password });

		this.showLoading("Please wait...");

		this.http.post(link, mypost, {headers})
		.map(res => res.json())
		.subscribe(res =>  {

			this.currentUser['userid'] = res["idutente"];
			this.currentUser.fulldata = res;

			this.loading.dismiss();

			//save if required

			if ( this.saveme.checked == true ) {
				window.localStorage.setItem( "notturnauserid" , this.registerCredentials.username );
				window.localStorage.setItem( "notturnapasswd" , this.registerCredentials.password );
			} else {
				window.localStorage.removeItem( "notturnauserid" );
				window.localStorage.removeItem( "notturnapasswd" );
			}

			// register for notification
			this.pushsetup();
			// do other stuff

			var link = 'http://www.roma-by-night.it/ionicPHP/skill.php';
			var mypost = JSON.stringify({userid: this.currentUser['userid'] });

			this.showLoading("Loading data...");

			this.http.post(link, mypost)
			.map(res => res.json())
			.subscribe(res => {

				this.currentUser.skill = res;
				this.currentUser.fulldata['psvuoti'] = 1*this.currentUser.fulldata['sete']+1*this.currentUser.fulldata['addsete']-this.currentUser.fulldata['PScorrenti'];
        this.currentUser.fulldata['setetot'] = 1*this.currentUser.fulldata['sete']+1*this.currentUser.fulldata['addsete'];
//console.log( this.currentUser );

        link = 'http://www.roma-by-night.it/ionicPHP/listpoteri.php?id='+this.currentUser['userid'];
        this.http.get(link)
        .map(res => res.json())
        .subscribe( res => {
          this.currentUser.poteri=res;
          link = 'http://www.roma-by-night.it/ionicPHP/listtaum.php?id='+this.currentUser['userid'];
          this.http.get(link)
          .map(res => res.json())
          .subscribe( res => {
//console.log(res);
            this.currentUser.taum=res[0].taum;
            this.currentUser.necro=res[0].necro;
//console.log(this.currentUser)   ;
            this.auth.createUserInfo();
    			  this.auth.setUserInfo(this.currentUser);
//console.log(this.currentUser);
    			  this.loading.dismiss();
    		     this.nav.push('TabsPage');
          });
        });
			}, (err) => {
				this.loading.dismiss();
				alert ('Error loading data2');
			});
		}, (err) => {
			this.loading.dismiss();
			switch ( err['statusText'] ) {
				case "Unauthorized":
					alert("Non autorizzato");
				break;
				case "Not Found":
					alert("Scheda non trovata");
				break;
				default:
					alert("Server error");
			}
		});
	}

	showLoading(text) {
		this.loading = this.loadingCtrl.create({
			content: text,
			dismissOnPageChange: true
		});
		this.loading.present();
	}

	pushsetup() {
		const options: PushOptions = {
			android: {
				senderID: '842960782494',
				sound: 'true',
				forceShow: true,
				icon: 'notification'
			},
			ios: {
				alert: 'true',
				badge: true,
				sound: 'true'
			},
			windows: {}
		};

		const pushObject: PushObject = this.push.init(options);

		pushObject.on('notification').subscribe((notification: any) => {
			//	if (notification.additionalData.foreground) {
			//		let youralert = this.alertCtrl.create({
			//			title: 'New Push notification',
			//			message: notification.message
			//		});
			//		youralert.present();
			//	}
			//	console.log('Received a notification', notification);
		});

		pushObject.on('registration').subscribe((registration: any) => {
			//do whatever you want with the registration ID

			//console.log('Device registered ', registration.registrationId);
			//alert('Device registered '+registration.registrationId);

			let updateurl = 'http://www.roma-by-night.it/ionicPHP/updateid.php?userid='+ this.currentUser['userid']+'&id='+registration.registrationId;
			this.http.get(updateurl)
			.subscribe(res =>  {
					// updated
					// alert('Device registered '+registration.registrationId);
			});

			let topic = "userid" + this.currentUser['userid'];
			pushObject.subscribe(topic).then((res:any) => {
				//console.log("subscribed to topic: ", res);
				//alert("subscribed to topic: " + res);
			});

		});

		pushObject.on('error').subscribe(error => alert('Error with Push plugin ' + error));
	}


}
