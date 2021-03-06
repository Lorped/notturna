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
	selector: 'page-personaggioh',
	templateUrl: 'personaggioh.html',
})
export class PersonaggiohPage {

	public		requestID;
	currentUser:	User;
	scheda:		Array<any>;
	myskill:	Array<any>;
  poteri:	Array<any>;

	note:	string;
  notemaster:	string;

	rituali:	number;
	forza:		number;
	rissa:		number;
	mischia:	number;
	lancio:		number;
	tiro:		number;
	fuoco:		number;
	potenza:	number;
	artigli:	number;

	status:	string;
  titolo: string;

  pf = 0 ;

  listalegami: Legame[];
  listalegamidomitor: Legame[];
  rifugio: string = '';
  zona: string = '';

  fomipot2 = 0;
  foripot2 = 0;
  folapot2 = 0;
  treti2 = 0;
  trefuoco2 = 0;

	constructor(   public navParams: NavParams , public http: Http) {
		this.requestID = navParams.get("RequestID");
		this.currentUser = new User("" , this.requestID);
		this.scheda=[];
		this.myskill=[];
		this.loadPG();



    var url = 'https://www.roma-by-night.it/ionicPHP/getlegami.php?id='+this.requestID;
    this.http.get(url)
    .map(res => res.json())
    .subscribe(res =>  {

        this.listalegami = res.target;
        this.listalegamidomitor = res.domitor;
        //console.log (this.listalegami);
    });



	}

    loadPG(){


		var link = 'https://www.roma-by-night.it/ionicPHP/getuserh.php?id='+this.requestID;

		this.http.get(link)
		.map(res => res.json())
    	.subscribe(res =>  {
			this.currentUser.fulldata = res;
			this.scheda = res;
      this.scheda['rd']=Math.floor((1*this.scheda['carisma']+1*this.scheda['intelligenza']+1*this.scheda['prontezza']+1*this.scheda['percezione']+1*this.scheda['fdv'])/5);

      switch ( this.scheda['idstatus']) {
        case '1' : {
          this.status = this.scheda['lvl1'];
          this.titolo = 'Equip. Potenziato';
          break;
        }
        case '2' : {
          this.status = this.scheda['lvl2'];
          this.titolo = 'Reliquie';
          break;
        }
        case '3' : {
          this.status = this.scheda['lvl3'];
          this.titolo = 'Elisir';
          break;
        }
      }




			var link = 'https://www.roma-by-night.it/ionicPHP/skill.php'
			var mypost = JSON.stringify({userid: this.currentUser['userid'] });

			this.http.post(link, mypost)
      		.map(res => res.json())
      		.subscribe(res => {

        		this.currentUser.skill = res;
				this.myskill = res;


//console.log(this.myskill);
				for (var j = 0; j < this.myskill.length; j++) {
  					if ( this.myskill[j].nomeskill=="Seguaci")  {
    		 			this.myskill[j].nomeskill="Collaboratori";
  					}
            if ( this.myskill[j].nomeskill=="Rifugio")  {
              this.myskill[j].nomeskill="SafeHouse";
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

        this.rifugio=this.currentUser.fulldata['rifugio'];
        this.zona=this.currentUser.fulldata['zona'];


				this.rissa=0;
				this.mischia=0;
				this.lancio=0;
				this.tiro=0;
				this.fuoco=0;
				this.potenza=0;
				this.artigli=0;

				for (var i = 0; i < this.myskill.length; i++) {
					if ( this.myskill[i].nomeskill=="Rissa")  {
						this.rissa=this.myskill[i].livello;
					}
					if ( this.myskill[i].nomeskill=="Mischia")  {
						this.mischia=this.myskill[i].livello;
					}
					if ( this.myskill[i].nomeskill=="Armi da lancio")  {
						this.lancio=this.myskill[i].livello;
					}
					if ( this.myskill[i].nomeskill=="Armi da tiro")  {
						this.tiro=this.myskill[i].livello;
					}
					if ( this.myskill[i].nomeskill=="Armi da fuoco")  {
						this.fuoco=this.myskill[i].livello;
					}
					if ( this.myskill[i].nomeskill=="Potenza")  {
						this.potenza=this.myskill[i].livello;
					}
					if ( this.myskill[i].nomeskill=="Proteide")  {
						if (this.myskill[i].livello >1 ) this.artigli=1;
					}
				}

				this.forza=this.scheda['forza'];

        this.fomipot2 = Math.ceil((1*this.forza + 1*this.mischia +1*this.potenza)/2);
        this.foripot2 = Math.ceil((1*this.forza + 1*this.rissa +1*this.potenza)/2);
        this.folapot2 = Math.ceil((1*this.forza + 1*this.lancio +1*this.potenza)/2);
        this.treti2 = Math.ceil((3 + 1*this.tiro )/2);

        this.trefuoco2 = Math.ceil((3+1*this.fuoco)/2);

				this.note=this.nl2br(this.scheda['note']);
        this.notemaster=this.nl2br(this.scheda['notemaster']);




			});
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
