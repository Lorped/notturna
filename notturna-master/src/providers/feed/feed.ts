import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



export class FeedItem {
	pg: string;
	data: string;
	ora: string;
	testo: string;
	dest: string;
 
	constructor(pg: string, data: string, ora: string, testo: string, dest: string) {
    this.pg = pg;
	this.data = data;
    this.ora = ora;
    this.testo = testo;
    this.dest = dest;
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


	public getDadi() {
    	var url = 'http://www.roma-by-night.it/ionicPHP/dadi.php?last=0&userid=-1';
	
		var tirididado = [];
		
		return this.http.get(url)
		.map(data => data.json())
    	.map((res) => {
			let status = res['status'];
			if ( status !=0 ) {
				let objects = res['post'];
				var num =objects.length;
				if (objects!=null && objects.length==null) {
					let newFeedItem = new FeedItem(objects.pg, objects.data, objects.ora, objects.testo, objects.dest);
					tirididado.push(newFeedItem);
				} else { //array 	
      				for (let i = 0; i < num; i++) {
       					let item = objects[i];
       					let newFeedItem = new FeedItem(item.pg, item.data, item.ora, item.testo, item.dest);
       					tirididado.push(newFeedItem);
		   			}	
				}
      			return tirididado;
			}
    	})
  	}
  	
}
	
	
