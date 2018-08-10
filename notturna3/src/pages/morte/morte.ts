import { Component } from '@angular/core';
import { App, IonicPage } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthService, User } from '../../providers/auth-service/auth-service';


/**
 * Generated class for the MortePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-morte',
  templateUrl: 'morte.html',
})
export class MortePage {

  myuser: User;

  constructor(private app: App, private http: Http , private auth: AuthService) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MortePage');
  }

  morte() {
    this.myuser=this.auth.getUserInfo();
    var link = 'http://www.roma-by-night.it/ionicPHP/morte.php?id='+this.myuser['userid'];
    this.http.get(link)
    .subscribe( res => {
        this.app.getRootNav().setRoot('LoginPage');
    });

  }

}
