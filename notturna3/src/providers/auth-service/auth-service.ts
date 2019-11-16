import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

export class User {
  type: string;
  username: string;
  userid: string;
  fulldata: Array<any>;
  skill: Array<any>;
  poteri: Array<any>;
  taum: Array<any>;
  necro: Array<any>;


  constructor(username: string, userid: string) {
    this.username = username;
    this.userid = userid;
  }
}



/*
  Generated class for the AuthServiceProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthService {
  currentUser: User;
  scheda = new Array();

  constructor(public http: Http   ) { }

/*
 public register(credentials) {
    if (credentials.username === null || credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 */

  public getUserInfo() : User {
    return this.currentUser;
  }

  public  getUserPGInfo() : Array<any> {
    return this.currentUser.fulldata;
  }

  public  getUserSKILLInfo() : Array<any> {
    return this.currentUser.skill;
  }

  public setUserInfo(auser) : User {
    this.currentUser = new User("" , "0");
    this.currentUser=auser;
    return(this.currentUser);

  }

  public createUserInfo() : User {
    this.currentUser = new User("" , "0");
    return(this.currentUser);

  }



/*
    public logout() {
     return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  */



}
