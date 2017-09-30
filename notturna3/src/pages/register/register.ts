import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, Loading, LoadingController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  loading: Loading;
  createSuccess = false;
  registerCredentials = { username: '' , email: '', password: '' };
    
    
  // constructor(public navCtrl: NavController, public navParams: NavParams) {
  constructor(private nav: NavController, private alertCtrl: AlertController, public http: Http, private loadingCtrl: LoadingController ) {
  }

  public register() {
    
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json'); 
    var link = 'http://www.roma-by-night.it/ionicPHP/register.php';
    var mypost = JSON.stringify({username: this.registerCredentials.username , email: this.registerCredentials.email, password: this.registerCredentials.password });
   
    this.showLoading("Please wait...");
    
    this.http.post(link, mypost, headers)
      .map(res => res.json())
      .subscribe(res =>  {           
      
        this.loading.dismiss();
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      
      } , (err) => {
            this.loading.dismiss();
            alert ('Problem creating account.');
      });
         
  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  showLoading(text) {
    this.loading = this.loadingCtrl.create({
      content: text,
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RegisterPage');
  }

}

