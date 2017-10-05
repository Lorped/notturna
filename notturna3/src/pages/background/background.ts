import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the BackgroundPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-background',
  templateUrl: 'background.html',
})
export class BackgroundPage {
  
  myskill: Array<any>;
  fulldata: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService) {
    this.myskill=this.auth.getUserSKILLInfo();
	this.fulldata=this.auth.getUserPGInfo();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad BackgroundPage');
  }

}
