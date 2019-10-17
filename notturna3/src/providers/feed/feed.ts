import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



export class FeedItem {
	pg: string;
	data: string;
	ora: string;
	testo: string;

	constructor(pg: string, data: string, ora: string, testo: string) {
    this.pg = pg;
	this.data = data;
    this.ora = ora;
    this.testo = testo;
  }
}



/*
  Generated class for the FeedProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FeedProvider {


	constructor(public http: Http) {
  	}


	public getDadi(userid: string) {
    var url = 'https://www.roma-by-night.it/ionicPHP/dadi.php?last=0&userid='+userid;

		var tirididado = [];

		return this.http.get(url)
		.map(data => data.json())
    .map((res) => {
			let status = res['status'];
			if ( status !=0 ) {
				var objects = res['post'];
				if ( status == 1 ) {
					let newFeedItem = new FeedItem(objects.pg, objects.data, objects.ora, objects.testo);
					tirididado.push(newFeedItem);
				} else {
					var num=objects.length;
					// console.log ("num "+num );
					// console.log ("status "+status );
      		for (let i = 0; i < num; i++) {
       			let item = objects[i];
       			let newFeedItem = new FeedItem(item.pg, item.data, item.ora, item.testo);
       			tirididado.push(newFeedItem);
		   		}
				}
      	return tirididado;
			}
    })
  }
}
