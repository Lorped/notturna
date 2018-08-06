import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CacciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-caccia',
  templateUrl: 'caccia.html',
})
export class CacciaPage {

  maxTime: any=10*60;  /* 10 minuti */
  hidevalue = false ;
  timer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CacciaPage');
    this.maxTime=3;
    this.StartTimer();
  }




  StartTimer(){
    this.timer = setTimeout(x =>
      {
          if(this.maxTime <= 0) { }
          this.maxTime -= 1;

          if(this.maxTime > 0) {
            this.hidevalue = false;
            this.StartTimer();
          } else{
            this.hidevalue = true;
            console.log("here");
          }

      }, 1000);

  }

}
