import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from '../../providers/auth-service/auth-service';


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
  constructor(private nav: NavController, private auth: AuthService,  private loadingCtrl: LoadingController, public http: Http) {
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
   
    this.http.post(link, mypost, headers)
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
        
      // do other stuff
      var link = 'http://www.roma-by-night.it/ionicPHP/skill.php';
      var mypost = JSON.stringify({userid: this.currentUser['userid'] });   
      
      this.showLoading("Loading data...");
      
      this.http.post(link, mypost)
      .map(res => res.json())
      .subscribe(res => {
            
        this.currentUser.skill = res;
        this.currentUser.fulldata['psvuoti'] = this.currentUser.fulldata['ps']-this.currentUser.fulldata['PScorrenti'];
//console.log(   this.currentUser );     
        this.auth.createUserInfo();
        this.auth.setUserInfo(this.currentUser);

        this.loading.dismiss();     
        this.nav.push('TabsPage'); 
          
          
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

}

