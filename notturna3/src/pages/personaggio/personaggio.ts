import { Component } from '@angular/core';
import { App, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';



/**
 * Generated class for the PersonaggioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personaggio',
  templateUrl: 'personaggio.html',
})
export class PersonaggioPage {


  scheda: Array<any>;
  psvuoti: number;
  
  
  
  constructor( private auth: AuthService , private app: App) {
       
    this.scheda=this.auth.getUserPGInfo();

    
    
    
    //console.log ( this.currentUser );
    //console.log ( this.currentUser.fulldata );
    
  }
 
  public logoutx() { 
    //this.nav.setRoot('LoginPage');
    this.app.getRootNav().setRoot('LoginPage');
  }
    


  ionViewDidLoad() {
    //console.log('ionViewDidLoad PersonaggioPage');
  }

}
