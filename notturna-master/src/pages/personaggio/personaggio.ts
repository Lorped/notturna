import { Component } from '@angular/core';
import {  IonicPage, NavParams,   } from 'ionic-angular';
import { Http } from '@angular/http';

export class User {
  username: string;
  userid: string;
  fulldata: Array<any>;
  skill: Array<any>;
 
  constructor(username: string, userid: string) {
    this.username = username;
    this.userid = userid;
	  this.fulldata=[];
	  this.skill=[];
  }
}

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

	public requestID;
  	currentUser: User;
	scheda: Array<any>;
	myskill: Array<any>;
	
	rituali: number;

  
  constructor(   public navParams: NavParams , public http: Http) {
	this.requestID = navParams.get("RequestID");
	this.currentUser = new User("" , this.requestID);
	  this.scheda=[];
	  this.myskill=[];
	  this.loadPG();
	
	
  }
 
    loadPG(){
	
		
		var link = 'http://www.roma-by-night.it/ionicPHP/getuser.php?id='+this.requestID;
	
		this.http.get(link) 
		.map(res => res.json())
    	.subscribe(res =>  {    
			this.currentUser.fulldata = res;
			this.scheda = res;
			
			var link = 'http://www.roma-by-night.it/ionicPHP/skill.php'
			var mypost = JSON.stringify({userid: this.currentUser['userid'] });   
			
			this.http.post(link, mypost)
      		.map(res => res.json())
      		.subscribe(res => {
            
        		this.currentUser.skill = res;
				this.myskill = res;
				
				this.rituali=0;
		
				for (var i = 0; i < this.myskill.length; i++) {
  					if ( this.myskill[i].tipologia==11)  {
    		 			this.rituali=1;
    					break;
  					}
				}

			});
		});
		
	}


  ionViewDidLoad() {
    //console.log('ionViewDidLoad PersonaggioPage');

  }


}
