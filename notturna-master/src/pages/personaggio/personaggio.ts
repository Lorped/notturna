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

export class Legame {
	nomepg: string = '';
	livello: number = 0;
  dataultima: string = '';
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

	public		requestID;
	currentUser:	User;
	scheda:		Array<any>;
	myskill:	Array<any>;

	note:	string;

	rituali:	number;
	forza:		number;
	rissa:		number;
	mischia:	number;
	lancio:		number;
	tiro:		number;
	fuoco:		number;
	Bfuoco:		number;
	potenza:	number;
	artigli:	number;

	psvuoti:	number;

  pf = 0 ;

  listalegami: Legame[];
  listalegamidomitor: Legame[];

	constructor(   public navParams: NavParams , public http: Http) {
		this.requestID = navParams.get("RequestID");
		this.currentUser = new User("" , this.requestID);
		this.scheda=[];
		this.myskill=[];
		this.loadPG();

    var url = 'http://www.roma-by-night.it/ionicPHP/getlegami.php?id='+this.requestID;
    this.http.get(url)
    .map(res => res.json())
    .subscribe(res =>  {

        this.listalegami = res.target;
        this.listalegamidomitor = res.domitor;
        //console.log (this.listalegami);
    });

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

				for (var j = 0; j < this.myskill.length; j++) {
  					if ( this.myskill[j].tipologia==11)  {
    		 			this.rituali=1;
    					break;
  					}
				}


 //console.log ( this.currentUser );

        this.pf = ( 3 + 1*this.currentUser.fulldata['attutimento'])*2;
        for (let i = 0 ; i< this.myskill.length ; i++) {
          if ( this.myskill[i].nomeskill == 'Schivare' ) {
            this.pf +=  1*this.myskill[i].livello;
          }
          if ( this.myskill[i].nomeskill == 'Robustezza' ) {
            this.pf +=  1*this.myskill[i].livello;
          }
        }




				this.rissa=0;
				this.mischia=0;
				this.lancio=0;
				this.tiro=0;
				this.fuoco=0;
				this.Bfuoco=0;
				this.potenza=0;
				this.artigli=0;

				for (var i = 0; i < this.myskill.length; i++) {
					if ( this.myskill[i].nomeskill=="Rissa")  {
						this.rissa=this.myskill[i].livello-2;
						if (this.rissa<0) this.rissa=0;
					}
					if ( this.myskill[i].nomeskill=="Mischia")  {
						this.mischia=this.myskill[i].livello-2;
						if (this.mischia<0) this.mischia=0;
					}
					if ( this.myskill[i].nomeskill=="Armi da lancio")  {
						this.lancio=this.myskill[i].livello-2;
						if (this.lancio<0) this.lancio=0;
					}
					if ( this.myskill[i].nomeskill=="Armi da tiro")  {
						this.tiro=this.myskill[i].livello-2;
						if (this.tiro<0) this.tiro=0;
					}
					if ( this.myskill[i].nomeskill=="Armi da fuoco")  {
						this.fuoco=this.myskill[i].livello;
						this.Bfuoco=this.myskill[i].livello-2;
						if (this.Bfuoco<0) this.Bfuoco=0;
					}
					if ( this.myskill[i].nomeskill=="Potenza")  {
						this.potenza=this.myskill[i].livello;
					}
					if ( this.myskill[i].nomeskill=="Proteide")  {
						if (this.myskill[i].livello >1 ) this.artigli=1;
					}
				}

				this.forza=this.scheda['forza'];

				this.note=this.nl2br(this.scheda['note']);


				this.psvuoti=this.scheda['ps']-this.scheda['PScorrenti'];

			});
		});

	}

	piups() {
		//console.log("aggiungi");
		//console.log(this.requestID);

    	var link = 'http://www.roma-by-night.it/ionicPHP/piups.php?id='+this.requestID;

   		this.http.get(link)
      	.subscribe(res =>  {
			this.scheda['PScorrenti']=1+1*this.scheda['PScorrenti'];
			this.psvuoti=this.psvuoti-1;
     	 });
	}

	menops() {
		var link = 'http://www.roma-by-night.it/ionicPHP/menops.php?id='+this.requestID;

   		this.http.get(link)
      	.subscribe(res =>  {
			this.scheda['PScorrenti']=-1+1*this.scheda['PScorrenti'];
			this.psvuoti=this.psvuoti+1;
     	 });

	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad PersonaggioPage');
	}

	nl2br (str) {
	// Some latest browsers when str is null return and unexpected null value
		if (typeof str === 'undefined' || str === null) {
    		return '';
		}
  	// Adjust comment to avoid issue on locutus.io display
  		var breakTag =  '<br>'   ;
  		return (str + '')
    		.replace(/(\r\n|\n\r|\r|\n)/g, breakTag + '$1')
	}

}
