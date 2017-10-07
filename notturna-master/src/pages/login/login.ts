import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';




export class User {
  username: string;
  userid: string;
  fulldata: Array<any>;
  skill: Array<any>;
 
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
  constructor(private nav: NavController, private loadingCtrl: LoadingController, public http: Http) {
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
    var link = 'http://www.roma-by-night.it/ionicPHP/login-master.php';
	//var link = 'http://www.roma-by-night.it/ionicPHP/login.php';
    var mypost = JSON.stringify({username: this.registerCredentials.username , password: this.registerCredentials.password });
   
    this.showLoading("Please wait...");
   
	
    this.http.post(link, mypost, headers)
	.map(res => res.json())
    .subscribe(res =>  {    
  	
      this.loading.dismiss();
			
			//save if required
			
			if ( this.saveme.checked == true ) {
				window.localStorage.setItem( "notturnauserid" , this.registerCredentials.username );
				window.localStorage.setItem( "notturnapasswd" , this.registerCredentials.password );
			} else {
				window.localStorage.removeItem( "notturnauserid" );
				window.localStorage.removeItem( "notturnapasswd" );
			}
        
      

        this.nav.push('HomePage'); 
          
          

    }, (err) => {
      this.loading.dismiss();
      switch ( err['statusText'] ) {
        case "Unauthorized":
          alert("Non autorizzato");
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

}

